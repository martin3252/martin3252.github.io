(() => {
  'use strict';
  const config = window.SITE_CONFIG;
  for (const key of ['name', 'intro', 'bio']) {
    document.getElementById(key).textContent = config[key];
  }
  const visuals = {
    talk: '<div class="talk-preview"><b>How2Talk</b><div class="bubble muted-bubble">Finding the words…</div><div class="bubble good-bubble">A better way to say it.</div><small>Scenarios · Search · Audience filters</small></div>',
    directory: '<div class="directory-preview"><b>Brisbane Tradies</b><div class="mock-search">Find a business, suburb, or trade</div><div class="mock-row"><span>Business</span><span>Rating</span><span>Distance</span></div><div class="mock-row"><span>Plumber</span><span>★</span><span>km</span></div><div class="mock-row"><span>Electrician</span><span>★</span><span>km</span></div></div>'
  };
  const cards = document.getElementById('cards');
  cards.replaceChildren();
  for (const project of config.projects) {
    const article = document.createElement('article');
    article.className = 'card featured';
    const thumbnail = document.createElement('div');
    thumbnail.className = `thumbnail thumb-${project.visual}`;
    thumbnail.setAttribute('aria-hidden', 'true');
    thumbnail.innerHTML = visuals[project.visual] || '';
    const content = document.createElement('div');
    content.className = 'card-content';
    const heading = document.createElement('h3');
    heading.textContent = project.title;
    const purpose = document.createElement('p');
    purpose.className = 'product-purpose';
    purpose.textContent = project.purpose;
    const description = document.createElement('p');
    description.textContent = project.description;
    const tags = document.createElement('div');
    tags.className = 'tags';
    for (const label of project.tags) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = label;
      tags.append(tag);
    }
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const url = new URL(project.previewUrl);
    if (url.protocol === 'https:') {
      const link = document.createElement('a');
      link.href = url.href;
      link.textContent = `Try ${project.title} ↗`;
      link.setAttribute('aria-label', `Try ${project.title} (opens in a new tab)`);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      actions.append(link);
    }
    content.append(heading, purpose, description, tags, actions);
    article.append(thumbnail, content);
    cards.append(article);
  }
})();
