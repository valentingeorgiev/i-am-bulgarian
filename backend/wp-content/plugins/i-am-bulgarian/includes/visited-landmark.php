<?php 

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
require_once($path.'wp-load.php');

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

$response = array(
  'status'	=> false,
  'visited_landmarks' => array()
);

if(isset($_POST['user_id'])) {
  if (metadata_exists('user', $_POST['user_id'], 'visited_landmarks')) {
    $visited_landmarks = get_user_meta($_POST['user_id'], 'visited_landmarks', true);
    $response['status'] = true;
    $response['visited_landmarks'] = $visited_landmarks;
  }
  echo json_encode($response);
}
?>