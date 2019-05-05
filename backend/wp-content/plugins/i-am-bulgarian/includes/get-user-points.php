<?php 

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
require_once($path.'wp-load.php');

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

$response = array(
  'status'	=> false,
  'user_points' => 0
);

if(isset($_POST['user_id'])) {
  if (metadata_exists('user', $_POST['user_id'], 'user_points')) {
    $user_points = get_user_meta($_POST['user_id'], 'user_points', true);
    $response['status'] = true;
    $response['user_points'] = $user_points;
  }
  echo json_encode($response);
}
?>