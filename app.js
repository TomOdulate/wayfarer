/* ================================================================
   COMPLIANCE RULES
================================================================ */
const RULES = {
  pets: {
    label: 'Traveling with Pets', icon: '🐾',
    reqs: [
      { id:'microchip', title:'Microchip Verification',
        desc:'Confirm ISO 11784/11785-compliant microchip is implanted and registered with a national database.',
        days:90, priority:'critical', cat:'Health' },
      { id:'rabies', title:'Rabies Vaccination',
        desc:'Valid rabies vaccination is required — must be administered after microchipping, with a wait period before travel.',
        days:60, priority:'critical', cat:'Health' },
      { id:'pet_doc', title:'Pet Travel Document / EU Passport',
        desc:'Obtain an EU Pet Passport or equivalent official third-country travel document from an accredited vet.',
        days:45, priority:'high', cat:'Documents' },
      { id:'ahc', title:'Animal Health Certificate (AHC)',
        desc:'Issued by an official vet — valid only within 10 days before travel. Book the appointment in advance.',
        days:10, priority:'critical', cat:'Documents' },
      { id:'tapeworm', title:'Tapeworm Treatment',
        desc:'Echinococcus (tapeworm) treatment administered by a vet 24–120 hours before entering the UK or qualifying country.',
        days:2, priority:'high', cat:'Health' },
    ],
  },
  vehicle: {
    label: 'Driving a Vehicle', icon: '🚗',
    reqs: [
      { id:'idp', title:'International Driving Permit (IDP)',
        desc:'Required in many countries. Apply via a post office or motoring organisation (RAC, AA, etc.).',
        days:30, priority:'high', cat:'Documents' },
      { id:'green_card', title:'Green Card Insurance Certificate',
        desc:'Contact your insurer to issue a Green Card — official proof your vehicle is covered internationally.',
        days:21, priority:'critical', cat:'Insurance' },
      { id:'breakdown', title:'European Breakdown Cover',
        desc:'Ensure breakdown cover extends to all countries on your route. Confirm coverage with your provider.',
        days:21, priority:'high', cat:'Insurance' },
      { id:'v5c', title:'V5C / Vehicle Registration Document',
        desc:'Carry original V5C logbook. For hired or leased vehicles, obtain a VE103 letter of authority.',
        days:7, priority:'critical', cat:'Documents' },
      { id:'sticker', title:'Country Identifier Sticker',
        desc:"Display a GB sticker (or your country's equivalent) on the rear of your vehicle when driving abroad.",
        days:3, priority:'medium', cat:'Vehicle' },
    ],
  },
  minors: {
    label: 'Traveling with Minors', icon: '👶',
    reqs: [
      { id:'child_passport', title:"Child's Passport Validity",
        desc:"Verify the child's passport has at least 6 months' validity beyond the return date.",
        days:60, priority:'critical', cat:'Documents' },
      { id:'consent', title:'Parental Consent Letter',
        desc:'Notarized letter of consent required if the child is traveling without one or both parents.',
        days:14, priority:'high', cat:'Documents' },
      { id:'birth_cert', title:'Birth Certificate (Certified Copy)',
        desc:'Carry a certified copy to establish parental relationship at borders if requested.',
        days:7, priority:'medium', cat:'Documents' },
    ],
  },
  visa: {
    label: 'Visa Required', icon: '🛂',
    reqs: [
      { id:'travel_ins', title:'Travel Insurance Certificate',
        desc:'Comprehensive travel insurance is often mandatory for visa applications. Obtain before applying.',
        days:70, priority:'high', cat:'Insurance' },
      { id:'visa_app', title:'Visa Application',
        desc:'Submit your visa application — typical processing is 2–8 weeks. Apply as early as possible.',
        days:56, priority:'critical', cat:'Documents' },
      { id:'invite', title:'Accommodation / Invitation Letter',
        desc:'Some visa categories require proof of accommodation booking or a sponsor invitation letter.',
        days:42, priority:'medium', cat:'Documents' },
    ],
  },
};

/* Country-specific driving rules — injected when trip.settings.vehicle is true
   AND the country appears in the itinerary stops (case-insensitive match). */
const COUNTRY_RULES = {
  france: {
    label: 'France — Driving Rules', icon: '🇫🇷',
    reqs: [
      { id:'critair', title:"Crit'Air Clean Air Vignette",
        desc:'Mandatory environmental sticker for driving in low-emission zones (Paris, Lyon, Grenoble, etc.). Order online from the official French government site.',
        days:14, priority:'medium', cat:'Documents' },
      { id:'breathalyzer', title:'NF-certified Breathalyzer / Safety Equipment',
        desc:'Carry an NF-approved single-use breathalyzer, plus reflective vest and warning triangle. Required by French law.',
        days:3, priority:'medium', cat:'Vehicle' },
    ],
  },
  spain: {
    label: 'Spain — Driving Rules', icon: '🇪🇸',
    reqs: [
      { id:'triangles', title:'Dual Warning Triangles',
        desc:'Spain requires TWO warning triangles to be carried in the vehicle (one for front, one for rear of breakdown).',
        days:3, priority:'medium', cat:'Vehicle' },
      { id:'spare_specs', title:'Spare Glasses / Prescription Specs',
        desc:'If your driving licence requires corrective lenses, you must carry a spare pair of glasses in the vehicle at all times.',
        days:1, priority:'low', cat:'Vehicle' },
    ],
  },
  portugal: {
    label: 'Portugal — Driving Rules', icon: '🇵🇹',
    reqs: [
      { id:'via_verde', title:'Via Verde Toll Tag / Toll Registration',
        desc:'Many Portuguese motorways are electronic-toll only. Register your vehicle with Via Verde or rent a transponder to avoid fines.',
        days:7, priority:'high', cat:'Vehicle' },
      { id:'no_dashcam', title:'Dashcam / Radar Detector Prohibition',
        desc:'Portugal strictly prohibits dashcams and radar detectors. Remove or disable them before crossing the border — heavy fines apply.',
        days:1, priority:'high', cat:'Vehicle' },
    ],
  },
};

