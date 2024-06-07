<?php


class BafSearchKeywordsTracker
{

    public function __construct()
    {
        add_action('wp_ajax_baf_track_search_keywords', [$this, 'cbBafSearchKeywordsTracker']);
        add_action('wp_ajax_nopriv_baf_track_search_keywords', [$this, 'cbBafSearchKeywordsTracker']);
    }

    /**
     * @param array $table_data
     * 
     * @return [type]
     */
    public function insertSearchKeywordsData($table_data = [])
    {

        if (empty($table_data)) return "";

        global $wpdb;

        $table_data_type = array(
            '%s', // search_keywords
            '%d', // search_result_counts
            '%d', // pageId
            '%s', // ip
            '%s', // like_date_time
        );

        $wpdb->insert(TABLE_BAF_SEARCH_KEYWORDS_DATA, $table_data, $table_data_type);
    }

    function cbBafSearchKeywordsTracker()
    {

        if (isset($_REQUEST['keywords']) && !empty($_REQUEST['keywords'])) {

            // Retrieve user IP address  

            $ip          = $_SERVER['REMOTE_ADDR'];
            $keywords  = $_REQUEST['keywords'];
            $count  = $_REQUEST['count'];
            $pageId  = $_REQUEST['pageId'];

            $timestamp =  time();

            // Update Data of "baf_likes_data"

            $table_data = [
                'search_keywords' => $keywords,
                'search_result_counts' => $count,
                'post_id' => $pageId,
                'ip' => $ip,
                'search_date_time' => date('Y-m-d H:i:s', $timestamp)
            ];

            $this->insertSearchKeywordsData($table_data);

            $data = array(
                'status'           => 1 // count views.
            );
        } else {

            $data = array(
                'status'            => 0 // already viewed.
            );
        }

        echo json_encode($data);

        die();
    }
}

new BafSearchKeywordsTracker();
