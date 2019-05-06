<?php

$path = preg_replace('/wp-content(?!.*wp-content).*/','',__DIR__);
require_once($path.'wp-load.php');

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

$args = array(
  'post_status' => 'publish',
  'post_type' => 'landmark',
  'meta_key' => 'count_visits',
  'orderby' => 'meta_value_num',
  'order' => 'DESC'
);

$the_query = new WP_Query( $args );
$landmarks = array();
if ( $the_query->have_posts() ) {
	while ( $the_query->have_posts() ) {
    $the_query->the_post();
    $count_visits = get_post_meta(get_the_ID(), 'count_visits', true);
    array_push($landmarks, array(
      'landmark_name' => get_the_title(),
      'count_visits' =>  $count_visits,
    ));

  }
  echo json_encode($landmarks, JSON_UNESCAPED_UNICODE);
	wp_reset_postdata();
}
?>