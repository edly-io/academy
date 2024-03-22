=============
Tutor plugins
=============

Prerequisites
=============

- Introduction to Tutor and Open edX
- Introduction to the Python programming language

Introduction
============

The philosophy of Tutor is to provide a good set of core defaults that work out of the box for most people, but to enable anyone to override and extend these defaults. If someone wants to add custom features to their Open edX platform, or modify some of the settings, then Tutor should not stand in their way.

The recommended way to modify the behaviour of Tutor and Open edX is to create a Tutor plugin. A Tutor plugin is a Python module that will be loaded at runtime. This Python module will make use of the Tutor plugin API to change how Tutor works.

Tutor plugins can be used for many different purposes, such as:

- Changing the Open edX LMS configuration settings
- Setting a new theme
- Adding a new microfrontend to the platform
- Installing custom Python requirements in the Docker image
- Running a brand new application along the rest of the Open edX stack
- etc.

Why plugins? Readers might be put off by the idea of creating a Python module to make a minor modification to Tutor: for example, a simple change of a single Open edX setting. This wariness would be justified, which is why the plugins API was designed to make it as easy as possible to perform the most common tasks. Creating a plugin is thus much simpler than you might think.

One possible alternative to plugins was to create an extensive set of configuration settings to cover all possible use cases. This is the approach that was taken in edx-platform. (see for instance the settings for the Open edX `LMS <https://github.com/openedx/edx-platform/blob/master/lms/envs/common.py>`__ or a selection of the deployment settings for the native installation `playbooks <https://github.com/openedx/configuration/blob/master/playbooks/roles/edxapp/defaults/main.yml>`__) We decided not to go with this approach for the following reasons:

1. Covering all possible use cases results in an explosion of the number of settings. For instance, most edx-platform settings would have to be included in the list of Tutor settings.
2. Maintaining and documenting all these settings would make the lives of Tutor maintainers very difficult.
3. It's extremely complex to predict how combination of settings will behave. (it's actually a `science <https://www.researchgate.net/publication/320860971_FEVER_An_approach_to_analyze_feature-oriented_changes_and_artefact_co-evolution_in_highly_configurable_systems>`__)
4. Based on our experience with Open edX, we understand that settings are not just static variables. There are inter-dependent settings, some settings which are actually Python functions or classes, settings that require to run some pieces of code, etc.

For all these reasons, Tutor does not attempt to provide simple settings for every single use case. Instead, Tutor exposes a plugin API that allows anyone to modify almost all parts of Tutor. We accept that the set of defaults that ships with Tutor might not work for everyone. So Tutor tries very hard to make it as easy as possible to change its default behaviour. As a consequence, plugin developers become responsible of maintaining their own extensions.

Plugin fundamentals
===================

Before we can understand how to implement plugins, we must first explain how Tutor performs plugin discovery and loading.

Plugin discovery
----------------

Tutor plugins are listed with the following command::

    tutor plugins list

On a computer running Tutor v16, the command above will output something that is similar to the following::

    NAME       	STATUS   	VERSION
    android    	installed	16.0.0
    cairn      	installed	16.0.3
    credentials	✅ enabled	16.0.0
    discovery  	✅ enabled	16.0.0
    ecommerce  	installed	16.0.0
    indigo     	installed	16.0.0
    jupyter    	installed	16.0.1
    mfe        	✅ enabled	16.1.1
    minio      	installed	16.0.1
    notes      	installed	16.0.1
    sentry     	installed	/home/username/.local/share/tutor-plugins/sentry.py
    webui      	✅ enabled	16.0.0
    xqueue     	installed	16.0.1

How does Tutor find out which plugins are available? There are two sources for plugin discovery:

1. Modules: these are individual files which are stored in a specific directory. On Linux, it is ``~/.local/share/tutor-plugins``. This hard-coded location can be obtained by running ``tutor plugins printroot``. It can be overridden by defining the ``TUTOR_PLUGINS_ROOT`` environment variable. Any file that is stored in this directory is considered as a plugin. This is the case of the "sentry" plugin above.
2. Packages: any installed Python package that includes an entrypoint named "tutor.plugin.v1" will be considered as a installed plugin. For instance, the "notes" plugin has the following entry in its `setup.py file <https://github.com/overhangio/tutor-notes/blob/master/setup.py>`__::

    entry_points={"tutor.plugin.v1": ["notes = tutornotes.plugin"]}

Discovery of both types of plugins is performed in the `tutor.plugins.v1 <https://github.com/overhangio/tutor/blob/master/tutor/plugins/v1.py>`__ module. To be precise, discovery is implemented in the ``_discover_module_plugins()`` and ``_discover_entrypoint_plugins()`` functions. Notice how these functions are actually callbacks of the ``CORE_READY`` action? We will be talking about that in a minute 😉

