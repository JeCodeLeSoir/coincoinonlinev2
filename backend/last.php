<?php

/* content type xml */

//header('Content-Type: text/xml');

header('Content-Type: text/plain; charset=utf-8');

$last_id = $_GET['last'];

/* load backend.xml */

$doc = new DOMDocument();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

if (!file_exists('backend.xml')) {
    /* create file */
    exit('error');
} else {
    $doc->loadXML(file_get_contents('backend.xml'));
}

/* get last message */

$root = $doc->getElementsByTagName('board');
$site = $root->item(0)->getAttribute('site');

$root = $doc->getElementsByTagName('post');
$length = $root->length;

$_doc = new DOMDocument();
$_doc->preserveWhiteSpace = false;
$_doc->formatOutput = true;

$_root = $_doc->createElement('board');
$_root->setAttribute('site', $site);
$_doc->appendChild($_root);

for ($i = $last_id + 1; $i < $length; $i++) {
    $post = $root->item($i);

    $id = $post->getAttribute('id');
    $time = $post->getAttribute('time');

    $info = $post->getElementsByTagName('info')->item(0)->nodeValue;
    $login = $post->getElementsByTagName('login')->item(0)->nodeValue;
    $message = $post->getElementsByTagName('message')->item(0)->nodeValue;


    $_post = $_doc->createElement('post');
    $_post->setAttribute('time', $time);
    $_post->setAttribute('id', $id);

    $_info = $_doc->createElement('info', $info);
    $_login = $_doc->createElement('login', $login);
    $_message = $_doc->createElement('message', $message);

    $_post->appendChild($_info);
    $_post->appendChild($_login);
    $_post->appendChild($_message);


    $_root->appendChild($_post);
}

echo $_doc->saveXML();