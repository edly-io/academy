Before delving into Tutor Indigo, it's essential to grasp the fundamentals of `Open edX <https://openedx.org/>`_ and `Tutor <https://docs.tutor.edly.io/>`__. If you're unfamiliar with these terms, worry not! Open edX is a powerful platform for online learning, while Tutor is a specialized piece of software designed to streamline the installation, management, and development of Open edX instances. For a comprehensive overview of Tutor and how it makes the process of setting up Open edX easy, check out `this separate tutorial </academy/resource/what-is-tutor>`__.

A little bit of knowledge about comprehensive theming is also required for making template and style changes that is Open edX by default theme. More details can be found on `Comprehensive Theming <https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/ecommerce/theming.html>`_ and `Changing the appearance of Open edX <https://docs.tutor.edly.io/tutorials/theming.html>`__.

What is a theme?
================

A theme is a collection of files and settings that determine the visual appearance and user interface of the site. It includes stylesheets, templates, and sometimes scripts that together define the colors, fonts, layouts, and overall aesthetic of the platform. Themes allow us to customize the look and feel of our ed tech platform to match our brand identity and provide a cohesive user experience.

So why do we need to install a theme? Installing a theme for the platform allows us to improve the user experience and customize it according to our brand. A theme allows us to align the platform’s visuals with our organization’s brand, helping us maintain a professional and trustworthy look.
Themes like `Indigo <https://github.com/overhangio/tutor-indigo>`_ are designed to enhance user experience by making it easier to navigate through the platform and engage with course content. In addition to this, themes provide a consistent look and feel across all pages and components of your platform, which is important for user familiarity and comfort.

What is Indigo
==============

`Indigo <https://github.com/overhangio/tutor-indigo>`_ is a specially-designed theme for Open edX that brings a modern, clean, and intuitive interface to the Open edX platform.

Firstly, Indigo offers a sleek and responsive design for all devices to enhance accessibility for all users.

Secondly, Indigo is built with customization in mind, allowing organizations to easily tweak the appearance to better match their branding needs. The goal for Indigo has been to engage learners with welcoming messaging and intuitive navigation across the platform.

Finally, since Indigo is a widely-adopted theme within the Open edX community, it benefits from continuous improvements and support from the community, ensuring it stays up-to-date with the latest releases.

What is a plugin?
=================

Plugins are pieces of software that can add new features, improve existing ones, or customize the behavior of the platform to better suit specific needs. Tutor plugins are the best way to modify the behavior of Tutor and Open edX. A `Tutor plugin <http://academy.overhang.io/academy/resource/tutorplugins/>`_ is a Python module that will be loaded at runtime. This Python module will make use of the Tutor plugin API to change how Tutor works.

Tutor plugins are used, for instance: to change the Open edX LMS configuration settings, add a new micro frontend to the platform, set up a new theme, run a new application, or install custom Python requirements in the Docker image, etc. Essentially, plugins can allow organizations to tailor the learning experience and address the organizations’ diverse needs.

Indigo Installation
===================

To install and activate the Indigo plugin, use the following commands::

    tutor plugins install indigo
    tutor plugins enable indigo
    tutor local launch

By default when Tutor is installed, the Indigo theme will be installed along it and automatically applied if a different theme is not previously defined.

Customization
=============

To establish a professional and trustworthy presence on your Open edX platform, it is essential to incorporate your branding assets. This will ensure your site stands out and is easily recognizable, therefore, creating a seamless experience for your learners. It will reinforce your brand identity and will connect with your audience better.

Customization options include modifying settings such as the welcome message, primary color, and footer navigation links. With the use of primary and secondary colors, the Indigo theme has highlighted Calls To Action (CTAs) and updated buttons across the platform to drive user engagement. The theme allows you to replace these with your brand colors.

Similarly, there are placeholders to add your organization’s information to the footer navigation links. You can also direct your user to your organization’s privacy policy and terms and conditions.

These settings can be adjusted using the ``tutor config save --set INDIGO_*=`` command. The ``INDIGO_*`` means to set the configuration variables with ``INDIGO_`` prefix as below.

