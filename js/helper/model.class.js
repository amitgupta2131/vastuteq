export default class Model {
    
    constructor() {
      // The state of the model, an array of House Map objects, prepopulated with some data
      this.houseMaps = JSON.parse(localStorage.getItem("houseMaps")) || [];
    }

    _commit(houseMaps) {
        localStorage.setItem("houseMaps", JSON.stringify(houseMaps));
    }

    add(data) {

        console.log(data);

        const houseMap = {
            // id: this.houseMaps.length > 0 ? this.houseMaps[this.houseMaps.length - 1].id + 1 : 1,
            id: data.id,
            stage: 1,
            imageData: data.image,
            type: "custom",
            vedicBoundariesCoords: [],
            customBoundariesCoords: [],
            centroid: [],
            faceCoords: [],
            dimension: {},
            complete: false,
        }

        this.houseMaps.push(houseMap);
        this._commit(this.houseMaps);
        
        // //saving data in backend through ajax
        // var formData = new FormData();
        // formData.append('id', data.id);
        // formData.append('stage', 1);
        // formData.append('imageData', JSON.stringify(data.image));
        // formData.append('type', "custom");
        // formData.append('vedicBoundariesCoords', []);
        // formData.append('customBoundariesCoords', []);
        // formData.append('centroid', []);
        // formData.append('faceCoords', []);
        // formData.append('dimension', JSON.stringify({}));
        // formData.append('complete', false);
        // formData.append('propertyId', propertyId);
        // var url = BASE_URL + "/Main/addhouseMaps";
        // AjaxPost(formData, url, addHouseMapssuccess, AjaxError);
        // function addHouseMapssuccess(content,targetTextarea) {
        //     var result = JSON.parse(content);
        //     console.log(result)            
        // }
        
    }

    editType(id, updatedType) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: updatedType,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps); 

        // var formData = new FormData();
        // formData.append('id', houseMap.id);
        // formData.append('stage', houseMap.stage);
        // formData.append('imageData', JSON.stringify(houseMap.imageData));
        // formData.append('type', updatedType);
        // formData.append('vedicBoundariesCoords', JSON.stringify(houseMap.vedicBoundariesCoords));
        // formData.append('customBoundariesCoords', JSON.stringify(houseMap.customBoundariesCoords));
        // formData.append('centroid', JSON.stringify(houseMap.centroid));
        // formData.append('faceCoords', JSON.stringify(houseMap.faceCoords));
        // formData.append('dimension', JSON.stringify(houseMap.faceCoords));
        // formData.append('complete', houseMap.complete);
        // formData.append('propertyId', propertyId);
        // var url = BASE_URL + "/Main/updatehouseMaps";
        // AjaxPost(formData, url, updateHouseMapssuccess, AjaxError);
        // function updateHouseMapssuccess(content,targetTextarea) {
        //     var result = JSON.parse(content);
        //     console.log(result)            
        // }
    }

    editVedicBoundariesCoords(id,updatedVedicCoords) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: updatedVedicCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps); 

        // var formData = new FormData();
        // formData.append('id', houseMap.id);
        // formData.append('stage', houseMap.stage);
        // formData.append('imageData', JSON.stringify(houseMap.imageData));
        // formData.append('type', houseMap.type);
        // formData.append('vedicBoundariesCoords', JSON.stringify(updatedVedicCoords));
        // formData.append('customBoundariesCoords', JSON.stringify(houseMap.customBoundariesCoords));
        // formData.append('centroid', JSON.stringify(houseMap.centroid));
        // formData.append('faceCoords', JSON.stringify(houseMap.faceCoords));
        // formData.append('dimension', JSON.stringify(houseMap.faceCoords));
        // formData.append('complete', houseMap.complete);
        // formData.append('propertyId', propertyId);
        // var url = BASE_URL + "/Main/updatehouseMaps";
        // AjaxPost(formData, url, updateHouseMapssuccess, AjaxError);
        // function updateHouseMapssuccess(content,targetTextarea) {
        //     var result = JSON.parse(content);
        //     console.log(result)            
        // }
    }

    editCustomBoundariesCoords(id, updatedCustomCoords) {
        console.log(this.houseMaps);
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: updatedCustomCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap            
        )

        // this._commit(this.houseMaps);
        // var formData = new FormData();
        // formData.append('id', houseMap.id);
        // formData.append('stage', houseMap.stage);
        // formData.append('imageData', JSON.stringify(houseMap.imageData));
        // formData.append('type', houseMap.type);
        // formData.append('vedicBoundariesCoords', JSON.stringify(houseMap.vedicBoundariesCoords));
        // formData.append('customBoundariesCoords', JSON.stringify(updatedCustomCoords));
        // formData.append('centroid', JSON.stringify(houseMap.centroid));
        // formData.append('faceCoords', JSON.stringify(houseMap.faceCoords));
        // formData.append('dimension', JSON.stringify(houseMap.dimenision));
        // formData.append('complete', houseMap.complete);
        // formData.append('propertyId', propertyId);
        // var url = BASE_URL + "/Main/updatehouseMaps";
        // AjaxPost(formData, url, updateHouseMapssuccess, AjaxError);
        // function updateHouseMapssuccess(content,targetTextarea) {
        //     var result = JSON.parse(content);
        //     console.log(result)            
        // }
    }

    editCentroid(id, updatedCentroid) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: updatedCentroid,
                faceCoords: houseMap.faceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    editFaceCoords(id, updatedFaceCoords) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: updatedFaceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    editDimension(id, updatedDimension) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: updatedDimension,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    // Alter stage according to completion
    editStage(id, updatedStage) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: updatedStage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: houseMap.dimenision,
                complete: houseMap.complete
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    // Processing is complete
    complete(id) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? { 
                id: houseMap.id,
                stage: updatedStage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceCoords: houseMap.faceCoords,
                dimenision: updatedDimension,
                complete: true
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    // getCustomBoundariesCoords() {
    //     return this.houseMaps[0].customBoundariesCoords;
    // }

    // getCentroid() {
    //     return this.houseMaps[0].centroid;
    // }

    // getFaceCoords() {
    //     return this.houseMaps[0].FaceCoords;
    // }

    // getFacingDegree() {
    //     return this.houseMaps[0].facingDegree;
    // }
    
    hasHouseMap() {
        return this.houseMaps.filter( houseMap => houseMap.id == id ? true: false )
    }

    getHouseMap(id) {
        return this.houseMaps.filter( houseMap => houseMap.id == id ? houseMap : null )
    }

    deleteHouseMap(id) {
        this.houseMaps = this.houseMaps.filter(houseMap => houseMap.id !== id)
        this._commit(this.houseMap)
    }

    getMaps() {
        return this.houseMaps;
    }
}