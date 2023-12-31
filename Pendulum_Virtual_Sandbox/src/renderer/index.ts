import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { Scene, Camera, Vector2 } from "three";

const canvasElement = document.querySelector("#three-canvas");

if (canvasElement === null) {
    throw new Error("Document needs #three-canvas.");
}

const renderer = new WebGLRenderer({
    canvas: canvasElement
});

const composer = new EffectComposer(renderer);

renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
composer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);
renderer.setClearColor(0xbbbbff);

export const renderLoop = (scene: Scene, camera: Camera, onLoop: (dt: number) => void) => {

    const screenRes = new Vector2(canvasElement.clientWidth, canvasElement.clientHeight);
    const bloomPass = new UnrealBloomPass(screenRes, 0.0, -0.1, 0.2);

    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(bloomPass);

    bloomPass.renderToScreen = true;
    const perfectFrameTime = 1000 / 60;
    let deltaTime = 0;
    let lastTimestamp = 0;
    const internalLoop = (timestamp: number) => {
        deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
        lastTimestamp = timestamp;

        window.requestAnimationFrame(internalLoop);
        onLoop(deltaTime);
        composer.render(deltaTime);
    };

    window.requestAnimationFrame(internalLoop);

};

export default renderer;