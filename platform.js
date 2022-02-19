class Platform {

    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 250
        this.height = 20
    }

    draw () {
        context.fillStyle = "blue"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const platforms = [new Platform({
    x: -1, y:canvas.height-20
}), new Platform({x:500, y: 400})]

