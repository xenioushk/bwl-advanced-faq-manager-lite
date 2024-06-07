;(function ($) {
  function baf_installation_counter() {
    return $.ajax({
      type: "POST",
      url: BafAdminData.ajaxurl,
      data: {
        action: "baf_installation_counter", // this is the name of our WP AJAX function that we'll set up next
      },
      dataType: "JSON",
    })
  }

  if (typeof BafAdminData.installation != "undefined" && BafAdminData.installation != 1) {
    $.when(baf_installation_counter()).done(function (response_data) {
      // console.log(response_data)
    })
  }
})(jQuery)
