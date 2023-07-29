precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;

void main() {
    // darken the image
    // float luminance = dot(texture2D(textureSampler, vUV).rgb,vec3(0.3, 0.59, 0.11));
    
    gl_FragColor = vec4(texture2D(textureSampler, vUV).rgb, 1.0);
}