1. To set purple as primary color for platform, run::

    tutor config save --set INDIGO_PRIMARY_COLOR="#A020F0"

2. To update the platform welcome message, run::

    tutor config save --set INDIGO_WELCOME_MESSAGE="The best place to learn online"

3. To remove all links from footer, run::

    tutor config save --set "INDIGO_FOOTER_NAV_LINKS=[]"

    # in case of adding custom links
    tutor config save --set INDIGO_FOOTER_NAV_LINKS="[{"title": "About", "url": "/about"}, {"title": "Contact", "url": "/contact"}]"

.. image:: /academy/static/images/tutorindigo/configurations.png
    :width: 800
    :alt: Welcome message, primary color and footer navigation links can be updated through Tutor Indigo

Indigo can serve as a foundation for more extensive customization and more custom themes. Forking the repository and making modifications allows for tailored designs. Changes can be viewed instantly in development mode using ``tutor dev`` commands. Here's how to customize Tutor Indigo.

How to make changes to the Indigo plugin
----------------------------------------

To apply changes to a dedicated subsection, clone the Tutor Indigo by running ``git clone https://github.com/overhangio/tutor-indigo.git`` and make changes in it. To reflect the changes, rebuild the "openedx" Docker image and restart containers::

    cd tutor-indigo
    pip install -e .                # install forked tutor-indigo

    tutor config save
    tutor images build openedx      # rebuild Open edX image
    tutor images build mfe          # rebuild MFE image if the changes are related to MFEs
    tutor local start -d


Logos and Images Alterations
----------------------------

Changing the platform logo and favicon will reinforce your brand identity and ensure user recognition. The platform logo appears in the header, while the favicon is the small icon in the browser tab. Customizing these elements creates a professional and consistent look across your Open edX platform. However, the theme currently offers a placeholder logo that can easily be replaced later when your organization wishes to transition to a more customized learning experience.

To use your logo and images, do the following:

- Go to ``tutorindigo/templates/indigo/lms/static/images`` for replacing images in the LMS and ``tutorindigo/templates/indigo/cms/static/images`` for replacing images in the Studio.
- Remove the already logo and platform image from the folders mentioned in previous step. Add your logo and platform images in these folders. Ensure that your image name remains the same as the previous images. For example, to change ``tutor-logo.png``, add your logo to the same directory and rename it to ``tutor-logo.png``.
- Similar to above steps, you can update all favicon images by replacing the ``favicon.ico`` file.

.. image:: /academy/static/images/tutorindigo/logo_favicon.png
  :width: 800
  :alt: Logo and Favicon Example Image

Font Modifications
------------------

There are two ways to update the font families used in the LMS. One is to use your font files and the second is to use Google Fonts url. Follow the below steps to update the fonts of your LMS:

- Download your font files and move them to the ``tutorindigo/templates/indigo/lms/static/fonts`` folder. For example, to change the LMS default font family to `Crimson <https://fonts.google.com/specimen/Crimson+Text>`__, download the ``CrimsonText*.ttf`` files and move them to the ``tutorindigo/templates/indigo/lms/static/fonts`` folder
- Now, setup the font file paths in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file. If the file is not present, then create it and add the font files path to it. In case of Crimson font, add the following:

.. code-block:: sass

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-Italic.ttf') format('truetype');
        font-weight: 400;
        font-style: italic;
    }

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-SemiBold.ttf') format('truetype');
        font-weight: 600;
        font-style: normal;
    }

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-SemiBoldItalic.ttf') format('truetype');
        font-weight: 600;
        font-style: italic;
    }

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Crimson';
        src: url('#{$static-path}/fonts/CrimsonText-BoldItalic.ttf') format('truetype');
        font-weight: 700;
        font-style: italic;
    }

Here, you have to ensure that ``font-weight`` and ``font-style`` are consistent with the respective files. For instance, ``fonts/CrimsonText-Bold.ttf`` has font-weight 700 and font-style normal.

- After that, In ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file, add the below line for loading the fonts in LMS platform::

    @import "fonts";

