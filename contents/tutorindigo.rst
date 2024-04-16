=======================================
Tutor Indigo - Theme Plugin for Openedx
=======================================

Tutor Indigo is a theme designed for use with Tutor, to give a new look to Openedx platform. To install and activate the Indigo plugin, use the following commands::

    tutor plugins install indigo
    tutor plugins enable indigo
    tutor local launch

By default when tutor is installed, the Indigo theme will be installed along it and automatically applied if a different theme is not previously defined. 

Customization
=============

Customization options include modifying settings such as the welcome message, primary color, and footer navigation links. These settings can be adjusted using the ``tutor config save --set`` command.

For deeper customization, the plugin can serve as a foundation for creating custom themes. Forking the repository and making modifications allows for tailored designs. Changes can be viewed instantly in development mode using tutor dev commands. Following are the customizations can be done through tutor Indigo.

1. Changing Platform Logos and Images
-------------------------------------

To change a platform logo and image, replace or add your images with the image files in ``tutorindigo/templates/indigo/lms/static/images`` for LMS and ``tutorindigo/templates/indigo/cms/static/images`` for CMS. While doing so, ensure that the file name remains same with the already existing images or LMS images.

2. Changing fonts
-----------------

To change font family of the LMS platform, Either add downloaded font files in the ``tutorindigo/templates/indigo/lms/static/fonts`` folder and add their path in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file or give the google font url in the ``tutor-indigo/tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file. After that, in ``tutor-indigo/tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file, add the line ``@import "fonts"`` so that the font will be loaded for the entire platform. In ``tutor-indigo/tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_variables.scss`` file, update font family name to your chosen font.

3. Changing Sass Styles
-----------------------

To change the styling, modify the files in ``tutorindigo/templates/indigo/lms/static/sass`` for LMS and ``tutor-indigo/tutorindigo/templates/indigo/cms/static/sass`` for CMS. Note that ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file is used to add and override previous styles.

4. Updating HTML templates
--------------------------

To update the HTML templates, add your HTML files in the ``tutorindigo/templates/indigo/lms/templates`` folder and ensure that the folder structure should match the ``edx-platform/lms/static/templates`` so that the added files will be overridden.

5. Changing MFE Styles
----------------------

To change MFE Styles, ``@edx/brand`` package is used. Then, include your customized brand package link in ``tutorindigo/plugin.py`` file. 

6. Activating Dark theme
------------------------

To enable the dark theme using Tutor Indigo, set the configuration variable by running the command ``tutor config save --set INDIGO_ENABLE_DARK_THEME=True``.

To deploy the above customizations to production, rebuild the "openedx" Docker image and restart containers::

    tutor images build openedx
    tutor images build mfe
    tutor local start -d
