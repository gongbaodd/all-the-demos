precision highp float;
attribute vec3 position;
uniform mat4 worldViewProjection;

void main() {
    vec4 p = vec4(position, 1.0);
    gl_Position = worldViewProjection * p;
}
