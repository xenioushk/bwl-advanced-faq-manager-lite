<?php


class BafTaxonomySort
{

  public function __construct()
  {
    add_action('wp_ajax_baf_get_sorting_data', [$this, 'cbGetTaxonomyData']);
    add_action('wp_ajax_bwl_advanced_faq_apply_sort', [$this, 'cbSaveTaxonomySortData']);
  }

  public function cbGetTaxonomyData()
  {

    $baf_sort_filter = sanitize_text_field($_POST['baf_sort_filter']); // all/category/topics
    $faq_category = sanitize_text_field($_POST['baf_category_slug']); // get category slug.
    $baf_term_id = sanitize_text_field($_POST['baf_term_id']); // get category id
    $post_type =  BWL_BAF_CPT;

    $args = array(
      'post_status'       => 'publish',
      'post_type'         => $post_type,
      'posts_per_page' => -1
    );

    if ($baf_sort_filter == "topics") {

      $baf_sort_prefix = PREFIX_BAF_TOPIC;
      $args['advanced_faq_topics'] = $faq_category;
    } else {

      $baf_sort_prefix = PREFIX_BAF_CAT;
      $args['advanced_faq_category'] = $faq_category;
    }

    $loop = new WP_Query($args);
    $baf_cat_all_posts_id = array();

    $output = "";

    if ($loop->have_posts()) :

      while ($loop->have_posts()) :

        $loop->the_post();

        $baf_cat_all_posts_id[] = get_the_ID();

      endwhile;

    endif;

    wp_reset_query();

    $baf_cat_sorted_posts_id = explode(',', get_option($baf_sort_prefix . $baf_term_id)); // call db for post meta.


    if (sizeof($baf_cat_sorted_posts_id) == 0) {
      $baf_cat_sorted_posts_id = array();
    }

    $baf_cat_final_sorted_posts_id = array_values(array_unique(array_merge($baf_cat_sorted_posts_id, $baf_cat_all_posts_id)));

    $args = array(
      'post_status'       => 'publish',
      'post__in'            => $baf_cat_final_sorted_posts_id,
      'post_type'         => $post_type,
      'orderby'             => 'post__in',
      'posts_per_page' => -1
    );

    if ($baf_sort_filter == "topics") {

      $args['advanced_faq_topics'] = $faq_category;
    } else {

      $args['advanced_faq_category'] = $faq_category;
    }

    $query = new WP_Query($args);

    $post_data = array();

    if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post();

        $post_data['status'] = 1;
        $post_data['data'][] = array(
          'post_id' => get_the_ID(),
          'post_title' => get_the_title()
        );

      endwhile;

    else :
      $post_data['status'] = 0;
    endif;

    wp_reset_query();

    echo json_encode($post_data);

    die();
  }


  function cbSaveTaxonomySortData()
  {

    global $wpdb;

    $baf_sort_filter_type = sanitize_text_field($_POST['baf_sort_filter_type']);
    $baf_term_id = sanitize_text_field($_POST['baf_term_id']);
    $baf_sort_data = sanitize_text_field($_POST['baf_sort_data']);

    if ($baf_sort_filter_type == "category") {

      update_option(PREFIX_BAF_CAT . $baf_term_id, $baf_sort_data);
    } else  if ($baf_sort_filter_type == "topics") {

      $baf_topics_unique_option_id = 'baf_topics_' . $baf_term_id;
      update_option($baf_topics_unique_option_id, $baf_sort_data);
    } else if ($baf_sort_filter_type == "all") {

      // Save All Sorting Data (menu_order)

      $order = explode(',', $baf_sort_data);
      $counter = 0;

      foreach ($order as $bwl_faq_id) {

        $wpdb->update($wpdb->posts, array('menu_order' => $counter), array('ID' => $bwl_faq_id));
        $counter++;
      }
    } else {
      // Do nothing.
    }

    $post_data['status'] = 1;

    wp_reset_query();

    echo json_encode($post_data);
    die();
  }
}

new BafTaxonomySort();
