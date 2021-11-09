precision highp float;

varying vec3 vColor;

// Fog
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
varying float fogDepth;

void main() {
  // Convert PointCoord to the other vec2 has a range from -1.0 to 1.0.
  vec2 p = gl_PointCoord * 2.0 - 1.0;

  // Draw circle
  float radius = length(p);
  float opacity = (1.0 - smoothstep(0.2, 1.0, radius));

  gl_FragColor = vec4(vColor, opacity);

  // Fog
  float fogFactor = smoothstep(fogNear, fogFar, fogDepth);

  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
}
