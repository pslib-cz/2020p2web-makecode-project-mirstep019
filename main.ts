namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const ICoin = SpriteKind.create()
    export const Block = SpriteKind.create()
    export const Meteorit = SpriteKind.create()
}

game.splash("Welcome to the Game", "Minilovania")


//background
scene.setBackgroundImage(assets.image`Background`);

//------------------------------------------------------------------------------------Sprite defaults

//player sprite look a like
let mySprite = sprites.create(img`
    . . . . . 2 2 2 1 1 2 .
    . . . . 2 2 2 2 2 2 2 2
    . . . f f f f d 1 f d .
    . . f f d f f d 1 f d .
    . . f f d d d d d d d d
    . . . f d d d d d f d .
    . . 8 8 f 8 8 8 8 . . .
    . 8 8 8 f 8 8 f 8 8 8 .
    8 8 8 8 f f f f 8 8 8 8
    1 1 8 f 5 f f 5 f 8 1 1
    1 1 1 f f f f f f 1 1 1
    1 1 f f f f f f f f 1 1
    . . f f f . . f f f . .
    . 2 1 2 . . . . 2 1 2 .
    2 1 2 2 . . . . 2 2 1 2
    . . . . . . . . . . . .
`, SpriteKind.Player)

//mySprite position
mySprite.setPosition(20, 745)

mySprite.say("Whats Up, I move with < > and jump with button A, Alright??", 5000, 2, 15)

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
mySprite.ay = 215;


//-------------------------------------------------------------------------------------------------





//---------------------------------------------------------------------------------------------overlapping something...

//fall on lava - game over   
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function(sprite, location) {
    game.over(false, effects.melt)
})

//fall on darklava - game over   
scene.onOverlapTile(SpriteKind.Player, assets.tile`myDarkLava`, function(sprite, location) {
    game.over(false, effects.dissolve)
})

//overlapping coin1 and enemy spawn
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    otherSprite.destroy()
    fly = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    animation.runImageAnimation(
    fly, 
    [img`
        f f f . . . . . . . . f f f . .
        c b b c f . . . . . . c c f f .
        . c b b c f . . . . . . c c f f
        . c c c b f . . . . . . c f c f
        . c c b b c f . c c . c c f f f
        . c b b c b f c c 3 c c 3 c f f
        . c b c c b f c b 3 c b 3 b f f
        . . c c c b b c b 1 b b b 1 c .
        . . . c c c c b b 1 b b b 1 c .
        . . . . c c b b b b b b b b b c
        . . . . f b b b b c 1 f f 1 b c
        . . . c f b b b b f 1 f f 1 f f
        . . c c f b b b b f 2 2 2 2 f f
        . . . . f c b b b b 2 2 2 2 f .
        . . . . . f c b b b b b b f . .
        . . . . . . f f f f f f f . . .
    `,img`
        . . . . . . . . . . . f f f . .
        f f f . . . . . . . . c c f f f
        c b b c f . . . c c . c c c f f
        . c b b b f f c c 3 c c 3 c f f
        . c c c b b f c b 3 c b 3 c f f
        . c c b c b f c b b b b b b c f
        . c b b c b b c b 1 b b b 1 c c
        . c b c c c b b b b b b b b b c
        . . c c c c c b b c 1 f f 1 b c
        . . . c f b b b b f 1 f f 1 f c
        . . . c f b b b b f f f f f f f
        . . c c f b b b b f 2 2 2 2 f f
        . . . . f c b b b 2 2 2 2 2 f .
        . . . . . f c b b b 2 2 2 f . .
        . . . . . . f f f f f f f . . .
        . . . . . . . . . . . . . . . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . c c . c c . . .
        . . . . . . c c c 3 c c 3 f . .
        . . . . . c c c b 3 c b 3 c f .
        . . . . f f b b b b b b b b c f
        . . . . f f b b b 1 b b b 1 c c
        . . . f f f c b b b b b b b b c
        . . . f f f f b b c 1 f f 1 b c
        . . . b b b c c b f 1 f f 1 f f
        . . . c c c c f b f f f f f f f
        . . c c c b b f b f 2 2 2 2 f f
        . . . c b b c c b 2 2 2 2 2 f .
        . . c b b c c f f b 2 2 2 f . .
        . c c c c c f f f f f f f . . .
        c c c c . . . . . . . . . . . .
    `,img`
        . f f f . . . . . . . . f f f .
        . c b b c f . . . . . . . c f f
        . . c b b c f . . . . . . c c f
        . . c c c b f . . . . . . . f c
        . . c c b b f f . . . . . f f c
        . . c b b c b f c c . c c f f f
        . . c b c c b f c c c c c f f f
        . . . c c c b c b 3 c c 3 c f .
        . . . c c c c b b 3 c b 3 b c .
        . . . . c c b b b b b b b b c c
        . . . c f b b b 1 1 b b b 1 1 c
        . . c c f b b b b b b b b b b f
        . . . . f b b b b c b b b c b f
        . . . . f c b b b 1 f f f 1 f .
        . . . . . f c b b b b b b f . .
        . . . . . . f f f f f f f . . .
    `],
    100,
    true
    )
    fly.setPosition(mySprite.x + 0, mySprite.y - 80)
    fly.follow(mySprite, 50)
})

