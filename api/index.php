<?php
	
	// required files and init processes
	require_once '../common/php/config.php';
	require_once 'Slim/Slim.php';
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim();


	/* ********** **********
	 * GET ROTUES
	 * ********** ********** */

	// get all the locations
	$app->get('/locations', function() {
		$locs = ORM::for_table('locations')->find_array();
		echo json_encode($locs);
	});


	/* ********** **********
	 * POST ROUTES
	 * ********** ********** */

	// add a new location
	$app->post('/locations', function() {
		// TODO figure out how to get the post variables
	});


	/* ********** **********
	 * PUT ROUTES
	 * ********** ********** */

	// edit a specific location
	$app->put('/locations/:id', function($id) use ($app) {
		// get the information
		$req = $app->request();
		$post = $req->post();
		// find the item
		$loc = ORM::for_table('locations')->find_one($id);
		// update the information
		foreach ($post as $key => $value) {
			$loc->$key = $value;
		}
		// save
		$loc->save();
		echo json_encode(true);
	});


	/* ********** **********
	 * DELETE ROUTES
	 * ********** ********** */

	// delete a specific location
	$app->delete('/locations/:id', function($id) use ($app) {
		$loc = ORM::for_table('locations')->find_one($id);
		$loc->delete();
		echo json_encode(true);
	});
	

	// start the api
	$app->run();