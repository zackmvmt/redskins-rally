<?php
	
	// required files and init processes
	require_once 'config.php';
	require_once 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	// define routes
	$app->get('/', function() {
		echo 'hello world and stuff';
	});

	// start the api
	$app->run();