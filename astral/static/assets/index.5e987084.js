import{u as l,i as r,a as o,b as c,c as d,d as m,e as u,f,g as h,h as b,j as $,k as g,l as O,m as i}from"./echarts.ba56da60.js";function w(t){let s=t.concat();for(let e=0;e<t.length;e++)s[e]=t.slice(0,e+1).reduce(function(n,a){return n+a});return s}function p(t,s){for(const e of Object.keys(s))s[e]instanceof Object&&Object.assign(s[e],p(t[e],s[e]));return Object.assign(t||{},s),t}function j(){const t=localStorage.getItem("theme");return t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}l([r,o,c,d,m,u,f,h,b,$,g,O]);function v(t,s){let e=i(t,j()),n={...s,backgroundColor:"rgba(0,0,0,0)"};e.setOption(n,!0),window.addEventListener("resize",()=>{e&&e.resize()}),document.addEventListener("themeSwitch",a=>{e.dispose(),e=i(t,a.detail.theme),e.setOption(n,!0)})}export{w as c,v as e,p as m};
