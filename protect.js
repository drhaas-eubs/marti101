/* ============================================================
   MARTI101 — content protection
   Blocks copy / cut / drag / context menu / select-all / save /
   print / view-source shortcuts. Printing shows a notice instead
   of the content.
   Note: client-side deterrence only; not a security guarantee.
   ============================================================ */
(function(){
  try{ document.documentElement.classList.add('protected'); }catch(e){}

  function stop(e){ e.preventDefault(); e.stopPropagation(); return false; }
  function isField(t){ return t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable); }

  // right-click / long-press menu
  document.addEventListener('contextmenu', stop, {capture:true});

  // copy and cut: empty the clipboard payload, except inside the search box
  ['copy','cut'].forEach(function(ev){
    document.addEventListener(ev, function(e){
      if(isField(e.target)) return;
      try{ (e.clipboardData||window.clipboardData).setData('text',''); }catch(_){}
      return stop(e);
    }, {capture:true});
  });

  // dragging text or images out of the page
  document.addEventListener('dragstart', stop, {capture:true});

  // selection outside form fields
  document.addEventListener('selectstart', function(e){ if(!isField(e.target)) return stop(e); }, {capture:true});

  // keyboard: Ctrl/Cmd + C, X, A, S, P, U ; devtools ; PrintScreen
  document.addEventListener('keydown', function(e){
    var k=(e.key||'').toLowerCase();
    var mod=e.ctrlKey||e.metaKey;
    if(mod && ['c','x','a','s','p','u'].indexOf(k)>=0){
      if(isField(e.target) && (k==='c'||k==='x'||k==='a')) return;
      return stop(e);
    }
    if(mod && e.shiftKey && ['i','j','c','s'].indexOf(k)>=0) return stop(e);
    if(k==='f12') return stop(e);
    if(k==='printscreen'){ try{ if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(''); }catch(_){} }
  }, {capture:true});

  // window.print() calls from anywhere
  try{ window.print=function(){}; }catch(_){}

  // print guard: cover the page the moment printing starts
  function guard(){ return document.getElementById('printGuard'); }
  function showGuard(){ var g=guard(); if(g) g.classList.add('on'); }
  function hideGuard(){ var g=guard(); if(g) g.classList.remove('on'); }
  window.addEventListener('beforeprint', showGuard);
  window.addEventListener('afterprint', hideGuard);
  if(window.matchMedia){
    var mq=window.matchMedia('print');
    var add=mq.addEventListener?function(f){mq.addEventListener('change',f);}:function(f){mq.addListener(f);};
    add(function(m){ if(m.matches) showGuard(); else hideGuard(); });
  }
})();
