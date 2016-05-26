<?php
require 'Slim/Slim.php';
include './config.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->response()->headers->set('Access-Control-Allow-Headers', 'Content-Type');
$app->response()->headers->set('Content-Type', 'application/json');
$app->response()->headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
$app->response()->headers->set('Access-Control-Allow-Origin', '*');
foreach (glob("./model/*.php") as $model) {
    include $model;
}
$app->run();
