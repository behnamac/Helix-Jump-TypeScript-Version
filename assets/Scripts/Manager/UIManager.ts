import { Button, Component, _decorator } from "cc";
import { GameManager } from "./GameManager";
import { Panel } from "../UI/Panel";
import { eventManager } from "./EventManager";

const { ccclass, property } = _decorator;

@ccclass
export class UIManager extends Component {
    static Instance = null;

    @property([Panel])
    panelHolders: Panel[] = [];

    @property
    activeLosePanelDelay = 0;
    @property
    activeWinPanelDelay = 0;

    @property(Button)
    startButton = null;
    @property([Button])
    resetLevelButtons = [];

    _panelDic = {};

    start() {
        UIManager.Instance = this;
        this._panelDic = []

        for (let i = 0; i < this.panelHolders.length; i++) {
            this._panelDic[this.panelHolders[i].panelName] = this.panelHolders[i];
        }
        
        for (let i = 0; i < this.resetLevelButtons.length; i++) {
            this.resetLevelButtons[i].node.on('click', () => {
                GameManager.Instance.ResetLevel();
            });
        }
        this.startButton.node.on('click', () => {
            this.activePanel("GamePlay")
            GameManager.Instance.LevelStart()
        });

        this.activePanel("Start");

        eventManager.addEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.addEventListener("OnLevelFail", () => this.OnLevelFail());
    }
    
    onDestroy()
    {
        eventManager.removeEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.removeEventListener("OnLevelFail", () => this.OnLevelFail());
    }

    activeLosePanel() {
        console.log(this.panelHolders.length);
        this.scheduleOnce(() => {
            this.activePanel('Lose');
        }, this.activeLosePanelDelay);
    }
    activeWinPanel() {
        this.scheduleOnce(() => {
            this.activePanel('Win');
        }, this.activeWinPanelDelay);
    }

    activePanel(panelName) {
        for (let i = 0; i < this.panelHolders.length; i++) {
            this.panelHolders[i].panel.active = false;
        }

        this._panelDic[panelName].panel.active = true;
    }

    inactivePanel(panelName) {
        this._panelDic[panelName].panel.active = false;
    }

    getPanel(panelName) {
        return this._panelDic[panelName];
    }

    private OnLevelCompelet()
    {
        this.activePanel('Win');
    }
    private OnLevelFail()
    {
        this.activePanel('Lose');
    }
}