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
  const tags = ['All', ...new Set(projects.flatMap(p => p.tags))];
  let active = 'All';
  const visual = {
    talk: '<div class="talk-preview"><b>How2Talk <span>Workplace communication</span></b><div class="bubble muted-bubble">Finding the words…</div><div class="bubble good-bubble">A better way to say it.↗</div><small>Scenarios · Search · Audience filters</small></div>',
    directory: '<div class="directory-preview"><b>Brisbane Tradies <span>↗</span></b><div class="mock-search">Find a business, suburb, or trade ⌕</div><div class="mock-row"><span>Business</span><span>Rating</span><span>Distance</span></div><div class="mock-row"><span>Plumber</span><span>★</span><span>km</span></div><div class="mock-row"><span>Electrician</span><span>★</span><span>km</span></div></div>', 
    palette: '<div class="swatches"><i></i><i></i><i></i><i></i><i></i></div>',
    focus: '<div class="timer-disc"><span>25:00</span><small>TIME TO FOCUS</small></div>',
    tasks: '<div class="mini-list"><b>A LITTLE PROGRESS.</b><span>☑ Write down an idea</span><span>☐ Build a small experiment</span><span>☐ Share it with the world</span></div>'
  };
  const dialog = el('preview-dialog'), frame = el('preview-frame');
  function preview(p, url) {
    el('preview-title').textContent = p.title + (p.isDemo ? ' · Sample demo' : '');
    frame.title = `${p.title} interactive preview`;
    if (window.DEMO_PAGES?.[p.id]) frame.srcdoc = window.DEMO_PAGES[p.id]; else { frame.removeAttribute('srcdoc'); frame.src = url; }
    dialog.showModal(); el('close-preview').focus();
  }
  el('close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; });
  function render() {
    const selected = projects.filter(p => active === 'All' || p.tags.includes(active));
    el('cards').replaceChildren();
    for (const [i,p] of selected.entries()) {
      const article = document.createElement('article'); article.className = p.featured ? 'card featured' : 'card';
      const thumb = document.createElement('div'); const key = visual[p.visual] ? p.visual : 'tasks'; thumb.className = `thumbnail thumb-${key}`; thumb.setAttribute('aria-hidden','true'); thumb.innerHTML = visual[key];
      const index = document.createElement('span'); index.className = 'thumb-index'; index.textContent = `EXPERIMENT / ${String(projects.indexOf(p)+1).padStart(2,'0')}`; thumb.append(index);
      const content = document.createElement('div'); content.className = 'card-content';
      const meta = document.createElement('div'); meta.className = 'card-meta'; const subtitle = document.createElement('span'); subtitle.textContent=p.subtitle; meta.append(subtitle);
      if(!p.isDemo){const real=document.createElement('span');real.className='demo-badge real-badge';real.textContent='Live project';meta.append(real);}
      if(p.isDemo){const badge=document.createElement('span');badge.className='demo-badge';badge.textContent='Sample demo';meta.append(badge);}
      const title=document.createElement('h3');title.textContent=p.title;
      const desc=document.createElement('p');desc.textContent=p.description;
      const tagWrap=document.createElement('div');tagWrap.className='tags';p.tags.forEach(t=>{const tag=document.createElement('span');tag.className='tag';tag.textContent=t;tagWrap.append(tag);});
      const actions=document.createElement('div');actions.className='card-actions';
      const url=safeUrl(p.previewUrl);
      if(url){
        if(window.DEMO_PAGES?.[p.id] || new URL(url).origin===location.origin || new URL(url).protocol==='file:') { const b=document.createElement('button');b.className='preview-button';b.textContent='Live demo ↗';b.setAttribute('aria-label',`Preview ${p.title}`);b.addEventListener('click',()=>preview(p,url));actions.append(b); }
        else {const a=document.createElement('a');a.href=url;a.textContent='Live demo ↗';a.target='_blank';a.rel='noopener noreferrer';actions.append(a);}
      }else{const s=document.createElement('span');s.className='unavailable';s.textContent='Preview unavailable';actions.append(s);}
      const source=safeUrl(p.sourceUrl);
      if(source){const a=document.createElement('a');a.href=window.DEMO_SOURCE ? URL.createObjectURL(new Blob([window.DEMO_SOURCE],{type:'text/plain;charset=utf-8'})) : source;a.textContent='Source code ↗';a.setAttribute('aria-label',`${p.title} source code`);if(window.DEMO_SOURCE)a.download='demo.js';actions.append(a);}
      content.append(meta,title,desc,tagWrap,actions);article.append(thumb,content);el('cards').append(article);
    }
    el('result-count').textContent=`${selected.length} ${selected.length === 1 ? 'project' : 'projects'}`;
    el('filters').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===active)));
  }
  tags.forEach(t=>{const b=document.createElement('button');b.type='button';b.textContent=t;b.setAttribute('aria-pressed',String(t===active));b.addEventListener('click',()=>{active=t;render();});el('filters').append(b);});render();
})();
