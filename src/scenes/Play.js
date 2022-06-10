class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {
        this.load.image('Player', './assets/waterDrop.png');
        this.load.image('IceAbility', './assets/iceCube.png');





        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    create() {
        this.input.mouse.disableContextMenu();
        this.input.setPollAlways();
        this.map = this.physics.add.group();



        this.player = new Player(this, 200, 100, 'Player');

        for(var i = 0; i < 10; i++){
            this.ground = new Ground(this, i * 16*4, 300, 'IceAbility');    
            this.map.add(this.ground);
            this.ground = new Ground(this, 64, i * 16*4 + 44, 'IceAbility');
            this.map.add(this.ground);
        }
        

        
        this.cameras.main.startFollow(this.player);

        



        this.physics.add.collider(this.player, this.map);
    }
    update(){
        this.player.update();
    }
}