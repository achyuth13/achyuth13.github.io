var E=Object.defineProperty;var b=(t,e,n)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var _=(t,e,n)=>b(t,typeof e!="symbol"?e+"":e,n);import{D as $,n as c,E as x,j as I,f as O,F as j,G as v,H as C,I as p,J as L,K as M,L as w,M as N,N as P,O as B,P as D,Q as F}from"./scheduler.BjYkpA6W.js";const o=new Set;let f;function V(){f={r:0,c:[],p:f}}function z(){f.r||$(f.c),f=f.p}function G(t,e){t&&t.i&&(o.delete(t),t.i(e))}function A(t,e,n,s){if(t&&t.o){if(o.has(t))return;o.add(t),f.c.push(()=>{o.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function T(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function W(t){t&&t.c()}function X(t,e){t&&t.l(e)}function H(t,e,n){const{fragment:s,after_update:i}=t.$$;s&&s.m(e,n),p(()=>{const d=t.$$.on_mount.map(N).filter(v);t.$$.on_destroy?t.$$.on_destroy.push(...d):$(d),t.$$.on_mount=[]}),i.forEach(p)}function J(t,e){const n=t.$$;n.fragment!==null&&(L(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function K(t,e){t.$$.dirty[0]===-1&&(P.push(t),B(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,s,i,d,h=null,S=[-1]){const u=M;w(t);const a=t.$$={fragment:null,ctx:[],props:d,update:c,not_equal:i,bound:x(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:x(),dirty:S,skip_bound:!1,root:e.target||u.$$.root};h&&h(a.root);let l=!1;if(a.ctx=n?n(t,e.props||{},(r,g,...m)=>{const y=m.length?m[0]:g;return a.ctx&&i(a.ctx[r],a.ctx[r]=y)&&(!a.skip_bound&&a.bound[r]&&a.bound[r](y),l&&K(t,r)),g}):[],a.update(),l=!0,$(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){D();const r=I(e.target);a.fragment&&a.fragment.l(r),r.forEach(O)}else a.fragment&&a.fragment.c();e.intro&&G(t.$$.fragment),H(t,e.target,e.anchor),F(),j()}w(u)}class Z{constructor(){_(this,"$$");_(this,"$$set")}$destroy(){J(this,1),this.$destroy=c}$on(e,n){if(!v(n))return c;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!C(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Q="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Q);export{Z as S,A as a,W as b,z as c,X as d,J as e,T as f,V as g,Y as i,H as m,G as t};