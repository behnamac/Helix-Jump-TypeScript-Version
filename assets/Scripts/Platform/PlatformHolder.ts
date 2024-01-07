import { _decorator, Component, Node } from 'cc';
import { Platform } from './Platform';
const { ccclass, property } = _decorator;

@ccclass('PlatformHolder')
export class PlatformHolder extends Component {
    public platforms: Platform[] = [];

    public BreakAll(): void
    {
        for (let i = 0; i < this.platforms.length; i++) 
        {
            this.platforms[i].Break();
        }
    }
}

