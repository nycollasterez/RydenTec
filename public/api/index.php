<?php
/**
 * RydenTec — Router PHP Nativo para HostGator (Plano M / Apache)
 * Substitui integralmente o backend Node.js em hospedagem compartilhada cPanel.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

define('DATA_FILE', __DIR__ . '/../data/rydentec.json');
define('JWT_SECRET', 'rydentec-super-secure-key-2026-production');

function json_response($payload, $code = 200) {
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_db() {
    if (!file_exists(DATA_FILE)) {
        return ['settings' => [], 'portfolio' => [], 'leads' => [], 'analytics' => ['visits' => 0, 'uniqueIps' => [], 'whatsappClicks' => 0, 'quoteRequests' => 0, 'consultationClicks' => 0, 'events' => []]];
    }
    $content = file_get_contents(DATA_FILE);
    $decoded = json_decode($content, true);
    return is_array($decoded) ? $decoded : [];
}

function save_db($db) {
    $dir = dirname(DATA_FILE);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    $tmp = DATA_FILE . '.tmp';
    file_put_contents($tmp, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    rename($tmp, DATA_FILE);
}

function b64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function b64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function create_jwt($payload) {
    $header = b64url_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload['exp'] = time() + (7 * 24 * 3600);
    $body = b64url_encode(json_encode($payload));
    $sig = b64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    return "$header.$body.$sig";
}

function verify_jwt($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$header, $body, $sig] = $parts;
    $expected = b64url_encode(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
    if (!hash_equals($expected, $sig)) return null;
    $data = json_decode(b64url_decode($body), true);
    if (!$data || ($data['exp'] ?? 0) < time()) return null;
    return $data;
}

function get_bearer_token() {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!$auth && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }
    if (preg_match('/Bearer\s+(.*)$/i', $auth, $m)) {
        return trim($m[1]);
    }
    return null;
}

function require_admin() {
    $token = get_bearer_token();
    if (!$token) json_response(['success' => false, 'error' => 'Não autorizado. Token necessário.'], 401);
    $decoded = verify_jwt($token);
    if (!$decoded) json_response(['success' => false, 'error' => 'Sessão expirada ou token inválido.'], 401);
    return $decoded;
}

function get_json_body() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

$route = trim($_GET['route'] ?? '', '/');
$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------
// ROTAS PÚBLICAS
// -------------------------------------------------------------

if ($route === 'settings' && $method === 'GET') {
    $db = load_db();
    $s = $db['settings'] ?? [];
    $safe = [
        'brandName' => $s['brandName'] ?? 'RydenTec',
        'tagline' => $s['tagline'] ?? '',
        'heroHeadline' => $s['heroHeadline'] ?? '',
        'heroSupporting' => $s['heroSupporting'] ?? '',
        'contactEmail' => $s['contactEmail'] ?? 'contato@rydentec.com',
        'whatsappNumber' => $s['whatsappNumber'] ?? '+55 (11) 98902-2184',
        'whatsappMessage' => $s['whatsappMessage'] ?? '',
        'schedulingUrl' => $s['schedulingUrl'] ?? '',
        'metaPixelId' => $s['metaPixelId'] ?? '',
        'gaMeasurementId' => $s['gaMeasurementId'] ?? '',
        'pricing' => $s['pricing'] ?? []
    ];
    json_response(['success' => true, 'settings' => $safe]);
}

if ($route === 'portfolio' && $method === 'GET') {
    $db = load_db();
    $projects = array_values(array_filter($db['portfolio'] ?? [], fn($p) => ($p['published'] ?? true) !== false));
    usort($projects, fn($a, $b) => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));
    json_response(['success' => true, 'projects' => $projects]);
}

if ($route === 'analytics/track' && $method === 'POST') {
    $body = get_json_body();
    $event = $body['event'] ?? '';
    if (!$event) json_response(['success' => false, 'error' => 'Missing event'], 400);

    $db = load_db();
    if (!isset($db['analytics'])) {
        $db['analytics'] = ['visits' => 0, 'uniqueIps' => [], 'whatsappClicks' => 0, 'quoteRequests' => 0, 'consultationClicks' => 0, 'events' => []];
    }
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'direct';
    if ($event === 'pageview') {
        $db['analytics']['visits'] = ($db['analytics']['visits'] ?? 0) + 1;
        $db['analytics']['uniqueIps'][$ip] = ($db['analytics']['uniqueIps'][$ip] ?? 0) + 1;
    } elseif ($event === 'whatsapp_click') {
        $db['analytics']['whatsappClicks'] = ($db['analytics']['whatsappClicks'] ?? 0) + 1;
    } elseif ($event === 'consultation_click') {
        $db['analytics']['consultationClicks'] = ($db['analytics']['consultationClicks'] ?? 0) + 1;
    }

    array_unshift($db['analytics']['events'], [
        'event' => $event,
        'path' => $body['path'] ?? '/',
        'referrer' => $body['referrer'] ?? 'direct',
        'timestamp' => date('c')
    ]);
    $db['analytics']['events'] = array_slice($db['analytics']['events'], 0, 200);
    save_db($db);
    json_response(['success' => true]);
}

if ($route === 'leads' && $method === 'POST') {
    $body = get_json_body();
    if (!empty($body['honeypot'])) {
        json_response(['success' => true, 'leadId' => 'filtered']);
    }
    $fullName = trim($body['fullName'] ?? '');
    $email = trim($body['email'] ?? '');
    $service = trim($body['service'] ?? 'Site Institucional');
    $projectDetails = trim($body['projectDetails'] ?? '');

    if (!$fullName || !$email || !$projectDetails) {
        json_response(['success' => false, 'error' => 'Nome, e-mail e detalhes do projeto são obrigatórios.'], 400);
    }

    $db = load_db();
    if (!isset($db['leads'])) $db['leads'] = [];
    $newLead = [
        'id' => 'lead_' . time() . '_' . substr(md5(uniqid('', true)), 0, 5),
        'fullName' => $fullName,
        'businessName' => trim($body['businessName'] ?? ''),
        'email' => strtolower($email),
        'phone' => trim($body['phone'] ?? ''),
        'service' => $service,
        'budget' => $body['budget'] ?? 'Sob Consulta',
        'projectDetails' => $projectDetails,
        'status' => 'new',
        'notes' => '',
        'createdAt' => date('c'),
        'ipAddress' => $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    array_unshift($db['leads'], $newLead);
    $db['analytics']['quoteRequests'] = ($db['analytics']['quoteRequests'] ?? 0) + 1;
    save_db($db);

    json_response([
        'success' => true,
        'message' => 'Solicitação recebida com sucesso!',
        'leadId' => $newLead['id']
    ], 201);
}

// -------------------------------------------------------------
// AUTENTICAÇÃO & ROTAS ADMIN
// -------------------------------------------------------------

if ($route === 'auth/login' && $method === 'POST') {
    $body = get_json_body();
    $username = trim($body['username'] ?? '');
    $password = $body['password'] ?? '';
    if (!$username || !$password) {
        json_response(['success' => false, 'error' => 'Usuário e senha são obrigatórios.'], 400);
    }
    $db = load_db();
    $admin = $db['admin'] ?? null;
    if (!$admin || strtolower($username) !== strtolower($admin['username']) || !password_verify($password, $admin['passwordHash'])) {
        json_response(['success' => false, 'error' => 'Credenciais inválidas.'], 401);
    }
    $db['admin']['lastLogin'] = date('c');
    save_db($db);
    $token = create_jwt(['username' => $admin['username'], 'role' => 'admin']);
    json_response(['success' => true, 'token' => $token, 'user' => ['username' => $admin['username']]]);
}

if ($route === 'admin/leads' && $method === 'GET') {
    require_admin();
    $db = load_db();
    $leads = $db['leads'] ?? [];
    $status = $_GET['status'] ?? 'all';
    $search = strtolower(trim($_GET['search'] ?? ''));
    if ($status !== 'all') {
        $leads = array_values(array_filter($leads, fn($l) => ($l['status'] ?? '') === $status));
    }
    if ($search !== '') {
        $leads = array_values(array_filter($leads, function ($l) use ($search) {
            return str_contains(strtolower($l['fullName'] ?? ''), $search)
                || str_contains(strtolower($l['email'] ?? ''), $search)
                || str_contains(strtolower($l['businessName'] ?? ''), $search)
                || str_contains(strtolower($l['service'] ?? ''), $search);
        }));
    }
    json_response(['success' => true, 'leads' => $leads]);
}

if (preg_match('#^admin/leads/([^/]+)$#', $route, $m)) {
    require_admin();
    $id = $m[1];
    $db = load_db();
    $leads = $db['leads'] ?? [];
    if ($method === 'PATCH') {
        $body = get_json_body();
        foreach ($leads as &$lead) {
            if (($lead['id'] ?? '') === $id) {
                if (isset($body['status'])) $lead['status'] = $body['status'];
                if (isset($body['notes'])) $lead['notes'] = $body['notes'];
                $db['leads'] = $leads;
                save_db($db);
                json_response(['success' => true, 'lead' => $lead]);
            }
        }
        json_response(['success' => false, 'error' => 'Lead not found'], 404);
    } elseif ($method === 'DELETE') {
        $db['leads'] = array_values(array_filter($leads, fn($l) => ($l['id'] ?? '') !== $id));
        save_db($db);
        json_response(['success' => true]);
    }
}

if ($route === 'admin/portfolio') {
    require_admin();
    $db = load_db();
    if ($method === 'GET') {
        json_response(['success' => true, 'projects' => $db['portfolio'] ?? []]);
    } elseif ($method === 'POST') {
        $body = get_json_body();
        $proj = array_merge([
            'id' => 'proj_' . time(),
            'published' => true,
            'order' => count($db['portfolio'] ?? []) + 1
        ], $body);
        $db['portfolio'][] = $proj;
        save_db($db);
        json_response(['success' => true, 'project' => $proj], 201);
    }
}

if (preg_match('#^admin/portfolio/([^/]+)$#', $route, $m)) {
    require_admin();
    $id = $m[1];
    $db = load_db();
    $portfolio = $db['portfolio'] ?? [];
    if ($method === 'PUT') {
        $body = get_json_body();
        foreach ($portfolio as &$p) {
            if (($p['id'] ?? '') === $id) {
                $p = array_merge($p, $body, ['id' => $id]);
                $db['portfolio'] = $portfolio;
                save_db($db);
                json_response(['success' => true, 'project' => $p]);
            }
        }
        json_response(['success' => false, 'error' => 'Project not found'], 404);
    } elseif ($method === 'DELETE') {
        $db['portfolio'] = array_values(array_filter($portfolio, fn($p) => ($p['id'] ?? '') !== $id));
        save_db($db);
        json_response(['success' => true]);
    }
}

if ($route === 'admin/settings' && $method === 'PUT') {
    require_admin();
    $body = get_json_body();
    $db = load_db();
    $db['settings'] = array_merge($db['settings'] ?? [], $body);
    save_db($db);
    json_response(['success' => true, 'settings' => $db['settings']]);
}

if ($route === 'admin/analytics' && $method === 'GET') {
    require_admin();
    $db = load_db();
    $a = $db['analytics'] ?? [];
    $leads = $db['leads'] ?? [];
    $totalVisits = $a['visits'] ?? 0;
    $totalLeads = count($leads);
    $conv = $totalVisits > 0 ? number_format(($totalLeads / $totalVisits) * 100, 1) : '0.0';
    $svcDist = [];
    foreach ($leads as $l) {
        $svc = $l['service'] ?? 'Outro';
        $svcDist[$svc] = ($svcDist[$svc] ?? 0) + 1;
    }
    json_response([
        'success' => true,
        'summary' => [
            'totalVisits' => $totalVisits,
            'uniqueVisitors' => count($a['uniqueIps'] ?? []),
            'totalLeads' => $totalLeads,
            'whatsappClicks' => $a['whatsappClicks'] ?? 0,
            'consultationClicks' => $a['consultationClicks'] ?? 0,
            'conversionRate' => "$conv%",
            'serviceDistribution' => $svcDist,
            'statusDistribution' => [
                'new' => count(array_filter($leads, fn($l) => ($l['status'] ?? '') === 'new')),
                'contacted' => count(array_filter($leads, fn($l) => ($l['status'] ?? '') === 'contacted')),
                'negotiating' => count(array_filter($leads, fn($l) => ($l['status'] ?? '') === 'negotiating')),
                'won' => count(array_filter($leads, fn($l) => ($l['status'] ?? '') === 'won')),
                'lost' => count(array_filter($leads, fn($l) => ($l['status'] ?? '') === 'lost')),
            ]
        ],
        'recentEvents' => array_slice($a['events'] ?? [], 0, 50)
    ]);
}

json_response(['success' => false, 'error' => 'Endpoint not found'], 404);
