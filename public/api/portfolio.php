<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$dataFile = __DIR__ . '/../data/rydentec.json';
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true);
    echo json_encode(['success' => true, 'projects' => $data['projects'] ?? []]);
} else {
    echo json_encode(['success' => false, 'projects' => []]);
}
