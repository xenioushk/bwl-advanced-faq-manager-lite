<?php

class BafAnalyticsSummary extends BafAnalytics
{

    public function register()
    {
        return $this->getSummaryData();
    }

    /**
     * Counts the total number of published, pending and draft FAQ posts.
     * @since 1.9.4
     * @return array An array that contains published, pending, and draft posts count.
     */

    public function getTotalFaqsCount()
    {

        $total_posts = wp_count_posts(BWL_BAF_CPT);
        $published = $total_posts->publish;
        $pending = $total_posts->pending;
        $draft = $total_posts->draft;

        $faqsCount = [
            'published' => $published,
            'pending' => $pending,
            'draft' => $draft,
        ];
        return $faqsCount;
    }

    /**
     * Counts the total number of taxonomies of faq custom post type.
     * @param string $taxonomy Optional. advanced_faq_category or advanced_faq_topics. Default 'advanced_faq_category'.
     * @since 1.9.4
     * @return [int]
     */

    public function getTotalTaxonomyCount($taxonomy = "advanced_faq_category")
    {

        $taxonomyCount = wp_count_terms($taxonomy);

        return $taxonomyCount;
    }

    /**
     * Counts total FAQs, total categoires, and total topics.
     * @since 1.9.4
     * @return [array]
     */

    public function getSummaryData()
    {
        return [
            'totalFaqs' => $this->getTotalFaqsCount(),
            'totalCategories' => $this->getTotalTaxonomyCount(),
            'totalTopics' => $this->getTotalTaxonomyCount("advanced_faq_topics")
        ];
    }
}
