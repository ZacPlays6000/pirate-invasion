class Cannon{
    constructor(x,y,w,h,a){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.angle=a
        this.cannon=loadImage("assets/CANON.png")
        this.cannonBase=loadImage("assets/cannon_base.png")
    }
    showCannon(){
        push()
        translate(this.x,this.y)
        rotate(this.angle)
        imageMode(CENTER)
        image(this.cannon,0,0,this.w,this.h)
        pop()
        image(this.cannonBase,50,25,220,200)
        if (keyIsDown(RIGHT_ARROW)&&this.angle<60){
            this.angle+=1
        }

        if (keyIsDown(LEFT_ARROW)&&this.angle>-30){
            this.angle-=1
        }
        console.log(this.angle)
    }
}