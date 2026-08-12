// ─── All page content lives in content.json. Edit that file to change text/images/links. ───

function esc(s) {
  var d = document.createElement('div');
  d.textContent = s == null ? '' : s;
  return d.innerHTML;
}

function renderBullets(items) {
  return items.map(function(b) { return '<li>' + esc(b) + '</li>'; }).join('');
}

function renderGallery(gallery, cols) {
  if (!gallery || !gallery.length) return '';
  return '<div class="exp-gallery cols-' + cols + '">' +
    gallery.map(function(g) {
      return '<div class="gal-img ' + g.shape + '">' +
        '<img src="' + esc(g.image) + '" class="gal-img-placeholder" alt="' + esc(g.label) + '">' +
        '<div class="gal-label">' + esc(g.label) + '</div>' +
        '</div>';
    }).join('') + '</div>';
}

function renderModalImages(images, cols) {
  if (!images || !images.length) return '';
  return '<p class="modal-section-label">From the PPT, Additional Visuals</p>' +
    '<div class="modal-img-grid cols-' + cols + '">' +
    images.map(function(im) {
      return '<div class="modal-img-wrap wide">' +
        '<img src="' + esc(im.image) + '" alt="' + esc(im.label) + '">' +
        '<div class="modal-img-label">' + esc(im.label) + '</div>' +
        '</div>';
    }).join('') + '</div>';
}

