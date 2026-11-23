<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['fullName'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Nome completo é obrigatório']);
    exit;
}

$dataFile = __DIR__ . '/../data/rydentec.json';
$data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
if (!isset($data['leads'])) $data['leads'] = [];

$newLead = [
    'id' => 'lead_' . time(),
    'fullName' => $input['fullName'],
    'businessName' => $input['businessName'] ?? '',
    'email' => $input['email'] ?? '',
    'phone' => $input['phone'] ?? '',
    'service' => $input['service'] ?? 'Geral',
    'budget' => $input['budget'] ?? 'Sob Consulta',
    'projectDetails' => $input['projectDetails'] ?? '',
    'status' => 'new',
    'createdAt' => date('c')
];
array_unshift($data['leads'], $newLead);
if (isset($data['analytics'])) {
    $data['analytics']['quoteRequests'] = ($data['analytics']['quoteRequests'] ?? 0) + 1;
}
file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'leadId' => $newLead['id']]);
