<?php

require_once('wp-load.php');

$response_login = array(
  'data'		=> array(),
  'status'	=> false,
  'wrong_username' => false,
  'wrong_password' => false,
);

/* Sanitize all received posts */
foreach($_POST as $k => $value) {
  $_POST[$k] = sanitize_text_field($value);
}

function generate_auth_token($n) { 
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
  $randomString = ''; 
  
  for($i = 0; $i < $n; $i++) { 
    $index = rand(0, strlen($characters) - 1); 
    $randomString .= $characters[$index]; 
  } 
  return $randomString; 
} 

/**
 * Logoin Method
 * 
**/
$tokens = array();
if(isset( $_POST['type'] ) &&  $_POST['type'] == 'login') {
  
  $user = get_user_by('login', $_POST['username']);
  $password_check = wp_check_password($_POST['password'], $user->data->user_pass, $user->ID);
  
  if($user == false) {
    $response_login['wrong_username'] = true;
  }
  
  if($password_check == false){
    $response_login['wrong_password'] = true;
  }
  
  if($user && $password_check) {
    $token = generate_auth_token(30);
    
    if(metadata_exists('user', $user->ID, 'auth_token')) {
      $tokens = get_user_meta($user->ID, 'auth_token', true);		
    }
    
    $tokens[] = $token; 
    
    if( update_user_meta($user->ID, 'auth_token', $tokens) ){
      $response_login['status'] = true;
      $response_login['data'] = array(
        'auth_token' 	=>	$token,
        'user_id'		=>	$user->ID,
        'user_login'	=>	$user->user_login
      );
    }
  }
  echo json_encode($response_login);
}
?>