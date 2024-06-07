<?php

if (isset($_GET['sort_filter']) && sanitize_text_field($_GET['sort_filter']) == "category") {

  $baf_filter_page = "category";
  $baf_filter_page_title = esc_html__('FAQ Sorting By Category', 'bwl-adv-faq');
} elseif (isset($_GET['sort_filter']) && sanitize_text_field($_GET['sort_filter']) == "topics") {

  $baf_filter_page = "topics";
  $baf_filter_page_title = esc_html__('FAQ Sorting By Topics', 'bwl-adv-faq');
} else {

  $baf_filter_page = "all";
  $baf_filter_page_title = esc_html__('FAQ Sorting', 'bwl-adv-faq');
}

$baf_filter_page_subtitle = esc_html__(
  'Sorting FAQ by drag-n-drop. Items at the top will be appear in first.',
  'bwl-adv-faq'
);



// Added in version 1.6..5

$bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

$activeClass = "sort-selected";
$defaultSortPageUrl = admin_url() . 'edit.php?post_type=bwl_advanced_faq&page=bwl_advanced_faq_sort';

$bafSortMenuItems = [

  [
    'link' => $defaultSortPageUrl,
    'title' => esc_html__('All FAQs Sorting', 'bwl-adv-faq'),
    'active_class' => ($baf_filter_page == "all") ? $activeClass : ""
  ],
  [
    'link' => $defaultSortPageUrl . '&sort_filter=category',
    'title' => esc_html__('Category Wise FAQ Sorting', 'bwl-adv-faq'),
    'active_class' => ($baf_filter_page == "category") ? $activeClass : ""
  ],
  [
    'link' => $defaultSortPageUrl . '&sort_filter=topics',
    'title' => esc_html__('Topics Wise FAQ Sorting', 'bwl-adv-faq'),
    'active_class' => ($baf_filter_page == "topics") ? $activeClass : ""
  ]

];

?>
<div class="wrap" id="baf_faq_sorting_container">

  <h2><?php echo $baf_filter_page_title; ?></h2>

  <?php

  if (sizeof($bafSortMenuItems) > 0) {
    echo '<ul class="baf-sort-menu">';
    foreach ($bafSortMenuItems as $item) {
      echo "<li><a href='" . $item['link'] . "' class='" . $item['active_class'] . "'>" . $item['title'] . "</a></li>";
    }
    echo '</ul>';
  }
  ?>

  <p id="sort-status" data-sort_subtitle="<?php echo $baf_filter_page_subtitle; ?>">
    <?php echo $baf_filter_page_subtitle; ?></p>

  <div class="faq-sort-container">

    <?php

    if ($baf_filter_page == 'category' || $baf_filter_page == 'topics') :

      require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/sorting-pages/part-taxonomy-items-sort.php';

    else :

      require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/sorting-pages/part-all-faq-sort.php';

    endif;

    ?>

    <input type="button" value="<?php esc_attr_e('Save', 'bwl-adv-faq') ?>" class="button button-primary" id="baf_save_sorting" name="baf_save_sorting" data-sort_filter="<?php echo $baf_filter_page; ?>">

  </div> <!-- end .faq-sort-container  -->

</div> <!--  end .wrap  -->