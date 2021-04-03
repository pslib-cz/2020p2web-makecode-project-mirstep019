namespace SpriteKind {
    export const Coin = SpriteKind.create()
}
//background
scene.setBackgroundImage(assets.image`Background`);
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

//score 
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    otherSprite.destroy()
})
//Portal teleport
scene.onOverlapTile(SpriteKind.Player, assets.tile`myPortal`, function (sprite, location) {
    current_level += 1
    game.splash("NEXT LEVEL: FINAL LEVEL")
    scene.setBackgroundImage(assets.image`Background2`);
    for (let i = 0; i < 1; i++) {
        mySprite.startEffect(effects.fire, 2000)
    }
    startLevel()
})

//ingame changes
function startLevel () {
    //level changes
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level0`)} 
    else if (current_level == 1) {
        tiles.setTilemap(tilemap`level1`)}
    else {
        game.over(true)
    }
    //spawnpoint
    tiles.placeOnRandomTile(mySprite, assets.tile`tilespawn`)
    for (let value of tiles.getTilesByType(assets.tile`tilespawn`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    //life hearts
    info.setLife(3)
    //enemy
    for (let value1 of sprites.allOfKind(SpriteKind.Enemy)) {
        value1.destroy()
    }
    //coin destroy
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    //coin animation & places
    for (let value3 of tiles.getTilesByType(assets.tile`myTile0`)) {
        coin = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . f f f f f f f . . . .
            . . . . f 5 5 5 5 5 5 5 f . . .
            . . . f 5 5 4 4 4 4 5 5 5 f . .
            . . f 5 5 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . f 5 4 5 5 5 5 5 5 5 5 5 f .
            . . . f 5 5 4 4 5 5 5 5 5 f . .
            . . . . f 5 5 5 5 5 5 5 f . . .
            . . . . . f f f f f f f . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Coin)
        animation.runImageAnimation(
        coin,
        [img`
            . . . . . . . . . . . . . . . .
            . . . . f f f f f f f . . . . .
            . . . f 5 5 5 5 5 5 5 f . . . .
            . . f 5 4 4 4 4 4 5 5 5 f . . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 4 5 5 5 5 5 5 5 5 5 f . .
            . f 5 5 5 5 5 5 5 5 5 5 5 f . .
            . . f 5 5 4 4 4 5 5 5 5 f . . .
            . . . f 5 5 5 5 5 5 5 f . . . .
            . . . . f f f f f f f . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . f f f f f . . . . . .
            . . . . f 5 5 5 5 5 f . . . . .
            . . . f 5 4 4 4 4 5 5 f . . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 4 5 5 5 5 5 5 5 f . . .
            . . f 5 5 5 5 5 5 5 5 5 f . . .
            . . . f 5 5 4 4 5 5 5 f . . . .
            . . . . f 5 5 5 5 5 f . . . . .
            . . . . . f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
        `],
        100,
        true
        )
        tiles.placeOnTile(coin, value3)
        tiles.setTileAt(value3, assets.tile`tile0`)
    }
}


let coin: Sprite = null
let current_level = 0
startLevel()

//movement animations
game.onUpdate(function () {
    //jump
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
    //fall
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
            . . 1 1 8 f 5 f f 5 f 8 1 1 . .
            . . 1 1 1 f f f f f f 1 1 1 . .
            . . 1 1 f f f f f f f f 1 1 . .
            . . . . f f f . . f f f . . . .
            . . . 2 1 2 . . . . 2 1 2 . . .
            . . 2 1 2 2 . . . . 2 2 1 2 . .
        `)
    }
    //backwards walk
    if (mySprite.vx < 0) {
        mySprite.image.flipX()
    }
})












//music 
//idk why 
//music.playMelody("D4 D4 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Half) G4# music.rest(BeatFraction.Half) G4 F4 D4 F4 G4 C4 C4 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Half) G4# music.rest(BeatFraction.Half) G4 F4 D4 F4 G4 B3 B3 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Half) G4# music.rest(BeatFraction.Half) G4 F4 D4 F4 G4 A3# A3# D5 music.rest(BeatFraction.Half) A4 G4# G4 F4 D4 F4 G4 F4 F4 F4 F4 D4 D4 D4 F4 F4 F4 G4 G# G F D F G F F F G G# A C A D D D A D C A A A A G G G A A A A G A C A G D A G F C G F E D D D D F C F D F G G# G F", 500);
