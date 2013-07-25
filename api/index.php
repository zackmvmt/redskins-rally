<?php
	
	// required files and init processes
	require_once 'config.php';
	require_once 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();

	// define routes
	$app->get('/locations', function() {
		$locs = ORM::for_table('locations')->find_array();
		echo json_encode($locs);
	});

	$app->post('/locations', function() {
		// TODO figure out how to get the post variables
	});

	// start the api
	$app->run();