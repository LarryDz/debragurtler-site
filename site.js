// Photo viewer: opens any gallery photo larger, with previous/next.
(function(){
  var dlg = document.querySelector('.lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return; // older browsers just open the photo
  var img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption');
  var tiles = [], idx = 0, opener = null;
  function show(i){
    idx = (i + tiles.length) % tiles.length;
    var t = tiles[idx];
    img.src = t.getAttribute('href');
    img.alt = t.querySelector('img').alt;
    cap.textContent = t.dataset.caption || '';
    var single = tiles.length < 2;
    dlg.querySelector('.lb-prev').hidden = single;
    dlg.querySelector('.lb-next').hidden = single;
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest('a.tile');
    if (!t) return;
    e.preventDefault();
    var group = t.closest('.grid, .about-photos') || document;
    tiles = Array.prototype.slice.call(group.querySelectorAll('a.tile'));
    opener = t;
    show(tiles.indexOf(t));
    dlg.showModal();
  });
  dlg.querySelector('.lb-close').addEventListener('click', function(){ dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function(){ show(idx - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function(){ show(idx + 1); });
  dlg.addEventListener('click', function(e){ if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function(e){
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  dlg.addEventListener('close', function(){ img.removeAttribute('src'); if (opener) opener.focus(); });
})();
