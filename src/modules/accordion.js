;(function ($) {
  $(document).ready(function () {
    /*@ Start Collapsable Accordion
     * @Since 1.4.4
     */

    function scrollToElement($el, time = 1000) {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $el.offset().top - 84,
        },
        time
      )
    }

    function getBafPageId() {
      var page_id = ""
      var $pageClasses = $("body").attr("class").split(/\s+/)

      $.each($pageClasses, function (index, item) {
        if (item.indexOf("page-id") >= 0) {
          page_id = item
          return false
        }
      })

      return page_id
    }

    function handleBafViewsAjaxCount($faqId, $pageId) {
      return $.ajax({
        url: BafFrontendData.ajaxurl,
        type: "POST",
        dataType: "HTML",
        data: {
          action: "baf_track_views", // action will be the function name
          faqId: $faqId,
          pageId: $pageId,
        },
      })
    }

    function bafViewsTracker($faqId) {
      var $pageId = getBafPageId().replace("page-id-", "")

      $.when(handleBafViewsAjaxCount($faqId, $pageId)).done(function (data) {
        // console.log(data)
      })
    }

    var accordion_container = $(".ac-container"),
      accordion_single_faq_post_container = $(".single-faq-post")

    /*
     * @ Force all the checkbox inside accordion hidden.
     * @Since- 1.4.4
     */

    accordion_container.find("input[type=checkbox]").css({
      display: "none", // block (Keep it none)
    })

    if (typeof bwl_advanced_faq_collapsible_accordion_status != "undefined" && bwl_advanced_faq_collapsible_accordion_status == 2) {
      /*
       * Show All FAQs Opened
       * @Since 1.4.4
       */

      accordion_container.find("article").removeAttr("style").addClass("baf-show-article baf-article-padding article-box-shadow")

      accordion_container.find("input[type=checkbox]").prop("checked", true)

      accordion_container.find("label").addClass("opened-label")

      accordion_container.find("label").on("click", function () {
        var label_id = $(this).attr("label_id"),
          parent_container_id = $(this).attr("parent_container_id")

        // Modify Accordion Container.
        accordion_container = $(".ac-container[container_id=" + parent_container_id + "]")

        /*-- LABEL SECTION ---------*/

        var current_faq_label_container = $(this),
          current_faq_checkbox = current_faq_label_container.next("input[type=checkbox]"), // here we need to keep squence. First Label, then checkbox , then article. It's releated with shortcode output.
          current_article_faq_container = current_faq_checkbox.next("article")

        /*-- ARTICLE SECTION------------------------ ---------*/

        if (current_faq_checkbox.is(":checked")) {
          current_article_faq_container.removeAttr("style").removeClass("baf-show-article").addClass("baf-hide-article baf-article-padding")
          current_faq_label_container.removeAttr("class").addClass("closed-label")
        } else {
          current_article_faq_container.removeAttr("style").removeClass("baf-hide-article baf-article-padding").addClass("baf-show-article")
          current_faq_label_container.removeAttr("class").addClass("opened-label")
        }
      })
    } else {
      // Regular Collapsable Accordion

      accordion_container.find("article").removeAttr("style").addClass("baf-hide-article article-box-shadow")

      // Now we set all checkbox checked.

      accordion_container.find("input[type=checkbox]").prop("checked", true)

      accordion_container.find("label").addClass("closed-label")

      accordion_container.find("label").on("click", function () {
        let $this = $(this)
        let $faqId = $this.parent("div").attr("id").replace("faq-", "")

        var label_id = $(this).attr("label_id"),
          parent_container_id = $(this).attr("parent_container_id")
        // Modify Accordion Container.
        accordion_container = $(".ac-container[container_id=" + parent_container_id + "]")

        /*-- LABEL SECTION ---------*/

        var current_faq_label_container = $(this),
          current_faq_checkbox = current_faq_label_container.next("input[type=checkbox]"), // here we need to keep squence. First Label, then checkbox , then article. It's releated with shortcode output.
          current_article_faq_container = current_faq_checkbox.next("article")

        /*-- ARTICLE SECTION------------------------ ---------*/

        if (current_faq_checkbox.is(":checked")) {
          // For Unchecked (Opened Details)
          accordion_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow")

          // Now we set all checkbox checked.

          accordion_container.find("input[type=checkbox]").prop("checked", true) //
          accordion_container.find("label").removeAttr("class").addClass("closed-label")

          // Checked
          current_faq_checkbox.prop("checked", true) // Uncheck it
          current_article_faq_container.removeAttr("style").removeClass("baf-hide-article").addClass("baf-show-article baf-article-padding")
          current_faq_label_container.removeAttr("class").addClass("opened-label")
          // alert("scroll")
          // scrollToElement($this)
          // Track The Views.
          bafViewsTracker($faqId)
        } else {
          // For Unchecked (Closed Details)
          current_faq_label_container.parent().find("input[type=checkbox]").prop("checked", false) // Uncheck it
          current_faq_label_container.parent().find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow")
          current_faq_label_container.parent().find("label").removeAttr("class").addClass("closed-label")
        }
      })
    }

    // Display Specific Row Opened.

    if ($(".baf_row_open").length) {
      $(".baf_row_open").each(function () {
        var $this = $(this),
          $baf_row_open = $this.data("row_open") - parseInt(1),
          $bwl_faq_container = $this.find("div.bwl-faq-container:eq(" + $baf_row_open + ")")

        if ($bwl_faq_container.length) {
          $bwl_faq_container.find("label").trigger("click")
        }
      })
    }

    /*
     * Introduced: Version - 1.4.9
     * Create Date: 04-04-2014
     * Last Update: 04-04-2014
     */

    if (accordion_single_faq_post_container.length > 0) {
      if ($(".baf-single-collapse").length == 0) {
        accordion_single_faq_post_container.find("label").trigger("click")
      }
    }

    /*----- FAQ LIST SEARCH ----*/

    if ($(".baf_filter_list").length) {
      $(".baf_filter_list").each(function () {
        var $this = $(this),
          $filter_form = $this.closest("form"),
          $faq_container_id = $("#" + $this.attr("id"))
        $faq_container_id.bwlFaqFilter({
          unique_id: $filter_form.data("unique_id"),
          paginate: $filter_form.data("paginate"),
          pag_limit: $filter_form.data("pag_limit"),
          search_only_title: $filter_form.data("search_only_title"),
        })
      })
    }
  })
})(jQuery)
