<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . "/PHPMailer/src/Exception.php";
require __DIR__ . "/PHPMailer/src/PHPMailer.php";
require __DIR__ . "/PHPMailer/src/SMTP.php";

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Метод не поддерживается"], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim($_POST["name"] ?? "");
$tel = trim($_POST["tel"] ?? "");
$service = trim($_POST["service"] ?? "");

if ($name === "" || $tel === "" || $service === "") {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Заполните все поля"], JSON_UNESCAPED_UNICODE);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->Host = "smtp.mail.ru";
    $mail->Port = 465;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

    $mail->Username = "toni-wheel@inbox.ru";
    $mail->Password = "67CFYMMhLCQdaAB9e3Zw";

    $mail->setFrom("toni-wheel@inbox.ru", "Заявка с сайта");
    $mail->addAddress("toni-wheel@inbox.ru");

    $mail->isHTML(true);
    $mail->Subject = "Новая заявка с сайта";

    $body = "
        <h3>Новая заявка</h3>
        <p><strong>Имя:</strong> " . htmlspecialchars($name, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Телефон:</strong> " . htmlspecialchars($tel, ENT_QUOTES, "UTF-8") . "</p>
        <p><strong>Услуга:</strong> " . htmlspecialchars($service, ENT_QUOTES, "UTF-8") . "</p>
    ";

    $mail->Body = $body;

    $mail->AltBody =
        "Новая заявка\n\n" .
        "Имя: {$name}\n" .
        "Телефон: {$tel}\n" .
        "Услуга: {$service}\n";

    $mail->send();

    echo json_encode(["status" => "success", "message" => "Заявка отправлена"], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    file_put_contents(
        __DIR__ . "/mail-error.log",
        "[" . date("Y-m-d H:i:s") . "] " . $mail->ErrorInfo . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка отправки"], JSON_UNESCAPED_UNICODE);
}
