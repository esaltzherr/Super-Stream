class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        this.setPushable(false);
        this.setScale(4);
        this.moveSpeed = 400;
        this.jumpSpeed = 1000;
        this.setGravityY(3000);

        this.canShoot = true;
        this.maxShootTimer = 200;
        this.shootTimer = this.maxShootTimer;

        this.canFire = true;
        this.maxFireTimer = 20;
        this.FireTimer = this.maxFireTimer;

    }

    update() {
        this.move();
        this.abilitys();
        
        if(this.canShoot == false){
            this.shootTimer -= 1;
            if(this.shootTimer <= 0){
                this.canShoot = true;
                this.shootTimer = this.maxShootTimer;
            }
        }
        if(this.canFire == false){
            this.FireTimer -= 1;
            if(this.FireTimer <=0){
                this.canFire = true;
                this.FireTimer = this.maxFireTimer;
            }
        }        

    }
    move() {
        //var verticle = 0;
        // Get Input
        var horizontal = 0;
        if (keyA.isDown) {
            horizontal -= 1;
        }
        if (keyD.isDown) {
            horizontal += 1;
        }
        // Flip Model
        if (horizontal < 0) {
            this.flipX = false;
        }
        else if (horizontal > 0) {
            this.flipX = true;
        }
        // Set Velocity
        this.setVelocityX(horizontal * this.moveSpeed);
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.body.touching.down) {
            this.setVelocityY(-this.jumpSpeed);
        }
    }
    abilitys() {
        if (Phaser.Input.Keyboard.JustDown(keySHIFT) && this.canShoot) {
            var shot = new IceShot(this.scene, this.x, this.y, 'IceShot', this);
            this.scene.iceShot.add(shot);
            shot.init();
            this.canShoot = false;
        }
        else if(Phaser.Input.Keyboard.JustDown(keyQ) && this.canFire){
            var attack = new Attack(this.scene, this.x, this.y, 'IceShot', this);
            this.scene.iceShot.add(attack);
            attack.init();
            this.canFire = false;
        }

    }
}