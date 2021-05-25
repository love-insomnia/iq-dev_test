<?php
header("Content-Type: application/json; charset=UTF-8");

$result = 0;

$depositMonth = explode('.', $_POST['depositDate'])[1];
$depositYear = explode('.', $_POST['depositDate'])[2];

$quantityDaysInMonth = cal_days_in_month(CAL_GREGORIAN, $depositMonth, $depositYear);

$depositSum = $_POST['depositSum'];
$depositTerm = $_POST['depositTerm'];
$depositReplenishment = $_POST['depositReplenishment'];
$replenishmentSum = $_POST['replenishmentSum'];


$quantityDaysInYear = 0;

for ($i = 1; $i <= 12; $i++) {
    $quantityDaysInYear += cal_days_in_month(CAL_GREGORIAN, $i, $depositYear);
}

switch ($depositReplenishment) {
    case 'yes':
        $result = $depositSum + ($depositSum + $replenishmentSum) * $quantityDaysInMonth * (0.1 / $quantityDaysInYear);
        break;

    case 'no':
        $result = $depositSum + $depositSum * $quantityDaysInMonth * (0.1 / $quantityDaysInYear);
        break;
}

echo round($result);


