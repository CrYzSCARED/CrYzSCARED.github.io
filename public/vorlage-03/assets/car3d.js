/**
 * Vorlage 03 GT-01 / original, lightweight procedural WebGL concept vehicle.
 * Entirely local: no 3D CDN, hosted model, tracker or paid service required.
 */
(() => {
  const BODY = [0.28, 0.31, 0.36];
  const DARK = [0.028, 0.034, 0.048];
  const METAL = [0.48, 0.51, 0.56];
  const CHROME = [0.70, 0.76, 0.83];
  const GLASS = [0.042, 0.075, 0.11];
  const RED = [0.96, 0.085, 0.12];
  const WHITE = [0.9, 0.96, 1.0];
  const mesh = { p: [], n: [], c: [], b: [], g: [] };
  const vec=(x,y,z)=>[x,y,z];
  const mix=(a,b,t)=>a.map((v,i)=>v*(1-t)+b[i]*t);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function face(a,b,c,color=BODY,paint=0,glow=0){
    const ab=b.map((v,i)=>v-a[i]);const ac=c.map((v,i)=>v-a[i]);
    let normal=[ab[1]*ac[2]-ab[2]*ac[1], ab[2]*ac[0]-ab[0]*ac[2], ab[0]*ac[1]-ab[1]*ac[0]];
    const length=Math.hypot(...normal)||1;normal=normal.map(n=>n/length);
    for(const point of [a,b,c]){mesh.p.push(...point);mesh.n.push(...normal);mesh.c.push(...color);mesh.b.push(paint);mesh.g.push(glow);}
  }
  function quad(a,b,c,d,color=BODY,paint=0,glow=0){face(a,b,c,color,paint,glow);face(a,c,d,color,paint,glow);}
  function box(cx,cy,cz,sx,sy,sz,color=METAL,paint=0,glow=0){
    const x0=cx-sx/2,x1=cx+sx/2,y0=cy-sy/2,y1=cy+sy/2,z0=cz-sz/2,z1=cz+sz/2;
    quad(vec(x0,y0,z0),vec(x1,y0,z0),vec(x1,y1,z0),vec(x0,y1,z0),color,paint,glow);
    quad(vec(x1,y0,z1),vec(x0,y0,z1),vec(x0,y1,z1),vec(x1,y1,z1),color,paint,glow);
    quad(vec(x0,y1,z0),vec(x1,y1,z0),vec(x1,y1,z1),vec(x0,y1,z1),color,paint,glow);
    quad(vec(x0,y0,z1),vec(x1,y0,z1),vec(x1,y0,z0),vec(x0,y0,z0),color,paint,glow);
    quad(vec(x0,y0,z1),vec(x0,y0,z0),vec(x0,y1,z0),vec(x0,y1,z1),color,paint,glow);
    quad(vec(x1,y0,z0),vec(x1,y0,z1),vec(x1,y1,z1),vec(x1,y1,z0),color,paint,glow);
  }
  function cylinderZ(cx,cy,cz,r,h,color,steps=36){
    for(let i=0;i<steps;i++){
      const a=i/steps*Math.PI*2,b=(i+1)/steps*Math.PI*2;
      const p=(radius,angle,z)=>vec(cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius,z);
      quad(p(r,a,cz-h/2),p(r,b,cz-h/2),p(r,b,cz+h/2),p(r,a,cz+h/2),color);
      face(vec(cx,cy,cz+h/2),p(r,a,cz+h/2),p(r,b,cz+h/2),color);
      face(vec(cx,cy,cz-h/2),p(r,b,cz-h/2),p(r,a,cz-h/2),color);
    }
  }
  function ringZ(cx,cy,z,r1,r2,color,steps=42,glow=0){
    for(let i=0;i<steps;i++){
      const a=i/steps*2*Math.PI,b=(i+1)/steps*2*Math.PI;
      quad(vec(cx+r1*Math.cos(a),cy+r1*Math.sin(a),z),vec(cx+r1*Math.cos(b),cy+r1*Math.sin(b),z),vec(cx+r2*Math.cos(b),cy+r2*Math.sin(b),z),vec(cx+r2*Math.cos(a),cy+r2*Math.sin(a),z),color,0,glow);
    }
  }
  function wheel(cx,sign){
    const cy=.53,cz=sign*1.10;
    cylinderZ(cx,cy,cz,.54,.32,[.026,.029,.034],40);
    const outer=sign*1.28;
    ringZ(cx,cy,outer,.535,.45,[.055,.059,.066]);
    ringZ(cx,cy,outer+sign*.011,.437,.36,[.29,.32,.36]);
    cylinderZ(cx,cy,sign*1.15,.358,.07,[.08,.09,.11],40);
    ringZ(cx,cy,outer+sign*.015,.357,.295,[.43,.46,.52]);
    ringZ(cx,cy,outer+sign*.018,.12,.085,[.13,.15,.18]);
    cylinderZ(cx,cy,outer+sign*.026,.081,.025,[.64,.67,.72],28);
    // Seven sculpted blade spokes with side highlights.
    for(let i=0;i<7;i++){
      const theta=i/7*Math.PI*2+0.12;
      const c=Math.cos(theta),s=Math.sin(theta),perp=vec(-s,c,0);
      function point(r,w,z){return vec(cx+r*c+w*perp[0],cy+r*s+w*perp[1],z)}
      const z=outer+sign*.024;
      quad(point(.11,-.065,z),point(.35,-.037,z),point(.35,.037,z),point(.11,.065,z),[.48,.52,.59]);
      quad(point(.14,-.025,z+sign*.009),point(.33,-.014,z+sign*.009),point(.33,.010,z+sign*.009),point(.14,.025,z+sign*.009),[.67,.72,.79]);
    }
    // red brake detail and fender line
    quad(vec(cx-.18,cy+.29,outer+sign*.009),vec(cx-.33,cy+.14,outer+sign*.009),vec(cx-.25,cy-.05,outer+sign*.009),vec(cx-.12,cy+.06,outer+sign*.009),RED,0,.18);
    for(let i=0;i<22;i++){
      const a=(.02+i/22*.96)*Math.PI,b=(.02+(i+1)/22*.96)*Math.PI;
      const x1=cx+.568*Math.cos(a), y1=cy+.568*Math.sin(a),x2=cx+.568*Math.cos(b),y2=cy+.568*Math.sin(b);
      quad(vec(x1,y1,sign*1.046),vec(x2,y2,sign*1.046),vec(cx+.542*Math.cos(b),cy+.542*Math.sin(b),sign*1.045),vec(cx+.542*Math.cos(a),cy+.542*Math.sin(a),sign*1.045),[.065,.071,.08]);
    }
  }
  // Longitudinal, chamfered, curved body shell; x positive is the front.
  const stations=[
    [-2.68,.72,.76,.38],[-2.48,.90,.99,.37],[-2.2,1.00,1.08,.37],
    [-1.72,1.02,1.12,.36],[-1.1,1.03,1.14,.36],[-.36,1.035,1.15,.36],
    [.28,1.035,1.13,.36],[.95,1.025,1.12,.36],[1.68,.99,1.06,.36],
    [2.20,.91,.96,.37],[2.56,.80,.88,.39],[2.70,.71,.74,.43]
  ];
  function perimeter(s){const [x,w,top,bottom]=s;
    return [
      vec(x,top-.12,-w*.76),vec(x,top,-w*.60),vec(x,top,w*.60),vec(x,top-.12,w*.76),
      vec(x,top-.32,w*.94),vec(x,.58,w),vec(x,bottom+.01,w*.84),
      vec(x,bottom,-w*.84),vec(x,.58,-w),vec(x,top-.32,-w*.94)
    ];
  }
  for(let i=0;i<stations.length-1;i++){
    const a=perimeter(stations[i]),b=perimeter(stations[i+1]);
    for(let j=0;j<a.length;j++){
      const k=(j+1)%a.length;
      const col=(j<=2)?[.31,.35,.42]:(j===3||j===8)?[.23,.26,.30]:BODY;
      quad(a[j],b[j],b[k],a[k],col,1);
    }
  }
  let p=perimeter(stations[0]);for(let i=1;i<p.length-1;i++)face(p[0],p[i+1],p[i],BODY,1);
  p=perimeter(stations[stations.length-1]);for(let i=1;i<p.length-1;i++)face(p[0],p[i],p[i+1],BODY,1);
  // Sculpted accent line on either side.
  for(const sign of [-1,1]){
    const z=sign*1.028;
    // Lower sill and elongated rocker highlight
    box(-.08,.405,sign*.98,3.7,.095,.115,[.075,.087,.103]);
    box(-.07,.412,sign*1.045,3.62,.025,.031,RED,0,.16);
    box(.01,1.055,sign*1.007,1.62,.022,.023,[.51,.55,.61]);
    // Rear shoulder, mid vent and intake
    quad(vec(.99,.83,z),vec(1.42,.80,z-.010*sign),vec(1.18,.63,z+.006*sign),vec(.83,.65,z+.009*sign),DARK);
    quad(vec(1.07,.805,z+sign*.009),vec(1.29,.77,z+sign*.009),vec(1.10,.665,z+sign*.009),vec(.93,.675,z+sign*.009),[.065,.075,.09]);
    // Side mirror stalk and housing
    box(.56,1.34,sign*.93,.12,.075,.32,[.075,.09,.11]);
    box(.57,1.38,sign*1.10,.29,.13,.18,BODY,1);
    box(.58,1.389,sign*1.19,.25,.025,.019,[.75,.82,.89]);
    // Door separator and handle
    box(-.52,.905,sign*1.033,.018,.33,.016,[.06,.07,.086]);
    box(-.47,.99,sign*1.061,.21,.035,.016,[.52,.57,.62]);
  }
  // Cabin with front windscreen, rear window and roof.
  const roofFront=vec(.19,1.79,0),roofRear=vec(-.75,1.76,0);
  const nearW=.68,topW=.615;
  // front windshield slopes to nose
  quad(vec(.92,1.11,-.78),vec(.92,1.11,.78),vec(.19,1.78,.61),vec(.19,1.78,-.61),GLASS);
  quad(vec(-.75,1.76,-.61),vec(-.75,1.76,.61),vec(-1.40,1.12,.77),vec(-1.40,1.12,-.77),GLASS);
  quad(vec(-.78,1.79,-.615),vec(.19,1.79,-.615),vec(.19,1.79,.615),vec(-.78,1.79,.615),[.21,.24,.29],1);
  // roof center light and outer rails
  box(-.3,1.804,0,.93,.026,.84,[.30,.35,.42],1);
  for(const sign of [-1,1]){
    const z=sign*.68;
    quad(vec(.61,1.19,z+sign*.063),vec(.08,1.77,sign*.61),vec(-.76,1.75,sign*.61),vec(-1.30,1.17,z+sign*.076),GLASS);
    quad(vec(.46,1.25,z+sign*.072),vec(.10,1.70,sign*.63),vec(-.17,1.69,sign*.63),vec(-.16,1.26,z+sign*.072),[.055,.10,.142]);
    quad(vec(-.20,1.28,z+sign*.075),vec(-.20,1.69,sign*.63),vec(-.72,1.68,sign*.63),vec(-1.18,1.27,z+sign*.075),[.041,.07,.10]);
    box(-.18,1.49,sign*.688,.045,.46,.035,[.19,.22,.27]);
    box(-.34,1.76,sign*.62,1.02,.037,.035,[.57,.63,.70]);
  }
  // Windscreen upper and lower rails
  box(.92,1.12,0,.047,.035,1.58,[.47,.52,.58]);
  box(.19,1.78,0,.028,.032,1.25,[.62,.67,.74]);
  // Bonnet center power line
  box(1.70,1.065,0,1.25,.016,.020,[.55,.59,.65]);
  // Front fascia grille and slim signature DRLs
  box(2.70,.635,0,.032,.285,1.00,DARK);
  for(const sign of [-1,1]){
    box(2.695,.89,sign*.49,.052,.082,.50,[.82,.90,.98],0,.85);
    box(2.711,.837,sign*.52,.028,.018,.46,RED,0,.6);
    box(2.706,.495,sign*.53,.036,.055,.29,[.055,.06,.072]);
    box(2.716,.56,sign*.34,.027,.015,.13,[.36,.38,.43]);
    box(-2.69,.82,sign*.47,.049,.088,.46,RED,0,.83);
  }
  box(2.707,.431,0,.05,.051,1.20,[.46,.48,.53]);
  // Rear diffuser and dual exhaust tips
  box(-2.712,.48,0,.050,.12,1.16,[.09,.095,.112]);
  for(const sign of [-1,1]){
    box(-2.743,.48,sign*.45,.045,.07,.17,[.70,.73,.77]);
    box(-2.763,.48,sign*.45,.035,.045,.11,[.025,.03,.037]);
  }
  // Rear GT wing / struts
  for(const sign of [-1,1])box(-2.26,1.17,sign*.62,.07,.30,.07,DARK);
  box(-2.27,1.32,0,.33,.085,1.8,[.15,.17,.20],1);
  // Wheels last so the sidewall sits visibly outside the body.
  for(const side of [-1,1])for(const x of [-1.72,1.72])wheel(x,side);

  function shader(gl,type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){console.warn('WebGL shader error',gl.getShaderInfoLog(s));return null}return s}
  function createCanvasRenderer(canvas){
    const ctx=canvas.getContext('2d',{alpha:true});
    if(!ctx)return null;
    const triCount=mesh.p.length/9;
    let currentAngle=-.48,currentPaint='graphite';
    const colors={graphite:[.22,.24,.28],pearl:[.78,.81,.89],crimson:[.82,.045,.067]};
    const transformed=[];
    function lightColor(index,angle,body){
      const off=index*3;
      let nx=mesh.n[off],ny=mesh.n[off+1],nz=mesh.n[off+2];
      const co=Math.cos(angle),si=Math.sin(angle),pc=Math.cos(-.13),ps=Math.sin(-.13);
      const nX=co*nx+si*nz,nZ=-si*nx+co*nz;
      const nY=pc*ny-ps*nZ,nZZ=ps*ny+pc*nZ;
      const v=mesh.b[index];
      const base=[0,1,2].map(k=>mesh.c[off+k]*(1-v*.95)+body[k]*v*.95);
      const diffuse=.39+Math.max(nX*(-.42)+nY*.82+nZZ*.90,0)*.58/1.29+Math.max(nX*.65+nY*.22-nZZ*.90,0)*.29/1.13;
      const glw=mesh.g[index]||0;
      const f=Math.max(.15,diffuse);
      const spec=Math.pow(Math.max(nZZ,0),11)*.12;
      return 'rgb('+base.map((c,k)=>Math.round(Math.min(1,Math.pow(Math.max(0,c*(f+glw*.75)+spec),.84))*255)).join(',')+')';
    }
    function render(angle=currentAngle,finish=currentPaint){
      currentAngle=angle;currentPaint=finish;
      const rect=canvas.getBoundingClientRect();
      const dpr=Math.min(window.devicePixelRatio||1,1.4);
      const width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));
      if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
      ctx.clearRect(0,0,width,height);
      const aspect=width/height;
      const dist=Math.min(14.5,Math.max(7.35,11.8/aspect));
      const f=1/Math.tan(37*Math.PI/360);
      const size=height*f/2;
      const co=Math.cos(angle),si=Math.sin(angle),pc=Math.cos(-.13),ps=Math.sin(-.13);
      transformed.length=mesh.p.length/3;
      for(let j=0;j<mesh.p.length;j+=3){
        const x=mesh.p[j],y=mesh.p[j+1],z=mesh.p[j+2];
        const xx=co*x+si*z,zz=-si*x+co*z;
        const yy=pc*y-ps*zz-.82,zzz=ps*y+pc*zz-dist;
        const scale=size/Math.max(1,-zzz);
        transformed[j/3]=[width/2+xx*scale,height/2-yy*scale,zzz];
      }
      const tris=[];
      for(let k=0;k<triCount;k++){
        const a=transformed[k*3],b=transformed[k*3+1],c=transformed[k*3+2];
        tris.push([k,(a[2]+b[2]+c[2])/3]);
      }
      tris.sort((a,b)=>a[1]-b[1]);
      const tint=colors[finish]||colors.graphite;
      for(const [index] of tris){
        const p=transformed[index*3],q=transformed[index*3+1],r=transformed[index*3+2];
        ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.lineTo(r[0],r[1]);ctx.closePath();
        ctx.fillStyle=lightColor(index*3,angle,tint);
        ctx.fill();
      }
    }
    const observer=window.ResizeObserver?new ResizeObserver(()=>render()):null;
    observer?.observe(canvas);
    render();
    return {render,software:true,dispose:()=>observer?.disconnect()};
  }
  function create(canvas){
    let gl;
    try { gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'default',premultipliedAlpha:false}); } catch(e){return null;}
    if(!gl)return createCanvasRenderer(canvas);
    const vs=shader(gl,gl.VERTEX_SHADER,`
      attribute vec3 aPosition; attribute vec3 aNormal; attribute vec3 aColor;
      attribute float aPaint; attribute float aGlow;
      uniform mat4 uProjection; uniform float uAngle; uniform float uDistance; uniform vec3 uBody;
      varying vec3 vNormal; varying vec3 vColor; varying float vGlow; varying vec3 vPosition;
      void main(){
        float c=cos(uAngle),s=sin(uAngle);float p=-0.13,pc=cos(p),ps=sin(p);
        vec3 r=vec3(c*aPosition.x+s*aPosition.z,aPosition.y,-s*aPosition.x+c*aPosition.z);
        vec3 n=vec3(c*aNormal.x+s*aNormal.z,aNormal.y,-s*aNormal.x+c*aNormal.z);
        r=vec3(r.x,pc*r.y-ps*r.z,ps*r.y+pc*r.z);
        n=vec3(n.x,pc*n.y-ps*n.z,ps*n.y+pc*n.z);
        vec3 viewPos=vec3(r.x,r.y-0.82,r.z-uDistance);
        vPosition=viewPos;vNormal=normalize(n);vColor=mix(aColor,uBody,aPaint*.95);vGlow=aGlow;
        gl_Position=uProjection*vec4(viewPos,1.0);
      }`);
    const fs=shader(gl,gl.FRAGMENT_SHADER,`
      precision mediump float;
      varying vec3 vNormal; varying vec3 vColor; varying float vGlow; varying vec3 vPosition;
      void main(){
        vec3 n=normalize(vNormal);
        vec3 l=normalize(vec3(-0.42,0.82,0.9));
        vec3 l2=normalize(vec3(0.65,0.22,-0.9));
        float lit=.39+max(dot(n,l),0.0)*.58+max(dot(n,l2),0.0)*.29;
        float spec=pow(max(dot(reflect(-l,n),normalize(-vPosition)),0.0),38.0);
        float rim=pow(1.0-max(dot(n,normalize(-vPosition)),0.0),2.0);
        vec3 finalColor=vColor*lit + vec3(.74,.80,.93)*spec*.63 + vec3(.42,.50,.58)*rim*.065;
        finalColor += vColor*vGlow*.75;
        finalColor=pow(max(finalColor,vec3(0.0)),vec3(.84));
        gl_FragColor=vec4(finalColor,1.0);
      }`);
    if(!vs||!fs)return createCanvasRenderer(canvas);
    const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) {console.warn('WebGL link error',gl.getProgramInfoLog(program));return createCanvasRenderer(canvas);}
    gl.useProgram(program);
    const attrs={p:['aPosition',3,mesh.p],n:['aNormal',3,mesh.n],c:['aColor',3,mesh.c],b:['aPaint',1,mesh.b],g:['aGlow',1,mesh.g]};
    Object.values(attrs).forEach(([name,size,data])=>{const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);const loc=gl.getAttribLocation(program,name);if(loc>=0){gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(loc);}});
    const uProj=gl.getUniformLocation(program,'uProjection');
    const uAngle=gl.getUniformLocation(program,'uAngle');
    const uDistance=gl.getUniformLocation(program,'uDistance');
    const uBody=gl.getUniformLocation(program,'uBody');
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
    // No culling: closed geometry and panels can be seen from every angle.
    let currentAngle=-.48, currentPaint='graphite';
    function paintColor(finish){return finish==='pearl'?[.78,.81,.89]:finish==='crimson'?[.82,.045,.067]:[.22,.24,.28];}
    function render(angle=currentAngle,finish=currentPaint){
      currentAngle=angle;currentPaint=finish;
      const rect=canvas.getBoundingClientRect();const dpr=Math.min(devicePixelRatio||1,1.8);
      const width=Math.max(1,Math.round(rect.width*dpr)),height=Math.max(1,Math.round(rect.height*dpr));
      if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
      gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const aspect=width/height, f=1/Math.tan(37*Math.PI/360),near=.1,far=80;
      const projection=new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,(2*far*near)/(near-far),0]);
      const distance=Math.min(14.5,Math.max(7.35,11.8/aspect));
      gl.uniformMatrix4fv(uProj,false,projection);
      gl.uniform1f(uAngle,angle);gl.uniform1f(uDistance,distance);
      gl.uniform3fv(uBody,new Float32Array(paintColor(finish)));
      gl.drawArrays(gl.TRIANGLES,0,mesh.p.length/3);
    }
    const resizeObserver='ResizeObserver' in window?new ResizeObserver(()=>render()):null;
    resizeObserver?.observe(canvas);
    window.addEventListener('orientationchange',()=>setTimeout(render,100));
    render();
    return { render, dispose:()=>resizeObserver?.disconnect() };
  }
  window.VORLAGE_03_CAR_VIEWER={create};
})();
