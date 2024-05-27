Before delving into Tutor Indigo, it's essential to grasp the fundamentals of `Open edX <https://openedx.org/>`_ and `Tutor <https://docs.tutor.edly.io/>`__. If you're unfamiliar with these terms, worry not! Open edX is a powerful platform for online learning, while Tutor is a specialized piece of software designed to streamline the installation, management, and development of Open edX instances. For a comprehensive overview of Tutor and how it makes the process of setting up Open edX easy, check out `this separate tutorial </academy/resource/what-is-tutor>`__.

A little bit of knowledge about comprehensive theming is also required for making template and style changes that is Open edX by default theme. More details can be found on `Comprehensive Theming <https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/ecommerce/theming.html>`_ and `Changing the appearance of Open edX <https://docs.tutor.edly.io/tutorials/theming.html>`__.

What is a theme? 
================

A theme is a collection of files and settings that determine the visual appearance and user interface of the site. It includes stylesheets, templates, and sometimes scripts that together define the colors, fonts, layouts, and overall aesthetic of the platform. Themes allow us to customize the look and feel of our ed tech platform to match our brand identity and provide a cohesive user experience.

So why do we need to install theme? Installing a theme for the platform allows us to improve user experience and customize it according to our brand. The theme allows us to align the platform’s visuals with our organization’s brand, helping us maintain a professional and trustworthy look. 
Themes like Indigo are designed to enhance user experience by making it easier to navigate through the platform and engage with course content. In addition to this, themes provide a consistent look and feel across all pages and components of your platform, which is important for user familiarity and comfort.

Importance of Indigo in Open edX
================================

`Indigo <https://github.com/overhangio/tutor-indigo>`_ is a specially designed theme for Open edX that brings a modern, clean, and intuitive interface to the Open edX platform. 
Firstly, Indigo offers a sleek and responsive design for all devices to enhance accessibility for all users. Secondly, Indigo is built with customization in mind, allowing organizations to easily tweak the appearance to better match their branding needs.
The goal for Indigo has been to engage learners with welcoming messaging and intuitive navigation across the platform. Furthermore, since Indigo is a widely adopted theme within the Open edX community, it benefits from continuous improvements and support from the community, ensuring it stays up-to-date with the latest releases. 

What is a plugin?
=================

Plugins are software that can add new features, improve existing ones, or customize the behavior of the platform to better suit specific needs. Tutor plugins are the best way to modify the behavior of Tutor and Open edX. A `Tutor plugin <http://academy.overhang.io/academy/resource/tutorplugins/>`_ is a Python module that will be loaded at runtime. This Python module will make use of the Tutor plugin API to change how Tutor works.
Tutor plugins are used for changing the Open edX LMS configuration settings, adding a new micro frontend to the platform, setting up a new theme, running a new application or installing custom Python requirements in the docker image. Essentially, plugins can allow organizations to tailor the learning experience and address the organizations’ diverse needs.

Tutor Indigo
============

`Tutor Indigo <https://github.com/overhangio/tutor-indigo?tab=readme-ov-file#indigo-a-cool-blue-theme-for-open-edx>`_ is a theme designed for use with Tutor, to give a new look to Openedx platform.
To install and activate the Indigo plugin, use the following commands::

    tutor plugins install indigo
    tutor plugins enable indigo
    tutor local launch

By default when Tutor is installed, the Indigo theme will be installed along it and automatically applied if a different theme is not previously defined. 

Customization
=============

Do you want to make your Open edX platform look professional and trustworthy? Then, you have to use your own branding assets. Using your own branding assets will ensure your site stands out and is easily recognizable, therefore, creating a seamless experience for your learners. It will reinforce your brand identity and will connect with your audience better. 
Furthermore, Customization options include modifying settings such as the welcome message, primary color, and footer navigation links. With the use of primary and secondary colors, the Indigo theme has highlighted Calls To Action (CTAs) and updated buttons across the platform to drive user engagement. The theme allows you to replace these with your brand colors if you desire to build a coherent brand image for your platform.
Similarly, there are placeholders for you to add your organization’s information through the footer navigation links. You can even direct your user to your organization’s privacy policy and terms and conditions.

These settings can be adjusted using the ``tutor config save --set INDIGO_*=`` command. The ``INDIGO_*`` means to set the configuration variables with INDIGO_ prefix as below.

1. For setting purple as primary color for platform, you need to run::

    tutor config save --set INDIGO_PRIMARY_COLOR="#A020F0"

2. For updating welcome message, following should be run::

    tutor config save --set INDIGO_WELCOME_MESSAGE="The best place to learn online"

3. To remove all links from footer, run::

    tutor config save --set "INDIGO_FOOTER_NAV_LINKS=[]"

    # in case of adding custom links
    tutor config save --set INDIGO_FOOTER_NAV_LINKS="[{"title": "About", "url": "/about"}, {"title": "Contact", "url": "/contact"}]"

.. image:: /academy/static/images/tutorindigo/configurations.png
    :width: 800
    :alt: Welcome message, primary color and footer navigation links can be updated through Tutor Indigo

For deeper customization, the plugin can serve as a foundation for creating custom themes. Forking the repository and making modifications allows for tailored designs. Changes can be viewed instantly in development mode using tutor dev commands. Here's how you can customize using Tutor Indigo.

