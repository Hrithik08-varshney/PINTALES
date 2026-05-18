class Place {
    constructor(title, imageUrl, address, description, location) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.address = address;
        this.description = description;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString();
    }
}