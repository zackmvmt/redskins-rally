<?php

	// project information
	define('CLIENT_NAME', 'redskins');
	define('APP_NAME', 'rally');

	// database
    define('DB_NAME', '*DB_NAME*');
    define('DB_CONNECT_TYPE', 'idiorm');
	
	// Path for common files
	define('COMMON_PATH', $_SERVER['COMMON_PATH']);
	require_once COMMON_PATH . '/global.php';
	require_once COMMON_PATH . '/functions.php';
		
	define('FB_APP_ID', '*APP_ID*');
	define('FB_APP_SECRET', '*APP_SECRET*');
	
	// cloudfiles
	//define('CF_CONTAINER_URL', 'https://35e1e2177be04e434338-863a8fe8fdcfee17bcc7de358aba243f.ssl.cf2.rackcdn.com/');
	
    if(ENVIRONMENT == ENVIRONMENT_DEV){
	   define('FB_PAGE_URL', 'https://www.facebook.com/*FBYOURTESTPAGE*');
    }
    else{
       define('FB_PAGE_URL', 'https://www.facebook.com/*FBPRODPAGE');
    }
	
	define('BASE_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/apps/' . CLIENT_NAME . '/' . APP_NAME);
	define('FB_TAB_URL', FB_PAGE_URL . '?sk=app_' . FB_APP_ID);
	define('FB_CANVAS_URL', 'http://apps.facebook.com/*CANVAS*');
  	define('MOBILE_URL', 'http://'. $_SERVER['SERVER_NAME']. '/apps/npt/photo13/public/mobile');
    define('BITLY_URL', 'http://bit.ly/*BITLY*');
	define('CANVAS_URL', BASE_URL . 'canvas/');
