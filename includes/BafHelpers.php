<?php

if (!function_exists('bwllog')) {
    function bwllog($message, $clean = false)
    {
        if (is_array($message)) {
            $message = json_encode($message);
        }

        $existing_logs = "";

        $log_file = plugin_dir_path(__FILE__) . "custom_logs.log";

        if ($clean == false) {
            $existing_logs = file_get_contents($log_file);
        }
        $new_log = date('Y-m-d h:i:s') . " :: " . $message . "\n" . $existing_logs;

        file_put_contents($log_file, $new_log);
    }
}

if (!function_exists('bwlBeautifyDate')) {

    function bwlBeautifyDate($date)
    {

        $splitDate = explode("T", $date);

        $rearrangeDate = explode("-", $splitDate[0]);

        return $rearrangeDate[2] . "-" . $rearrangeDate[1] . "-" . $rearrangeDate[0];
    }
}

if (!function_exists('getRenewalDaysLeft')) {

    function getRenewalDaysLeft($renewalDate)
    {

        // $renewalDate = "2024-01-30T01:51:19+11:00";

        // Convert the renewal date to a DateTime object
        $renewalDateTime = new DateTime($renewalDate);

        // Get the current date
        $currentDate = new DateTime();

        // Compare the renewal date with the current date
        if ($renewalDateTime < $currentDate) {
            // Renewal date has expired

            return [
                'status' => 0,
                'msg' => "Support period has expired."
            ];
        } else {
            // Calculate the difference between the renewal date and the current date
            $interval = $currentDate->diff($renewalDateTime);
            $daysLeft = $interval->days;

            return [
                'status' => 1,
                'msg' => "$daysLeft days left for premium support."
            ];
        }
    }
}

function getBafLicenseInfo()
{

    $purchaseVerified = get_option('baf_purchase_verified') ?? 0;
    $purchaseInfo = get_option('baf_purchase_info') ?? [];

    $pluginLicenseData = [
        'title' => BWL_BAF_PLUGIN_TITLE,
        'status' => $purchaseVerified, // 1= active, 0=not active, 2=no license reqruired.
        'info' => $purchaseInfo,
        'pluginId' => BWL_BAF_CC_ID,
        'supportLink' =>  BWL_BAF_AUTHOR_SUPPORT
    ];

    return $pluginLicenseData;
}

if (!function_exists('bwlApiUrl')) {

    function bwlApiUrl()
    {
        $baseUrl = get_home_url();
        if (strpos($baseUrl, "localhost") != false) {
            return "http://localhost/bwl_api/";
        } elseif (strpos($baseUrl, "staging.bluewindlab.com") != false) {
            return "https://staging.bluewindlab.com/bwl_api/";
        } else {
            return "https://api.bluewindlab.net/";
        }
    }
}

// Change The Default WordPress Excerpt Length

function bwl_advanced_faq_excerpt($sc_excerpt = 0)
{

    $bwl_advanced_faq_options = get_option('bwl_advanced_faq_options');

    if ($sc_excerpt == 1) {
        $bwl_advanced_faq_options['bwl_advanced_faq_excerpt_status'] = 1;
    }


    if (isset($bwl_advanced_faq_options['bwl_advanced_faq_excerpt_status']) && $bwl_advanced_faq_options['bwl_advanced_faq_excerpt_status'] == 1) {

        $content = get_the_content();

        if (str_word_count($content) > $bwl_advanced_faq_options['bwl_advanced_faq_excerpt_length']) {

            $baf_excerpt_read_more = apply_filters('baf_excerpt_read_more_text', esc_html__('Read More', 'bwl-adv-faq')  . ' &raquo;');

            $trimmed_content = wp_trim_words($content, $bwl_advanced_faq_options['bwl_advanced_faq_excerpt_length'], '..... <a class="read-more" href="' . esc_url(get_permalink(get_the_ID())) . '">' . $baf_excerpt_read_more . ' </a>');
        } else {

            $trimmed_content = str_replace(']]>', ']]&gt;', apply_filters('the_content', get_the_content()));
        }

        $content = $trimmed_content;
    } else {

        $content = str_replace(']]>', ']]&gt;', apply_filters('the_content', get_the_content()));
    }

    $content = '<div class="baf_content">' . apply_filters('baf_force_content_shortcode', $content) . '</div>';

    return $content;
}

// Solve apostrophe issue.

$texturized_text = array(
    'term_name',
    'term_description',
    'the_title',
    'the_content',
    'the_excerpt',
);

foreach ($texturized_text as $text) {
    remove_filter($text, 'wptexturize');
}


class BafHelpers
{


    /**
     * @return [array]
     */

    public static function localizeData()
    {

        /*
        * Example of accessing the data from JavaScript:
        * BafFrontendData.ajaxurl
        */

        $localizeData = [
            'ajaxurl' => esc_url(admin_url('admin-ajax.php')),
            'err_faq_category' => esc_html__('Select FAQ Category!', 'bwl-adv-faq'),
            'err_faq_captcha' => esc_html__(' Incorrect Captcha Value!', 'bwl-adv-faq'),
            'string_total' => esc_html__('Total', 'bwl-adv-faq'),
            'string_singular_page' => apply_filters('baf_single_string', esc_html__('Page !', 'bwl-adv-faq')),
            'string_plural_page' => esc_html__('Pages !', 'bwl-adv-faq'),
            'string_please_wait' => esc_html__('Please Wait .....', 'bwl-adv-faq'),
            'string_ques_added' => esc_html__('Question successfully added for review!', 'bwl-adv-faq'),
            'string_ques_unable_add' => esc_html__('Unable to add faq. Please try again!', 'bwl-adv-faq'),

            'noting_found_text' => apply_filters('baf_search_nothing_found_text', esc_html__('Nothing Found!', 'bwl-adv-faq')),
            'found_text' => apply_filters('baf_search_found_text', esc_html__('Found', 'bwl-adv-faq')),
            'singular_faq' => apply_filters('baf_search_singular_faq_text', esc_html__('FAQ !', 'bwl-adv-faq')),
            'plural_faq' => apply_filters('baf_search_plural_faq_text', esc_html__('FAQs !', 'bwl-adv-faq'))

        ];

        return $localizeData;
    }
}
