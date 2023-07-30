precision highp float;

attribute vec3 position;
attribute vec3 direction;

uniform float animation;
uniform mat4 modelViewMatrix; 
uniform mat4 projectionMatrix;
uniform mat4 worldViewProjection;

void main() {
    // vec3 tPos = position.xyz + direction.xyz * animation;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(tPos, 1.0);
    vec4 p = vec4(position, 1.0);
    gl_Position = worldViewProjection * p;
}