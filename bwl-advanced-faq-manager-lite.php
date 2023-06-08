<?php

/**
 * Plugin Name: BWL Advanced FAQ Manager Lite
 * Plugin URI: https://bluewindlab.net
 * Description: BWL Advanced FAQ Manager Lite offers robust FAQ management capabilities. With this plugin, you can effortlessly create and manage an unlimited number of FAQ items, providing a comprehensive knowledge base for your website visitors. The plugin's intuitive interface ensures a seamless experience while setting up your FAQs.
 * Author: Md Mahbub Alam Khan
 * Version: 1.0.7
 * Author URI: https://bluewindlab.net
 * WP Requires at least: 5.2+
 * Text Domain: bwl-adv-faq
 */
if (!class_exists('BWL_Advanced_Faq_Manager')) {

    class BWL_Advanced_Faq_Manager
    {

        function __construct()
        {

            /* ----- PLUGIN COMMON CONSTANTS ---- */
            define("BWL_BAF_PLUGIN_TITLE", 'BWL Advanced FAQ Manager Lite');
            define("BWL_BAFM_PLUGIN_ROOT", 'bwl-advanced-faq-manager-lite');
            define("BWL_BAFM_PLUGIN_DIR", plugins_url() . '/bwl-advanced-faq-manager-lite/');
            define("BWL_BAF_PLUGIN_VERSION", '1.0.7');
            define("BWL_BAF_PLUGIN_PRODUCTION_STATUS", 0); // Change this value in to 0 in Devloper mode :)
            define("PREFIX_BAF_CAT", 'baf_cat_'); // Change this value in to 0 in Devloper mode :)
            define("PREFIX_BAF_TOPIC", 'baf_topics_'); // Change this value in to 0 in Devloper mode :)
            $this->include_files();
            $this->register_post_type();
            $this->taxonomies();
            $this->baf_flash_rules();
            //Proper Way To Enqueue Scripts For Front End and Admin.

            add_action('wp_enqueue_scripts', array(&$this, 'baf_enqueue_scripts'));
            add_action('admin_enqueue_scripts', array(&$this, 'baf_admin_enqueue_scripts'));
            // Edit plugin metalinks
            add_filter('plugin_row_meta', array($this, 'baf_metalinks'), null, 2);
            add_action('plugins_loaded', 'bwl_adv_faq_load_textdomain');
        }

        public function baf_metalinks($links, $file)
        {

            if (empty(get_option('baf_lite_install_date'))) {
                add_option('baf_lite_install_date', date('Y-m-d H:i:s'));
            }

            if (strpos($file, 'bwl-advanced-faq-manager-lite.php') !== false && is_plugin_active($file)) {

                $new_links = array(
                    '<a href="' . esc_url('https://xenioushk.github.io/docs-wp-plugins/baf/index.html') . '" target="_blank">' . __('Documentation', 'bwl-adv-faq') . '</a>',
                    '<a href="' . esc_url('https://1.envato.market/baf-wp') . '" target="_blank" style="color:green; font-weight: bold;">' . __('Get Pro Version', 'bwl-adv-faq') . '</a>'
                );

                $links = array_merge($links, $new_links);
            }

            return $links;
        }

        function baf_enqueue_scripts()
        {

            $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

            // Load front end styles & scripts.
            wp_enqueue_style("bwl-advanced-faq-theme", plugins_url('assets/styles/frontend.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);

            /*-- RTL MODE --*/

            if (is_rtl()) {

                wp_register_style('bwl-advanced-faq-rtl-style', plugins_url('assets/styles/frontend_rtl.css', __FILE__), ["bwl-advanced-faq-theme"], BWL_BAF_PLUGIN_VERSION);
                wp_enqueue_style('bwl-advanced-faq-rtl-style');
            }

            /*-- Introduce Font-Awesome In Version 1.4.9 --*/

            if (isset($bwl_advanced_faq_options['bwl_advanced_fa_status']) && $bwl_advanced_faq_options['bwl_advanced_fa_status'] == "on") {

                wp_register_style('bwl-advanced-faq-font-awesome', plugins_url('css/font-awesome.min.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
                wp_enqueue_style('bwl-advanced-faq-font-awesome');
            }

            // New Scripts.
            wp_enqueue_script('baf-new-scripts', plugins_url('assets/scripts/frontend.js', __FILE__), ['jquery'], BWL_BAF_PLUGIN_VERSION, TRUE);
        }

        function baf_admin_enqueue_scripts()
        {

            // Load admin styles & scripts.

            wp_register_style('bwl-advanced-faq-admin-style', plugins_url('assets/styles/admin.css', __FILE__), ['wp-color-picker'], BWL_BAF_PLUGIN_VERSION);
            wp_enqueue_style('bwl-advanced-faq-admin-style');
            wp_register_style('bwl-advanced-faq-rtl-admin-faq-style', plugins_url('assets/styles/admin_rtl.css', __FILE__), ['bwl-advanced-faq-admin-style'], BWL_BAF_PLUGIN_VERSION);
            if (is_rtl()) {
                wp_enqueue_style('bwl-advanced-faq-rtl-admin-faq-style');
            }

            //Plugin FAQ Sorting Page.
            wp_register_script('baf-admin-custom-scripts', plugins_url('assets/scripts/admin.js', __FILE__), ['jquery', 'wp-color-picker', 'jquery-ui-core', 'jquery-ui-draggable', 'jquery-ui-droppable', 'jquery-ui-sortable'], BWL_BAF_PLUGIN_VERSION, TRUE);
            wp_enqueue_script('baf-admin-custom-scripts');

            // TinyMCE Editor Style.

            wp_register_style('bwl-advanced-faq-editor-style', plugins_url('tinymce/css/bwl-advanced-faq-editor.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            wp_register_style('bwl-advanced-faq-multiple-select', plugins_url('tinymce/css/multiple-select.css', __FILE__), [], BWL_BAF_PLUGIN_VERSION);
            wp_register_script('bwl-advanced-faq-multiple-select', plugins_url('tinymce/js/jquery.multiple.select.js', __FILE__), array('jquery', 'jquery-ui-core', 'jquery-ui-draggable', 'jquery-ui-droppable'), BWL_BAF_PLUGIN_VERSION, TRUE);

            //Enqueue FAQ Admin Script & Style.

            wp_enqueue_style('bwl-advanced-faq-editor-style'); // TinyMCE Editor Overlay.
            wp_enqueue_style('bwl-advanced-faq-multiple-select'); // Enqueue Multiselect Style.
            wp_enqueue_script('bwl-advanced-faq-multiple-select'); // Enqueue Multiselect Script.

        }

        function baf_flash_rules()
        {

            $baf_flash_rules_status = get_option('baf_flash_rules_status');

            if ($baf_flash_rules_status != 1) {

                flush_rewrite_rules();
                update_option('baf_flash_rules_status', 1);
            }


            // Matching Old Slug & New Slug Value.
            // First we get data from plugin option panel.

            $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

            $baf_custom_slug = "bwl-advanced-faq";

            if (isset($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']) && $bwl_advanced_faq_options['bwl_advanced_faq_custom_slug'] != "") {

                $baf_custom_slug = trim($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']);
            }

            $baf_old_custom_slug = get_option('baf_old_custom_slug');

            if ($baf_old_custom_slug == "") {

                update_option('baf_old_custom_slug', $baf_custom_slug);
            }


            if ($baf_custom_slug != $baf_old_custom_slug) {
                flush_rewrite_rules();
                update_option('baf_old_custom_slug', $baf_custom_slug);
            }
        }

        public function include_files()
        {

            // Commen Functions.

            require_once(__DIR__ . '/includes/baf_excerpt_settings.php');

            /*---Load Required Files---*/

            if (is_admin()) {

                // Load Only Admin panel required files.
                require_once(__DIR__ . '/includes/settings/bwl_advanced_faq_manager_settings.php'); // Load plugins option panel.
                require_once(__DIR__ . '/includes/admin/bwl_advanced_faq_manager_custom_column.php'); // Load plugin custom columns.
                require_once(__DIR__ . '/tinymce/bwl_advanced_faq_manager_tiny_mce_config.php'); // Load Custom shrotcode editor panel.
            } else {

                // Load only Frontend files.

                require_once(__DIR__ . '/includes/baf_theme_generator.php');

                /*---INTEGRATE SHORTCODES---*/
                require_once(__DIR__ . '/shortcode/bwl_advanced_faq_manager_shortcode.php');
            }

            require_once(__DIR__ . '/includes/bwl_advanced_faq_manager_rating.php'); // Count FAQ rating.
        }

        public function register_post_type()
        {

            /*
             * Custom Slug Section.
             */

            $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

            $bwl_advanced_faq_custom_slug = "bwl-advanced-faq";

            if (isset($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']) && $bwl_advanced_faq_options['bwl_advanced_faq_custom_slug'] != "") {

                $bwl_advanced_faq_custom_slug = trim($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']);
            }

            $labels = array(
                'name' => esc_html__('All FAQs', 'bwl-adv-faq'),
                'singular_name' => esc_html__('FAQ', 'bwl-adv-faq'),
                'add_new' => esc_html__('Add New FAQ', 'bwl-adv-faq'),
                'add_new_item' => esc_html__('Add New FAQ', 'bwl-adv-faq'),
                'edit_item' => esc_html__('Edit FAQ', 'bwl-adv-faq'),
                'new_item' => esc_html__('New FAQ', 'bwl-adv-faq'),
                'all_items' => esc_html__('All FAQs', 'bwl-adv-faq'),
                'view_item' => esc_html__('View FAQ', 'bwl-adv-faq'),
                'search_items' => esc_html__('Search FAQ', 'bwl-adv-faq'),
                'not_found' => esc_html__('No FAQ found', 'bwl-adv-faq'),
                'not_found_in_trash' => esc_html__('No FAQ found in Trash', 'bwl-adv-faq'),
                'parent_item_colon' => '',
                'menu_name' => esc_html__('Advanced FAQ Lite', 'bwl-adv-faq')
            );

            $args = array(
                'labels' => $labels,
                'query_var' => 'advanced_faq',
                'public' => true,
                'show_ui' => true,
                'show_in_menu' => true,
                'rewrite' => array(
                    'slug' => $bwl_advanced_faq_custom_slug
                ),
                'publicly_queryable' => true,
                'capability_type' => 'post',
                'has_archive' => FALSE,
                'hierarchical' => false,
                'show_in_admin_bar' => true,
                'supports' => array('title', 'editor', 'author'),
                'menu_icon' => plugins_url('images/faq_icon.png', __FILE__)
            );

            register_post_type('bwl_advanced_faq', $args);
        }

        public function taxonomies()
        {

            /*
             * Custom Slug Section.
             */

            $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

            $bwl_advanced_faq_custom_slug = "bwl-advanced-faq";

            if (isset($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']) && $bwl_advanced_faq_options['bwl_advanced_faq_custom_slug'] != "") {

                $bwl_advanced_faq_custom_slug = trim($bwl_advanced_faq_options['bwl_advanced_faq_custom_slug']);
            }

            $taxonomies = array();

            $taxonomies['advanced_faq_category'] = array(
                'hierarchical' => true,
                'query_var' => 'advanced_faq_category', // changed in version 1.5.9
                'rewrite' => array(
                    'slug' => $bwl_advanced_faq_custom_slug . '-category'
                ),
                'labels' => array(
                    'name' => esc_html__('FAQ Category', 'bwl-adv-faq'),
                    'singular_name' => esc_html__('Category', 'bwl-adv-faq'),
                    'edit_item' => esc_html__('Edit Category', 'bwl-adv-faq'),
                    'update_item' => esc_html__('Update category', 'bwl-adv-faq'),
                    'add_new_item' => esc_html__('Add Category', 'bwl-adv-faq'),
                    'new_item_name' => esc_html__('Add New category', 'bwl-adv-faq'),
                    'all_items' => esc_html__('All categories', 'bwl-adv-faq'),
                    'search_items' => esc_html__('Search categories', 'bwl-adv-faq'),
                    'popular_items' => esc_html__('Popular categories', 'bwl-adv-faq'),
                    'separate_items_with_comments' => esc_html__('Separate categories with commas', 'bwl-adv-faq'),
                    'add_or_remove_items' => esc_html__('Add or remove category', 'bwl-adv-faq'),
                    'choose_from_most_used' => esc_html__('Choose from most used categories', 'bwl-adv-faq')
                )
            );

            //  INTRODUCED CATEGORY FILTERING IN ADMIN PANEL FROM VESTION 1.4.8 VERSION

            if (is_admin()) {
                $taxonomies['advanced_faq_category']['query_var'] = TRUE;
            }

            $this->register_all_taxonomies($taxonomies);
        }

        public function register_all_taxonomies($taxonomies)
        {

            foreach ($taxonomies as $name => $arr) {
                register_taxonomy($name, array('bwl_advanced_faq'), $arr);
            }
        }
    }

    /*---INTEGRATE WIDGET---*/

    $baf_widgets = array('bwl_advanced_faq_manager_widget', 'bwl_advanced_faq_categories_widget');

    foreach ($baf_widgets as $widget_key => $widget_page) :
        require_once(__DIR__ . '/widget/' . $widget_page . '.php');
    endforeach;

    /*-- Guternberg Support --*/

    require_once(__DIR__ . '/includes/baf_gutenberg_support.php');

    /*---TRANSLATION FILE ---- */

    function bwl_adv_faq_load_textdomain()
    {

        load_plugin_textdomain('bwl-adv-faq', FALSE, dirname(plugin_basename(__FILE__)) . '/lang/');
    }

    /* ----- INITIALIZATION ---- */

    function bwl_advanced_faq_manager_init()
    {

        new BWL_Advanced_Faq_Manager();
    }

    add_action('init', 'bwl_advanced_faq_manager_init');
}
