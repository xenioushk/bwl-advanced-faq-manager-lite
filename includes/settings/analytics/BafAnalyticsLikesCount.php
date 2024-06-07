<?php


/**
 * [Description BafAnalyticsLikeCount]
 */
class BafAnalyticsLikesCount extends BafAnalytics
{

  /**
   * @return [array]
   */
  public function register()
  {
    $this->rearrangeData();
    return $this->getFAQLikesCount();
  }



  /**
   * @return [type]
   */
  public function rearrangeData()
  {

    $likeDataRearrangeStatus = get_option("baf_like_data_status");

    if ($likeDataRearrangeStatus == 1) return "";

    global $wpdb;

    // echo "<pre>";
    // print_r(self::$bafLikesDataTable);
    // echo "</pre>";

    // $query = "
    // SELECT post_id, meta_key, meta_value 
    // FROM {$wpdb->postmeta} 
    // LIKE 'baf_voted_IP' ORDER BY `meta_id` ASC";


    $query = "SELECT * FROM {$wpdb->postmeta} WHERE `meta_key` LIKE 'baf_voted_IP' ORDER BY `meta_id` ASC ";

    $postMetaInfo = $wpdb->get_results($query, ARRAY_A);

    if (count($postMetaInfo) > 0) {

      // format.
      /*
        [
          'post_id'=> 1,
          'ip'=> '',
          'like_date_time'=> '2023-04-09 11:11:11' //date('Y-m-d H:i:s', $timestamp);
        ]
      
      */

      $voteData = [];


      foreach ($postMetaInfo as $metaInfo) {

        $postId = $metaInfo['post_id'];
        $metaValue = $metaInfo['meta_value'];



        // echo "<pre>";
        // print_r($metaValue);
        // echo "</pre>";

        $decoded_data = unserialize($metaValue);
        // echo "<pre>";
        // print_r($decoded_data);
        // echo "</pre>";

        if (is_array($decoded_data) && !empty($decoded_data)) {
          foreach ($decoded_data as $ip => $timestamp) {
            $newVoteDataItem = [];
            $formatted_date = date('Y-m-d H:i:s', $timestamp);
            // echo "IP: $ip, Date: $formatted_date<br>";
            $newVoteDataItem['post_id'] = $postId;
            $newVoteDataItem['ip'] = $ip;
            $newVoteDataItem['like_date_time'] = $formatted_date;
            if ($likeDataRearrangeStatus != 1) {
              BafAnalyticsHelper::insertLikeData($newVoteDataItem);
            }
            array_push($voteData, $newVoteDataItem);
          }
        }

        // $formatted_date = date('Y-m-d H:i:s', $timestamp);
        // echo "IP: $ip, Date: $formatted_date<br>";


      }

      // echo "<pre>";
      // print_r($voteData);
      // echo "</pre>";

      update_option("baf_like_data_status", 1);
    }
  }


  /**
   * @return [type]
   */
  public static function countFaqLikes()
  {
    global $wpdb;
    $query = "SELECT SUM(meta_value) AS total_votes
    FROM {$wpdb->postmeta}
    WHERE meta_key = 'baf_votes_count'";

    $total_votes = $wpdb->get_var($query);
    return $total_votes;
  }

  /**
   * @param $interval =
   * @param int $limit
   * 
   * @return [type]
   */
  public static function getRecentlyLikedFaqs($interval = "1 month", $limit = 5)
  {

    global $wpdb;

    $query = "SELECT post_id, COUNT(`post_id`) AS tv FROM `" . TABLE_BAF_LIKES_DATA . "` "
      . "     WHERE 1 AND like_date_time BETWEEN now() - interval $interval AND now() GROUP BY `post_id` ORDER BY tv DESC LIMIT $limit";

    // echo $query;
    $recentlyLikedFaqs = $wpdb->get_results($query);

    return $recentlyLikedFaqs;
  }



  /**
   * @param $interval =
   * 
   * @return [type]
   */
  public static function countFaqLikesDataRange($interval = "30 day")
  {
    global $wpdb;

    $query = "SELECT COUNT(`post_id`) AS totalLikes FROM `" . TABLE_BAF_LIKES_DATA . "` "
      . "     WHERE 1 AND like_date_time BETWEEN now() - interval $interval AND now() ORDER BY totalLikes DESC";

    $total_votes = $wpdb->get_results($query, ARRAY_A);

    return $total_votes[0]['totalLikes'] ?? 0;
  }

  /**
   * @return [type]
   */
  public function getFAQLikesCount()
  {

    $todaysCount = $this->countFaqLikesDataRange("1 day");
    $lastThirtyDays = $this->countFaqLikesDataRange();
    $totalLikes = $this->countFaqLikes();

    return [
      'todays' => $todaysCount,
      'lastThirtyDays' => $lastThirtyDays,
      'totalLikes' => $totalLikes,
    ];
  }
}
