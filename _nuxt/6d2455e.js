(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{251:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return w}));n(82);var r=n(25),o=n(31),c=n(43),f=n(44),h=n(23),l=(n(38),n(5)),m=n(83),v=n(45);function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(h.a)(t);if(e){var o=Object(h.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var w=function(t){Object(c.a)(n,t);var e=d(n);function n(t){var o;Object(r.a)(this,n);var c=new l.C({metalness:.7,roughness:.62});return(o=e.call(this,t,c)).time=0,o.timeShow=0,o.position.set(.85,1.3,.44),o}return Object(o.a)(n,[{key:"start",value:function(t){this.material instanceof l.C&&(this.material.map=t)}},{key:"update",value:function(time){if(this.material instanceof l.C){this.time+=time,this.timeShow+=time;var t=.5*Math.sin(this.time)+.5,e=m.easing.elastic(v.a.clamp((this.timeShow-3.2)/.8,0,1));this.position.x=.2*t+.85,this.rotation.x=v.a.radians(-33.3*t),this.rotation.y=v.a.radians(45*t),this.rotation.z=v.a.radians(-33.3*t),this.scale.set(e,e,e)}}}]),n}(l.A)}}]);