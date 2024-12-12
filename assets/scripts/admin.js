/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/modules/admin_custom.js":
/*!*******************************************!*\
  !*** ./src/admin/modules/admin_custom.js ***!
  \*******************************************/
/***/ (() => {

;
(function ($) {
  $(function () {
    /*--  Bulk Edit --*/

    if ($("#bulk_edit").length) {
      var wp_inline_edit = inlineEditPost.edit;
      inlineEditPost.edit = function (id) {
        wp_inline_edit.apply(this, arguments);

        // now we take care of our business

        // get the post ID

        var post_id = 0;
        if (typeof id == "object") post_id = parseInt(this.getId(id));
        if (post_id > 0) {
          // define the edit row
          var edit_row = $("#edit-" + post_id);

          // get the breaking new status.

          var baf_reset_likes_status = $("#baf_reset_likes_status-" + post_id).data("status_code");

          // populate the release date

          edit_row.find('select[name="baf_reset_likes_status"]').val(baf_reset_likes_status == "" ? "0" : baf_reset_likes_status);

          // get the FAQ Author Name

          var bwl_advanced_faq_author = $("#bwl_advanced_faq_author-" + post_id).data("status_code");

          // set the FAQ Author Name

          edit_row.find('select[name="bwl_advanced_faq_author"]').val(bwl_advanced_faq_author == "" ? "" : bwl_advanced_faq_author);
        }
      };

      /*---- Bulk Edit Settings ---------*/

      $("#bulk_edit").on("click", function () {
        var $bulk_row = $("#bulk-edit"),
          $post_ids = new Array();
        $bulk_row.find("#bulk-titles-list .button-link.ntdelbutton").each(function () {
          $post_ids.push($(this).attr("id").replace(/_/g, ""));
        });

        // get the $baf_reset_likes_status

        var $baf_reset_likes_status = $bulk_row.find('select[name="baf_reset_likes_status"]').val(),
          $bwl_advanced_faq_author = $bulk_row.find('select[name="bwl_advanced_faq_author"]').val();

        // save the data
        $.ajax({
          url: BafAdminData.ajaxurl,
          // this is a variable that WordPress has already defined for us
          type: "POST",
          async: false,
          cache: false,
          data: {
            action: "baf_bulk_quick_save_bulk_edit",
            // this is the name of our WP AJAX function that we'll set up next
            post_ids: $post_ids,
            // and these are the 2 parameters we're passing to our function
            baf_reset_likes_status: $baf_reset_likes_status,
            bwl_advanced_faq_author: $bwl_advanced_faq_author
          }
        });
      });
    }

    /*------ Allow Only Number -----*/

    $(".baf_numeric_field").each(function () {
      var $this = $(this);
      $this.on("keypress", function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which == 13) {
          return true;
        } else if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          return false;
        } else {
          return true;
        }
      });
    });

    /*--  Color Picker For Option Panel --*/

    var $baf_enable_custom_theme = $("#baf_enable_custom_theme"),
      $gradient_first_color = $("input#gradient_first_color"),
      $gradient_second_color = $("input#gradient_second_color"),
      $label_text_color = $("input#label_text_color"),
      $baf_like_icon_color = $("input#baf_like_icon_color"),
      $baf_like_icon_hover_color = $("input#baf_like_icon_hover_color");
    $gradient_first_color.wpColorPicker();
    $gradient_second_color.wpColorPicker();
    $label_text_color.wpColorPicker();
    $baf_like_icon_color.wpColorPicker();
    $baf_like_icon_hover_color.wpColorPicker();
    var $baf_custom_theme_container = $baf_enable_custom_theme.parents("table");
    $baf_custom_theme_container.find("tr").hide();
    $baf_custom_theme_container.find("tr:eq( 0 ), tr:eq( 1 )").show();
    $baf_enable_custom_theme.on("click", function () {
      $baf_custom_theme_container.find("tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )").toggle("slow");
    });
    if ($baf_enable_custom_theme.is(":checked")) {
      $baf_custom_theme_container.find("tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )").show();
    }

    /*-- Enable Custom Theme --*/

    if ($(".baf_email_tpl").length) {
      $(".baf_email_tpl").each(function () {
        var $this = $(this);
        var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {};
        editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
          indentUnit: 2,
          tabSize: 2,
          mode: "text/html"
        });
        wp.codeEditor.initialize($this, editorSettings);
      });
    }

    /*-- Code Editor --*/

    if ($("#bwl_advanced_faq_custom_css").length) {
      var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {};
      editorSettings.codemirror = _.extend({}, editorSettings.codemirror, {
        indentUnit: 2,
        tabSize: 2,
        mode: "css"
      });
      wp.codeEditor.initialize($("#bwl_advanced_faq_custom_css"), editorSettings);
    }
    if ($("#link-options").length) {
      $("#link-options").append($("<div></div>").addClass("baf-pop").html($("<label></label>").html([$("<span></span>"), $(" <input></input>").attr({
        type: "checkbox",
        id: "wp-baf-pop"
      }), "Enable FAQ Pop Up"])));
      if (wpLink && typeof wpLink.getAttrs == "function") {
        wpLink.getAttrs = function () {
          wpLink.correctURL();
          return {
            href: $.trim($("#wp-link-url").val()),
            target: $("#wp-link-target").prop("checked") ? "_blank" : null,
            class: $("#wp-baf-pop").prop("checked") ? "baf_pop" : null
          };
        };
      }
    }
  });
})(jQuery);

