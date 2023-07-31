precision highp float;
varying vec2 vUV;
uniform sampler2D textureSampler;

void main() {
    vec4 smapler = texture2D(textureSampler, vUV);
    float xSample = pow(1. -smapler.x, 1.5);
    float ySample = pow(1. -smapler.y, 1.5);
    float zSample = pow(1. -smapler.z, 1.5);
    vec3 turned = vec3(xSample, ySample, zSample);
    gl_FragColor = vec4(turned, 1.);
}
