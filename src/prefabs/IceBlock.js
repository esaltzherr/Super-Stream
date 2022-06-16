class IceBlock extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        
        this.scene.physics.add.existing(this, false);
        
        this.setOrigin(0,0);
        this.displayHeight = 0;
        this.displayWidth = 64;

        this.body.pushable = false;
        this.state = 1;
    }
    
    preUpdate(){
        switch(this.state){
            case 1:
                if(this.displayHeight > 100){
                    this.state = 2;
                    break;
                }
                this.y -= 1
                this.displayHeight += 1;
                break;
            case 2:
                console.log("Done");
                this.state = 3;
                break;
        }
    }
}