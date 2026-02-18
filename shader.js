import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    // Simplex-like noise
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      vec2 u = f * f * (3.0 - 2.0 * f);

      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));

      return mix(a, b, u.x) +
             (c - a) * u.y * (1.0 - u.x) +
             (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.1;
        amplitude *= 0.45;
      }
      return value;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      float t = u_time * 0.04;

      // Layered organic flow
      float n1 = fbm(st * 2.5 + vec2(t * 0.7, t * 0.5));
      float n2 = fbm(st * 3.5 + vec2(-t * 0.3, t * 0.8) + n1 * 0.5);
      float n3 = fbm(st * 1.8 + vec2(t * 0.2, -t * 0.4) + n2 * 0.3);

      // Deep, professional color palette — dark blues, teals, purples
      vec3 deepBlue   = vec3(0.03, 0.04, 0.12);
      vec3 midBlue    = vec3(0.05, 0.08, 0.18);
      vec3 teal       = vec3(0.04, 0.14, 0.20);
      vec3 purple     = vec3(0.08, 0.04, 0.16);
      vec3 accentCyan = vec3(0.10, 0.30, 0.40);

      vec3 color = deepBlue;
      color = mix(color, midBlue, smoothstep(0.2, 0.6, n1));
      color = mix(color, teal, smoothstep(0.3, 0.7, n2) * 0.6);
      color = mix(color, purple, smoothstep(0.4, 0.8, n3) * 0.4);

      // Subtle bright accent spots
      float accent = smoothstep(0.62, 0.68, n2 * n3 * 2.0);
      color = mix(color, accentCyan, accent * 0.3);

      // Subtle vignette
      vec2 center = st - vec2(u_resolution.x / u_resolution.y * 0.5, 0.5);
      float vignette = 1.0 - smoothstep(0.3, 1.4, length(center));
      color *= mix(0.6, 1.0, vignette);

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
