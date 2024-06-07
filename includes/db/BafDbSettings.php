<?php


class BafDbSettings
{

  public function __construct()
  {
    $this->createBafViewsTable();
    $this->createBafLikesDataTable();
    $this->createBafSearchKeywordsDataTable();
  }

  /**
   * Creates a custom table "baf_views_data" for collecting each like information. 
   * @since 1.9.4
   * @return stdClass
   */

  public function createBafViewsTable()
  {

    global $wpdb;

    $tableBafViewsData = TABLE_BAF_VIEWS_DATA;

    if ($wpdb->get_var("SHOW TABLES LIKE '$tableBafViewsData'") != TABLE_BAF_VIEWS_DATA) {
      $sql = "CREATE TABLE $tableBafViewsData (
          ID bigint(20) NOT NULL AUTO_INCREMENT,
          post_id bigint(20) NOT NULL,
          page_id bigint(20) NOT NULL,
          views_date_time datetime NULL,
          ip varchar(42) NOT NULL,
          PRIMARY KEY (ID));";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql);
    }
  }


  /**
   * Creates a custom table "baf_likes_data" for collecting each like information. 
   * @since 1.9.4
   * @return stdClass
   */
  public function createBafLikesDataTable()
  {

    global $wpdb;

    $tableBafLikesData = TABLE_BAF_LIKES_DATA;

    if ($wpdb->get_var("SHOW TABLES LIKE '$tableBafLikesData'") != TABLE_BAF_LIKES_DATA) {
      $sql = "CREATE TABLE $tableBafLikesData (
          ID bigint(20) NOT NULL AUTO_INCREMENT,
          post_id bigint(20) NOT NULL,
          like_date_time datetime NULL,
          ip varchar(42) NOT NULL,
          PRIMARY KEY (ID));";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql);
    }
  }


  /**
   * Creates a custom table "baf_likes_data" for collecting each like information. 
   * @since 1.9.4
   * @return stdClass
   */
  public function createBafSearchKeywordsDataTable()
  {

    global $wpdb;

    $tableBafSearchKeywordsData = TABLE_BAF_SEARCH_KEYWORDS_DATA;

    if ($wpdb->get_var("SHOW TABLES LIKE '$tableBafSearchKeywordsData'") != TABLE_BAF_SEARCH_KEYWORDS_DATA) {
      $sql = "CREATE TABLE $tableBafSearchKeywordsData (
          ID bigint(20) NOT NULL AUTO_INCREMENT,
          post_id bigint(20) NOT NULL,
          search_keywords varchar(200) NOT NULL,
          search_result_counts bigint(20) NOT NULL,
          search_date_time datetime NULL,
          ip varchar(42) NOT NULL,
          PRIMARY KEY (ID));";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql);
    }
  }
}


new BafDbSettings();
