export default class Model {

    constructor() {
        // The state of the model, an array of House Map objects, prepopulated with some data
        this.houseMaps = JSON.parse(localStorage.getItem("houseMaps")) || [];
    }

    _commit(houseMaps) {
        localStorage.setItem("houseMaps", JSON.stringify(houseMaps));
    }

    add(data) {

        // console.log(data);

        const houseMap = {
            // id: this.houseMaps.length > 0 ? this.houseMaps[this.houseMaps.length - 1].id + 1 : 1,
            id: data.id,
            stage: 0,
            imageData: data.image,
            type: "mahavastu",
            customBoundariesCoords: [],
            centroid: [],
            faceWall: '',
            degree: 0,
            dimension: null,
            vpmtoggle: false,
            mvpctoggle: false,
            objects: [],
            activities: [],
            complete: false,
            vedicBoundariesCoords: [],
            faceCoords: [],
        }
        while (this.houseMaps.length) {
            this.houseMaps.pop();
        }
        this.houseMaps.push(houseMap);
        this._commit(this.houseMaps);

        //saving data in backend through ajax
        var formData = new FormData();
        formData.append('id', data.id);
        formData.append('stage', 1);
        formData.append('imageData', JSON.stringify(data.image));
        formData.append('type', "custom");
        formData.append('vedicBoundariesCoords', []);
        formData.append('customBoundariesCoords', []);
        formData.append('centroid', []);
        formData.append('faceCoords', []);
        formData.append('dimension', JSON.stringify({}));
        formData.append('complete', false);
        formData.append('propertyId', propertyId);
        formData.append('degree', 0);
        formData.append('mvpctoggle', false);
        formData.append('vpmtoggle', false);
        formData.append('objects', []);
        formData.append('activities', []);
        var url = BASE_URL + "/Main/addhouseMaps";
        AjaxPost(formData, url, addHouseMapssuccess, AjaxError);
        function addHouseMapssuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            // console.log(result)
        }

    }

    editType(id, updatedType) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: updatedType,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'type', value: updatedType };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editVedicBoundariesCoords(id, updatedVedicCoords) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: updatedVedicCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'vedicBoundariesCoords', value: JSON.stringify(updatedVedicCoords) };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editCustomBoundariesCoords(id, updatedCustomCoords) {

        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: updatedCustomCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'customBoundariesCoords', value: JSON.stringify(updatedCustomCoords) };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editCentroid(id, updatedCentroid) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: updatedCentroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'centroid', value: JSON.stringify(updatedCentroid) };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editFaceCoords(id, updatedFaceCoords) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,   
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: updatedFaceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'faceCoords', value: JSON.stringify(updatedFaceCoords) };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editDimension(id, updatedDimension) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall, 
                degree: houseMap.degree,
                dimension: updatedDimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'dimension', value: updatedDimension };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editDegree(id, updatedDegree) {
        this.houseMaps = this.houseMaps.map(houseMap =>

            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: updatedDegree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'degree', value: updatedDegree };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editFaceWall(id, updateFacewall) {
        // console.log(updateFacewall)
        this.houseMaps = this.houseMaps.map(houseMap =>

            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: updateFacewall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'degree', value: updateFacewall };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editVpmtoggle(id, updateVpmtoggle) {

        this.houseMaps = this.houseMaps.map(houseMap =>

            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: updateVpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'vpmtoggle', value: updateVpmtoggle };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editMvpctoggle(id, updateMvpctoggle) {

        this.houseMaps = this.houseMaps.map(houseMap =>

            houseMap.id == id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: updateMvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'mvpctoggle', value: updateMvpctoggle };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    // Alter stage according to completion
    editStage(id, updatedStage) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: updatedStage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'stage', value: updatedStage };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
    }

    editMapImageData(id, updatedImageData) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id === id ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: updatedImageData,
                type: houseMap.type,
                
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: houseMap.dimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: houseMap.complete,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);
    }

    // Processing is complete
    complete(id) {
        this.houseMaps = this.houseMaps.map(houseMap =>
            houseMap.id == id ? {
                id: houseMap.id,
                stage: updatedStage,
                imageData: houseMap.imageData,
                type: houseMap.type,
                customBoundariesCoords: houseMap.customBoundariesCoords,
                centroid: houseMap.centroid,
                faceWall: houseMap.faceWall,
                degree: houseMap.degree,
                dimension: updatedDimension,
                vpmtoggle: houseMap.vpmtoggle,
                mvpctoggle: houseMap.mvpctoggle,
                objects: houseMap.objects,
                activities: houseMap.activities,
                complete: true,
                vedicBoundariesCoords: houseMap.vedicBoundariesCoords,
                faceCoords: houseMap.faceCoords,
            } : houseMap
        )

        this._commit(this.houseMaps);

        let updatedField = { name: 'complete', value: true };
        this.updateHouseMapInDataBase(id, this.houseMaps, updatedField)
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
        return this.houseMaps.filter(houseMap => houseMap.id == id ? true : false)
    }

    getHouseMap(id) {
        return this.houseMaps.filter(houseMap => houseMap.id == id ? houseMap : null)
    }

    deleteHouseMap(id) {
        this.houseMaps = this.houseMaps.filter(houseMap => houseMap.id !== id)
        this._commit(this.houseMap)
    }

    deleteHouseMapDB(id) {
        var formData = new FormData();
        formData.append('id', id);
        var url = BASE_URL + "/Main/deletehouseMaps";
        AjaxPost(formData, url, deleteHouseMapssuccess, AjaxError);

        function deleteHouseMapssuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            // console.log(result)
        }

    }

    getMaps() {
        return this.houseMaps;
    }

    updateHouseMapInDataBase(id, houseMaps, updatedField) {

        let obj = houseMaps.map(function (houseMap) {
            if (houseMap.id == id) {
                var formData = new FormData();
                formData.append('id', houseMap.id);
                formData.append('stage', updatedField.name == 'stage' ? updatedField.value : houseMap.stage);
                formData.append('imageData', updatedField.name == 'imageData' ? updatedField.value : JSON.stringify(houseMap.imageData));
                formData.append('type', updatedField.name == 'type' ? updatedField.value : houseMap.type);
                formData.append('vedicBoundariesCoords', updatedField.name == 'vedicBoundariesCoords' ? updatedField.value : JSON.stringify(houseMap.vedicBoundariesCoords));
                formData.append('customBoundariesCoords', updatedField.name == 'customBoundariesCoords' ? updatedField.value : JSON.stringify(houseMap.customBoundariesCoords));
                formData.append('centroid', updatedField.name == 'centroid' ? updatedField.value : JSON.stringify(houseMap.centroid));
                formData.append('faceCoords', updatedField.name == 'faceCoords' ? updatedField.value : JSON.stringify(houseMap.faceCoords));
                formData.append('dimension', updatedField.name == 'dimension' ? updatedField.value : JSON.stringify(houseMap.dimension));
                formData.append('degree', updatedField.name == 'degree' ? updatedField.value : houseMap.degree);
                formData.append('vpmtoggle', updatedField.name == 'vpmtoggle' ? updatedField.value : houseMap.vpmtoggle);
                formData.append('mvpctoggle', updatedField.name == 'mvpctoggle' ? updatedField.value : houseMap.mvpctoggle);
                formData.append('objects', updatedField.name == 'objects' ? updatedField.value : houseMap.objects);
                formData.append('activities', updatedField.name == 'activities' ? updatedField.value : houseMap.activities);
                formData.append('complete', updatedField.name == 'complete' ? updatedField.value : houseMap.complete);
                formData.append('propertyId', propertyId);
                var url = BASE_URL + "/Main/updatehouseMaps";
                AjaxPost(formData, url, updateHouseMapssuccess, AjaxError);
            }
        });

        function updateHouseMapssuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            return content;
        }
    }
}