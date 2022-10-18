<?php
$start = microtime(true);

function validate_num($x){
    return isset($x) && is_numeric($x);
}

function in_interval($x, $l, $r){
    return $x >= $l && $x <= $r;
}

function check_up_right($x, $y, $r){
    return ($x >=0 && $y >= 0 && $x <= $r/2 && $y <= $r);
}

function check_up_left($x, $y, $r){
    return ($x <= 0 && $y >=0 && ($x*$x + $y*$y) <= $r*$r);
}

function check_down_left($x, $y, $r){
    return ($x <= 0 && $x >= -$r/2 && $y >= -$x - $r/2);
}

$X = $_GET["x"];
$Y = $_GET["y"];
$R = $_GET["r"];

if (validate_num($X) && validate_num($Y) && validate_num($R) &&
    in_interval($X, -5, 3) && in_interval($Y, -3, 5) && in_interval($R, 1, 3)){
    $hit = check_up_right($X, $Y, $R) || check_up_left($X, $Y, $R) || check_down_left($X, $Y, $R);
    $hit_str = $hit ? "Hit" : "Miss";
}
else{
    echo "invalid request";
    return;
}

$w_time = microtime(true) - $start;
$time = date('H:i:s', time() - $_GET['t'] * 60);

$response = array('x' => $X, 'y' => $Y, 'r' => $R, 'hit' => $hit_str, 't' => $time, 'wt' => sprintf('%f', round($w_time, 7)));

/*$response = "<tr>";
$response .= "<td>" . $X . "</td>" ;
$response .= "<td>" . $Y . "</td>" ;
$response .= "<td>" . $R . "</td>" ;
$response .= "<td>" . $hit_str . "</td>";
$response .= "<td>" . $time . "</td>";
$response .= "<td>" . sprintf('%f', round($w_time, 7)) . "</td>";
$response .= "</tr>";*/

echo json_encode($response);

?>