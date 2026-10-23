(() => {
 'use strict';
 const get=id=>document.getElementById(id);
 if(document.body.dataset.demo==='palette'){
  const hue=get('hue');let css='';
  function update(){get('hue-value').textContent=hue.value+'°';const values=[22,38,58,75,88];get('swatches').replaceChildren();const lines=[];values.forEach((l,i)=>{const color=`hsl(${(Number(hue.value)+i*12)%360} 42% ${l}%)`;const div=document.createElement('div'),label=document.createElement('span');div.style.backgroundColor=color;label.textContent=`${l}%`;div.append(label);get('swatches').append(div);lines.push(`  --color-${i+1}: ${color};`);});css=`:root {\n${lines.join('\n')}\n}`;get('css-output').textContent=css;get('message').textContent='';}
  hue.addEventListener('input',update);get('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(css);get('message').textContent='CSS variables copied.';}catch{get('message').textContent='Clipboard access is unavailable. Select and copy the CSS below.';}});update();
 }
 if(document.body.dataset.demo==='focus'){
  let remaining=1500,end=0,tick=null;
  function draw(){get('timer').textContent=`${Math.floor(remaining/60).toString().padStart(2,'0')}:${(remaining%60).toString().padStart(2,'0')}`;}
  function stop(){clearInterval(tick);tick=null;get('start').textContent='Resume';get('minutes').disabled=false;}
  function update(){remaining=Math.max(0,Math.ceil((end-Date.now())/1000));draw();if(remaining===0){stop();get('start').textContent='Start again';get('timer-status').textContent='Focus session complete. Take a break.';}}
  function reset(){stop();let n=Number(get('minutes').value);n=Number.isFinite(n)?Math.min(120,Math.max(1,Math.round(n))):25;get('minutes').value=n;remaining=n*60;draw();get('start').textContent='Start focusing';get('timer-status').textContent='Ready when you are.';}
  get('start').addEventListener('click',()=>{if(tick){update();stop();get('timer-status').textContent='Paused. Resume whenever you are ready.';}else{if(!remaining)reset();end=Date.now()+remaining*1000;tick=setInterval(update,200);get('start').textContent='Pause';get('minutes').disabled=true;get('timer-status').textContent='Focus session in progress.';}});
  get('reset').addEventListener('click',reset);get('minutes').addEventListener('change',reset);window.addEventListener('pagehide',()=>clearInterval(tick));draw();
 }
 if(document.body.dataset.demo==='tasks'){
  let tasks=[{text:'Try adding a task',done:false},{text:'Explore the portfolio',done:true}];
  function render(){get('task-list').replaceChildren();tasks.forEach((task,i)=>{const li=document.createElement('li'),label=document.createElement('label'),check=document.createElement('input'),span=document.createElement('span'),del=document.createElement('button');check.type='checkbox';check.checked=task.done;check.addEventListener('change',()=>{task.done=check.checked;get('message').textContent=`${tasks.filter(t=>t.done).length} / ${tasks.length} completed`;});span.textContent=task.text;label.append(check,span);del.textContent='Delete';del.setAttribute('aria-label',`Delete ${task.text}`);del.addEventListener('click',()=>{tasks.splice(i,1);render();get('task-input').focus();});li.append(label,del);get('task-list').append(li);});get('message').textContent=tasks.length?`${tasks.filter(t=>t.done).length} / ${tasks.length} completed`:'Nothing here yet. Add a small task.';}
  get('task-form').addEventListener('submit',e=>{e.preventDefault();const input=get('task-input'),text=input.value.trim();if(!text){get('message').textContent='Enter a task first.';input.focus();return;}tasks.push({text,done:false});input.value='';render();input.focus();});render();
 }
})();
