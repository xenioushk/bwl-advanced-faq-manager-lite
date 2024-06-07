<div class="wrap baf-addon-page-wrap">

  <h2><?php echo BWL_BAF_PLUGIN_TITLE; ?> Addons</h2>

  <?php

  $baf_addon_doc_repo = "https://xenioushk.github.io/docs-plugins-addon/baf-addon/";
  $baf_addon_download_repo = "https://bluewindlab.net/portfolio/";

  $baf_addons = [

    [
      'title' => 'Ajaxified FAQ Search',
      'info' => "This add-on enhances the functionality of the FAQ Manager by introducing a quick and efficient way to search for frequently asked questions.",
      'version' => '1.1.3',
      'doc' => $baf_addon_doc_repo . "atfc/index.html",
      'download' => BWL_BAF_CC_URL
    ],

    [
      'title' => 'FAQ Tab For WooCommerce',
      'info' => "FAQ Tab For WooCommerce allows you to convert you're FAQ posts in to WooCommerce product FAQ item with in a minute. ",
      'version' => '1.1.3',
      'doc' => $baf_addon_doc_repo . "ftfwc/index.html",
      'download' => BWL_BAF_CC_URL
    ],

  ]

  ?>


  <div class="baf-addon-list">

    <?php foreach ($baf_addons as $addon) : ?>

      <div class="baf-addon-list__card">

        <h3><?php echo $addon['title'] ?></h3>

        <?php echo (isset($addon['info'])) ? "<p>" . $addon['info'] . "</p>" : ""; ?>

        <div class="btn-container">
          <a href="<?php echo $addon['download'] ?>" target="_blank" class="btn btn--download"><?php esc_html_e('Upgrade To Pro', 'bwl-adv-faq'); ?></a>
          <a href="<?php echo $addon['doc'] ?>" target="_blank" class="btn btn--documentation"><?php esc_html_e('Documentation', 'bwl-adv-faq'); ?></a>
        </div>
      </div>
    <?php endforeach ?>

  </div>


  <p>
    If you need help with the plugin, give our <strong><?php echo BWL_BAF_PLUGIN_TITLE; ?></strong> documentation a
    read.
    If you have any questions that are beyond the scope of this help file, please feel free to email via my user page
    contact form <a href="<?php echo BWL_BAF_AUTHOR_CC_PROFILE ?>">here</a>.
  </p>

</div>