==============
What is Tutor?
==============

.. raw:: html

    <div class="video"><iframe src="https://www.youtube.com/embed/BzNcrmyFpw4?si=YCOJpqWOc8dFOC4-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>

You might already know about `Open edX <https://openedx.org/>`__, but you might be wondering what Tutor is. If that is the case, then this video is for you. I'll explain what Tutor is, why we created it and how it works. If you need detailed instructions on how to install Open edX with Tutor, `we have a separate tutorial for that </academy/resource/openedx-install>`__.

Put simply, Tutor is a piece of software that we have created to help install, manage, upgrade and develop Open edX. The catch phrase for Tutor is "the Open edX distribution designed for peace of mind". With Tutor, Open edX runs inside Docker containers, either with Docker Compose or Kubernetes. Tutor is free and open source, and it is written in Python. We can check out the source code on `github.com/overhangio/tutor <https://github.com/overhangio/tutor>`__. The documentation is available at `docs.tutor.edly.io <https://docs.tutor.edly.io>`__.

Why Tutor?
==========

But why did we create a separate piece of software just to install Open edX? Were there no installation scripts in Open edX itself? This is a perfectly reasonable question. Well, there is a short answer and a long answer.

Short answer: Open edX is a complex platform that is composed of many different services, some of them optional. Each service has its own configuration, its own runtime environment and its own set of constraints. So we needed to build a tool to enable, configure and run these services.

The longer answer is that there used to be other tools and scripts to deploy Open edX, but they are no longer supported. The most popular was called the "native installation". The native installation worked, but it was slow and it was complex and it did not support Docker. At some point, I decided that I no longer wanted to use the native installation to deploy Open edX, and I started working on what would eventually become Tutor. My company was later acquired by Edly, who are now the main stewards of the Tutor project.

Tutor is now the official method to run Open edX for the entire community. Thousands of platforms around the world run on Tutor.

How does Tutor work?
====================

So, how does Tutor work? Personally, I think that Tutor is actually quite simple. Tutor does just three things:

1. Tutor manages the configuration of the platform.
2. Tutor uses this configuration to render files from templates.
3. Tutor exposes a command line interface that makes it as convenient as can be to manage an Open edX platform.

And Tutor also comes with an extensive, fine-grained plugin API that makes it possible to customize these three aspects individually.

Configuration
-------------

Let's have a look at these three aspects in more detail. We will assume that Tutor is already installed on our system. We start with the least exciting part: configuration. In Tutor, each configuration setting has a name and value. We can check the value of any setting using the ``tutor config printvalue`` command. For instance, the default language of our platform corresponds to the LANGUAGE_CODE setting. To check out the language of our platform, we run::

    $ tutor config printvalue LANGUAGE_CODE
    en

"en" is the language code for "English", which is our platform default language.

To change the value of any configuration setting, we should use the ``--set`` option of the ``tutor config save`` command. For instance, to change our platform default language to French, we run::

    tutor config save --set LANGUAGE_CODE=fr

But where are these configuration settings stored? In a location of the filesystem that we call the "project root". The project root will depend on our operating system. We can check out the project root by running the "tutor config printroot" command. On my Linux system, that is ``~/.local/share/tutor``. It will be different for users running macOS.

Let's check out this project root::

    $ ls ~/.local/share/tutor
    config.yml  data  env

This directory contains a ``config.yml`` file. This is the place where we persist the configuration of our Open edX platform. If we open this file in an editor, we can see that it contains the LANGUAGE_CODE key and value that we defined earlier.

Template rendering
------------------

But what do we use these configuration settings for? These settings are used in different places, but the most important one is the template rendering. Tutor ships with a set of template files. We can check out these files in the source code of Tutor, in the `tutor/templates <https://github.com/overhangio/tutor/tree/master/tutor/templates>`__ folder.

For instance, the  `local/docker-compose.yml <https://github.com/overhangio/tutor/blob/master/tutor/templates/local/docker-compose.yml>`__ template is not an actual Docker Compose configuration file, but a template that contains many references to configuration settings as well as other functions which we will talk about later when we cover plugins.

When we run the command ``tutor config save``, Tutor loads this template and replaces all the references to variables and functions by their actual values. This is the process that we call "template rendering". The templates are rendered in our project root, in a subdirectory named ``env/``. We call this directory the project environment. If we go into this directory, we can see that there is a ``docker-compose.yml`` file inside the ``env/local`` folder. This file is a proper Docker Compose configuration file. For instance, the ``DOCKER_IMAGE_OPENEDX`` variable was replaced by its actual value::

    $ cat ~/.local/share/tutor/env/local/docker-compose.yml
    ...
      lms-worker:
        image: docker.io/overhangio/openedx:17.0.2-indigo
    ...

What this means is that the entire project environment is actually the product only of the user configuration and the Tutor templates. We can just delete this folder whenever we want. The subdirectory will be recreated every time we run ``tutor config save`` or ``tutor local launch``.

A consequence of this is that we should never make changes to the environment files in the ``env/`` folder. If we do, our changes will be overwritten the next time we run "tutor config save". And that is a mistake that many users make.

Command line interface (CLI)
----------------------------

Tutor uses the platform settings and the rendered environment files to launch and manage an Open edX platform. But to operate Open edX, we need to run a variety of commands in a specific order. This is a complex process that we simplify by exposing a convenient command line interface (CLI). For instance, to launch a new Open edX platform from scratch, we run ``tutor local launch``. This single command will run many commands for us: it will stop any existing platform, render the environment, start the platform again, make sure the databases are created, run migration scripts, create necessary users, etc.


Plugins
=======

So, to recap, Tutor does three things, and they are: configuration management, template rendering, and a command line interface. But we can also make changes to these three aspects. And we do that with Tutor plugins.

Let's start with an example. Suppose we want to change the configuration of the LMS in edx-platform. For instance, we want to increase the maximum size of the files uploaded by students. By default, it is 4 MB, and we would like to set it to 8 MB. In edx-platform, we should modify the setting named `"STUDENT_FILEUPLOAD_MAX_SIZE" <https://github.com/openedx/edx-platform/blob/b706e600a0afc66f985762e06bf6348bc685fb0a/lms/envs/common.py#L1420>`__ and set its value to eight million.

If you made it this far, then you know that we should definitely not add the setting to the rendered files in the Tutor environment directory. That's because any changes we make are going to be overwritten the next time we run "tutor config save".

We should also not be adding that setting to the ``config.yml`` file in the Tutor project root. Because that setting is not going to magically find its way to the rendered LMS production settings file, in the Tutor environment.

We should also not modify the templates in the Tutor source code, because we would then have a hard time to keep up with future changes in the Tutor code base.

So what can we do to apply our new setting? The right answer is: create a new Tutor plugin. You might think that creating a plugin is overkill just to define a new Open edX setting. But I guarantee that plugin development is a smooth and straightforward process. It's also the most reliable way to persist changes to Tutor across version upgrades, so you should definitely give it a try.

We are not going to cover plugin development in this video, but if you want to learn more, you should check out the `plugin development tutorial <https://docs.tutor.edly.io/tutorials/plugin.html>`__. Make sure to also explore `other plugins <https://edly.io/tutor/plugins-and-themes/>`__ developed by Edly and the rest of the Open edX community.