- Lastly, set font family in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_variables.scss`` file as below::

    $font-family-title: 'Crimson', sans-serif;;
    $serif: Crimson;
    $f-sans-serif: Crimson, 'Open Sans','Helvetica Neue', Helvetica, Arial, sans-serif;

The above steps need to be followed for CMS. But CMS requires one more step in addition to the above steps for changing the font family.

- Include the below line in ``tutor-indigo/tutorindigo/templates/indigo/cms/static/sass/partials/cms/theme/_variables-v1.scss`` file after ``$static-path`` definition::

    ...
    $static-path: '..' !default;
    @import "fonts";   /* add this line */
    ...

After making the above changes, run::

    tutor config save                  # update tutor environment
    tutor images build openedx         # rebuild Docker image
    tutor local start -d               # apply changes

.. list-table:: Font Updations Example
   :widths: 50 50
   :header-rows: 1

    * - .. image:: /academy/static/images/tutorindigo/lms_font_change.png
            :width: 400
            :alt: LMS Inter Font Style Example
      - .. image:: /academy/static/images/tutorindigo/cms_font_change.png
            :width: 400
            :alt: CMS Inter Font Style Example


Sass Styles Adjustments
-----------------------

Customize styles in ``tutorindigo/templates/indigo/lms/static/sass`` for LMS and ``tutorindigo/templates/indigo/cms/static/sass`` for CMS. Note that the ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file is used for adding and overriding styles. For example, to change the body background-color, add your styles in the ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` as follows::

.. code-block:: sass

    body {
        min-height: initial;
        background-color: #fff;
    }


Updating HTML templates
-----------------------

Add HTML files in ``tutorindigo/templates/indigo/lms/templates``, ensuring folder structure matches `edx-platform/lms/templates <https://github.com/openedx/edx-platform/tree/master/lms/templates>`_ for proper overriding.

For example, You want to add detail of Open edX in footer. You have to follow the below points:

- Search the template in `edx-platform/lms/templates <https://github.com/openedx/edx-platform/tree/master/lms/templates>`_  which is used for footer rendering. You will find that the footer template exists at ``edx-platform/lms/templates/footer.html`` in edx-platform.
- You have to copy the file and paste in Tutor Indigo Plugin at ``tutor-indigo/tutorindigo/templates/indigo/lms/templates/footer.html``
- Make your changes and install the updated plugin for reflecting the changes.

.. image:: /academy/static/images/tutorindigo/footer-update-1.png
  :width: 800
  :alt: Footer Update Image 1

.. image:: /academy/static/images/tutorindigo/footer-update-2.png
  :width: 800
  :alt: Footer Update Image 2

Changing MFE Styles
-------------------

Clone the `@edx/brand <https://github.com/openedx/brand-openedx>`_ package and customize it. Include customized brand package links in ``tutorindigo/plugin.py`` to modify MFE styles. You can checkout `this link <https://github.com/overhangio/tutor-indigo?tab=readme-ov-file#cant-override-styles-using-indigo-theme-for-mfes>`_ for further details.

Activating Dark theme
---------------------

You can now give users a more familiar experience by enabling the dark theme. Dark themes are increasingly popular for their aesthetic appeal and reduced eye strain, especially in low-light environments. By offering a dark theme, you cater to user preferences and enhance their overall experience on your platform.

To enable the dark theme using Tutor Indigo, set the configuration variable by running the command ``tutor config save --set INDIGO_ENABLE_DARK_THEME=True``. This simple customization can make a significant difference in user satisfaction and engagement.


.. image:: /academy/static/images/tutorindigo/lms_dark_theme.png
    :width: 800
    :alt: Open edX LMS Dark theme Example

.. image:: /academy/static/images/tutorindigo/learner_dashboard_mfe_dark_theme.png
    :width: 800
    :alt: Open edX Learner Dashboard MFE Dark theme Example

Tutor Indigo offers a comprehensive toolkit for enhancing and personalizing the Open edX platform. By doing the above customizations, you can tailor the platform's appearance to better suit your organization's needs and branding requirements.
