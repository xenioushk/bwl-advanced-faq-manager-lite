'use strict';
(function ($) {
    
    $(function () {
        
        /*------ Allow Only Number -----*/
        
        
        $(".baf_numeric_field").each(function(){
            
            var $this = $(this);
            
            $this.on('keypress', function (e) {
                //if the letter is not digit then display error and don't type anything
                if(e.which == 13) {
                     return true;
                } else if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    return false;
                } else {
                     return true;
                }
            });
            
        })

        /*--  Color Picker For Option Panel --*/

        var $baf_enable_custom_theme = $("#baf_enable_custom_theme"),
                $gradient_first_color = $('input#gradient_first_color'),
                $gradient_second_color = $('input#gradient_second_color'),
                $label_text_color = $('input#label_text_color'),
                $baf_like_icon_color = $('input#baf_like_icon_color'),
                $baf_like_icon_hover_color = $('input#baf_like_icon_hover_color');

        $gradient_first_color.wpColorPicker();
        $gradient_second_color.wpColorPicker();
        $label_text_color.wpColorPicker();
        $baf_like_icon_color.wpColorPicker();
        $baf_like_icon_hover_color.wpColorPicker();

        var $baf_custom_theme_container = $baf_enable_custom_theme.parents('table');

        $baf_custom_theme_container.find('tr').hide();

        $baf_custom_theme_container.find('tr:eq( 0 ), tr:eq( 1 )').show();

        $baf_enable_custom_theme.on('click', function () {
            $baf_custom_theme_container.find('tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )').toggle('slow');
        });

        if ($baf_enable_custom_theme.is(':checked')) {
            $baf_custom_theme_container.find('tr:eq( 2 ), tr:eq( 3 ), tr:eq( 4 )').show();
        }

        /*-- Code Editor --*/

        if ($('#bwl_advanced_faq_custom_css').length) {
            var editorSettings = wp.codeEditor.defaultSettings ? _.clone(wp.codeEditor.defaultSettings) : {};
            editorSettings.codemirror = _.extend(
                    {},
                    editorSettings.codemirror,
                    {
                        indentUnit: 2,
                        tabSize: 2,
                        mode: 'css',
                    }
            );
            wp.codeEditor.initialize($('#bwl_advanced_faq_custom_css'), editorSettings);
        }


    });
})(jQuery);