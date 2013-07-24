<?php
	// idiorm is included with common and will be set up
	// TODO, learn a little about how common and config work together
	//			helper functions included in the common/global common/functions common/facebook.js

	require_once 'config.php';

	$data = ORM::for_table('test')->find_many();

	foreach($data as $item) {
		echo '[' . $item->id . '] ';
		echo $item->name . ' - ';
		echo $item->value . '<br />';
	}