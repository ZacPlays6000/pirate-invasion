class Ship{
    constructor(x,y,w,h,pos,boatAnimation){
        var properties = {
            restitution:0.8,
            friction:1,
            density:1,
        }
        this.body = Bodies.rectangle(x,y,w,h,properties)
        World.add(world,this.body)
        this.w=w
        this.h=h
        this.pos=pos
        this.image=loadImage("assets/boat.png")
        this.animation=boatAnimation
        this.speed=0.05
        this.broken = false
    }
    animate(){
        this.speed+=0.05%1.1
    }
    showBoat(){
        var index = floor(this.speed%this.animation.length)
        push()
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.pos,this.w,this.h)
        pop()
    }
    removeBrokenBoat(index){
        this.animation=brokenBoatAnimation
        this.speed=0.05
        this.w=170
        this.h=170
        this.broken = true
        setTimeout(()=>{
            World.remove(world,ships[index].body)
            ships.slice(index,1)
        },3000)
    }
}