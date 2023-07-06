import { Transform } from "./transform.js";


export class Circle
{
	constructor(center,radius,color) 
	{   

        var cen = [center[0],center[1],0];
        var vertices =[];
        for(let i=0.0;i<360;i++)
        {
            vertices = vertices.concat(cen);
            // console.log(cen)
            var j = i* Math.PI / 180;
            var ver_1 = [cen[0]+radius*Math.sin(j),
                        cen[1]+radius*Math.cos(j),
                        0];
            // console.log(ver_1);
            vertices = vertices.concat(ver_1);

            var k = (i+1)* Math.PI /180;
            var ver_2 = [cen[0]+radius*Math.sin(k),cen[1]+radius*Math.cos(k),0];
            vertices = vertices.concat(ver_2);
        }
        console.log(vertices);
		this.vertexPositions = new Float32Array(vertices);
        this.type = "circle";
		this.color = color;
        this.transform = new Transform();
	}
}
