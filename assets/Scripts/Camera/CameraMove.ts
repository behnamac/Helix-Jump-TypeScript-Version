import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraMove')
export class CameraMove extends Component {
    @property(Node)
    private target: Node = null

    update(deltaTime: number) {
        
    }
    protected lateUpdate(dt: number): void {

        if(this.target.position.y <= this.node.position.y)
        {
            var targetPos = new Vec3(0,0,0);
            Vec3.lerp(targetPos, this.node.position, this.target.position, 5 * dt);
            this.node.worldPosition = targetPos;
        }
    }
}


