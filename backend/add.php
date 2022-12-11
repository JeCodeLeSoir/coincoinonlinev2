<?php
$ua = "john doe";

if (isset($_REQUEST['ua'])) {
    $ua = $_REQUEST['ua'];
}

if (!isset($_REQUEST['postdata']) || !isset($_REQUEST['posturl'])) {
    echo "error";
    exit;
}

$postdata = $_REQUEST['postdata'];
$posturl = $_REQUEST['posturl'];

$ua = addslashes($ua);
$postdata = addslashes($postdata);
$ua = htmlspecialchars($ua);
$postdata = htmlspecialchars($postdata);

/* add message in backend.xml */
$site = "http://localhost/FrontCoinCoin/"; // site url
$info = $ua;
$login = "noconnect";
$message = $postdata;

$doc = new DOMDocument();
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

/*
<post time="20221211001254" id="304513">
	<info>sirrus</info>
	<login></login>
	<message>burps  [:jeanpierre decombres] <a href="https://shop.prizmbrewing.com/products/prizm-the-bed">[url]</a></message>
</post>
*/

/* file not exist */
if (!file_exists('backend.xml')) {
    /* create file */
    $root = $doc->createElement('board');
    $root->setAttribute('site', $site);
    $doc->appendChild($root);
    $doc->save('backend.xml');
} else {
    $doc->loadXML(file_get_contents('backend.xml'));
}

/* add message */

$root = $doc->getElementsByTagName('board')->item(0);

$post = $doc->createElement('post');
$post->setAttribute('time', date('YmdHis'));
$post->setAttribute('id', $root->getElementsByTagName('post')->length);
$info = $doc->createElement('info', $info);
$login = $doc->createElement('login', $login);
$message = $doc->createElement('message', $message);

$post->appendChild($info);
$post->appendChild($login);
$post->appendChild($message);

$root->appendChild($post);

$doc->save('backend.xml');