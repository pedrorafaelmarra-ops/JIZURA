/* JIZURA pack: medical — procedural medical/RPG overlays for physiology videos */
(() => {
'use strict';
const PK='medical', TAU=J.TAU;
const U=e=>Math.min(e.W,e.H)/1080;
const fade=e=>J.clamp(e.lt/0.28)*(1-J.clamp(e.pOut));
const main=e=>e.pass==='main';

const defs={};

defs.medIonChannel={
  name:'Medical · Ion channel', tags:['graphic','editorial','glitch'], w:8, layer:'front',
  draw(e,bb,P){
    if(!main(e)||e.lt<0)return; const c=e.ctx,u=U(e),a=fade(e),W=e.W,H=e.H;
    const y=H*.78, x=W*.76, t=e.lt, amp=18*u;
    c.save(); c.globalAlpha=a;
    c.strokeStyle=e.sc.sub; c.lineWidth=3*u;
    c.beginPath();
    for(let i=0;i<42;i++){const xx=W*.08+i*W*.021; const yy=y+Math.sin(i*.9)*4*u; c.moveTo(xx,yy-8*u);c.lineTo(xx,yy+8*u);}
    c.stroke();
    c.fillStyle=e.sc.ink; c.strokeStyle=e.sc.accent; c.lineWidth=4*u;
    c.beginPath(); c.roundRect(x-55*u,y-70*u,110*u,140*u,22*u); c.fill(); c.stroke();
    c.fillStyle=e.sc.accent;
    for(let i=0;i<7;i++){const ph=(t*.42+i/7)%1; const yy=y-190*u+ph*310*u; const xx=x+Math.sin(i*2.4+t)*amp; c.beginPath();c.arc(xx,yy,14*u,0,TAU);c.fill();}
    c.fillStyle=e.sc.bg; c.font=`${22*u}px monospace`; c.textAlign='center';
    for(let i=0;i<7;i++){const ph=(t*.42+i/7)%1; const yy=y-190*u+ph*310*u; const xx=x+Math.sin(i*2.4+t)*amp; c.fillText('Na⁺',xx,yy+7*u);}
    c.fillStyle=e.sc.fg;c.font=`700 ${22*u}px sans-serif`;c.fillText('CANAL Na⁺',x,y+105*u);
    c.restore();
  }
};

defs.medActionPotential={
  name:'Medical · Action potential', tags:['graphic','editorial'], w:9, layer:'front',
  draw(e,bb,P){
    if(!main(e)||e.lt<0)return; const c=e.ctx,u=U(e),a=fade(e),W=e.W,H=e.H;
    const x0=W*.08,y0=H*.79,w=W*.42,h=H*.22,p=J.clamp(e.lt/1.15);
    c.save();c.globalAlpha=a;c.strokeStyle=e.sc.sub;c.lineWidth=2*u;
    c.beginPath();c.moveTo(x0,y0-h);c.lineTo(x0,y0);c.lineTo(x0+w,y0);c.stroke();
    c.fillStyle=e.sc.sub;c.font=`${17*u}px monospace`;c.fillText('+30 mV',x0-2*u,y0-h+8*u);c.fillText('-70 mV',x0-2*u,y0-5*u);
    const pts=[]; for(let i=0;i<=90;i++){const q=i/90;let v;
      if(q<.18)v=.06; else if(q<.34)v=.06+(q-.18)/.16*.92; else if(q<.48)v=.98-(q-.34)/.14*.9; else if(q<.62)v=.08-(q-.48)/.14*.18; else v=-.10+(q-.62)/.38*.16;
      pts.push([x0+q*w,y0-v*h]);
    }
    const n=Math.max(2,Math.floor(pts.length*p));c.strokeStyle=e.sc.accent;c.lineWidth=5*u;c.lineJoin='round';c.beginPath();c.moveTo(...pts[0]);for(let i=1;i<n;i++)c.lineTo(...pts[i]);c.stroke();
    c.fillStyle=e.sc.fg;c.font=`700 ${20*u}px sans-serif`;c.fillText('POTENCIAL DE AÇÃO',x0,y0-h-24*u);
    c.restore();
  }
};

defs.medCalcium={
  name:'Medical · Calcium release', tags:['graphic','pop'], w:9, layer:'front',
  draw(e,bb,P){
    if(!main(e)||e.lt<0)return;const c=e.ctx,u=U(e),a=fade(e),W=e.W,H=e.H,t=e.lt;
    c.save();c.globalAlpha=a;c.strokeStyle=e.sc.sub;c.lineWidth=3*u;
    c.strokeRect(W*.08,H*.68,W*.84,H*.18);
    c.fillStyle=e.sc.sub;c.font=`${18*u}px monospace`;c.fillText('RETÍCULO SARCOPLASMÁTICO',W*.1,H*.9);
    for(let i=0;i<18;i++){const r=J.r((e.cut.seed||1)+i*31,7),r2=J.r((e.cut.seed||1)+i*47,9);const ph=(t*.28+r)%1;
      const x=W*(.12+.76*r2), y=H*(.78-ph*.42);c.fillStyle=i%3?e.sc.accent:e.sc.accent2;c.beginPath();c.arc(x,y,13*u,0,TAU);c.fill();
      c.fillStyle=e.sc.bg;c.font=`700 ${13*u}px sans-serif`;c.textAlign='center';c.fillText('Ca²⁺',x,y+5*u);
    } c.restore();
  }
};

defs.medSarcomere={
  name:'Medical · Sarcomere', tags:['graphic','editorial'], w:10, layer:'front',
  draw(e,bb,P){
    if(!main(e)||e.lt<0)return;const c=e.ctx,u=U(e),a=fade(e),W=e.W,H=e.H,k=J.E.inOutCubic(J.clamp(e.lt/1.6));
    const cy=H*.78, half=W*(.31-.07*k),cx=W*.5;
    c.save();c.globalAlpha=a;c.lineWidth=5*u;c.strokeStyle=e.sc.fg;
    c.beginPath();c.moveTo(cx-half,cy-90*u);c.lineTo(cx-half,cy+90*u);c.moveTo(cx+half,cy-90*u);c.lineTo(cx+half,cy+90*u);c.stroke();
    c.strokeStyle=e.sc.accent;c.lineWidth=6*u;c.beginPath();c.moveTo(cx-half,cy);c.lineTo(cx-35*u,cy);c.moveTo(cx+half,cy);c.lineTo(cx+35*u,cy);c.stroke();
    c.strokeStyle=e.sc.accent2;c.lineWidth=10*u;c.beginPath();c.moveTo(cx-130*u,cy);c.lineTo(cx+130*u,cy);c.stroke();
    c.fillStyle=e.sc.fg;c.font=`700 ${22*u}px sans-serif`;c.textAlign='center';c.fillText('ACTINA  ⇄  MIOSINA',cx,cy+55*u);
    c.fillStyle=e.sc.accent;c.font=`700 ${18*u}px monospace`;c.fillText('ENCURTAMENTO DO SARCÔMERO',cx,cy+95*u);
    c.restore();
  }
};

defs.medQuest={
  name:'Medical · Quest complete', tags:['graphic','pop'], w:12, layer:'front',
  draw(e,bb,P){
    if(!main(e)||e.lt<0)return;const c=e.ctx,u=U(e),a=fade(e),W=e.W,H=e.H,p=J.E.outExpo(J.clamp(e.lt/.65));
    c.save();c.globalAlpha=a;c.strokeStyle=e.sc.accent;c.fillStyle=e.sc.ink;c.lineWidth=4*u;
    const x=W*.12,y=H*.66,w=W*.76,h=H*.22;c.beginPath();c.roundRect(x,y,w*p,h,18*u);c.fill();c.stroke();
    if(p>.72){c.fillStyle=e.sc.accent;c.font=`800 ${34*u}px sans-serif`;c.fillText('✓  QUEST CONCLUÍDA',x+35*u,y+58*u);
      c.fillStyle=e.sc.fg;c.font=`700 ${24*u}px sans-serif`;c.fillText('CONTRAÇÃO MUSCULAR',x+35*u,y+104*u);
      c.fillStyle=e.sc.sub;c.font=`${20*u}px monospace`;c.fillText('+500 XP   ·   FISIOLOGIA NÍVEL 2',x+35*u,y+148*u);}
    c.restore();
  }
};

for(const k of Object.keys(defs)) J.register('decor',k,defs[k],PK);
})();