const FLAGS = {
  'uk':'🇬🇧','united kingdom':'🇬🇧','great britain':'🇬🇧','britain':'🇬🇧',
  'england':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','wales':'🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'france':'🇫🇷','spain':'🇪🇸','germany':'🇩🇪','italy':'🇮🇹',
  'portugal':'🇵🇹','netherlands':'🇳🇱','holland':'🇳🇱','belgium':'🇧🇪',
  'switzerland':'🇨🇭','austria':'🇦🇹','greece':'🇬🇷','croatia':'🇭🇷',
  'czech republic':'🇨🇿','czechia':'🇨🇿','hungary':'🇭🇺','poland':'🇵🇱',
  'romania':'🇷🇴','bulgaria':'🇧🇬','sweden':'🇸🇪','norway':'🇳🇴',
  'denmark':'🇩🇰','finland':'🇫🇮','ireland':'🇮🇪','iceland':'🇮🇸',
  'usa':'🇺🇸','united states':'🇺🇸','america':'🇺🇸','canada':'🇨🇦','mexico':'🇲🇽',
  'japan':'🇯🇵','china':'🇨🇳','south korea':'🇰🇷','korea':'🇰🇷',
  'thailand':'🇹🇭','vietnam':'🇻🇳','indonesia':'🇮🇩','singapore':'🇸🇬',
  'india':'🇮🇳','turkey':'🇹🇷','egypt':'🇪🇬','morocco':'🇲🇦',
  'australia':'🇦🇺','new zealand':'🇳🇿','brazil':'🇧🇷','argentina':'🇦🇷',
  'chile':'🇨🇱','peru':'🇵🇪','south africa':'🇿🇦','kenya':'🇰🇪',
  'tanzania':'🇹🇿','dubai':'🇦🇪','uae':'🇦🇪','united arab emirates':'🇦🇪',
  'israel':'🇮🇱','jordan':'🇯🇴','russia':'🇷🇺','ukraine':'🇺🇦',
};

/* ================================================================
   STATE
================================================================ */
const TRIP_DEFAULTS = {
  name: '',
  stops: [],
  settings: { pets:false, vehicle:false, minors:false, visa:false },
  done: {},
  tripStart: '',     // explicit trip start date (overrides first stop's departure)
  itemNotes: {},     // user notes per compliance item id
  customItems: [],   // user-defined compliance items: {id,title,desc,days,priority,cat}
};

const GLOBAL_DEFAULTS = {
  trips: [],
  activeTrip: null,
};

function loadState() {
  try {
    const raw = localStorage.getItem('wayfarer_global');
    const global = raw ? JSON.parse(raw) : GLOBAL_DEFAULTS;
    if (!global.trips) global.trips = [];
    if (!global.activeTrip && global.trips.length > 0) global.activeTrip = global.trips[0].id;
    // Migrate trips to current schema
    global.trips.forEach(t => {
      if (t.tripStart === undefined) t.tripStart = '';
      if (!t.itemNotes) t.itemNotes = {};
      if (!t.customItems) t.customItems = [];
    });
    return global;
  } catch { return JSON.parse(JSON.stringify(GLOBAL_DEFAULTS)); }
}

let G = loadState();
let saveTimer = null;
let editId = null;
let activeFilter = 'all';
let openMenuTrip = null;

function getCurrentTrip() {
  return G.trips.find(t => t.id === G.activeTrip);
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
function flag(c) { return FLAGS[(c||'').toLowerCase().trim()] || '🌍'; }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function fmtDate(d) {
  if (!d) return '—';
  const [y,m,day] = d.split('-');
  return `${+day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1]} ${y}`;
}

function daysBetween(a, b) {
  if (!a||!b) return null;
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function addDays(d, n) {
  const dt = new Date(d); dt.setDate(dt.getDate()+n);
  return dt.toISOString().split('T')[0];
}

function today() { return new Date().toISOString().split('T')[0]; }

function relDate(d) {
  const diff = daysBetween(today(), d);
  if (diff === null) return '';
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff > 0) return `In ${diff} days`;
  return `${Math.abs(diff)} days ago`;
}

function isUrgent(d) { const n = daysBetween(today(),d); return n!==null && n>=0 && n<=7; }
function isSoon(d)   { const n = daysBetween(today(),d); return n!==null && n>7 && n<=30; }
function isPast(d)   { const n = daysBetween(today(),d); return n!==null && n<0; }

// Returns the effective trip start (departure) date for compliance calculations.
function tripStartDate(trip) {
  return (trip && (trip.tripStart || trip.stops?.[0]?.departure)) || '';
}

/* ================================================================
   DIALOG — in-app prompt/confirm
================================================================ */
function appDialog({title, body, value, placeholder, confirmText='OK', cancelText='Cancel', danger=false, inputType='text'}) {
  return new Promise(resolve => {
    const bg = document.getElementById('app-dialog-bg');
    document.getElementById('app-dialog-title').textContent = title || '';
    const bodyEl = document.getElementById('app-dialog-body');
    bodyEl.innerHTML = '';
    if (body) { const p = document.createElement('div'); p.className = 'app-dlg-msg'; p.textContent = body; bodyEl.appendChild(p); }
    let input = null;
    if (value !== undefined) {
      input = document.createElement('input');
      input.type = inputType;
      input.className = 'app-dlg-input';
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      bodyEl.appendChild(input);
    }
    const ok = document.getElementById('app-dialog-ok');
    const cancel = document.getElementById('app-dialog-cancel');
    ok.textContent = confirmText;
    cancel.textContent = cancelText;
    ok.classList.toggle('btn-danger', !!danger);
    ok.classList.toggle('btn-primary', !danger);

    const cleanup = (result) => {
      bg.classList.remove('open');
      ok.removeEventListener('click', onOk);
      cancel.removeEventListener('click', onCancel);
      bg.removeEventListener('click', onBg);
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };
    const onOk = () => cleanup(input ? input.value : true);
    const onCancel = () => cleanup(null);
    const onBg = (e) => { if (e.target === bg) onCancel(); };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
      if (e.key === 'Enter' && (!input || e.target === input)) { e.preventDefault(); onOk(); }
    };
    ok.addEventListener('click', onOk);
    cancel.addEventListener('click', onCancel);
    bg.addEventListener('click', onBg);
    document.addEventListener('keydown', onKey);

    bg.classList.add('open');
    setTimeout(() => (input || ok).focus(), 140);
  });
}
function appConfirm(title, body, opts={}) { return appDialog({title, body, ...opts, value:undefined}); }
function appPrompt(title, value='', opts={}) { return appDialog({title, value, ...opts}); }
function appAlert(title, body) { return appDialog({title, body, cancelText:'', confirmText:'OK'}).then(()=>{}); }

