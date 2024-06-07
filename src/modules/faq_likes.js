;(function ($) {
  $(function () {
    /*--  Likes --*/

    $(document).on("click", ".post-like-container a", function () {
      var $icon_container = jQuery(this)

      var $thumb_icon_class = $icon_container.find("i")
      var $info_icon = $icon_container.data("info_icon")
      var $loading_msg = $icon_container.data("loading_msg")

      if ($thumb_icon_class.attr("class") === $info_icon) {
        return false
      }

      $thumb_icon_class.attr("class", $info_icon)

      $icon_container.siblings(".count").text($loading_msg)

      // Retrieve post ID from data attribute
      var $post_id = $icon_container.data("post_id")

      $.ajax({
        url: BafFrontendData.ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: {
          action: "bwl_advanced_faq_apply_rating", // action will be the function name
          post_like: true,
          post_id: $post_id,
        },
        success: function (data) {
          // If vote successful
          if (data.status == 0) {
            $icon_container.addClass("voted")
            $icon_container.siblings(".count").text("").append(data.msg)
          }
          if (data.status == 1) {
            $icon_container.addClass("voted")
            $icon_container.siblings(".count").text("").append(data.msg)
          }
        },
        error: function (xhr, textStatus, e) {
          console.log("There was an error saving the update.")
          return
        },
      })

      return false
    })
  })
})(jQuery)
