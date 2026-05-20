class Place {
    constructor(title, imageUri, address, description, location) {
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.description = description;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}