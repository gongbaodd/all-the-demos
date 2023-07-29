precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec2 vUV;

void main() {
    gl_Position = worldViewProjection * vec4(position, 1.);
    vUV = uv;
}