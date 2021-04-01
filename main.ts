//background
scene.setBackgroundColor(9);

//fall on lava - game over   
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function(sprite, location) {
    game.over(false, effects.melt)
})

//player sprite look a like
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
    . . 1 1 8 f 5 f f 5 f 8 1 1 . .
    . . 1 1 1 f f f f f f 1 1 1 . .
    . . 1 1 f f f f f f f f 1 1 . .
    . . . . f f f . . f f f . . . .
    . . . 2 1 2 . . . . 2 1 2 . . .
    . . 2 1 2 2 . . . . 2 2 1 2 . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

//mySprite position
mySprite.setPosition(20, 745)

//movement speed
controller.moveSprite(mySprite, 100, 0)
//camera follows the player
scene.cameraFollowSprite(mySprite)

//level0 - default
tiles.setTilemap(assets.tilemap`level0`)

//jumping with "A" button pressed
controller.A.onEvent(ControllerButtonEvent.Pressed, function () { 
    if (mySprite.vy == 0) {
        mySprite.vy = -150
    }
})
//fall accelaration
mySprite.ay = 230;

//startLevel()

//movement animations
game.onUpdate(function () {
    if (mySprite.vy < 0) {
        mySprite.setImage(img`
            . . . . . . . 2 2 2 1 1 2 . . .
            . . . . . . 2 2 2 2 2 2 2 2 . .
            . . . . . f f f f d 1 f d . . .
            . . . . f f d f f d 1 1 d . . .
            . . . . f f d d d d d d d d 1 .
            . . . . . f d d d d d f d 1 1 1
            . . . . 8 8 f 8 8 8 8 8 8 1 1 1
            . . 8 8 8 8 f 8 8 f 8 8 8 8 1 .
            . 1 1 8 8 8 f f f f 8 8 . . . .
            . 1 1 8 . f 5 f f 5 f . . . . .
            . 1 1 . . f f f f f f f f . . .
            . . 1 . f f f f f f f f f f . .
            . . . 2 2 f f . . . . . 2 1 2 .
            . . . 2 1 . . . . . . . 2 2 1 2
            . . . 1 2 . . . . . . . . . . .
            . . . 2 . . . . . . . . . . . .
        `)
    } else if (mySprite.vy > 0) {
        mySprite.setImage(img`
            . . . . . . . 2 2 2 1 1 2 . . .
            . . . . . . 2 2 2 2 2 2 2 2 . .
            . . . . . f f f f d 1 1 d . . .
            . . . . f f d f f d 1 f d . . .
            . . 1 . f f d d d d d d d d 1 .
            . 1 1 8 . f d d d d d f d 1 1 1
            . 1 1 8 8 8 f 8 8 8 8 8 8 1 1 1
            . 1 1 8 8 8 f 8 8 f 8 8 8 8 1 .
            . . . . 8 8 f f f f 8 8 . . . .
            . . . . . f 5 f f 5 f . . . . .
            . . . . . f f f f f f f f . . .
            . . . . f f f f f f f f f f . .
            . . . 2 2 f f . . . . . 2 1 2 .
            . . . 2 1 . . . . . . . 2 2 1 2
            . . . 1 2 . . . . . . . . . . .
            . . . 2 . . . . . . . . . . . .
        `)
    } 
    else if (mySprite.x % 2 == 0) {
        mySprite.setImage(img`
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
    } 
    else {
        mySprite.setImage(img`
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
    
        `)
    }
    if (mySprite.vx < 0) {
        mySprite.image.flipX()
    }
})










//music 
//music.playMelody("D4 D4 D4 A4 G#4 G F D F G C4 C4 D A G# G F D F G B3 B3 D4 A4 G#4 G4 F4 D4 F4 G4 A#3 A#3 D4 A4 G#4 G4 F4 D4 F4 G4", 300);