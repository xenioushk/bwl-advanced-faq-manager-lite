;(function ($) {
  if ($("#baf-product-license").length) {
    let $loader = $("#baf-product-license").find("#loader")

    function verifyMsg(msg, status) {
      let status_class = typeof status !== undefined && status == 0 ? "verify_error" : "verify_success"
      return "<p class='" + status_class + "'>" + msg + "</p>"
    }

    $loader.html("")

    if ($("#baf_verify_purchase").length) {
      let $baf_verify_purchase = $("#baf_verify_purchase"),
        $purchase_code = $baf_verify_purchase.find("#purchase_code"),
        $btn_verify = $baf_verify_purchase.find("#verify"),
        $baf_form_group = $([]).add($purchase_code).add($btn_verify)

      // Initialize.
      $purchase_code.val("")

      function baf_verify_purchase_data() {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "bafVerifyPurchaseData", // this is the name of our WP AJAX function that we'll set up next
            purchase_code: $purchase_code.val(),
          },
          dataType: "JSON",
        })
      }

      $baf_verify_purchase.on("submit", function (e) {
        e.preventDefault()
        if ($purchase_code.val().trim() == "") {
          alert(BafAdminData.baf_pvc_required_msg)
          $purchase_code.val("")
          return false
        }
        $baf_form_group.attr("disabled", "disabled")
        $loader.html("").html(BafAdminData.baf_text_loading)

        $.when(baf_verify_purchase_data()).done(function (response_data) {
          // console.log(response_data)
          if (response_data.status == 1) {
            // console.log(response_data)
            // $purchase_code.remove()
            $loader.html(verifyMsg(BafAdminData.baf_pvc_success_msg, response_data.status))
            setTimeout(() => {
              location.reload()
            }, 3000)
          } else {
            $loader.html(verifyMsg(BafAdminData.baf_pvc_failed_msg, 0))
            $purchase_code.val("")
            $baf_form_group.removeAttr("disabled")
          }
        })
      })
    }

    // Delete License.

    function baf_remove_license_data(verify_hash) {
      return $.ajax({
        type: "POST",
        url: BafAdminData.ajaxurl,
        data: {
          action: "bafRemoveLicenseData",
          verify_hash: verify_hash,
        },
        dataType: "JSON",
      })
    }

    $("#baf_remove_license").on("click", function () {
      let $this = $(this)

      let remove_license = confirm(BafAdminData.baf_pvc_remove_msg)

      if (remove_license == true) {
        $loader.html(BafAdminData.baf_text_loading)

        $this.attr("disabled", "disabled")

        $.when(baf_remove_license_data($this.data("verify_hash"))).done((response_data) => {
          // console.log(response_data.status)
          if (response_data.status == 1) {
            $loader.html(verifyMsg(BafAdminData.baf_pvc_removed_msg, response_data.status))
            setTimeout(() => {
              location.reload()
            }, 3000)
          } else {
            $this.removeAttr("disabled")
          }
        })
      }
    })
  }
})(jQuery)
