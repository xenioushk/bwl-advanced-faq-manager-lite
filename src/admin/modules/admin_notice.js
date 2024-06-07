;(function ($) {
  // Cookie Things

  let $noticeTTL = 30 // for 30 days.

  function bafSetCookie(name, value, days) {
    var expires = ""
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + value + expires + "; path=/"
  }

  function bafGetCookie(name) {
    var nameEQ = name + "="
    var cookies = document.cookie.split(";")
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length)
      }
    }
    return null
  }

  function bafRemoveCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }

  // bafRemoveCookie("baf_license_status")

  if ($(".baf_remove_notice").length > 0) {
    $(".baf_remove_notice").each(function () {
      let $this = $(this)
      let $noticeStatusKey = $this.data("key")
      let $bafLicenseStatus = bafGetCookie($noticeStatusKey)

      if ($bafLicenseStatus == null) {
        $this.closest(".notice").fadeIn()
      }

      // Click Event.

      $this.on("click", function () {
        $(this)
          .closest(".notice")
          .slideUp("slow", function () {
            bafSetCookie($noticeStatusKey, 1, $noticeTTL)
            setTimeout(() => {
              $(this).remove()
            }, 3000)
          })
      })
    })
  }
})(jQuery)
