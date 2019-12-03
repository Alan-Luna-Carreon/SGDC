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
      $data = file_get_contents("php://input"); // Recepción de datos desde SPA
      $curso = json_decode($data); // conversión a Array asociativo de la información
      /**
       * Se utiliza la funciòn addslashes para poder escapar comillas simples, dobles o 
       * diagonales invertidas
       */
      $titulo = addslashes( $curso->titulo );
      $descripcion = addslashes( $curso->descripcion );
      $descripcion_corta = addslashes( $curso->descripcion_corta );
      $portada = addslashes( $curso->portada );
      $fecha_hora = addslashes( $curso->fecha_hora );
      $presentador = addslashes( $curso->presentador );
      $organizador = addslashes( $curso->organizador );
      $direccion = addslashes( $curso->direccion );
      $url_google_maps = addslashes( $curso->url_google_maps );
      $etiquetas = addslashes( $curso->etiquetas );
      $precio = addslashes( $curso->precio );
      $lugares_disponibles = addslashes( $curso->lugares_disponibles );
      $estatus = addslashes( $curso->estatus );
      $respuesta = []; // Contendra la respuesta de la consulta
      
      $query = "INSERT INTO cursos(
                  titulo,
                  descripcion,
                  descripcion_corta,
                  portada,
                  fecha_hora,
                  presentador,
                  organizador,
                  direccion,
                  url_google_maps,
                  etiquetas,
                  precio,
                  lugares_disponibles,
                  estatus
                )VALUES(
                  '$titulo',
                  '$descripcion',
                  '$descripcion_corta',
                  '$portada',
                  '$fecha_hora',
                  '$presentador',
                  '$organizador',
                  '$direccion',
                  '$url_google_maps',
                  '$etiquetas',
                  '$precio',
                  '$lugares_disponibles',
                  '$estatus'
                );";

      try {
        $insert = $mysqli->query( $query );
        if(!$insert){
          throw new Exception( $mysqli->error, 1 );
        }
      } catch ( Exception $e ) {
        $respuesta = [
          'error' => true,
          'msj' => $e->getMessage()
        ];
        exit( json_encode( $respuesta ) );
      }

      $respuesta = [
        'error' => false,
        'msj' => 'Se han registrado los datos del curso '.$curso->titulo.' correctamente.'
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
