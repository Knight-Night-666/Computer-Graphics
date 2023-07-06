import "./style.css";
import * as THREE from 'three';
import {PvertexShader} from '../shaders/vertex.js'
import {PfragmentShader} from '../shaders/fragment.js'
import { Scene, PerspectiveCamera, AmbientLight, BoxGeometry, MeshBasicMaterial, Mesh, Side, FrontSide, SphereGeometry, Vector3, Color, CylinderGeometry, OctahedronGeometry } from "three";
import { Pendulum } from "./Pendulum";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import renderer, { renderLoop } from "./renderer";
import { convertTypeAcquisitionFromJson } from "typescript";

const RESOLUTION = 16 / 9;

const scene = new Scene();
const camera = new PerspectiveCamera(50, RESOLUTION, 1, 10000);
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setClearColor(0x000000)
camera.position.set(0, 400, 1000);
controls.update();

let loopHooks: Array<(dt: number) => void> = [];



(async () => {
    //globals
        var setVert = PvertexShader;
        var setFrag = PfragmentShader;
        const ShaderSettings  = {
            Ambient : 0.85,
            Diffuse: 0.5,
            Specular : 0.5,
            Shininess : 12.0,
            lx : 0.5*innerWidth,
            ly : 0.5*innerHeight,
            lz : 0,
            camx : camera.position.x,
            camy : camera.position.y,
            camz : camera.position.z
        }
        var U = {
            checkerTexture : {
                value : new THREE.TextureLoader().load('./textures/checker.png')
            },
            lightdir : {
                value : new THREE.Vector3(ShaderSettings.lx,ShaderSettings.ly,ShaderSettings.lz)
            },
            Coefs :{
                value : new THREE.Vector4(ShaderSettings.Ambient,
                    ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
            },
            viewSrc : {
                value : new THREE.Vector3(ShaderSettings.camx,ShaderSettings.camy, ShaderSettings.camz)
            }
        }
    
    let sceneMade = false;    
    var objects :any[] = []
    const collisionDemo2 = (scene,camera,dt) =>
    {
        //Mesh Helper
        let MeshHelper = new THREE.Object3D()
        scene.add(MeshHelper)
        //ball helper
        
        let ball1 = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.ShaderMaterial({
                vertexShader  : setVert,
                fragmentShader : setFrag,
                uniforms : U})
        )
        ball1.position.set(0,10,0)
        let ball1bb = new THREE.Sphere(ball1.position, 10)
        scene.add(ball1)
        console.log("Ball pos: ",ball1.position)
        objects.push([ball1,ball1bb])
        //cube and cube helpers
        let cube1 = new THREE.Mesh(
            new BoxGeometry(10,10,10),
            new THREE.MeshBasicMaterial({color:0xffffff})
        )
        cube1.position.set(20,5,0)
        scene.add(cube1)
        let cube1bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
        cube1bb.setFromObject(cube1)
        let helper1 = new THREE.Box3Helper(cube1bb);
        MeshHelper.add(helper1);
        objects.push([cube1,cube1bb])
        //cube 2
        let cube2 = new THREE.Mesh(
            new BoxGeometry(10,10,10),
            new THREE.ShaderMaterial({
                vertexShader  : setVert,
                fragmentShader : setFrag,
                uniforms : U})
        )
        cube2.position.set(40,5,0)
        scene.add(cube2)
        let cube2bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
        cube2bb.setFromObject(cube2)
        let helper2 = new THREE.Box3Helper(cube2bb);
        MeshHelper.add(helper2);
        objects.push([cube2,cube2bb])
        // Motion
        document.addEventListener('keydown', function(event) {

            if(event.code == 'ArrowUp') {
                cube1.position.z-=1
            }
        
            else if(event.code == 'ArrowDown') {
                cube1.position.z+=1
            }
        
            else if(event.code == 'ArrowRight') {
                cube1.position.x+=1
            }
        
            else if(event.code == 'ArrowLeft') {
                cube1.position.x-=1
            }
            // ball1bb.applyMatrix4(ball1.matrixWorld)

            cube1bb.copy( cube1.geometry.boundingBox! ).applyMatrix4(cube1.matrixWorld)
        });
    }
    const collisionDemo = (scene,camera,dt) =>
    {
        let ballHelper = new THREE.Object3D();
        scene.add(ballHelper)
        let ball1 = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({color:0xff1493})
        )
        ball1.position.set(0,0,0)
        let ball1bb = new THREE.Sphere(ball1.position, 10) //REMAINS UPDATED AUTOMATICALLY
        console.log("Ball pos: ",ball1.position)
        scene.add(ball1)
        console.log("Ball pos: ",ball1.position)
         // Motion
        document.addEventListener('keydown', function(event) {

            if(event.code == 'ArrowUp') {
                ball1.position.z-=1
            }
        
            else if(event.code == 'ArrowDown') {
                ball1.position.z+=1
            }
        
            else if(event.code == 'ArrowRight') {
                ball1.position.x+=1
            }
        
            else if(event.code == 'ArrowLeft') {
                ball1.position.x-=1
            }
            // ball1bb.applyMatrix4(ball1.matrixWorld)
            console.log(ball1.position, " ", ball1bb)

        });
    }
    const PendulumInit = (scene,camera,dt,x,y,z)=>
    {
        let pend = new Pendulum(setVert,setFrag,U,x,y,z);
        scene.add(pend.pendulum)
        return pend;
    }
    const initializeScene = (scene, camera, dt) => {
        sceneMade = true;
        //helper
        var axes = new THREE.AxesHelper( 100 );
        scene.add( axes );
        axes.position.y = 50
        // Ground
        const GROUND_SIZE = 2000;
        const groundGeometry = new BoxGeometry(GROUND_SIZE, 1, GROUND_SIZE, 70, 1, 70);
        const groundMesh = new Mesh(groundGeometry, new MeshBasicMaterial({ color: 0x227700 }));
        scene.add(groundMesh);

        //creating Pendulum
        let pendulum = PendulumInit(scene,camera,dt,50,250,25)
        console.log("saman: ",pendulum.boundingbox)
        let pendulum2 = PendulumInit(scene,camera,dt,-60,250,25)
        pendulum2.time =  Math.PI * Math.sqrt(pendulum2.plen/pendulum2.gravity)/2
        
        //CollisionTests
        // collisionDemo(scene,camera,dt)
        collisionDemo2(scene,camera,dt)
        var count = 0
        loopHooks.push(dt => {
            U.viewSrc.value =  new THREE.Vector3(camera.position.x,camera.position.y, camera.position.z)
            controls.update();
        });
        function animation1(cube1)
        {
            cube1.position.z +=10
            cube1.material.transparent = true;
            cube1.material.opacity = 0.5;
            cube1.material.color = new THREE.Color(Math.random() * 0xffffff);
        }
        function animation2(ball1)
        {
            U.Coefs.value =new THREE.Vector4(ShaderSettings.Ambient*Math.random(),
                ShaderSettings.Diffuse,ShaderSettings.Specular,ShaderSettings.Shininess)
            ball1.material.transparent = true;
            ball1.material.opacity = 0.5;
            ball1.material.color = new THREE.Color(Math. random () * 0xffffff);
        }
        loopHooks.push(dt =>{
            
           // first pendulum upar se niche
            if(!pendulum.boundingbox.intersectsSphere(pendulum2.normalbox))
            {
                let ScaledDt = dt*0.1
                pendulum.time += ScaledDt
                let period = 2* Math.PI * Math.sqrt(pendulum.plen/pendulum.gravity)
                let ang = pendulum.wo * Math.cos( 2* Math.PI / period * pendulum.time)
                // console.log("angle:",ang)
                // console.log(ang*180/Math.PI)

                // updating the coordinates of the center of the bounding box
                pendulum.bob_x = pendulum.origin[0] + (pendulum.plen+50)*Math.sin(ang)
                pendulum.bob_y = pendulum.origin[1] - (pendulum.plen+50)*Math.cos(ang)
                // console.log("Center of Bounding box",pendulum.bob_x,pendulum.bob_y)
                pendulum.boundingbox.set(new Vector3(pendulum.bob_x,pendulum.bob_y,pendulum.bob_z),50)
                // console.log("Center of Bounding box",pendulum.boundingbox.center)
                console.log(pendulum.boundingbox.intersectsSphere(pendulum2.boundingbox))
                pendulum.pendulum.rotateZ(ang - pendulum.theta);
                pendulum.theta = ang
            }
            // second pendulum niche se upar and then upar se niche
            if(pendulum.boundingbox.intersectsSphere(pendulum2.normalbox))
            {
                pendulum.time = 3*Math.PI * Math.sqrt(pendulum2.plen/pendulum2.gravity)/2
                let ScaledDt = dt*0.1
                pendulum2.time += ScaledDt
                let period = 2* Math.PI * Math.sqrt(pendulum2.plen/pendulum2.gravity)
                let ang = pendulum2.wo * Math.cos( 2* Math.PI / period * pendulum2.time)
                // console.log("angle:",ang)
                // console.log(ang*180/Math.PI)

                // updating the coordinates of the center of the bounding box
                pendulum2.bob_x = pendulum2.origin[0] + (pendulum2.plen+50)*Math.sin(ang)
                pendulum2.bob_y = pendulum2.origin[1] - (pendulum2.plen+50)*Math.cos(ang)
                // console.log("Center of Bounding box",pendulum.bob_x,pendulum.bob_y)
                pendulum2.boundingbox.set(new Vector3(pendulum2.bob_x,pendulum2.bob_y,pendulum2.bob_z),50)
                // console.log("Center of Bounding box",pendulum.boundingbox.center)
                console.log(pendulum2.boundingbox.intersectsSphere(pendulum.boundingbox))
                pendulum2.pendulum.rotateZ(ang - pendulum2.theta);
                pendulum2.theta = ang
            }
            // first pendulum niche se upar and then upar se niche
            if(pendulum2.boundingbox.intersectsSphere(pendulum.normalbox))
            {   
                pendulum2.time =  Math.PI * Math.sqrt(pendulum2.plen/pendulum2.gravity)/2
                let ScaledDt = dt*0.05
                pendulum.time += ScaledDt
                let period = 2* Math.PI * Math.sqrt(pendulum.plen/pendulum.gravity)
                let ang = pendulum.wo * Math.cos( 2* Math.PI / period * pendulum.time)
                // console.log("angle:",ang)
                // console.log(ang*180/Math.PI)

                // updating the coordinates of the center of the bounding box
                pendulum.bob_x = pendulum.origin[0] + (pendulum.plen+50)*Math.sin(ang)
                pendulum.bob_y = pendulum.origin[1] - (pendulum.plen+50)*Math.cos(ang)
                // console.log("Center of Bounding box",pendulum.bob_x,pendulum.bob_y)
                pendulum.boundingbox.set(new Vector3(pendulum.bob_x,pendulum.bob_y,pendulum.bob_z),50)
                // console.log("Center of Bounding box",pendulum.boundingbox.center)
                console.log(pendulum.boundingbox.intersectsSphere(pendulum2.boundingbox))
                pendulum.pendulum.rotateZ(ang - pendulum.theta);
                pendulum.theta = ang
            }


            


            // if(ang==pendulum.wo)
           


        })
        // loopHooks.push(dt =>{
        //     let ScaledDt = dt*0.5
        //     pendulum2.time += ScaledDt
        //     let period = 2* Math.PI * Math.sqrt(pendulum2.plen/pendulum2.gravity)
        //     let ang = pendulum2.wo * Math.cos( 2* Math.PI / period * pendulum2.time)
        //     console.log(ang*180/Math.PI)
        //     pendulum2.pendulum.rotateZ(ang - pendulum2.theta);
        //     pendulum2.theta = ang
        // })
        loopHooks.push(dt =>{
            let ball1 = objects[0][0]
            let ball1bb = objects[0][1]
            let cube1 = objects[1][0]
            let cube1bb = objects[1][1]
            let cube2 = objects[2][0]
            let cube2bb = objects[2][1]
            cube1bb.copy( cube1.geometry.boundingBox! ).applyMatrix4(cube1.matrixWorld) //update bounding box.
            // INTERSECTING (TOUCHING) TEST
            // does bounding box intersect with bounding sphere of another object?
            if(cube2bb.intersectsBox(cube1bb)) {
            animation1(cube1); // if true, call function animation1 to change cubel opacity & color
            } 
            else {
            cube1.material.opacity = 1.0; // if false, restore cubel opacity
            }
            if(cube1bb.intersectsSphere (ball1bb)) {
            animation2(ball1); // if true, call function animation2 to change ball1 opacity & color
            } 
            else {
            ball1.material.opacity = 1.0; // if false, restore balli opacity
            }
            // // CONTAINS TEST
            // //does bounding box contain a bounding box of another object?
            // if(cube2bb.containsBox(cube1bb)) {
            //  cube2.scale.y = 3; // if true, change scale on y axis of player cube
            // } else {
            // cube2.scale.y = 1; // if false, restore scale on y axis of player cube
            // }
        })

    };

    renderLoop(scene, camera, (dt) => {

        if (sceneMade === false) {
            initializeScene(scene, camera, dt);
        }
        loopHooks.forEach(fn => fn(dt));

    });

})();


