import{s as q,e as f,a as L,c as m,j as x,g as k,b as C,f as p,d as g,i as j,k as i,n as P,r as H,t as A,o as E}from"../chunks/scheduler.BjYkpA6W.js";import{e as w}from"../chunks/each.D6YF6ztN.js";import{S as V,i as M}from"../chunks/index.C3fCsUgV.js";const N=[{date:"2024-08-09",name:"SSL Pinning for Android Native Apps",url:"https://medium.com/@achyuthnag13/ssl-pinning-for-android-native-apps-3a863f85f40b"},{date:"2024-08-09",name:"SSL Pinning for Android PWAs",url:"https://medium.com/@achyuthnag13/ssl-pinning-for-android-pwas-bc21d8893365"}];function D(h,t,l){const d=h.slice();return d[1]=t[l].date,d[2]=t[l].name,d[3]=t[l].url,d}function I(h){let t,l,d=h[1]+"",v,u,n,_=h[2]+"",c,b;return{c(){t=f("li"),l=f("span"),v=A(d),u=A(" - "),n=f("a"),c=A(_),b=L(),this.h()},l(o){t=m(o,"LI",{});var e=x(t);l=m(e,"SPAN",{class:!0});var a=x(l);v=E(a,d),a.forEach(p),u=E(e," - "),n=m(e,"A",{href:!0,class:!0});var r=x(n);c=E(r,_),r.forEach(p),b=C(e),e.forEach(p),this.h()},h(){g(l,"class","text-gray-400"),g(n,"href",h[3]),g(n,"class","text-secondary hover:underline")},m(o,e){j(o,t,e),i(t,l),i(l,v),i(t,u),i(t,n),i(n,c),i(t,b)},p:P,d(o){o&&p(t)}}}function T(h){let t,l,d="Blogs",v,u,n,_,c,b='<div class="text-sm sm:text-base font-bold text-white"><a href="mailto:achyuth@nagadelic.me" role="button">achyuth@nagadelic.me</a></div>',o=w(h[0]),e=[];for(let a=0;a<o.length;a+=1)e[a]=I(D(h,o,a));return{c(){t=f("div"),l=f("h1"),l.textContent=d,v=L(),u=f("div"),n=f("ul");for(let a=0;a<e.length;a+=1)e[a].c();_=L(),c=f("div"),c.innerHTML=b,this.h()},l(a){t=m(a,"DIV",{class:!0});var r=x(t);l=m(r,"H1",{class:!0,"data-svelte-h":!0}),k(l)!=="svelte-1t5gqm2"&&(l.textContent=d),v=C(r),u=m(r,"DIV",{class:!0});var s=x(u);n=m(s,"UL",{class:!0});var y=x(n);for(let S=0;S<e.length;S+=1)e[S].l(y);y.forEach(p),s.forEach(p),_=C(r),c=m(r,"DIV",{class:!0,"data-svelte-h":!0}),k(c)!=="svelte-v9yqs1"&&(c.innerHTML=b),r.forEach(p),this.h()},h(){g(l,"class","relative top-4 left-4 text-7xl text-secondary font-bold"),g(n,"class","list-disc pl-5 space-y-4"),g(u,"class","mt-16 p-4 rounded-md shadow-lg max-w-2xl"),g(c,"class","absolute bottom-8 left-0 right-0 flex justify-center"),g(t,"class","min-h-screen bg-[url('/img/sunset.jpg')] sm:bg-contain sm:bg-right bg-contain")},m(a,r){j(a,t,r),i(t,l),i(t,v),i(t,u),i(u,n);for(let s=0;s<e.length;s+=1)e[s]&&e[s].m(n,null);i(t,_),i(t,c)},p(a,[r]){if(r&1){o=w(a[0]);let s;for(s=0;s<o.length;s+=1){const y=D(a,o,s);e[s]?e[s].p(y,r):(e[s]=I(y),e[s].c(),e[s].m(n,null))}for(;s<e.length;s+=1)e[s].d(1);e.length=o.length}},i:P,o:P,d(a){a&&p(t),H(e,a)}}}function $(h){return[N]}class z extends V{constructor(t){super(),M(this,t,$,T,q,{})}}export{z as component};