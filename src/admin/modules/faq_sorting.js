;(function ($) {
  $(function () {
    /*--  FAQ SORTING JS  --*/

    if ($("#baf_faq_sorting_container")) {
      var $btnBafSaveSorting = $("#baf_save_sorting")
      var $btnBafSaveSortingText = $btnBafSaveSorting.val()

      $btnBafSaveSorting.attr("data-term_id", 0)

      // Save Sorting Data.

      function baf_save_sort_data(baf_sort_filter_type, baf_sort_data) {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "bwl_advanced_faq_apply_sort", // this is the name of our WP AJAX function that we'll set up next
            baf_sort_filter_type: baf_sort_filter_type,
            baf_sort_data: baf_sort_data,
            baf_term_id: $btnBafSaveSorting.attr("data-term_id"),
          },
          dataType: "JSON",
        })
      }

      // Get Sort Data.

      function baf_get_sorting_data(baf_category_slug, baf_term_id) {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "baf_get_sorting_data", // this is the name of our WP AJAX function that we'll set up next
            baf_category_slug: baf_category_slug,
            baf_term_id: baf_term_id,
            baf_sort_filter: $btnBafSaveSorting.data("sort_filter"),
          },
          dataType: "JSON",
        })
      }

      /*---- Initializing ----*/

      var $baf_msg_container = $("#baf_faq_sorting_container").find("#sort-status")
      var $baf_sort_subtitle = $baf_msg_container.data("sort_subtitle")
      var $bwl_faq_items = $("#baf_faq_sorting_container").find("#bwl_faq_items")

      if ($bwl_faq_items.find("li").length) {
        $bwl_faq_items.sortable({})
      }

      // Category Wise Sorting.

      if ($("#baf_sort_faq_taxonomy").length) {
        $btnBafSaveSorting.attr("disabled", "disabled")

        var $baf_sort_faq_taxonomy = $("#baf_sort_faq_taxonomy")
        $baf_sort_faq_taxonomy.val("")

        $baf_sort_faq_taxonomy.on("change", function () {
          $btnBafSaveSorting.attr("disabled", "disabled")

          if ($baf_sort_faq_taxonomy.val() == "") {
            $btnBafSaveSorting.removeAttr("data-term_id")
            $bwl_faq_items.html("")
            return ""
          }

          $baf_msg_container.html(BafAdminData.baf_text_loading)

          var baf_category_slug = $(this).val(),
            baf_term_id = $("#baf_sort_faq_taxonomy option:selected").attr("data-term_id")

          $.when(baf_get_sorting_data(baf_category_slug, baf_term_id)).done(function (response_data) {
            if (response_data.status == 1) {
              $baf_msg_container.html($baf_sort_subtitle)
              $btnBafSaveSorting.attr("data-term_id", baf_term_id)

              var output = ""

              $.each(response_data.data, function (index, data) {
                output += '<li id="' + data["post_id"] + '" class="menu-item">' + '<dl class="menu-item-bar">' + '<dt class="menu-item-handle">' + '<span class="menu-item-title">' + data["post_title"] + "</span>" + "</dt>" + "</dl>" + '<ul class="menu-item-transport"></ul>' + "</li>"
              })

              $bwl_faq_items.html(output)

              setTimeout(function () {
                if ($bwl_faq_items.find("li").length) {
                  $bwl_faq_items.sortable({})

                  $btnBafSaveSorting.removeAttr("disabled")
                }
              }, 500)
            } else {
              $baf_msg_container.html($baf_sort_subtitle)
              $btnBafSaveSorting.attr("disabled", "disabled")
            }
          })
        })
      } else {
        $btnBafSaveSorting.removeAttr("disabled")
      }

      /*---- Sorting Data Save Event ----*/

      $btnBafSaveSorting.on("click", function () {
        $btnBafSaveSorting.val(BafAdminData.baf_text_saving).attr("disabled", "disabled")

        $.when(baf_save_sort_data($(this).data("sort_filter"), $bwl_faq_items.sortable("toArray").toString())).done(function (response_data) {
          if (response_data.status == 1) {
            $btnBafSaveSorting.val(BafAdminData.baf_text_saved)

            setTimeout(function () {
              $btnBafSaveSorting.val($btnBafSaveSortingText).removeAttr("disabled")
            }, 2000)
          }
        })
      })
    }
  })
})(jQuery)
