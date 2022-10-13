class Tower{
    constructor(x,y,w,h) {
        this.body=Bodies.rectangle(x,y,w,h,{isStatic:true})
        World.add(world,this.body)
        this.width=w
        this.height=h
        this.image=loadImage("assets/tower.png")
    }
    showTower() {
        var pos=this.body.position
        push()
        imageMode(CENTER)
        image(this.image,pos.x,pos.y,this.width,this.height)
        pop()
    }
}
