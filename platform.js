class Platform {

    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = 58
        this.height = 20
    }

    
    draw () {
        console.log("IMAGEN EN PLAT DRAW", this.image)
        context.drawImage(this.image, this.position.x, this.position.y)
    }

}