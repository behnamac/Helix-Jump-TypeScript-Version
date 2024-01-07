import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Platform } from './Platform';
import { PlatformHolder } from './PlatformHolder';
const { ccclass, property } = _decorator;

@ccclass('PlatformGenerator')
export class PlatformGenerator extends Component {
    @property(Prefab)
    platformPrefab: Prefab = null;
    @property(Prefab)
    platformHolder: Prefab = null;
    @property(Number)
    numberfloor: number = 10;
    @property(Number)
    spaceFloor: number = 0;
    @property(Number)
    spacePlatform: number = 45;
    @property(Number)
    cylinderHeight: number = 0;
    start() 
    {
        this.Generate();
    }
    private Generate(): void
    {
        for (let i = 0; i < this.numberfloor; i++) {
            var posY = (-i * this.spaceFloor) + this.cylinderHeight;
            var holder = instantiate(this.platformHolder).getComponent(PlatformHolder);
            holder.node.position = new Vec3(0, posY, 0);
            holder.node.parent = this.node;
            const randomNumberRemove = Math.floor(Math.random() * 3 + 1);
            const randomNumberBad = Math.floor(Math.random() * 4);
            const indexRemove = Array.from({ length: randomNumberRemove }, () =>

            Math.floor(Math.random() * 8)
            );
            const indexBad = Array.from({ length: randomNumberBad }, () =>
                Math.floor(Math.random() * 8)
            );
            for (let j = 0; j < 8; j++) 
            {
                var findRemovePlatform = false;
                for (let k = 0; k < indexRemove.length; k++) {
                    if(j == indexRemove[k])
                    findRemovePlatform = true;
                }
                if(i < this.numberfloor - 1 && findRemovePlatform)
                {
                    continue;
                }
                var platform = instantiate(this.platformPrefab).getComponent(Platform);
                platform.node.parent = this.node;
                platform.node.position = new Vec3(0, posY, 0);
                holder.platforms.push(platform);
                
                var angle = this.spacePlatform * j;
                platform.node.eulerAngles = new Vec3(90, angle, 0);

                var findBadPlatform = false;
                for (let k = 0; k < indexBad.length; k++) {
                    if(j == indexBad[k])
                    findBadPlatform = true;
                }


                if(i < (this.numberfloor - 1))
                {
                    if(!findBadPlatform)
                        platform.ChangeType(0);
                    else if(i != 0)
                    {
                        platform.ChangeType(1);
                    }
                }
                else
                    platform.ChangeType(2);
            }
        }
    }
}

