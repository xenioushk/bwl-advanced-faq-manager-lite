<?php

class BafAdminNotice
{
  // One JS Files Is Required, 'admin_notice.js"

  public function __construct()
  {

    $this->setPluginInstallationDateTime();

    add_action('admin_notices', [$this, 'pluginVerficationNotice']);
  }

  public function setPluginInstallationDateTime()
  {
    // Plugin Installation Date Time.
    if (empty(get_option(BWL_BAF_INSTALLATION_DATE))) {
      update_option(BWL_BAF_INSTALLATION_DATE, date("Y-m-d H:i:s"));
    }
  }

  public function getAdminNoticeLists()
  {

    // Key MUST BE Unique. to be unique.
    // is-dismissible = display a close icon.
    // Classes: notice-success, notice-error, notice-warning. notice-info
    // display: 0, 1 [default: 1]

    return [];
    // $noticeLists = [

    //   [
    //     'noticeClass' => 'notice-success is-dismissible',
    //     'msg' => '<strong style="color:green;">Sale ends soon: 50% off Premium.</strong> Upgrade <a href="' . BWL_BAF_CC_URL . '" class="bwl_activation_link">BWL Advanced FAQ Manager</a> to pro version and <strong>unlock</strong> premium options, free addons, automatic update, official support, and many more.',
    //     'key' => 'baf_upgrade_pro_status'
    //   ]

    // ];

    // return $noticeLists;
  }

  public function pluginVerficationNotice()
  {

    foreach ($this->getAdminNoticeLists() as $notice) {

      $noticeDisplay = $notice['display'] ?? 1;

      if ($noticeDisplay == 1) {
        echo '<div class="notice ' . trim($notice['noticeClass']) . ' bwl_dn">
                <p>' . trim($notice['msg']) . '</p>
                <button utton type="button" class="notice-dismiss baf_remove_notice" data-key="' . $notice['key'] . '">
                <span class="screen-reader-text">Dismiss this notice.</span>
                </button>
              </div>';
      }
    }
  }
}

new BafAdminNotice();
