import { _decorator, Collider, color, Color, Component, Enum, Material, MeshRenderer, Node, RigidBody } from 'cc';
const { ccclass, property } = _decorator;

var PlatformType;
PlatformType = Enum
({
    Good: 0,
    Bad: 1,
    Finish: 2
})
@ccclass('Platform')
export class Platform extends Component 
{
    @property({type:Enum(PlatformType)})
    public platformType = PlatformType.Good

    
    @property(Material)
    private goodMaterial: Material = null
    @property(Material)
    private badMaterial: Material = null
    @property(Material)
    private finishMaterial: Material = null
    
    private slices: RigidBody[] = [];
    private allMeshs: MeshRenderer[] = []
    private collider: Collider = null;
    private mainMesh: Node = null;
    onLoad()
    {
        this.mainMesh = this.node.getChildByName('Cylinder.006');
        this.allMeshs = this.getComponentsInChildren(MeshRenderer)
        this.collider = this.getComponent(Collider);
        this.slices = this.getComponentsInChildren(RigidBody);

        for (let i = 0; i < this.slices.length; i++) {
            if(this.slices[i].node != this.node)
                this.slices[i].node.active = false;
        }
    }

    public ChangeType(type: number)
    {
        this.platformType = type;
        this.SetMeshColor();
    }
    private SetMeshColor(): void
    {
        for(var i = 0; i < this.allMeshs.length; i++)
        {
            if(this.platformType == PlatformType.Bad)
                this.allMeshs[i].material = this.badMaterial;
            else if(this.platformType == PlatformType.Good)
                this.allMeshs[i].material = this.goodMaterial;
            else
                this.allMeshs[i].material = this.finishMaterial;
        }
    }

    public Break(): void
    {
        for (let i = 0; i < this.slices.length; i++) 
        {
            if(this.slices[i].node != this.node)
                this.slices[i].node.active = true;
        }     
        this.collider.enabled = false;
        this.mainMesh.active = false;
    }
}


