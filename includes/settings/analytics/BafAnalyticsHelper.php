<?php

// Coming soon.


class BafAnalyticsHelper
{

  /**
   * @param array $table_data
   * 
   * @return [type]
   */
  public static function insertLikeData($table_data = [])
  {

    if (empty($table_data)) return "";

    global $wpdb;

    $table_data_type = array(
      '%d', // post_id
      '%s', // ip
      '%s', // like_date_time
    );

    $wpdb->insert(TABLE_BAF_LIKES_DATA, $table_data, $table_data_type);
  }
}
