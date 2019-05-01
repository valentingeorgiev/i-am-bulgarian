<?php
// Register Custom Post Type Landmark
function landmarks_cpt() {

	$labels = array(
		'name'                  => _x( 'Landmarks', 'Post Type General Name', 'imbg' ),
		'singular_name'         => _x( 'Landmark', 'Post Type Singular Name', 'imbg' ),
		'menu_name'             => __( 'Landmarks', 'imbg' ),
		'name_admin_bar'        => __( 'Landmark', 'imbg' ),
		'archives'              => __( 'Landmark Archives', 'imbg' ),
		'attributes'            => __( 'Landmark Attributes', 'imbg' ),
		'parent_item_colon'     => __( 'Parent Landmark:', 'imbg' ),
		'all_items'             => __( 'All Landmarks', 'imbg' ),
		'add_new_item'          => __( 'Add New Landmark', 'imbg' ),
		'add_new'               => __( 'Add New', 'imbg' ),
		'new_item'              => __( 'New Landmark', 'imbg' ),
		'edit_item'             => __( 'Edit Landmark', 'imbg' ),
		'update_item'           => __( 'Update Landmark', 'imbg' ),
		'view_item'             => __( 'View Landmark', 'imbg' ),
		'view_items'            => __( 'View Landmarks', 'imbg' ),
		'search_items'          => __( 'Search Landmark', 'imbg' ),
		'not_found'             => __( 'Not found', 'imbg' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'imbg' ),
		'featured_image'        => __( 'Featured Image', 'imbg' ),
		'set_featured_image'    => __( 'Set featured image', 'imbg' ),
		'remove_featured_image' => __( 'Remove featured image', 'imbg' ),
		'use_featured_image'    => __( 'Use as featured image', 'imbg' ),
		'insert_into_item'      => __( 'Insert into landmark', 'imbg' ),
		'uploaded_to_this_item' => __( 'Uploaded to this landmark', 'imbg' ),
		'items_list'            => __( 'Landmarks list', 'imbg' ),
		'items_list_navigation' => __( 'Landmarks list navigation', 'imbg' ),
		'filter_items_list'     => __( 'Filter landmarks list', 'imbg' ),
	);
	$args = array(
		'label'                 => __( 'Landmark', 'imbg' ),
		'description'           => __( 'Post Type Description', 'imbg' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-location',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	register_post_type( 'landmark', $args );

}
add_action( 'init', 'landmarks_cpt', 0 );
?>