<?php

/**
 * [This class handles the operations of FAQ likes reset quick and bulk edit]
 */

class BafQuickBulkEdit
{

    public function __construct()
    {
        add_action('bulk_edit_custom_box', [$this, 'cbLoadQuickBulkEditLayout'], 10, 2);
        add_action('quick_edit_custom_box',  [$this, 'cbLoadQuickBulkEditLayout'], 10, 2);
        add_action('save_post', [$this, 'cbSaveQuickEditData']);
        add_action('wp_ajax_baf_bulk_quick_save_bulk_edit', [$this, 'cbSaveBulkEditData']);
    }


    public function cbLoadQuickBulkEditLayout($column_name, $post_type)
    {

        switch ($post_type) {

            case BWL_BAF_CPT:

                switch ($column_name) {

                    case 'baf_votes_count':

?>

                        <fieldset class="inline-edit-col-right">
                            <div class="inline-edit-col">
                                <div class="inline-edit-group wp-clearfix">
                                    <label class="inline-edit-baf-likes-status">
                                        <span class="title"><?php esc_html_e('Reset FAQ Likes', 'bwl-adv-faq'); ?></span>
                                        <select name="baf_reset_likes_status" id="baf_reset_likes_status">
                                            <option value=""><?php esc_html_e('Select', 'bwl-adv-faq'); ?></option>
                                            <option value="0"><?php esc_html_e('No', 'bwl-adv-faq'); ?></option>
                                            <option value="1"><?php esc_html_e('Yes', 'bwl-adv-faq'); ?></option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </fieldset>

<?php

                        break;
                }

                break;
        }
    }



    public function cbSaveQuickEditData($post_id)
    {
        // verify if this is an auto save routine. If it is our form has not been submitted, so we dont want
        // to do anything
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)
            return $post_id;

        // OK, we're authenticated: we need to find and save the data

        $post = get_post($post_id);

        if (isset($_POST['baf_reset_likes_status']) && ($post->post_type != 'revision')) {

            $bafResetLikesStatus = $_POST['baf_reset_likes_status'];

            if ($bafResetLikesStatus == 1) {

                update_post_meta($post_id, 'baf_votes_count', 0);
            }
        }

        return '';
    }


    public function cbSaveBulkEditData()
    {

        // we need the post IDs
        $post_ids = (isset($_POST['post_ids']) && !empty($_POST['post_ids'])) ? $_POST['post_ids'] : NULL;

        // if we have post IDs
        if (!empty($post_ids) && is_array($post_ids)) {

            // get the custom fields

            $custom_fields = array('baf_reset_likes_status');

            foreach ($custom_fields as $field) {

                // if it has a value, doesn't update if empty on bulk
                if (isset($_POST[$field]) && trim($_POST[$field]) != "") {

                    // update for each post ID
                    foreach ($post_ids as $post_id) {

                        if ($field == "baf_reset_likes_status" && $_POST[$field] == 1) {

                            delete_post_meta($post_id, 'baf_votes_count');
                        } else {

                            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
                        }
                    }
                }
            }
        }
    }
}


new BafQuickBulkEdit();
