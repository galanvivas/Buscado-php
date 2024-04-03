<?php
   
  
    //$filtro = $_GET['q'];

    // Ruta al archivo JSON
    $jsonFile = 'data-1.json';

    // Leer el contenido del archivo JSON
    $jsonData = file_get_contents($jsonFile);

    // Decodificar el contenido JSON en un arreglo PHP
    $dataArray = json_decode($jsonData, true);

    // Aplicar filtros 
    if (!empty($_GET['ciudad'])) {
        $ciudad = $_GET['ciudad'];
       // echo $ciudad ;
        $dataArray = array_filter($dataArray, function ($propiedad) use ($ciudad) {
            return $propiedad['Ciudad'] == $ciudad;
        });
    }
    if (!empty($_GET['tipo'])) {
        $tipo = $_GET['tipo'];
        // echo $tipo ;
        $dataArray = array_filter($dataArray, function ($propiedad) use ($tipo) {
            return $propiedad['Tipo'] == $tipo;
        });
    }
    if (!empty($_GET['precio'])) {
        $rangoPrecio = $_GET['precio'];
        // Dividir el rango en mínimo y máximo
        list($precioMin, $precioMax) = explode(';', $rangoPrecio);
       // echo $precioMin .'  '.$precioMax;
        
        $dataArray = array_filter($dataArray, function($propiedad) use ($precioMin, $precioMax) {
        $precioPropiedad = intval(str_replace(array('$', ','), '', $propiedad['Precio'])); // Eliminar signos de dólar y comas, y convertir a entero
        return $precioPropiedad >= $precioMin && $precioPropiedad <= $precioMax;
        });
    }


    // Retornar los datos combinados como JSON
    header('Content-Type: application/json');
    echo json_encode($dataArray);
    exit();

?>
