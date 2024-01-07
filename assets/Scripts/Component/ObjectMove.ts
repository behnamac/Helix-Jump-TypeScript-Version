import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectMove')
export class ObjectMove extends Component {

    @property(Number)
    protected speed: number = 0

    @property(Vec3)
    protected targetMove: Vec3 = new Vec3()

    canMove: boolean


    update(deltaTime: number): void {

        if (this.canMove)
            this.move(deltaTime)
    }

    private move(deltaTime: number): void
    {
        var target = new Vec3();
        Vec3.moveTowards(target, this.node.position, this.targetMove, this.speed * deltaTime)

        this.node.position = target;

        if (Vec3.distance(this.node.position, this.targetMove) <= 0.1)
            this.InactiveMove()
    }

    public ActiveMove(): void
    {
        this.canMove = true
    }
    public InactiveMove(): void
    {
        this.canMove = false
    }
}


