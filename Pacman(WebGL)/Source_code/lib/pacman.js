import { Transform } from "./transform.js";
import { get_coordi, grid } from "./grid.js";
import { change_pellet_color, pellets_grid } from "./pellets.js";
import { toggle_ghost } from "./toggle_ghost.js";
// import {  } from "./pellets.js";
export class Pacman
{

	constructor(x, y, box_size, color)
	{
        this.orient = 0
        this.tileCoord = get_coordi(x, y, box_size);
        this.centerX = (this.tileCoord[0].x+this.tileCoord[2].x)/2;
        this.centerY = (this.tileCoord[0].y+this.tileCoord[2].y)/2;
        console.log('Center coordi',this.centerX,this.centerY);
        console.log();

		this.color = color;
        this.box_size = box_size;
        this.radius = this.box_size/2.5;

        this.posX = 0;
        this.posY = 0;
        this.angle = 0;
        // this.direction = "start"


        this.vertexPositions = this.construct_pacman();
        this.type = "pacman";
		this.transform = new Transform();

        
	}
    construct_pacman()
    {
        var cen = [this.centerX,this.centerY,0];
        var vertices =[];
    
        for(let i=145.0;i<405;i++)
        {
            vertices = vertices.concat(cen);
            var j = i* Math.PI / 180;
            var ver_1 = [cen[0]+this.radius*Math.sin(j),
                        cen[1]+this.radius*Math.cos(j),
                        0];

            vertices = vertices.concat(ver_1);
    
            var k = (i+1)* Math.PI /180;
            var ver_2 = [cen[0]+this.radius*Math.sin(k),cen[1]+this.radius*Math.cos(k),0];
            vertices = vertices.concat(ver_2);
        }

        var vert_arr = new Float32Array(vertices);
        return vert_arr;
    }

    give_coordi(x,y)
    {
        let i,j;
        j = (x-this.box_size/2)/this.box_size;
        i = (y-this.box_size/2)/this.box_size;

        return [i,j]
    }


    is_wall(x,y)
    {
        let i,j;
        j = (x-this.box_size/2)/this.box_size;
        i = (y-this.box_size/2)/this.box_size;
        if(grid[i][j] == 1)
        return true;
        else return false;
    }