function renderPage(data) {
  document.title = data.site.title;

  // NAV
  document.getElementById('nav-logo').textContent = data.site.logo;

  // HERO
  document.getElementById('hero-eyebrow').textContent = data.hero.eyebrow;
  document.getElementById('hero-name-l1').textContent = data.hero.nameLine1;
  document.getElementById('hero-name-l2').textContent = data.hero.nameLine2;
  document.getElementById('hero-title').textContent = data.hero.title;
  document.getElementById('hero-bio').textContent = data.hero.bio;
  document.getElementById('hero-image').src = data.hero.image;

  // ABOUT
  document.getElementById('about-eyebrow').textContent = data.about.eyebrowNum;
  document.getElementById('about-heading-l1').textContent = data.about.headingLine1;
  document.getElementById('about-heading-em').textContent = data.about.headingEm;
  document.getElementById('about-photo').src = data.about.photo;
  document.getElementById('about-photo-label').textContent = data.about.photoLabel;
  document.getElementById('about-bio').textContent = data.about.bio;

  document.getElementById('skills-list').innerHTML = data.about.skills.map(function(s) {
    return '<div class="skill-item">' +
      '<div class="skill-icon">' + s.icon + '</div>' +
      '<div class="skill-name">' + esc(s.name) + '</div>' +
      '<div class="skill-desc">' + esc(s.desc) + '</div>' +
      '</div>';
  }).join('');

  document.getElementById('edu-row').innerHTML = data.about.education.map(function(e) {
    var location = e.location ? '<div class="edu-detail">' + esc(e.location) + '</div>' : '';
    var detail = e.detail ? '<div class="edu-detail">' + esc(e.detail) + '</div>' : '';
    return '<div class="edu-card">' +
      '<div class="edu-deg">' + esc(e.degree) + '</div>' +
      '<div class="edu-school">' + esc(e.school) + '</div>' +
      location +
      detail +
      '<div class="edu-detail" style="margin-top:0.35rem;">' + esc(e.graduated) + '</div>' +
      '</div>';
  }).join('');

  // EXPERIENCE
  document.getElementById('exp-eyebrow').textContent = data.experience.eyebrowNum;
  document.getElementById('exp-heading-l1').textContent = data.experience.headingLine1;
  document.getElementById('exp-heading-em').textContent = data.experience.headingEm;

  document.getElementById('exp-timeline').innerHTML = data.experience.items.map(function(x) {
    var logos = '';
    if (x.logos && x.logos.length) {
      logos = '<div class="exp-logos">' + x.logos.map(function(l) {
        return '<span class="logo-badge ' + l.class + '">' + esc(l.label) + '</span>';
      }).join('') + '</div>';
    }
    var deepDiveBtn = x.deepDive ?
      '<button class="read-more-btn" onclick="openModal(\'' + x.id + '\')">Read More ' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>'
      : '';
    var externalBtn = x.externalLink ?
      '<a class="external-btn" href="' + esc(x.externalLink.url) + '" target="_blank" rel="noopener noreferrer">' + esc(x.externalLink.label) +
      ' <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>'
      : '';
    var btnRow = (deepDiveBtn || externalBtn) ? '<div class="exp-btn-row">' + deepDiveBtn + externalBtn + '</div>' : '';
    var badge = x.badge ? '<div class="exp-badge">' + esc(x.badge) + '</div>' : '';

    return '<div class="exp-item">' +
      '<div class="exp-left">' +
        '<div class="exp-num">' + esc(x.num) + '</div>' +
        '<div class="exp-company">' + esc(x.company) + '</div>' +
        '<div class="exp-role">' + esc(x.role) + '</div>' +
        '<div class="exp-loc">' + esc(x.location) + '</div>' +
        badge +
        '<div class="exp-date">' + esc(x.dates) + '</div>' +
        logos +
      '</div>' +
      '<div class="exp-right fade">' +
        '<p class="exp-summary">' + esc(x.summary) + '</p>' +
        '<ul class="exp-bullets">' + renderBullets(x.bullets) + '</ul>' +
        btnRow +
        renderGallery(x.gallery, x.galleryCols) +
      '</div>' +
    '</div>';
  }).join('');

  // PROJECTS
  document.getElementById('proj-eyebrow').textContent = data.projects.eyebrowNum;
  document.getElementById('proj-heading-l1').textContent = data.projects.headingLine1;
  document.getElementById('proj-heading-em').textContent = data.projects.headingEm;

  document.getElementById('proj-grid').innerHTML = data.projects.items.map(function(p) {
    var fullStoryBtn = p.deepDive ?
      '<button class="read-more-btn" style="margin: 1rem 2rem 1.5rem;" onclick="openModal(\'' + p.id + '\')">Full Story ' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>'
      : '';
    return '<div class="proj-card">' +
      '<div class="proj-img-wrap"><img src="' + esc(p.image) + '" class="proj-img" alt="' + esc(p.title) + '"></div>' +
      '<div class="proj-body">' +
        '<div class="proj-num">' + esc(p.num) + '</div>' +
        '<div class="proj-title">' + esc(p.title) + '</div>' +
        '<div class="proj-role">' + esc(p.role) + '</div>' +
        '<p class="proj-desc">' + esc(p.desc) + '</p>' +
        '<div class="proj-tags">' + p.tags.map(function(t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
      '</div>' +
      fullStoryBtn +
    '</div>';
  }).join('');

  // CONTACT
  document.getElementById('contact-eyebrow').textContent = data.contact.eyebrowNum;
  document.getElementById('contact-heading-l1').textContent = data.contact.headingLine1;
  document.getElementById('contact-heading-em').textContent = data.contact.headingEm;
  document.getElementById('contact-quote').textContent = data.contact.quote;
  document.getElementById('contact-email-text').textContent = data.contact.email;
  document.getElementById('contact-email').href = 'mailto:' + data.contact.email;
  document.getElementById('contact-phone-text').textContent = data.contact.phone;
  document.getElementById('contact-phone').href = 'tel:' + data.contact.phoneHref;
  document.getElementById('contact-linkedin').href = data.contact.linkedin;
  document.getElementById('contact-location').textContent = data.contact.location;

  // FOOTER
  document.getElementById('footer-name').textContent = data.site.footerName;
  document.getElementById('footer-role').textContent = data.site.footerRole;

  // MODAL TEMPLATES (built once, looked up by id when opened)
  var modalData = {};
  data.experience.items.forEach(function(x) {
    if (!x.deepDive) return;
    modalData[x.id] = {
      eyebrow: x.deepDive.eyebrow,
      title: x.company,
      subtitle: x.role + ' &nbsp;·&nbsp; ' + x.location,
      sectionLabel: x.deepDive.sectionLabel,
      bullets: x.deepDive.bullets,
      images: x.deepDive.images,
      imgCols: x.deepDive.imgCols
    };
  });
  data.projects.items.forEach(function(p) {
    if (!p.deepDive) return;
    modalData[p.id] = {
      eyebrow: p.deepDive.eyebrow,
      title: p.title,
      subtitle: p.deepDive.subtitle,
      sectionLabel: p.deepDive.sectionLabel,
      bullets: p.deepDive.bullets,
      images: p.deepDive.images,
      imgCols: p.deepDive.imgCols
    };
  });
  window.__modalData = modalData;
}

function openModal(id) {
  var m = window.__modalData && window.__modalData[id];
  if (!m) return;
  var html =
    '<p class="modal-eyebrow">' + esc(m.eyebrow) + '</p>' +
    '<div class="modal-title">' + esc(m.title) + '</div>' +
    '<div class="modal-subtitle">' + m.subtitle + '</div>' +
    '<p class="modal-section-label">' + esc(m.sectionLabel) + '</p>' +
    '<ul class="modal-bullets">' + renderBullets(m.bullets) + '</ul>' +
    renderModalImages(m.images, m.imgCols);
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { wireImages(document.getElementById('modal-content')); }, 50);
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
var openLightbox, wireImages;
(function() {
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.innerHTML = '<div id="lb-bg"></div><button id="lb-close">&#215;</button><div id="lb-wrap"><img id="lb-img" draggable="false"></div><div id="lb-caption"></div>';
  document.body.appendChild(lb);

  var lbImg   = document.getElementById('lb-img');
  var lbCap   = document.getElementById('lb-caption');
  var lbWrap  = document.getElementById('lb-wrap');
  var scale   = 1, minScale = 1, maxScale = 5;
  var tx = 0, ty = 0;
  var dragging = false, startX, startY, startTx, startTy;

  function applyTransform() {
    lbImg.style.transform = 'translate('+tx+'px,'+ty+'px) scale('+scale+')';
  }
  function resetTransform() {
    scale = 1; tx = 0; ty = 0; applyTransform();
    lbImg.style.cursor = 'zoom-in';
  }
  function clampPan() {
    var hw = lbImg.naturalWidth  * scale / 2;
    var hh = lbImg.naturalHeight * scale / 2;
    var mw = Math.max(0, hw - window.innerWidth  / 2);
    var mh = Math.max(0, hh - window.innerHeight / 2);
    tx = Math.max(-mw, Math.min(mw, tx));
    ty = Math.max(-mh, Math.min(mh, ty));
  }

  openLightbox = function(src, caption) {
    resetTransform();
    lbImg.src = src;
    lbCap.textContent = caption || '';
    lb.classList.add('lb-active');
    document.body.style.overflow = 'hidden';
  };
  window.openLightbox = openLightbox;

  function closeLightbox() {
    lb.classList.remove('lb-active');
    document.body.style.overflow = '';
    setTimeout(function(){ lbImg.src = ''; }, 300);
  }

  document.getElementById('lb-bg').addEventListener('click', closeLightbox);
  document.getElementById('lb-close').addEventListener('click', closeLightbox);

  lbWrap.addEventListener('wheel', function(e) {
    e.preventDefault();
    var delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.max(minScale, Math.min(maxScale, scale + delta));
    clampPan();
    applyTransform();
    lbImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
  }, { passive: false });

  lbImg.addEventListener('click', function(e) {
    if (dragging) return;
    if (scale === 1) { scale = 2.5; clampPan(); applyTransform(); lbImg.style.cursor = 'grab'; }
    else { resetTransform(); }
  });

  lbImg.addEventListener('mousedown', function(e) {
    if (scale <= 1) return;
    dragging = false; startX = e.clientX; startY = e.clientY; startTx = tx; startTy = ty;
    lbImg.style.cursor = 'grabbing';
    var moved = false;
    function onMove(ev) {
      var dx = ev.clientX - startX, dy = ev.clientY - startY;
      if (Math.abs(dx)+Math.abs(dy) > 3) moved = true;
      tx = startTx + dx; ty = startTy + dy; clampPan(); applyTransform();
    }
    function onUp() {
      dragging = moved;
      lbImg.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      setTimeout(function(){ dragging = false; }, 50);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lb.classList.contains('lb-active')) closeLightbox();
  });

  wireImages = function(root) {
    root.querySelectorAll('.gal-img img, .proj-img, .modal-img-wrap img').forEach(function(img) {
      if (img.dataset.lb) return;
      img.dataset.lb = '1';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        var wrap = img.closest('.gal-img, .modal-img-wrap');
        var cap = wrap ? (wrap.querySelector('.gal-label,.modal-img-label') || {}).textContent || '' : '';
        openLightbox(img.src, cap.trim());
      });
    });
  };
  window.wireImages = wireImages;
})();

// Cursor
var cur = document.getElementById('cursor');
var dot = document.getElementById('cursor-dot');
document.addEventListener('mousemove', function(e) {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
});

// Scroll progress
var prog = document.getElementById('progress');
window.addEventListener('scroll', function() {
  var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
});

function initFadeObserver() {
  var fades = document.querySelectorAll('.fade');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.08});
  fades.forEach(function(el) { obs.observe(el); });

  setTimeout(function() {
    document.querySelectorAll('#hero .fade').forEach(function(el) { el.classList.add('in'); });
  }, 150);
}

// ── BOOTSTRAP ──────────────────────────────────────────────────────────────────
fetch('content.json')
  .then(function(r) { return r.json(); })
  .then(function(data) {
    renderPage(data);
    wireImages(document);
    initFadeObserver();
  })
  .catch(function(err) {
    console.error('Failed to load content.json', err);
    document.body.innerHTML = '<p style="padding:4rem;font-family:monospace;color:#fff;">Failed to load content.json — ' + err.message + '</p>';
  });
