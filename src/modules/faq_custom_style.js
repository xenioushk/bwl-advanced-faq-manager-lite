;(function ($) {
  $(function () {
    // Convert Hex Color to RGBA.

    function bafHexToRgba(hex, opacity) {
      var c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split("")
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = "0x" + c.join("")
        return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + opacity + ")"
      } else {
        return 'rgba("0,0,0,' + opacity + '")'
      }
    }

    // Custom scripts to generate dynamic css.

    function generateBafCustomStyles() {
      if ($(".baf_custom_style").length > 0) {
        var customStyle = ""

        $(".baf_custom_style").each(function () {
          var container_id = $(this).attr("container_id"),
            $section_faq_unique_class = ".section_baf_" + container_id,
            first_color = $(this).data("first_color"),
            second_color = $(this).data("second_color"),
            label_text_color = $(this).data("label_text_color"),
            accordion_arrow = $(this).data("accordion_arrow")

          customStyle += $section_faq_unique_class + "{clear:both;}"
          customStyle += $section_faq_unique_class + " label{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important; color: " + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " label.opened-label{  background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(first_color, 1) + ") !important;}"
          customStyle += $section_faq_unique_class + ' label.opened-label:after{ font-size: 15px; font-weight:600; font-family: "Font Awesome 5 Free"; content:  "' + "\\" + accordion_arrow + '" !important; color: ' + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + ' label.closed-label:after{ font-size: 15px; font-weight: 600; font-family: "Font Awesome 5 Free"; content:  "' + "\\" + accordion_arrow + '" !important; color: ' + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " .baf-expand-all { background: " + first_color + " !important; color: " + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " .baf-expand-all:hover { background: " + second_color + " !important; color: " + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " .baf-collapsible-all{ background: " + first_color + " !important; color: " + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " .baf-collapsible-all:hover{ background: " + second_color + " !important; color: " + label_text_color + " !important;}"
          customStyle += $section_faq_unique_class + " .active_page{ background: " + first_color + " !important;}"

          // Custom Theme.
          customStyle += $section_faq_unique_class + ".baf_layout_semi_round .bwl-faq-container{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important;}"
          customStyle += $section_faq_unique_class + ".baf_layout_round .bwl-faq-container{ background: linear-gradient( " + bafHexToRgba(first_color, 1) + ", " + bafHexToRgba(second_color, 1) + ") !important;}"
        })

        $("<style data-type='baf_custom_style-custom-css'>" + customStyle + "</style>").appendTo("head")
      }
    }

    // Finally generate Custom CSS.

    generateBafCustomStyles()
  })
})(jQuery)