    move_it(direction,scene){
        // console.log(this.is_wall(this.posX+this.centerX-this.box_size,this.posY+this.centerY),this.is_wall(this.posX+this.centerX+this.box_size,this.posY+this.centerY))
        // console.log(this.is_wall(this.posX+this.centerX,this.posY+this.centerY-this.box_size),this.is_wall(this.posX+this.centerX,this.posY+this.centerY+this.box_size))
        if(direction == "right" && this.is_wall(this.posX+this.centerX+this.box_size,this.posY+this.centerY)){
            console.log("Direction:",direction);
            this.posX += this.box_size;
            console.log('Current center:',this.posX+this.centerX,this.posY+this.centerY);
            var ij = this.give_coordi(this.posX+this.centerX,this.posY+this.centerY)
            this.transform.translateTransform(this.posX, this.posY);
            change_pellet_color(ij,scene,this.box_size)
            if(pellets_grid[ij[0]][ij[1]] ==  0 || pellets_grid[ij[0]][ij[1]] == 1)
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,true)
            else
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,false)
            this.orient = 0;
            console.log('orientation',this.orient);
            
        }
        if(direction == "left" && this.is_wall(this.posX+this.centerX-this.box_size,this.posY+this.centerY)){
            
            console.log("Direction:",direction);
            this.posX -=this.box_size;
            this.angle = Math.PI;
            console.log('Current center:',this.posX+this.centerX,this.posY+this.centerY);
            var ij = this.give_coordi(this.posX+this.centerX,this.posY+this.centerY)
            this.orient = 2;
            this.transform.translateRotateTransform(this.centerX, this.centerY, -this.posX, -this.posY, this.angle);
            change_pellet_color(ij,scene,this.box_size)
            if(pellets_grid[ij[0]][ij[1]] ==  0 || pellets_grid[ij[0]][ij[1]] == 1)
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,true)
            else
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,false)
            console.log(this.orient);
        }
        if(direction == "up" && this.is_wall(this.posX+this.centerX,this.posY+this.centerY-this.box_size)){

            console.log("Direction:",direction);
            this.posY -= this.box_size;
            this.angle = 3*Math.PI/2;
            console.log('Current center:',this.posX+this.centerX,this.posY+this.centerY);
            var ij = this.give_coordi(this.posX+this.centerX,this.posY+this.centerY)
            this.orient = 3;
            this.transform.translateRotateTransform(this.centerX, this.centerY, -this.posY, this.posX, this.angle);
            change_pellet_color(ij,scene,this.box_size)
            if(pellets_grid[ij[0]][ij[1]] ==  0 || pellets_grid[ij[0]][ij[1]] == 1)
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,true)
            else
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,false)
            console.log(this.orient);
                
        }
        if(direction == "down" && this.is_wall(this.posX+this.centerX,this.posY+this.centerY+this.box_size)){

            console.log("Direction:",direction);
            this.posY += this.box_size
            this.angle = Math.PI/2
            console.log('Current center:',this.posX+this.centerX,this.posY+this.centerY)
            var ij = this.give_coordi(this.posX+this.centerX,this.posY+this.centerY)
            this.orient = 1
            this.transform.translateRotateTransform(this.centerX, this.centerY, this.posY, -this.posX, this.angle)
            change_pellet_color(ij,scene,this.box_size)
            if(pellets_grid[ij[0]][ij[1]] ==  0 || pellets_grid[ij[0]][ij[1]] == 1)
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,true)
            else
                toggle_ghost(this,scene,[[1,0,0,1]],[[[1,grid[0].length-2]]],this.box_size,false)
            console.log(this.orient)

        }

    }
    
    get_pos_Dir(x, y){
        if(this.orient == 0)
        return [x,y]
        else if(this.orient == 1)
        return [y,-x]
        else if(this.orient ==2)
        return [-x,-y]
        else
        return [-y,x]
    }
    ensure_orientation(pacman){
            var posX_Dir = this.get_pos_Dir(pacman.posX,pacman.posY)[0];
            var posY_Dir = this.get_pos_Dir(pacman.posX,pacman.posY)[1];
            this.transform.translateRotateTransform(this.centerX, this.centerY, posX_Dir, posY_Dir, pacman.angle)
            
    }
    rotate_it(key){
        console.log(this.orient)
        if(key == ")"){
            this.angle += Math.PI/2;
            this.orient = (this.orient+1)%4;
            var posX_Dir = this.get_pos_Dir(this.posX,this.posY)[0];
            var posY_Dir = this.get_pos_Dir(this.posX,this.posY)[1];
            this.transform.translateRotateTransform(this.centerX, this.centerY, posX_Dir, posY_Dir, this.angle)
            
        }
        if(key == "("){
            this.angle -= Math.PI/2;
            this.orient = (this.orient + 3)%4;
            var posX_Dir = this.get_pos_Dir(this.posX,this.posY)[0];
            var posY_Dir = this.get_pos_Dir(this.posX,this.posY)[1];
            this.transform.translateRotateTransform(this.centerX, this.centerY, posX_Dir, posY_Dir, this.angle)
        }
    }
    tp_maar(sc_locX,sc_locY,box_size)
    {
        this.posX = Math.floor(sc_locX/box_size) * box_size - this.centerX + Math.floor(box_size/2)
        this.posY = Math.floor(sc_locY/box_size) * box_size - this.centerY + Math.floor(box_size/2)

        if(this.is_wall(this.posX + this.centerX,this.posY+this.centerY,box_size))
        {
            this.transform.translateTransform(this.posX,this.posY);
        }
    }

}