/* ================================================================
   PERSISTENCE
================================================================ */
function scheduleSave() {
  setStatusUI('saving');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem('wayfarer_global', JSON.stringify(G));
    setStatusUI('saved');
  }, 500);
}

function setStatusUI(s) {
  const el = document.getElementById('save-status');
  const tx = document.getElementById('save-txt');
  el.className = 'save-status ' + s;
  tx.textContent = s === 'saved' ? 'Saved' : 'Saving…';
}

/* ================================================================
   COMPLIANCE GENERATION
================================================================ */
function genItems() {
  const trip = getCurrentTrip();
  if (!trip) return [];
  const active = Object.keys(trip.settings).filter(k => trip.settings[k]);
  const dep = tripStartDate(trip);
  if (!dep) return [];
  // If no built-in settings active and no custom items, nothing to show
  if (!active.length && !(trip.customItems && trip.customItems.length)) return [];

  const items = [];
  active.forEach(key => {
    const rule = RULES[key];
    rule.reqs.forEach(req => {
      const id = `${key}_${req.id}`;
      items.push({
        ...req,
        id,
        deadline: addDays(dep, -req.days),
        settingKey: key,
        settingLabel: rule.label,
        stopName: trip.stops[0].city || trip.stops[0].country || 'Stop 1',
        completed: !!trip.done[id],
      });
    });
  });

  // Country-specific driving rules — only when vehicle setting is on
  if (trip.settings.vehicle) {
    const seen = new Set();
    trip.stops.forEach(s => {
      const c = (s.country || '').toLowerCase().trim();
      if (!c || seen.has(c)) return;
      seen.add(c);
      const crule = COUNTRY_RULES[c];
      if (!crule) return;
      crule.reqs.forEach(req => {
        const id = `country_${c}_${req.id}`;
        items.push({
          ...req,
          id,
          deadline: addDays(dep, -req.days),
          settingKey: 'vehicle',
          settingLabel: crule.label,
          stopName: s.city || s.country,
          completed: !!trip.done[id],
        });
      });
    });
  }

  // User-defined custom items
  (trip.customItems || []).forEach(req => {
    const id = `custom_${req.id}`;
    items.push({
      ...req,
      id,
      deadline: addDays(dep, -(req.days || 0)),
      settingKey: '__custom',
      settingLabel: 'Custom',
      stopName: trip.stops[0]?.city || trip.stops[0]?.country || 'Trip',
      completed: !!trip.done[id],
      isCustom: true,
    });
  });

  return items.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
}

/* ================================================================
   RENDER — Home/Dashboard
================================================================ */
function renderHome() {
  const container = document.getElementById('trips-container');
  if (!G.trips.length) { container.innerHTML = ''; return; }

  container.innerHTML = `<div class="trips-grid">${G.trips.map(trip => {
    const first = trip.stops[0];
    const last = trip.stops[trip.stops.length - 1];
    const stops = trip.stops.length;
    const nights = trip.stops.reduce((acc,s) => acc + (daysBetween(s.arrival,s.departure)||0), 0);

    return `
    <div class="trip-card" onclick="openTrip('${trip.id}')">
      <div class="tc-head">
        <div class="tc-title"><span class="tc-title-txt">${esc(trip.name || 'Untitled Trip')}</span></div>
        <button class="tc-menu" onclick="openTripMenu(event, '${trip.id}')" title="Options">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
        <div class="dropdown" id="dropdown-${trip.id}" style="display:none">
          <button class="dropdown-item" onclick="event.stopPropagation(); openTrip('${trip.id}')">Open</button>
          <button class="dropdown-item" onclick="event.stopPropagation(); renameTrip('${trip.id}')">Rename</button>
          <button class="dropdown-item" onclick="event.stopPropagation(); duplicateTrip('${trip.id}')">Duplicate</button>
          <button class="dropdown-item" onclick="event.stopPropagation(); exportTrip('${trip.id}')">Export JSON</button>
          <button class="dropdown-item danger" onclick="event.stopPropagation(); deleteTrip('${trip.id}')">Delete</button>
        </div>
      </div>
      <div class="tc-body">
        <div class="tc-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>${stops} stop${stops!==1?'s':''}</span>
        </div>
        ${first ? `<div class="tc-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>${fmtDate(first.arrival)} → ${last&&last.departure ? fmtDate(last.departure) : '?'}</span>
        </div>` : ''}
        ${nights ? `<div class="tc-stat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>${nights} night${nights!==1?'s':''}</span>
        </div>` : ''}
        <div class="tc-dates">
          ${trip.stops.map((s,i) => `<span>${flag(s.country)} ${esc(s.city||s.country||'Stop '+(i+1))}</span>`).join(' · ') || 'No stops yet'}
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

/* ================================================================
   RENDER — Sidebar
================================================================ */
function renderSidebar() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const list = document.getElementById('sb-list');
  if (!trip.stops.length) { list.innerHTML = '<div class="sb-empty">No stops added yet</div>'; return; }
  list.innerHTML = trip.stops.map((s,i) => `
    ${i>0 ? '<div class="sb-connector"></div>' : ''}
    <div class="sb-stop" onclick="openEdit('${s.id}')">
      <div class="sb-num">${i+1}</div>
      <div class="sb-info">
        <div class="sb-dest">${flag(s.country)} ${esc(s.city||s.country||'Stop '+(i+1))}</div>
        <div class="sb-date">${s.arrival ? fmtDate(s.arrival) : 'No date'}</div>
      </div>
    </div>`).join('');
}

