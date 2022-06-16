class Attack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        this.player = player;
        this.scene.physics.add.existing(this, false);

        this.setPushable(false);
        this.setSize(0.1, 0.1);
        this.setVisible(false);
        this.speed = 600;
        this.lifespan = 100;
    }
    
    preUpdate(){
        this.lifespan -= 1;
        if(this.lifespan <= 0){
            this.explodeParticles();
            this.destroy();
            return;    
        }
        if(!this.body.touching.none){
            
            this.explodeParticles();
            this.destroy();
            return;
        }
        this.travelParticles();
    }
    init(){
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
        let particleManager = this.scene.add.particles('AttackParticle'); 
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: { min: 100, max: 300 },
            speed: 100,
            quantity: 1,
            gravityY: 1000,
            scale: { start: 0.5, end: 0.1 },
            frequency: 10000,
            deathCallback: () => { particleManager.destroy();},
        });
    }
    explodeParticles(){
        let particleManager = this.scene.add.particles('AttackParticle'); 
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            emitZone: { source: new Phaser.Geom.Circle(0, 0, 30),
                type: 'random',
                quantity: 20},
            lifespan: { min: 100, max: 500 },
            speed: 200,
            quantity: 30,
            scale: { start: 0.5, end: 0.1 },
            frequency: 1000,
            deathCallback: () => { particleManager.destroy();},
        });
    }
}