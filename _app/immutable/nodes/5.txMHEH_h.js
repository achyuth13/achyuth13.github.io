import{s as V,e as y,t as F,c as k,j as w,o as W,f as _,d as c,i as C,k as f,p as ee,n as P,a as D,b as E,v as re,R as Z,w as S,D as ne,S as oe,g as R,T as le,U as ie,V as ce,W as x,r as ue,A as de,X as fe,z as me,Y as pe}from"../chunks/scheduler.BjYkpA6W.js";import{S as A,i as H,f as he,b as U,d as O,m as q,t as z,a as G,e as K}from"../chunks/index.C3fCsUgV.js";import{e as ge}from"../chunks/each.D6YF6ztN.js";const te=[{name:"Kaliedoscope",url:"/music/kaliedoscope.mp3"},{name:"Prophecy",url:"/music/prophecy.mp3"},{name:"Ennadi Maayavi Nee",url:"/music/ennadi.mp3"},{name:"Paridhana",url:"/music/paridhana.mp3"},{name:"Kannana Kanne",url:"/music/kannana.mp3"}];function ve(r){let e,t,l;return{c(){e=y("div"),t=y("h3"),l=F(r[0]),this.h()},l(a){e=k(a,"DIV",{class:!0});var s=w(e);t=k(s,"H3",{class:!0});var n=w(t);l=W(n,r[0]),n.forEach(_),s.forEach(_),this.h()},h(){c(t,"class","svelte-z912tj"),c(e,"class","svelte-z912tj")},m(a,s){C(a,e,s),f(e,t),f(t,l)},p(a,[s]){s&1&&ee(l,a[0])},i:P,o:P,d(a){a&&_(e)}}}function _e(r,e,t){let{trackTitle:l}=e;return r.$$set=a=>{"trackTitle"in a&&t(0,l=a.trackTitle)},[l]}class ye extends A{constructor(e){super(),H(this,e,_e,ve,V,{trackTitle:0})}}function ke(r){let e,t,l,a,s,n,m,d,u;return{c(){e=y("div"),t=y("span"),l=F(r[0]),a=D(),s=y("span"),n=F(r[1]),m=D(),d=y("div"),u=y("span"),this.h()},l(o){e=k(o,"DIV",{id:!0,class:!0});var i=w(e);t=k(i,"SPAN",{id:!0});var h=w(t);l=W(h,r[0]),h.forEach(_),a=E(i),s=k(i,"SPAN",{id:!0});var v=w(s);n=W(v,r[1]),v.forEach(_),i.forEach(_),m=E(o),d=k(o,"DIV",{id:!0,class:!0});var M=w(d);u=k(M,"SPAN",{id:!0,style:!0,class:!0}),w(u).forEach(_),M.forEach(_),this.h()},h(){c(t,"id","progress-time"),c(s,"id","track-duration"),c(e,"id","time"),c(e,"class","svelte-a3j4w1"),c(u,"id","bar"),re(u,"width",r[2]+"%"),c(u,"class","svelte-a3j4w1"),c(d,"id","progress-bar-cont"),c(d,"class","svelte-a3j4w1")},m(o,i){C(o,e,i),f(e,t),f(t,l),f(e,a),f(e,s),f(s,n),C(o,m,i),C(o,d,i),f(d,u)},p(o,[i]){i&1&&ee(l,o[0]),i&2&&ee(n,o[1]),i&4&&re(u,"width",o[2]+"%")},i:P,o:P,d(o){o&&(_(e),_(m),_(d))}}}function be(r,e,t){let{currTimeDisplay:l}=e,{totalTimeDisplay:a}=e,{progress:s}=e;return r.$$set=n=>{"currTimeDisplay"in n&&t(0,l=n.currTimeDisplay),"totalTimeDisplay"in n&&t(1,a=n.totalTimeDisplay),"progress"in n&&t(2,s=n.progress)},[l,a,s]}class Te extends A{constructor(e){super(),H(this,e,be,ke,V,{currTimeDisplay:0,totalTimeDisplay:1,progress:2})}}function we(r){let e,t,l,a,s,n,m,d,u,o,i,h,v,M;return{c(){e=y("div"),t=y("button"),l=y("img"),s=D(),n=y("button"),m=y("img"),u=D(),o=y("button"),i=y("img"),this.h()},l(b){e=k(b,"DIV",{id:!0,class:!0});var $=w(e);t=k($,"BUTTON",{id:!0,class:!0});var j=w(t);l=k(j,"IMG",{src:!0,alt:!0,class:!0}),j.forEach(_),s=E($),n=k($,"BUTTON",{id:!0,class:!0});var I=w(n);m=k(I,"IMG",{src:!0,alt:!0,class:!0}),I.forEach(_),u=E($),o=k($,"BUTTON",{id:!0,class:!0});var N=w(o);i=k(N,"IMG",{src:!0,alt:!0,class:!0}),N.forEach(_),$.forEach(_),this.h()},h(){Z(l.src,a=r[2].rewind)||c(l,"src",a),c(l,"alt","rewind"),c(l,"class","svelte-1dijwkk"),c(t,"id","rewind"),c(t,"class","svelte-1dijwkk"),Z(m.src,d=r[0]?r[2].pause:r[2].play)||c(m,"src",d),c(m,"alt","play"),c(m,"class","svelte-1dijwkk"),c(n,"id","play"),c(n,"class","svelte-1dijwkk"),Z(i.src,h=r[2].fwd)||c(i,"src",h),c(i,"alt","forward"),c(i,"class","svelte-1dijwkk"),c(o,"id","forward"),c(o,"class","svelte-1dijwkk"),c(e,"id","btn-cont"),c(e,"class","svelte-1dijwkk")},m(b,$){C(b,e,$),f(e,t),f(t,l),f(e,s),f(e,n),f(n,m),f(e,u),f(e,o),f(o,i),v||(M=[S(t,"click",r[3]),S(n,"click",r[4]),S(o,"click",r[5])],v=!0)},p(b,[$]){$&1&&!Z(m.src,d=b[0]?b[2].pause:b[2].play)&&c(m,"src",d)},i:P,o:P,d(b){b&&_(e),v=!1,ne(M)}}}function $e(r,e,t){let l=oe();const a={play:"https://freesvg.org/img/media-playback-start.png",pause:"https://freesvg.org/img/media-playback-pause.png",rewind:"https://freesvg.org/img/media-skip-backward.png",fwd:"https://freesvg.org/img/media-skip-forward.png"};let{isPlaying:s}=e;const n=()=>l("rewind"),m=()=>l("playPause"),d=()=>l("forward");return r.$$set=u=>{"isPlaying"in u&&t(0,s=u.isPlaying)},[s,l,a,n,m,d]}class De extends A{constructor(e){super(),H(this,e,$e,we,V,{isPlaying:0})}}function Ee(r){let e,t,l="0",a,s,n,m,d,u,o;return{c(){e=y("div"),t=y("label"),t.textContent=l,a=D(),s=y("input"),n=D(),m=y("label"),d=F(r[0]),this.h()},l(i){e=k(i,"DIV",{class:!0});var h=w(e);t=k(h,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),R(t)!=="svelte-1aw68yu"&&(t.textContent=l),a=E(h),s=k(h,"INPUT",{id:!0,class:!0,type:!0,min:!0,max:!0,step:!0,name:!0}),n=E(h),m=k(h,"LABEL",{for:!0,class:!0});var v=w(m);d=W(v,r[0]),v.forEach(_),h.forEach(_),this.h()},h(){c(t,"for","volume-slider"),c(t,"class","svelte-hs35k7"),c(s,"id","myRange"),c(s,"class","slider svelte-hs35k7"),c(s,"type","range"),c(s,"min","0"),c(s,"max","100"),c(s,"step","1"),c(s,"name","volume"),c(m,"for","volume-slider"),c(m,"class","svelte-hs35k7"),c(e,"class","slidecontainer svelte-hs35k7")},m(i,h){C(i,e,h),f(e,t),f(e,a),f(e,s),le(s,r[0]),f(e,n),f(e,m),f(m,d),u||(o=[S(s,"change",r[2]),S(s,"input",r[2]),S(s,"input",r[1])],u=!0)},p(i,[h]){h&1&&le(s,i[0]),h&1&&ee(d,i[0])},i:P,o:P,d(i){i&&_(e),u=!1,ne(o)}}}function Ie(r,e,t){let{vol:l}=e;function a(n){ie.call(this,r,n)}function s(){l=ce(this.value),t(0,l)}return r.$$set=n=>{"vol"in n&&t(0,l=n.vol)},[l,a,s]}class Pe extends A{constructor(e){super(),H(this,e,Ie,Ee,V,{vol:0})}}function Me(r,e,t){const l=r.slice();return l[3]=e[t].name,l[4]=e[t].url,l[6]=t,l}function je(r){let e,t,l,a;return{c(){e=y("li"),t=F(r[3]),this.h()},l(s){e=k(s,"LI",{"data-track-id":!0,class:!0});var n=w(e);t=W(n,r[3]),n.forEach(_),this.h()},h(){c(e,"data-track-id",r[6]),c(e,"class","svelte-r5dgr6")},m(s,n){C(s,e,n),f(e,t),l||(a=S(e,"click",r[2]),l=!0)},p:P,d(s){s&&_(e),l=!1,a()}}}function Ce(r){let e,t,l="☰ Playlist",a,s,n,m,d=ge(te),u=[];for(let o=0;o<d.length;o+=1)u[o]=je(Me(r,d,o));return{c(){e=y("section"),t=y("button"),t.textContent=l,a=D(),s=y("ul");for(let o=0;o<u.length;o+=1)u[o].c();this.h()},l(o){e=k(o,"SECTION",{id:!0,class:!0});var i=w(e);t=k(i,"BUTTON",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-1hp8dqr"&&(t.textContent=l),a=E(i),s=k(i,"UL",{class:!0});var h=w(s);for(let v=0;v<u.length;v+=1)u[v].l(h);h.forEach(_),i.forEach(_),this.h()},h(){c(t,"class","accordion svelte-r5dgr6"),x(t,"active",r[0]),c(s,"class","svelte-r5dgr6"),x(s,"show-list",r[0]),c(e,"id","playlist-cont"),c(e,"class","svelte-r5dgr6")},m(o,i){C(o,e,i),f(e,t),f(e,a),f(e,s);for(let h=0;h<u.length;h+=1)u[h]&&u[h].m(s,null);n||(m=S(t,"click",r[1]),n=!0)},p(o,[i]){i&1&&x(t,"active",o[0]),i&1&&x(s,"show-list",o[0])},i:P,o:P,d(o){o&&_(e),ue(u,o),n=!1,m()}}}function Le(r,e,t){let l=!1;const a=()=>t(0,l=!l);function s(n){ie.call(this,r,n)}return[l,a,s]}class Ne extends A{constructor(e){super(),H(this,e,Le,Ce,V,{})}}function Se(r){let e,t,l="Music",a,s,n='<div class="absolute inset-0 bg-secondary bg-opacity-80 rounded-lg"></div> <div class="relative text-center text-primary bg-opacity-70 p-1 rounded-lg"><h2 class="text-md md:text-2xl font-bold mb-2">The playlist contains my originals and covers of famous songs</h2> <p class="text-sm">Click on the playlist to choose and play your favourite track!</p></div>',m,d,u,o,i,h,v,M,b,$,j,I,N,L,X='<div class="text-sm sm:text-base font-bold text-secondary"><a href="mailto:achyuth@nagadelic.me" role="button">achyuth@nagadelic.me</a></div>',B;u=new ye({props:{trackTitle:r[0]}}),i=new Te({props:{currTimeDisplay:r[2],totalTimeDisplay:r[1],progress:r[3]}}),v=new De({props:{isPlaying:r[4]}}),v.$on("rewind",r[7]),v.$on("playPause",r[6]),v.$on("forward",r[8]);function Y(p){r[11](p)}let J={};return r[5]!==void 0&&(J.vol=r[5]),b=new Pe({props:J}),de.push(()=>he(b,"vol",Y)),b.$on("input",r[9]),I=new Ne({}),I.$on("click",r[10]),{c(){e=y("div"),t=y("h1"),t.textContent=l,a=D(),s=y("div"),s.innerHTML=n,m=D(),d=y("section"),U(u.$$.fragment),o=D(),U(i.$$.fragment),h=D(),U(v.$$.fragment),M=D(),U(b.$$.fragment),j=D(),U(I.$$.fragment),N=D(),L=y("div"),L.innerHTML=X,this.h()},l(p){e=k(p,"DIV",{class:!0});var g=w(e);t=k(g,"H1",{class:!0,"data-svelte-h":!0}),R(t)!=="svelte-1oylpun"&&(t.textContent=l),a=E(g),s=k(g,"DIV",{class:!0,"data-svelte-h":!0}),R(s)!=="svelte-we7i1l"&&(s.innerHTML=n),m=E(g),d=k(g,"SECTION",{id:!0,class:!0});var T=w(d);O(u.$$.fragment,T),o=E(T),O(i.$$.fragment,T),h=E(T),O(v.$$.fragment,T),M=E(T),O(b.$$.fragment,T),T.forEach(_),j=E(g),O(I.$$.fragment,g),N=E(g),L=k(g,"DIV",{class:!0,"data-svelte-h":!0}),R(L)!=="svelte-m0y01i"&&(L.innerHTML=X),g.forEach(_),this.h()},h(){c(t,"class","absolute top-4 left-4 text-7xl text-primary font-bold"),c(s,"class","relative flex flex-col items-center justify-center p-4"),c(d,"id","player-cont"),c(d,"class","mt-8 svelte-1dfurlh"),c(L,"class","absolute bottom-8 left-0 right-0 flex justify-center"),c(e,"class","relative flex flex-col items-center justify-center min-h-screen p-4 bg-[url('/img/cherry_blossom.jpeg')] bg-cover bg-no-repeat bg-opacity-70")},m(p,g){C(p,e,g),f(e,t),f(e,a),f(e,s),f(e,m),f(e,d),q(u,d,null),f(d,o),q(i,d,null),f(d,h),q(v,d,null),f(d,M),q(b,d,null),f(e,j),q(I,e,null),f(e,N),f(e,L),B=!0},p(p,[g]){const T={};g&1&&(T.trackTitle=p[0]),u.$set(T);const Q={};g&4&&(Q.currTimeDisplay=p[2]),g&2&&(Q.totalTimeDisplay=p[1]),g&8&&(Q.progress=p[3]),i.$set(Q);const se={};g&16&&(se.isPlaying=p[4]),v.$set(se);const ae={};!$&&g&32&&($=!0,ae.vol=p[5],fe(()=>$=!1)),b.$set(ae)},i(p){B||(z(u.$$.fragment,p),z(i.$$.fragment,p),z(v.$$.fragment,p),z(b.$$.fragment,p),z(I.$$.fragment,p),B=!0)},o(p){G(u.$$.fragment,p),G(i.$$.fragment,p),G(v.$$.fragment,p),G(b.$$.fragment,p),G(I.$$.fragment,p),B=!1},d(p){p&&_(e),K(u),K(i),K(v),K(b),K(I)}}}function Ve(r,e,t){let l=0,a,s="Loading...",n=0,m="loading...",d="0:00:00",u=0,o,i=!1,h=50;function v(){a=new Audio(te[l].url),a.onloadedmetadata=()=>{n=a.duration,M(),b()},a.ontimeupdate=b,t(0,s=te[l].name)}function M(){if(isNaN(n)||n===0){t(1,m="00:00:00");return}let p=Math.floor(n/3600),g=Math.floor(n%3600/60),T=Math.floor(n%60);t(1,m=`${p}:${g<10?`0${g}`:g}:${T<10?`0${T}`:T}`)}function b(){if(n===0)return;t(3,u=a.currentTime*(100/n));let p=Math.floor(a.currentTime/3600),g=Math.floor(a.currentTime%3600/60),T=Math.floor(a.currentTime%60);t(2,d=`${p}:${g<10?`0${g}`:g}:${T<10?`0${T}`:T}`)}function $(){a.ended?(t(4,i=!1),clearInterval(o)):o=setInterval(b,100)}function j(){a.paused?($(),a.play(),t(4,i=!0)):($(),a.pause(),t(4,i=!1))}function I(){a.currentTime-=10}function N(){a.currentTime+=10}function L(){a.volume=h/100}function X(p){const g=p.target;i?(t(4,i=!1),a.pause(),l=Number(g.dataset.trackId),v(),j()):(l=Number(g.dataset.trackId),v(),j())}function B(){a&&(a.pause(),a.currentTime=0,t(4,i=!1),clearInterval(o),o=void 0)}function Y(p){B()}me(()=>{v(),typeof window<"u"&&window.addEventListener("popstate",Y)}),pe(()=>{typeof window<"u"&&window.removeEventListener("popstate",Y)});function J(p){h=p,t(5,h)}return[s,m,d,u,i,h,j,I,N,L,X,J]}class Ae extends A{constructor(e){super(),H(this,e,Ve,Se,V,{})}}function He(r){let e,t,l;return t=new Ae({}),{c(){e=y("div"),U(t.$$.fragment)},l(a){e=k(a,"DIV",{});var s=w(e);O(t.$$.fragment,s),s.forEach(_)},m(a,s){C(a,e,s),q(t,e,null),l=!0},p:P,i(a){l||(z(t.$$.fragment,a),l=!0)},o(a){G(t.$$.fragment,a),l=!1},d(a){a&&_(e),K(t)}}}class qe extends A{constructor(e){super(),H(this,e,null,He,V,{})}}export{qe as component};
