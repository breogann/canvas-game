class Platform {

    constructor(position) {
        this.position = {
            x:200,
            y:600,
        }

        this.width = 200
        this.height = 20
    }

    draw () {
        context.fillStyle = "blue"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const platform = new Platform()
//const platforms = [new Platform()]

