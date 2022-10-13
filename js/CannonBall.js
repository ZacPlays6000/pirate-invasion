class CannonBall{
    constructor(x,y){
        this.r=15
        this.body=Bodies.circle(x,y,this.r,{isStatic:true})
        World.add(world,this.body)
        this.image=loadImage("assets/cannonball.png")
        this.trajectory=[]
        this.sink=false
    }
    showBall(){
        push()
        imageMode(CENTER)
        image(this.image,this.body.position.x,this.body.position.y,this.r*2,this.r*2)
        pop()
        if (this.body.velocity.x>0&&this.body.position.x>250){
            var position = [this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
        }
        for (var i = 0;i<this.trajectory.length;i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
    }
    shoot(){
        var angle = cannon.angle-30
        angle=angle*(3.14/180)
        var velocity = p5.Vector.fromAngle(angle)
        velocity.mult(0.3)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14),y:velocity.y*(180/3.14)})
    }
}