//overlapping coin2 and enemy spawn
sprites.onOverlap(SpriteKind.Player, SpriteKind.ICoin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.baDing.play()
    otherSprite.destroy()
    thing = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    animation.runImageAnimation(
    thing, 
    [img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b 5 5 b . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . b b b b b 5 5 5 5 5 5 5 b . .
        . b d 5 b 5 5 5 5 5 5 5 5 b . .
        . . b 5 5 b 5 d 1 f 5 d 4 f . .
        . . b d 5 5 b 1 f f 5 4 4 c . .
        b b d b 5 5 5 d f b 4 4 4 4 b .
        b d d c d 5 5 b 5 4 4 4 4 4 4 b
        c d d d c c b 5 5 5 5 5 5 5 b .
        c b d d d d d 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `,img`
        . . . . . . . . . . b 5 b . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . . . . b c . . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 d 1 f 5 5 d f . .
        . . . . b 5 5 1 f f 5 d 4 c . .
        . . . . b 5 5 d f b d d 4 4 . .
        b d d d b b d 5 5 5 4 4 4 4 4 b
        b b d 5 5 5 b 5 5 4 4 4 4 4 b .
        b d c 5 5 5 5 d 5 5 5 5 5 b . .
        c d d c d 5 5 b 5 5 5 5 5 5 b .
        c b d d c c b 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `,img`
        . . . . . . . . . . b 5 b . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 d 1 f 5 d 4 c . .
        . . . . b 5 5 1 f f d d 4 4 4 b
        . . . . b 5 5 d f b 4 4 4 4 b .
        . . . b d 5 5 5 5 4 4 4 4 b . .
        . . b d d 5 5 5 5 5 5 5 5 b . .
        . b d d d d 5 5 5 5 5 5 5 5 b .
        b d d d b b b 5 5 5 5 5 5 5 b .
        c d d b 5 5 d c 5 5 5 5 5 5 b .
        c b b d 5 d c d 5 5 5 5 5 5 b .
        . b 5 5 b c d d 5 5 5 5 5 d b .
        b b c c c d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `,img`
        . . . . . . . . . b 5 b . . . .
        . . . . . . . . . b 5 b . . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . . . . b b 5 b c 5 5 d 4 c . .
        . b b b b 5 5 5 b f d d 4 4 4 b
        . b d 5 b 5 5 b c b 4 4 4 4 b .
        . . b 5 5 b 5 5 5 4 4 4 4 b . .
        . . b d 5 5 b 5 5 5 5 5 5 b . .
        . b d b 5 5 5 d 5 5 5 5 5 5 b .
        b d d c d 5 5 b 5 5 5 5 5 5 b .
        c d d d c c b 5 5 5 5 5 5 5 b .
        c b d d d d d 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `],
    100,
    true
    )
    thing.setPosition(mySprite.x + 0, mySprite.y - 80)
    thing.follow(mySprite, 50)
})

//overlapping enemy
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 200)
    if (mySprite.y < otherSprite.y) {
        info.changeScoreBy(10)
        music.knock.play()
    } 
    else {
        info.changeLifeBy(-1)
    }
})

//Portal teleport
scene.onOverlapTile(SpriteKind.Player, assets.tile`myPortal`, function (sprite, location) {
    current_level += 1
    if (current_level ==1) {}
    else if(current_level == 2) {}

    mySprite.startEffect(effects.coolRadial, 2000)
    
    startLevel()
})

//overlapping boss
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (mySprite.y < otherSprite.y) {
        statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -10
        pause(1000)
        mySprite.vy = -150
        mySprite.y += -10
        music.spooky.play()
        music.knock.play()

    } 
    else {
        music.bigCrash.play()
        scene.cameraShake(4, 500)
        info.changeLifeBy(-1)
        pause(2000)
        
    }
})

//when mySprite falls on Meteorit
sprites.onOverlap(SpriteKind.Player, SpriteKind.Meteorit, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    music.bigCrash.play()
    music.bigCrash.play()
    otherSprite.destroy()
}) 








//-----------------------------------------------------------------------------------------------------------------


//status bar on zero
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    statusbar.spriteAttachedTo().destroy()
    for (let i = 0; i < 10; i++) {
        music.buzzer.play()
        music.bigCrash.play()
        music.baDing.play()
    }
    info.changeScoreBy(5000000)
})


//---------------------------------------------------------------------------------------------ingame changes

function startLevel () {

    //----------------------------------------------level changes
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level0`)
        //life hearts
        info.setLife(10)
    }
    else if (current_level == 1) {
        tiles.setTilemap(tilemap`level4`)
        //life hearts
        info.setLife(3)
        scene.setBackgroundImage(assets.image`Background0`)


    }
    else if (current_level == 2) {
        tiles.setTilemap(tilemap`level2`)
        //life hearts
        info.setLife(20)
        scene.setBackgroundImage(assets.image`Background2`)
    }
    else {
        game.over(true)
    }

//-----------------------------------------------------------------------------------------------------------------

    //spawnpoint
    tiles.placeOnRandomTile(mySprite, assets.tile`tilespawn`)
    for (let value of tiles.getTilesByType(assets.tile`tilespawn`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }

    //enemy
    for (let value1 of sprites.allOfKind(SpriteKind.Enemy)) {
        value1.destroy()
    }

    //coin destroy
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }

    //coin2 destroy
    for (let value2b of sprites.allOfKind(SpriteKind.ICoin)) {
        value2b.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Block)) {
        value3.destroy()
    }

    //coin animation & places
    for (let value4 of tiles.getTilesByType(assets.tile`myTile0`)) {
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
        tiles.placeOnTile(coin, value4)
        tiles.setTileAt(value4, assets.tile`tile0`)
    }

    //coin animation & places
    for (let value4b of tiles.getTilesByType(assets.tile`myTile0b`)) {
        icoin = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . f f f f f f f . . . .
            . . . . f 1 1 1 1 1 1 1 f . . .
            . . . f 1 1 d d d d 1 1 1 f . .
            . . f 1 1 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . f 1 d 1 1 1 1 1 1 1 1 1 f .
            . . . f 1 1 d d 1 1 1 1 1 f . .
            . . . . f 1 1 1 1 1 1 1 f . . .
            . . . . . f f f f f f f . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.ICoin)
        animation.runImageAnimation(
        icoin,
        [img`
            . . . . . . . . . . . . . . . .
            . . . . f f f f f f f . . . . .
            . . . f 1 1 1 1 1 1 1 f . . . .
            . . f 1 d d d d d 1 1 1 f . . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 d 1 1 1 1 1 1 1 1 1 f . .
            . f 1 1 1 1 1 1 1 1 1 1 1 f . .
            . . f 1 1 d d d 1 1 1 1 f . . .
            . . . f 1 1 1 1 1 1 1 f . . . .
            . . . . f f f f f f f . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . f f f f f . . . . . .
            . . . . f 1 1 1 1 1 f . . . . .
            . . . f 1 d d d d 1 1 f . . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 d 1 1 1 1 1 1 1 f . . .
            . . f 1 1 1 1 1 1 1 1 1 f . . .
            . . . f 1 1 d d 1 1 1 f . . . .
            . . . . f 1 1 1 1 1 f . . . . .
            . . . . . f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . f 1 d d 1 1 f . . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 1 1 1 1 1 1 f . . . .
            . . . . f 1 1 d 1 1 f . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . f 1 d 1 f . . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 1 1 1 1 f . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f d f . . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f d f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f d f . . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . f 1 d 1 f . . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 d 1 1 1 f . . . . .
            . . . . f 1 1 1 1 1 f . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f 1 f . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . f 1 d d 1 1 f . . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 d 1 1 1 1 1 f . . . .
            . . . f 1 1 1 1 1 1 1 f . . . .
            . . . . f 1 1 d 1 1 f . . . . .
            . . . . . f 1 1 1 f . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `],
        100,
        true
        )
        tiles.placeOnTile(icoin, value4b)
        tiles.setTileAt(value4b, assets.tile`tile0`)
    }

    //boss and his status bar 
    for (let value5 of tiles.getTilesByType(assets.tile`myTileBoss`)) {
        boss = sprites.create(assets.image`Megalovania`, SpriteKind.Boss)
        tiles.placeOnTile(boss, value5)
        boss.follow(mySprite, 100, 40)
        statusbar = statusbars.create(50, 4, StatusBarKind.EnemyHealth)
        statusbar.attachToSprite(boss, -85, 0)
    }

    //falling blocks
    for (let value6 of tiles.getTilesByType(assets.tile`myFall0`)) {
        block = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Block)
        animation.runImageAnimation(
        block, 
        [img`
            d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            1 d d d d d d d d d d d d d d b
            b b b b b b b b b b b b b b b b
        `,img`
            d 1 1 1 1 b 1 1 1 1 1 1 1 1 1 b
            1 d d d d d b d d d d d d d d b
            1 d d d d d b d d d d d d d d b
            1 d d d d d d b d d d d d d d b
            1 d d d d d d b d d d d d d d b
            1 d d d d d d b d d d d d d d b
            1 d d d d d d d b d d d d d d b
            1 d d d d d d d d b d d d d d b
            1 d d d d d d d d b d d d d d b
            1 d d d d d d d b 1 b b d d d b
            1 d d d d d d d b 1 d d b b d b
            1 d d d d d d b 1 d d d d d b b
            1 d d d d d b b 1 d d d d d d b
            1 d d d d d b 1 d d d d d d d b
            1 d d d d b b 1 d d d d d d d b
            b b b b b b b b b b b b b b b b
        `,img`
            d 1 1 1 1 b 1 1 1 1 1 1 1 1 1 b
            1 d d d d d b d d d d d d d d b
            1 d d d d d b d d d d b d d d b
            1 d d d d d d b d d b b d d d b
            1 d d d d d d b d d b d d d d b
            1 d d d d b b b d d d b d d d b
            1 d d d d d d d b b b b d d d b
            1 d d d d d d b b b d d d d d b
            1 d d d b b b d d b d d d d d b
            1 d d b b d d d b 1 b b d d d b
            b d b d d d d d b 1 d d b b d b
            1 b d d d d d b 1 d d d d d b b
            1 b d d d d b b 1 d d d d d d b
            b d d d d d b 1 d d d d d d d b
            1 d d d d b b 1 d d d d d d d b
            b b b b b b b b b b b b b b b b
        `,img`
            d 1 1 1 1 b b 1 1 b 1 1 1 b b b
            1 d d d d d b d b d d d b b d b
            b d d d d d b b d d d b d d b b
            1 b b d d d d b d d b b d d d b
            1 d d b b d d b d d b d d d d b
            1 d b d d b b b d d d b d d d b
            b b d d d d d d b b b b b d d b
            1 d d d d d b b b b d d d b d b
            1 d d d b b b d d b d d d d b b
            1 d d b b d d d b 1 b b d d d b
            b d b d d d d d b 1 d d b b d b
            1 b d b d d d b 1 d b d d b b b
            1 b d b d d b b 1 d b d d d d b
            b d d d d d b 1 d d b b d d d b
            1 d d d d b b 1 d d d d b d d b
            b b b b b b b b b b b b b b b b
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . b . f . . . . . . . . .
            . . . . . . b . b . . . . . . .
            . . . b f b . . f b . f . . b .
            f . . b f . . b . . . b . . . .
            . . . . . . b . b . . . b b b .
            . . . b . . . . b . . . . . f .
            . . . f . . f . b . f b . . . .
            . b . . b . b . . b . . . b . b
            . . . . b . b . . . . . . . f .
            . . . . . . . . b . . . . . . .
            b . f . . . . . . f . b . . . .
            . . . f . . b f . . . . . b . .
            . . . b . . f . b . . f . . f .
            . . . . . . b . . . b . f b . .
            . . . . . . . f . . . . . . . .
        `, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . b . . . . . f .
            . . . f . . f . b . f b . . . .
            . b . . b . b . . b . . . b . b
            . . . . b . b . . . . . . . f .
            . . . . . . . . b . . . . . . .
            b . f . . . . . . f . b . . . .
            . . . f . . b f . . . . . b . .
            . . . b . . f . b . . f . . f .
            . . . . . . b . . . b . f b . .
            . . . . . . . f . . . . . . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . f .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . b . . . b . b
            . . . . b . . . . . . . . . f .
            . . . . . . . . . . . . . . . .
            b . . . . . . . . . . . . . . .
            . . . f . . b f . . . . . b . .
            . . . . . . f . b . . f . . f .
            . . . . . . b . . . b . . . . .
            . . . . . . . f . . . . . . . .
        `],
        1000,
        true
        )
        tiles.placeOnTile(block, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        tiles.setWallAt(value6, true)

        sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function(sprite, otherSprite) {
            timer.after(3800, function() {
                tiles.setWallAt(value6, false)
               
            })
            
        })
    }

    //meteorits
    for (let value7 of tiles.getTilesByType(assets.tile`myTileO`)) {
        meteor = sprites.create(assets.image`Meteorit`, SpriteKind.Meteorit)
        tiles.placeOnTile(meteor, value7)
        tiles.setTileAt(value7, assets.tile`tile0`)
        animation.runMovementAnimation(
        meteor,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        meteor.startEffect(effects.fire)
    }
    
}


//-----------------------------------------------------------------------------------------------------------
    
let boss: Sprite = null
let statusbar: StatusBarSprite = null
let fly: Sprite = null
let thing: Sprite = null
let meteor: Sprite = null
let block: Sprite = null
let icoin: Sprite = null
let coin: Sprite = null
let current_level = 0
startLevel()

//--------------------------------------------------------------------------------------------------------------movement animations

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
    //default position
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

//----------------------------------------------------------------------------------------------------------------------------------

//boss dialogs
scene.onOverlapTile(SpriteKind.Player,assets.image`myJukebox`, function(sprite, location) {
    timer.after(2500, function() {
        //je to nepříjemný jak se to opakuje neustále, ale nechám to tu jako Earrape :D
        music.playMelody("D4 D4 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Quarter) G4# music.rest(BeatFraction.Double) G4 F4 D4 F4 G4 C4 C4 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Quarter) G4# music.rest(BeatFraction.Double) G4 F4 D4 F4 G4 B3 B3 D5 music.rest(BeatFraction.Half) A4 music.rest(BeatFraction.Quarter) G4# music.rest(BeatFraction.Double) G4 F4 D4 F4 G4 A3# A3# D5 music.rest(BeatFraction.Half) A4 G4# G4 F4 D4 F4 G G G# G F", 500);
    })
    boss.say("SO HERE YOU ARE", 5000)
})
