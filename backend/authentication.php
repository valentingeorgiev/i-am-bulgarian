<?php

require_once('wp-load.php');

$response_login = array(
  'data'		=> array(),
  'status'	=> false,
  'wrong_username' => false,
  'wrong_password' => false,
);

$response_logout = array(
  'status'	=> false
);

$response_register = array(
  'status'	=> false,
  'username_exists' => false,
  'email_exists' => false,
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
 * Login Method
 * 
**/
$tokens = array();
if(isset( $_POST['type'] ) &&  $_POST['type'] == 'login') {
  
  $user = get_user_by('login', $_POST['username']);
  
  if($user) {

    $password_check = wp_check_password($_POST['password'], $user->data->user_pass, $user->ID);
    if($password_check){
      $token = generate_auth_token(30);
      if(metadata_exists('user', $user->ID, 'auth_token')) {
        $tokens = get_user_meta($user->ID, 'auth_token', true);
      }
      $tokens[] = $token; 
      if(update_user_meta($user->ID, 'auth_token', $tokens) ){
        $response_login['status'] = true;
        $response_login['data'] = array(
          'auth_token' 	=>	$token,
          'user_id'		=>	$user->ID,
          'user_login'	=>	$user->user_login
        );
      }
    } else {
      $response_login['wrong_password'] = true;
    }
  
  } else {
    $response_login['wrong_username'] = true;
  }
  echo json_encode($response_login);
}


/**
 * Logout Method
 *
**/
if(isset( $_POST['type'] ) &&  $_POST['type'] == 'logout') {
  
  if (metadata_exists('user', $_POST['user_id'], 'auth_token')) {
    $tokens = get_user_meta($_POST['user_id'], 'auth_token', false);
    $tokens = $tokens[0];
    
    if (($key = array_search($_POST['auth_token'], $tokens)) !== false) {
      unset($tokens[$key]);
    }
    
    if( update_user_meta($_POST['user_id'], 'auth_token', $tokens) ){
      $response_logout['status'] = true;
      echo json_encode($response_logout);
    }
  }
}


/**
 * Register Method
 *
 **/
if(isset( $_POST['type'] ) &&  $_POST['type'] == 'register') {
  
  $username_exists = username_exists( $_POST['username'] );
  $email_exists = email_exists($_POST['email']);
  
  if($username_exists) {
    $response_register['username_exists'] = true;
  }
  
  if($email_exists) {
    $response_register['email_exists'] = true;
  }
  
  if(!$username_exists && !$email_exists) {
    $response_register['status'] = true;
    $response_register['username_exists'] = false;
    $response_register['email_exists'] = false;
    
    wp_create_user($_POST['username'], $_POST['password'], $_POST['email']);
    $response_register['status'] = true;
  }
  echo json_encode($response_register);
}
?>