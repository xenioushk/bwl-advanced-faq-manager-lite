;(function ($) {
  $(function () {
    /*--  Bulk Edit --*/

    if ($("#bulk_edit").length) {
      var wp_inline_edit = inlineEditPost.edit
      inlineEditPost.edit = function (id) {
        wp_inline_edit.apply(this, arguments)

        // now we take care of our business

        // get the post ID

        var post_id = 0

        if (typeof id == "object") post_id = parseInt(this.getId(id))

        if (post_id > 0) {
          // define the edit row
          var edit_row = $("#edit-" + post_id)

          // get the breaking new status.

          var baf_reset_likes_status = $("#baf_reset_likes_status-" + post_id).data("status_code")

          // populate the release date

          edit_row.find('select[name="baf_reset_likes_status"]').val(baf_reset_likes_status == "" ? "0" : baf_reset_likes_status)

          // get the FAQ Author Name

          var bwl_advanced_faq_author = $("#bwl_advanced_faq_author-" + post_id).data("status_code")

          // set the FAQ Author Name

          edit_row.find('select[name="bwl_advanced_faq_author"]').val(bwl_advanced_faq_author == "" ? "" : bwl_advanced_faq_author)
        }
      }

      /*---- Bulk Edit Settings ---------*/

      $("#bulk_edit").on("click", function () {
        var $bulk_row = $("#bulk-edit"),
          $post_ids = new Array()

        $bulk_row.find("#bulk-titles-list .button-link.ntdelbutton").each(function () {
          $post_ids.push($(this).attr("id").replace(/_/g, ""))
        })

        // get the $baf_reset_likes_status

        var $baf_reset_likes_status = $bulk_row.find('select[name="baf_reset_likes_status"]').val(),
          $bwl_advanced_faq_author = $bulk_row.find('select[name="bwl_advanced_faq_author"]').val()

        // save the data
        $.ajax({
          url: BafAdminData.ajaxurl, // this is a variable that WordPress has already defined for us
          type: "POST",
          async: false,
          cache: false,
          data: {
            action: "baf_bulk_quick_save_bulk_edit", // this is the name of our WP AJAX function that we'll set up next
            post_ids: $post_ids, // and these are the 2 parameters we're passing to our function
            baf_reset_likes_status: $baf_reset_likes_status,
            bwl_advanced_faq_author: $bwl_advanced_faq_author,
          },
        })
      })
    }

    /*------ Allow Only Number -----*/

    $(".baf_numeric_field").each(function () {
      var $this = $(this)

      $this.on("keypress", function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which == 13) {
          return true
        } else if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          return false
        } else {
          return true
        }
      })
    })

    /*--  Color Picker For Option Panel --*/

    var $baf_enable_custom_theme = $("#baf_enable_custom_theme"),
      $gradient_first_color = $("input#gradient_first_color"),
      $gradient_second_color = $("input#gradient_second_color"),
      $label_text_color = $("input#label_text_color"),
      $baf_like_icon_color = $("input#baf_like_icon_color"),
      $baf_like_icon_hover_color = $("input#baf_like_icon_hover_color")

    $gradient_first_color.wpColorPicker()
    $gradient_second_color.wpColorPicker()
    $label_text_color.wpColorPicker()
    $baf_like_icon_color.wpColorPicker()
    $baf_like_icon_hover_color.wpColorPicker()

    var $baf_custom_theme_container = $baf_enable_custom_theme.parents("table")

    $baf_custom_theme_container.find("tr").hide()

    $baf_custom_theme_container.find("tr:eq( 0 ), tr:eq( 1 )").show()

    $baf_enable_custom_theme.on("click", function () {
      $baf_custom_theme_container.find("tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )").toggle("slow")
    })

    if ($baf_enable_custom_theme.is(":checked")) {
      $baf_custom_theme_container.find("tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )").show()
    }

    /*-- Enable Custom Theme --*/

    if ($(".baf_email_tpl").length) {
      $(".baf_email_tpl").each(function () {
        var $this = $(this)

        var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {}
        editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
          indentUnit: 2,
          tabSize: 2,
          mode: "text/html",
        })
        wp.codeEditor.initialize($this, editorSettings)
      })
    }

    /*-- Code Editor --*/

    if ($("#bwl_advanced_faq_custom_css").length) {
      var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {}
      editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
        indentUnit: 2,
        tabSize: 2,
        mode: "css",
      })
      wp.codeEditor.initialize($("#bwl_advanced_faq_custom_css"), editorSettings)
    }

    if ($("#link-options").length) {
      $("#link-options").append(
        $("<div></div>")
          .addClass("baf-pop")
          .html($("<label></label>").html([$("<span></span>"), $(" <input></input>").attr({ type: "checkbox", id: "wp-baf-pop" }), "Enable FAQ Pop Up"]))
      )

      if (wpLink && typeof wpLink.getAttrs == "function") {
        wpLink.getAttrs = function () {
          wpLink.correctURL()
          return {
            href: $.trim($("#wp-link-url").val()),
            target: $("#wp-link-target").prop("checked") ? "_blank" : null,
            class: $("#wp-baf-pop").prop("checked") ? "baf_pop" : null,
          }
        }
      }
    }
  })
})(jQuery)
