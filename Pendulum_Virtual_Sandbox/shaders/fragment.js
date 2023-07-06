export const PfragmentShader = `      		
uniform sampler2D checkerTexture;
varying vec3 vertexNormal;
varying vec3 vertPos; 
varying vec3 newNormal;
uniform vec4 Coefs;
uniform vec3 viewSrc;
varying vec3 ldir;
varying vec2 vertexUV; //u v of 3d to 2d map essentially. overlay unwrapped 3d on 2d and then just see u,v of pixel
void main() {
    //params
    vec3 lighting = vec3(0.0, 0.0, 0.0);
    vec3 ambient = vec3(0.5, 0.5, 0.5);
    vec3 normal = normalize(newNormal.xyz);
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 lightSource = ldir;   
    lightSource = normalize(lightSource - vertPos);
    //diffuse compute high dot more reflect.
    float diffuseStr = max(0.0, dot(lightSource, normal));
    vec3 diffuse = diffuseStr * lightColor;

    //specular reflection strength based on view direction. looking at reflection source directly? more specular.
    vec3 cameraSource = vec3(viewSrc);
    vec3 viewSource = normalize(cameraSource - vertPos);
    vec3 reflectSource = reflect(-lightSource, normal); //returns reflection direction
    float specularStr = 0.0;
    if(diffuseStr > 0.0)
    {specularStr = max(0.0, dot(viewSource,reflectSource));
    specularStr = pow(specularStr,Coefs.w);}
    vec3 specular = specularStr * lightColor;

    //compute the lighting
    lighting = ambient;
    lighting = ambient * 0.5 + diffuse;
    lighting = ambient * Coefs.x + diffuse*Coefs.y + specular * Coefs.z;

    //model texture and lighting multiplication
    vec3 modelColor = texture2D(checkerTexture,vertexUV).xyz;
    vec3 color = modelColor * lighting;
    gl_FragColor = vec4(color,1.0f);
} 
                          
`;