(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{395:function(e,t,r){"use strict";r.r(t),t.default="precision highp float;\n#define GLSLIFY 1\n\nuniform vec2 resolution;\nuniform vec2 direction;\nuniform sampler2D texture;\n\nvarying vec2 vUv;\n\nvec4 gaussianBlur(sampler2D texture, vec2 uv, float radius, vec2 resolution, vec2 direction) {\n  vec4 color = vec4(0.0);\n  vec2 step = radius / resolution * direction;\n  color += texture2D(texture, uv - 4.0 * step) * 0.02699548325659403;\n  color += texture2D(texture, uv - 3.0 * step) * 0.06475879783294587;\n  color += texture2D(texture, uv - 2.0 * step) * 0.12098536225957168;\n  color += texture2D(texture, uv - 1.0 * step) * 0.17603266338214976;\n  color += texture2D(texture, uv) * 0.22245538653748;\n  color += texture2D(texture, uv + 1.0 * step) * 0.17603266338214976;\n  color += texture2D(texture, uv + 2.0 * step) * 0.12098536225957168;\n  color += texture2D(texture, uv + 3.0 * step) * 0.06475879783294587;\n  color += texture2D(texture, uv + 4.0 * step) * 0.02699548325659403;\n  return color;\n}\n\nvoid main() {\n  vec4 color = gaussianBlur(texture, vUv, 1.0, resolution, direction);\n  gl_FragColor = color;\n}"}}]);