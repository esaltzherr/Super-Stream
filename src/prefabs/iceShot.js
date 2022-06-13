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
        this.lifespan = 300;
        this.setCollideWorldBounds(true);
        this.setVisible(false);
        
    }
    preUpdate(){
        this.lifespan -= 1;
        if(this.lifespan <= 0){
            this.fizzleParticles();
            this.destroy();
            return;    
        }
        if(this.body.touching.down){
            //var block = this.scene.add.tileSprite(this.x,this.y + this.height * this.scaleY, 100, 100, 'icePillar');
            var block = new IceAbility(this.scene, this.x,this.y + this.height * this.scaleY, 'icePillar').setOrigin(0.5,0);
            
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
        if(this.player.flipX == false){
            this.speed *= -1;
        }
        if(keyS.isDown){
            this.speed = 0;
        }
        this.setVelocityX(this.speed);
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