import * as THREE from 'three';
export class Pendulum
{
    pendulum: THREE.Object3D<THREE.Event>; 
    origin: any
    gravity:any
    theta:any
    speed : any
    plen : any
    time :any
    wo : any
    boundingbox: THREE.Sphere;
    normalbox : THREE.Sphere;
    bob_x:any;
    bob_y:any;
    bob_z:any;
	constructor(setVert,setFrag,U,x,y,z) 
	{
       //bob
       this.wo = Math.PI/2
        this.time = 0
       this.gravity = 9.8
       this.theta = 0;
       this.speed= 0
       const radius = 50
       var sphere = new THREE.Mesh( 
           new THREE.SphereGeometry(radius, 50, 50), 
           new THREE.ShaderMaterial({
               vertexShader  : setVert,
               fragmentShader : setFrag,
               uniforms : U
       }) );
       sphere.position.set(x,y,z)
    //    sphere.position.x = x
    //    sphere.position.y = y
    //    sphere.position.z = z
       //rod
      
       const length = 200
       this.plen = length
       const geometry = new THREE.CylinderGeometry( 2, 2, length, 50 );
       const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
       const rod = new THREE.Mesh( geometry, material );
       rod.position.set(sphere.position.x,sphere.position.y+length/2+radius,sphere.position.z)
       let Pendulum = new THREE.Object3D()
       this.origin = [rod.position.x, rod.position.y+length/2, rod.position.z]
       rod.translateX(-this.origin[0])
       rod.translateY(-this.origin[1])
       rod.translateZ(-this.origin[2])
       sphere.translateX(-this.origin[0])
       sphere.translateY(-this.origin[1])
       sphere.translateZ(-this.origin[2])
       Pendulum.add(rod)
       Pendulum.add(sphere)
       this.pendulum = Pendulum
       this.pendulum.translateX(this.origin[0])
       this.pendulum.translateY(this.origin[1])
       this.pendulum.translateZ(this.origin[2])
       this.pendulum.rotateZ(this.theta)
       this.boundingbox = new THREE.Sphere(new THREE.Vector3(x,y,z), radius)
       this.normalbox = new THREE.Sphere(new THREE.Vector3(x,y,z), radius)
       this.bob_x = x
       this.bob_y = y
       this.bob_z = z
	}
    ApplyPhysics() {
    }
}
