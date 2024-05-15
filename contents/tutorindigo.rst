================================================================
Tutor Indigo - Customize the user experience by branding OpenedX
================================================================

Tutor Indigo is a theme designed for use with Tutor, to give a new look to Openedx platform. To install and activate the Indigo plugin, use the following commands::

    tutor plugins install indigo
    tutor plugins enable indigo
    tutor local launch

By default when tutor is installed, the Indigo theme will be installed along it and automatically applied if a different theme is not previously defined. 

Customization
=============

The theme can be customized according to your branding assets. Customization options include modifying settings such as the welcome message, primary color, and footer navigation links. These settings can be adjusted using the ``tutor config save --set INDIGO_*=`` command.

For deeper customization, the plugin can serve as a foundation for creating custom themes. Forking the repository and making modifications allows for tailored designs. Changes can be viewed instantly in development mode using tutor dev commands. Here's how you can customize using Tutor Indigo.

1. Logos and Images Alterations
-------------------------------

To change platform logo and image, Replace or add images in ``tutorindigo/templates/indigo/lms/static/images`` for the LMS and ``tutorindigo/templates/indigo/cms/static/images`` for the CMS, ensuring filenames match existing with images in LMS.

.. image:: /academy/static/images/tutorindigo/logo_favicon.png
  :width: 800
  :alt: Logo and Favicon Example Image

2. Font Modifications
---------------------

Font family for LMS can be changed as below:
    - Add downloaded font files in the ``tutorindigo/templates/indigo/lms/static/fonts`` folder and adjust their path in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file 
    - In case of Google font URL, include URL in the ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_fonts.scss`` file (Optional)
    - Then, In ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file, add the below line for loading the fonts in LMS platform::

            @import "fonts"; 

    - Last, Set font family in ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_variables.scss`` file.

CMS requires one more step in addition to above steps for changing font family.
    - Include the below line in ``tutor-indigo/tutorindigo/templates/indigo/cms/static/sass/partials/cms/theme/_variables-v1.scss`` file after ``$static-path`` definition::

        @import "fonts";  

.. list-table:: Font Updations Example
   :widths: 50 50
   :header-rows: 1

    * - .. image:: /academy/static/images/tutorindigo/lms_font_change.png
            :width: 400
            :alt: LMS Inter Font Style Example
      - .. image:: /academy/static/images/tutorindigo/cms_font_change.png
            :width: 400
            :alt: CMS Inter Font Style Example
    

3. Sass Styles Adjustments
--------------------------

Customize styles in ``tutorindigo/templates/indigo/lms/static/sass`` for LMS and ``tutorindigo/templates/indigo/cms/static/sass`` for CMS. Note that ``tutorindigo/templates/indigo/lms/static/sass/partials/lms/theme/_extras.scss`` file is used for adding and overriding styles.

4. Updating HTML templates
--------------------------

Add HTML files in ``tutorindigo/templates/indigo/lms/templates``, ensuring folder structure matches ``edx-platform/lms/static/templates`` for proper overriding.

5. Changing MFE Styles
----------------------

Utilize the ``@edx/brand`` package and include customized brand package links in ``tutorindigo/plugin.py`` to modify MFE styles.

6. Activating Dark theme
------------------------

To enable the dark theme using Tutor Indigo, set the configuration variable by running the command ``tutor config save --set INDIGO_ENABLE_DARK_THEME=True``.

To deploy the above customizations to production, rebuild the "openedx" Docker image and restart containers::

    tutor images build openedx
    tutor images build mfe
    tutor local start -d

.. image:: /academy/static/images/tutorindigo/lms_dark_theme.png
    :width: 800
    :alt: Openedx LMS Dark theme Example

.. image:: /academy/static/images/tutorindigo/learner_dashboard_mfe_dark_theme.png
    :width: 800
    :alt: Openedx Learner Dashboard MFE Dark theme Example

Tutor Indigo offers a comprehensive toolkit for enhancing and personalizing the Open edX platform. By following the above steps, you can tailor the platform's appearance to better suit your organization's needs and branding requirements.