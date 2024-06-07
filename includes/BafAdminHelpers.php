<?php

class BafAdminHelpers
{

  /**
   * @return [array]
   */

  public static function localizeData()
  {

    /*
    * Example of accessing the data from JavaScript:
    * BafAdminData.baf_text_loading
    */

    $localizeData = [
      'ajaxurl' => esc_url(admin_url('admin-ajax.php')),
      'baf_text_loading' => esc_attr__('Loading .....', 'bwl-adv-faq'),
      'baf_pvc_required_msg' => esc_attr__('Purchase code is required!', 'bwl-adv-faq'),
      'baf_pvc_success_msg' => esc_attr__('Purchase code verified. Reloading window in 3 seconds.', 'bwl-adv-faq'),
      'baf_pvc_failed_msg' => esc_attr__('Unable to verify purchase code. Please try again or contact support team.', 'bwl-adv-faq'),
      'baf_pvc_remove_msg' => esc_attr__('Are you sure to remove the license info?', 'bwl-adv-faq'),
      'baf_pvc_removed_msg' => esc_attr__('Purchase code removed. Reloading window in 3 seconds.', 'bwl-adv-faq'),
      'product_id' => BWL_BAF_CC_ID,
      'installation' => get_option(BWL_BAF_INSTALLATION_TAG),
      'baf_dir' => BWL_BAFM_PLUGIN_DIR, // for tinymce editor.
      'baf_text_saving' => esc_attr__('Saving', 'bwl-adv-faq'), // sort faq.
      'baf_text_saved' => esc_attr__('Saved', 'bwl-adv-faq'), // sort faq.
    ];


    return $localizeData;
  }
}
