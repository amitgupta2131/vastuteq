import Modal from "./helper/modal.class.js";
import { OBJ_EFFECT } from "./helper/objectEffect.class.js";


$(document).ready(function () {
    let reportData = JSON.parse(localStorage.getItem('objectReport'));
    let objects = JSON.parse(localStorage.getItem('objects'));
    //Print and back buttons
    let buttons = `<div style="position:relative">
                    <button class="btn btn-outline-primary float-right mb-1 btn-sm text-sm pl-3 pr-3" id="rPrint">Print</button>
                    <button class="btn btn-outline-primary float-right mr-2 mb-1 btn-sm text-sm pl-3 pr-3" id="back">Back</button>
                   </div>`;
    let backBtn = `<div style="position:relative">    
                    <button class="btn btn-outline-primary float-right mr-2 mb-1 btn-sm text-sm pl-3 pr-3" id="back">Back</button>
                  </div>`;
    setObjColor();
    //Reports Click Events 
    $('#tab1').on('click', function () {
        setObjColor()
    });
    $('#tab2').on('click', function () {
        setSixteenZoneColor()
    });
    $('#tab3').on('click', function () {
        $('#main-tab-right').empty();
    });
    $('#tab4').on('click', function () {
        objectWiseReport()
    });
    $('#tab5').on('click', function () {
        zoneWiseReport('activity')
    });
    $('#tab6').on('click', function () {
        zoneWiseReport()
    });
    $('#tab7').on('click', function () {
        sixteenZoneColorReport()
    });
    $('#tab8').on('click', function () {
        $('#main-tab-right').empty();
    });
    $('#tab9').on('click', function () {
        $('#main-tab-right').empty();
    });
    $('#tab10').on('click', function () {
        $('#main-tab-right').empty();
    });
    $('#tab10').on('click', function () {
        window.location.href = BASE_URL + 'Main/ayadhi'
    })

    //Object Wise Report
    function objectWiseReport() {
        if (reportData != null && reportData != '') {
            $('#main-tab-right').empty();
            $('#main-tab-right').append(buttons);
            //Creating Report table
            $('#main-tab-right').append('<div id="rtable"></div>')
            let reportTable = `<table class="table table-bordered table-hover mt-2">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Object/Activity Name</th>
                                  <th scope="col">Direction</th>
                                  <th scope="col">Type</th> 
                                  <th scope="col">Object Colour</th>
                                  <th scope="col">Recommended Colour</th>        
                                </tr>
                              </thead>
                              <tbody>`
            let count = 1;
            for (let data of reportData) {
                let type = '';
                objects.map(object => object.image.id == data.id ?
                    type = object.image.type
                    : object)
                let keys = Object.keys(data)
                for (let i = 2; i < keys.length; i++) {
                    if (keys[i] != 'color' && keys[i] != 'recommendedColor') {
                        reportTable += `<tr>
                                <th scope="row">${count++}</th>
                                <td>${data.name}</td>
                                <td>${keys[i]}</td>      
                                <td>${type}</td> 
                                <td>${data.color != undefined ? data.color : ""}</td>
                                <td>${data.recommendedColor != undefined ? data.recommendedColor : ""}</td>
                              </tr>`
                    }
                }
            }
            reportTable += `</tbody></table>`
            //appending table to modal body
            $('#rtable').html(reportTable)
            //adding text area after report table for custom report
            $('#main-tab-right').
                append(`<div class="form-group">
                    <label for="exampleFormControlTextarea1">Recommendation</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>`)
        }
        else {
            showAlert('Add objects and then Select the grid Before generate the report', 'warning')
        }
    }

    //Zone Wise Report
    function zoneWiseReport(objType = 'object') {
        if (reportData != null && reportData != '') {

            $('#main-tab-right').empty();
            $('#main-tab-right').append(buttons);
            //create table for report showing
            $('#main-tab-right').append('<div id="rtable"></div>')
            let div = localStorage.getItem('reportDivision')
            if (div == null || div == "") {
                div = 8;
            }

            let modal = new Modal()
            let directions = modal.getDivData(div)
            let checkArray = [];
            let objArray = [];
            let tableData = [];


            let reportTable = `<table class="table table-bordered table-responsive table-hover mt-2">
                           <thead id="zoneHead">
                           <tr>
                           <th scope="col">#</th>
                           <th scope="col">Objects</th>`
            for (let data of directions) {
                for (let dData of reportData) {
                    let keys = Object.keys(dData)
                    let type = '';
                    objects.map(object => object.image.id == dData.id ?
                        type = object.image.type
                        : object)

                    for (let i = 2; i < keys.length; i++) {
                        if (keys[i] == data.name && type == objType && !checkArray.includes(data.name)) {
                            checkArray.push(data.name)
                            reportTable += `<th>${data.name}</th>`;
                        }
                        if (keys[i] == data.name && type == objType && !objArray.includes(dData.name)) {
                            objArray.push(dData.name)

                        }
                        if (keys[i] == data.name && type == objType) {
                            let effect = getEffect(dData.name, data.name);
                            tableData.push({ name: dData.name, direction: data.name, effect: effect })

                        }
                    }
                }
            }

            console.log(checkArray)
            reportTable += `</tr>
                       </thead>
                       <tbody>`
            let count = 1;
            if (checkArray.length > 0) {
                for (let obj of objArray) {
                    reportTable += `<tr>
                          <th scope="row">${count++}</th>
                          <td>${obj}</td>`
                    for (let i = 0; i < checkArray.length; i++) {
                        let flag = true;
                        for (let j = 0; j < tableData.length; j++) {
                            if (obj == tableData[j].name && checkArray[i] == tableData[j].direction && tableData[j].effect != '') {
                                reportTable += `<td>${tableData[j].effect}</td>`;
                                flag = false;
                            }
                        }
                        if (flag) {
                            reportTable += `<td></td>`
                        }
                    }
                    reportTable += `</tr>`
                }
            } else {
                reportTable += `<tr><td class="text-center" colspan="2">No ${objType} found</td></tr>`
            }
            reportTable += `</tbody></table>`
            //Append report table to modal body

            $('#rtable').html(reportTable)
            //Append text area after report table for any custom information
            if (checkArray.length > 0) {
                $('#main-tab-right').
                    append(`<div class="form-group">
                    <label for="exampleFormControlTextarea1">Recommendation</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>`)
            }

        } else {
            showAlert('Add objects and then Select the grid Before generate the report', 'danger')
        }
    }

    //Get 16 Zone Object/Activity Effects
    function getEffect(obj, dir) {
        let effects;
        OBJ_EFFECT.map(object => object.objName == obj ?
            object.effect.map(object1 => object1.direction == dir ?
                effects = object1.effect
                : '')
            : '');
        return effects != undefined ? effects : "";
    }

    //Set object Colors
    function setObjColor() {
        if (reportData != null && reportData != '') {
            $('#main-tab-right').empty();
            $('#main-tab-right').append(backBtn);

            //creating object color selection box
            let objColor = `<div class="form-group">
                        <select class="form-control objColor" >
                          <option>Red</option>
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Orange</option>
                          <option>Black</option>
                        </select>
                      </div>`

            //Creating Report table
            $('#main-tab-right').append('<div id="rtable"></div>')
            let reportTable = `<table id="colorTable" class="table table-bordered table-hover mt-2">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Object/Activity Name</th>                            
                                  <th scope="col">Type</th> 
                                  <th scope="col">Object Colour</th>
                                  <th scope="col">Recommended Colour</th>        
                                </tr>
                              </thead>
                              <tbody>`
            let count = 1;
            for (let data of reportData) {
                let type = '';
                objects.map(object => object.image.id == data.id ?
                    type = object.image.type
                    : object)

                reportTable += `<tr>
                                <th scope="row">${count++}</th>
                                <td>${data.name}</td>                              
                                <td>${type}</td> 
                                <td>${objColor}</td>
                                <td>${objColor}</td>
                              </tr>`
            }

            reportTable += `</tbody></table>`
            //appending table to modal body
            $('#rtable').html(reportTable)
            $('#rtable').append(`<button class="btn btn-primary" id="setColor" data-dismiss="modal" aria-label="Close" style="float:right">Set</button>`)


        }
        else {
            showAlert('Sorry, There is no object please add object first', 'danger')
        }
    }

    //Set 16 Zone color
    function setSixteenZoneColor() {

        var formData = new FormData();
        formData.append('grid', 'sixteen');
        var url = BASE_URL + "/Main/getGridData";
        AjaxPost(formData, url, sixteenZonesuccess, AjaxError);

        function sixteenZonesuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            $('#main-tab-right').empty();
            $('#main-tab-right').append(backBtn);
            $('#main-tab-right').append('<div id="rtable"></div>')
            let objColor = `<div class="form-group mb-0">
                            <select class="form-control objColor" >
                              <option>Red</option>
                              <option>Blue</option>
                              <option>Green</option>
                              <option>Orange</option>
                              <option>Black</option>
                            </select>
                          </div>`
            let reportTable = `<table id="colorTable" class="table table-bordered table-hover mt-2">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Direction Name</th>                            
                                      <th scope="col">Direction Short Name</th> 
                                      <th scope="col">Colour</th>                                  
                                    </tr>
                                  </thead>
                                  <tbody>`
            let count = 1;
            for (let data of result) {

                reportTable += `<tr>
                                    <th scope="row">${count++}</th>
                                    <td>${data.zone}</td>                              
                                    <td>${data.shortName}</td> 
                                    <td>${objColor}</td>                          
                                  </tr>`
            }

            reportTable += `</tbody></table>`
            //appending table to modal body
            $('#rtable').html(reportTable)
            $('#rtable').append(`<button class="btn btn-primary" id="set16ZoneColor" data-dismiss="modal" aria-label="Close" style="float:right">Set</button>`)


        }



    }

    //16 zone color report
    function sixteenZoneColorReport() {
        var formData = new FormData();
        formData.append('id', localStorage.getItem('selectedMapId'));
        var url = BASE_URL + "/Main/getSixteenZoneData";
        AjaxPost(formData, url, sixteenZonesuccess, AjaxError);

        function sixteenZonesuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            var userColors = JSON.parse(result.userColors[0].colors)
            if (userColors.length > 0) {
                $('#main-tab-right').empty();
                $('#main-tab-right').append(buttons);
                $('#main-tab-right').append('<div id="rtable"></div>')
                let reportTable = `<table id="colorTable" class="table table-bordered table-hover mt-2">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Zone</th>                            
                                      <th scope="col">Primary Colour</th> 
                                      <th scope="col">Effect</th>  
                                      <th scope="col">Recommended Colour</th>                                
                                    </tr>
                                  </thead>
                                  <tbody>`
                let count = 1;
                for (let data of result.zoneData) {
                    for (let data1 of userColors) {
                        if (data1.shortName == data.name) {
                            reportTable += `<tr>
                                    <th scope="row">${count++}</th>
                                    <td>${data.name}</td>                              
                                    <td>${data1.color}</td> 
                                    <td>${data.attribute}</td>  
                                    <td>${data.mainColor}</td>                          
                                </tr>`
                        }
                    }
                }

                reportTable += `</tbody></table>`
                //appending table to modal body
                $('#rtable').html(reportTable)
            } else {
                showAlert('Please define colors for 16 zone', 'warning')
            }
        }
    }

    $('#main-tab-right').on('click', '#set16ZoneColor', function () {
        let dataArray = [];
        $('#main-tab-right table tbody tr').each(function () {
            let name = $(this).find('td:eq(1)').html();
            let color = $(this).find('td:eq(2)').find('option:selected').html();
            dataArray.push({ shortName: name, color: color });
        });

        var formData = new FormData();
        formData.append('mapId', localStorage.getItem('selectedMapId'));
        formData.append('data', JSON.stringify(dataArray));
        var url = BASE_URL + "/Main/saveSixteenZoneColorData";
        AjaxPost(formData, url, sixteenZoneSavesuccess, AjaxError);

        function sixteenZoneSavesuccess(content, targetTextarea) {
            let result = JSON.parse(content);
            if (result[0] == 'success') {
                showAlert(result[1], 'success')
            } else {
                showAlert(result[1], 'danger')
            }
        }
        setTimeout(function () { window.location.reload(); }, 1000);
    })

    $('#main-tab-right').on('click', '#setColor', function () {

        //creating report data with color
        let colorArr = [];
        let newReportData = [];
        $('#main-tab-right #rtable table tbody tr').each(function () {
            let name = $(this).find('td:eq(0)').html();
            let color = $(this).find('td:eq(2)').find('option:selected').html();
            let recomColor = $(this).find('td:eq(3)').find('option:selected').html();
            colorArr.push({ name: name, color: color, recommendedColor: recomColor });
        });
        for (let i = 0; i < colorArr.length; i++) {
            newReportData.push($.extend({}, reportData[i], colorArr[i]));
        }

        console.log(newReportData)
        //update data in localstorage
        localStorage.removeItem('objectReport')
        localStorage.setItem('objectReport', JSON.stringify(newReportData))

        //update Report data in database
        console.log(localStorage.getItem('selectedMapId'))
        var formData = new FormData();
        formData.append('id', localStorage.getItem('selectedMapId'));
        formData.append('reportData', JSON.stringify(newReportData));
        var url = BASE_URL + "/Main/updateReportData";
        AjaxPost(formData, url, updateReportDatasuccess, AjaxError);

        function updateReportDatasuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            showAlert(result[1], result[0]);
        }
        setTimeout(function () { window.location.reload(); }, 1000);

    })

    $('#main-tab-right').on('click', '#rPrint', () => {
        $('.b-right').css('display', 'none');
        window.print();
        $('.b-right').css('display', 'flex');
    });

    $('#back').on('click', function () {
        var str = document.referrer;
        var res = str.match(/importMap/g);
        if (res) {
            // let dashboard = new dashboard();
            let id = localStorage.getItem('selectedMapId');
            window.location.href = BASE_URL + '/Main/draw/' + btoa(id);
        } else {
            window.history.back();
        }
    })
});