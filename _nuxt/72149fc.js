(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{401:function(n,o,t){"use strict";t.r(o),o.default="#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\nvarying vec2 vUv;\n\nvoid main(void) {\n  vec3 transformed = position;\n  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * mvPosition;\n}\n"}}]);