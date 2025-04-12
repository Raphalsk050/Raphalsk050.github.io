import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.Camera();

const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
  u_time: { value: 0.0 },
  u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  fragmentShader: `
    precision mediump float;

    uniform float u_time;
    uniform vec2 u_resolution;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) +
             (c - a)* u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 2; i++) {
        value += amplitude * noise(st);
        st *= 1.2;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      float t = u_time * 0.1;
      float n = fbm(st * 3.0 + vec2(t, t * 0.9));

      vec3 color = vec3(0.0);
      color.r = 0.5 + 0.5 * sin(n * 20.9 + u_time * .9);
      color.g = 0.5 + 0.5 * sin(n * 50.0 + u_time * 0.9);
      color.b = 0.5 + 0.5 * sin(n * 50.5 + u_time * 1.24);

      color.r = mix(0.4, 0.8, color.r);
    //   color.g = mix(0.54, 0.9, color.g);
    //   color.b = mix(0.2, 1.0, color.b);

      color = smoothstep(0.54,.56,color);

      gl_FragColor = vec4(color, 1.0);
    }
  `
});

const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

function animate(time) {
  uniforms.u_time.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
});
