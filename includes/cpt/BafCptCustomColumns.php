<?php


class BafCptCustomColumns
{

    public function __construct()
    {
        add_filter('manage_' . BWL_BAF_CPT . '_posts_columns', [$this, 'cbBafColumnHeader']);
        add_action('manage_' . BWL_BAF_CPT . '_posts_custom_column', [$this, 'cbBafColumnData']);
    }

    function cbBafColumnHeader($columns)
    {

        $columns['cb'] = 'cb';

        $columns['title'] = esc_html__('Title', 'bwl-adv-faq');

        $columns['advanced_faq_category'] = esc_html__('Category', 'bwl-adv-faq');

        $columns['advanced_faq_topics'] = esc_html__('Topics', 'bwl-adv-faq');

        $columns['baf_votes_count'] = esc_html__('Likes', 'bwl-adv-faq');

        $columns['baf_views_count'] = esc_html__('Views', 'bwl-adv-faq');

        $columns['date'] = esc_html__('Date', 'bwl-adv-faq');

        return $columns;
    }



    function cbBafColumnData($column)
    {

        global $post;

        switch ($column) {

            case 'advanced_faq_category':

                $faq_category = "";

                $get_faq_categories = get_the_terms($post->ID, 'advanced_faq_category');

                if (is_array($get_faq_categories) && count($get_faq_categories) > 0) {

                    foreach ($get_faq_categories as $category) {

                        $faq_category .= $category->name . ",";
                    }

                    echo esc_html(substr($faq_category, 0, strlen($faq_category) - 1));
                } else {

                    esc_html_e('Uncategorized', 'bwl-adv-faq');
                }

                break;

            case 'advanced_faq_topics':

                $faq_topics = "";

                $get_faq_topics = get_the_terms($post->ID, 'advanced_faq_topics');

                if (is_array($get_faq_topics) && count($get_faq_topics) > 0) {

                    foreach ($get_faq_topics as $topic) {

                        $faq_topics .= $topic->name . ",";
                    }

                    echo esc_html(substr($faq_topics, 0, strlen($faq_topics) - 1));
                } else {

                    echo esc_html("—");
                }

                break;


            case 'baf_votes_count':

                $votesCount = get_post_meta($post->ID, "baf_votes_count", true);

                echo (!empty($votesCount)) ? $votesCount : 0;

                break;

            case 'baf_views_count':

                echo '<a href="' . BWL_BAF_CC_URL . '" target="_blank">Upgrade to pro version.</a>';
                break;
        }
    }
}


new BafCptCustomColumns();
