<?php
  header('Content-Type: application/json;charset=UTF-8');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
  header('Allow: GET, POST, OPTIONS, PUT, DELETE');
  header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");

  $headers = apache_request_headers();
  $api_key = '7cc263a1-a490-4337-8302-151490495e56';

  require_once('../../mysqli.php'); // Archivo global con las conexiones a la base de datos

  if(isset($headers['X-Api-Key'])){ // Primer nivel de seguridad
    if($headers['X-Api-Key'] === $api_key){ // Segundo nivel de seguridad
      $profesor_solicitado = [];
      $respuesta = []; // Contendra la respuesta de la consulta
      $data = file_get_contents("php://input"); // Recepción de datos desde SPA
      $profesor = json_decode($data); // conversión a Array asociativo de la información

      $query = "SELECT 
                * 
                FROM profesores 
                WHERE deleted != 1
                AND id_profesor = '$profesor->id_profesor'"; // Retorna a un maestro.

      try {
        $select_by = $mysqli->query( $query );
        if(!$select_by){
          throw new Exception( $mysqli->error, 1 );
        }
      } catch ( Exception $e ) {
        $respuesta = [
          'error' => true,
          'msj' => $e->getMessage()
        ];
        exit( json_encode( $respuesta ) );
      }

      while ( $r = $select_by->fetch_assoc() ) {
        $profesores[] = $r; // #TODO: Verificar que datos no vamos a necesitar en está consulta 
      }
      $mysqli->close();

      $respuesta = [
        'error' => false,
        'profesor' => $profesor_solicitado,
        'msj' => 'Ya se encuentra disponible la información del profesor solicitado'
      ];
      exit( json_encode( $respuesta ) );

    } else{
      exit( json_encode([
        'error' => true,
        'msj' => 'Es necesario indicar la clave correcta para poder ingresar'
      ]));
    }
  } else{
    exit( json_encode([
      'error' => true,
      'msj' => 'Es necesario indicar una clave para poder ingresar'
    ]));
  }
?>
