<?php

/*-- PLUGIN COMMON CONSTANTS --*/

define("BWL_BAF_AUTHOR_NAME", 'Mahbub Alam Khan');
define("BWL_BAF_AUTHOR_CC_PROFILE", 'https://codecanyon.com/user/xenioushk');
define("BWL_BAF_AUTHOR_SUPPORT", 'https://wordpress.org/support/plugin/bwl-advanced-faq-manager-lite/');
define("BWL_BAF_DOC", 'https://projects.bluewindlab.net/wpplugin/baf/doc');
define("BWL_BAF_PLUGIN_TITLE", 'BWL Advanced FAQ Manager Lite');
define("BWL_BAFM_PLUGIN_ROOT", 'bwl-advanced-faq-manager-lite');
define("BWL_BAFM_PLUGIN_DIR", plugins_url() . '/bwl-advanced-faq-manager-lite/');
define("BWL_BAFM_PLUGIN_LIBS_DIR", BWL_BAFM_PLUGIN_DIR . 'libs/');
define("BWL_BAF_PLUGIN_PRODUCTION_STATUS", 0); // Change this value in to 0 in Devloper mode :)
define("PREFIX_BAF_CAT", 'baf_cat_'); // Change this value in to 0 in Devloper mode :)
define("PREFIX_BAF_TOPIC", 'baf_topics_'); // Change this value in to 0 in Devloper mode :)
define("BWL_BAF_OPT_MENU", 'bwl_advanced_faq');
define("BWL_BAF_CPT", 'bwl_advanced_faq');

/*-- EMAIL CONSTANTS --*/

define('BAF_A_FS_EMAIL_HEADER_TITLE', apply_filters('baf_a_fs_email_header_title', esc_html__('New FAQ Question', 'bwl-adv-faq')));
define('BAF_A_FS_EMAIL_SUBJECT', apply_filters('baf_a_fs_email_subject', esc_html__('New FAQ submited!', 'bwl-adv-faq')));
define('BAF_A_FS_REPLY_EMAIL', apply_filters('baf_a_fs_email_subject', "no-reply@email.com"));

/*-- PLUGIN DEFAULT TEXTS --*/
define('BAF_MENU_TEXT', apply_filters('baf_menu_text', esc_html__('Advanced FAQ Lite', 'bwl-adv-faq')));
define('BAF_S_FAQ_TEXT', apply_filters('baf_s_faq_text', esc_html__('FAQ', 'bwl-adv-faq')));
define('BAF_P_FAQ_TEXT', apply_filters('baf_p_faq_text', esc_html__('FAQs', 'bwl-adv-faq')));

// Autoupdate and verfication constants.
define("BWL_BAF_PLUGIN_ROOT_FILE", 'bwl-advanced-faq-manager-lite.php');
define("BWL_BAF_CC_ID", "5007135");
define("BWL_BAF_CC_URL", "https://1.envato.market/baf-wp"); // Plugin codecanyon URL.
define("BWL_BAF_VERIFIED", get_option('baf_purchase_verified')); // purchase verification status.

// Plugin Installation Date Time Option Constant.

define("BWL_BAF_INSTALLATION_DATE", "baf_lite_installation_date");

// Custom FAQ LIKES Table.
global $wpdb;

define("TABLE_BAF_LIKES_DATA", $wpdb->prefix . "baf_likes_data");
define("TABLE_BAF_VIEWS_DATA", $wpdb->prefix . "baf_views_data");
define("TABLE_BAF_SEARCH_KEYWORDS_DATA", $wpdb->prefix . "baf_search_keywords_data");
