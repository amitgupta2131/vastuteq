export default class ObjectModel {
    constructor() {
        // The state of the model, an array of House Map objects, prepopulated with some data
        this.objects = JSON.parse(localStorage.getItem("objects")) || [];
    }

    _commit(objects) {
        localStorage.setItem("objects", JSON.stringify(objects));
    }

    add(propertyId,data) {

        const object = {
            propertyId: propertyId,
            image: data
        }
        this.objects.push(object);
        this._commit(this.objects);

    }

    editProperties(objectId, data) {
        this.objects = this.objects.map(object =>
            object.image.id== objectId ? {
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
                }
            } : object
        )

        this._commit(this.objects);
    }

    editXY(objectId,data) {
        this.objects = this.objects.map(object =>
            object.image.id== objectId ? {
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
                }
            } : object
        )

        this._commit(this.objects);
    }

    editWidthHeight(objectId,data) {
        // console.log(data);
        this.objects = this.objects.map(object =>
            object.image.id== objectId ? {
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
                }
            } : object
        )

        this._commit(this.objects);
    }

    editTransform(objectId,updatedTransform) {
        this.objects = this.objects.map(object =>
            object.image.id== objectId ? {
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
                }
            } : object
        )

        this._commit(this.objects);
    }

    deleteProperty(propertyId) {
        this.objects = this.objects.filter(object => object.id !== propertyId)
        this._commit(this.objects)
    }

    deleteObject(propertyId,objectId) {
        this.objects = this.objects.map(object => object.id == propertyId ? {
            propertyId: object.propertyId,
            image: object.filter(obj => obj.id !== objectId)
        } : object
        )
        
    }

    getObject(propertyId){
        return this.objects.filter(object => object.propertyId == propertyId ? object : null);
    }

    hasObject(propertyId){
        return this.objects.find(object => object.propertyId == propertyId );
    }

    uniqueID(){
        return `obj-${Math.random().toString(36).slice(2)}`;
    }
    
}