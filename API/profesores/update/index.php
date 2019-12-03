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
      $profesor = json_decode($data); // conversión a Array asociativo de la información
      /**
       * Se utiliza la funciòn addslashes para poder escapar comillas simples, dobles o 
       * diagonales invertidas
       */
      $id_profesor = addslashes($profesor->id_profesor);
      $titulo = addslashes($profesor->titulo);
      $codigo_udeg = addslashes($profesor->codigo_udeg);
      $nombres = addslashes($profesor->nombres);
      $apellido_paterno = addslashes($profesor->apellido_paterno);
      $apellido_materno = addslashes($profesor->apellido_materno);
      $fecha_nacimiento = addslashes($profesor->fecha_nacimiento);
      $antiguedad = addslashes($profesor->antiguedad);
      $telefono = addslashes($profesor->telefono);
      $correo_principal = addslashes($profesor->correo_principal);
      $correo_secundario = addslashes($profesor->correo_secundario);
      $categoria = addslashes($profesor->categoria);
      $nombramiento = addslashes($profesor->nombramiento);
      $nivel = addslashes($profesor->nivel);
      $materias = addslashes($profesor->materias); //#TODO: ¿cómo vamos a definir las materias de cada maestro?
      $deleted = addslashes($profesor->deleted); 
      $respuesta = []; // Contendra la respuesta de la consulta
      
      $query = "UPDATE profesores SET
                  titulo = '$titulo', -- NOT NULL
                  codigo_udeg = '$codigo_udeg', -- NOT NULL
                  nombres = '$nombres', -- NOT NULL
                  apellido_paterno = '$apellido_paterno', -- NOT NULL
                  apellido_materno = '$apellido_materno', 
                  fecha_nacimiento = '$fecha_nacimiento', 
                  antiguedad = '$antiguedad',
                  telefono = '$telefono',
                  correo_principal = '$correo_principal', -- NOT NULL
                  correo_secundario = '$correo_secundario',
                  categoria = '$categoria',
                  nombramiento = '$nombramiento',
                  nivel = '$nivel',
                  materias = '$materias',
                  deleted = '$deleted'
                WHERE 
                  id_profesor = $id_profesor;";

      try {
        $update = $mysqli->query( $query );
        if(!$update){
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
        'msj' => 'Se han actualizado los datos del profesor '.$profesor->nombres.' '.$profesor->apellido_paterno.' correctamente.'
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
