Prerequisites
=============

Before you begin, ensure that:

1. `Tutor <https://docs.tutor.edly.io/>`__ is installed
2. You have basic familiarity with Open edX (watch our `installation
   video <https://www.youtube.com/watch?v=dTHHeEXu2c8>`__!)

Introduction
============

Traditionally, managing Tutor plugins has required command-line skills
which is very effective, but not always user-friendly. **Tutor Deck** is
a new graphical interface designed to make plugin management simple and
intuitive.

With **Tutor Deck**, you can:

-  Browse and discover plugins from plugin marketplace
-  Install, enable, and configure plugins with just a few clicks
-  Modify plugin settings easily
-  Restart the platform via GUI
-  Use advanced CLI mode when needed

This guide will walk you through the installation steps, key features,
and usage tips for getting the most out of Tutor Deck.

Installation
------------

Installing Tutor Deck is quick and easy; just run the following
commands:

.. code:: none

   tutor plugins update
   tutor plugins install deck
   tutor plugins enable deck

Then, run the Tutor Deck server with:

.. code:: none

   tutor deck runserver

Browse the Plugin Marketplace
-----------------------------

Once installed, visit `http://localhost:3274 <>`__

You'll see a catalog of all available plugins. Each plugin card
includes:

-  **Name & Description**
-  **Author Information**
-  **Status**: Installed / Enabled / Disabled

Click on a plugin to view details and install it.

.. image:: /academy/static/images/tutor-deck/marketplace.png
   :width: 800

Install & Enable a Plugin
-------------------------

-  Click the **Install** button to install the plugin.

-  You will see logs during the installation, this will help you
   troubleshoot in case of any problems.

-  Once installation is complete, click **Enable**.

-  You will see a list of parameters that you can modify, if needed.
   Else, you can use the default settings.

.. image:: /academy/static/images/tutor-deck/install-plugin.png
   :width: 800

Restarting the Platform
-----------------------

After each action (**Install, Enable, Upgrade**), you'll be prompted to
**Apply Changes**. This is equivalent to running **tutor local launch**
via CLI and is required for changes to take effect.
.. image:: /academy/static/images/tutor-deck/restarting.png
   :width: 800

*Important: This step can take a few minutes, so it's best to do this
outside of operational hours.*

*Tip: If you experience any issues, logs will be displayed to help with
troubleshooting.*

Managing Installed Plugins
--------------------------

The **“Installed Plugins” tab** shows all installed plugins. You can:

-  Enable or disable plugins using a **toggle switch**
-  Access or modify **plugin settings**

.. image:: /academy/static/images/tutor-deck/installed.png
   :width: 800

Developer Mode: CLI for Power Users
-----------------------------------

Need more control? Use the **CLI Mode** to:

-  Enter Tutor CLI commands in a search box
-  Execute with a click
-  View execution logs in real-time

It's perfect for those who want speed *and* control.

.. image:: /academy/static/images/tutor-deck/developer-mode.png
   :width: 800

A Dedicated “Apply Changes” Tab
-------------------------------

Need to apply changes to your platform at any time? The **“Apply
Changes” tab** allows you to:

-  Run the **local launch** command
-  View execution logs
-  Cancel the operation if needed

.. image:: /academy/static/images/tutor-deck/apply-changes.png
   :width: 800

A Quick Note: Early Release
---------------------------

Tutor Deck is still in its early days. Some features aren't fully
supported out of the box, such as running job commands. Others, like
executing Tutor commands from outside the deck might fail.

That said, we're excited to put this in your hands early. We welcome
`feedback <https://discuss.openedx.org/>`__, `bug
reports <https://github.com/overhangio/tutor-deck/issues>`__, feature
requests, and yes, `pull
requests <https://github.com/overhangio/tutor-deck/issues>`__. This is
very much a work in progress and a community-driven tool.
