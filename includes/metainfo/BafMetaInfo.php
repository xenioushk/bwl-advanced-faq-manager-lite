<?php

// This class displays options panel, addons, documentation links below the plugin information.

class BafMetaInfo
{

  public function __construct()
  {
    add_filter('plugin_row_meta', [$this, 'bafMetalinks'], null, 2);
  }

  public function bafMetalinks($links, $file)
  {

    if (strpos($file, BWL_BAF_PLUGIN_ROOT_FILE) !== false && is_plugin_active($file)) {


      // nt = 1 // new tab.

      $additionalLinks = [

        [
          'title' => __('Get Pro Version', 'bwl-adv-faq'),
          'url' => "https://1.envato.market/baf-wp",
          'nt' => 1,
          'class' => 'bwl_activation_meta_link'
        ],
        [
          'title' => __('Options Panel', 'bwl-adv-faq'),
          'url' => get_admin_url() . 'edit.php?post_type=bwl_advanced_faq&page=bwl-advanced-faq-settings',
        ],
        [
          'title' => __('Addons', 'bwl-adv-faq'),
          'url' => get_admin_url() . 'edit.php?post_type=bwl_advanced_faq&page=baf-addons',
        ],
        [
          'title' => __('Docs', 'bwl-adv-faq'),
          'url' => BWL_BAF_DOC,
          'nt' => 1
        ],
        [
          'title' => __('Support', 'bwl-adv-faq'),
          'url' => BWL_BAF_AUTHOR_SUPPORT,
          'nt' => 1
        ]

      ];


      $new_links = [];

      foreach ($additionalLinks as $alData) {

        $newTab = isset($alData['nt']) ? 'target="_blank"' : "";
        $class = isset($alData['class']) ? 'class="' . $alData['class'] . '"' : "";

        $new_links[] =  '<a href="' . esc_url($alData['url']) . '"  ' . $newTab . '  ' . $class . ' >' . $alData['title'] . '</a>';
      }

      $links = array_merge($links, $new_links);
    }

    return $links;
  }
}

new BafMetaInfo();
