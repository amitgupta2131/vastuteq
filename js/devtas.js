var devtaNameData = [
    'ROGA', "NAGA", 'MUKHYA', 'BHALLAT', 'SOMA', 'BHUJANG', 'ADITI', 'DITI', 'SHIKHI',
    'PAPYAKSHMA', 'RUDRA', 'MUKHYA', 'BHUDHAR', 'BHUDHAR', 'BHUDHAR', 'ADITI', 'AAPAHA', 'PARJANYA',
    'SHOSHA', 'SHOSHA', 'RAJYAKSHAMA', 'BHUDHAR', 'BHUDHAR', 'BHUDHAR', 'AAPVATSA', 'JAYANT', 'JAYANT',
    'ASUR', 'MITRA', 'MITRA', 'BRAHMA', 'BRAHMA', 'BRAHMA', 'ARYAMA', 'ARYAMA', 'MAHENDRA',
    'VARUNA', 'MITRA', 'MITRA', 'BRAHMA', 'BRAHMA', 'BRAHMA', 'ARYAMA', 'ARYAMA', 'SURYA',
    'PUSHPDANTA', 'MITRA', 'MITRA', 'BRAHMA', 'BRAHMA', 'BRAHMA', 'ARYAMA', 'ARYAMA', 'SATYA',
    'SUGRIVA', 'SUGRIVA', 'JAYA', 'VIVASVAN', 'VIVASVAN', 'VIVASVAN', 'SAVITA', 'BHRISHA', 'BHRISHA',
    'DAUVARIKA', 'INDRA', 'BHRINGRAJ', 'VIVASVAN', 'VIVASVAN', 'VIVASVAN', 'VITHATHA', 'SAVITRA', 'NABH',
    'PITRA GANA', 'MRIGHA', 'BHRINGRAJ', 'GANDHARVA', 'YAMA', 'GRIHAKSHAT', 'VITHATHA', 'PUSHA', 'ANIL'
];

var yellow = ['PAPYAKSHMA', 'ADITI', 'DITI', 'PARJANYA', 'JAYANT', 'MAHENDRA', 'BHRISHA', 'GRIHAKSHAT', 'MRIGHA', 'BRAHMA'];

var red = ['ROGA', 'RUDRA', 'NAGA', 'RAJYAKSHAMA', 'MUKHYA', 'SHIKHI', 'SURYA', 'SAVITA', 'PUSHA', 'GANDHARVA', 'INDRA', 'PITRA GANA', 'DAUVARIKA', 'PUSHPDANTA', 'BHUDHAR'];

var blue = ['SHOSHA', 'BHALLAT', 'BHUJANG', 'ARYAMA', 'NABH', 'ANIL', 'BHRINGRAJ', 'YAMA'];



let devtaContainer = d3.select('.leftside');

for (let i = 0; i < devtaNameData.length; i++) {

    let btns = devtaContainer.append('button').attr('class', 'devta-btn bubbly-button')
        .attr('devta-name', devtaNameData[i]).text(devtaNameData[i]);

    if (yellow.includes(devtaNameData[i].toUpperCase())) {
        btns.style('background-color', '#fff446').style('color', 'black');
    }
    else if (red.includes(devtaNameData[i].toUpperCase())) {
        btns.style('background-color', '#df4742').style('color', 'white');
    }
    else if (blue.includes(devtaNameData[i].toUpperCase())) {
        btns.style('background-color', '#1290c3').style('color', 'white');
    }

}

$('.devta-btn').click(function () {
    let devtaName = d3.select(this).attr("devta-name");
    var formData = new FormData();
    formData.append('name', devtaName);
    console.log(devtaName)
    var url = BASE_URL + "/Main/getDevta";
    AjaxPost(formData, url, devtaSuccess, AjaxError); 
    
})
function devtaSuccess(content, targetTextarea) {
    var result = JSON.parse(content);
    result = result[0];
    console.log(result)
    var table = JSON.parse(result['otherDetails']);
    var points = JSON.parse(result['points']);
    var desc = JSON.parse(result['description']);
    console.log(result);
    $('#appModal').modal('show');
    $('#devtaTitle').text(result['name']);
    $('#devta-img').attr('src', BASE_URL + result['image']);
    $('#devta-name').text(table.name);
    $('#devta-direction').text(table.direction);
    $('#devta-color').text(table.color);
    $('#devta-sloka').text(result['sloka']);
    $('#devta-description').text(desc.p1);
    $('#other-details').empty()
    for (let i in points) {
        $('#other-details').append(`<li>${points[i]}</li>`)
    }
}

$('#backbtn').on('click',function(){    
    console.log(document.referrer)
    var str = document.referrer;
    var res = str.match(/importMap/g);
    console.log(res)
    if (res) {
        // let dashboard = new dashboard();
        let id = localStorage.getItem('selectedMapId');
        window.location.href = BASE_URL + '/Main/draw/' + btoa(id);
    } else {
        window.history.back();
    }
})

