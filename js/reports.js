import Modal from "./helper/modal.class.js";
import { OBJ_EFFECT } from "./helper/objectEffect.class.js";
import { DEVTAS } from "./helper/directiondetails.class.js";


$(document).ready(function () {
    let reportData = JSON.parse(localStorage.getItem('objectReport'));
    let objects = JSON.parse(localStorage.getItem('objects'));
    let mapId = localStorage.getItem('selectedMapId');
    let div = localStorage.getItem('reportDivision')

    //Print and back buttons
    let buttons = `<div class="col-sm-3 row" style="position:relative">
                    <button class="btn col-sm-5 btn-outline-primary float-right mb-1 btn-sm text-sm pl-3 pr-3" id="rPrint">Print</button>
                    <button class="btn col-sm-5 btn-outline-primary float-right mb-1 ml-1 btn-sm text-sm pl-3 pr-3" id="back">Back</button>
                   </div>`;
    let backBtn = `<div style="position:relative">    
                    <button class="btn btn-outline-primary float-right mr-2 mb-1 btn-sm text-sm pl-3 pr-3" id="back">Back</button>
                  </div>`;
    mainGateEntry();
    $('#main-tab-right').addClass('flag');
    //Reports Click Events 
    $('#tab1').on('click', function () {
        setObjColor()
    });
    $('#tab3').on('click', function () {
        $('#main-tab-right').empty();
        mainGateEntry();
        $('#main-tab-right').addClass('flag');
    });
    $('#tab4').on('click', function () {
        $('#main-tab-right').empty();
        objectWiseReport()
        $('#main-tab-right').addClass('flag');
    });
    $('#tab5').on('click', function () {
        $('#main-tab-right').empty();
        zoneWiseReport('activity')
        $('#main-tab-right').addClass('flag');
    });
    $('#tab6').on('click', function () {
        $('#main-tab-right').empty();
        zoneWiseReport()
        $('#main-tab-right').addClass('flag');
    });
    $('#tab7').on('click', function () {
        $('#main-tab-right').empty();
        sixteenZoneColorReport()
        $('#main-tab-right').addClass('flag');
    });
    $('#tab8').on('click', function () {
        $('#main-tab-right').empty();
        consultantReport();
        $('#main-tab-right').addClass('flag');
    });
    $('#tab9').on('click', function () {
        $('#main-tab-right').empty();
        $('#main-tab-right').removeClass('flag');
        mainGateEntry();
        objectWiseReport();
        zoneWiseReport('activity');
        zoneWiseReport();
        sixteenZoneColorReport();
        consultantReport();

    });
    $('#tab10').on('click', function () {
        window.location.href = BASE_URL + 'Main/ayadhi'
    })

    //Object Wise Report
    function objectWiseReport() {
        if (reportData != null && reportData != '') {
            getHouseMAp().then(resolve => {

                $('#main-tab-right').append('<div id="rtable"></div>')
                let data = JSON.parse(resolve)[1][0];
                let reportHeader = `
                <div class="card rheader">
                    <div class="card-header row m-0">
                        <div class="col-sm-9"></div>${buttons}
                    </div>
                    <div class="card-body row m-0">
                    <img src="${BASE_URL + 'assets/images/logoCropedTop.jpg'}" alt="Vastuteq" width="100">
                    <div class="col-sm-10 row p-0 m-0 ml-auto mr-auto">
                            <div class="row m-0 col-sm-12 p-0">
                                <div class="col-sm-12"><h1 class="text-center">${data.firstName}</h1></div>
                                <div class="col-sm-12"><h6 class="text-center" style="font-size:0.8rem"><span>Address : </span><span>${data.address} </span>
                                <span>Mobile : ${data.mobileNo} </span><span>Email : ${data.email} <span></h6></div>
                            
                        </div> 
                        </div>
                                               
                    </div>

                    <div class="col-sm-12 row m-0">
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Client Name :  </div><div class="col-sm-6 pl-0">${data.clientName}</div></div>
                            <div class="col-sm-6"></div>
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Building Address :  </div><div class="col-sm-6 pl-0">${data.propertyAddress}</div></div>                            
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Degree from north :  </div><div class="col-sm-6 pl-0">${data.degree}</div></div>
                </div>`;

                let reportTable = `<div class="card">
                                    <div class="card-header row m-0">
                                   <h5 class="col-sm-9"> Object/Activity Wise Report </h5>
                                        
                                    </div>
                                    <div class="card-body">
                                    
                <table class="table table-bordered table-hover mt-2">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Object/Activity Name</th>
                                  <th scope="col">Direction</th>
                                  <th scope="col">Type</th>                                          
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
                                
                              </tr>`
                        }
                    }
                }

                reportTable += `</tbody></table>      
                <div class="form-group col-sm-12 p-0">
                    <label for="exampleFormControlTextarea1">Recommendation</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                
                </div>
                </div>`
                //appending table to modal body 
                let disclaim = disclaimer();
                $('#rtable').append(reportHeader);
                $('#rtable').append(reportTable);
                $('#rtable').append(disclaim);

            });
        }
        else {
            showAlert('Add objects and then Select the grid Before generate the report', 'warning')
        }

    }

    //Zone Wise Report
    function zoneWiseReport(objType = 'object') {

        if (reportData != null && reportData != '') {
            getHouseMAp().then(resolve => {

                $('#main-tab-right').append('<div id="rtable"></div>')
                let data = JSON.parse(resolve)[1][0];
                let checkArray = [];
                let objArray = [];
                let tableData = [];
                let div = localStorage.getItem('reportDivision')
                if (div == null || div == "") {
                    div = 8;
                }
                let modal = new Modal()
                let directions = modal.getDivData(div)

                let reportHeader = `
                <div class="card rheader">
                    <div class="card-header row m-0">
                        <div class="col-sm-9"></div>${buttons}
                    </div>
                    <div class="card-body row m-0">
                    <img src="${BASE_URL + 'assets/images/logoCropedTop.jpg'}" alt="Vastuteq" width="100">
                    <div class="col-sm-10 row p-0 m-0 ml-auto mr-auto">
                            <div class="row m-0 col-sm-12 p-0">
                                <div class="col-sm-12"><h1 class="text-center">${data.firstName}</h1></div>
                                <div class="col-sm-12"><h6 class="text-center" style="font-size:0.8rem"><span>Address : </span><span>${data.address} </span>
                                <span>Mobile : ${data.mobileNo} </span><span>Email : ${data.email} <span></h6></div>
                            
                        </div> 
                        </div>
                                               
                    </div>

                    <div class="col-sm-12 row m-0">
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Client Name :  </div><div class="col-sm-6 pl-0">${data.clientName}</div></div>
                            <div class="col-sm-6"></div>
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Building Address :  </div><div class="col-sm-6 pl-0">${data.propertyAddress}</div></div>                            
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Degree from north :  </div><div class="col-sm-6 pl-0">${data.degree}</div></div>
                </div>`;

                let reportTable = `<div class="card">
                                    <div class="card-header row m-0">
                                    <h5 class="col-sm-9"> Zone ${objType} Report </h5>
                                       
                                    </div>
                                    <div class="card-body">
                                    
                                    <table class="table table-bordered table-hover mt-2">
                                    <thead id="zoneHead">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Direction</th>
                                    <th>Object</th>
                                    <th>Effect</th>
                                    `
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

                reportTable += `</tr>
                                </thead>
                                <tbody>`
                let count = 1;
                if (checkArray.length > 0) {
                    for (let obj of tableData) {
                        reportTable += `<tr>
                                   <th scope="row">${count++}</th>
                                   <td>${obj.direction}</td>
                                   <td>${obj.name}</td>
                                   <td>${obj.effect}</td>`
                        reportTable += `</tr>`
                    }
                } else {
                    reportTable += `<tr><td class="text-center" colspan="2">No ${objType} found</td></tr>`
                }
                reportTable += `</tbody></table>      
                <div class="form-group col-sm-12 p-0">
                    <label for="exampleFormControlTextarea1">Recommendation</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                
                </div>
                </div>`
                //appending table to modal body                
                let disclaim = disclaimer();
                $('#rtable').append(reportHeader);
                $('#rtable').append(reportTable);
                $('#rtable').append(disclaim);
            });

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

    //16 zone color report
    function sixteenZoneColorReport() {
        var formData = new FormData();
        formData.append('id', mapId);
        var url = BASE_URL + "/Main/getSixteenZoneData";
        AjaxPost(formData, url, sixteenZonesuccess, AjaxError);

        function sixteenZonesuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            if (result[0] != 'error') {
                var userColors = JSON.parse(result.userColors[0].colors)
                getHouseMAp().then(resolve => {

                    $('#main-tab-right').append('<div id="rtable"></div>')
                    let data = JSON.parse(resolve)[1][0];
                    let reportHeader = `
                <div class="card rheader">
                    <div class="card-header row m-0">
                        <div class="col-sm-9"></div>${buttons}
                    </div>
                    <div class="card-body row m-0">
                    <img src="${BASE_URL + 'assets/images/logoCropedTop.jpg'}" alt="Vastuteq" width="100">
                    <div class="col-sm-10 row p-0 m-0 ml-auto mr-auto">
                            <div class="row m-0 col-sm-12 p-0">
                                <div class="col-sm-12"><h1 class="text-center">${data.firstName}</h1></div>
                                <div class="col-sm-12"><h6 class="text-center" style="font-size:0.8rem"><span>Address : </span><span>${data.address} </span>
                                <span>Mobile : ${data.mobileNo} </span><span>Email : ${data.email} <span></h6></div>
                            
                        </div> 
                        </div>
                                               
                    </div>

                    <div class="col-sm-12 row m-0">
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Client Name :  </div><div class="col-sm-6 pl-0">${data.clientName}</div></div>
                            <div class="col-sm-6"></div>
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Building Address :  </div><div class="col-sm-6 pl-0">${data.propertyAddress}</div></div>                            
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Degree from north :  </div><div class="col-sm-6 pl-0">${data.degree}</div></div>
                </div>`;

                    let reportTable = `<div class="card">
                    <div class="card-header row m-0">
                    <h5 class="col-sm-9"> Zone Colour Report </h5>
                                           
                                        </div>
                                        <div class="card-body">
                                       
                                        <table id="colorTable" class="table table-bordered table-hover mt-2">
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
                    reportTable += `</tbody></table>      
                    <div class="form-group col-sm-12 p-0">
                        <label for="exampleFormControlTextarea1">Recommendation</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    
                    </div>
                    </div>`
                    //appending table to modal body                
                    let disclaim = disclaimer();
                    $('#rtable').append(reportHeader);
                    $('#rtable').append(reportTable);
                    $('#rtable').append(disclaim);
                });

            } else {
                showAlert('Please define colors for 16 zone', 'warning')
            }
        }
    }

    //Main gate entry Report
    function mainGateEntry() {
        if (reportData != null && reportData != '') {
            var formData = new FormData();
            formData.append('grid', 'THIRTYTWO');
            var url = BASE_URL + "/Main/getGridData";

            AjaxPost(formData, url, thirtyTwoZonesuccess, AjaxError);

            function thirtyTwoZonesuccess(content, targetTextarea) {
                let result = JSON.parse(content);
                getHouseMAp().then(resolve => {

                    $('#main-tab-right').append('<div class="ml-auto mr-auto" id="rtable"></div>')
                    let data = JSON.parse(resolve)[1][0];

                    let reportHeader = `
                <div class="card rheader">
                    <div class="card-header row m-0">
                        <div class="col-sm-9"></div>${buttons}
                    </div>
                    <div class="card-body row m-0">
                    <img src="${BASE_URL + 'assets/images/logoCropedTop.jpg'}" alt="Vastuteq" width="100">
                    <div class="col-sm-10 row p-0 m-0 ml-auto mr-auto">
                            <div class="row m-0 col-sm-12 p-0">
                                <div class="col-sm-12"><h1 class="text-center">${data.firstName}</h1></div>
                                <div class="col-sm-12"><h6 class="text-center" style="font-size:0.8rem"><span>Address : </span><span>${data.address} </span>
                                <span>Mobile : ${data.mobileNo} </span><span>Email : ${data.email} <span></h6></div>
                            
                        </div> 
                        </div>
                                               
                    </div>

                    <div class="col-sm-12 row m-0">
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Client Name :  </div><div class="col-sm-6 pl-0">${data.clientName}</div></div>
                            <div class="col-sm-6"></div>
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Building Address :  </div><div class="col-sm-6 pl-0">${data.propertyAddress}</div></div>                            
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Degree from north :  </div><div class="col-sm-6 pl-0">${data.degree}</div></div>
                </div>`;



                    let reportTable = `<div class="card">
                <div class="card-header row m-0">
                <h5 class="col-sm-9"> Main Gate Entry Report </h5>
                                    
                                </div>
                                <div class="card-body">                               
                                <table id="colorTable" class="table table-bordered table-hover mt-2">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Activity</th>                            
                                    <th scope="col">Grid</th> 
                                    <th scope="col">Devta</th>  
                                    <th scope="col">Effects</th>
                                    <th scope="col">Suggested Grids</th>                                 
                                  </tr>
                                </thead>
                                <tbody>`
                    let count = 1;
                    for (let dir of result) {
                        for (let devtas of DEVTAS) {
                            for (let dData of reportData) {
                                let keys = Object.keys(dData)
                                let type = '';
                                objects.map(object => object.image.id == dData.id ?
                                    type = object.image.type
                                    : object);
                                for (let i = 2; i < keys.length; i++) {
                                    if (keys[i] == dir.shortName && type == 'activity' && devtas.direction == dir.shortName && dData.name == 'MAIN GATE') {
                                        reportTable += `<tr>
                                  <th scope="row">${count++}</th>
                                  <td>${dData.name}</td>                              
                                  <td>${dir.shortName}</td> 
                                  <td>${devtas.name}</td>  
                                  <td>${dir.effect}</td> 
                                  <td>E3,E4,S3,S4,W4,W5,N3,N4,N5</td>                         
                                </tr>`

                                    }
                                }
                            }
                        }
                    }
                    reportTable += `</tbody></table>      
            <div class="form-group col-sm-12 p-0">
                <label for="exampleFormControlTextarea1">Recommendation</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            
            </div>
            </div>`
                    //appending table to modal body   
                    if (div != '32') {
                        showAlert('Please choose 32 grid for this report', 'warning');
                    }

                    let haveGate = reportData.filter(p => p.name == "MAIN GATE");
                    if (haveGate[0] == undefined) {
                        showAlert('Please Select Main Gate from activities', 'warning');
                    }
                    let disclaim = disclaimer();
                    $('#rtable').append(reportHeader)
                    $('#rtable').append(reportTable);
                    $('#rtable').append(disclaim);
                });
            }
        }
        else {
            showAlert('Add objects and then Select the grid Before generate the report', 'warning')
        }
    }

    //Consultant Report
    function consultantReport() {
        var formData = new FormData();
        formData.append('id', mapId);
        var url = BASE_URL + "/Main/consultantReport";
        AjaxPost(formData, url, reportSuccess, AjaxError);

        function reportSuccess(content, targetTextarea) {
            let result = JSON.parse(content);
            let report = result[0] != 'error' ? result[1][0].report : '';
            getHouseMAp().then(resolve => {

                $('#main-tab-right').append('<div id="rtable"></div>')
                let data = JSON.parse(resolve)[1][0];

                let reportHeader = `
                <div class="card rheader">
                    <div class="card-header row m-0">
                        <div class="col-sm-9"></div>${buttons}
                    </div>
                    <div class="card-body row m-0">
                    <img src="${BASE_URL + 'assets/images/logoCropedTop.jpg'}" alt="Vastuteq" width="100">
                    <div class="col-sm-10 row p-0 m-0 ml-auto mr-auto">
                            <div class="row m-0 col-sm-12 p-0">
                                <div class="col-sm-12"><h1 class="text-center">${data.firstName}</h1></div>
                                <div class="col-sm-12"><h6 class="text-center" style="font-size:0.8rem"><span>Address : </span><span>${data.address} </span>
                                <span>Mobile : ${data.mobileNo} </span><span>Email : ${data.email} <span></h6></div>
                            
                        </div> 
                        </div>
                                               
                    </div>

                    <div class="col-sm-12 row m-0">
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Client Name :  </div><div class="col-sm-6 pl-0">${data.clientName}</div></div>
                            <div class="col-sm-6"></div>
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Building Address :  </div><div class="col-sm-6 pl-0">${data.propertyAddress}</div></div>                            
                            <div class="row m-0 col-sm-6"><div class=" col-sm-6 pl-0">Degree from north :  </div><div class="col-sm-6 pl-0">${data.degree}</div></div>
                </div>`;

                let reportTable = `<div class="card">
                <div class="card-header row m-0">
                <h5 class="col-sm-11"> Consultant Report </h5>
                                       
                                        <button class="btn btn-outline-primary float-right ml-1 mb-1 btn-sm text-sm pl-3 pr-3" id="cReport" data-dismiss="modal" aria-label="Close" style="float:right;">Save</button>
                                    </div>
                                    <div class="card-body">
                                   
                                    <div>
                        <div class="col-md-12">            
                            <div class="mb-3">
                                <textarea class="textarea" name="desc" rows="10" placeholder="Place some text here" style="width: 100%; height: 500px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;">${report}</textarea>
                            </div>               
                        </div>
                        <!-- /.col-->
                        </div>      
                <div class="form-group col-sm-12 p-0">
                    <label for="exampleFormControlTextarea1">Recommendation</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                
                </div>
                </div>`
                //appending table to modal body                
                let disclaim = disclaimer();
                $('#rtable').append(reportHeader);
                $('#rtable').append(reportTable);
                $('#rtable').append(disclaim);
                $('.textarea').summernote()
            });

        }

    }

    //getHouseMap
    async function getHouseMAp() {
        var formData = new FormData();
        formData.append('id', mapId);
        var url = BASE_URL + "/Main/getPropertyHousemapDetails";
        let result = await AjaxPostPromise(formData, url).catch(AjaxError);
        return result;
    }

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
        var formData = new FormData();
        formData.append('id', mapId);
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

    $('#main-tab-right').on('click', '#cReport', () => {
        let value = $('.textarea').val();
        if (value.trim() != '') {
            var formData = new FormData();
            formData.append('id', mapId);
            formData.append('value', value);
            var url = BASE_URL + "/Main/saveConsultantReport";
            AjaxPost(formData, url, reportSuccess, AjaxError);

            function reportSuccess(content, targetTextarea) {
                let result = JSON.parse(content);
                if (result[0] == 'success') {
                    showAlert(result[1], 'success')
                } else {
                    showAlert(result[1], 'warning')
                }
            }
        } else {
            showAlert('Report Text is not found', 'warning')
        }
    })

    $('body').on('click', '#back', function () {
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

    function disclaimer() {
        let disclaimer = `
        <div class="card rfooter">                
        <div class="card-body disclaimer">       
        
        <p class="text-center mb-3">Disclaimer</p>
        
        <p>All the information on this Application - https://www.vastuteq.com - is published in good faith and for general information purpose only. www.vastuteq.com does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (www.vastuteq.com), is strictly at your own risk. www.vastuteq.com will not be liable for any losses and/or damages in connection with the use of our Application.</p>
        
        <p>From our Application, you can visit other pages by following hyperlinks to such internal services. While we strive to provide only quality links to useful and ethical pages for more information, we have fully control over the content and nature of these pages. These links to other pages do not imply a recommendation for all the content found on these pages. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.</p>
        
        <p>Please be also aware that when you leave our Application, by saving your data it is safe with us. And you can also use your data further, when you come later on the Application.</p>
        
       `;

        return disclaimer;
    }
});