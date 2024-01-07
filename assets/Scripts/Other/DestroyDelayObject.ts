import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DestroyDelayObject')
export class DestroyDelayObject extends Component {
    @property(Number)
    destroyDelay: number = 10;
    start() {

    }

    update(deltaTime: number) 
    {
        this.destroyDelay -= deltaTime;
        if(this.destroyDelay <= 0)
        {
            this.node.destroy();
        }
    }
}

