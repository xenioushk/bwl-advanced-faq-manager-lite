<?php


class BafViewsTracker
{

    public function __construct()
    {
        add_action('wp_ajax_baf_track_views', [$this, 'cbBafViewTracker']);
        add_action('wp_ajax_nopriv_baf_track_views', [$this, 'cbBafViewTracker']);
    }

    /**
     * @param array $table_data
     * 
     * @return [type]
     */
    public function insertViewsData($table_data = [])
    {

        if (empty($table_data)) return "";

        global $wpdb;

        $table_data_type = array(
            '%d', // post_id
            '%d', // page_id
            '%s', // ip
            '%s', // like_date_time
        );

        $wpdb->insert(TABLE_BAF_VIEWS_DATA, $table_data, $table_data_type);
    }

    public function bafCheckAlreadyViewed($post_id)
    {

        $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');
        $timebeforerevote =  (isset($bwl_advanced_faq_options['baf_repeat_vote_interval']) && is_numeric($bwl_advanced_faq_options['baf_repeat_vote_interval']) && $bwl_advanced_faq_options['baf_repeat_vote_interval'] > 0) ? $bwl_advanced_faq_options['baf_repeat_vote_interval'] : 120; // = 2 hours  

        // Retrieve post views IPs  
        $meta_IP = get_post_meta($post_id, "baf_views_IP");

        $baf_vote_count = get_post_meta($post_id, "baf_views_count", true);

        if ($baf_vote_count == "" || $baf_vote_count == 0) {
            return false;
        }


        if (!empty($meta_IP)) {

            $baf_views_IP = $meta_IP[0];
        } else {

            $baf_views_IP = array();
        }

        // Retrieve current user IP  
        $ip = $_SERVER['REMOTE_ADDR'];

        // If user has already voted  
        if (in_array($ip, array_keys($baf_views_IP))) {

            $time = $baf_views_IP[$ip];

            $now = time();

            // Compare between current time and vote time 

            if (round(($now - $time) / 60) > $timebeforerevote) {

                return false;
            }

            return true;
        }

        return false;
    }

    function cbBafViewTracker()
    {

        if (isset($_REQUEST['faqId']) && !empty($_REQUEST['faqId'])) {

            // Retrieve user IP address  

            $ip          = $_SERVER['REMOTE_ADDR'];

            $post_id  = $_REQUEST['faqId'];
            $pageId  = $_REQUEST['pageId'];

            $meta_IP = get_post_meta($post_id, "baf_views_IP");  // Get voters'IPs for the current post  

            if (!empty($meta_IP)) {

                $baf_views_IP =  $meta_IP[0];
            } else {

                $baf_views_IP = array();
            }

            $baf_views_counter = absint(get_post_meta($post_id, "baf_views_count", true));

            if (!$this->bafCheckAlreadyViewed($post_id)) {

                $timestamp =  time();

                $baf_views_IP[$ip] =  $timestamp;

                // Update Data of "baf_likes_data"

                $table_data = [
                    'post_id' => $post_id,
                    'page_id' => $pageId,
                    'ip' => $ip,
                    'views_date_time' => date('Y-m-d H:i:s', $timestamp)
                ];

                $this->insertViewsData($table_data);

                // Save IP and increase views count

                update_post_meta($post_id, "baf_views_IP", $baf_views_IP);
                update_post_meta($post_id, "baf_views_count", ++$baf_views_counter);

                $data = array(
                    'status'           => 1 // count views.
                );
            } else {

                $data = array(
                    'status'            => 0 // already viewed.
                );
            }

            echo json_encode($data);
        }

        die();
    }
}

new BafViewsTracker();