Plugin loading
--------------

Once plugins have been discovered, how are they loaded such that they can actually have an effect on how Tutor works? First of all, not all plugins are loaded. Only "enabled" plugins are loaded. If a plugin is present in the output of ``tutor plugins list``, then it can be enabled with::

    tutor plugins enable mypluginname

This command will add "mypluginname" to the list of enabled plugins. Once a plugin has been enabled, it will be marked as "✅ enabled" in the output of ``tutor plugins list``.

The list of enabled plugins is actually a configuration setting named "PLUGINS". Thus, another way to check out all enabled plugins is to run::

    tutor config printvalue PLUGINS

Alternatively, the value of the "PLUGINS" setting can be obtained from the ``config.yml`` file in the Tutor project root::

    cat "$(tutor config printroot)/config.yml"

Since Tutor plugins are just Python modules, they can be ``import``ed by Tutor at runtime. And this is exactly what happens for enabled Tutor plugins: the imports are performed by the ``load``` functions that are declared inside the ``discover_module(path)`` and ``discover_package(entrypoint)`` functions from the `tutor.plugins.v1 <https://github.com/overhangio/tutor/blob/master/tutor/plugins/v1.py>`__ module. Again, these ``load`` functions are actually callbacks of an action called ``PLUGIN_LOADED``. Plugins are loaded in alphabetical order of their names.

Module or package: which is the right one?
------------------------------------------

When creating a new Tutor plugin, should you go for a single file module or a full-fledged package? Let's look at the advantages and drawbacks of each:

