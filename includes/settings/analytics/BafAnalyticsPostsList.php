<?php


class BafAnalyticsPostsList extends BafAnalytics
{

  public function register()
  {
    // $this->getFAQLikesCount();
  }

  /**
   * @param string $type Options: latest, popular, viewed Default: latest. 
   * 
   * @return [type]
   */
  public function getFAQPosts($type = "latest", $limit = 5)
  {

    $args = [
      'post_type' => BWL_BAF_CPT,       // Change to your custom post type if needed
      'posts_per_page' => $limit
    ];


    if ($type == "popular") {
      $args['meta_key'] = "baf_votes_count";
      $args['orderby'] = "meta_value_num";
      $args['order'] = "DESC";
    } else if ($type == "viewed") {
      $args['meta_key'] = "baf_views_count";
      $args['orderby'] = "meta_value_num";
      $args['order'] = "DESC";
    } else {
      $args['orderby'] = "ID";
      $args['order'] = "DESC";
    }

    $postData = new WP_Query($args);

    return [
      'postData' => $postData
    ];
  }


  public static function getRecentlyLikedFaqs($interval = "1 week", $limit = 5)
  {

    global $wpdb;

    $query = "SELECT post_id, like_date_time, COUNT(`post_id`) AS tv FROM `" . TABLE_BAF_LIKES_DATA . "` "
      . "     WHERE 1 AND like_date_time BETWEEN now() - interval $interval AND now() GROUP BY `post_id` ORDER BY like_date_time DESC LIMIT $limit";

    // echo $query;
    $recentlyLikedFaqs = $wpdb->get_results($query, ARRAY_A);

    // echo "<pre>";
    // print_r($recentlyLikedFaqs);
    // echo "</pre>";

    return $recentlyLikedFaqs;
  }


  /**
   * @param $interval =
   * @param int $limit
   * 
   * @return array list of post_id, views_date_time, and total views
   */

  public static function getRecentlViewedFaqs($interval = "1 week", $limit = 5)
  {

    global $wpdb;

    $query = "SELECT post_id, views_date_time, COUNT(`post_id`) AS tv FROM `" . TABLE_BAF_VIEWS_DATA . "` "
      . "     WHERE 1 AND views_date_time BETWEEN now() - interval $interval AND now() GROUP BY `post_id` ORDER BY views_date_time DESC LIMIT $limit";

    // echo $query;
    $recentViewedFaqs = $wpdb->get_results($query, ARRAY_A);

    // echo "<pre>";
    // print_r($recentViewedFaqs);
    // echo "</pre>";

    return $recentViewedFaqs;
  }
}