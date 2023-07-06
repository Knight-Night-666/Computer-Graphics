import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 1, 0, 0);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.updateModelTransformMatrix();
	}

	updateModelTransformMatrix()
	{
		// @ToDO
		// 1. Reset the transformation matrix
		// 2. Use the current transformations values to calculate the latest transformation matrix
		// this.modelTransformMatrix = mat4.rotate(this.modelTransformMatrix,this.modelTransformMatrix,this.rotationAngle,this.rotationAxis)
	}	
	translateTransform(x, y){
		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(this.modelTransformMatrix, this.translate)
		console.log(this.modelTransformMatrix)
	}
	rotateTransform(angle){
		this.rotationAngle = angle
		mat4.fromRotation(this.modelTransformMatrix, this.rotationAngle, [0, 0, 1])
		console.log(this.modelTransformMatrix)
	}
	rotateTranslate(angle,x,y)
	{
		this.rotationAngle = angle
		let Rotational = mat4.create()
		mat4.fromRotation(Rotational, this.rotationAngle, [0, 0, 1])
		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(this.modelTransformMatrix, this.translate)
		mat4.multiply(this.modelTransformMatrix,this.modelTransformMatrix,Rotational)
	}


	translateRotateTransform(initX, initY, x, y, angle){
		let translationToOrigin = mat4.create();
		let rotation = mat4.create();
		let translationToInitial = mat4.create();
		let translationToNewPoint = mat4.create();

		vec3.set(this.translate, initX, initY, 0)
		mat4.fromTranslation(translationToOrigin, this.translate)

		this.rotationAngle = angle
		mat4.fromRotation(rotation, this.rotationAngle, [0, 0, 1])

		vec3.set(this.translate, -initX, -initY, 0)
		mat4.fromTranslation(translationToInitial, this.translate)

		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(translationToNewPoint, this.translate)

		mat4.multiply(this.modelTransformMatrix, translationToOrigin, rotation)
		mat4.multiply(translationToNewPoint, translationToNewPoint, translationToInitial)
		mat4.multiply(this.modelTransformMatrix, this.modelTransformMatrix, translationToNewPoint)
	}
	
	translateRotateScaleTransform(initX, initY, x, y, angle,scale){
		let translationToOrigin = mat4.create();
		let rotation = mat4.create();
		let translationToInitial = mat4.create();
		let translationToNewPoint = mat4.create();
		let scaling = mat4.create()
		let tempMatrix = mat4.create();
		mat4.identity(tempMatrix);

		vec3.set(this.translate, initX, initY, 0)
		mat4.fromTranslation(translationToOrigin, this.translate)

		this.rotationAngle = angle
		mat4.fromRotation(rotation, this.rotationAngle, [0, 0, 1])
		
		vec3.set(this.scale,scale,scale,1)
		mat4.fromScaling(scaling,this.scale)

		vec3.set(this.translate, -initX, -initY, 0)
		mat4.fromTranslation(translationToInitial, this.translate)

		vec3.set(this.translate, x, y, 0)
		mat4.fromTranslation(translationToNewPoint, this.translate)

		mat4.multiply(tempMatrix,tempMatrix,translationToNewPoint)
		mat4.multiply(tempMatrix,tempMatrix,translationToOrigin);
		mat4.multiply(tempMatrix,tempMatrix,rotation)
		mat4.multiply(tempMatrix,tempMatrix,scaling)
		mat4.multiply(tempMatrix,tempMatrix,translationToInitial)
		mat4.copy(this.modelTransformMatrix,tempMatrix);
	}
	
}