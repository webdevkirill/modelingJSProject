<?php

    $data = json_decode($_REQUEST["data"]);

    $name = $data->user_name; // input name
    $email = $data->user_email;
    $phone = $data->user_phone; // input phone
    
    $message = "Новый заказ на сайте.".PHP_EOL."Имя: ".$name.PHP_EOL."Телефон: ".$phone.PHP_EOL."email: ".$email;

	send(190307755, $message); // id беседы с заказчиком

	function send($id , $message) {
        $url = 'https://api.vk.com/method/messages.send';
        $params = array(
            'user_id' => $id,    // Кому отправляем
            'message' => $message,   // Что отправляем
            'access_token' => file_get_contents('./key.txt'),  
            'v' => '5.62',
        );

        $result = file_get_contents($url, false, stream_context_create(array(
            'http' => array(
                'method'  => 'POST',
                'header'  => 'Content-type: application/x-www-form-urlencoded',
                'content' => http_build_query($params)
            )
        )));
	}
?>