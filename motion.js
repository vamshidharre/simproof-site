// Illustrative geometry only. No solver, study data or external dependencies.
(() => {
  const hero = document.querySelector('.hero');
  const mesh = document.getElementById('live-mesh');
  const field = document.getElementById('ambient-field');
  if (!hero || !mesh || !field) return;
  const ctx = mesh.getContext('2d');
  const bg = field.getContext('2d');
  if (!ctx || !bg) return;
  const control = document.getElementById('motion-toggle');
  const slider = document.getElementById('mesh-load');
  const output = document.getElementById('mesh-load-value');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let visible = true;
  let frame = 0;
  let last = 0;
  let time = 0;
  let load = Number(slider.value) / 100;
  let pointer = { x: 0, y: 0 };
  let aim = { x: 0, y: 0 };
  let width = 600, height = 370, fieldW = 1280, fieldH = 800;
  const cols = 24, rows = 10;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = mesh.clientWidth; height = mesh.clientHeight;
    fieldW = hero.clientWidth; fieldH = hero.clientHeight;
    for (const [canvas, context, w, h] of [[mesh,ctx,width,height],[field,bg,fieldW,fieldH]]) {
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    draw();
  }

  function project(i,j) {
    const u=i/cols, v=j/rows;
    const wave = Math.sin(u*Math.PI)*Math.cos(v*Math.PI*.7 + time*1.5);
    const x=(u-.5)*390;
    const z=(v-.5)*170;
    const y=-Math.sin(u*Math.PI)*40 - wave*(18+load*55)*u;
    const yaw=-.25+Math.sin(time*.25)*.12+pointer.x*.2;
    const xx=x*Math.cos(yaw)-z*Math.sin(yaw);
    const zz=x*Math.sin(yaw)+z*Math.cos(yaw);
    return {x:width*.5+(xx+zz*.44)*width/600,
      y:height*.54+(y+zz*.55+pointer.y*u*14)*height/370, u,v,wave};
  }

  function drawMesh() {
    ctx.clearRect(0,0,width,height);
    const scale=width/600;
    // Ground plane guides.
    ctx.strokeStyle='rgba(121,173,223,.10)';ctx.lineWidth=1;
    for(let i=0;i<14;i++) {
      ctx.beginPath();ctx.moveTo(i*width/12-width*.1,height*.18);
      ctx.lineTo(i*width/12+width*.12,height*.88);ctx.stroke();
    }
    for(let j=0;j<8;j++) {
      ctx.beginPath();ctx.moveTo(0,height*(.2+j*.09));ctx.lineTo(width,height*(.2+j*.09));ctx.stroke();
    }
    const points=Array.from({length:rows+1},(_,j)=>Array.from({length:cols+1},(_,i)=>project(i,j)));
    for(let j=0;j<rows;j++)for(let i=0;i<cols;i++) {
      const a=points[j][i],b=points[j][i+1],c=points[j+1][i],d=points[j+1][i+1];
      const hue=207-i/cols*60 + Math.sin(time*.8+i*.18)*9;
      ctx.fillStyle=`hsla(${hue},78%,${40+j*1.8}%,.82)`;
      ctx.strokeStyle='rgba(156,233,255,.42)';ctx.lineWidth=.65;
      for(const triangle of [[a,b,c],[b,d,c]]) {
        ctx.beginPath();ctx.moveTo(triangle[0].x,triangle[0].y);
        triangle.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath();ctx.fill();ctx.stroke();
      }
    }
    // Moving inspection band highlights existing mesh nodes.
    const scan=(time*.13)%1;
    for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++) {
      const p=points[j][i];
      if(Math.abs(p.u-scan)<.05) {
        ctx.beginPath();ctx.arc(p.x,p.y,1.8*scale,0,Math.PI*2);
        ctx.fillStyle='#c9ffff';ctx.fill();
      }
    }
    const left=points[rows][0], tip=points[0][cols-2];
    ctx.strokeStyle='#80a5c8';ctx.lineWidth=1.5;ctx.beginPath();
    ctx.moveTo(left.x-10*scale,left.y-40*scale);ctx.lineTo(left.x-10*scale,left.y+14*scale);ctx.stroke();
    for(let k=0;k<5;k++) {ctx.beginPath();ctx.moveTo(left.x-10*scale,left.y-35*scale+k*10*scale);ctx.lineTo(left.x-20*scale,left.y-27*scale+k*10*scale);ctx.stroke();}
    ctx.strokeStyle='#ffd38d';ctx.lineWidth=2;ctx.beginPath();
    ctx.moveTo(tip.x,tip.y-58*scale);ctx.lineTo(tip.x,tip.y-12*scale);
    ctx.moveTo(tip.x-6*scale,tip.y-21*scale);ctx.lineTo(tip.x,tip.y-12*scale);ctx.lineTo(tip.x+6*scale,tip.y-21*scale);ctx.stroke();
    ctx.fillStyle='#d0e6ff';ctx.font=`${Math.max(12,14*scale)}px Manrope, sans-serif`;
    ctx.fillText('Load',tip.x+12*scale,tip.y-40*scale);
    ctx.fillStyle='#91b5d6';ctx.fillText('Fixed support',Math.max(15,left.x-35*scale),left.y+39*scale);
  }

  function drawField() {
    bg.clearRect(0,0,fieldW,fieldH);
    const c=fieldW<760?13:22, r=9;
    const pts=[];
    for(let j=0;j<r;j++)for(let i=0;i<c;i++) {
      const x=i/(c-1)*fieldW;
      const y=fieldH*.3+j*fieldH*.085+Math.sin(i*.35+time*.5+j*.4)*26;
      pts.push({x:x+Math.sin(time*.25+j*.4)*13,y});
    }
    for(let j=0;j<r;j++)for(let i=0;i<c;i++) {
      const p=pts[j*c+i];const alpha=.06+(i/(c-1))*.13;
      bg.strokeStyle=`rgba(56,118,192,${alpha})`;bg.lineWidth=.7;
      for(const next of [i<c-1?pts[j*c+i+1]:null,j<r-1?pts[(j+1)*c+i]:null]) {
        if(!next)continue;bg.beginPath();bg.moveTo(p.x,p.y);bg.lineTo(next.x,next.y);bg.stroke();
      }
      bg.fillStyle=`rgba(49,115,197,${alpha+.07})`;bg.beginPath();bg.arc(p.x,p.y,1.6,0,Math.PI*2);bg.fill();
    }
  }
  function draw() { drawField(); drawMesh(); }
  function tick(now) {
    frame=0;
    if(paused||!visible||document.hidden)return;
    if(now-last>=30) {
      time+=Math.min((now-last)/1000,.06); last=now;
      pointer.x+=(aim.x-pointer.x)*.07;pointer.y+=(aim.y-pointer.y)*.07;
      draw();
    }
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;last=performance.now();
    hero.classList.toggle('motion-running',!paused&&visible&&!document.hidden);
    control.textContent=paused?'Play motion':'Pause motion';
    control.setAttribute('aria-pressed',String(paused));
    if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick);
    else draw();
  }
  control.addEventListener('click',()=>{paused=!paused;sync();});
  slider.addEventListener('input',()=>{load=Number(slider.value)/100;output.value=slider.value+'%';draw();});
  hero.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||paused)return;
    const bounds=hero.getBoundingClientRect();
    aim={x:(event.clientX-bounds.left)/bounds.width-.5,y:(event.clientY-bounds.top)/bounds.height-.5};
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{aim={x:0,y:0};});
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(hero);
  new ResizeObserver(resize).observe(hero);
  hero.classList.add('mesh-ready');
  document.querySelector('.mesh-controls').hidden=false;
  resize();sync();
})();
