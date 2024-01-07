import { _decorator, Component, instantiate, ITriggerEvent, Node, Prefab, randomRange, RigidBody, Vec3 } from 'cc';
import { CollisionSystem } from '../Component/CollisionSystem';
import { GameManager } from '../Manager/GameManager';
import { Platform } from '../Platform/Platform';
import { PlatformHolder } from '../Platform/PlatformHolder';
const { ccclass, property } = _decorator;

@ccclass('PlayerMove')
export class PlayerMove extends CollisionSystem {

    @property(Number)
    private jumpForce: number = 0
    @property([Prefab])
    private splashs = [];

    private _rigidBody: RigidBody
    private numberFloor: number = 0;
    start(): void {
        super.start()
        this._rigidBody = this.getComponent(RigidBody)
    }
    onCollisionEnter(event: ITriggerEvent): void 
    {
        super.onCollisionEnter(event)

        var platform = event.otherCollider.getComponent(Platform)
        if(!platform) return;
        if(platform.platformType == 0)
        {
            var jumpAxis = new Vec3(0, this.jumpForce, 0)
            this._rigidBody.setLinearVelocity(jumpAxis);
            var randomRotation = new Vec3(randomRange(-20, 20), randomRange(-20, 20), randomRange(-20, 20));
            this._rigidBody.setAngularVelocity(randomRotation);
            if(this.numberFloor>=2)
            platform.Break();
        }
        else if(platform.platformType == 1)
        {
            if(this.numberFloor>=2)
                platform.Break();
            else
                GameManager.Instance.LevelFail()
        }
        else if(platform.platformType == 2)
        {
            GameManager.Instance.LevelCompelet()
        }

        var splash = this.GetSplashPrefab();
        var pos = new Vec3(this.node.worldPosition.x, platform.node.worldPosition.y + 0.3, this.node.worldPosition.z);
        var angle = randomRange(0, 360);
        var splashSpawned = instantiate(splash);
        splashSpawned.parent = platform.node.parent;
        splashSpawned.setWorldPosition(pos);
        splashSpawned.eulerAngles = new Vec3(0, angle, 0);
        this.numberFloor = 0;
    }
    onTriggerEnter(event: ITriggerEvent): void {
        if(event.otherCollider.getComponent(PlatformHolder))
        {
            event.otherCollider.getComponent(PlatformHolder).BreakAll();
            this.numberFloor++;
        }
    }

    GetSplashPrefab(): Prefab
    {
        var randomIndex = Math.floor(Math.random() * this.splashs.length);
        return this.splashs[randomIndex];
    }
}


