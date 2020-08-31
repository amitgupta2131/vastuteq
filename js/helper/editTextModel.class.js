export default class ObjectModel {
    constructor() {
        // The state of the model, an array of House Map objects, prepopulated with some data
        this.objects = JSON.parse(localStorage.getItem("EditTextObjects")) || [];
    }

    _commit(objects) {
        localStorage.setItem("EditTextObjects", JSON.stringify(objects));
    }

    add(propertyId, data) {
        console.log(data)
        const object = {
            propertyId: propertyId,
            image: data
        }
        this.objects.push(object);
        this._commit(this.objects);
        // this.updateObjectsInDataBase(propertyId);
    }

    editProperties(objectId, data) {       
        this.objects = this.objects.map(object =>
            object.image.id == objectId ? {
                propertyId: object.propertyId,
                image: {
                    id: object.image.id,
                    name: object.image.name,
                    src: object.image.src,
                    x: data.x,
                    y: data.y,
                    width: data.width,
                    height: data.height,
                    transform: data.transform,
                    type: object.image.type
                }
            } : object
        )

        this._commit(this.objects);

        //Update object in data base
        // this.objects.map(object =>
        //     object.image.id == objectId ?
        //     this.updateObjectsInDataBase(object.propertyId)
        //         : object);


        
    }

    editXY(objectId, data) {
        this.objects = this.objects.map(object =>
            object.image.id == objectId ? {
                propertyId: object.propertyId,
                image: {
                    id: object.image.id,
                    name: object.image.name,
                    src: object.image.src,
                    x: data.x,
                    y: data.y,
                    width: object.image.width,
                    height: object.image.height,
                    transform: object.image.transform,
                    type: object.image.type
                }
            } : object
        )

        this._commit(this.objects);
        //Update object in data base
        // this.objects.map(object =>
        //     object.image.id == objectId ?
        //     this.updateObjectsInDataBase(object.propertyId)
        //         : object);
    }

    editWidthHeight(objectId, data) {
        // console.log(data);
        this.objects = this.objects.map(object =>
            object.image.id == objectId ? {
                propertyId: object.propertyId,
                image: {
                    id: object.image.id,
                    name: object.image.name,
                    src: object.image.src,
                    x: object.image.x,
                    y: object.image.y,
                    width: data.width,
                    height: data.height,
                    transform: object.image.transform,
                    type: object.image.type
                }
            } : object
        )

        this._commit(this.objects);
        //Update object in data base
        // this.objects.map(object =>
        //     object.image.id == objectId ?
        //     this.updateObjectsInDataBase(object.propertyId)
        //         : object);
    }

    editTransform(objectId, updatedTransform) {
        this.objects = this.objects.map(object =>
            object.image.id == objectId ? {
                propertyId: object.propertyId,
                image: {
                    id: object.image.id,
                    name: object.image.name,
                    src: object.image.src,
                    x: object.image.x,
                    y: object.image.y,
                    width: object.image.width,
                    height: object.image.height,
                    transform: updatedTransform,
                    type: object.image.type
                }
            } : object
        )

        this._commit(this.objects);

        //Update object in data base
        // this.objects.map(object =>
        //     object.image.id == objectId ?
        //     this.updateObjectsInDataBase(object.propertyId)
        //         : object);
    }

    deleteProperty(propertyId) {
        this.objects = this.objects.filter(object => object.id !== propertyId)
        this._commit(this.objects)
    }

    deleteObject(propertyId, objectId) {
        this.objects = this.objects.map(object => object.id == propertyId ? {
            propertyId: object.propertyId,
            image: object.filter(obj => obj.id !== objectId)
        } : object
        )

    }

    getObject(propertyId) {
        return this.objects.filter(object => object.propertyId == propertyId ? object : null);
    }

    hasObject(propertyId) {
        return this.objects.find(object => object.propertyId == propertyId);
    }

    uniqueID() {
        return `obj-${Math.random().toString(36).slice(2)}`;
    }

    updateObjectsInDataBase(id) {
        let obj = JSON.stringify(this.getObject(id));
        var formData = new FormData();
        formData.append('id', id);
        formData.append('objects', obj);
        var url = BASE_URL + "/Main/updateObjects";
        AjaxPost(formData, url, updateObjectsuccess, AjaxError);



        function updateObjectsuccess(content, targetTextarea) {
            var result = JSON.parse(content);
            return content;
        }
    }

}