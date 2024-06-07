<?php

/**
 * Plugin Name: BWL Advanced FAQ Manager Lite
 * Plugin URI: https://bluewindlab.net
 * Description: A WordPress plugin designed for managing frequently asked questions. With this plugin, you can effortlessly create an unlimited number of FAQ items and seamlessly display them on the front end of your website.
 * Author: Mahbub Alam Khan
 * Version: 1.1.0
 * Author URI: https://bluewindlab.net
 * WP Requires at least: 6.0
 * Text Domain: bwl-adv-faq
 */

if (!class_exists('BWL_Advanced_Faq_Manager')) {

    class BWL_Advanced_Faq_Manager
    {
        function __construct()
        {
            define("BWL_BAF_PLUGIN_VERSION", '1.1.0');
            define("BWL_BAF_PLUGIN_UPDATER_SLUG", plugin_basename(__FILE__));
            define("BWL_BAF_PLUGIN_PATH", __DIR__);
            define('BWL_BAF_INSTALLATION_TAG', 'baf_installation_' . str_replace('.', '_', BWL_BAF_PLUGIN_VERSION));

            require_once(__DIR__ . '/includes/BafConstants.php');

            $this->includeFiles();

            add_action('wp_enqueue_scripts', [$this, 'bafEnqueueScripts']);
            add_action('admin_enqueue_scripts', [$this, 'bafAdminEnqueueScripts']);
            add_action('plugins_loaded', [$this, 'bafLoadTranslationFile']);
        }

        function bafEnqueueScripts()
        {

            $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

            // Load front end styles & scripts.
            wp_enqueue_style("baf-frontend", plugins_url('assets/styles/frontend.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);

            /*-- RTL MODE --*/

            if (is_rtl()) {
                wp_enqueue_style('baf-frontend-rtl', plugins_url('assets/styles/frontend_rtl.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            }

            /*-- Introduce Font-Awesome In Version 1.4.9 --*/

            if (isset($bwl_advanced_faq_options['bwl_advanced_fa_status']) && $bwl_advanced_faq_options['bwl_advanced_fa_status'] == "on") {
                wp_enqueue_style('font-awesome', plugins_url('libs/font-awesome/font-awesome.min.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
                wp_enqueue_style('font-awesome-shims', plugins_url('libs/font-awesome/v4-shims.min.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            }

            // New Scripts.
            wp_enqueue_script('baf-frontend', plugins_url('assets/scripts/frontend.js', __FILE__), ['jquery'], BWL_BAF_PLUGIN_VERSION, TRUE);

            // Variable access Rules: BafFrontendData.ajaxurl

            wp_localize_script(
                'baf-frontend',
                'BafFrontendData', // javascript end variable.
                BafHelpers::localizeData()
            );
        }

        function bafAdminEnqueueScripts()
        {

            // Load admin styles & scripts.

            wp_enqueue_style('baf-admin', plugins_url('assets/styles/admin.css', __FILE__), ['wp-color-picker'], BWL_BAF_PLUGIN_VERSION);

            if (is_rtl()) {
                wp_enqueue_style('baf-admin-rtl', plugins_url('assets/styles/admin_rtl.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            }

            // TinyMCE Editor Style.

            wp_register_style('bwl-advanced-faq-editor-style', plugins_url('libs/tinymce/styles/bwl-advanced-faq-editor.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            wp_register_style('bwl-advanced-faq-multiple-select', plugins_url('libs/multiple-select/styles/multiple-select.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            wp_register_script('bwl-advanced-faq-multiple-select', plugins_url('libs/multiple-select/scripts/jquery.multiple.select.js', __FILE__), ['jquery', 'jquery-ui-core', 'jquery-ui-draggable', 'jquery-ui-droppable'], BWL_BAF_PLUGIN_VERSION, TRUE);

            //Enqueue FAQ Admin Script & Style.

            wp_enqueue_style('bwl-advanced-faq-editor-style'); // TinyMCE Editor Overlay.
            wp_enqueue_style('bwl-advanced-faq-multiple-select'); // Enqueue Multiselect Style.
            wp_enqueue_script('bwl-advanced-faq-multiple-select'); // Enqueue Multiselect Script.

            wp_enqueue_script('baf-admin', plugins_url('assets/scripts/admin.js', __FILE__), ['jquery', 'wp-color-picker', 'jquery-ui-core', 'jquery-ui-draggable', 'jquery-ui-droppable', 'jquery-ui-sortable'], BWL_BAF_PLUGIN_VERSION, TRUE);

            // Variable access Rules: BafFrontendData.ajaxurl
            wp_localize_script(
                'baf-admin',
                'BafAdminData',
                BafAdminHelpers::localizeData()
            );
        }

        public function includeFiles()
        {

            // Commen Functions.

            require_once(__DIR__ . '/includes/BafHelpers.php');

            // Upgrade DataBase.
            require_once(__DIR__ . '/includes/db/BafDbSettings.php');

            // Custom Post Type.
            require_once(__DIR__ . '/includes/cpt/BafCustomPostType.php');

            // View Counter
            require_once(__DIR__ . '/includes/BafViewsTracker.php');

            // Search Keywords Tracker
            require_once(__DIR__ . '/includes/BafSearchKeywordsTracker.php');


            /*-- Load Required Files --*/

            if (is_admin()) {



                // Only Load Admin Helpers.
                require_once(__DIR__ . '/includes/BafAdminHelpers.php');

                // Plugin Metainfo.
                require_once(__DIR__ . '/includes/metainfo/BafMetaInfo.php');

                // Load Only Admin panel required files.
                require_once(__DIR__ . '/includes/version-manager.php'); // Load plugin versioning informations.

                // INTEGRATE FAQ SORTING
                require_once(__DIR__ . '/includes/settings/sorting-pages/BafTaxonomySort.php');

                // Custom Post Types Support. 
                require_once(__DIR__ . '/includes/cpt/BafCptCustomColumns.php'); // Load plugin custom columns.
                require_once(__DIR__ . '/includes/cpt/BafQuickBulkEdit.php'); // Load plugin quick and bulk edit settings.
                require_once(__DIR__ . '/includes/cpt/BafCptTaxonomyFilters.php'); // Load plugin custom filter by category and tags 

                // Load Custom shrotcode editor panel.
                require_once(__DIR__ . '/includes/tinymce/baf_tiny_mce_config.php');

                // FAQ Analytics Helper.
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsHelper.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalytics.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsSummary.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsLikesCount.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsViewsCount.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsPostsList.php');
                require_once(__DIR__ . '/includes/settings/analytics/BafAnalyticsExternalApi.php');

                // Options Panel.
                require_once(__DIR__ . '/includes/settings/options_panel.php'); // Load plugins options panel.
                require_once(__DIR__ . '/includes/settings/options_panel_submenus.php'); // Load Welcome page.


                // Admin Notice.
                require_once(__DIR__ . '/includes/noticebox/BafAdminNotice.php');
            } else {

                // Load only Frontend files.

                require_once(__DIR__ . '/includes/baf_theme_generator.php'); // Generate and Load plugin custom themes.

                /*-- INTEGRATE SHORTCODES --*/

                require_once(__DIR__ . '/includes/shortcodes/baf_faq_list.php'); // Load plugin faq shortcodes.
            }


            require_once(__DIR__ . '/includes/baf_rating.php'); // Count FAQ rating.

        }

        /*-- TRANSLATION FILE --*/

        function bafLoadTranslationFile()
        {
            load_plugin_textdomain('bwl-adv-faq', FALSE, dirname(plugin_basename(__FILE__)) . '/lang/');
        }
    }

    /*-- INTEGRATE WIDGET --*/

    $baf_widgets = ['faqs', 'categories', 'topics'];

    foreach ($baf_widgets as $widget_key => $widget_page) :
        require_once(__DIR__ . '/includes/widgets/baf_' . $widget_page . '.php');
    endforeach;

    /*--INITIALIZATION --*/

    function initBwlAdvancedFaqManager()
    {

        new BWL_Advanced_Faq_Manager();
    }

    add_action('init', 'initBwlAdvancedFaqManager');
}
