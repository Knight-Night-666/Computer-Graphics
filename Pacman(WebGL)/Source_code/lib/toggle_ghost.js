
import { Ghost } from "./ghost.js";
export const draw_ghost = function(scene,ij,box_size)
{
        let i1 = ij[0][0][0]
        let j1 = ij[0][0][1]
    
        let coordi1 = [(j1*box_size+box_size),(i1*box_size)]
        let coordi2 = [(j1*box_size+box_size),(i1*box_size+box_size)]
    
        let coordi3 = [(j1*box_size),(i1*box_size)]
        let coordi4 = [(j1*box_size),(i1*box_size+box_size)]
    
        let cordi5 = [(coordi3[0]+coordi4[0])/2,(coordi3[1]+coordi4[1])/2]
        const ghost = new Ghost(
                        coordi1,
                        coordi2,
                        cordi5,
                        [1,0,0,1])
        scene.add(ghost)
}
export const toggle_ghost = function(pacman,scene,color,ij,box_size,bool)
{   
    var count =0;

    for(let i=0;i<scene.primitives.length;i++)
    {

        if(scene.primitives[i].type =='ghost')
        {
            count+=1
        }
    }

    for(let i=0;i<scene.primitives.length;i++)
    {

        if(scene.primitives[i].type =='ghost')
        {
            scene.remove(scene.primitives[i])
            
        }
    }
    console.log('COUNT: ',count)
    if(bool)
    {   

        for(let k=0;k<ij.length;k++)
        {
            let i1,j1,i2,j2;
            i1 = ij[k][0][0]
            j1 = ij[k][0][1]
    
            let coordi1 = [(j1*box_size+box_size),(i1*box_size)]
            let coordi2 = [(j1*box_size+box_size),(i1*box_size+box_size)]
    
            let coordi3 = [(j1*box_size),(i1*box_size)]
            let coordi4 = [(j1*box_size),(i1*box_size+box_size)]
    
            let cordi5 = [(coordi3[0]+coordi4[0])/2,(coordi3[1]+coordi4[1])/2]
            const ghost = new Ghost(
                            coordi1,
                            coordi2,
                            cordi5,
                            color[k]
            )
        scene.add(ghost)
        }
        
    }
    else
    {   
        for(let k=0;k<ij.length;k++)
    {
        let i1,j1,i2,j2;
        i1 = ij[k][0][0]
        j1 = ij[k][0][1]

        let coordi1 = [(j1*box_size+box_size),(i1*box_size)]
        let coordi2 = [(j1*box_size+box_size),(i1*box_size+box_size)]

        let coordi3 = [(j1*box_size),(i1*box_size)]
        let coordi4 = [(j1*box_size),(i1*box_size+box_size)]

        let cordi5 = [(coordi3[0]+coordi4[0])/2,(coordi3[1]+coordi4[1])/2]
        const ghost = new Ghost(
                        coordi1,
                        coordi2,
                        cordi5,
                        [1,0,0.8,1]
        )
    scene.add(ghost)
    }
    pacman.transform.translateRotateScaleTransform(pacman.centerX, pacman.centerY, pacman.posX, pacman.posY,pacman.angle, 1.5)
    
    }
    
}