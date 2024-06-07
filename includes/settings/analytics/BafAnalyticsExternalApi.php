<?php


class BafAnalyticsExternalApi extends BafAnalytics
{


  public function getBlueWindLabBlogPosts()
  {

    $blogPosts = [];

    return $blogPosts;
  }



  public function getPluginSupportKB()
  {

    $kbPosts = [
      [
        'title' => 'How To Activate BWL Advanced FAQ Manager License',
        'permalink' => 'https://bluewindlab.net/knowledgebase/advance-faq-manager/how-to-activate-bwl-advanced-faq-manager-license/?utm_source=' . get_site_url() . '&utm_medium=baf_analytics_page',
      ],
      [
        'title' => 'How to download latest version of the Advanced FAQ addons?',
        'permalink' => 'https://bluewindlab.net/knowledgebase/advance-faq-manager/how-to-download-latest-version-of-the-advanced-faq-addons/?utm_source=' . get_site_url() . '&utm_medium=baf_analytics_page',
      ], [
        'title' => 'Why pagination is not working in Advanced FAQ Manager?',
        'permalink' => 'https://bluewindlab.net/knowledgebase/advance-faq-manager/why-pagination-is-not-working-in-advanced-faq-manager/?utm_source=' . get_site_url() . '&utm_medium=baf_analytics_page',
      ]
    ];

    return $kbPosts;
  }
}
