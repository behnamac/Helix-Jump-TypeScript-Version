import { _decorator, Component, EventMouse, EventTouch, Input, input, Node, Vec2, Vec3 } from 'cc';
import { eventManager } from '../Manager/EventManager';
const { ccclass, property } = _decorator;

@ccclass('PlatformRotate')
export class PlatformRotate extends Component {
    @property(Number)
    private speed: number = 0

    private _canRotate: boolean = false
    private _press: boolean = false

    private _horizontal: number = 0
    private _mouseXStartPosition: number = 0
    private _mousePosition: Vec2 = new Vec2

    private _angle: number = 0

    //#region Cocos Functions
    start() 
    {
        this._angle = this.node.eulerAngles.y

        //Set Key Input Event
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this)
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this)
        //Set Key Touch Event
        input.on(Input.EventType.TOUCH_START, this.onTouchDown, this)
        input.on(Input.EventType.TOUCH_END, this.onTouchUp, this)
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)

        eventManager.addEventListener("OnLevelStart", () => this.onLevelStart());
        eventManager.addEventListener("OnLevelCompelet", () => this.onLevelCompelet());
        eventManager.addEventListener("OnLevelFail", () => this.onLevelFail());
    }
    onDestroy(): void 
    {
        //Remove Key Input Event
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this)
        input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this)
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this)
        //Set Key Touch Event
        input.off(Input.EventType.TOUCH_START, this.onTouchDown, this)
        input.off(Input.EventType.TOUCH_END, this.onTouchUp, this)
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this)

        eventManager.removeEventListener("OnLevelStart", () => this.onLevelStart());
        eventManager.removeEventListener("OnLevelCompelet", () => this.onLevelCompelet());
        eventManager.removeEventListener("OnLevelFail", () => this.onLevelFail());
    }

    update(deltaTime: number) 
    {
          if(this._canRotate)
          {
              this.RotatePlatform(deltaTime)
          }
    }
    //#endregion

    //#region Private Functions
    private RotatePlatform(deltaTime: number)
    {
        if(this._press)
        {
            this._horizontal = (this._mousePosition.x - this._mouseXStartPosition) / deltaTime;
            this._mouseXStartPosition = this._mousePosition.x;

            this._angle += this._horizontal* this.speed * deltaTime
            this.node.eulerAngles = new Vec3(0, this._angle, 0)
        }  
    }
    //#endregion

    //#region Mouse Input
    onMouseMove(event: EventMouse)
    {
        this._mousePosition = event.getLocation()
    }
    onMouseUp(event: EventMouse)
    {
        this._horizontal = 0
        this._press = false
    }
    onMouseDown(event: EventMouse)
    {
        this._mouseXStartPosition = this._mousePosition.x
        this._press = true
    }
    //#endregion

    //#region Touch Input
    onTouchMove(event: EventTouch)
    {
        this._mousePosition = event.getLocation()
    }
    onTouchDown(event: EventTouch)
    {
        this._mouseXStartPosition = this._mousePosition.x
        this._press = true
    }
    onTouchUp(event: EventTouch)
    {
        this._horizontal = 0
        this._press = false
    }
    //#endregion

    //#region Game State Events
    onLevelStart()
    {
        this._canRotate = true
    }
    onLevelCompelet()
    {
        this._canRotate = false
    }
    onLevelFail()
    {
        this._canRotate = false
    }
    //#endregion
}


