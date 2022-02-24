class Platform {

    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = 20
    }

    
    draw () {
        console.log("LA ANCHURA DE LA FOTO ES: ",this.width)
        context.drawImage(this.image, this.position.x, this.position.y)
    }

}