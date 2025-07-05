import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
let object;
let controls;
const loader = new GLTFLoader();

loader.load(
  'scene.gltf',
  function (gltf) {
    object = gltf.scene;
    // Center and scale model (make it larger)
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);
    const scale = 5 / Math.max(size.x, size.y, size.z); // Larger scale
    object.scale.set(scale, scale, scale);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const container = document.getElementById("container3D");
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearAlpha(0);
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Camera much closer to model
camera.position.set(0, 0.2, 1.5);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);
// Extra directional light from opposite side
const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight2.position.set(-5, -8, -7);
scene.add(dirLight2);
const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(0, 2, 2);
scene.add(pointLight);
// Add a subtle spotlight for highlights
const spotLight = new THREE.SpotLight(0xffffff, 0.7, 30, Math.PI / 6, 0.3, 1.5);
spotLight.position.set(0, 8, 8);
spotLight.target.position.set(0, 0, 0);
scene.add(spotLight);
scene.add(spotLight.target);

controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// Hover effect: rotate model slowly on hover
let isHovered = false;
container.addEventListener('mouseenter', () => {
  isHovered = true;
});
container.addEventListener('mouseleave', () => {
  isHovered = false;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // Continuous rotation
  if (object) {
    object.rotation.y += 0.012;
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
animate();

// Check WebGL support for VANTA
function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }
  
  // === Initialize VANTA Early ===
  document.addEventListener('DOMContentLoaded', () => {
    if (isWebGLAvailable()) {
      // VANTA.WAVES({
      //   el: ".vanta-bg",
      //   mouseControls: true,
      //   touchControls: true,
      //   minHeight: 400.00,
      //   minWidth: 200.00,
      //   scale: 1.0,
      //   scaleMobile: 1.0,
      //   color: 0x7f5af0,
      //   shininess: 50.0,
      //   waveHeight: 20.0,
      //   waveSpeed: 0.7,
      //   zoom: 0.95
      // });
    } else {
      console.warn("WebGL not supported — skipping VANTA background.");
      document.querySelector('.vanta-bg').style.background = '#1f1f1f';
    }
  });
  
  // === Run GSAP Animations After Full Load ===
  window.onload = () => {
    const isMobile = window.matchMedia('(max-width: 700px)').matches;
  
    // Hero animations (make fast)
    gsap.from('.hero h1', {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out'
    });
    gsap.from('.hero p', {
      y: 7,
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      ease: 'power2.out'
    });
    gsap.from('.hero-cta', {
      y: 5,
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
      ease: 'power2.out'
    });
  
    // Sun and arrows (keep looping)
    gsap.to('#sun-rays', {
      rotate: 360,
      transformOrigin: '40px 90px',
      repeat: -1,
      duration: 8,
      ease: 'linear'
    });
  
    gsap.to(['#arrow1', '#arrow2', '#arrow3', '#arrow4', '#arrow5'], {
      opacity: 0.2,
      yoyo: true,
      repeat: -1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power1.inOut'
    });
  
    // Glow animations (keep looping)
    gsap.to('#panels', {
      boxShadow: '0 0 16px 4px #7f5af0',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut'
    });
  
    gsap.to('#home', {
      boxShadow: '0 0 16px 4px #FFD600',
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut',
      delay: 0.7
    });
  
    // Remove all scroll-triggered and staggered animations for instant appearance
    // All sections, cards, testimonials, faqs, etc. are visible immediately
  };
  
// --- Static Star Field ---
const starCount = 800;
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < starCount; i++) {
  const r = 60 + Math.random() * 40; // radius from center
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, sizeAttenuation: true });
const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);
// --- End Star Field ---
  