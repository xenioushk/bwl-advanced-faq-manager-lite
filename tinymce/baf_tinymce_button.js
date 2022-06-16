jQuery(document).ready(function ($) {

    // Editor Part

    function baf_add_sc_action() {

        var $baf_sc_container = $("#baf_editor_popup_content");

        var $custom_faq_type = $("[name=custom_faq_type]");

        var faq_category_container = $("#faq_category_container"),
                faq_item_container = $("#faq_item_container"),
                faq_tab_container = $("#faq_tab_container"),
                faq_description_container = $("#faq_description_container"),
                baf_sc_settings = $(".baf_sc_settings"),
                faq_sc_container = $("#faq_sc_container");

        $custom_faq_type.change(function () {

            var $custom_faq_type_value = $(this).val();

            if ($custom_faq_type_value == 2) {
                
                faq_category_container.removeClass("bafm_dn");
                faq_tab_container.removeClass("bafm_dn");
                faq_description_container.removeClass("bafm_dn");
                faq_item_container.addClass("bafm_dn");
                faq_sc_container.addClass("bafm_dn");

            }  else {

                faq_category_container.addClass("bafm_dn");
                faq_tab_container.addClass("bafm_dn");
                faq_item_container.addClass("bafm_dn");
                baf_sc_settings.removeClass("bafm_dn");

            }

        })


        $('#addShortCodebtn').click(function (event) {

            // Columns

            // INITIALIZE ALL SHORTCODE TEXT

            var sc_faq_limit = "",
                    sc_faq_order = "",
                    sc_faq_sbox = "",
                    sc_faq_orderby = "";

            var shortcode = '[bwla_faq';

            // FAQ category
            if ($baf_sc_container.find('#faq_category').multipleSelect('getSelects').length !== 0) {

                shortcode += ' faq_category="' + $baf_sc_container.find('#faq_category').multipleSelect('getSelects') + '" ';

            }

            // NUMBER OF FAQs
            if ($('#no_of_faqs').val().split(" ").join("").length !== 0) {

                shortcode += ' limit="' + $('#no_of_faqs').val().split(" ").join("") + '" ';

                sc_faq_limit = ' limit="' + $('#no_of_faqs').val().split(" ").join("") + '" ';

            }

            // ORDER BY
            if ($baf_sc_container.find('#orderby').val().length !== 0) {

                shortcode += ' orderby="' + $('#orderby').val() + '" ';

                sc_faq_orderby = ' orderby="' + $('#orderby').val() + '" ';

            }

            // ORDER TYPE
            if ($baf_sc_container.find('#order').val().length !== 0) {

                shortcode += ' order="' + $('#order').val() + '" ';

                sc_faq_order = ' order="' + $('#order').val() + '" ';

            }

            // Show Search Form
            if ($baf_sc_container.find('#sbox').is(':checked') && $('.custom_faq_type:checked').val() ==1 ) {

                shortcode += ' sbox="1" ';

            } else {

                shortcode += ' sbox="0" ';
            }
            
            // Show Search Form
            if ( $('.custom_faq_type:checked').val() ==2) {

                shortcode += ' list="1"';

            }
           

            // Ending of Shortcode
            shortcode += ' /]';

            window.send_to_editor(shortcode);

            $('#baf_editor_overlay').remove();

            return false;

        });

        $('#closeShortCodebtn, .btn_baf_editor_close').click(function (event) {
            $('#baf_editor_overlay').remove();
            return false;
        });

        /*------------------------------ Category ---------------------------------*/

        $('select#faq_category').add("multiple", "multiple");

        $('select#faq_category').multipleSelect({
            placeholder: "- Select -",
            selectAll: true,
            filter: true

        });

        $('select#faq_category').multipleSelect("uncheckAll");

        // Enable Drag Drop Of Editor

        $("#baf_editor_popup").draggable({
            cursor: "move",
            drag: function () {
                $(this).css({
                    'height': 'auto'
                })
            }}
        );

    }

    function handle_baf_sc_content() {

        return jQuery.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'HTML',
            data: {
                action: 'baf_sc_content', // action will be the function name
            }
        });

    }

    /*-- Start TinyMCE Integration Code --*/

    tinymce.create('tinymce.plugins.baf', {
        init: function (ed, url) {
            ed.addButton('baf', {
                title: 'BWL Advanced FAQ Shortcode Editor',
                image: url + '/icons/bwl-adv-faq-editor.png',
                onclick: function () {

                    if ($('#shortcode_controle').length) {

                        $('#shortcode_controle').remove();

                    } else {

                        var baf_sc_loading_icon = '<img src="' + url + '/icons/load_icon.gif" class="baf_sc_load_icon"></img>';

                        $('body').append('<div id="baf_editor_overlay"><div id="baf_editor_popup">' + baf_sc_loading_icon + '</div></div>');

                        $.when(handle_baf_sc_content()).done(function (data) {
                            $('#baf_editor_popup').html("").html(data).draggable({cursor: "move"});
                            baf_add_sc_action();

                            $('#baf_editor_popup').css('margin-top', $(window).height() / 2 - $('#baf_editor_popup').height() / 2);

                            $(window).resize(function () {
                                
                                $('#baf_editor_popup').css('margin-top', $(window).height() / 2 - $('#baf_editor_popup').height() / 2);

                            });

                        });

                    }
                }
            });
        },
        createControl: function (n, cm) {
            return null;
        }
    });

    tinymce.PluginManager.add('baf', tinymce.plugins.baf);

});