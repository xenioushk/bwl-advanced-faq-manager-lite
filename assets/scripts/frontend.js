/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/accordion.js":
/*!**********************************!*\
  !*** ./src/modules/accordion.js ***!
  \**********************************/
/***/ (() => {

;
(function ($) {
  $(document).ready(function () {
    /*@ Start Collapsable Accordion
     * @Since 1.4.4
     */

    function scrollToElement($el, time = 1000) {
      $([document.documentElement, document.body]).animate({
        scrollTop: $el.offset().top - 84
      }, time);
    }
    function getBafPageId() {
      var page_id = "";
      var $pageClasses = $("body").attr("class").split(/\s+/);
      $.each($pageClasses, function (index, item) {
        if (item.indexOf("page-id") >= 0) {
          page_id = item;
          return false;
        }
      });
      return page_id;
    }
    function handleBafViewsAjaxCount($faqId, $pageId) {
      return $.ajax({
        url: BafFrontendData.ajaxurl,
        type: "POST",
        dataType: "HTML",
        data: {
          action: "baf_track_views",
          // action will be the function name
          faqId: $faqId,
          pageId: $pageId
        }
      });
    }
    function bafViewsTracker($faqId) {
      var $pageId = getBafPageId().replace("page-id-", "");
      $.when(handleBafViewsAjaxCount($faqId, $pageId)).done(function (data) {
        // console.log(data)
      });
    }
    var accordion_container = $(".ac-container"),
      accordion_single_faq_post_container = $(".single-faq-post");

    /*
     * @ Force all the checkbox inside accordion hidden.
     * @Since- 1.4.4
     */

    accordion_container.find("input[type=checkbox]").css({
      display: "none" // block (Keep it none)
    });
    if (typeof bwl_advanced_faq_collapsible_accordion_status != "undefined" && bwl_advanced_faq_collapsible_accordion_status == 2) {
      /*
       * Show All FAQs Opened
       * @Since 1.4.4
       */

      accordion_container.find("article").removeAttr("style").addClass("baf-show-article baf-article-padding article-box-shadow");
      accordion_container.find("input[type=checkbox]").prop("checked", true);
      accordion_container.find("label").addClass("opened-label");
      accordion_container.find("label").on("click", function () {
        var label_id = $(this).attr("label_id"),
          parent_container_id = $(this).attr("parent_container_id");

        // Modify Accordion Container.
        accordion_container = $(".ac-container[container_id=" + parent_container_id + "]");

        /*-- LABEL SECTION ---------*/

        var current_faq_label_container = $(this),
          current_faq_checkbox = current_faq_label_container.next("input[type=checkbox]"),
          // here we need to keep squence. First Label, then checkbox , then article. It's releated with shortcode output.
          current_article_faq_container = current_faq_checkbox.next("article");

        /*-- ARTICLE SECTION------------------------ ---------*/

        if (current_faq_checkbox.is(":checked")) {
          current_article_faq_container.removeAttr("style").removeClass("baf-show-article").addClass("baf-hide-article baf-article-padding");
          current_faq_label_container.removeAttr("class").addClass("closed-label");
        } else {
          current_article_faq_container.removeAttr("style").removeClass("baf-hide-article baf-article-padding").addClass("baf-show-article");
          current_faq_label_container.removeAttr("class").addClass("opened-label");
        }
      });
    } else {
      // Regular Collapsable Accordion

      accordion_container.find("article").removeAttr("style").addClass("baf-hide-article article-box-shadow");

      // Now we set all checkbox checked.

      accordion_container.find("input[type=checkbox]").prop("checked", true);
      accordion_container.find("label").addClass("closed-label");
      accordion_container.find("label").on("click", function () {
        let $this = $(this);
        let $faqId = $this.parent("div").attr("id").replace("faq-", "");
        var label_id = $(this).attr("label_id"),
          parent_container_id = $(this).attr("parent_container_id");
        // Modify Accordion Container.
        accordion_container = $(".ac-container[container_id=" + parent_container_id + "]");

        /*-- LABEL SECTION ---------*/

        var current_faq_label_container = $(this),
          current_faq_checkbox = current_faq_label_container.next("input[type=checkbox]"),
          // here we need to keep squence. First Label, then checkbox , then article. It's releated with shortcode output.
          current_article_faq_container = current_faq_checkbox.next("article");

        /*-- ARTICLE SECTION------------------------ ---------*/

        if (current_faq_checkbox.is(":checked")) {
          // For Unchecked (Opened Details)
          accordion_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");

          // Now we set all checkbox checked.

          accordion_container.find("input[type=checkbox]").prop("checked", true); //
          accordion_container.find("label").removeAttr("class").addClass("closed-label");

          // Checked
          current_faq_checkbox.prop("checked", true); // Uncheck it
          current_article_faq_container.removeAttr("style").removeClass("baf-hide-article").addClass("baf-show-article baf-article-padding");
          current_faq_label_container.removeAttr("class").addClass("opened-label");
          // alert("scroll")
          // scrollToElement($this)
          // Track The Views.
          bafViewsTracker($faqId);
        } else {
          // For Unchecked (Closed Details)
          current_faq_label_container.parent().find("input[type=checkbox]").prop("checked", false); // Uncheck it
          current_faq_label_container.parent().find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
          current_faq_label_container.parent().find("label").removeAttr("class").addClass("closed-label");
        }
      });
    }

    // Display Specific Row Opened.

    if ($(".baf_row_open").length) {
      $(".baf_row_open").each(function () {
        var $this = $(this),
          $baf_row_open = $this.data("row_open") - parseInt(1),
          $bwl_faq_container = $this.find("div.bwl-faq-container:eq(" + $baf_row_open + ")");
        if ($bwl_faq_container.length) {
          $bwl_faq_container.find("label").trigger("click");
        }
      });
    }

    /*
     * Introduced: Version - 1.4.9
     * Create Date: 04-04-2014
     * Last Update: 04-04-2014
     */

    if (accordion_single_faq_post_container.length > 0) {
      if ($(".baf-single-collapse").length == 0) {
        accordion_single_faq_post_container.find("label").trigger("click");
      }
    }

    /*----- FAQ LIST SEARCH ----*/

    if ($(".baf_filter_list").length) {
      $(".baf_filter_list").each(function () {
        var $this = $(this),
          $filter_form = $this.closest("form"),
          $faq_container_id = $("#" + $this.attr("id"));
        $faq_container_id.bwlFaqFilter({
          unique_id: $filter_form.data("unique_id"),
          paginate: $filter_form.data("paginate"),
          pag_limit: $filter_form.data("pag_limit"),
          search_only_title: $filter_form.data("search_only_title")
        });
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./src/modules/faq_custom_style.js":
/*!*****************************************!*\
  !*** ./src/modules/faq_custom_style.js ***!
  \*****************************************/
/***/ (() => {

;
(function ($) {
  $(function () {
    // Convert Hex Color to RGBA.

    function bafHexToRgba(hex, opacity) {
      var c;
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("");
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = "0x" + c.join("");
        return "rgba(" + [c >> 16 & 255, c >> 8 & 255, c & 255].join(",") + "," + opacity + ")";
      } else {
        return 'rgba("0,0,0,' + opacity + '")';
      }
    }

    // Custom scripts to generate dynamic css.

    function generateBafCustomStyles() {
      if ($(".baf_custom_style").length > 0) {
        var customStyle = "";
        $(".baf_custom_style").each(function () {
          var container_id = $(this).attr("container_id"),
            $section_faq_unique_class = ".section_baf_" + container_id,
            first_color = $(this).data("first_color"),
            second_color = $(this).data("second_color"),
            label_text_color = $(this).data("label_text_color"),
            accordion_arrow = $(this).data("accordion_arrow");
          customStyle += $section_faq_unique_class + "{clear:both;}";
          customStyle += $section_faq_unique_class + " label{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important; color: " + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " label.opened-label{  background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(first_color, 1) + ") !important;}";
          customStyle += $section_faq_unique_class + ' label.opened-label:after{ font-size: 15px; font-weight:600; font-family: "Font Awesome 5 Free"; content:  "' + "\\" + accordion_arrow + '" !important; color: ' + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + ' label.closed-label:after{ font-size: 15px; font-weight: 600; font-family: "Font Awesome 5 Free"; content:  "' + "\\" + accordion_arrow + '" !important; color: ' + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " .baf-expand-all { background: " + first_color + " !important; color: " + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " .baf-expand-all:hover { background: " + second_color + " !important; color: " + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " .baf-collapsible-all{ background: " + first_color + " !important; color: " + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " .baf-collapsible-all:hover{ background: " + second_color + " !important; color: " + label_text_color + " !important;}";
          customStyle += $section_faq_unique_class + " .active_page{ background: " + first_color + " !important;}";

          // Custom Theme.
          customStyle += $section_faq_unique_class + ".baf_layout_semi_round .bwl-faq-container{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important;}";
          customStyle += $section_faq_unique_class + ".baf_layout_round .bwl-faq-container{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important;}";
        });
        $("<style data-type='baf_custom_style-custom-css'>" + customStyle + "</style>").appendTo("head");
      }
    }

    // Finally generate Custom CSS.

    generateBafCustomStyles();
  });
})(jQuery);

/***/ }),

/***/ "./src/modules/faq_likes.js":
/*!**********************************!*\
  !*** ./src/modules/faq_likes.js ***!
  \**********************************/
/***/ (() => {

;
(function ($) {
  $(function () {
    /*--  Likes --*/

    $(document).on("click", ".post-like-container a", function () {
      var $icon_container = jQuery(this);
      var $thumb_icon_class = $icon_container.find("i");
      var $info_icon = $icon_container.data("info_icon");
      var $loading_msg = $icon_container.data("loading_msg");
      if ($thumb_icon_class.attr("class") === $info_icon) {
        return false;
      }
      $thumb_icon_class.attr("class", $info_icon);
      $icon_container.siblings(".count").text($loading_msg);

      // Retrieve post ID from data attribute
      var $post_id = $icon_container.data("post_id");
      $.ajax({
        url: BafFrontendData.ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: {
          action: "bwl_advanced_faq_apply_rating",
          // action will be the function name
          post_like: true,
          post_id: $post_id
        },
        success: function (data) {
          // If vote successful
          if (data.status == 0) {
            $icon_container.addClass("voted");
            $icon_container.siblings(".count").text("").append(data.msg);
          }
          if (data.status == 1) {
            $icon_container.addClass("voted");
            $icon_container.siblings(".count").text("").append(data.msg);
          }
        },
        error: function (xhr, textStatus, e) {
          console.log("There was an error saving the update.");
          return;
        }
      });
      return false;
    });
  });
})(jQuery);

/***/ }),

/***/ "./src/modules/faq_tab.js":
/*!********************************!*\
  !*** ./src/modules/faq_tab.js ***!
  \********************************/
/***/ (() => {

;
(function ($) {
  $(function () {
    // Custom FAQ Category Tab.

    function switch_tabs(obj) {
      obj.parent().parent().find(".bwl-faq-tab-content").slideUp("fast");
      obj.parent().find("li").removeClass("active");
      var id = obj.find("a", 0).attr("rel");
      $("#" + id).slideDown("slow");
      obj.addClass("active");
    }
    if ($(".bwl-faq-tabs").length) {
      $(".bwl-faq-tabs li").on("click", function () {
        if ($(this).find(".bwl-faq-link").attr("class") != "bwl-faq-link") {
          switch_tabs($(this));
        }
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./src/modules/pagination.js":
/*!***********************************!*\
  !*** ./src/modules/pagination.js ***!
  \***********************************/
/***/ (() => {

;
(function ($) {
  "use strict";

  $(function () {
    function baf_get_url_params(url) {
      // get query string from url (optional) or window
      var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

      // we'll store the parameters here
      var obj = {};

      // if query string exists
      if (queryString) {
        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split("#")[0];

        // split our query string into its component parts
        var arr = queryString.split("&");
        for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split("=");

          // in case params look like: list[]=thing1&list[]=thing2
          var paramNum = undefined;
          var paramName = a[0].replace(/\[\d*\]/, function (v) {
            paramNum = v.slice(1, -1);
            return "";
          });

          // set parameter value (use 'true' if empty)
          var paramValue = typeof a[1] === "undefined" ? true : a[1];

          // (optional) keep case consistent
          paramName = paramName.toLowerCase();
          paramValue = paramValue.toLowerCase();

          // if parameter name already exists
          if (obj[paramName]) {
            // convert value to array (if still string)
            if (typeof obj[paramName] === "string") {
              obj[paramName] = [obj[paramName]];
            }
            // if no array index number specified...
            if (typeof paramNum === "undefined") {
              // put the value on the end of the array
              obj[paramName].push(paramValue);
            }
            // if array index number specified...
            else {
              // put the value at that index number
              obj[paramName][paramNum] = paramValue;
            }
          }
          // if param name doesn't exist yet, set it
          else {
            obj[paramName] = paramValue;
          }
        }
      }
      return obj;
    }
    function goToByScroll() {
      //http://localhost/dev.plugin/baf/faq-search/?fid=3823

      var parser = document.createElement("a");
      parser.href = window.location.href;
      if (typeof parser.search != "undefind" && parser.search != "") {
        var fid = baf_get_url_params().fid;
        if (typeof fid === "undefined") {
          return "";
        }
        var $scroll_faq_id = $("#faq-" + fid);
        if ($scroll_faq_id.length > 0) {
          $("html,body").animate({
            scrollTop: $scroll_faq_id.offset().top
          }, 1, function () {
            $scroll_faq_id.removeAttr("style");
            $scroll_faq_id.find("input[type=checkbox]").removeAttr("checked");
            $scroll_faq_id.find("label").removeClass("closed-label").addClass("opened-label");
            $scroll_faq_id.find("article").css({
              height: "auto",
              // issue in here
              visibility: "visible",
              padding: "11px 10px 10px 10px"
            }).addClass("article-box-shadow").removeClass("baf-hide-article");
          });
        }
      }
    }
    goToByScroll();
    var baf_display_limit = 10;
    function baf_get_pagination_html($baf_section, show_per_page, number_of_items, baf_search) {
      // show_per_page == start_on
      // number_of_items = end_on

      var $baf_paginate_status = $baf_section.find(".baf_page_navigation").data("paginate");
      if ($baf_paginate_status == 0) {
        var $baf_search_field = $baf_section.find("#bwl_filter_" + $baf_section.attr("container_id"));
        var $baf_search_field_current_value = $.trim($baf_search_field.val());
        if ($baf_search_field_current_value.length > -1 && $baf_search_field_current_value.length < 2) {
          $baf_section.find("div.bwl-faq-container").css("display", "block");
        }
        $baf_search_field.removeClass("search_load").addClass("search_icon");
        return false;
      }
      if (typeof baf_search != "undefined" && baf_search == 1) {
        if ($baf_paginate_status == 1) {
          var $searched_faq_items = $baf_section.find("div.bwl-faq-container:visible");
          $searched_faq_items.addClass("filter");
          var total_faq_items = $searched_faq_items.size();
          var number_of_items = number_of_items;
          var $items_need_to_show = $searched_faq_items.slice(0, show_per_page);
          var $items_need_to_hide = $searched_faq_items.slice(show_per_page, total_faq_items);
          $items_need_to_hide.css("display", "none");
        }
        $baf_section.find("input[type=text]").removeClass("search_load").addClass("search_icon");
      } else {
        //getting the amount of elements inside content div

        $baf_section.find("div.bwl-faq-container").css("display", "none");

        //and show the first n (show_per_page) elements
        $baf_section.find("div.bwl-faq-container").slice(0, show_per_page).css("display", "block");
        var number_of_items = $baf_section.find("div.bwl-faq-container").size();
      }

      //calculate the number of pages we are going to have
      var number_of_pages = Math.ceil(number_of_items / show_per_page);

      //set the value of our hidden input fields
      $baf_section.find("#current_page").val(0);
      $baf_section.find("#show_per_page").val(show_per_page);
      //now when we got all we need for the navigation let's make it '

      /*
             what are we going to have in the navigation?
             - link to previous page
             - links to specific pages
             - link to next page
             */
      var navigation_html = '<div class="baf_page_num"><a class="previous_link" href="#"><i class="fa fa-chevron-left"></i></a>';
      var current_link = 0;
      var page_array = [];
      var display_none_class = "";
      var baf_pages_string = string_singular_page;
      while (number_of_pages > current_link) {
        page_array[current_link] = current_link;
        if (number_of_pages > baf_display_limit && current_link >= baf_display_limit) {
          display_none_class = " baf_dn";
        }
        navigation_html += '<a class="page_link' + display_none_class + '" href="#" longdesc="' + current_link + '">' + (current_link + 1) + "</a>";
        current_link++;
      }
      if (number_of_pages > 1) {
        baf_pages_string = string_plural_page;
      }
      navigation_html += '<a class="next_link" href="#"><i class="fa fa-chevron-right"></i></a></div><div class="total_pages">' + BafFrontendData.string_total + " " + number_of_pages + " " + baf_pages_string + "</div>";
      $baf_section.find("#baf_page_navigation").html("").html(navigation_html);
      if ($baf_paginate_status == 0) {
        $baf_section.find("#baf_page_navigation").remove();
      }
      if (page_array.length == 0) {
        $baf_section.find("#baf_page_navigation").css("display", "none");
      } else {
        $baf_section.find("#baf_page_navigation").css("display", "block");
      }

      //add active_page class to the first page link
      $baf_section.find("#baf_page_navigation .page_link:first").addClass("active_page");
      $baf_section.find(".next_link").on("click", function () {
        var new_page = parseInt($baf_section.find("#current_page").val()) + 1;

        //if there is an item after the current active link run the function

        var $active_page = $baf_section.find(".active_page").next(".page_link");
        if ($active_page.length == true) {
          if ($active_page.hasClass("baf_dn")) {
            $active_page.removeClass("baf_dn");
            var total_link_need_to_hide = parseInt($baf_section.find("a.page_link:visible").length) - baf_display_limit;
            $baf_section.find("a.page_link:visible").slice(0, total_link_need_to_hide).addClass("baf_dn");
          }
          baf_go_to_page($baf_section, new_page);
        }
        baf_beautify_pagination($baf_section);
        return false;
      });
      $baf_section.find(".previous_link").on("click", function () {
        var new_page = parseInt($baf_section.find("#current_page").val()) - 1;
        //if there is an item before the current active link run the function

        var $active_page = $baf_section.find(".active_page").prev(".page_link");
        var number_of_items = $baf_section.find("div.bwl-faq-container").size();
        var start = parseInt($baf_section.find("a.page_link:visible:first").attr("longdesc")) - 1;
        var end = $baf_section.find("a.page_link:visible:last").attr("longdesc");
        if ($active_page.length == true) {
          if (start > -1 && end < number_of_items) {
            $baf_section.find("a.page_link").addClass("baf_dn");
            $baf_section.find("a.page_link").slice(start, end).removeClass("baf_dn");
          }
          baf_go_to_page($baf_section, new_page);
        }
        baf_beautify_pagination($baf_section);
        return false;
      });
      $baf_section.find(".page_link").on("click", function () {
        var current_link = $(this).attr("longdesc");
        baf_go_to_page($baf_section, current_link);
        baf_beautify_pagination($baf_section);
        return false;
      });
      baf_beautify_pagination($baf_section);
    }
    function baf_beautify_pagination($baf_section) {
      var $visible_page_size = 4,
        $current_page_index = $baf_section.find(".active_page").index(),
        $baf_dotted_link = '<a href="#" class="baf_dotted_link">...</a>';

      //    console.log($current_page_index);

      if ($baf_section.find(".page_link").length) {
        var $page_link = $baf_section.find(".page_link"),
          $total_pages = $page_link.length,
          // 12
          $first_page_link = $page_link.first(),
          $last_page_link = $page_link.last();
        //        console.log($total_pages);

        // 4>=4
        //                console.log($visible_page_size);
        //                console.log($total_pages);
        if ($visible_page_size >= $total_pages - 1) {
          return 1;
        }

        /*- Dotted Link Addition -*/

        // 12 > 4

        if ($total_pages > $visible_page_size) {
          //                    console.log("Total Page > Visible Page Size");
          // Check if another Fake Link available or not.
          if ($baf_section.find(".baf_dotted_link").length > 0) {
            $baf_section.find(".baf_dotted_link").remove();
          }

          // Display Number of Visible Pages.
          // Default 4.
          //                    console.log($visible_page_size);
          $page_link.removeClass("baf_dn");
          $page_link.slice($visible_page_size).addClass("baf_dn");

          // Added Dotted  Link Last Page Link & Remove Last Number Link
          $last_page_link.before($baf_dotted_link);
          $last_page_link.removeClass("baf_dn");
        }

        /*- Dotted Link Addition -*/

        /*
        -- c =5
                - t = 8
                 */
        if ($current_page_index > $total_pages - 2) {
          //                console.log("$current_page_index > $total_pages-2");

          // Check if another Fake Link available or not.
          if ($baf_section.find(".baf_dotted_link").length > 0) {
            $baf_section.find(".baf_dotted_link").remove();
          }

          // Add Fake Link Before The Last Page Link.
          //                    $first_page_link.after($baf_dotted_link).removeClass('baf_dn');

          // Display Number of Visible Pages.
          // Default 4.
          $page_link.slice($visible_page_size).addClass("baf_dn");
        }

        /*-- Show & Hide The Page Links --*/

        // 5 > 4

        // 6 - 4 = 2
        // 7-4=3
        //                console.log($current_page_index);

        if ($current_page_index == $visible_page_size) {
          //                    console.log("$current_page_index == $visible_page_size");
          $first_page_link.removeClass("baf_dn");
        }
        if ($current_page_index > $visible_page_size) {
          //                    console.log("$current_page_index > $visible_page_size");

          //                    console.log(" " + $current_page_index);

          // c = 5
          // v = 4
          // s = c-v = 5-4 = 1
          // e = c

          //            var tag_index = $current_page_index - $visible_page_size-1;

          var start = $current_page_index - $visible_page_size;
          var end = $current_page_index;

          //                    console.log("s" + start);
          //                    console.log("e" + end);

          $baf_section.find(".baf_page_navigation").children(".page_link").addClass("baf_dn");
          $baf_section.find(".baf_page_navigation").children(".page_link").slice(start, end).removeClass("baf_dn");
          // Display The Last Page Link.
          $first_page_link.after($baf_dotted_link).removeClass("baf_dn").removeClass("baf_dn");
          $last_page_link.removeClass("baf_dn");
        }

        //                keep_first_and_last_link_opened($baf_section);
      }
    }
    function keep_first_and_last_link_opened($baf_section) {
      var $first_link = $baf_section.find(".page_link").first(),
        $last_link = $baf_section.find(".page_link").last();
      $([]).add($first_link).add($last_link).removeClass("baf_dn");
    }
    function baf_go_to_page($baf_section, page_num) {
      var search_status = 0;
      if ($baf_section.find("input[type=text]").length && $baf_section.find("input[type=text]").val().length > 1) {
        search_status = 1;
      }
      var show_per_page = parseInt($baf_section.find("#show_per_page").val());

      //get the element number where to start the slice from
      var start_from = page_num * show_per_page;

      //get the element number where to end the slice
      var end_on = start_from + show_per_page;
      if (search_status == 1) {
        $baf_section.find("div.filter").css("display", "none").slice(start_from, end_on).css("display", "block");
      } else {
        $baf_section.find("div.bwl-faq-container").css("display", "none").slice(start_from, end_on).css("display", "block");
      }

      /*get the page link that has longdesc attribute of the current page and add active_page class to it
             and remove that class from previously active page link*/
      $baf_section.find(".page_link[longdesc=" + page_num + "]").addClass("active_page").siblings(".active_page").removeClass("active_page");

      //update the current page input field
      $baf_section.find("#current_page").val(page_num);
    }
    function highlightEvent(acc_content, search_keywords, $baf_search_field) {
      var regex = new RegExp(search_keywords, "gi");
      acc_content.highlightRegex(regex, {
        highlight_color: $baf_search_field.data("highlight_color"),
        highlight_bg: $baf_search_field.data("highlight_bg")
      });
    }
    function removeHighlightEvent($faq_container) {
      $faq_container.find("i.highlight").each(function () {
        $(this).replaceWith($(this).text());
      });
    }

    /*-- Start Accordion Code From Here--*/

    if ($("section.ac-container").length) {
      $("section.ac-container").each(function () {
        // Write all code inside of this block.

        var $baf_section = $(this);
        var $baf_item_per_page_val = $baf_section.find(".baf_page_navigation").data("pag_limit");
        var $baf_paginate_status = $baf_section.find(".baf_page_navigation").data("paginate");
        if ($baf_paginate_status == 0) {
          $baf_item_per_page_val = $baf_section.find(".bwl-faq-container").size(); // get all FAQ size
        }

        // Initially We display 5 items and hide other items.

        baf_get_pagination_html($baf_section, $baf_item_per_page_val);
        var $baf_container_id = $baf_section.attr("container_id");
        var $baf_expand_btn = $baf_section.find(".baf-expand-all"),
          $baf_collapsible_btn = $baf_section.find(".baf-collapsible-all");
        if ($baf_expand_btn.length == 1 && $baf_collapsible_btn.length == 1) {
          var label_default_state_color = $baf_section.find("label").attr("style");
          //                                 current_faq_label_container.attr("style", label_default_state_color);

          $baf_expand_btn.on("click", function () {
            $("div.bwl-faq-container-" + $baf_container_id).each(function () {
              //                                    $(this).find('article').css({
              //                                        height: 'auto', // issue in here
              //                                        visibility: 'visible',
              //                                        padding: '11px 10px 10px 10px',
              //                                    }).addClass("article-box-shadow");

              // Display Articles.
              $(this).find("article").removeAttr("style").removeClass("baf-hide-article").addClass("baf-show-article baf-article-padding");
              // Update Label Icon.
              $(this).find("label").removeAttr("class").addClass("opened-label");
              // Update Check Box Status.
              $(this).find("input[type=checkbox]").prop("checked", false); // Unchecks it
              //
              //                                    var $all_article_faq_label = $(this).find('label');
              //                                        $all_article_faq_label.css({
              //                                                                        background: checked_background
              //                                                                    });
            });
          });
          $baf_collapsible_btn.on("click", function () {
            $("div.bwl-faq-container-" + $baf_container_id).each(function () {
              // Display Articles.
              $(this).find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
              // Update Label Icon.
              $(this).find("label").removeAttr("class").addClass("closed-label");
              // Update Check Box Status.
              $(this).find("input[type=checkbox]").prop("checked", true); // Unchecks it
            });
          });
        }
      });
    }

    /*--  Search JS--*/

    if ($(".bwl-faq-search-panel")) {
      $(".bwl-faq-search-panel").each(function () {
        var $unique_faq_container_id = $(this).data("form_id"),
          $filter_search_container = $("#bwl_filter_" + $unique_faq_container_id),
          $faq_search_result_container = $("#bwl-filter-message-" + $unique_faq_container_id),
          $faq_container = $(".bwl-faq-container-" + $unique_faq_container_id),
          $baf_section = $faq_container.parent("section.ac-container"),
          $baf_ctrl_btn = $baf_section.find(".baf-ctrl-btn"),
          $baf_search_only_title_val = $(this).data("search_only_title"),
          $baf_item_per_page_val = $(this).data("pag_limit"),
          $baf_btn_clear = $(this).find(".baf-btn-clear");
        var baf_total_items;
        $faq_container.removeClass("filter");
        $filter_search_container.val("");
        var filter_timeout, remove_filter_timeout;
        $filter_search_container.on("keyup", function () {
          var $baf_search_field = $(this);
          clearTimeout(remove_filter_timeout);
          clearTimeout(filter_timeout);
          var filter = $.trim($(this).val());
          if (filter.length == 0) {
            $baf_search_field.removeClass("search_load").addClass("search_icon");
            $(this).val("");
            $faq_container.removeClass("filter");
            $baf_btn_clear.addClass("baf_dn");
          }
          if (filter.length > -1 && filter.length < 2) {
            $baf_search_field.removeClass("search_load").addClass("search_icon");
            $faq_search_result_container.html("").css("margin-bottom", "0px");
            baf_get_pagination_html($baf_section, $baf_item_per_page_val);
            $faq_container.removeClass("filter");
            $baf_btn_clear.addClass("baf_dn");
          } else {
            $baf_search_field.removeClass("search_icon").addClass("search_load");
            $baf_btn_clear.addClass("baf_dn");
          }
          remove_filter_timeout = filter.length < 2 && setTimeout(function () {
            removeHighlightEvent($faq_container);

            // Update Label Icon.
            $faq_container.find("label").removeAttr("class").addClass("closed-label");
            // Update Article Block.
            $faq_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
            // Update Check Box Status.
            $faq_container.find("input[type=checkbox]").prop("checked", true); // Unchecks it
          }, 0);
          filter_timeout = filter.length >= 2 && setTimeout(function () {
            var count = 0;
            removeHighlightEvent($faq_container);
            $faq_container.each(function () {
              var acc_heading = $(this).find("label"),
                acc_container = $(this).find("div.baf_content"),
                search_keywords = filter,
                search_string;
              if ($baf_search_only_title_val == 1) {
                search_string = acc_heading.text();
              } else {
                search_string = acc_heading.text() + acc_container.text();
              }

              /*--  Start New Code --*/

              highlightEvent(acc_heading, search_keywords, $baf_search_field);
              if ($baf_search_only_title_val == 0) {
                highlightEvent(acc_container, search_keywords, $baf_search_field);
              }

              /*--End New Code --*/

              if (search_string.search(new RegExp(filter, "gi")) < 0) {
                $(this).css("display", "none");

                // Update Label Icon.
                $(this).find("label").removeAttr("class").addClass("closed-label");
                // Update Article Block.
                $(this).find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
                // Update Check Box Status.
                $(this).find("input[type=checkbox]").prop("checked", true); // Unchecks it

                $faq_container.removeClass("filter");
              } else {
                highlightEvent(acc_heading, search_keywords, $baf_search_field);
                if ($baf_search_only_title_val == 0) {
                  highlightEvent(acc_container, search_keywords, $baf_search_field);
                }
                $(this).css("display", "block");

                // Update Label Icon.
                $(this).find("label").removeAttr("class").addClass("opened-label");
                // Update Article Block.
                $(this).find("article").removeAttr("style").removeClass("baf-hide-article").addClass("baf-show-article baf-article-padding");
                // Update Check Box Status.
                $(this).find("input[type=checkbox]").prop("checked", false); // Unchecks it
                count++;
              }
            });
            if (count == 0) {
              baf_total_items = count;
              if ($baf_ctrl_btn.length) {
                $baf_ctrl_btn.css("display", "none");
              }
              $faq_search_result_container.html($noting_found_text).css("margin-bottom", "10px");
              baf_get_pagination_html($baf_section, $baf_item_per_page_val, baf_total_items, 1);
              bafTrackSearchKeywords(filter, 0);
            } else {
              baf_total_items = count;
              var count_string = count > 1 ? count + " " + $plural_faq : count + " " + $singular_faq;
              if ($baf_ctrl_btn.length) {
                $baf_ctrl_btn.css("display", "flex");
              }
              $faq_search_result_container.html($found_text + " " + count_string).css("margin-bottom", "10px");
              baf_get_pagination_html($baf_section, $baf_item_per_page_val, baf_total_items, 1);
              bafTrackSearchKeywords(filter, baf_total_items);
            }
            $baf_btn_clear.removeClass("baf_dn");
          }, 600);
        });
        function getBafPageId() {
          var page_id = "";
          var $pageClasses = $("body").attr("class").split(/\s+/);
          $.each($pageClasses, function (index, item) {
            if (item.indexOf("page-id") >= 0) {
              page_id = item;
              return false;
            }
          });
          return page_id;
        }
        function handleBafTrackSearchKeyWords(keywords, count) {
          return $.ajax({
            url: BafFrontendData.ajaxurl,
            type: "POST",
            data: {
              action: "baf_track_search_keywords",
              // action will be the function name
              keywords,
              count,
              pageId: getBafPageId().replace("page-id-", "")
            }
          });
        }
        function bafTrackSearchKeywords(keywords, count) {
          $.when(handleBafTrackSearchKeyWords(keywords, count)).done(function (data) {
            // console.log(data)
          });
        }

        /*----- SUGGESTION BOX ----*/

        if ($baf_section.find(".baf_suggestion").length) {
          var $baf_suggestion = $baf_section.find(".baf_suggestion");
          $baf_suggestion.find("a").on("click", function () {
            $filter_search_container.val($(this).text()).trigger("keyup");
            return false;
          });
        }

        // Clear Field.

        $baf_btn_clear.on("click", function () {
          $baf_btn_clear.addClass("baf_dn");
          if ($baf_ctrl_btn.length) {
            $baf_ctrl_btn.css("display", "flex");
          }
          $filter_search_container.val("");
          $filter_search_container.removeClass("search_load").addClass("search_icon");
          $faq_search_result_container.html("").css("margin-bottom", "0px");
          baf_get_pagination_html($baf_section, $baf_item_per_page_val);
          $faq_container.removeClass("filter");
          removeHighlightEvent($faq_container);

          // Update Label Icon.
          $faq_container.find("label").removeAttr("class").addClass("closed-label");
          $faq_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
          // Update Check Box Status.
          $faq_container.find("input[type=checkbox]").prop("checked", true); // Unchecks it
        });
        $filter_search_container.keypress(function (e) {
          if (e.keyCode === 13) {
            return false;
          }
        });
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./src/modules/schema.js":
/*!*******************************!*\
  !*** ./src/modules/schema.js ***!
  \*******************************/
/***/ (() => {

;
(function () {
  let baf_container = "ac-container"; // parent container class.

  if (document.getElementsByClassName(baf_container).length > 0) {
    let logOutput = false; // Output schema to console. For Dev.

    let questionClass = "baf_schema"; // Question Class.
    let answerClass = "baf_content"; // Answer Class.

    // Build Data
    let questions = Array.from(document.getElementsByClassName(questionClass)).map(function (e) {
      return e.textContent;
    });
    let answers = Array.from(document.getElementsByClassName(answerClass)).map(function (e) {
      return e.textContent;
    });
    if (questions.length && answers.length) {
      let data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: []
      };
      buildItem = (q, a) => {
        // Ref: https://developers.google.com/search/docs/advanced/structured-data/faqpage
        let item = {
          "@type": "Question",
          name: null,
          acceptedAnswer: {
            "@type": "Answer",
            text: null
          }
        };
        item["name"] = q;
        item["acceptedAnswer"]["text"] = a;
        return item;
      };
      data["mainEntity"] = questions.map(function (q, i) {
        // Here we go for the extra checking.
        // if any
        if (q.trim().length != 0 && answers[i].trim().length != 0) {
          return buildItem(q, answers[i]);
        }
      });
      let script = document.createElement("script"); // create a brand new elements.
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(data); // convert string data in to json format.
      document.getElementsByTagName("head")[0].appendChild(script);
      if (logOutput) {
        console.assert(questions.length == answers.length, {
          questions: questions.length,
          answers: answers.length,
          errorMsg: "Questions and Answers are not the same lengths"
        });
        // console.log(script.outerHTML)
      }
    }
  }
})(document);

/***/ }),

/***/ "./src/modules/search.js":
/*!*******************************!*\
  !*** ./src/modules/search.js ***!
  \*******************************/
/***/ (() => {

if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
;
(function ($, window, document, undefind) {
  var BWLFaqFilter = {
    init: function (options, elem) {
      var self = this;
      self.elem = elem;
      self.$elem = $(elem);

      /*-- DEFAULT OPTIONS --*/

      this.options = $.extend({}, $.fn.bwlFaqFilter.options, options) // Override old sutff
      ;
      self.filter_search_container = $("#bwl_filter_" + this.options.unique_id), self.faq_search_result_container = $("#bwl-filter-message-" + this.options.unique_id), self.faq_container = $(".bwl-faq-container-" + this.options.unique_id), self.section_container = $("section#" + this.options.unique_id);
      self.baf_btn_clear = self.section_container.find(".baf-btn-clear");

      /*----- SUGGESTION BOX ----*/

      if (self.section_container.find(".baf_suggestion").length) {
        var $baf_suggestion = self.section_container.find(".baf_suggestion");
        $baf_suggestion.find("a").on("click", function () {
          self.filter_search_container.val($(this).text()).trigger("keyup");
          return false;
        });
      }

      /*-- BIND ALL CLICK EVENTS  --*/
      self.$elem.val(""); // Initlally make it's value null

      this.bindEvent();
    },
    bindEvent: function () {
      var self = this;
      var filter_timeout, remove_filter_timeout;
      self.$elem.keyup(function () {
        var $baf_search_field = $(this);
        clearTimeout(remove_filter_timeout);
        clearTimeout(filter_timeout);
        var filter = $.trim($(this).val());
        if (filter.length == 0) {
          $baf_search_field.removeClass("search_load").addClass("search_icon");
          $(this).val("");
          self.baf_btn_clear.addClass("baf_dn");
          self.faq_search(1);
        }
        if (filter.length > -1 && filter.length < 2) {
          $baf_search_field.removeClass("search_load").addClass("search_icon");
          self.baf_btn_clear.addClass("baf_dn");
        } else {
          $baf_search_field.removeClass("search_icon").addClass("search_load");
          self.baf_btn_clear.addClass("baf_dn");
        }

        // New Code.

        remove_filter_timeout = filter.length < 2 && setTimeout(function () {
          self.removeHighlightEvent();

          // Update Label Icon.
          self.section_container.find("label").removeAttr("class").addClass("closed-label");
          // Update Article Block.
          self.section_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
          // Update Check Box Status.
          self.section_container.find("input[type=checkbox]").prop("checked", true); // Unchecks it
        }, 0);

        // End New Code.

        filter_timeout = filter.length >= 2 && setTimeout(function () {
          self.baf_btn_clear.removeClass("baf_dn");
          self.faq_search(1);
        }, 600);
      });

      // Clear Field.
      self.baf_btn_clear.on("click", function () {
        self.baf_btn_clear.addClass("baf_dn");
        self.$elem.val("");
        self.$elem.removeClass("search_load").addClass("search_icon");
        self.faq_search_result_container.html("").css("margin-bottom", "0px");
        self.faq_search(1);
        self.faq_container.removeClass("filter");
        self.removeHighlightEvent();
        // Update Label Icon.
        self.section_container.find("label").removeAttr("class").addClass("closed-label");
        self.section_container.find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
        // Update Check Box Status.
        self.section_container.find("input[type=checkbox]").prop("checked", true); // Unchecks it
      });
      self.$elem.keypress(function (e) {
        if (e.keyCode === 13) {
          return false;
        }
      });
    },
    highlightEvent: function (acc_content, search_keywords) {
      var self = this;
      var regex = new RegExp(search_keywords, "gi");
      acc_content.highlightRegex(regex, {
        highlight_color: self.$elem.data("highlight_color"),
        highlight_bg: self.$elem.data("highlight_bg")
      });
    },
    removeHighlightEvent: function () {
      var self = this;
      self.section_container.find("i.highlight").each(function () {
        $(this).replaceWith($(this).text());
      });
    },
    faq_search: function (baf_search) {
      var self = this;
      var filter = jQuery.trim(self.$elem.val()).toLowerCase(),
        count = 0,
        search_string;
      self.removeHighlightEvent();
      self.section_container.find("section").each(function () {
        var each_section_counter = 0;
        var $baf_section = jQuery(this);
        var show_per_page = self.options.pag_limit,
          search_only_title = self.options.search_only_title,
          number_of_items = $baf_section.find("div.bwl-faq-container").length;

        // second iteration
        jQuery(this).find("div.bwl-faq-container").each(function (index) {
          var $bwl_faq_container = $(this);
          var acc_heading = $(this).find("label"),
            acc_container = $(this).find("div.baf_content"),
            search_keywords = filter;
          search_string = acc_heading.text() + acc_container.text();

          /*-----  START NEW CODE FOR TAXONOMOY ----*/

          if ($baf_section.prev("div.baf_taxonomy_info_container").length > 0 && self.$elem.attr("data-taxonomy_info_search") == 1) {
            var baf_taxonomy_info = $baf_section.prev("div.baf_taxonomy_info_container");
            search_string = search_string + baf_taxonomy_info.text();
            self.highlightEvent(baf_taxonomy_info, search_keywords);
          }

          /*-----  END NEW CODE FOR TAXONOMOY  - --*/

          self.highlightEvent(acc_heading, search_keywords);
          self.highlightEvent(acc_container, search_keywords);
          search_string = search_string.toLowerCase();
          if (search_string.indexOf(filter) < 0) {
            //Not found!
            jQuery(this).css("display", "none");

            // Update Label Icon.
            jQuery(this).find("label").removeAttr("class").addClass("closed-label");
            // Update Article Block.
            jQuery(this).find("article").removeAttr("style").removeClass("baf-show-article baf-article-padding").addClass("baf-hide-article article-box-shadow");
            // Update Check Box Status.
            jQuery(this).find("input[type=checkbox]").prop("checked", true); // Unchecks it

            $bwl_faq_container.removeClass("filter");
          } else {
            self.highlightEvent(acc_heading, search_keywords);
            self.highlightEvent(acc_container, search_keywords);

            //Found!
            jQuery(this).css("display", "block");

            // Update Label Icon.
            jQuery(this).find("label").removeAttr("class").addClass("opened-label");
            // Update Article Block.
            jQuery(this).find("article").removeAttr("style").removeClass("baf-hide-article").addClass("baf-show-article baf-article-padding");
            // Update Check Box Status.
            jQuery(this).find("input[type=checkbox]").prop("checked", false); // Unchecks it

            $bwl_faq_container.addClass("filter");
            //                            if( $baf_ctrl_btn.length ) {
            //                                $baf_ctrl_btn.css('display', 'block');
            //                            }
            each_section_counter++;
            count++;
          }
        }); // End second iteration.

        if (each_section_counter === 0) {
          // Hide Title.
          jQuery(this).prev("div.baf_taxonomy_info_container").css("display", "none"); //Updated in version 1.6.7
          jQuery(this).find(".baf_page_navigation").css("display", "none"); // Hide Pagination Section.
          if (jQuery(this).find(".baf-ctrl-btn").length) {
            jQuery(this).find(".baf-ctrl-btn").css("display", "none");
          }
        } else {
          // Show title.
          jQuery(this).prev("div.baf_taxonomy_info_container").css("display", "block"); //Updated in version 1.6.7
          jQuery(this).find(".baf_page_navigation").css("display", "block"); // Show Pagination Section.
          if (jQuery(this).find(".baf-ctrl-btn").length) {
            jQuery(this).find(".baf-ctrl-btn").css("display", "flex");
          }
          // Going to put pagination code in here!
          number_of_items = each_section_counter;
          self.baf_get_pagination_html($baf_section, show_per_page, number_of_items, baf_search);
        }
        self.baf_btn_clear.removeClass("baf_dn");
      });
      if (count === 0) {
        self.faq_search_result_container.html($noting_found_text).css("margin-bottom", "10px");
        self.bafTrackSearchKeywords(filter, 0);
      } else {
        if (filter === "") {
          self.faq_search_result_container.html("").css("margin-bottom", "0px");
        } else {
          var count_string = count > 1 ? count + " " + $plural_faq : count + " " + $singular_faq;
          self.faq_search_result_container.html($found_text + " " + count_string).css("margin-bottom", "10px");
          self.bafTrackSearchKeywords(filter, count);
        }
      }
      self.section_container.find("input[type=text]").removeClass("search_load").addClass("search_icon");
    },
    getBafPageId: function () {
      var page_id = "";
      var $pageClasses = $("body").attr("class").split(/\s+/);
      $.each($pageClasses, function (index, item) {
        if (item.indexOf("page-id") >= 0) {
          page_id = item;
          return false;
        }
      });
      return page_id;
    },
    handleBafTrackSearchKeyWords: function (keywords, count) {
      return $.ajax({
        url: BafFrontendData.ajaxurl,
        type: "POST",
        data: {
          action: "baf_track_search_keywords",
          // action will be the function name
          keywords,
          count,
          pageId: this.getBafPageId().replace("page-id-", "")
        }
      });
    },
    bafTrackSearchKeywords: function (keywords, count) {
      // console.log(keywords)
      // console.log(count)

      $.when(this.handleBafTrackSearchKeyWords(keywords, count)).done(function (data) {
        // console.log(data)
      });
    },
    baf_get_pagination_html: function ($baf_section, show_per_page, number_of_items, baf_search) {
      var self = this;
      var baf_display_limit = 10;

      // show_per_page == start_on
      // number_of_items = end_on
      var $baf_paginate_status = $baf_section.find(".baf_page_navigation").data("paginate");
      if (typeof baf_search != "undefined" && baf_search == 1) {
        if ($baf_paginate_status == 1) {
          var $searched_faq_items = $baf_section.find("div.bwl-faq-container:visible");
          $searched_faq_items.addClass("filter");
          var total_faq_items = $searched_faq_items.size();
          var number_of_items = number_of_items;
          var $items_need_to_show = $searched_faq_items.slice(0, show_per_page);
          var $items_need_to_hide = $searched_faq_items.slice(show_per_page, total_faq_items);
          $items_need_to_hide.css("display", "none");
        }
        $baf_section.find("input[type=text]").removeClass("search_load").addClass("search_icon");
      } else {
        //getting the amount of elements inside content div

        $baf_section.find("div.bwl-faq-container").css("display", "none");

        //and show the first n (show_per_page) elements
        $baf_section.find("div.bwl-faq-container").slice(0, show_per_page).css("display", "block");
        var number_of_items = $baf_section.find("div.bwl-faq-container").size();
      }

      //calculate the number of pages we are going to have
      var number_of_pages = Math.ceil(number_of_items / show_per_page);

      //set the value of our hidden input fields
      $baf_section.find("#current_page").val(0);
      $baf_section.find("#show_per_page").val(show_per_page);
      //now when we got all we need for the navigation let's make it '
      /*
             what are we going to have in the navigation?
             - link to previous page
             - links to specific pages
             - link to next page
             */
      var navigation_html = '<a class="previous_link" href="#">&laquo;</a>';
      var current_link = 0;
      var page_array = [];
      var display_none_class = "";
      var baf_pages_string = string_singular_page;
      while (number_of_pages > current_link) {
        page_array[current_link] = current_link;
        if (number_of_pages > baf_display_limit && current_link >= baf_display_limit) {
          display_none_class = " baf_dn";
        }
        navigation_html += '<a class="page_link' + display_none_class + '" href="#" longdesc="' + current_link + '">' + (current_link + 1) + "</a>";
        current_link++;
      }
      if (number_of_pages > 1) {
        baf_pages_string = string_plural_page;
      }
      navigation_html += '<a class="next_link" href="#">&raquo;</a><br /><span class="total_pages">' + BafFrontendData.string_total + " " + number_of_pages + " " + baf_pages_string + "</span>";
      $baf_section.find("#baf_page_navigation").html("").html(navigation_html);
      if ($baf_paginate_status == 0) {
        $baf_section.find("#baf_page_navigation").remove();
      }
      if (page_array.length == 0) {
        $baf_section.find("#baf_page_navigation").css("display", "none");
      } else {
        $baf_section.find("#baf_page_navigation").css("display", "block");
      }

      //add active_page class to the first page link
      $baf_section.find("#baf_page_navigation .page_link:first").addClass("active_page");
      $baf_section.find(".next_link").on("click", function () {
        var new_page = parseInt($baf_section.find("#current_page").val()) + 1;

        //if there is an item after the current active link run the function

        var $active_page = $baf_section.find(".active_page").next(".page_link");
        if ($active_page.length == true) {
          if ($active_page.hasClass("baf_dn")) {
            $active_page.removeClass("baf_dn");
            var total_link_need_to_hide = parseInt($baf_section.find("a.page_link:visible").length) - baf_display_limit;
            $baf_section.find("a.page_link:visible").slice(0, total_link_need_to_hide).addClass("baf_dn");
          }
          self.baf_go_to_page($baf_section, new_page);
        }
        return false;
      });
      $baf_section.find(".previous_link").on("click", function () {
        var new_page = parseInt($baf_section.find("#current_page").val()) - 1;
        //if there is an item before the current active link run the function

        var $active_page = $baf_section.find(".active_page").prev(".page_link");
        var number_of_items = $baf_section.find("div.bwl-faq-container").size();
        var start = parseInt($baf_section.find("a.page_link:visible:first").attr("longdesc")) - 1;
        var end = $baf_section.find("a.page_link:visible:last").attr("longdesc");
        if ($active_page.length == true) {
          if (start > -1 && end < number_of_items) {
            $baf_section.find("a.page_link").addClass("baf_dn");
            $baf_section.find("a.page_link").slice(start, end).removeClass("baf_dn");
          }
          self.baf_go_to_page($baf_section, new_page);
        }
        return false;
      });
      $baf_section.find(".page_link").on("click", function () {
        var current_link = $(this).attr("longdesc");
        self.baf_go_to_page($baf_section, current_link);
        return false;
      });
    },
    baf_go_to_page: function ($baf_section, page_num) {
      var search_status = 0;
      var $baf_section_wrapper = $("section#" + $baf_section.parents("section").attr("id"));
      if ($baf_section_wrapper.find("input[type=text]").length && $baf_section_wrapper.find("input[type=text]").val().length > 1) {
        search_status = 1;
      }
      var show_per_page = parseInt($baf_section.find("#show_per_page").val());

      //get the element number where to start the slice from
      var start_from = page_num * show_per_page;

      //get the element number where to end the slice
      var end_on = start_from + show_per_page;
      if (search_status == 1) {
        $baf_section.find("div.filter").css("display", "none").slice(start_from, end_on).css("display", "block");
      } else {
        $baf_section.find("div.bwl-faq-container").css("display", "none").slice(start_from, end_on).css("display", "block");
      }

      /*get the page link that has longdesc attribute of the current page and add active_page class to it
             and remove that class from previously active page link*/
      $baf_section.find(".page_link[longdesc=" + page_num + "]").addClass("active_page").siblings(".active_page").removeClass("active_page");

      //update the current page input field
      $baf_section.find("#current_page").val(page_num);
    }
  };

  // Initialization Of Plugin

  $.fn.bwlFaqFilter = function (options) {
    return this.each(function () {
      var faq_filter = Object.create(BWLFaqFilter);
      faq_filter.init(options, this);
    });
  };

  // Default Options Setion.

  $.fn.bwlFaqFilter.options = {
    unique_id: "",
    paginate: 1,
    pag_limit: 5,
    search_only_title: 0
  };
})(jQuery, window, document);

/***/ }),

/***/ "./src/modules/search_highlights.js":
/*!******************************************!*\
  !*** ./src/modules/search_highlights.js ***!
  \******************************************/
/***/ (() => {

(function (d) {
  var g = function (c) {
    if (c && c.childNodes) {
      var a = d.makeArray(c.childNodes),
        e = null;
      d.each(a, function (a, b) {
        3 === b.nodeType ? "" === b.nodeValue ? c.removeChild(b) : null !== e ? (e.nodeValue += b.nodeValue, c.removeChild(b)) : e = b : (e = null, b.childNodes && g(b));
      });
    }
  };
  d.fn.highlightRegex = function (c, a) {
    "object" !== typeof c || "RegExp" == c.constructor.name || c instanceof RegExp || (a = c, c = void 0);
    "undefined" === typeof a && (a = {});
    a.className = a.className || "highlight";
    a.tagType = a.tagType || "i";
    a.highlight_color = a.highlight_color || "";
    a.highlight_bg = a.highlight_bg || "";
    a.attrs = a.attrs || {};
    "undefined" === typeof c || "" === c.source ? d(this).find(a.tagType + "." + a.className).each(function () {
      d(this).replaceWith(d(this).text());
      g(d(this).parent().get(0));
    }) : d(this).each(function () {
      var e = d(this).get(0);
      g(e);
      d.each(d.makeArray(e.childNodes), function (e, b) {
        var k;
        g(b);
        if (3 == b.nodeType) {
          if (!d(b).parent(a.tagType + "." + a.className).length) for (; b.data && 0 <= (k = b.data.search(c));) {
            var h = b.data.slice(k).match(c)[0];
            if (0 < h.length) {
              var f = document.createElement(a.tagType);
              f.className = a.className;
              f.style.backgroundColor = a.highlight_bg;
              f.style.color = a.highlight_color;
              d(f).attr(a.attrs);
              var m = b.parentNode;
              var l = b.splitText(k);
              b = l.splitText(h.length);
              h = l.cloneNode(!0);
              f.appendChild(h);
              m.replaceChild(f, l);
            } else break;
          }
        } else d(b).highlightRegex(c, a);
      });
    });
    return d(this);
  };
})(jQuery);

/***/ }),

/***/ "./src/styles/frontend.scss":
/*!**********************************!*\
  !*** ./src/styles/frontend.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/frontend.scss */ "./src/styles/frontend.scss");
/* harmony import */ var _modules_search_highlights__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/search_highlights */ "./src/modules/search_highlights.js");
/* harmony import */ var _modules_search_highlights__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_search_highlights__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/accordion */ "./src/modules/accordion.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/pagination */ "./src/modules/pagination.js");
/* harmony import */ var _modules_pagination__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_pagination__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/search */ "./src/modules/search.js");
/* harmony import */ var _modules_search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_search__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/schema */ "./src/modules/schema.js");
/* harmony import */ var _modules_schema__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_schema__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_faq_tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/faq_tab */ "./src/modules/faq_tab.js");
/* harmony import */ var _modules_faq_tab__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_faq_tab__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_faq_likes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/faq_likes */ "./src/modules/faq_likes.js");
/* harmony import */ var _modules_faq_likes__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_modules_faq_likes__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _modules_faq_custom_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/faq_custom_style */ "./src/modules/faq_custom_style.js");
/* harmony import */ var _modules_faq_custom_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_modules_faq_custom_style__WEBPACK_IMPORTED_MODULE_8__);
// Stylesheets


// Javascripts








})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map