- Modules are extremely simple to create. Just run ``touch $(tutor plugins printroot)/myplugin.py`` and "myplugin" will appear in the list of installed plugins.
- Modules cannot be composed of multiple files. So as soon as you will need to add new files to your plugin, you will need to convert your module to a package. This might be the case when you add custom templates or complex patches to your plugin (see below).
- Packages can be distributed more easily, for instance on `pypi <https://pypi.org/>`__. Packaging also makes it easier to upgrade plugins (``pip install tutor-myplugin`` or ``tutor plugins upgrade myplugin``). Modules can be installed from a remote url (``tutor plugins install https://.../myplugin.py``) but it's difficult to track their versions or upgrade them in a consistent way.

So which one is right for you? If you're not sure, you should start with a single file module. And once you need more modularity, or you are planning on distributing your plugin, then you should migrate to a package. The transition should be fairly straightforward for experienced Python developers.

Creating a plugin
-----------------

Creating a plugin as a single file Python module is as simple as creating a file in the right directory::

    touch "$(tutor plugins printroot)/myplugin.py"

Creating a plugin as a Python package is a little more work. It is recommended to use the `Tutor plugin cookiecutter <https://github.com/overhangio/cookiecutter-tutor-plugin>`__. First, install the `cookiecutter <https://pypi.org/project/cookiecutter>`__ package::

    pip install cookiecutter

Then, use the official cookiecutter template to generate a plugin::

    cookiecutter https://github.com/overhangio/cookiecutter-tutor-plugin.git

Answer interactive questions to generate a plugin in the ``./tutor-contrib-myplugin`` directory. Then, install this plugin next to Tutor::

    pip install -e ./tutor-contrib-myplugin

And "myplugin" should appear in ``tutor plugins list``. Read the `Tutor plugin cookiecutter documentation <https://github.com/overhangio/cookiecutter-tutor-plugin#readme>`__ for more information.


Hooks
=====

Let's start with a high-level overview of the Tutor plugin API. Internally, Tutor makes use of a type of objects called "hooks". Hooks belong to one of two categories: "actions" or "filters".

- Actions are events that are triggered at different points during the execution of Tutor.
- Filters modify the data that are used by actions.

Tutor ships with a number of actions and filters -- collectively referred to as hooks. Plugin developers add callbacks to these hooks to change how Tutor behaves.

For instance: an action is triggered when Tutor starts. Plugin developers can use this action to check if the computer that Tutor runs on has enough memory, or log some data to the standard output.

One of the most commonly extended filter in Tutor is the list of configuration settings. Plugin developers use this filter to add their own custom settings to the Tutor configuration.

.. note: We wish we had come up with the concept of actions and filters ourselves, but we didn't. One of the most popular implementation of hooks is from `Wordpress <https://developer.wordpress.org/plugins/plugin-basics/#hooks-actions-and-filters>`__, which makes extensive use of this idea to support plugins. To a lesser extent, Open edX also makes use of a `similar concept <https://docs.openedx.org/projects/openedx-filters/en/latest/concepts/hooks-extension-framework.html>`__ in edx-platform.

Basic usage
-----------

Hooks are implemented in the `tutor.core.hooks <https://github.com/overhangio/tutor/tree/master/tutor/core/hooks>`__ module. The hooks API is documented in the `reference documentation <https://github.com/overhangio/tutor/tree/master/tutor/core/hooks>`__.

Actions
~~~~~~~

In a nutshell, actions can be used as follows::

    # Import the Action class from the hooks module
    from tutor.core.hooks import Action

    # Create an action
    action = Action()

    # Create a callback and add it to the action
    @action.add()
    def callback1(x):
        print(f"{x}² = {x**2}")

    # Create a second callback
    @action.add()
    def callback2(x):
        print(f"{x}³ = {x**3}")

    # Execute all callbacks, in the order they were added.
    action.do(10)

The code above will print::

    10² = 100
    10³ = 1000

Notice how action callbacks are added with the ``@action.add()`` decorator. If you are not familiar with the decoratory syntax, then you should know that the following pieces of code are equivalent::

    # this...
    @action.add()
    def callback1(x):
        ...

    # ... is equivalent to this:
    def callback1(x):
        ...
    calback1 = action.add()(callback1)

Thus, what you should remember is that the ``@...`` part above the decorated function is a callable (in most cases: a function) that will receive the decorated function as its only argument, and must return a function. Here is a simplified implementation of the ``Action.add`` and ``Action.do`` methods::

    class Action:
        def __init__(self):
            self.callbacks = []

        def add(self):
            def decorated(function):
                self.callbacks.append(function)
                return function
            return decorated

        def do(self, *args, **kwargs):
            for callback in self.callbacks:
                callback(*args, **kwargs)

Notice how each action callback receives the same arguments that were passed to ``action.do(...)``.

Actions can be considered as processing data in "parallel" (though the actual implementation has nothing to do with parallelism)::

    Action(input)
       |
       └► callback1(input)
       |
       └► callback2(input)
       |
       └► ...

Thus, actions are not expected to return anything: if they do, the return value is ignored. Each action runs independently of others.

Filters
~~~~~~~

Here is an example on how to use filters::

    # Import the Filter class from the hooks module
    from tutor.core.hooks import Filter

    # Create a filter
    filter = Filter()

    # Create a callback and add it to the filter
    @filter.add()
    def callback1(x):
        return x + 1

    # Create a second callback
    @filter.add()
    def callback2(x):
        return x * 2

    # Execute all callbacks, in the order they were added.
    result = filter.apply(10)
    print(f"Result: {result}")

The code above will print::

    Result: 22

The ``Filter`` class is very similar to ``Action``. Here is a simplified implementation of the ``Filter.apply`` method::

    class Filter:

        # the "add" method is identical to Action.add

        def apply(self, result, *args, **kwargs):
            for callback in self.callbacks:
                result = callback(result, *args, **kwargs)
            return result


Filters are different than actions in the sense that filter callbacks must return some value. That returned value is then passed along to the next callback, etc. Filters can be viewed as functions that process data serially, like a pipeline or the `function composition operator <https://en.wikipedia.org/wiki/Function_composition>`__::

    Filter(input)
        |
        └► callback1(input) -► result1
                                     |
                                     └► callback2(result1) -► result2
                                                                    ...
                                                                     |
                                                                     └► result

Some filters in Tutor come with syntactic sugar methods: ``add_item``, ``add_items`` and ``iterate``. These methods are implemented for filters that take a single argument of type list. As an example, the following are equivalent::

    # long form
    @myfilter.add()
    def callback1(items: list):
        items += [1, 2]
        return items

    # short form
    myfilter.add_item(1)
    myfilter.add_item(2)

    # shortest form
    myfilter.add_items([1, 2])

And to apply the filter, the following are equivalent::

    # long form
    for x in myfilter.apply([]):
        ...

    # short form
    for x in myfilter.iterate():
        ...

Callback priority
-----------------

Sometimes, you may want to add a callback that is guaranteed to run before or after another one. In this case, the callback should be added with a priority score, which will be an integer. The higher the priority, the later the callback will be called. For instance::

    from tutor.core.hooks import Action, priorities

    action = Action()

    @action.add(priority=10)
    def callback1():
        print("world")

    @action.add(priority=5)
    def callback2():
        print("hello")

    action.do()

The above code will print::

    hello
    world

Note how ``callback2`` is called after ``callback1``, despite the fact that ``callback2`` is ``add``ed to the action first. Similarly, priorities exist for filters and they behave the same as for actions: higher-priority filters modify data first.

In general, plugin authors should not have to bother about setting the priority of hook callbacks. But it's useful in some specific cases, such as when one plugin needs to supersede others. For instance, the content of settings files sometimes need to be ordered in a specific way; in Tutor, this would mean that some plugins need to add their callback functions to the ``ENV_PATCHES`` filter before others.


The Tutor hooks API
===================

Every call to a ``tutor ...`` command triggers a certain number of hooks: both actions and filters. These hooks are documented in the `hooks catalog <https://docs.tutor.edly.io/reference/api/hooks/catalog.html>`__ and are implemented in the `tutor.hooks.catalog <https://github.com/overhangio/tutor/blob/master/tutor/hooks/catalog.py>`__ module.

So, which hooks should you use in your plugin? Of course, it all depends on what is the purpose of your plugin. A first step would be to thoroughly read through the `Tutor plugins tutorial <https://docs.tutor.overhang.io/tutorials/plugin.html>`__. Let's have a look at a few tasks commonly achieved by plugins.

Define new configuration settings
---------------------------------

A plugin can define new configuration settings using the following filters:

- `CONFIG_DEFAULTS <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.CONFIG_DEFAULTS>`__: to define new settings which should not be modified by end users, in most cases. Unmodified settings will not be stored to ``config.yml``.
- `CONFIG_UNIQUE <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.CONFIG_UNIQUE>`__: for settings that are specific to every user. This includes passwords, IDs. In general, there should be very few items added to this filter. Any item that is added to this filter will be preserved in ``config.yml``. Keep in mind that your plugins should support upgrading from one version to the next: thus, if you've defined a unique configuration setting that you later realize is invalid, then you will have to provide instructions to your users to modify them manually, which might be inconvenient, to say the least.
- `CONFIG_OVERRIDES <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.CONFIG_OVERRIDES>`__: to override existing default settings. Are you sure you want to use this filter? Think twice 😉

In general, you should try to define *as few* configuration settings as possible. That's because configuration settings are difficult to maintain. When creating a new configuration setting, ask yourself: will this setting ever take a different value for some user? If not, then you should just hard-code the value in your templates, and not create a dedicated setting. If only a very small minority of users are likely to modify this setting, then can you wait until the issue arises? Or does the setting in 

Modify existing templates
-------------------------

To add new content to existing templates, you will need to implement the `ENV_PATCHES <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.ENV_PATCHES>`__ filter. This might be the case to modify edx-platform settings, the docker-compose files or the Kubernetes manifests, for instance.

Because patches are more conveniently written as files rather than inline in a Python module, the plugin cookiecutter makes it easy to load such patches from a ``patches/`` directory.

Create new templates
--------------------

Almost all plugins that need to run a separate application will have to create new templates. For instance, you might have to render a new ``Dockerfile`` to build your application image. Or you might want to create a separate settings file for your application.

To add new templates to the rendered environment, you should first define a new template root with the `ENV_TEMPLATE_ROOTS <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.ENV_TEMPLATE_ROOTS>`__ filter. To avoid overwriting existing templates, this template root should contain a single directory with the same name as your plugin.

Then, you should specify what will be the destination of template directories. This is done with the `ENV_TEMPLATE_TARGETS <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.ENV_TEMPLATE_TARGETS>`__ filter.

Build, push and pull Docker images
----------------------------------

Managing Docker images requires three different filters: `IMAGES_BUILD <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.IMAGES_BUILD>`__, `IMAGES_PUSH <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.IMAGES_PUSH>`__ and `IMAGES_PULL <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.IMAGES_PULL>`__.

In many cases you will want to add the same images to all three filters. But there are cases where you might not want to push or pull the images you've built locally: for instance when your images contain configuration-specific information. Or when you do not have access to a remote Docker registry.

In general, you should not add third-party images to ``IMAGES_PULL`` or ``IMAGES_PUSH``. These images will be pulled automatically, either by ``docker-compose`` or Kubernetes.

Add initialisation scripts
--------------------------

Initialisation scripts are run during ``tutor local/dev/k8s launch`` and ``tutor local/dev/k8s do init`` commands. They are created with the `CLI_DO_INIT_TASKS <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.CLI_DO_INIT_TASKS>`__ filter.

Initialisation scripts are bash commands that are run automatically in a live environment to make sure that the platform runs properly. They include, for instance: creating MySQL users, running migrations, creating edx-platform sites and clients.

It is crucial that initialisation commands are idempotent. In other words: that they can be run any number of times after the first without modifying the platform. For instance, an initiatlisation script that would automatically create an entry in a MySQL table would not be idempotent (and thus not a good initialisation script). Instead, that script should first check for the existence of a record, and create it if it does not exist already.

Add custom ``tutor local/dev/k8s do ...`` commands
--------------------------------------------------

Plugins can expose commands that can be run in any one of the three deployment environments ("local", "dev" and "k8s"). These commands are created with the `CLI_DO_COMMANDS <https://docs.tutor.edly.io/reference/api/hooks/catalog.html#tutor.hooks.Filters.CLI_DO_COMMANDS>`__ filter.

Such ``do`` commands are great for one-off scripts, such as: creating an edx-platform user, importing the demo course, fixing a common issue in some database, etc.
