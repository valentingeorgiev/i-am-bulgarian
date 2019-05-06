<?php 

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
require_once($path.'wp-load.php');

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

$response = array(
  'status'	=> false
);

$visited_landmarks = array();
$user_points = 0;
$count_visits = 0;

if(isset($_POST['user_id'])) {
  
  if(metadata_exists('user', $_POST['user_id'], 'visited_landmarks')) {
    $visited_landmarks = get_user_meta($_POST['user_id'], 'visited_landmarks', true);
  }
  $visited_landmarks[] = $_POST['landmark_id']; 
  $visited_landmarks_meta = update_user_meta($_POST['user_id'], 'visited_landmarks', $visited_landmarks);
  
  if(metadata_exists('user', $_POST['user_id'], 'user_points')) {
    $user_points = get_user_meta($_POST['user_id'], 'user_points', true);
  }
  $user_points += $_POST['landmark_points']; 
  $user_points_meta = update_user_meta($_POST['user_id'], 'user_points', $user_points);
  
  if(metadata_exists('post', $_POST['landmark_id'], 'count_visits')) {
    $count_visits = get_post_meta($_POST['landmark_id'], 'count_visits', true);
  }
  $count_visits += 1;
  $count_visits_meta = update_post_meta($_POST['landmark_id'], 'count_visits', $count_visits);
  
  if($visited_landmarks_meta && $user_points_meta && $count_visits_meta){
    $response['status'] = true;
  } else {
    $response['status'] = false;
  }
  echo json_encode($response);
}
?>