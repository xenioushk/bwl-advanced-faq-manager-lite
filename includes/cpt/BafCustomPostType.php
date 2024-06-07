<?php

class BafCustomPostType
{

  public $gutenbergEditorSupport;
  public $bafOptions;

  public function __construct()
  {

    $this->bafOptions = get_option('bwl_advanced_faq_options');
    $this->gutenbergEditorSupport = (isset($this->bafOptions['baf_gutenberg_status']) && $this->bafOptions['baf_gutenberg_status'] == "on") ? "true" : "false";

    $this->registerPostType();
    $this->taxonomies();
    $this->bafFlashRewriteRules();
  }

  public function registerPostType()
  {

    $bafCustomSlug = "bwl-advanced-faq";

    if (isset($this->bafOptions['bwl_advanced_faq_custom_slug']) && $this->bafOptions['bwl_advanced_faq_custom_slug'] != "") {

      $bafCustomSlug = trim($this->bafOptions['bwl_advanced_faq_custom_slug']);
    }

    $labels = array(
      'name' => esc_html__('All', 'bwl-adv-faq') . ' ' . BAF_P_FAQ_TEXT,
      'singular_name' => BAF_S_FAQ_TEXT,
      'add_new' => esc_html__('Add New', 'bwl-adv-faq') . ' ' . BAF_S_FAQ_TEXT,
      'add_new_item' => esc_html__('Add New', 'bwl-adv-faq') . ' ' . BAF_S_FAQ_TEXT,
      'edit_item' => esc_html__('Edit', 'bwl-adv-faq') . ' ' . BAF_S_FAQ_TEXT,
      'new_item' => esc_html__('New', 'bwl-adv-faq') . ' ' . BAF_S_FAQ_TEXT,
      'all_items' => esc_html__('All', 'bwl-adv-faq') . ' ' . BAF_P_FAQ_TEXT,
      'view_item' => esc_html__('View', 'bwl-adv-faq') . ' ' . BAF_S_FAQ_TEXT,
      'search_items' => esc_html__('Search', 'bwl-adv-faq')  . ' ' . BAF_S_FAQ_TEXT,
      'not_found' => esc_html__('Not found', 'bwl-adv-faq'),
      'not_found_in_trash' => esc_html__('Not found in Trash', 'bwl-adv-faq'),
      'parent_item_colon' => '',
      'menu_name' => BAF_MENU_TEXT
    );

    // Default form items supports for FAQ plugin.
    // Revisions introduced in version 1.8.2

    $bafCptSupport = ['title', 'editor', 'revisions', 'author'];


    // Comment section added in version 1.8.2
    // Admin can show/hide comment permssion from plugin option panel.

    if (isset($this->bafOptions['baf_comment_status']) && $this->bafOptions['baf_comment_status'] == "on") {

      $bafCptSupport[] = 'comments';
    }

    // Disable Single Page Generate introduced version 1.8.2

    $baf_publicly_queryable = true;

    if (isset($this->bafOptions['baf_disable_single_faq_status']) && $this->bafOptions['baf_disable_single_faq_status'] == "on") {

      $baf_publicly_queryable = false;
    }


    $args = array(
      'labels' => $labels,
      'query_var' => 'advanced_faq',
      'show_in_nav_menus' => true,
      'public' => true,
      'show_ui' => true,
      'show_in_menu' => true,
      'rewrite' => array(
        'slug' => $bafCustomSlug,
        'with_front' => true //before it was true
      ),
      'publicly_queryable' => $baf_publicly_queryable,
      'capability_type' => 'post',
      'has_archive' => FALSE,
      'hierarchical' => true,
      'show_in_admin_bar' => true,
      'supports' => $bafCptSupport,
      'menu_icon' => BWL_BAFM_PLUGIN_DIR . 'libs/cpt-icon/faq_icon.png',
      'show_in_rest' => $this->gutenbergEditorSupport
    );

    register_post_type('bwl_advanced_faq', $args);
  }

  public function taxonomies()
  {

    $this->bafOptions = get_option('bwl_advanced_faq_options');

    $bafCustomSlug = "bwl-advanced-faq";

    if (isset($this->bafOptions['bwl_advanced_faq_custom_slug']) && $this->bafOptions['bwl_advanced_faq_custom_slug'] != "") {

      $bafCustomSlug = trim($this->bafOptions['bwl_advanced_faq_custom_slug']);
    }

    $taxonomies = [];

    $taxonomies['advanced_faq_category'] = array(
      'hierarchical' => true,
      'query_var' => 'advanced_faq_category', // changed in version 1.5.9
      'show_in_rest' => $this->gutenbergEditorSupport,
      'rewrite' => array(
        'slug' => $bafCustomSlug . '-category'
      ),
      'labels' => array(
        'name' => BAF_S_FAQ_TEXT . ' ' . esc_html__(' Category', 'bwl-adv-faq'),
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

    $taxonomies['advanced_faq_topics'] = array(
      'hierarchical' => true,
      'query_var' => 'advanced_faq_topics',
      'show_in_rest' => $this->gutenbergEditorSupport,
      'rewrite' => array(
        'slug' => $bafCustomSlug . '-topics'
      ),
      'labels' => array(
        'name' => BAF_S_FAQ_TEXT . ' ' . esc_html__('Topics', 'bwl-adv-faq'),
        'singular_name' => esc_html__('Topics', 'bwl-adv-faq'),
        'edit_item' => esc_html__('Edit Topics', 'bwl-adv-faq'),
        'update_item' => esc_html__('Update Topics', 'bwl-adv-faq'),
        'add_new_item' => esc_html__('Add Topic', 'bwl-adv-faq'),
        'new_item_name' => esc_html__('Add New Topics', 'bwl-adv-faq'),
        'all_items' => esc_html__('All Topics', 'bwl-adv-faq'),
        'search_items' => esc_html__('Search Topics', 'bwl-adv-faq'),
        'popular_items' => esc_html__('Popular Topics', 'bwl-adv-faq'),
        'separate_items_with_comments' => esc_html__('Separate Topics with commas', 'bwl-adv-faq'),
        'add_or_remove_items' => esc_html__('Add or remove Topics', 'bwl-adv-faq'),
        'choose_from_most_used' => esc_html__('Choose from most used Topics', 'bwl-adv-faq')
      )
    );

    //  INTRODUCED TOPICS FILTERING IN ADMIN PANEL FROM VESTION 1.4.8 VERSION

    if (is_admin()) {
      $taxonomies['advanced_faq_topics']['query_var'] = TRUE;
    }

    $this->registerBafTaxonomies($taxonomies);
  }

  public function registerBafTaxonomies($taxonomies)
  {

    foreach ($taxonomies as $name => $arr) {
      register_taxonomy($name, [BWL_BAF_CPT], $arr);
    }
  }


  function bafFlashRewriteRules()
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
}

// Initialize Post Type.

new BafCustomPostType();
