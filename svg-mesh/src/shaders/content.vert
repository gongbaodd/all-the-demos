precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec2 aPageCoord;
attribute vec2 aAtlasCoord;

uniform mat4 worldViewProjection;

varying vec2 vUV;

void main() {
    gl_Position = worldViewProjection * vec4(aPageCoord, 0., 1.);
    vUV = vec2(.5+aAtlasCoord.x/2., aAtlasCoord.y/2.-.5);
}