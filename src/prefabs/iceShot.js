class IceShot extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        this.player = player;
        this.setPushable(false);
        this.gravity = 500;
        this.speed = 500;
        this.speedUp = 100;
        this.lifespan = 300;
        this.setSize(0.1, 0.1);
        this.setCollideWorldBounds(true);
        this.setVisible(false);
        this.touched = "none";
        
    }
    preUpdate(){
        this.lifespan -= 1;
        if(this.lifespan <= 0){
            this.fizzleParticles();
            this.destroy();
            return;    
        }
        
        if(!this.body.touching.none){
            if(this.body.touching.right){
                this.touched = "right";
            }
            else if(this.body.touching.left){
                this.touched = "left";
            }
        }
        
        
        if(this.body.touching.down){
            var block;
            if(this.touched == "right"){
                block = new IceBlock(this.scene, this.x,this.y).setOrigin(1,0);
            }
            else if(this.touched == "left"){
                block = new IceBlock(this.scene, this.x,this.y).setOrigin(0,0);
            }
            else{
                block = new IceBlock(this.scene, this.x,this.y).setOrigin(0.5,0);
            }
            //var block = this.scene.add.tileSprite(this.x,this.y + this.height * this.scaleY, 100, 100, 'icePillar');
            //var jeff = new IceBlock(this.scene, 100, 100);


            
            this.scene.ice.add(block);
            this.destroyParticles();
            this.destroy();
            return;
        }
        this.travelParticles();

        
    }
    init(){
        this.setGravityY(this.gravity);
        // Facing backwards
        //this.setVelocityY(-this.speedUp);

        if(keyS.isDown){
            this.setVelocityY(this.speed);
            this.setVelocityX(0);
            this.y = this.player.y + this.player.displayHeight / 2;
            return;
        }
        if(this.player.flipX == false){
            this.x = this.player.x - (this.player.displayWidth / 2);
            this.setVelocityX(-this.speed);
        }
        else{
            this.x = this.player.x + (this.player.displayWidth / 2);
            this.setVelocityX(this.speed);
        }
        
    }
    travelParticles(){
        let particleManager = this.scene.add.particles('iceParticle'); 
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: { min: 100, max: 300 },
            speed: 100,
            quantity: 1,
            gravityY: 300,
            scale: { start: 0.5, end: 0.1 },
            frequency: 10000,
            deathCallback: () => { particleManager.destroy();},
        });
    }
    destroyParticles(){
        let particleManager = this.scene.add.particles('iceParticle'); 
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            emitZone: { source: new Phaser.Geom.Line(-32, 0, 32, 0),
                type: 'edge',
                quantity: 50},
            lifespan: { min: 200, max: 500 },
            speed: {min: 40, max: 100},
            quantity: 50,
            gravityY: 100,
            scale: { start: 0.3, end: 0.1 },
            frequency: 100000,
            deathCallback: () => { particleManager.destroy();},
            blendMode: "ADD"
        });
    }
    fizzleParticles(){
        let particleManager = this.scene.add.particles('iceParticle'); 
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: { min: 200, max: 500 },
            speed: {min: 40, max: 100},
            quantity: 50,
            gravityY: 100,
            scale: { start: 0.3, end: 0.1 },
            frequency: 100000,
            deathCallback: () => { particleManager.destroy();},
            blendMode: "ADD"
        });
    }
    
}