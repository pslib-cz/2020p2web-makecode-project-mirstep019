scene.setBackgroundColor(9);
let mySprite = sprites.create(img`
    . . . . . . . 2 2 2 1 1 2 . . .
    . . . . . . 2 2 2 2 2 2 2 2 . .
    . . . . . f f f f d 1 f d . . .
    . . . . f f d f f d 1 f d . . .
    . . . . f f d d d d d d d d . .
    . . . . . f d d d d d f d . . .
    . . . . 8 8 f 8 8 8 8 . . . . .
    . . . 8 8 8 f 8 8 f 8 8 8 . . .
    . . 8 8 8 8 f f f f 8 8 8 8 . .
    . . d d 8 f 5 f f 5 f 8 d d . .
    . . d d d f f f f f f d d d . .
    . . d d f f f f f f f f d d . .
    . . . . f f f . . f f f . . . .
    . . . 2 1 2 . . . . 2 1 2 . . .
    . . 2 1 2 2 . . . . 2 2 1 2 . .
    . . . . . . . . . . . . . . . .
`)
mySprite.setPosition(20, 165)
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
tiles.setTilemap(assets.tilemap`level0`)

//music.playMelody("D4 D4 D4 A4 G#4 G F D F G C4 C4 D A G# G F D F G B3 B3 D4 A4 G#4 G4 F4 D4 F4 G4 A#3 A#3 D4 A4 G#4 G4 F4 D4 F4 G4", 300);

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = -150
    }
})
    
mySprite.ay = 230;
