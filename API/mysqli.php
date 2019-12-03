<?php
	$mysqli = new mysqli("192.185.131.184", "taban_sgdc", "Guadalajara1", "taban_sgdc"); // SERVIDOR BUENO

	if ($mysqli->connect_errno) {
	    echo "Error en la conexión: " . $mysqli->connect_error;
	}

	// Compatibilidad con UTF-8
	if (!$mysqli->set_charset("utf8")) {
	     printf("Error loading character set utf8: %s\n", $mysqli->error);
	}

	// Definir Zona Horaria
	$tmz = $mysqli->query("SET time_zone = '-05:00'");

	if(!$tmz){
		echo "Error al asignar zona horaria: " . $mysqli->error;
	}


?>
