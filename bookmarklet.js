/**
 * ⚡ ANONYTE HEADWAY SOLVER — BOOKMARKLETS
 * 
 * You have two bookmarklet choices:
 * 
 * CHOICE 1: Dynamic Subdomain Loader (Recommended)
 * ─────────────────────────────────────────────────────────────
 * Fetches the latest solver from your subdomain/CDN dynamically.
 * Updates automatically whenever you push code changes without reinstalling the bookmarklet!
 * 
 * Replace 'https://YOUR-SUBDOMAIN/anonyte-solver.min.js' with your domain.
 */

// --- CHOICE 1: DYNAMIC SUBDOMAIN / CDN LOADER ---
// javascript:(function(){var s=document.createElement('script');s.src='https://YOUR-SUBDOMAIN/anonyte-solver.min.js?t='+Date.now();document.head.appendChild(s);})();

/**
 * CHOICE 2: 100% Offline Standalone Bookmarklet
 * ─────────────────────────────────────────────────────────────
 * Works completely offline without requiring any server or subdomain.
 * Copy and paste the one-liner below into your browser bookmark URL field.
 */

// --- CHOICE 2: OFFLINE STANDALONE SOLVER (Paste into Bookmark URL) ---
javascript:(async function(){
  function clean(html) {
    if (!html) return '';
    const d = document.createElement('div');
    d.innerHTML = String(html);
    return d.innerText.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function toArray(col) {
    if (!col) return [];
    if (Array.isArray(col)) return col;
    if (col.models) return col.models.map(m => m.attributes || m);
    if (col.toJSON) return col.toJSON();
    return [];
  }
  let ctx = null;
  function findOUP(win) {
    try {
      if (win.OUP?.activity?.currentView) return { win, doc: win.document, $: win.$ || win.jQuery, view: win.OUP.activity.currentView };
    } catch(e){}
    return null;
  }
  ctx = findOUP(window);
  if (!ctx) {
    for (const f of document.querySelectorAll('iframe')) {
      ctx = findOUP(f.contentWindow);
      if (ctx) break;
    }
  }
  if (!ctx) { alert('⚠️ Anonyte: Open an Oxford activity first!'); return; }
  const { win, doc, view } = ctx;
  const model = view.model?.attributes || {};

  // Unpack Marionette regions
  const regMgr = view.regionManager || view._regionManager;
  const regNames = view.regions ? Object.keys(view.regions) : (regMgr?._regions ? Object.keys(regMgr._regions) : []);
  for (const rName of regNames) {
    const reg = view[rName] || (regMgr?.get ? regMgr.get(rName) : null);
    const subView = reg?.currentView;
    if (subView) {
      if (subView.collection && !model.questionCollection && !model.itemCollection) {
        model.questionCollection = subView.collection;
      }
      if (subView.model) Object.assign(model, subView.model.attributes || subView.model);
    }
  }

  // 1. Multiple Choice / True-False radios / Checkboxes
  const qCol = model.questionCollection || model.itemCollection;
  if (qCol) {
    const questions = toArray(qCol);
    const allRadios = Array.from(doc.querySelectorAll('input[type="radio"], input[type="checkbox"]'));

    const isTruthCheck = (allRadios.length === questions.length) &&
      allRadios.every(r => r.type === 'checkbox') &&
      questions.some(q => {
        const c = String(q.correctAnswer || q.answer || '').toLowerCase();
        return c === 'correct' || c === 'incorrect';
      });

    if (isTruthCheck) {
      questions.forEach((q, idx) => {
        const c = String(q.correctAnswer || q.answer || '').toLowerCase();
        const input = allRadios[idx];
        if (!input) return;
        const label = doc.querySelector(`label[for="${input.id}"]`) || input.closest('label') || input.parentElement;
        const targetState = (c === 'correct' || c === 'true');
        if (input.checked !== targetState) {
          if (label && label !== input) label.click();
          else input.click();
          input.checked = targetState;
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      alert('⚡ Anonyte: Checkboxes solved!');
      return;
    }

    if (allRadios.length > 0 && questions.length > 0) {
      questions.forEach((q, qIdx) => {
        let correctRaw = q.correctAnswer !== undefined ? q.correctAnswer : q.answer;
        if (correctRaw === undefined || correctRaw === null) return;
        if (typeof correctRaw === 'boolean') correctRaw = correctRaw ? 'true' : 'false';

        let qRadios = Array.from(doc.querySelectorAll(`input[name="answer${qIdx + 1}"], input[name="answer_${qIdx + 1}"]`));
        if (qRadios.length === 0 && q.id) {
          qRadios = Array.from(doc.querySelectorAll(`[data-question-id="${q.id}"] input[type="radio"], [data-question-id="${q.id}"] input[type="checkbox"]`));
        }
        if (qRadios.length === 0) {
          const ansCol = q.answerCollection || q.newAnswerCollection;
          const countPerQ = ansCol ? toArray(ansCol).length : Math.max(2, Math.floor(allRadios.length / questions.length));
          qRadios = allRadios.slice(qIdx * countPerQ, (qIdx + 1) * countPerQ);
        }

        const correctStr = String(correctRaw).trim();
        const correctNorm = clean(correctStr).toLowerCase();
        const isTrue = correctNorm === 'true' || correctNorm === 't' || correctNorm === 'yes' || correctNorm === 'correct';
        const isFalse = correctNorm === 'false' || correctNorm === 'f' || correctNorm === 'no' || correctNorm === 'incorrect';

        let matched = null;
        for (const r of qRadios) {
          const valNorm = clean(r.value).toLowerCase();
          const pNorm = clean(r.parentElement?.innerText || '').toLowerCase();
          const labelEl = r.id ? doc.querySelector(`label[for="${r.id}"]`) : null;
          const lNorm = labelEl ? clean(labelEl.innerText).toLowerCase() : '';

          if (valNorm === correctNorm || pNorm === correctNorm || lNorm === correctNorm) {
            matched = r; break;
          }
          if (isTrue && (valNorm === 'true' || pNorm === 'true' || lNorm === 'true')) {
            matched = r; break;
          }
          if (isFalse && (valNorm === 'false' || pNorm === 'false' || lNorm === 'false')) {
            matched = r; break;
          }
        }
        if (!matched) {
          const ansCol = q.answerCollection || q.newAnswerCollection;
          const answers = ansCol ? toArray(ansCol) : [];
          let targetOpt = answers.find(a => clean(a.text).toLowerCase() === correctNorm || clean(a.answer).toLowerCase() === correctNorm);
          if (!targetOpt && q.correctAnswerNo !== undefined) {
            targetOpt = answers.find(a => a.index === q.correctAnswerNo || (a.optionId !== undefined && a.optionId + 1 === q.correctAnswerNo));
          }
          if (targetOpt?.modelIndex) {
            matched = doc.getElementById('blackButton' + targetOpt.modelIndex);
          }
        }

        if (!matched && qRadios.length === 2) {
          if (isTrue) matched = qRadios[0];
          else if (isFalse) matched = qRadios[1];
        }

        if (matched) {
          const label = doc.querySelector(`label[for="${matched.id}"]`) || matched.closest('label') || matched.parentElement;
          if (label && label !== matched) label.click();
          else matched.click();
          matched.checked = true;
          matched.dispatchEvent(new Event('input', { bubbles: true }));
          matched.dispatchEvent(new Event('change', { bubbles: true }));
          if (ctx.$) try { ctx.$(matched).trigger('click').trigger('change'); } catch(e){}
        }
      });
      alert('⚡ Anonyte: Multiple choice solved!');
      return;
    }
  }

  // 2. Dropdowns
  const allSelects = Array.from(doc.querySelectorAll('select'));
  if (allSelects.length > 0 && (model.sentenceCollection || model.itemCollection)) {
    const answers = [];
    if (model.sentenceCollection) {
      const sentences = toArray(model.sentenceCollection);
      for (const s of sentences) {
        const items = toArray(s.itemCollection || s.items);
        for (const it of items) {
          const opts = toArray(it.optionCollection || it.options);
          const correctOpt = opts.find(o => (o.attributes || o).id === 0 || (o.attributes || o).correct === true);
          const attr = correctOpt?.attributes || correctOpt;
          answers.push(clean(attr?.option || attr?.text || attr?.answer || ''));
        }
      }
    } else if (model.itemCollection) {
      const items = toArray(model.itemCollection);
      for (const it of items) {
        const itemAttr = it.attributes || it;
        const opts = toArray(itemAttr.optionCollection || itemAttr.options);
        const correctOpt = opts.find(o => (o.attributes || o).id === 0 || (o.attributes || o).correct === true);
        const attr = correctOpt?.attributes || correctOpt;
        answers.push(clean(attr?.option || attr?.text || attr?.answer || itemAttr.answer || ''));
      }
    }
    allSelects.forEach((sel, idx) => {
      const target = answers[idx];
      if (!target) return;
      const tNorm = target.toLowerCase().trim();
      for (let i = 0; i < sel.options.length; i++) {
        const opt = sel.options[i];
        const oText = clean(opt.text).toLowerCase().trim();
        const oVal = clean(opt.value).toLowerCase().trim();
        if (oText === tNorm || oVal === tNorm || (oText && (oText.includes(tNorm) || tNorm.includes(oText)))) {
          sel.selectedIndex = i;
          sel.value = opt.value;
          sel.dispatchEvent(new Event('input', { bubbles: true }));
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          break;
        }
      }
    });
    alert('⚡ Anonyte: Dropdowns solved!');
    return;
  }

  // 3. Audio & Speaking Tasks (Virtual Mic)
  const r0 = doc.getElementById('record_0') || doc.querySelector('[id^="record_"]');
  if (r0) {
    try {
      const AudioCtx = win.AudioContext || win.webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const dest = audioCtx.createMediaStreamDestination();
        osc.connect(dest);
        osc.start();
        if (win.navigator?.mediaDevices) {
          win.navigator.mediaDevices.getUserMedia = async () => dest.stream;
        }
        r0.click();
        await new Promise(r => setTimeout(r, 3500));
        r0.click();
        const p0 = doc.getElementById('play_0');
        if (p0) {
          const saveBtn = window.document.querySelector('button.footer-btn') || Array.from(window.document.querySelectorAll('button')).find(b => b.innerText.includes('Save'));
          if (saveBtn) saveBtn.click();
        }
        alert('⚡ Anonyte: Speaking audio submitted successfully!');
        return;
      }
    } catch(e) { console.error(e); }
  }

  // 4. Sorting & Categorization
  if (model.binsCollection && (model.itemsCollection || model.itemCollection)) {
    const binsCol = model.binsCollection;
    const itemToBinMap = {};
    const bins = toArray(binsCol);
    for (const b of bins) {
      const bItems = toArray(b.itemCollection || b.items);
      for (const bItem of bItems) {
        if (bItem.id !== undefined) itemToBinMap[String(bItem.id)] = String(b.id);
        const t = clean(bItem.item || bItem.text || bItem.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (t) itemToBinMap[t] = String(b.id);
      }
    }
    const draggables = Array.from(doc.querySelectorAll('#item-view-region [data-item-id], #item-view-region li, .connectedSortable li'));
    for (const el of draggables) {
      const itemId = el.getAttribute('data-item-id') || el.id;
      const t = clean(el.innerText).toLowerCase().replace(/[^a-z0-9]/g, '');
      const targetBinId = itemToBinMap[String(itemId)] || itemToBinMap[t] || (itemId ? String(itemId).split('-')[0] : null);
      if (!targetBinId && targetBinId !== 0) continue;
      const targetBinEl = doc.querySelector(`.binItemsUl[data-item-id="${targetBinId}"], [class*="bin"][data-item-id="${targetBinId}"]`);
      if (targetBinEl && el.parentElement !== targetBinEl) {
        if (ctx.$) {
          const $target = ctx.$(targetBinEl);
          const $el = ctx.$(el);
          const dh = $target.data('ui-droppable') || $target.data('droppable');
          if (dh?.options?.drop) dh.options.drop.call($target[0], new ctx.$.Event('drop'), { draggable: $el });
          else $target.append($el);
        } else {
          targetBinEl.appendChild(el);
        }
        await new Promise(r => setTimeout(r, 100));
      }
    }
    alert('⚡ Anonyte: Categories sorted!');
    return;
  }

  alert('⚡ Anonyte: Solved activity!');
})();
