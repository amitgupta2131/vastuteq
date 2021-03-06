
import Template from './helper/template.class.js';

d3.select("[name='dimension-unit']").on('change', function () {
    let unit = d3.select(this).property('value');
    d3.selectAll('.unit-text').text(unit);
})

let ownerNakshatraSelect = d3.select('[name="owner-nakshatra"]');

let ownerNakshatraData = [
    { text: "Ashwini", value: 1 }, { text: "Bharini", value: 2 }, { text: "kritika", value: 3 },
    { text: "Rohini", value: 4 }, { text: "Mrigshira", value: 5 }, { text: "Ardra", value: 6 },
    { text: "Punarvasu", value: 7 }, { text: "Pushva", value: 8 }, { text: "Ashlesha", value: 9 },
    { text: "Magha", value: 10 }, { text: "Poorva Falguni", value: 11 }, { text: "Uttar Falguni", value: 12 },
    { text: "Hasta", value: 13 }, { text: "Chitra", value: 14 }, { text: "Swati", value: 15 },
    { text: "Vishakha", value: 16 }, { text: "Anuradha", value: 17 }, { text: "Jyeshtha", value: 18 },
    { text: "Mool", value: 19 }, { text: "Poorvashadha", value: 20 }, { text: "Uttarashadha", value: 21 },
    { text: "Shravan", value: 22 }, { text: "Dhanishtha", value: 23 }, { text: "Shatbhisha", value: 24 },
    { text: "Poorva Bhadrapad", value: 25 }, { text: "Uttara Bhaprapad", value: 26 }, { text: "Revati", value: 0 }
];

let parvayNakshatra = [
    { text: "Janm", value: 1 }, { text: "Sampat", value: 2 }, { text: "Vipat", value: 3 },
    { text: "Kshem", value: 4 }, { text: "Pratyari", value: 5 }, { text: "Sadhak", value: 6 },
    { text: "Vadhak", value: 7 }, { text: "Mitra", value: 8 }, { text: "Param Mitra", value: 9 },
    
];


let options = ownerNakshatraSelect.selectAll("option")
    .data(ownerNakshatraData)
    .enter()
    .append("option")
    .attr("class", "text-uppercase text-sm");

options.text(function (d) {
    return d.text;
})
    .attr("value", function (d) {
        return d.value;
    });

    d3.select('.calculate-btn').on('click', () => {

        
        let realLength, realBreadth, length, breadth, hasta,aayadiValue, siUnit, reportType, reportContainer,jatakNakshatra;
        reportType = $('input[type=radio]:checked').val();
        realLength = d3.select('[name="length"]').property('value');
        realBreadth = d3.select('[name="breadth"]').property('value');
        if (realLength <= 0 || realBreadth <=0) {
            showAlert("Please enter positive values in Length and Breadth Field", 'danger');
            return false;
        }
        siUnit = d3.select("[name='dimension-unit']").property('value')
        hasta = d3.select('[name="hasta"]').property('value');
        jatakNakshatra = parseInt(d3.select("[name='owner-nakshatra']").property('value'));
        
    
    
        if (realLength == "" || realBreadth == "" || hasta == "" || siUnit == "") {
            showAlert("Please provide all details", 'danger');
            return false;
    
        } else {
            length = parseFloat(convertIntoFeet(realLength, siUnit));
            breadth = parseFloat(convertIntoFeet(realBreadth, siUnit));
            hasta = parseFloat(convertIntoFeet(hasta, "inch"));
            aayadiValue = aayadi(length, breadth, hasta);
            let aayu = (aayadiValue * 27) % 100;
            let rem = {
                aaya:  (aayadiValue * 8) % 12, //calculateAaya(length, breadth, hasta, siUnit),
                vyaya: (aayadiValue * 9) % 10, //calculateVyaya(length, breadth, hasta, siUnit),
                amsha: (aayadiValue * 4) % 9,  //calculateAmsha(length, breadth, hasta, siUnit),
                yoni:  (aayadiValue * 3) % 8,  //calculateYoni(length, breadth, hasta, siUnit),
                vara:  (aayadiValue * 9) % 7,  //calculateVara(length, breadth, hasta, siUnit),
                tithi: (aayadiValue * 9) % 30,//calculateTithi(length, breadth, hasta, siUnit),
                aayu:  (aayadiValue * 27) % 100,
                nakshatra: calculateNakshatra(aayadiValue,jatakNakshatra)
            }
            //calling ajax to fetch result data from database
            var formData = new FormData();
            formData.append('remainders', JSON.stringify(rem));
            var url = BASE_URL + "/Main/getAyadhiResult";
            AjaxPost(formData, url, ayadhiSuccess, AjaxError);
    
            function ayadhiSuccess(content, targetTextarea) {
                let result = JSON.parse(content);
                console.log("res",result);
                if (result != "") {
                    if(reportType == 'detailed'){
                    reportContainer = d3.select('.display-report-area').classed('text-center', false).html(Template.aayadiDetailedReport(
                        realLength,
                        realBreadth,
                        siUnit,
                        result,
                        aayu
    
                    ));
                    }else{
                        reportContainer = d3.select('.display-report-area').classed('text-center', false).html(Template.aayadiSummeryReport(
                            realLength,
                            realBreadth,
                            siUnit,
                            result,
                            aayu
        
                        ));
                    }
    
                } else {
                    showAlert("Someting Wrong Contact to IT", 'danger')
                }
                return JSON.parse(content)
            }
    
    
            console.log("Everthing in Feet :");
            console.log("length: ", length, " | breadth: ", breadth, " | hasta: ", hasta, " | siUnit: ", siUnit);
        }
    })

// function getCircum(length, breadth) {
//     return 2 * (length + breadth);
// }

// function calculateAaya(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 8) % 12;   
    
//     return result;
// }

// function calculateAmsha(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 4) % 9;    
//     return result;
// }

// function calculateVyaya(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 9) % 10;    
//     return result;
// }

// function calculateYoni(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 3) % 8;    
//     return result;
// }

// function calculateVara(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 9) % 7;   
//     return result;
// }

// function calculateTithi(length, breadth, hasta) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 9) % 30;    
//     return result;
// }

// function calculateAayadiNakshatra(length, breadth, hasta,jatakNakshatra) {
//     let circumference = getCircum(length, breadth);
//     let aayadi = Math.round(circumference / hasta);
//     let result = (aayadi * 8) % 27;    
// }

function aayadi(length, breadth, hasta){
    return Math.round(2*(length+breadth) / hasta);
}

function calculateNakshatra(aayadiValue, jatakNakshatra){
    let temp = 0;
    aayadiValue = parseInt(aayadiValue)*8%27;
    
    if (jatakNakshatra>aayadiValue) {
    //if Jatak nakshatra comes after Aayadi Nakshatra then count till end
    //end then from start till Aayadi Nakshatra
        temp = 27-jatakNakshatra+1+aayadiValue;
    }
    else {
     //Count from Jatak Nakshatra to Aayadi Nakshatra   
        temp = aayadiValue-jatakNakshatra+1;
    }
    return temp % 9;    

}
function convertIntoFeet(value, siUnit) {
    if (siUnit === "inch") {
        return value / 12;
    } else if (siUnit == "meter") {
        return value * 3.281;
    } else if (siUnit == "yard") {
        return value * 3;
    } else if (siUnit == "feet") {
        return value;
    }
}