Logos and Images Alterations
----------------------------

Changing the platform logo and favicon will reinforce your brand identity and ensure user recognition. The platform logo appears in the header, while the favicon is the small icon in the browser tab. Customizing these elements creates a professional and consistent look across your Open edX platform. However, the theme currently offers a placeholder logo that can easily be replaced later when your organization wishes to transition to a more customized learning experience. 
To use your own logo and images, following steps need to be done:

- Clone the Tutor Indigo by running the command ``git clone https://github.com/overhangio/tutor-indigo.git``
- Go to ``tutorindigo/templates/indigo/lms/static/images`` for replacing images for LMS and ``tutorindigo/templates/indigo/cms/static/images`` for replacing images for CMS
- Remove the already logo and platform image from the folders mentioned in previous step. Add your logo and platform images in these folders. Ensure that your image name remains the same as the previous images. For example, if you want to change ``tutor-logo.png``, you can add your logo and rename it to ``tutor-logo.png``. 
- Similar to above steps, you can update all images including favicon.ico

.. image:: /academy/static/images/tutorindigo/logo_favicon.png
  :width: 800
  :alt: Logo and Favicon Example Image

Font Modifications
------------------

There are two ways to update font family of LMS. One is to use your own font files and second is to use google fonts url. Follow the below steps to update font of LMS:

- Clone the Tutor Indigo by running the command ``git clone https://github.com/overhangio/tutor-indigo.git``
- Download your font files and move them to ``tutorindigo/templates/indigo/lms/static/fonts`` folder. For example, you want to change LMS font family to "Crimson". Download your files and move to the ``tutorindigo/templates/indigo/lms/static/fonts`` folder
- Now, setup their path in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file. If the file is not present, then create it and add the font files path to it. In case of Crimson font, you need to add this:

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

Here, you have to ensure that ``font-weight`` and ``font-style`` should match with the respective files. Like, ``fonts/CrimsonText-Bold.ttf`` has font-weight 700 and font-style normal.

- If you don't want to add font files and use Google font URL. Then, add the below url in the ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file (for `Crimson font family <https://fonts.google.com/specimen/Crimson+Text>`_)::

    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');

- After that, In ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file, add the below line for loading the fonts in LMS platform::

    @import "fonts"; 

- Lastly, Set font family in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_variables.scss`` file as below::

    $font-family-title: 'Crimson', sans-serif;;
    $serif: Crimson;
    $f-sans-serif: Crimson, 'Open Sans','Helvetica Neue', Helvetica, Arial, sans-serif;

The above steps need to be followed for CMS. But CMS requires one more step in addition to above steps for changing font family.

- Include the below line in ``tutor-indigo/tutorindigo/templates/indigo/cms/static/sass/partials/cms/theme/_variables-v1.scss`` file after ``$static-path`` definition::

    $baseline: 20px;

    $static-path: '..' !default;

    @import "fonts";   /* add this line */

    ......

After doing so, Run ``tutor config save`` &  ``tutor local stop``. Run ``tutor images build openedx`` to build the Open edX image with the updated images. Finally, start the platform using ``tutor local start -d``. You can successfully view the updated font family using browser inspection tool as in the below image.

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

Customize styles in ``tutorindigo/templates/indigo/lms/static/sass`` for LMS and ``tutorindigo/templates/indigo/cms/static/sass`` for CMS. Note that ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file is used for adding and overriding styles. For Example, To change the background-color of body, follow the below steps:

- Clone the Tutor Indigo by running the command ```git clone https://github.com/overhangio/tutor-indigo.git```
- Add your styles in the ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss``

.. code-block:: sass

    body {
        min-height: initial;
        background-color: #fff;
    }

- Install the updated Tutor Indigo Plugin


Updating HTML templates
-----------------------

Add HTML files in ``tutorindigo/templates/indigo/lms/templates``, ensuring folder structure matches `edx-platform/lms/templates <https://github.com/openedx/edx-platform/tree/master/lms/templates>`_ for proper overriding.

For example, You want to add detail of Open edX in footer. You have to follow the below points:

- Clone the Tutor Indigo by running the command ``git clone https://github.com/overhangio/tutor-indigo.git``
- Search the template in `edx-platform/lms/templates <https://github.com/openedx/edx-platform/tree/master/lms/templates>`_  which is used for footer rendering.
- The footer template exists at ``edx-platform/lms/templates/footer.html`` in edx-platform.
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

To enable the dark theme using Tutor Indigo, set the configuration variable by running the command ``tutor config save --set INDIGO_ENABLE_DARK_THEME=True``. Then follow the "How to deploy Customizations to Production" section at the last of this guide.

How to deploy Customizations to Production
==========================================

To deploy the above customizations to production, rebuild the "openedx" Docker image and restart containers::

    ## assuming updated tutor-indigo is installed
    
    tutor config save
    tutor images build openedx
    tutor images build mfe
    tutor local start -d

.. image:: /academy/static/images/tutorindigo/learner_dashboard_mfe_dark_theme.png
    :width: 800
    :alt: Open edX Learner Dashboard MFE Dark theme Example

Tutor Indigo offers a comprehensive toolkit for enhancing and personalizing the Open edX platform. By following the above steps, you can tailor the platform's appearance to better suit your organization's needs and branding requirements.