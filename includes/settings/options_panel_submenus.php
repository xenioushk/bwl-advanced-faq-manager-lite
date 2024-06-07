<?php


/**
 * @return [array]
 */
function getBafSubmenus()
{

    $bafLicenseActivationInfo = (BWL_BAF_VERIFIED == 1) ? ['class' => 'activated', 'text' => esc_attr__('ACTIVE', 'bwl-adv-faq')] : ['class' => 'inactive', 'text' => esc_attr__('INACTIVE', 'bwl-adv-faq')];

    $subMenus = [

        [
            'page_title' => esc_attr__('Advanced FAQ Sort Page', 'bwl-adv-faq'),
            'menu_title' => BAF_S_FAQ_TEXT . ' ' . esc_attr__('Sorting', 'bwl-adv-faq'),
            'menu_slug' => 'bwl_advanced_faq_sort',
            'cb' => 'bafSortingPage'
        ],

        [
            'page_title' => esc_attr__('About BWL Advanced FAQ Manager Plugin', 'bwl-adv-faq'),
            'menu_title' => esc_attr__('Plugin Info', 'bwl-adv-faq'),
            'menu_slug' => 'bwl-advanced-faq-welcome',
            'cb' => 'bafPluginInfoPage'
        ],

        [
            'page_title' => esc_attr__('BWL Advanced FAQ Manager Addons', 'bwl-adv-faq'),
            'menu_title' => esc_attr__('Plugin Addons', 'bwl-adv-faq'),
            'menu_slug' => 'baf-addons',
            'cb' => 'bafPluginAddonsPage'
        ],

        [
            'page_title' => esc_attr__('Analytics BWL Advanced FAQ Manager', 'bwl-adv-faq'),
            'menu_title' => esc_attr__('Analytics', 'bwl-adv-faq'),
            'menu_slug' => 'bwl-advanced-faq-analytics',
            'cb' => 'bafAnalyticsPage'
        ]


    ];

    return $subMenus;
}

function bafAnalyticsPage()
{

    $bafAnalyticsSummaryData = new BafAnalyticsSummary();

    // Get All The FAQ Summary Data. (Total FAQs, Total Categories and Topics)
    $bafSummaryData =  $bafAnalyticsSummaryData->register();

    // echo "<pre>";
    // print_r($bafSummaryData);
    // echo "</pre>";

    // Likes Count.

    $bafAnalyticsLikesCountData = new BafAnalyticsLikesCount();
    $faqLikesCount =  $bafAnalyticsLikesCountData->register();

    // Views Count.

    $bafAnalyticsViewsCountData = new BafAnalyticsViewsCount();
    $faqViewsCount =  $bafAnalyticsViewsCountData->register();

    // Latest FAQ Posts.

    $bafAnalyticsPostsListData = new BafAnalyticsPostsList();
    $latestFAQPosts = $bafAnalyticsPostsListData->getFAQPosts();

    // Popular FAQ Posts.
    $popularFAQPosts = $bafAnalyticsPostsListData->getFAQPosts("popular");

    // Top Viewed FAQ Posts.
    $topViewedFAQPosts = $bafAnalyticsPostsListData->getFAQPosts("viewed");

    // Recent Liked FAQs.
    $recentlyLikedFAQPosts = $bafAnalyticsPostsListData->getRecentlyLikedFaqs();

    // Recent Viewed FAQs.
    $recentViewedFAQPosts = $bafAnalyticsPostsListData->getRecentlViewedFaqs();

    // External API Calls.

    $bafAnalyticsExternalApiData = new BafAnalyticsExternalApi();
    $bwlBlogPosts = $bafAnalyticsExternalApiData->getBlueWindLabBlogPosts();
    $pluginSupportKB = $bafAnalyticsExternalApiData->getPluginSupportKB();

    require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/tpl_analytics.php';
}

function bafPluginInfoPage()
{
    require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/tpl_plugin_info.php';
}

function bafPluginAddonsPage()
{
    require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/tpl_addons.php';
}

function bafSortingPage()
{
    require_once BWL_BAF_PLUGIN_PATH . '/includes/settings/views/tpl_baf_sort.php';
}


function bafOptionsPanelSubmenus()
{

    $baf_options_menu_link = (defined('BWL_KB_OPT_MENU') && BWL_BAF_OPT_MENU == "") ? 'edit.php' : 'edit.php?post_type=' . BWL_BAF_OPT_MENU;

    foreach (getBafSubmenus() as $sub_page) {
        add_submenu_page(
            $baf_options_menu_link,
            $sub_page['page_title'],
            $sub_page['menu_title'],
            'manage_options',
            $sub_page['menu_slug'],
            $sub_page['cb'],
            $sub_page['position'] ?? null
        );
    }
}

add_action('admin_menu', 'bafOptionsPanelSubmenus');
