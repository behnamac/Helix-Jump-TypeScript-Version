import { _decorator, Component, director, Game, instantiate, Node, Prefab, random, randomRange, randomRangeInt, sys } from 'cc';
import { eventManager } from './EventManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    static Instance = null

    @property([Prefab])
    PrefabLevels = []
    @property(Node)
    LevelParent = null

    private _activeLevel: Node = null
    private _endGame: boolean = false
    onLoad()
    {
        GameManager.Instance = this
        this.SpawnLevel()
    }
    public LevelStart(): void
    {
        eventManager.dispatchEvent(new Event('OnLevelStart'));
    }
    public LevelCompelet(): void
    {
        if(this._endGame) return
        eventManager.dispatchEvent(new Event('OnLevelCompelet'));
        this._endGame = true
    }
    public LevelFail(): void
    {
        if(this._endGame) return
        eventManager.dispatchEvent(new Event('OnLevelFail'));
        this._endGame = true
    }

    public ResetLevel(): void
    {
        director.loadScene('scene');
    }

    private SpawnLevel()
    {
        var level = this.GetLevel()
        var levelSpawned = instantiate(level)
        levelSpawned.parent = this.LevelParent
        this._activeLevel = levelSpawned
    }
    private GetLevel(): Prefab
    {
        var levelIndex = randomRangeInt(0, this.PrefabLevels.length)
        console.log(levelIndex)
        return this.PrefabLevels[levelIndex]
    }
}

