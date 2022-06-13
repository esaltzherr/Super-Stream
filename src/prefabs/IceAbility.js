class IceAbility extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        
        this.scene.physics.add.existing(this, false);

        this.setPushable(false);
        this.setScale(4);
        this.state = 1;
        this.startingHeight = this.y;
        this.totalHeight = 100;
        this.riseSpeed = 1;
        this.depth = -1;
    }
    
    preUpdate(){
        switch(this.state){
            case 1:
                if(this.y <= this.startingHeight - this.totalHeight){
                    this.state = 2;
                    break;
                }
                this.y -= this.riseSpeed;
                break;
        }
    }
}