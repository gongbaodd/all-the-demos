precision highp float;

attribute vec3 direction;

uniform float animation;

void main() {
    vec3 tPos = position.xyz + direction.xyz * animation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(tPos, 1.0);
}