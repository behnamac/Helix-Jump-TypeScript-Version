import { _decorator, BoxCollider, BoxCollider2D, Collider, Collider2D, Component, ITriggerEvent } from 'cc';
import { eventManager } from '../Manager/EventManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('CollisionSystem')
export class CollisionSystem extends Component {

    start() {
        let collider = this.node.getComponent(Collider);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
        collider.on('onTriggerExit', this.onTriggerExit, this);
        collider.on('onCollisionEnter', this.onCollisionEnter, this);
        collider.on('onCollisionExit', this.onCollisionExit, this);
    }

    onTriggerEnter(event: ITriggerEvent)
    {
    }
    onTriggerExit(event: ITriggerEvent)
    {
    }
    onCollisionEnter(event: ITriggerEvent)
    {
    }
    onCollisionExit(event: ITriggerEvent)
    {
    }
}


