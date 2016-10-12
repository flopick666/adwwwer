<?php


foreach ( $_POST as $k => $v) {
	$params[$k] = addslashes(strip_tags(trim($v)));
}
$message = 'Name: ' . $params['name'] . PHP_EOL
			. 'Email: ' . $params['email'] . PHP_EOL
			. 'Phone: ' . $params['phone'] . PHP_EOL
			. 'Message: ' . $params['message'] . PHP_EOL;
mail('adwwwer@gmail.com', 'Contacts from adwwwer.1pls1.com', $message);
print_r($message);
