(() => {
  'use strict';
  const config = window.SITE_CONFIG;
  const el = id => document.getElementById(id);
  const safeUrl = value => { if (!value) return null; try { const u = new URL(value, location.href); return ['http:','https:','file:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
  el('name').textContent = config.name; el('intro').textContent = config.intro; el('bio').textContent = config.bio;
  el('footer-name').textContent = `${config.name} / dev lab`;
  el('profile-note').hidden = !config.profileIsPlaceholder;
  document.title = `${config.name} — Dev / Lab`;
  if (/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(config.githubUsername)) { el('github-link').href = `https://github.com/${config.githubUsername}`; el('github-link').hidden = false; }
  const projects = config.projects;
  el('total').textContent = ` / ${String(projects.length).padStart(2,'0')}`;
  const tags = ['全部', ...new Set(projects.flatMap(p => p.tags))];
  let active = '全部';
  const visual = {
    talk: '<div class="talk-preview"><b>How2Talk <span>職場溝通</span></b><div class="bubble muted-bubble">難開口的話…</div><div class="bubble good-bubble">換個方式，好好說。↗</div><small>情境卡片 · 搜尋 · 對象篩選</small></div>',
    directory: '<div class="directory-preview"><b>Brisbane Tradies <span>↗</span></b><div class="mock-search">搜尋商家、地區或工種 ⌕</div><div class="mock-row"><span>商家</span><span>評分</span><span>距離</span></div><div class="mock-row"><span>Plumber</span><span>★</span><span>km</span></div><div class="mock-row"><span>Electrician</span><span>★</span><span>km</span></div></div>', 
    palette: '<div class="swatches"><i></i><i></i><i></i><i></i><i></i></div>',
    focus: '<div class="timer-disc"><span>25:00</span><small>TIME TO FOCUS</small></div>',
    tasks: '<div class="mini-list"><b>A LITTLE PROGRESS.</b><span>☑ 把想法記下來</span><span>☐ 做一個小實驗</span><span>☐ 分享給世界</span></div>'
  };
  const dialog = el('preview-dialog'), frame = el('preview-frame');
  function preview(p, url) {
    el('preview-title').textContent = p.title + (p.isDemo ? ' · 示範' : '');
    frame.title = `${p.title}互動預覽`;
    if (window.DEMO_PAGES?.[p.id]) frame.srcdoc = window.DEMO_PAGES[p.id]; else { frame.removeAttribute('srcdoc'); frame.src = url; }
    dialog.showModal(); el('close-preview').focus();
  }
  el('close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; });
  function render() {
    const selected = projects.filter(p => active === '全部' || p.tags.includes(active));
    el('cards').replaceChildren();
    for (const [i,p] of selected.entries()) {
      const article = document.createElement('article'); article.className = p.featured ? 'card featured' : 'card';
      const thumb = document.createElement('div'); const key = visual[p.visual] ? p.visual : 'tasks'; thumb.className = `thumbnail thumb-${key}`; thumb.setAttribute('aria-hidden','true'); thumb.innerHTML = visual[key];
      const index = document.createElement('span'); index.className = 'thumb-index'; index.textContent = `EXPERIMENT / ${String(projects.indexOf(p)+1).padStart(2,'0')}`; thumb.append(index);
      const content = document.createElement('div'); content.className = 'card-content';
      const meta = document.createElement('div'); meta.className = 'card-meta'; const subtitle = document.createElement('span'); subtitle.textContent=p.subtitle; meta.append(subtitle);
      if(!p.isDemo){const real=document.createElement('span');real.className='demo-badge real-badge';real.textContent='實際作品';meta.append(real);}
      if(p.isDemo){const badge=document.createElement('span');badge.className='demo-badge';badge.textContent='示範作品';meta.append(badge);}
      const title=document.createElement('h3');title.textContent=p.title;
      const desc=document.createElement('p');desc.textContent=p.description;
      const tagWrap=document.createElement('div');tagWrap.className='tags';p.tags.forEach(t=>{const tag=document.createElement('span');tag.className='tag';tag.textContent=t;tagWrap.append(tag);});
      const actions=document.createElement('div');actions.className='card-actions';
      const url=safeUrl(p.previewUrl);
      if(url){
        if(window.DEMO_PAGES?.[p.id] || new URL(url).origin===location.origin || new URL(url).protocol==='file:') { const b=document.createElement('button');b.className='preview-button';b.textContent='線上預覽 ↗';b.setAttribute('aria-label',`預覽${p.title}`);b.addEventListener('click',()=>preview(p,url));actions.append(b); }
        else {const a=document.createElement('a');a.href=url;a.textContent='線上預覽 ↗';a.target='_blank';a.rel='noopener noreferrer';actions.append(a);}
      }else{const s=document.createElement('span');s.className='unavailable';s.textContent='尚未提供預覽';actions.append(s);}
      const source=safeUrl(p.sourceUrl);
      if(source){const a=document.createElement('a');a.href=window.DEMO_SOURCE ? URL.createObjectURL(new Blob([window.DEMO_SOURCE],{type:'text/plain;charset=utf-8'})) : source;a.textContent='原始碼 ↗';a.setAttribute('aria-label',`${p.title}原始碼`);if(window.DEMO_SOURCE)a.download='demo.js';actions.append(a);}
      content.append(meta,title,desc,tagWrap,actions);article.append(thumb,content);el('cards').append(article);
    }
    el('result-count').textContent=`${selected.length} 個作品`;
    el('filters').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===active)));
  }
  tags.forEach(t=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',String(t===active));b.addEventListener('click',()=>{active=t;render();});el('filters').append(b);});render();
})();
