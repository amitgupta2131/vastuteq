export default class saveUserData {
    
    constructor() {
      // The state of the model, an array of House Map objects, prepopulated with some data
      
      this.userData = JSON.parse(localStorage.getItem("userData")) || [];
    }

    _commit(userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    add(data) {

        const uId = Math.floor(1000000000 + Math.random() * 9000000000);        
        data.id = uId
        console.log(data)

        this.userData.push(data);
        this._commit(this.userData);
        return data;
    }

    addActiveUser(data) {
        localStorage.setItem("activeUser", JSON.stringify(data));
    }

    addClientPopertyInfo(data) {
        const uId = Math.floor(1000000000 + Math.random() * 9000000000);        
        data.id = uId;
        localStorage.setItem("clientPropertyInfo", JSON.stringify(data));
    }

    delete(item) {
        localStorage.removeItem(item);
    }

    editType(type) {
        this.houseMaps[0].type = type;
        this._commit(this.houseMaps); 
    }

    editVedicBoundariesCoords(pts) {
        this.houseMaps[0].BoundariesCoords = pts;
        this._commit(this.houseMaps); 
    }

    editBoundariesCoords(pts) {
        this.houseMaps[0].boundariesCoords = pts;
        this._commit(this.houseMaps);
    }

    editCenteroid(center) {
        this.houseMaps[0].centeroid = center;
        this._commit(this.houseMaps);
    }

    editFacingWallPoints(pts) {
        this.houseMaps[0].facingWallPoints = pts;
        this._commit(this.houseMaps);
    }

    editFacingDegree(degree) {
        this.houseMaps[0].facingDegree = degree;
        this._commit(this.houseMaps);
    }

    // Alter stage according to completion
    staging(stage) {
        this.houseMaps = this.houseMaps.map(houseMap =>
          houseMap.id === 1
            ? {
                id: houseMap.id,
                stage: stage,
                imageData: houseMap.imageData,
                boundariesCoords: houseMap.boundariesCoords,
                centeroid: houseMap.centeroid,
                facingWallPoints: houseMap.facingWallPoints,
                facingDegree: houseMap.facingDegree,
                complete: houseMap.complete
              }
            : houseMap
        );
    
        this._commit(this.houseMaps);
    }

    // Processing is complete
    complete(id) {
        this.houseMaps = this.houseMaps.map(houseMap =>
          houseMap.id === id
            ? {
                id: houseMap.id,
                stage: houseMap.stage,
                imageData: houseMap.imageData,
                markedEdgePoints: houseMap.markedEdgePoints,
                complete: true
              }
            : houseMap
        );
    
        this._commit(this.houseMaps);
    }

    getBoundariesCoords() {
        return this.houseMaps[0].boundariesCoords;
    }

    getCenteroid() {
        return this.houseMaps[0].centeroid;
    }

    getFacingWallPoints() {
        return this.houseMaps[0].facingWallPoints;
    }

    getFacingDegree() {
        return this.houseMaps[0].facingDegree;
    }

    getHouseMap() {
        return this.houseMaps;
    }
    
    hasHouseMap() {
        return this.houseMaps.length > 0 ? true : false
    }
}