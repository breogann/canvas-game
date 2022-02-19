class Platform {

    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }

    draw () {
        context.fillStyle = "blue"
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const platforms = [new Platform({
    x: 200, y:200
}), new Platform({x:500, y: 400})]

