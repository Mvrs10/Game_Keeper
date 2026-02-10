import * as THREE from "three";

const RedAlert = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#d13d3d") },
  },

  /**
   * Vertex Shader
   * - Passes normal & position data to fragment shader
   */
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,

  /**
   * Fragment Shader
   * - Fresnel glow
   * - Pulsing intensity
   */
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;

    void main() {
      // Direction from fragment to camera
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

      // Fresnel effect (stronger glow at edges)
      float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);

      // Pulsing glow
      float pulse = 0.6 + 0.4 * sin(uTime * 2.0);

      // Final color
      vec3 glow = uColor * fresnel * pulse;

      gl_FragColor = vec4(glow, 1.0);
    }
  `,
});

export default RedAlert;
