<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$database = 'taban_sgdc';
$user = 'taban_sgdc';
$pass = 'Guadalajara1';
$host = '192.185.131.184';
$dir = dirname(__FILE__) . '/dump.sql';
echo "<h3>Backing up database to `<code>{$dir}</code>`</h3>";
exec("mysqldump --single-transaction --user={$user} --password={$pass} --host={$host} {$database} --result-file={$dir} 2>&1", $output);
var_dump($output);