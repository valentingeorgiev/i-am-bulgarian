<?php

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
require_once($path.'wp-load.php');

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

$args = array(
  'meta_key' => 'user_points',
  'orderby' => 'meta_value',
  'order' => 'DESC'
);

$user_query = new WP_User_Query( $args);
$users = array();

if (!empty( $user_query->get_results())) {
  foreach ( $user_query->get_results() as $user ) {

    $count_visits = get_user_meta($user->ID, 'visited_landmarks', true);
    $user_points = get_user_meta($user->ID, 'user_points', true);
    $count_visits = count($count_visits);
    
    array_push($users, array(
      'user_name' => $user->display_name,
      'count_visits' =>  $count_visits,
      'points' => $user_points
    ));
  }
  echo json_encode($users);
}
?>