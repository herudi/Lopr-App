<?php

$app->get('/problem/:uid', function($uid) {
    try {
        $db = getConnection();
        $stmt = $db->query("select * from problem where uid='$uid'");
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($data);
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->get('/userByUid/:uid', function($uid) {
    try {
        $db = getConnection();
        $stmt = $db->query("select * from user where uid='$uid'");
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($data);
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->get('/userOnline', function() {
    try {
        $db = getConnection();
        $stmt = $db->query("select * from user where status='1'");
        $data = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($data);
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/problemInsert', function() use($app) {
    $data = json_decode($app->request()->getBody());
    $sql = "insert into problem values(?,?,?,?)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $data->id);
        $stmt->bindParam(2, $data->uid);
        $stmt->bindParam(3, $data->title);
        $stmt->bindParam(4, $data->problem);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/userInsert', function() use($app) {
    $data = json_decode($app->request()->getBody());
    $sql = "insert into user values(?,?,?,?)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $data->uid);
        $stmt->bindParam(2, $data->displayName);
        $stmt->bindParam(3, $data->picture);
        $stmt->bindParam(4, $data->status);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/userUpdate/:uid', function($uid) use($app) {
    $data = json_decode($app->request()->getBody());
    $sql = "update user set displayName=?,picture=?,status=? where uid=?";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(4, $uid);
        $stmt->bindParam(1, $data->displayName);
        $stmt->bindParam(2, $data->picture);
        $stmt->bindParam(3, $data->status);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/problemUpdate/:id', function($id) use($app) {
    $data = json_decode($app->request()->getBody());
    $sql = "update problem set title=?,problem=? where id=?";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(3, $id);
        $stmt->bindParam(1, $data->title);
        $stmt->bindParam(2, $data->problem);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/status/:uid', function($uid) use($app) {
    $data = json_decode($app->request()->getBody());
    $sql = "update user set status=? where uid=?";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(2, $uid);
        $stmt->bindParam(1, $data->status);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});

$app->post('/problemDelete/:id', function($id) {
    $sql = "delete from problem where id=?";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1, $id);
        $stmt->execute();
    } catch (PDOException $e) {
        echo $e . getMessage();
    }
});