(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{246:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return y}));n(82);var r=n(25),o=n(31),c=n(43),f=n(44),l=n(23),h=(n(38),n(5)),m=n(83),v=n(45);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var y=function(t){Object(c.a)(n,t);var e=w(n);function n(t){var o;Object(r.a)(this,n);var c=new h.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.y=2.2,o.position.z=-2.2,o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof h.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof h.C){this.time+=time,this.timeShow+=time;var t=m.easing.outExpo(v.a.clamp((this.timeShow-5.05)/.4,0,1));this.rotation.z=-.05*this.time-2*t,this.scale.set(t,t,t)}}}]),n}(h.A)}}]);