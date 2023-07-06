import { Scene, Triangle, Quadrilateral, WebGLRenderer, Shader, Circle, Pacman } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import {grid,draw_grid, set_grid, change_grid} from './lib/grid.js';

import { change_pellet_grid, initiate_pellets, pellets, pellets_grid, set_pellets, set_pellets_grid } from './lib/pellets.js';
import { draw_ghost } from './lib/toggle_ghost.js';


function rotate_all_right(pellets,grid,pellets_grid)
{
	pellets = pellets[0].map((val, index) => pellets.map(row => row[index]).reverse())
	grid = grid[0].map((val, index) => grid.map(row => row[index]).reverse())
	pellets_grid = pellets_grid[0].map((val, index) => pellets_grid.map(row => row[index]).reverse())
	return [grid,pellets,pellets_grid]
}
function rotate_all_left(pellets,grid,pellets_grid)
{
	pellets = pellets[0].map((val, index) => pellets.map(row => row[row.length-1-index]));
	grid = grid[0].map((val, index) => grid.map(row => row[row.length-1-index]));
	pellets_grid = pellets_grid[0].map((val, index) => pellets_grid.map(row => row[row.length-1-index]));
	return [grid,pellets,pellets_grid]
}

function draw_pellets(pellets,scene)
{
	for(let j = 0; j<pellets[0].length; j++)
    {
        for(let i = 0; i<pellets.length; i++)
        {
			console.log(pellets[i][j])
            scene.add(pellets[i][j]);
        }
    }
}

const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);

document.body.appendChild(renderer.domElement);

const shader = new Shader(
	renderer.glContext(),
	vertexShaderSrc,
	fragmentShaderSrc
);

shader.use();
var grind_num = 0
const box_size = 30;
var grid_angle = 0
var grid_orient = 0
var mouse_mode = false
// Creating the pacman object

const scene = new Scene();
var total_pellets = initiate_pellets(box_size)[0]
var pacman = new Pacman(1,1,box_size,[1,1,0,1])
// drawing the map of the pacman game

draw_grid(scene,box_size);
draw_pellets(total_pellets,scene)
draw_ghost(scene,[[[1,grid[0].length-2]]],box_size)
scene.add(pacman)

