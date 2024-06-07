;(function ($) {
  $(function () {
    // Custom FAQ Category Tab.

    function switch_tabs(obj) {
      obj.parent().parent().find(".bwl-faq-tab-content").slideUp("fast")

      obj.parent().find("li").removeClass("active")

      var id = obj.find("a", 0).attr("rel")

      $("#" + id).slideDown("slow")

      obj.addClass("active")
    }

    if ($(".bwl-faq-tabs").length) {
      $(".bwl-faq-tabs li").on("click", function () {
        if ($(this).find(".bwl-faq-link").attr("class") != "bwl-faq-link") {
          switch_tabs($(this))
        }
      })
    }
  })
})(jQuery)
