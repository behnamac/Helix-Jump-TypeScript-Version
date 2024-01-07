import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Panel')
export class Panel extends Component {
    @property
    panelName = '';

    @property(Node)
    panel = null;
}

