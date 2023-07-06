export const vertexShaderSrc = `      
	attribute vec3 aPosition;
    uniform mat4 uModelMatrix;
	uniform vec3 uRes;
    
	void main () {  
		vec4 Position = uModelMatrix*vec4(aPosition,1);
		vec3 normal_coordi = Position.xyz/uRes;
		vec3 temp = normal_coordi*2.0;
		vec3 clipspace = temp - 1.0;         
		gl_Position = vec4(clipspace*vec3(1,-1,0), 1.0);
        gl_PointSize = 10.0;
	}                          
`;