/* ================================================================
   RENDER — Itinerary
================================================================ */
function renderItinerary() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const route   = document.getElementById('route');
  const empty   = document.getElementById('itin-empty');
  const statsEl = document.getElementById('stats-row');
  const sub     = document.getElementById('itin-sub');

  if (!trip.stops.length) {
    route.innerHTML = ''; empty.style.display='block'; statsEl.style.display='none'; return;
  }
  empty.style.display = 'none'; statsEl.style.display = 'grid';

  const nights = trip.stops.reduce((acc,s) => acc + (daysBetween(s.arrival,s.departure)||0), 0);
  const countries = [...new Set(trip.stops.map(s=>s.country?.toLowerCase()).filter(Boolean))].length || trip.stops.length;

  document.getElementById('s-stops').textContent    = trip.stops.length;
  document.getElementById('s-days').textContent     = nights || '—';
  document.getElementById('s-countries').textContent = countries;

  const f = trip.stops[0], l = trip.stops[trip.stops.length-1];
  if (f.arrival && l.departure) sub.textContent = `${fmtDate(f.arrival)} → ${fmtDate(l.departure)} · ${trip.stops.length} stop${trip.stops.length!==1?'s':''}`;

  route.innerHTML = trip.stops.map((stop,i) => {
    const isFirst = i===0, isLast = i===trip.stops.length-1;
    const mk = isFirst ? 'is-first' : isLast ? 'is-last' : '';
    const stayNights = daysBetween(stop.arrival, stop.departure);
    const next = trip.stops[i+1];
    const transitDays = next ? daysBetween(stop.departure, next.arrival) : null;

    return `
    <div class="route-stop" style="animation-delay:${i*.06}s" draggable="true"
         ondragstart="onStopDragStart(event,'${stop.id}')"
         ondragover="onStopDragOver(event)"
         ondragleave="onStopDragLeave(event)"
         ondrop="onStopDrop(event,'${stop.id}')"
         ondragend="onStopDragEnd(event)">
      <div class="route-left">
        <div class="route-marker ${mk}" title="Drag to reorder">${i+1}</div>
        ${!isLast ? '<div class="route-line"></div>' : ''}
      </div>
      <div class="route-right">
        <div class="route-card">
          <div class="rc-head">
            <div class="rc-dest">
              <span class="dest-flag">${flag(stop.country)}</span>
              <div>
                <div class="dest-name">${esc(stop.city||'Unnamed stop')}</div>
                ${stop.country ? `<div class="dest-country">${esc(stop.country)}</div>` : ''}
              </div>
            </div>
            <div class="rc-actions">
              <button class="act-btn" onclick="openEdit('${stop.id}')" title="Edit stop">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="act-btn del" onclick="deleteStop('${stop.id}')" title="Remove stop">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="date-row">
            ${stop.arrival ? `<div class="date-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="dlbl">Arrive</span>${fmtDate(stop.arrival)}</div>` : ''}
            ${stop.departure ? `<div class="date-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span class="dlbl">Depart</span>${fmtDate(stop.departure)}</div>` : ''}
            ${stayNights !== null && stayNights > 0 ? `<div class="date-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              ${stayNights} night${stayNights!==1?'s':''}</div>` : ''}
          </div>
          ${stop.notes ? `<div class="stop-notes">${esc(stop.notes)}</div>` : ''}
        </div>
        ${!isLast ? `<div class="transit-row">
          <div class="transit-line"></div>
          <div class="transit-pill">${transitDays!==null&&transitDays>0 ? transitDays+' day'+( transitDays!==1?'s':'')+' transit' : 'Next stop →'}</div>
          <div class="transit-line"></div>
        </div>` : ''}
      </div>
    </div>`;
  }).join('');
}

/* ================================================================
   RENDER — Compliance
================================================================ */
function renderCompliance() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const el = document.getElementById('comp-content');
  const active = Object.keys(trip.settings).filter(k => trip.settings[k]);

  const hasCustom = (trip.customItems||[]).length > 0;
  if (!active.length && !hasCustom) {
    el.innerHTML = complianceToolbar(trip) + `<div class="hint-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>No settings active. Go to <strong>Trip Settings</strong> and toggle options, or add a <strong>Custom Item</strong> above to start your checklist.</div>
    </div>`; wireToolbar(); return;
  }
  if (!tripStartDate(trip)) {
    el.innerHTML = complianceToolbar(trip) + `<div class="hint-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <div>Set a <strong>Trip Start Date</strong> in Trip Settings, or add a first stop with a departure date — all compliance deadlines are calculated from that date.</div>
    </div>`; wireToolbar(); return;
  }

  const allItems = genItems();
  const pending  = allItems.filter(i => !i.completed).length;
  const total    = allItems.length;
  const pct      = total ? Math.round(((total-pending)/total)*100) : 0;
  const cats     = [...new Set(allItems.map(i=>i.cat))];

  const filtered = activeFilter==='all'    ? allItems :
                   activeFilter==='pending' ? allItems.filter(i=>!i.completed) :
                   activeFilter==='done'    ? allItems.filter(i=>i.completed) :
                   allItems.filter(i=>i.cat.toLowerCase()===activeFilter);

  const groups = {};
  filtered.forEach(item => { (groups[item.deadline]||(groups[item.deadline]=[])).push(item); });

  let html = complianceToolbar(trip) + `
    <div class="progress-bar-wrap">
      <span>${pending} pending · ${total-pending} complete</span>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span>${pct}%</span>
    </div>
    <div class="c-filters">
      <button class="c-filter${activeFilter==='all'?' active':''}" data-f="all">All (${total})</button>
      <button class="c-filter${activeFilter==='pending'?' active':''}" data-f="pending">Pending (${pending})</button>
      <button class="c-filter${activeFilter==='done'?' active':''}" data-f="done">Done (${total-pending})</button>
      ${cats.map(c=>`<button class="c-filter${activeFilter===c.toLowerCase()?' active':''}" data-f="${c.toLowerCase()}">${c}</button>`).join('')}
    </div>`;

  if (!Object.keys(groups).length) {
    html += `<div class="c-done-state">
      <div style="font-size:34px;margin-bottom:12px">✓</div>
      <div style="font-size:15px;font-weight:600;margin-bottom:6px">Nothing to show</div>
      <div style="font-size:13px;color:var(--t2)">No items match the current filter.</div>
    </div>`;
  } else {
    Object.entries(groups).sort(([a],[b])=>new Date(a)-new Date(b)).forEach(([date,items])=>{
      const urgent = isUrgent(date), soon=isSoon(date), past=isPast(date);
      const cls = urgent?'urgent':soon?'soon':past?'past':'';
      html += `<div class="tl-section">
        <div class="tl-date-head">
          <div class="tl-badge ${cls}">${fmtDate(date)} <span style="opacity:.55;margin-left:5px">${relDate(date)}</span></div>
          <div class="tl-divider"></div>
        </div>`;
      items.forEach(item => {
        const icon = item.isCustom ? '⭐' : (RULES[item.settingKey]?.icon || COUNTRY_RULES[(item.settingKey||'').replace('country_','')]?.icon || '📌');
        const note = (trip.itemNotes && trip.itemNotes[item.id]) || '';
        html += `<div class="tl-item${item.completed?' done':''}" data-iid="${item.id}">
          <div class="ti-check" onclick="toggleItem('${item.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div class="ti-body">
            <div class="ti-head">
              <span class="ti-title">${esc(item.title)}</span>
              <span class="pri-tag ${item.priority}">${item.priority}</span>
              <span class="cat-tag">${esc(item.cat)}</span>
              <div class="ti-row-actions">
                <button class="ti-act" onclick="editItemNote('${item.id}')" title="${note?'Edit note':'Add note'}">📝${note?'<span class=\"ti-note-dot\"></span>':''}</button>
                ${item.isCustom ? `<button class="ti-act" onclick="editCustomItem('${item.rawId||item.id.replace(/^custom_/,'')}')" title="Edit item">✎</button><button class="ti-act danger" onclick="deleteCustomItem('${item.rawId||item.id.replace(/^custom_/,'')}')" title="Delete item">🗑</button>` : ''}
              </div>
            </div>
            <div class="ti-desc">${esc(item.desc||'')}</div>
            ${note ? `<div class="ti-note">${esc(note)}</div>` : ''}
            <div class="ti-meta">
              <span>${icon} ${esc(item.settingLabel)}</span>
              <span>📍 ${trip.tripStart ? 'Trip start' : 'Departure from '+esc(item.stopName)}</span>
            </div>
          </div>
        </div>`;
      });
      html += `</div>`;
    });
  }

  el.innerHTML = html;
  el.querySelectorAll('.c-filter').forEach(b => {
    b.addEventListener('click', () => { activeFilter = b.dataset.f; renderCompliance(); });
  });
  wireToolbar();
}

function complianceToolbar(trip) {
  return `<div class="c-toolbar no-print">
    <button class="btn btn-ghost btn-sm" id="c-add-custom">＋ Add Custom Item</button>
    <button class="btn btn-ghost btn-sm" id="c-print">🖨 Print</button>
    <button class="btn btn-ghost btn-sm" id="c-ics">📅 Export Calendar (.ics)</button>
  </div>`;
}
function wireToolbar() {
  document.getElementById('c-add-custom')?.addEventListener('click', () => editCustomItem(null));
  document.getElementById('c-print')?.addEventListener('click', () => window.print());
  document.getElementById('c-ics')?.addEventListener('click', exportICS);
}

/* ================================================================
   RENDER — Settings
================================================================ */
function renderSettings() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const ts = document.getElementById('trip-start-date');
  if (ts) ts.value = trip.tripStart || '';
  Object.keys(trip.settings).forEach(k => {
    document.getElementById(`sc-${k}`)?.classList.toggle('on', trip.settings[k]);
    document.getElementById(`tog-${k}`)?.classList.toggle('on', trip.settings[k]);
  });
  const en = Object.keys(trip.settings).filter(k=>trip.settings[k]);
  const list = document.getElementById('active-settings');
  list.innerHTML = en.length
    ? en.map(k=>`<div class="s-row"><span>${RULES[k].icon}</span><span>${RULES[k].label}</span><span class="cnt">${RULES[k].reqs.length} checks</span></div>`).join('')
    : `<div style="padding:18px;text-align:center;color:var(--t3);font-size:13px">No settings active — toggle options above to build your compliance profile.</div>`;
}

/* ================================================================
   RENDER — Badges
================================================================ */
function renderBadges() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const items   = genItems();
  const pending = items.filter(i=>!i.completed).length;
  const cb = document.getElementById('comp-badge');
  cb.textContent = pending; cb.style.display = pending ? 'inline-flex' : 'none';

  const en = Object.values(trip.settings).filter(Boolean).length;
  const sb = document.getElementById('set-badge');
  sb.textContent = en; sb.style.display = en ? 'inline-flex' : 'none';
}

/* ================================================================
   RENDER — ALL
================================================================ */
function renderAll() {
  const trip = getCurrentTrip();
  const hasTrip = !!trip;

  document.getElementById('trip-name-wrap').style.display = hasTrip ? 'block' : 'none';
  document.getElementById('h-sep').style.display = hasTrip ? 'block' : 'none';
  document.getElementById('save-status').style.display = hasTrip ? 'flex' : 'none';
  document.getElementById('sidebar').style.display = hasTrip ? 'flex' : 'none';
  document.getElementById('header-back').style.display = hasTrip ? 'flex' : 'none';

  if (hasTrip) {
    const ni = document.getElementById('trip-name');
    ni.textContent = trip.name || '';
    renderSidebar();
    renderItinerary();
    renderCompliance();
    renderSettings();
    renderBadges();
  } else {
    renderHome();
  }
}

/* ================================================================
   NAVIGATION
================================================================ */
function switchView(name) {
  document.querySelectorAll('.nav-btn[data-view]').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelector(`[data-view="${name}"]`)?.classList.add('active');
  document.getElementById(`view-${name}`)?.classList.add('active');
}

function openTrip(tripId) {
  G.activeTrip = tripId;
  scheduleSave();
  renderAll();
  switchView('itinerary');
  activeFilter = 'all';
}

function backToHome() {
  G.activeTrip = null;
  scheduleSave();
  renderAll();
  switchView('home');
  openMenuTrip = null;
}

/* ================================================================
   TRIP MANAGEMENT
================================================================ */
function createTrip(name) {
  const trip = {
    ...JSON.parse(JSON.stringify(TRIP_DEFAULTS)),
    id: uid(),
    name: name || 'Untitled Trip',
  };
  G.trips.push(trip);
  G.activeTrip = trip.id;
  scheduleSave();
  renderAll();
  switchView('itinerary');
}

async function renameTrip(tripId) {
  closeAllMenus();
  const trip = G.trips.find(t => t.id === tripId);
  if (!trip) return;
  const newName = await appPrompt('Rename trip', trip.name || '', { placeholder:'Trip name' });
  if (newName !== null && newName.trim()) {
    trip.name = newName.trim();
    scheduleSave();
    renderHome();
  }
}

async function deleteTrip(tripId) {
  closeAllMenus();
  const ok = await appConfirm('Delete trip?', 'This cannot be undone. All stops and compliance progress will be lost.', { confirmText:'Delete', danger:true });
  if (!ok) return;
  G.trips = G.trips.filter(t => t.id !== tripId);
  if (G.activeTrip === tripId) G.activeTrip = null;
  scheduleSave();
  renderAll();
  switchView('home');
}

function duplicateTrip(tripId) {
  closeAllMenus();
  const src = G.trips.find(t => t.id === tripId);
  if (!src) return;
  const copy = JSON.parse(JSON.stringify(src));
  copy.id = uid();
  copy.name = (src.name || 'Untitled Trip') + ' (Copy)';
  copy.done = {};
  G.trips.push(copy);
  scheduleSave();
  renderHome();
}

function openTripMenu(e, tripId) {
  e.stopPropagation();
  closeAllMenus();
  openMenuTrip = tripId;
  const dd = document.getElementById(`dropdown-${tripId}`);
  const btn = e.currentTarget || e.target.closest('.tc-menu');
  const r = btn.getBoundingClientRect();
  dd.style.display = 'block';
  // Position below button, right-aligned. Flip up if not enough room below.
  const ddH = dd.offsetHeight || 130;
  const below = window.innerHeight - r.bottom;
  dd.style.top = (below > ddH + 12 ? r.bottom + 6 : r.top - ddH - 6) + 'px';
  dd.style.left = (r.right - dd.offsetWidth) + 'px';
}

function closeAllMenus() {
  document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
  openMenuTrip = null;
}

/* ================================================================
   MODAL
================================================================ */
function openAdd() {
  editId = null;
  document.getElementById('modal-title').textContent = 'Add Stop';
  document.getElementById('modal-save').textContent  = 'Add Stop';
  document.getElementById('m-id').value = '';
  ['m-city','m-country','m-notes'].forEach(id => document.getElementById(id).value='');
  ['m-arrive','m-depart'].forEach(id => document.getElementById(id).value='');
  document.getElementById('modal-bg').classList.add('open');
  setTimeout(()=>document.getElementById('m-city').focus(), 140);
}

function openEdit(id) {
  const trip = getCurrentTrip();
  if (!trip) return;
  const s = trip.stops.find(x=>x.id===id); if (!s) return;
  editId = id;
  document.getElementById('modal-title').textContent = 'Edit Stop';
  document.getElementById('modal-save').textContent  = 'Save Changes';
  document.getElementById('m-id').value      = id;
  document.getElementById('m-city').value    = s.city||'';
  document.getElementById('m-country').value = s.country||'';
  document.getElementById('m-arrive').value  = s.arrival||'';
  document.getElementById('m-depart').value  = s.departure||'';
  document.getElementById('m-notes').value   = s.notes||'';
  document.getElementById('modal-bg').classList.add('open');
  setTimeout(()=>document.getElementById('m-city').focus(), 140);
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  editId = null;
}

function saveStop() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const city    = document.getElementById('m-city').value.trim();
  const country = document.getElementById('m-country').value.trim();
  const arrive  = document.getElementById('m-arrive').value;
  const depart  = document.getElementById('m-depart').value;
  const notes   = document.getElementById('m-notes').value.trim();

  const cityEl = document.getElementById('m-city');
  if (!city && !country) {
    cityEl.classList.add('err'); cityEl.focus();
    setTimeout(()=>cityEl.classList.remove('err'), 2000);
    return;
  }

  if (editId) {
    const idx = trip.stops.findIndex(s=>s.id===editId);
    if (idx!==-1) trip.stops[idx] = {...trip.stops[idx], city, country, arrival:arrive, departure:depart, notes};
  } else {
    trip.stops.push({ id:uid(), city, country, arrival:arrive, departure:depart, notes });
  }
  closeModal(); scheduleSave(); renderAll();
}

function openNewTripModal() {
  document.getElementById('nt-name').value = '';
  document.getElementById('modal-new-trip-bg').classList.add('open');
  setTimeout(()=>document.getElementById('nt-name').focus(), 140);
}

function closeNewTripModal() {
  document.getElementById('modal-new-trip-bg').classList.remove('open');
}

function saveNewTrip() {
  const name = document.getElementById('nt-name').value.trim();
  if (!name) return;
  createTrip(name);
  closeNewTripModal();
}

/* ================================================================
   ACTIONS
================================================================ */
async function deleteStop(id) {
  const trip = getCurrentTrip();
  if (!trip) return;
  const ok = await appConfirm('Remove stop?', 'Remove this stop from your itinerary.', { confirmText:'Remove', danger:true });
  if (!ok) return;
  trip.stops = trip.stops.filter(s=>s.id!==id);
  scheduleSave(); renderAll();
}

function toggleItem(id) {
  const trip = getCurrentTrip();
  if (!trip) return;
  trip.done[id] = !trip.done[id];
  if (!trip.done[id]) delete trip.done[id];
  scheduleSave(); renderCompliance(); renderBadges();
}

/* ================================================================
   COMPLIANCE ITEM NOTES
================================================================ */
async function editItemNote(itemId) {
  const trip = getCurrentTrip(); if (!trip) return;
  const cur = (trip.itemNotes && trip.itemNotes[itemId]) || '';
  const next = await appPrompt('Note', cur, { placeholder:'Add a personal note for this item…' });
  if (next === null) return;
  trip.itemNotes = trip.itemNotes || {};
  if (next.trim()) trip.itemNotes[itemId] = next.trim();
  else delete trip.itemNotes[itemId];
  scheduleSave(); renderCompliance();
}

/* ================================================================
   CUSTOM COMPLIANCE ITEMS
================================================================ */
function openCustomItemModal(existing) {
  return new Promise(resolve => {
    const bg = document.getElementById('modal-custom-bg');
    document.getElementById('mc-title-h').textContent = existing ? 'Edit Custom Item' : 'Add Custom Item';
    document.getElementById('mc-title').value = existing?.title || '';
    document.getElementById('mc-desc').value = existing?.desc || '';
    document.getElementById('mc-days').value = existing?.days ?? 7;
    document.getElementById('mc-priority').value = existing?.priority || 'medium';
    document.getElementById('mc-cat').value = existing?.cat || 'Documents';

    const cleanup = (result) => {
      bg.classList.remove('open');
      saveBtn.removeEventListener('click', onSave);
      cancelBtn.removeEventListener('click', onCancel);
      xBtn.removeEventListener('click', onCancel);
      bg.removeEventListener('click', onBg);
      resolve(result);
    };
    const saveBtn = document.getElementById('mc-save');
    const cancelBtn = document.getElementById('mc-cancel');
    const xBtn = document.getElementById('mc-x');
    const onSave = () => {
      const title = document.getElementById('mc-title').value.trim();
      if (!title) { document.getElementById('mc-title').classList.add('err'); setTimeout(()=>document.getElementById('mc-title').classList.remove('err'),1500); return; }
      cleanup({
        title,
        desc: document.getElementById('mc-desc').value.trim(),
        days: Math.max(0, parseInt(document.getElementById('mc-days').value, 10) || 0),
        priority: document.getElementById('mc-priority').value,
        cat: document.getElementById('mc-cat').value.trim() || 'Documents',
      });
    };
    const onCancel = () => cleanup(null);
    const onBg = (e) => { if (e.target === bg) onCancel(); };
    saveBtn.addEventListener('click', onSave);
    cancelBtn.addEventListener('click', onCancel);
    xBtn.addEventListener('click', onCancel);
    bg.addEventListener('click', onBg);
    bg.classList.add('open');
    setTimeout(()=>document.getElementById('mc-title').focus(), 140);
  });
}

async function editCustomItem(itemRawId) {
  const trip = getCurrentTrip(); if (!trip) return;
  trip.customItems = trip.customItems || [];
  const existing = itemRawId ? trip.customItems.find(c => c.id === itemRawId) : null;
  const result = await openCustomItemModal(existing);
  if (!result) return;
  if (existing) Object.assign(existing, result);
  else trip.customItems.push({ id: uid(), ...result });
  scheduleSave(); renderCompliance(); renderBadges();
}

async function deleteCustomItem(itemRawId) {
  const trip = getCurrentTrip(); if (!trip) return;
  const ok = await appConfirm('Delete custom item?', 'This item will be removed from your checklist.', { confirmText:'Delete', danger:true });
  if (!ok) return;
  trip.customItems = (trip.customItems||[]).filter(c => c.id !== itemRawId);
  delete trip.done['custom_'+itemRawId];
  delete trip.itemNotes['custom_'+itemRawId];
  scheduleSave(); renderCompliance(); renderBadges();
}

/* ================================================================
   TRIP START DATE
================================================================ */
function setTripStart(value) {
  const trip = getCurrentTrip(); if (!trip) return;
  trip.tripStart = value || '';
  scheduleSave(); renderCompliance(); renderBadges(); renderItinerary();
}

/* ================================================================
   STOP REORDERING (drag-drop)
================================================================ */
let dragSrcId = null;
function onStopDragStart(e, stopId) {
  dragSrcId = stopId;
  e.dataTransfer.effectAllowed = 'move';
  try { e.dataTransfer.setData('text/plain', stopId); } catch(_) {}
  e.currentTarget.classList.add('drag-src');
}
function onStopDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const row = e.currentTarget;
  row.classList.add('drag-over');
}
function onStopDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
function onStopDragEnd(e) {
  document.querySelectorAll('.route-stop').forEach(el => el.classList.remove('drag-src','drag-over'));
  dragSrcId = null;
}
function onStopDrop(e, targetId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!dragSrcId || dragSrcId === targetId) return;
  const trip = getCurrentTrip(); if (!trip) return;
  const fromIdx = trip.stops.findIndex(s => s.id === dragSrcId);
  const toIdx   = trip.stops.findIndex(s => s.id === targetId);
  if (fromIdx === -1 || toIdx === -1) return;
  const [moved] = trip.stops.splice(fromIdx, 1);
  trip.stops.splice(toIdx, 0, moved);
  scheduleSave(); renderAll();
}

/* ================================================================
   JSON EXPORT / IMPORT
================================================================ */
function downloadBlob(filename, mime, content) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
}

function safeFilename(s) {
  return (s || 'trip').replace(/[^a-z0-9-_]+/gi, '_').replace(/^_+|_+$/g, '') || 'trip';
}

function exportTrip(tripId) {
  closeAllMenus();
  const trip = G.trips.find(t => t.id === tripId);
  if (!trip) return;
  const payload = { wayfarer: 'trip', version: 1, exportedAt: new Date().toISOString(), trip };
  downloadBlob(`wayfarer-${safeFilename(trip.name)}.json`, 'application/json', JSON.stringify(payload, null, 2));
}

async function importTripFlow() {
  closeAllMenus();
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'application/json,.json';
  input.onchange = async () => {
    const file = input.files?.[0]; if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const incoming = data?.trip;
      if (!incoming || !incoming.stops) throw new Error('Not a valid Wayfarer trip export.');
      // Re-id to avoid clash, append "(Imported)"
      const copy = JSON.parse(JSON.stringify(incoming));
      copy.id = uid();
      copy.name = (copy.name || 'Imported Trip') + ' (Imported)';
      // Migrate fields if missing
      if (!copy.itemNotes) copy.itemNotes = {};
      if (!copy.customItems) copy.customItems = [];
      if (copy.tripStart === undefined) copy.tripStart = '';
      G.trips.push(copy);
      scheduleSave();
      renderHome();
      await appAlert('Import complete', `“${copy.name}” has been added to your trips.`);
    } catch (err) {
      await appAlert('Import failed', err.message || String(err));
    }
  };
  input.click();
}

/* ================================================================
   ICS CALENDAR EXPORT
================================================================ */
function icsEscape(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}
function icsDate(d) {
  if (!d) return '';
  return d.replace(/-/g, ''); // YYYYMMDD
}
function buildICS(trip, items) {
  const dtstamp = new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/, '');
  const prodId = '-//Wayfarer//Trip Compliance//EN';
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:'+prodId,'CALSCALE:GREGORIAN','METHOD:PUBLISH'];
  items.forEach((it,i) => {
    const dt = icsDate(it.deadline);
    if (!dt) return;
    const dtEnd = icsDate(addDays(it.deadline, 1));
    lines.push('BEGIN:VEVENT');
    lines.push('UID:wayfarer-'+trip.id+'-'+it.id+'@wayfarer');
    lines.push('DTSTAMP:'+dtstamp);
    lines.push('DTSTART;VALUE=DATE:'+dt);
    lines.push('DTEND;VALUE=DATE:'+dtEnd);
    lines.push('SUMMARY:'+icsEscape(`[${trip.name||'Trip'}] ${it.title}`));
    const descParts = [];
    if (it.desc) descParts.push(it.desc);
    descParts.push(`Priority: ${it.priority}`);
    descParts.push(`Category: ${it.cat}`);
    descParts.push(`Source: ${it.settingLabel}`);
    lines.push('DESCRIPTION:'+icsEscape(descParts.join('\n')));
    lines.push('BEGIN:VALARM');
    lines.push('TRIGGER:-P1D');
    lines.push('ACTION:DISPLAY');
    lines.push('DESCRIPTION:'+icsEscape('Reminder: '+it.title));
    lines.push('END:VALARM');
    lines.push('END:VEVENT');
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
function exportICS() {
  const trip = getCurrentTrip();
  if (!trip) return;
  const items = genItems();
  if (!items.length) { appAlert('Nothing to export', 'There are no compliance deadlines yet.'); return; }
  downloadBlob(`wayfarer-${safeFilename(trip.name)}.ics`, 'text/calendar', buildICS(trip, items));
}

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Nav
  document.querySelectorAll('.nav-btn[data-view]').forEach(b=>{
    b.addEventListener('click', ()=>switchView(b.dataset.view));
  });

  // Header
  document.getElementById('header-back').addEventListener('click', backToHome);

  // Add stop triggers
  document.getElementById('add-btn').addEventListener('click', openAdd);
  document.getElementById('add-btn2').addEventListener('click', openAdd);
  document.getElementById('sb-add-btn').addEventListener('click', openAdd);

  // New trip
  document.getElementById('home-new-trip').addEventListener('click', openNewTripModal);
  document.getElementById('modal-new-trip-x').addEventListener('click', closeNewTripModal);
  document.getElementById('modal-new-trip-cancel').addEventListener('click', closeNewTripModal);
  document.getElementById('modal-new-trip-save').addEventListener('click', saveNewTrip);

  // Modal controls
  document.getElementById('modal-x').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-save').addEventListener('click', saveStop);
  document.getElementById('modal-bg').addEventListener('click', e=>{
    if (e.target===document.getElementById('modal-bg')) closeModal();
  });
  document.getElementById('modal-new-trip-bg').addEventListener('click', e=>{
    if (e.target===document.getElementById('modal-new-trip-bg')) closeNewTripModal();
  });

  // Keyboard
  document.addEventListener('keydown', e=>{
    if (e.key==='Escape') { closeModal(); closeNewTripModal(); closeAllMenus(); }
    if (e.key==='Enter' && document.getElementById('modal-bg').classList.contains('open') && e.target.tagName!=='TEXTAREA') {
      e.preventDefault(); saveStop();
    }
    if (e.key==='Enter' && document.getElementById('modal-new-trip-bg').classList.contains('open')) {
      e.preventDefault(); saveNewTrip();
    }
  });

  // Close menu on click outside
  document.addEventListener('click', closeAllMenus);

  // Setting cards
  document.querySelectorAll('.setting-card[data-setting]').forEach(card=>{
    card.addEventListener('click', ()=>{
      const trip = getCurrentTrip();
      if (!trip) return;
      const k = card.dataset.setting;
      trip.settings[k] = !trip.settings[k];
      scheduleSave(); renderSettings(); renderCompliance(); renderBadges();
    });
  });

  // Trip start date
  document.getElementById('trip-start-date')?.addEventListener('change', (e) => setTripStart(e.target.value));

  // Import trip button (home dashboard)
  document.getElementById('home-import-btn')?.addEventListener('click', importTripFlow);

  // Populate country datalist from known FLAGS keys (title-cased)
  const dl = document.getElementById('countries-dl');
  if (dl) {
    const seen = new Set();
    const countries = Object.keys(FLAGS).map(k => k.replace(/\b\w/g, c => c.toUpperCase())).filter(c => {
      const key = c.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true;
    }).sort();
    dl.innerHTML = countries.map(c => `<option value="${c}"></option>`).join('');
  }

  // Boot
  renderAll();
  setStatusUI('saved');
});