/***/ }),

/***/ "./src/admin/modules/admin_notice.js":
/*!*******************************************!*\
  !*** ./src/admin/modules/admin_notice.js ***!
  \*******************************************/
/***/ (() => {

;
(function ($) {
  // Cookie Things

  let $noticeTTL = 30; // for 30 days.

  function bafSetCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  function bafGetCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }
  function bafRemoveCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // bafRemoveCookie("baf_license_status")

  if ($(".baf_remove_notice").length > 0) {
    $(".baf_remove_notice").each(function () {
      let $this = $(this);
      let $noticeStatusKey = $this.data("key");
      let $bafLicenseStatus = bafGetCookie($noticeStatusKey);
      if ($bafLicenseStatus == null) {
        $this.closest(".notice").fadeIn();
      }

      // Click Event.

      $this.on("click", function () {
        $(this).closest(".notice").slideUp("slow", function () {
          bafSetCookie($noticeStatusKey, 1, $noticeTTL);
          setTimeout(() => {
            $(this).remove();
          }, 3000);
        });
      });
    });
  }
})(jQuery);

/***/ }),

/***/ "./src/admin/modules/faq_sorting.js":
/*!******************************************!*\
  !*** ./src/admin/modules/faq_sorting.js ***!
  \******************************************/
/***/ (() => {

;
(function ($) {
  $(function () {
    /*--  FAQ SORTING JS  --*/

    if ($("#baf_faq_sorting_container")) {
      var $btnBafSaveSorting = $("#baf_save_sorting");
      var $btnBafSaveSortingText = $btnBafSaveSorting.val();
      $btnBafSaveSorting.attr("data-term_id", 0);

      // Save Sorting Data.

      function baf_save_sort_data(baf_sort_filter_type, baf_sort_data) {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "bwl_advanced_faq_apply_sort",
            // this is the name of our WP AJAX function that we'll set up next
            baf_sort_filter_type: baf_sort_filter_type,
            baf_sort_data: baf_sort_data,
            baf_term_id: $btnBafSaveSorting.attr("data-term_id")
          },
          dataType: "JSON"
        });
      }

      // Get Sort Data.

      function baf_get_sorting_data(baf_category_slug, baf_term_id) {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "baf_get_sorting_data",
            // this is the name of our WP AJAX function that we'll set up next
            baf_category_slug: baf_category_slug,
            baf_term_id: baf_term_id,
            baf_sort_filter: $btnBafSaveSorting.data("sort_filter")
          },
          dataType: "JSON"
        });
      }

      /*---- Initializing ----*/

      var $baf_msg_container = $("#baf_faq_sorting_container").find("#sort-status");
      var $baf_sort_subtitle = $baf_msg_container.data("sort_subtitle");
      var $bwl_faq_items = $("#baf_faq_sorting_container").find("#bwl_faq_items");
      if ($bwl_faq_items.find("li").length) {
        $bwl_faq_items.sortable({});
      }

      // Category Wise Sorting.

      if ($("#baf_sort_faq_taxonomy").length) {
        $btnBafSaveSorting.attr("disabled", "disabled");
        var $baf_sort_faq_taxonomy = $("#baf_sort_faq_taxonomy");
        $baf_sort_faq_taxonomy.val("");
        $baf_sort_faq_taxonomy.on("change", function () {
          $btnBafSaveSorting.attr("disabled", "disabled");
          if ($baf_sort_faq_taxonomy.val() == "") {
            $btnBafSaveSorting.removeAttr("data-term_id");
            $bwl_faq_items.html("");
            return "";
          }
          $baf_msg_container.html(BafAdminData.baf_text_loading);
          var baf_category_slug = $(this).val(),
            baf_term_id = $("#baf_sort_faq_taxonomy option:selected").attr("data-term_id");
          $.when(baf_get_sorting_data(baf_category_slug, baf_term_id)).done(function (response_data) {
            if (response_data.status == 1) {
              $baf_msg_container.html($baf_sort_subtitle);
              $btnBafSaveSorting.attr("data-term_id", baf_term_id);
              var output = "";
              $.each(response_data.data, function (index, data) {
                output += '<li id="' + data["post_id"] + '" class="menu-item">' + '<dl class="menu-item-bar">' + '<dt class="menu-item-handle">' + '<span class="menu-item-title">' + data["post_title"] + "</span>" + "</dt>" + "</dl>" + '<ul class="menu-item-transport"></ul>' + "</li>";
              });
              $bwl_faq_items.html(output);
              setTimeout(function () {
                if ($bwl_faq_items.find("li").length) {
                  $bwl_faq_items.sortable({});
                  $btnBafSaveSorting.removeAttr("disabled");
                }
              }, 500);
            } else {
              $baf_msg_container.html($baf_sort_subtitle);
              $btnBafSaveSorting.attr("disabled", "disabled");
            }
          });
        });
      } else {
        $btnBafSaveSorting.removeAttr("disabled");
      }

      /*---- Sorting Data Save Event ----*/

      $btnBafSaveSorting.on("click", function () {
        $btnBafSaveSorting.val(BafAdminData.baf_text_saving).attr("disabled", "disabled");
        $.when(baf_save_sort_data($(this).data("sort_filter"), $bwl_faq_items.sortable("toArray").toString())).done(function (response_data) {
          if (response_data.status == 1) {
            $btnBafSaveSorting.val(BafAdminData.baf_text_saved);
            setTimeout(function () {
              $btnBafSaveSorting.val($btnBafSaveSortingText).removeAttr("disabled");
            }, 2000);
          }
        });
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./src/admin/modules/installation_counter.js":
/*!***************************************************!*\
  !*** ./src/admin/modules/installation_counter.js ***!
  \***************************************************/
/***/ (() => {

;
(function ($) {
  function baf_installation_counter() {
    return $.ajax({
      type: "POST",
      url: BafAdminData.ajaxurl,
      data: {
        action: "baf_installation_counter" // this is the name of our WP AJAX function that we'll set up next
      },
      dataType: "JSON"
    });
  }
  if (typeof BafAdminData.installation != "undefined" && BafAdminData.installation != 1) {
    $.when(baf_installation_counter()).done(function (response_data) {
      // console.log(response_data)
    });
  }
})(jQuery);

/***/ }),

/***/ "./src/admin/modules/purchase_verify.js":
/*!**********************************************!*\
  !*** ./src/admin/modules/purchase_verify.js ***!
  \**********************************************/
/***/ (() => {

;
(function ($) {
  if ($("#baf-product-license").length) {
    let $loader = $("#baf-product-license").find("#loader");
    function verifyMsg(msg, status) {
      let status_class = typeof status !== undefined && status == 0 ? "verify_error" : "verify_success";
      return "<p class='" + status_class + "'>" + msg + "</p>";
    }
    $loader.html("");
    if ($("#baf_verify_purchase").length) {
      let $baf_verify_purchase = $("#baf_verify_purchase"),
        $purchase_code = $baf_verify_purchase.find("#purchase_code"),
        $btn_verify = $baf_verify_purchase.find("#verify"),
        $baf_form_group = $([]).add($purchase_code).add($btn_verify);

      // Initialize.
      $purchase_code.val("");
      function baf_verify_purchase_data() {
        return $.ajax({
          type: "POST",
          url: BafAdminData.ajaxurl,
          data: {
            action: "bafVerifyPurchaseData",
            // this is the name of our WP AJAX function that we'll set up next
            purchase_code: $purchase_code.val()
          },
          dataType: "JSON"
        });
      }
      $baf_verify_purchase.on("submit", function (e) {
        e.preventDefault();
        if ($purchase_code.val().trim() == "") {
          alert(BafAdminData.baf_pvc_required_msg);
          $purchase_code.val("");
          return false;
        }
        $baf_form_group.attr("disabled", "disabled");
        $loader.html("").html(BafAdminData.baf_text_loading);
        $.when(baf_verify_purchase_data()).done(function (response_data) {
          // console.log(response_data)
          if (response_data.status == 1) {
            // console.log(response_data)
            // $purchase_code.remove()
            $loader.html(verifyMsg(BafAdminData.baf_pvc_success_msg, response_data.status));
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            $loader.html(verifyMsg(BafAdminData.baf_pvc_failed_msg, 0));
            $purchase_code.val("");
            $baf_form_group.removeAttr("disabled");
          }
        });
      });
    }

    // Delete License.

    function baf_remove_license_data(verify_hash) {
      return $.ajax({
        type: "POST",
        url: BafAdminData.ajaxurl,
        data: {
          action: "bafRemoveLicenseData",
          verify_hash: verify_hash
        },
        dataType: "JSON"
      });
    }
    $("#baf_remove_license").on("click", function () {
      let $this = $(this);
      let remove_license = confirm(BafAdminData.baf_pvc_remove_msg);
      if (remove_license == true) {
        $loader.html(BafAdminData.baf_text_loading);
        $this.attr("disabled", "disabled");
        $.when(baf_remove_license_data($this.data("verify_hash"))).done(response_data => {
          // console.log(response_data.status)
          if (response_data.status == 1) {
            $loader.html(verifyMsg(BafAdminData.baf_pvc_removed_msg, response_data.status));
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            $this.removeAttr("disabled");
          }
        });
      }
    });
  }
})(jQuery);

/***/ }),

/***/ "./src/admin/styles/admin.scss":
/*!*************************************!*\
  !*** ./src/admin/styles/admin.scss ***!
  \*************************************/
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
/*!**********************************!*\
  !*** ./src/admin/admin_index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/admin.scss */ "./src/admin/styles/admin.scss");
/* harmony import */ var _modules_admin_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/admin_custom */ "./src/admin/modules/admin_custom.js");
/* harmony import */ var _modules_admin_custom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_admin_custom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_faq_sorting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/faq_sorting */ "./src/admin/modules/faq_sorting.js");
/* harmony import */ var _modules_faq_sorting__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_faq_sorting__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_installation_counter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/installation_counter */ "./src/admin/modules/installation_counter.js");
/* harmony import */ var _modules_installation_counter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_installation_counter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_purchase_verify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/purchase_verify */ "./src/admin/modules/purchase_verify.js");
/* harmony import */ var _modules_purchase_verify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_modules_purchase_verify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_admin_notice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/admin_notice */ "./src/admin/modules/admin_notice.js");
/* harmony import */ var _modules_admin_notice__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_admin_notice__WEBPACK_IMPORTED_MODULE_5__);
// Load Stylesheets.


// Load JavaScripts





})();

/******/ })()
;
//# sourceMappingURL=admin.js.map