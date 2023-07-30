precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 worldViewProjection;
uniform float time;

void main(){
    vec3 p = position;
    vec3 j = vec3(0., -1.0, 0.);
    p = p + normal * log2(1. + time) * 25.0;
    gl_Position = worldViewProjection * vec4(p, 1.0);
}