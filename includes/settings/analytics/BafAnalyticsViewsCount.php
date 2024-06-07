<?php


/**
 * [Description BafAnalyticsLikeCount]
 */
class BafAnalyticsViewsCount extends BafAnalytics
{

  /**
   * @return [array]
   */
  public function register()
  {
    return $this->getFAQViewsCount();
  }


  /**
   * @return [type]
   */
  public static function countFaqViews()
  {
    global $wpdb;
    $query = "SELECT SUM(meta_value) AS total_views
    FROM {$wpdb->postmeta}
    WHERE meta_key = 'baf_views_count'";

    $totalViews = $wpdb->get_var($query);
    return $totalViews;
  }

  /**
   * @param $interval =
   * @param int $limit
   * 
   * @return [type]
   */
  public static function getRecentlyViewsFaqs($interval = "1 month", $limit = 5)
  {

    global $wpdb;

    $query = "SELECT post_id, COUNT(`post_id`) AS tv FROM `" . TABLE_BAF_VIEWS_DATA . "` "
      . "     WHERE 1 AND views_date_time BETWEEN now() - interval $interval AND now() GROUP BY `post_id` ORDER BY tv DESC LIMIT $limit";

    // echo $query;
    $recentlyViewsFaqs = $wpdb->get_results($query);

    return $recentlyViewsFaqs;
  }



  /**
   * @param $interval =
   * 
   * @return [type]
   */
  public static function countFaqViewsDataRange($interval = "30 day")
  {
    global $wpdb;

    $query = "SELECT COUNT(`post_id`) AS totalViews FROM `" . TABLE_BAF_VIEWS_DATA . "` "
      . "     WHERE 1 AND views_date_time BETWEEN now() - interval $interval AND now() ORDER BY totalViews DESC";

    $total_votes = $wpdb->get_results($query, ARRAY_A);

    return $total_votes[0]['totalViews'] ?? 0;
  }

  /**
   * @return [type]
   */
  public function getFAQViewsCount()
  {

    $todaysCount = $this->countFaqViewsDataRange("1 day");
    $lastThirtyDays = $this->countFaqViewsDataRange();
    $totalViews = $this->countFaqViews();

    return [
      'todays' => $todaysCount,
      'lastThirtyDays' => $lastThirtyDays,
      'totalViews' => $totalViews,
    ];
  }
}
