<?php
function validateInput($inp)
{
    $val = trim($inp);
    $val = htmlspecialchars($val, ENT_QUOTES);
    $val = stripslashes($val);
    return $val;
}

function validateInput2($inp)
{
    $val = htmlspecialchars($inp, ENT_QUOTES);

    return $val;
}


function removeSpecialSymbol($string)
{
    $string = str_replace(' ', '', $string); // Replaces all spaces with hyphens.
    $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
    $string = str_replace('-', '', $string);
    return strtolower($string);
}

function my_print($array = "")
{
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

function getUploadReportTitle($rtptype)
{

     switch ($rtptype) {
          case "wellness":
               return "Wellness";

          case "wellness_summary":
               return "Wellness Summary";

          default:
               return null;
     }
}

function validateReportStatus($status)
{
    if (strtolower($status) == strtolower(NOT_APPLICABLE_SYMBOL_CLIENT) || strtolower($status) == strtolower(NOT_APPLICABLE_SYMBOL) || $status == "--") {
        return NOT_APPLICABLE_SYMBOL;
    }
    return $status;
}

function isValidGenotype($genotype)
{
    if ($genotype == "--" || strtolower($genotype) == strtolower(NOT_APPLICABLE_SYMBOL) ||strtoupper($genotype) == strtoupper(NOT_APPLICABLE_SYMBOL_CLIENT)) {
        return false;
    } 
    return true;
}