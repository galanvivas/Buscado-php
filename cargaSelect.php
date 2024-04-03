<?php


    // Ruta al archivo JSON
    $jsonFile = 'data-1.json';

    // Leer el contenido del archivo JSON
    $jsonData = file_get_contents($jsonFile);

    // Decodificar el contenido JSON en un arreglo PHP
    $dataArray = json_decode($jsonData, true);

    $ciudades = array_column($dataArray, 'Ciudad'); // Extraer solo el campo 'ciudad'
    $ciudadesUnicas = array_unique($ciudades); // Eliminar duplicados

    $tipo = array_column($dataArray, 'Tipo'); // Extraer solo el campo 'tipo'
    $tipoUnico = array_unique($tipo); // Eliminar duplicados

    // Combinar los datos en un solo array asociativo
    $data = array(
        'ciudadesUnicas' => $ciudadesUnicas,
        'tipoUnico' => $tipoUnico
    );

    // Retornar los datos combinados como JSON
    header('Content-Type: application/json');
    echo json_encode($data);
    exit() ;

?>