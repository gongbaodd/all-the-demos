precision highp float;
varying vec2 vUV;

uniform sampler2D textureSampler;

void main() {
    gl_FragColor = texture2D(textureSampler, vUV);
}