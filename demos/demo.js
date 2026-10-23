(() => {
 'use strict';
 const get=id=>document.getElementById(id);
 if(document.body.dataset.demo==='palette'){
  const hue=get('hue');let css='';
  function update(){get('hue-value').textContent=hue.value+'°';const values=[22,38,58,75,88];get('swatches').replaceChildren();const lines=[];values.forEach((l,i)=>{const color=`hsl(${(Number(hue.value)+i*12)%360} 42% ${l}%)`;const div=document.createElement('div'),label=document.createElement('span');div.style.backgroundColor=color;label.textContent=`${l}%`;div.append(label);get('swatches').append(div);lines.push(`  --color-${i+1}: ${color};`);});css=`:root {\n${lines.join('\n')}\n}`;get('css-output').textContent=css;get('message').textContent='';}
  hue.addEventListener('input',update);get('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(css);get('message').textContent='已複製 CSS 變數。';}catch{get('message').textContent='瀏覽器未開放剪貼簿權限，請選取下方 CSS 手動複製。';}});update();
 }
 if(document.body.dataset.demo==='focus'){
  let remaining=1500,end=0,tick=null;
  function draw(){get('timer').textContent=`${Math.floor(remaining/60).toString().padStart(2,'0')}:${(remaining%60).toString().padStart(2,'0')}`;}
  function stop(){clearInterval(tick);tick=null;get('start').textContent='繼續';get('minutes').disabled=false;}
  function update(){remaining=Math.max(0,Math.ceil((end-Date.now())/1000));draw();if(remaining===0){stop();get('start').textContent='重新開始';get('timer-status').textContent='這一段專注完成了，休息一下吧。';}}
  function reset(){stop();let n=Number(get('minutes').value);n=Number.isFinite(n)?Math.min(120,Math.max(1,Math.round(n))):25;get('minutes').value=n;remaining=n*60;draw();get('start').textContent='開始專注';get('timer-status').textContent='準備好了，就開始。';}
  get('start').addEventListener('click',()=>{if(tick){update();stop();get('timer-status').textContent='已暫停，隨時可以繼續。';}else{if(!remaining)reset();end=Date.now()+remaining*1000;tick=setInterval(update,200);get('start').textContent='暫停';get('minutes').disabled=true;get('timer-status').textContent='專注進行中。';}});
  get('reset').addEventListener('click',reset);get('minutes').addEventListener('change',reset);window.addEventListener('pagehide',()=>clearInterval(tick));draw();
 }
 if(document.body.dataset.demo==='tasks'){
  let tasks=[{text:'試試新增自己的待辦',done:false},{text:'體驗第一版作品網站',done:true}];
  function render(){get('task-list').replaceChildren();tasks.forEach((task,i)=>{const li=document.createElement('li'),label=document.createElement('label'),check=document.createElement('input'),span=document.createElement('span'),del=document.createElement('button');check.type='checkbox';check.checked=task.done;check.addEventListener('change',()=>{task.done=check.checked;get('message').textContent=`已完成 ${tasks.filter(t=>t.done).length} / ${tasks.length} 項`;});span.textContent=task.text;label.append(check,span);del.textContent='刪除';del.setAttribute('aria-label',`刪除${task.text}`);del.addEventListener('click',()=>{tasks.splice(i,1);render();get('task-input').focus();});li.append(label,del);get('task-list').append(li);});get('message').textContent=tasks.length?`已完成 ${tasks.filter(t=>t.done).length} / ${tasks.length} 項`:'清單空空的，新增一件小事吧。';}
  get('task-form').addEventListener('submit',e=>{e.preventDefault();const input=get('task-input'),text=input.value.trim();if(!text){get('message').textContent='請先輸入待辦內容。';input.focus();return;}tasks.push({text,done:false});input.value='';render();input.focus();});render();
 }
})();
