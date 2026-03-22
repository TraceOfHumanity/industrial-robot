varying vec2 vUv;

void main() {
  vec2 p = vUv - 0.5;
  float d = length(p) * 2.0;
  float a = smoothstep(1.0, 0.2, d) * 0.45;
  gl_FragColor = vec4(1, 1, 1, a);
}
