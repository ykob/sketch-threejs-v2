(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4,13,14,15,20,21,23,24,25,26,27,28,29,60,61,62,63],{137:function(t,e,n){"use strict";n.r(e),n.d(e,"Sketch",(function(){return O}));var r=n(42),o=n(7),c=n(25),l=n(31),f=(n(33),n(15),n(24),n(27),n(38),n(5)),h=n(453),d=n(264),m=n(262),v=n(266),y=n(261),x=n(263),j=n(265),w=n(45),O=function(){function t(){Object(c.a)(this,t),this.target=new f.bb(1,1),this.imgLoader=new f.q,this.objLoader=new h.a,this.scene=new f.P,this.camera=new d.default,this.tiger=new v.default,this.backCircle=new y.default,this.luminous=new x.default,this.points=new j.default,this.ambientLight=new f.b(16751001),this.directionalLight1=new m.default(16777215,.8),this.directionalLight2=new m.default(16777215,.3),this.directionalLight3=new m.default(16777215,.3),this.directionalLight1.position.set(5,10,5),this.directionalLight2.position.set(-10,2,5),this.directionalLight3.position.set(10,-2,5),this.scene.fog=new f.o(0,10,30),this.scene.add(this.tiger),this.scene.add(this.backCircle),this.scene.add(this.luminous),this.scene.add(this.points),this.scene.add(this.ambientLight),this.scene.add(this.directionalLight1),this.scene.add(this.directionalLight2),this.scene.add(this.directionalLight3)}var e;return Object(l.a)(t,[{key:"start",value:(e=Object(o.a)(regeneratorRuntime.mark((function t(e){var base,o,c,l,h,i,img,d,m=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return base=e.base,o=[n(493),n(494),n(495),n(496),n(497),n(454)],c=["".concat(base,"/obj/sketch/newyear2022/Tiger.obj")],l=[],h=[],t.next=7,Promise.all(Object(r.a)(o.map((function(t){return m.imgLoader.loadAsync(t)})))).then((function(t){h=t}));case 7:return t.next=9,Promise.all(Object(r.a)(c.map((function(t){return m.objLoader.loadAsync(t)})))).then((function(t){m.tiger.start(t[0]),m.backCircle.start(t[0])}));case 9:i=0;case 10:if(!(i<h.length)){t.next=20;break}return img=h[i],(d=new f.S(img)).needsUpdate=!0,l.push(d),t.next=17,Object(w.b)(100);case 17:i++,t.next=10;break;case 20:this.tiger.setTexture({textureHead:l[0],textureBody:l[1],textureHand:l[2]}),this.backCircle.setTexture({textureIn:l[3],textureOut:l[4]}),l[5].wrapT=l[5].wrapS=f.O,this.luminous.start(l[5]),this.points.start(l[5]);case 25:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"update",value:function(time,t){this.tiger.update(time),this.backCircle.update(time),this.luminous.update(time),this.points.update(time),t.setClearColor(7798784,1),t.setRenderTarget(this.target),t.render(this.scene,this.camera)}},{key:"resize",value:function(t){this.camera.resize(t),this.points.resize(t),this.target.setSize(t.x,t.y)}}]),t}()},245:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.y=2.2,o.position.z=-1.45,o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=d.easing.outExpo(m.a.clamp((this.timeShow-5)/.4,0,1));this.rotation.z=.1*this.time+2*t,this.scale.set(t,t,t)}}}]),n}(h.A)},246:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.y=2.2,o.position.z=-2.2,o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=d.easing.outExpo(m.a.clamp((this.timeShow-5.05)/.4,0,1));this.rotation.z=-.05*this.time-2*t,this.scale.set(t,t,t)}}}]),n}(h.A)},247:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=Math.sin(3*this.time),e=d.easing.outCirc(m.a.clamp((this.timeShow-1.5)/2,0,1)),n=d.easing.outExpo(m.a.clamp((this.timeShow-1.5)/2,0,1));this.position.y=2*(1-e)+.07*t+1.67,this.rotation.y=m.a.radians(720*e),this.scale.set(n,n,n)}}}]),n}(h.A)},248:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=n(5),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({color:1118473,metalness:.9,roughness:.3});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o}return Object(o.a)(n,[{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=Math.sin(3*this.time),e=d.easing.outCirc(m.a.clamp((this.timeShow-1.5)/2,0,1)),n=d.easing.outExpo(m.a.clamp((this.timeShow-1.5)/2,0,1));this.position.y=2*(1-e)+.07*t+1.67,this.rotation.y=m.a.radians(720*e),this.scale.set(n,n,n)}}}]),n}(h.A)},249:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=d.easing.outCubic(m.a.clamp((this.timeShow-1)/1,0,1)),e=d.easing.outExpo(m.a.clamp((this.timeShow-1)/1,0,1));this.position.y=1.4*(1-t),this.scale.set(e,e,e)}}}]),n}(h.A)},250:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.set(-.85,1.3,.44),o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=.5*Math.sin(this.time)+.5,e=d.easing.elastic(m.a.clamp((this.timeShow-3.25)/.8,0,1));this.position.x=-.2*t-.85,this.rotation.x=m.a.radians(-33.3*t),this.rotation.y=m.a.radians(-45*t),this.rotation.z=m.a.radians(33.3*t),this.scale.set(e,e,e)}}}]),n}(h.A)},251:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(38),n(5)),d=n(83),m=n(45);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.set(.85,1.3,.44),o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=.5*Math.sin(this.time)+.5,e=d.easing.elastic(m.a.clamp((this.timeShow-3.2)/.8,0,1));this.position.x=.2*t+.85,this.rotation.x=m.a.radians(-33.3*t),this.rotation.y=m.a.radians(45*t),this.rotation.z=m.a.radians(-33.3*t),this.scale.set(e,e,e)}}}]),n}(h.A)},261:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(174),n(26),n(5)),d=n(245),m=n(246);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=v(n);function n(){var t;return Object(r.a)(this,n),(t=e.call(this)).backCircleIn=null,t.backCircleOut=null,t.time=0,t}return Object(o.a)(n,[{key:"start",value:function(t){var e=t.children.find((function(t){return"BackCircleIn_Mesh06"===t.name})),n=t.children.find((function(t){return"BackCircleOut_Mesh07"===t.name}));e instanceof h.A&&(this.backCircleIn=new d.default(e.geometry),this.add(this.backCircleIn)),n instanceof h.A&&(this.backCircleOut=new m.default(n.geometry),this.add(this.backCircleOut))}},{key:"setTexture",value:function(t){var e,n,r=t.textureIn,o=t.textureOut;null===(e=this.backCircleIn)||void 0===e||e.start(r),null===(n=this.backCircleOut)||void 0===n||n.start(o)}},{key:"update",value:function(time){var t,e;this.time+=time,null===(t=this.backCircleIn)||void 0===t||t.update(time),null===(e=this.backCircleOut)||void 0===e||e.update(time)}}]),n}(h.p)},262:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return h}));n(82);var r=n(25),o=n(43),c=n(44),l=n(23);function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var h=function(t){Object(o.a)(n,t);var e=f(n);function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16711680,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5;return Object(r.a)(this,n),e.call(this,t,o)}return n}(n(5).l)},263:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return x}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=n(5),d=n(401),m=n(402),v=n(45);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(t){Object(c.a)(n,t);var e=y(n);function n(){var t;Object(r.a)(this,n);var o=new h.i(2.5,10,2,72,1,!0),c=new h.N({uniforms:{time:{value:0},tNoise:{value:null}},vertexShader:d.default,fragmentShader:m.default,side:h.c,transparent:!0,depthWrite:!1,blending:h.a});return(t=e.call(this,o,c)).position.y=2.2,t.position.z=-2.2,t.rotation.x=v.a.radians(-90),t}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.N&&(this.material.uniforms.tNoise.value=t)}},{key:"update",value:function(time){this.material instanceof h.N&&(this.material.uniforms.time.value+=time)}}]),n}(h.A)},264:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return d}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var d=function(t){Object(c.a)(n,t);var e=h(n);function n(){var t;Object(r.a)(this,n);return(t=e.call(this,70,1,1,1e3)).position.y=.5,t}return Object(o.a)(n,[{key:"resize",value:function(t){this.aspect=t.x/t.y,this.updateProjectionMatrix(),t.x/t.y>1?(this.position.z=6,this.lookAt(0,1.5,0)):(this.position.z=8,this.lookAt(0,1.5,0))}}]),n}(n(5).F)},265:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return x}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(421),n(15),n(422),n(423),n(424),n(425),n(426),n(428),n(429),n(430),n(431),n(432),n(433),n(434),n(435),n(436),n(437),n(438),n(439),n(440),n(441),n(442),n(443),n(444),n(445),n(446),n(5)),d=n(403),m=n(404),v=n(45);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(t){Object(c.a)(n,t);var e=y(n);function n(){var t;Object(r.a)(this,n);for(var o=new h.e,c=5e3,l=new h.d(new Float32Array(15e3),3),f=new h.d(new Float32Array(c),1),y=new h.d(new Float32Array(c),1),i=0;i<5e3;i++){var x=v.a.radians(360*Math.random()),j=(Math.random()+Math.random()+Math.random())/3*8+.7,w=Math.cos(x)*j,O=Math.sin(x)*j,R=-30*Math.random()+10,C=.5*Math.random()+.5,k=5*Math.random()+6;l.setXYZ(i,w,O,R),f.setX(i,C),y.setX(i,k)}o.setAttribute("position",l),o.setAttribute("size",f),o.setAttribute("delay",y);var L=new h.N({uniforms:h.V.merge([h.U.common,h.U.fog,{time:{value:0},tNoise:{value:null},resolution:{value:new h.X}}]),vertexShader:d.default,fragmentShader:m.default,transparent:!0,depthWrite:!1,blending:h.a,fog:!0});return(t=e.call(this,o,L)).position.y=2.2,t}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.N&&(this.material.uniforms.tNoise.value=t)}},{key:"update",value:function(time){if(this.material instanceof h.N){var t=this.material.uniforms;t.time.value+=time,this.rotation.z=.05*t.time.value}}},{key:"resize",value:function(t){this.material instanceof h.N&&this.material.uniforms.resolution.value.copy(t)}}]),n}(h.J)},266:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return w}));n(82);var r=n(25),o=n(31),c=n(43),l=n(44),f=n(23),h=(n(174),n(26),n(5)),d=n(247),m=n(248),v=n(249),y=n(250),x=n(251);function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var w=function(t){Object(c.a)(n,t);var e=j(n);function n(){var t;return Object(r.a)(this,n),(t=e.call(this)).head=null,t.eyes=null,t.body=null,t.handRight=null,t.handLeft=null,t.time=0,t}return Object(o.a)(n,[{key:"start",value:function(t){var e=t.children.find((function(t){return"TigerHead_Mesh01"===t.name})),n=t.children.find((function(t){return"TigerEyes_Mesh02"===t.name})),r=t.children.find((function(t){return"TigerBody_Mesh03"===t.name})),o=t.children.find((function(t){return"TigerHandRight_Mesh04"===t.name})),c=t.children.find((function(t){return"TigerHandLeft_Mesh05"===t.name}));e instanceof h.A&&(this.head=new d.default(e.geometry),this.add(this.head)),n instanceof h.A&&(this.eyes=new m.default(n.geometry),this.add(this.eyes)),r instanceof h.A&&(this.body=new v.default(r.geometry),this.add(this.body)),o instanceof h.A&&(this.handRight=new y.default(o.geometry),this.add(this.handRight)),c instanceof h.A&&(this.handLeft=new x.default(c.geometry),this.add(this.handLeft))}},{key:"setTexture",value:function(t){var e,n,r,o,c=t.textureHead,l=t.textureBody,f=t.textureHand;null===(e=this.head)||void 0===e||e.start(c),null===(n=this.body)||void 0===n||n.start(l),null===(r=this.handRight)||void 0===r||r.start(f),null===(o=this.handLeft)||void 0===o||o.start(f)}},{key:"update",value:function(time){var t,e,n,r,o;this.time+=time;var c=Math.sin(2*this.time);this.position.y=.2*c,null===(t=this.head)||void 0===t||t.update(time),null===(e=this.eyes)||void 0===e||e.update(time),null===(n=this.body)||void 0===n||n.update(time),null===(r=this.handRight)||void 0===r||r.update(time),null===(o=this.handLeft)||void 0===o||o.update(time)}}]),n}(h.p)},401:function(t,e,n){"use strict";n.r(e),e.default="#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\nvarying vec2 vUv;\n\nvoid main(void) {\n  vec3 transformed = position;\n  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);\n\n  vUv = uv;\n\n  gl_Position = projectionMatrix * mvPosition;\n}\n"},402:function(t,e,n){"use strict";n.r(e),e.default="precision highp float;\n#define GLSLIFY 1\n\nuniform float time;\nuniform sampler2D tNoise;\n\nvarying vec2 vUv;\n\nfloat quadraticOut(float t) {\n  return -t * (t - 2.0);\n}\n\nvec3 convertHsvToRgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nvoid main() {\n  float showStep = quadraticOut(clamp((time - 6.0) / 3.0, 0.0, 1.0));\n  float texColorR = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.1 + time * 0.04)).r;\n  float texColorG = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.1 + time * 0.04)).g;\n  float texColorB1 = texture2D(tNoise, vec2(vUv.x * 2.0, vUv.y * 0.2 + time * 0.04)).b;\n  float texColorB2 = texture2D(tNoise, vec2(vUv.x * 2.0 + 0.5, vUv.y * 0.2 - time * 0.04)).b;\n  float stepY = smoothstep(0.0, 0.9, vUv.y) * (1.0 - smoothstep(0.6, 1.0, vUv.y));\n  vec3 hsv = vec3(\n    0.0 + (texColorB1 + texColorB2) * 0.3,\n    0.5,\n    1.0\n  );\n  vec3 rgb = convertHsvToRgb(hsv);\n  float opacity = (texColorR + texColorG) / 2.0 * stepY * showStep;\n\n  gl_FragColor = vec4(rgb, opacity);\n}\n"},403:function(t,e,n){"use strict";n.r(e),e.default="#define GLSLIFY 1\nattribute vec3 position;\nattribute float size;\nattribute float delay;\n\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\nuniform float time;\nuniform sampler2D tNoise;\nuniform vec2 resolution;\n\nvarying vec3 vColor;\n\n// Fog\nvarying float fogDepth;\n\nvec3 convertHsvToRgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\nvoid main() {\n  vec2 transformedUV = position.xy / 10.0 + vec2(time * -0.08);\n  vec4 noise = texture2D(tNoise, transformedUV);\n\n  vec3 transformed = position;\n  transformed += vec3(0.0, 0.0, sin(time * 0.7 + position.x + position.y) * 0.3);\n  vec4 mvPosition = viewMatrix * modelMatrix * vec4(transformed, 1.0);\n\n  float distanceFromCamera = length(mvPosition.xyz);\n  float pointSize = size * 100.0 / distanceFromCamera * resolution.y / 1024.0;\n\n  // Fog\n  fogDepth = -mvPosition.z;\n\n  vec3 hsv = vec3(\n    0.0 + noise.r * 0.24,\n    0.9 - noise.g * 0.7,\n    clamp(time - delay, 0.0, 1.0) - noise.b * 1.8\n  );\n  vColor = convertHsvToRgb(hsv);\n\n  gl_Position = projectionMatrix * mvPosition;\n  gl_PointSize = pointSize;\n}\n"},404:function(t,e,n){"use strict";n.r(e),e.default="precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vColor;\n\n// Fog\nuniform vec3 fogColor;\nuniform float fogNear;\nuniform float fogFar;\nvarying float fogDepth;\n\nvoid main() {\n  // Convert PointCoord to the other vec2 has a range from -1.0 to 1.0.\n  vec2 p = gl_PointCoord * 2.0 - 1.0;\n\n  // Draw circle\n  float radius = length(p);\n  float opacity = (1.0 - smoothstep(0.0, 1.0, radius));\n\n  gl_FragColor = vec4(vColor, opacity);\n\n  // Fog\n  float fogFactor = smoothstep(fogNear, fogFar, fogDepth);\n\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);\n}\n"},453:function(t,e,n){"use strict";n.d(e,"a",(function(){return j}));var r=n(5);const o=/^[og]\s*(.+)?/,c=/^mtllib /,l=/^usemtl /,f=/^usemap /,h=new r.Y,d=new r.Y,m=new r.Y,v=new r.Y,y=new r.Y;function x(){const t={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(t,e){if(this.object&&!1===this.object.fromDeclaration)return this.object.name=t,void(this.object.fromDeclaration=!1!==e);const n=this.object&&"function"==typeof this.object.currentMaterial?this.object.currentMaterial():void 0;if(this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:!1!==e,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(t,e){const n=this._finalize(!1);n&&(n.inherited||n.groupCount<=0)&&this.materials.splice(n.index,1);const r={index:this.materials.length,name:t||"",mtllib:Array.isArray(e)&&e.length>0?e[e.length-1]:"",smooth:void 0!==n?n.smooth:this.smooth,groupStart:void 0!==n?n.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(t){const e={index:"number"==typeof t?t:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return e.clone=this.clone.bind(e),e}};return this.materials.push(r),r},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(t){const e=this.currentMaterial();if(e&&-1===e.groupEnd&&(e.groupEnd=this.geometry.vertices.length/3,e.groupCount=e.groupEnd-e.groupStart,e.inherited=!1),t&&this.materials.length>1)for(let t=this.materials.length-1;t>=0;t--)this.materials[t].groupCount<=0&&this.materials.splice(t,1);return t&&0===this.materials.length&&this.materials.push({name:"",smooth:this.smooth}),e}},n&&n.name&&"function"==typeof n.clone){const t=n.clone(0);t.inherited=!0,this.object.materials.push(t)}this.objects.push(this.object)},finalize:function(){this.object&&"function"==typeof this.object._finalize&&this.object._finalize(!0)},parseVertexIndex:function(t,e){const n=parseInt(t,10);return 3*(n>=0?n-1:n+e/3)},parseNormalIndex:function(t,e){const n=parseInt(t,10);return 3*(n>=0?n-1:n+e/3)},parseUVIndex:function(t,e){const n=parseInt(t,10);return 2*(n>=0?n-1:n+e/2)},addVertex:function(a,b,t){const e=this.vertices,n=this.object.geometry.vertices;n.push(e[a+0],e[a+1],e[a+2]),n.push(e[b+0],e[b+1],e[b+2]),n.push(e[t+0],e[t+1],e[t+2])},addVertexPoint:function(a){const t=this.vertices;this.object.geometry.vertices.push(t[a+0],t[a+1],t[a+2])},addVertexLine:function(a){const t=this.vertices;this.object.geometry.vertices.push(t[a+0],t[a+1],t[a+2])},addNormal:function(a,b,t){const e=this.normals,n=this.object.geometry.normals;n.push(e[a+0],e[a+1],e[a+2]),n.push(e[b+0],e[b+1],e[b+2]),n.push(e[t+0],e[t+1],e[t+2])},addFaceNormal:function(a,b,t){const e=this.vertices,n=this.object.geometry.normals;h.fromArray(e,a),d.fromArray(e,b),m.fromArray(e,t),y.subVectors(m,d),v.subVectors(h,d),y.cross(v),y.normalize(),n.push(y.x,y.y,y.z),n.push(y.x,y.y,y.z),n.push(y.x,y.y,y.z)},addColor:function(a,b,t){const e=this.colors,n=this.object.geometry.colors;void 0!==e[a]&&n.push(e[a+0],e[a+1],e[a+2]),void 0!==e[b]&&n.push(e[b+0],e[b+1],e[b+2]),void 0!==e[t]&&n.push(e[t+0],e[t+1],e[t+2])},addUV:function(a,b,t){const e=this.uvs,n=this.object.geometry.uvs;n.push(e[a+0],e[a+1]),n.push(e[b+0],e[b+1]),n.push(e[t+0],e[t+1])},addDefaultUV:function(){const t=this.object.geometry.uvs;t.push(0,0),t.push(0,0),t.push(0,0)},addUVLine:function(a){const t=this.uvs;this.object.geometry.uvs.push(t[a+0],t[a+1])},addFace:function(a,b,t,e,n,r,o,c,l){const f=this.vertices.length;let h=this.parseVertexIndex(a,f),d=this.parseVertexIndex(b,f),m=this.parseVertexIndex(t,f);if(this.addVertex(h,d,m),this.addColor(h,d,m),void 0!==o&&""!==o){const t=this.normals.length;h=this.parseNormalIndex(o,t),d=this.parseNormalIndex(c,t),m=this.parseNormalIndex(l,t),this.addNormal(h,d,m)}else this.addFaceNormal(h,d,m);if(void 0!==e&&""!==e){const t=this.uvs.length;h=this.parseUVIndex(e,t),d=this.parseUVIndex(n,t),m=this.parseUVIndex(r,t),this.addUV(h,d,m),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(t){this.object.geometry.type="Points";const e=this.vertices.length;for(let n=0,r=t.length;n<r;n++){const r=this.parseVertexIndex(t[n],e);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(t,e){this.object.geometry.type="Line";const n=this.vertices.length,r=this.uvs.length;for(let e=0,r=t.length;e<r;e++)this.addVertexLine(this.parseVertexIndex(t[e],n));for(let t=0,n=e.length;t<n;t++)this.addUVLine(this.parseUVIndex(e[t],r))}};return t.startObject("",!1),t}class j extends r.v{constructor(t){super(t),this.materials=null}load(t,e,n,o){const c=this,l=new r.m(this.manager);l.setPath(this.path),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(t,(function(text){try{e(c.parse(text))}catch(e){o?o(e):console.error(e),c.manager.itemError(t)}}),n,o)}setMaterials(t){return this.materials=t,this}parse(text){const t=new x;-1!==text.indexOf("\r\n")&&(text=text.replace(/\r\n/g,"\n")),-1!==text.indexOf("\\\n")&&(text=text.replace(/\\\n/g,""));const e=text.split("\n");let line="",n="",h=0,d=[];const m="function"==typeof"".trimLeft;for(let i=0,r=e.length;i<r;i++)if(line=e[i],line=m?line.trimLeft():line.trim(),h=line.length,0!==h&&(n=line.charAt(0),"#"!==n))if("v"===n){const data=line.split(/\s+/);switch(data[0]){case"v":t.vertices.push(parseFloat(data[1]),parseFloat(data[2]),parseFloat(data[3])),data.length>=7?t.colors.push(parseFloat(data[4]),parseFloat(data[5]),parseFloat(data[6])):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(data[1]),parseFloat(data[2]),parseFloat(data[3]));break;case"vt":t.uvs.push(parseFloat(data[1]),parseFloat(data[2]))}}else if("f"===n){const e=line.substr(1).trim().split(/\s+/),n=[];for(let t=0,r=e.length;t<r;t++){const r=e[t];if(r.length>0){const t=r.split("/");n.push(t)}}const r=n[0];for(let e=1,o=n.length-1;e<o;e++){const o=n[e],c=n[e+1];t.addFace(r[0],o[0],c[0],r[1],o[1],c[1],r[2],o[2],c[2])}}else if("l"===n){const e=line.substring(1).trim().split(" ");let n=[];const r=[];if(-1===line.indexOf("/"))n=e;else for(let li=0,t=e.length;li<t;li++){const t=e[li].split("/");""!==t[0]&&n.push(t[0]),""!==t[1]&&r.push(t[1])}t.addLineGeometry(n,r)}else if("p"===n){const e=line.substr(1).trim().split(" ");t.addPointGeometry(e)}else if(null!==(d=o.exec(line))){const e=(" "+d[0].substr(1).trim()).substr(1);t.startObject(e)}else if(l.test(line))t.object.startMaterial(line.substring(7).trim(),t.materialLibraries);else if(c.test(line))t.materialLibraries.push(line.substring(7).trim());else if(f.test(line))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if("s"===n){if(d=line.split(" "),d.length>1){const e=d[1].trim().toLowerCase();t.object.smooth="0"!==e&&"off"!==e}else t.object.smooth=!0;const e=t.object.currentMaterial();e&&(e.smooth=t.object.smooth)}else{if("\0"===line)continue;console.warn('THREE.OBJLoader: Unexpected line: "'+line+'"')}t.finalize();const v=new r.p;v.materialLibraries=[].concat(t.materialLibraries);if(!0===!(1===t.objects.length&&0===t.objects[0].geometry.vertices.length))for(let i=0,e=t.objects.length;i<e;i++){const object=t.objects[i],e=object.geometry,n=object.materials,o="Line"===e.type,c="Points"===e.type;let l=!1;if(0===e.vertices.length)continue;const f=new r.e;f.setAttribute("position",new r.n(e.vertices,3)),e.normals.length>0&&f.setAttribute("normal",new r.n(e.normals,3)),e.colors.length>0&&(l=!0,f.setAttribute("color",new r.n(e.colors,3))),!0===e.hasUVIndices&&f.setAttribute("uv",new r.n(e.uvs,2));const h=[];for(let e=0,f=n.length;e<f;e++){const f=n[e],d=f.name+"_"+f.smooth+"_"+l;let m=t.materials[d];if(null!==this.materials)if(m=this.materials.create(f.name),!o||!m||m instanceof r.r){if(c&&m&&!(m instanceof r.K)){const t=new r.K({size:10,sizeAttenuation:!1});r.w.prototype.copy.call(t,m),t.color.copy(m.color),t.map=m.map,m=t}}else{const t=new r.r;r.w.prototype.copy.call(t,m),t.color.copy(m.color),m=t}void 0===m&&(m=o?new r.r:c?new r.K({size:1,sizeAttenuation:!1}):new r.B,m.name=f.name,m.flatShading=!f.smooth,m.vertexColors=l,t.materials[d]=m),h.push(m)}let d;if(h.length>1){for(let t=0,e=n.length;t<e;t++){const e=n[t];f.addGroup(e.groupStart,e.groupCount,t)}d=o?new r.s(f,h):c?new r.J(f,h):new r.A(f,h)}else d=o?new r.s(f,h[0]):c?new r.J(f,h[0]):new r.A(f,h[0]);d.name=object.name,v.add(d)}else if(t.vertices.length>0){const e=new r.K({size:1,sizeAttenuation:!1}),n=new r.e;n.setAttribute("position",new r.n(t.vertices,3)),t.colors.length>0&&void 0!==t.colors[0]&&(n.setAttribute("color",new r.n(t.colors,3)),e.vertexColors=!0);const o=new r.J(n,e);v.add(o)}return v}}},454:function(t,e,n){t.exports=n.p+"img/noise.851ad7d.png"},493:function(t,e,n){t.exports=n.p+"img/TigerHead.ef7f6cf.png"},494:function(t,e,n){t.exports=n.p+"img/TigerBody.1701669.png"},495:function(t,e,n){t.exports=n.p+"img/TigerHand.beac9a0.png"},496:function(t,e,n){t.exports=n.p+"img/BackCircleIn.70308f1.png"},497:function(t,e,n){t.exports=n.p+"img/BackCircleOut.66de534.png"}}]);