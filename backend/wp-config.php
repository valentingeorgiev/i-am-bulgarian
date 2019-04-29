<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'id9446847_i_am_bulgarian' );

/** MySQL database username */
define( 'DB_USER', 'id9446847_i_am_bulgarian' );

/** MySQL database password */
define( 'DB_PASSWORD', 'dpS41NFznrP3gvm!65&!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '?Pj dV^BvztU,O}-a.2ERpr2omZBLi7(9c[.CRz])*%P=zh ?EBg^7bfV>L8CBb`' );
define( 'SECURE_AUTH_KEY',  'i7$n/W GIWqW?)%Q7#ecA7}]pRsAQGVV@ip+;;;0a)[7Xh_`{U=*}U}(I}_7CMlX' );
define( 'LOGGED_IN_KEY',    '.}b_}gm;G@&?> a&G9)}TePg>-9Qv3e@EKFr]w4k&9lYvI0XMIF,UuJQl4$[b>1>' );
define( 'NONCE_KEY',        'sWawRqn1b9E>tWN<h&],PuY5qA+R|*yh<c/k7Q;h/O:}%&V<j{?pv]/O+<4f:l9D' );
define( 'AUTH_SALT',        '4;s&h&Uf(vRVT7)o*8?D[i%])2y&u9K!@x@>N/:,e~/y%xq Xp-yYD6@9GBrCq*w' );
define( 'SECURE_AUTH_SALT', 'f&x|M&ITKK>A{LP>#|RovIt]l4;SpnJz$?#k*xZw wA+7sLVayevy.6Fb*]UQIXg' );
define( 'LOGGED_IN_SALT',   '68TwSvtoPYl|S-JEn(@$BjIg_)i9uD_XHUI.lsbR;=oxT_4#38zgiC3VC&fqq#uI' );
define( 'NONCE_SALT',       'M.7)7D)F7|HY5T+;+3E k`.)~}9 b-O0e8$(9wdhlR>zh{MPVSQ/-)P}F2xP`q-u' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'ibg_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