document.addEventListener("keydown", event => {
    console.log(event);
	if(event.key=='m')
	{
		if(mouse_mode)
			mouse_mode =false
		else
			mouse_mode =true
	}
	if(event.code == "ArrowRight"){
		pacman.move_it("right",scene)
	}
	if(event.code== "ArrowLeft"){
		pacman.move_it("left",scene)
	}
	if(event.code == "ArrowDown"){
		pacman.move_it("down",scene)
	}
	if(event.code == "ArrowUp"){
		pacman.move_it("up",scene)
	}

    if(event.key == ")" || event.key =="("){
        pacman.rotate_it(event.key)
	}

	if(event.key == 'c')
	{
		// console.log('hellow')
		grind_num+=1;
		grind_num = grind_num%3
		console.log(grid.length,grid[0].length)
		console.log(pellets_grid.length,grid[0].length)
		change_grid(grind_num)
		change_pellet_grid(grind_num)
		console.log(grid.length,grid[0].length)
		console.log(pellets_grid.length,grid[0].length)
		scene.primitives=[]

		total_pellets = initiate_pellets(box_size)[0]
		pacman = new Pacman(1,1,box_size,[1,1,0,1])
		// drawing the map of the pacman game
		draw_grid(scene,box_size);
		draw_pellets(total_pellets,scene)
		draw_ghost(scene,[[[1,grid[0].length-2]]],box_size)
		scene.add(pacman)

	}


	if(event.code == "BracketRight")
	{
		grid_angle+=Math.PI/2;
		grid_orient+=1
		grid_orient = grid_orient%4

		var i = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[0]
		var j = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[1]
		console.log('Location',i,j)

		if(grid_orient == 1)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(grid_angle,box_size*grid.length,0)
            })
        }
        else if(grid_orient ==2)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(grid_angle,box_size*grid[0].length,box_size*grid.length)
            })
        }
        else if(grid_orient ==3)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(grid_angle,0,box_size*grid[0].length)
            })
        }
        else{
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(grid_angle,0,0)
            })
        }

		var i = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[0]
		var j = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[1]
		console.log('Location',i,j)
		console.log(grid.length,grid[0].length)
		console.log(pellets.length,pellets[0].length)

		let rotated_stuff = rotate_all_right(total_pellets,grid,pellets_grid)
		console.log(rotated_stuff[0].length,rotated_stuff[0][0].length)
		console.log(rotated_stuff[1].length,rotated_stuff[1][0].length)
		console.log(rotated_stuff[2].length,rotated_stuff[2][0].length)
		set_grid(rotated_stuff[0])
		set_pellets(rotated_stuff[1])
		set_pellets_grid(rotated_stuff[2])
		console.log(grid.length,grid[0].length)
		console.log(pellets.length,pellets.length)
		console.log(pellets_grid.length,pellets_grid.length)


		scene.remove(pacman)
		pacman = new Pacman(j,i,box_size,[1,1,0,1])

		scene.add(pacman)


		for(let i=0;i<scene.primitives.length;i++)
		{
			if(scene.primitives[i].type=='circle')
				scene.remove(scene.primitives[i])
		}

		draw_pellets(pellets,scene)
		for(let j = 0; j<pellets[0].length; j++)
		{
			for(let i = 0; i<pellets.length; i++)
			{
				var x = j*box_size + box_size/2;
				var y = i*box_size + box_size/2;
				if(pellets_grid[i][j]==1)
				{
					scene.remove(pellets[i][j])
					const cir = new Circle([x,y],5,[1,1,0,1])
					pellets[i][j] = cir
					scene.add(pellets[i][j])
				}
			}
		}
		

	}

	if(event.code == "BracketLeft")
	{
		grid_angle-=Math.PI/2;
		grid_orient-=1
		if(grid_orient<0) grid_orient = 3

		if(grid_orient == 1)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(Math.PI/2,box_size*grid[0].length,0)
            })
        }
        else if(grid_orient ==2)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(Math.PI,box_size*grid[0].length,box_size*grid.length)
            })
        }
        else if(grid_orient ==3)
        {
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(3*Math.PI/2,0,box_size*grid[0].length)
            })
        }
        else{
            scene.primitives.forEach(function (primitive) {
                primitive.transform.rotateTranslate(0,0,0)
            })
        }
		var i = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[0]
		var j = pacman.give_coordi(pacman.centerX+pacman.posX,pacman.centerY+pacman.posY)[1]
		console.log('Location',i,j)
		console.log(grid.length,grid[0].length)
		console.log(pellets.length,pellets[0].length)

		let rotated_stuff = rotate_all_left(total_pellets,grid,pellets_grid)
		console.log(rotated_stuff[0].length,rotated_stuff[0][0].length)
		console.log(rotated_stuff[1].length,rotated_stuff[1][0].length)
		console.log(rotated_stuff[2].length,rotated_stuff[2][0].length)
		set_grid(rotated_stuff[0])
		set_pellets(rotated_stuff[1])
		set_pellets_grid(rotated_stuff[2])
		console.log(grid.length,grid[0].length)
		console.log(pellets.length,pellets.length)
		console.log(pellets_grid.length,pellets_grid.length)



		scene.remove(pacman)
		pacman = new Pacman(j,i,box_size,[1,1,0,1])
		scene.add(pacman)

		for(let j = 0; j<pellets[0].length; j++)
		{
			for(let i = 0; i<pellets.length; i++)
			{
				var x = j*box_size + box_size/2;
				var y = i*box_size + box_size/2;
				if(pellets_grid[i][j]==1)
				{
					scene.remove(pellets[i][j])
					const cir = new Circle([x,y],5,[1,1,0,1])
					pellets[i][j] = cir
					scene.add(pellets[i][j])
				}
			}
		}



	}
})


document.addEventListener("click", event => {
    
	if(mouse_mode)
	{
		pacman.tp_maar(event.clientX,event.clientY,box_size)
	}
})


renderer.setAnimationLoop(animation);



//Draw loop
var frames = 0;
function animation() 
{
	renderer.clear(0.9, 0.9, 0.9, 1);
	renderer.render(scene, shader);
	frames++;

}
