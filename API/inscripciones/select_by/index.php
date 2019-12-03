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
      $inscripciones = [];
      $respuesta = []; // Contendra la respuesta de la consulta
      $data = file_get_contents("php://input"); // Recepción de datos desde SPA
      $solicitud = json_decode($data); // conversión a Array asociativo de la información
      /**
       * Se utiliza la funciòn addslashes para poder escapar comillas simples, dobles o 
       * diagonales invertidas
       */
      $id_general = addslashes($solicitud->id_general);
      $tipo = addslashes($solicitud->tipo);
      switch($tipo){
        case 'inscripciones_por_usuario':
          $query = "SELECT 
                    * 
                    FROM inscripciones 
                    WHERE deleted != 1
                    AND id_profesor = '$id_general'"; // Retorna a un maestro.
          break;
        case 'inscripciones_por_curso':
          $query = "SELECT 
                    * 
                    FROM inscripciones 
                    WHERE deleted != 1
                    AND id_curso = '$id_general'"; // Retorna a un maestro.
          break;
        default:
          $respuesta = [
            'error' => true,
            'msj' => 'No existe una funcionalidad para la solicitud registrada'
          ];
          break;  
      }

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

      while ( $row = $select_by->fetch_assoc() ) {
        $inscripciones[] = $row; // #TODO: Verificar que datos no vamos a necesitar en está consulta 
      }
      $mysqli->close();

      $respuesta = [
        'error' => false,
        'inscripciones' => $inscripciones,
        'msj' => 'La información solicitada ya se encuentra dispobible'
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
