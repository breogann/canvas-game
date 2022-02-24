class Platform {

    constructor({x, y, imageUrl}) {
        this.position = { x, y }
        this.imageInstance = new Image()
        this.imageInstance.src = imageUrl
        this.width = this.imageInstance.width
        this.height = 20
    }

    
    draw () {
        this.width = this.imageInstance.width
        console.log("LA ANCHURA DE LA FOTO ES: ",this.width)
        context.drawImage(this.imageInstance, this.position.x, this.position.y)
    }

}