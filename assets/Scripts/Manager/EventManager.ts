import { _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
class EventManager extends EventTarget {
    private static _instance: EventManager = null;

    public static getInstance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }
}

export const eventManager = EventManager.getInstance();