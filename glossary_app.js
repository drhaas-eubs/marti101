/* ============================================================
   MARTI101 — glossary page (key terms by unit)
   Data: GLOSS_TERMS (keyed by unit), GLOSS_UNITS (meta).
   Deep links: glossary.html#unit1 … #unit6 open that unit.
   ============================================================ */
(function(){
  var ALL=[];
  GLOSS_UNITS.forEach(function(u){
    (GLOSS_TERMS[String(u.n)]||[]).forEach(function(t){
      ALL.push({num:t.num,term:t.term,strap:t.strap,def:t.def,ref:t.ref,unit:u.n});
    });
  });

  var fUnit='all', q='';
  function $(id){ return document.getElementById(id); }
  function esc(t){ return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function hl(text){
    if(!q) return esc(text);
    var i=text.toLowerCase().indexOf(q);
    if(i<0) return esc(text);
    return esc(text.slice(0,i))+'<mark>'+esc(text.slice(i,i+q.length))+'</mark>'+esc(text.slice(i+q.length));
  }
  function match(e){
    if(fUnit!=='all' && e.unit!==+fUnit) return false;
    if(q && (e.term+' '+e.strap+' '+e.def+' '+e.ref).toLowerCase().indexOf(q)<0) return false;
    return true;
  }
  function itemHTML(e,u){
    return '<article class="gl-item" style="--uc:'+u.color+'">'+
      '<div class="gl-h"><span class="gl-num">'+esc(e.num)+'</span><h3 class="gl-term">'+hl(e.term)+'</h3></div>'+
      '<p class="gl-strap">'+hl(e.strap)+'</p>'+
      '<p class="gl-def">'+hl(e.def)+'</p>'+
      '<div class="gl-ref"><span>Professional reference &middot; Harvard style</span><p>'+hl(e.ref)+'</p></div>'+
    '</article>';
  }
  function render(){
    var shown=ALL.filter(match);
    $('glCount').textContent=shown.length+' '+(shown.length===1?'term':'terms')+
      (fUnit!=='all'?' · Unit '+fUnit:'')+(q?' · matching “'+q+'”':'');
    var host=$('glResults');
    if(!shown.length){ host.innerHTML='<div class="gl-empty">No terms match your search.</div>'; return; }
    var out='';
    GLOSS_UNITS.forEach(function(u){
      var grp=shown.filter(function(e){ return e.unit===u.n; });
      if(!grp.length) return;
      out+='<section class="gl-group" id="unit'+u.n+'" style="--uc:'+u.color+'">'+
        '<div class="gl-ghead"><span class="unit-dot">'+u.n+'</span><div>'+
          '<div class="gl-kick">Unit '+u.n+' &middot; '+esc(u.format)+'</div>'+
          '<h2>'+esc(u.title)+'</h2>'+
          '<p class="gl-ilo"><b>'+esc(u.ilo_label)+'.</b> '+esc(u.ilo)+'</p>'+
        '</div></div>'+
        '<div class="gl-list">'+grp.map(function(e){ return itemHTML(e,u); }).join('')+'</div>'+
      '</section>';
    });
    host.innerHTML=out;
  }
  function setUnit(n){
    document.querySelectorAll('.gl-chip[data-unit]').forEach(function(x){ x.classList.toggle('on', x.dataset.unit===n); });
    fUnit=n; render();
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.gl-chip[data-unit]').forEach(function(c){
      c.addEventListener('click',function(){
        setUnit(c.dataset.unit);
        try{ history.replaceState(null,'',c.dataset.unit==='all'?location.pathname:'#unit'+c.dataset.unit); }catch(_){}
      });
    });
    $('glSearch').addEventListener('input',function(e){ q=e.target.value.trim().toLowerCase(); render(); });
    function fromHash(){
      var m=(location.hash||'').match(/unit([1-6])/);
      setUnit(m?m[1]:'all');
      if(m) setTimeout(function(){ var el=$('glControls'); if(el) el.scrollIntoView(); },60);
    }
    window.addEventListener('hashchange',fromHash);
    fromHash();
  });
})();
