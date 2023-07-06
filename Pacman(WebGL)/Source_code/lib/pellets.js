import { Circle } from "./circle.js";
import { grid } from "./grid.js";
// import { draw_ghost } from "./ghosts.js";

function make_grid_arr(a, b) {
	var arr = new Array(a);
	for (var i = 0; i < a; i++) arr[i] = new Array(b);
	return arr;
}

export var pellets_grid3 =[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,2,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]

	
	]
	export var pellets_grid2 =[
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,2,0],
		[0,0,0,0,0,0,0,0,0]]
		
			export var pellets_grid1 = [
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			];
export var pellets_grid = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const change_pellet_grid = function(num){
	if(num==0)
		pellets_grid=pellets_grid1
	if(num==1)
		pellets_grid=pellets_grid2
	if(num==2)
		pellets_grid = pellets_grid3
}

export const set_pellets_grid = function(new_pellets_grid){
	pellets_grid = new_pellets_grid
}

export var pellets;
// export const food_type = make_grid_arr(pellets_grid.length, pellets_grid[0].length);
export const initiate_pellets = function (box_size) {
	pellets = make_grid_arr(pellets_grid.length, pellets_grid[0].length);
    var food_type = make_grid_arr(pellets_grid.length, pellets_grid[0].length);
	for (let j = 0; j < grid[0].length; j++) {
		for (let i = 0; i < grid.length; i++) {
			if (pellets_grid[i][j] == 2) {
				let center = [
					(j * box_size +
						j * box_size +
						(j * box_size + box_size) +
						(j * box_size + box_size)) /
						4,
					(i * box_size +
						(i * box_size + box_size) +
						(i * box_size + box_size) +
						i * box_size) /
						4,
				];
				var cir = new Circle(center, 10, [1, 1, 0, 1]);
				pellets[i][j] = cir
                food_type[i][j] = 'power_pellet'
			} else if (grid[i][j] == 1) {
				let center = [
					(j * box_size +
						j * box_size +
						(j * box_size + box_size) +
						(j * box_size + box_size)) /
						4,
					(i * box_size +
						(i * box_size + box_size) +
						(i * box_size + box_size) +
						i * box_size) /
						4,
				];
				var cir = new Circle(center, 5, [1,1,1,1]);
				pellets[i][j] = cir
                food_type[i][j] = 'pellet'
			}
			else{
				let center = [
					(j * box_size +
						j * box_size +
						(j * box_size + box_size) +
						(j * box_size + box_size)) /
						4,
					(i * box_size +
						(i * box_size + box_size) +
						(i * box_size + box_size) +
						i * box_size) /
						4,
				];
				var cir = new Circle(center, 0, [1,1,1,1]);
				pellets[i][j] = cir
                food_type[i][j] = 'pellet'
			}
		}
	}
    return [pellets,food_type]
}
export function set_pellets(new_pellets)
{
	pellets = new_pellets
}
export function change_pellet_color(ij,scene,box_size)
{
    var j = ij[1]
    var i = ij[0]
    if(pellets_grid[i][j]==0){
        scene.remove(pellets[i][j])
        var x = j*box_size + box_size/2;
        var y = i*box_size + box_size/2;
        var cir = new Circle([x,y],5,[1,1,0,1])
        scene.add(cir)
        pellets[i][j] = cir
        pellets_grid[i][j]=1
    }



}
