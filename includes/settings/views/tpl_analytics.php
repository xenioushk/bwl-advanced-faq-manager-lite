<div class="wrap baf-analytics-page-wrap">

  <h2><?php echo BWL_BAF_PLUGIN_TITLE; ?> <?php esc_html_e("Analytics", "bwl-adv-faq") ?></h2>

  <div class="baf-analytics-list">

    <!-- FAQs Summary -->

    <div class="baf-analytics-list__card  baf-analytics-list__card--medium">

      <?php

      $totalFaqs = $bafSummaryData['totalFaqs']['published'] + $bafSummaryData['totalFaqs']['pending'];
      $totalFaqsPublished = $bafSummaryData['totalFaqs']['published'];
      $totalFaqsPending = $bafSummaryData['totalFaqs']['pending'];
      $totalFaqsDraft = $bafSummaryData['totalFaqs']['draft'];

      ?>

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/stats.png' ?>"><?php esc_html_e("FAQs Summary", "bwl-adv-faq") ?>
      </h3>
      <ul class="with-count">
        <li>Total FAQs: <span class="count"><?php echo $totalFaqs; ?></span>
        </li>
        <li>Published: <span class="count"><a
              href="<?php echo admin_url(); ?>edit.php?post_status=publish&post_type=bwl_advanced_faq"><?php echo $totalFaqsPublished; ?></a></span>
        </li>
        <li>Pending: <span class="count"><a
              href="<?php echo admin_url(); ?>edit.php?post_status=pending&post_type=bwl_advanced_faq"><?php echo $totalFaqsPending; ?></a></span>
        <li>Darft: <span class="count"><a
              href="<?php echo admin_url(); ?>edit.php?post_status=draft&post_type=bwl_advanced_faq"><?php echo $totalFaqsDraft; ?></a></span>
        </li>
        <li>Categories: <span class="count"><?php echo $bafSummaryData['totalCategories'] ?></span></li>
        <li>Topics: <span class="count"><?php echo $bafSummaryData['totalTopics'] ?></span></li>
      </ul>


    </div>

    <!-- Likes Count -->

    <div class="baf-analytics-list__card baf-analytics-list__card--small">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/total_likes.png' ?>"><?php esc_html_e("Likes Count", "bwl-adv-faq") ?>
      </h3>
      <ul class="with-count">

        <li>
          <a href="<?php echo BWL_BAF_CC_URL; ?>" target="_blank" class="upgrade-pro upgrade-pro--center">
            Upgrade to pro version.
          </a>
        </li>

      </ul>

    </div>



    <!-- Top Liked FAQs -->

    <div class="baf-analytics-list__card baf-analytics-list__card--medium">


      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/total_likes.png' ?>"><?php esc_html_e("Top Likes", "bwl-adv-faq") ?>
        <small>Last 7 days</small>
      </h3>
      <ul class="with-count">
        <li>
          <a href="<?php echo BWL_BAF_CC_URL; ?>" target="_blank" class="upgrade-pro upgrade-pro--center">
            Upgrade to pro version.
          </a>
        </li>
      </ul>

    </div>


    <!-- Recent Liked FAQs -->

    <div class="baf-analytics-list__card baf-analytics-list__card--medium">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/total_likes.png' ?>"><?php esc_html_e("Recent Likes", "bwl-adv-faq") ?>
        <small>Last 7 days</small>
      </h3>
      <ul class="with-count">
        <?php

        if (count($recentlyLikedFAQPosts) > 0) {
          foreach ($recentlyLikedFAQPosts as $post) {

            $post_id = $post['post_id']; // Replace with the actual post ID

            $postInfo = get_post($post_id);

            echo "<li><a href='" . get_permalink($post_id) . "' target='_blank'>$postInfo->post_title</a><span class='count'>" . $post['tv'] . "</span></li>";
            // echo "<li><a href='" . get_permalink($post_id) . "' target='_blank'>$postInfo->post_title</a></li>";
          }
          wp_reset_postdata();
        } else {
          echo '<li>' . esc_attr__("There is no data available.") . '</li>';
        }
        ?>
      </ul>

    </div>


    <!-- Views Count -->

    <div class="baf-analytics-list__card baf-analytics-list__card--small">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/views.png' ?>"><?php esc_html_e("Views Count", "bwl-adv-faq") ?>
      </h3>
      <ul class="with-count">
        <li>
          <a href="<?php echo BWL_BAF_CC_URL; ?>" target="_blank" class="upgrade-pro upgrade-pro--center">
            Upgrade to pro version.
          </a>
        </li>
      </ul>

    </div>

    <!-- Recent Viewed FAQs -->

    <div class="baf-analytics-list__card baf-analytics-list__card--medium">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/views.png' ?>"><?php esc_html_e("Recent Views", "bwl-adv-faq") ?><small>Last
          7 days</small>
      </h3>
      <ul class="with-count">

        <li>
          <a href="<?php echo BWL_BAF_CC_URL; ?>" target="_blank" class="upgrade-pro upgrade-pro--center">
            Upgrade to pro version.
          </a>
        </li>

      </ul>

    </div>

    <!-- Top Viewed FAQs -->

    <div class="baf-analytics-list__card baf-analytics-list__card--medium">
      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/views.png' ?>"><?php esc_html_e("Top Views", "bwl-adv-faq") ?><small>Last
          7 days</small>
      </h3>
      <ul class="with-count">
        <li>
          <a href="<?php echo BWL_BAF_CC_URL; ?>" target="_blank" class="upgrade-pro upgrade-pro--center">
            Upgrade to pro version.
          </a>
        </li>
      </ul>

    </div>

    <!-- Recent Published FAQs -->

    <div class="baf-analytics-list__card baf-analytics-list__card--medium">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/recent_faq.png' ?>"><?php esc_html_e("Recent Published", "bwl-adv-faq") ?>
      </h3>
      <ul class="with-count">

        <?php

        if ($latestFAQPosts['postData']->have_posts()) {
          while ($latestFAQPosts['postData']->have_posts()) {
            $latestFAQPosts['postData']->the_post();

            $title = get_the_title();
            $permalink = get_the_permalink();

            echo "<li><a href='$permalink' target='_blank'>$title</a> </li>";
          }
          wp_reset_postdata();
        } else {
          echo '<li>' . esc_attr__("There is no data available.", "bwl-adv-faq") . '</li>';
        }
        ?>

      </ul>

    </div>

    <?php if (!empty($pluginSupportKB)) : ?>

    <div class="baf-analytics-list__card">

      <h3><img
          src="<?php echo BWL_BAFM_PLUGIN_LIBS_DIR . 'analytics/images/support.png' ?>"><?php esc_html_e("Docs & Support", "bwl-adv-faq") ?>
      </h3>
      <ul class="with-count">
        <?php
          foreach ($pluginSupportKB as $post) :
            echo "<li><a href='" . $post['permalink'] . "' target='_blank'>" . $post['title'] . "</a></li>";
          endforeach;
          ?>
      </ul>

    </div>

    <?php endif; ?>

    <?php if (!empty($bwlBlogPosts)) : ?>

    <div class="baf-analytics-list__card">

      <h3><?php esc_html_e("Latest Blogs", "bwl-adv-faq") ?></h3>
      <ul class="with-count">
        <?php
          foreach ($bwlBlogPosts as $post) :
            echo "<li><a href='" . $post['permalink'] . "' target='_blank'>" . $post['title'] . "</a></li>";
          endforeach;
          ?>
      </ul>

    </div>
    <?php endif; ?>



  </div>


  <p>
    If you need help with the plugin, give our <strong><?php echo BWL_BAF_PLUGIN_TITLE; ?></strong> documentation a
    read.
    If you have any questions that are beyond the scope of this help file, please feel free to email via my user
    page
    contact form <a href="<?php echo BWL_BAF_AUTHOR_CC_PROFILE ?>">here</a>.
  </p>

</div>