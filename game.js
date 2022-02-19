const keys = {
    right: {
        pressed: false
    }, 

    left: {
        pressed: false
    }
}


function animate () {
    requestAnimationFrame (animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platform.draw()
    
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            platform.position.x -= 5
        } else if (keys.left.pressed) {
            platform.position.x += 5
        }
     }


    //checkin for collision: character & platform
    if (
        //if character is RIGHT on the same height as platform
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >= platform.position.y &&
    
        //if character is ON platform: it's position+width is between the width of the platform
        player.position.x + player.width >= platform.position.x && 
        player.position.x <= platform.position.x + platform.width
        ) {
        player.velocity.y = 0
    } 
 }

animate()



addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65: //a
            console.log("left")
            keys.left.pressed = true
            break
       
        case 83: //s
            console.log("down")
            break
        
        case 68: //d
            console.log("right")
            keys.right.pressed = true
            break

        case 87: //w
            console.log("up")
            player.velocity.y -= 20
            break
    }
})

addEventListener('keyup', ({keyCode}) => { //keyup fires when key is released
    switch (keyCode) {
        case 65:
            console.log("left")
            keys.left.pressed = false
            break
       
        case 83:
            console.log("down")
            break
        
        case 68:
            console.log("right")
            keys.right.pressed = false
            break

        case 87:
            console.log("up")
            player.velocity.y -= 5
            break
    }})
