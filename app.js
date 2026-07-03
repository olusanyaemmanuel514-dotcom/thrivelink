// Thrivelink Health PWA - Frontend
const API_BASE = 'https://emmanuel154-thrivelink-api.hf.space';

let currentToken = localStorage.getItem('token') || '';
let currentRole = localStorage.getItem('role') || '';
let tempSignupData = null;
let tempNIN = '';
let currentPatient = null;
let tempContactData = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed:', err));
  }

  // Splash screen
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 500);
    }
  }, 1500);

  // Render office hours grids
  renderHours('hosp-hours');
  renderHours('work-hours');

  // Check for existing session
  if (currentToken && currentRole) {
    if (currentRole === 'hospital') showScreen('screen-hospital-dashboard');
    else if (currentRole === 'worker') showScreen('screen-worker-dashboard');
    else if (currentRole === 'patient') showScreen('screen-patient-view');
  }
});

// ===== NAVIGATION =====
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) {
    screen.classList.add('active');
    window.scrollTo(0, 0);
  }
}

function switchTab(tab, panelId) {
  const parent = tab.parentElement;
  parent.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.add('hidden'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.remove('hidden');
}

// ===== UI HELPERS =====
function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '') + ' show';
  setTimeout(() => t.classList.remove('show'), 3000);
}

function moveOTP(el, next) {
  if (el.value && next < 6) {
    const nextEl = el.parentElement.children[next];
    if (nextEl) nextEl.focus();
  }
}

function getOTP() {
  return Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
}

function clearOTP() {
  document.querySelectorAll('.otp-input').forEach(i => i.value = '');
}

function renderHours(containerId) {
  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = days.map(d => `
    <div class="hours-row">
      <span class="hours-day">${d}</span>
      <input type="time" value="08:00" id="${containerId}-${d}-open">
      <span style="font-size:12px;color:var(--text-light)">to</span>
      <input type="time" value="17:00" id="${containerId}-${d}-close">
      <label>
        <input type="checkbox" id="${containerId}-${d}-closed"> Closed
      </label>
    </div>
  `).join('');
}

function getOfficeHours(containerId) {
  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
  const h = {};
  days.forEach(d => {
    const closed = document.getElementById(`${containerId}-${d}-closed`)?.checked;
    h[d] = closed ? {open:null,close:null,closed:true} : {
      open: document.getElementById(`${containerId}-${d}-open`).value,
      close: document.getElementById(`${containerId}-${d}-close`).value,
      closed: false
    };
  });
  return h;
}

function isOpenNow(hours) {
  if (!hours) return false;
  const day = new Date().toLocaleDateString('en-US',{weekday:'long'}).toLowerCase();
  const today = hours[day];
  if (!today || today.closed) return false;
  const now = new Date();
  const [oh,om] = today.open.split(':').map(Number);
  const [ch,cm] = today.close.split(':').map(Number);
  const openTime = oh*60+om;
  const closeTime = ch*60+cm;
  const currentTime = now.getHours()*60+now.getMinutes();
  return currentTime >= openTime && currentTime <= closeTime;
}

function formatHours(hours) {
  if (!hours) return '';
  return Object.entries(hours).map(([d,h]) => {
    if (h.closed) return `${d.charAt(0).toUpperCase()+d.slice(1)}: Closed`;
    return `${d.charAt(0).toUpperCase()+d.slice(1)}: ${h.open} - ${h.close}`;
  }).join('<br>');
}

// ===== API =====

// ===== GEOLOCATION =====
async function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({lat: pos.coords.latitude, lng: pos.coords.longitude}),
      err => reject(err),
      {timeout: 10000, enableHighAccuracy: true}
    );
  });
}

async function api(method, path, body, token) {
  const opts = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);

  try {
    const r = await fetch(API_BASE + path, opts);
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = data.detail || data.message || `Error ${r.status}`;
      throw new Error(msg);
    }
    return data;
  } catch(e) {
    showToast(e.message, 'error');
    throw e;
  }
}

// ===== HOSPITAL =====
async function hospitalSignup() {
  const pass = document.getElementById('hosp-pass').value;
  const pass2 = document.getElementById('hosp-pass2').value;

  if (pass !== pass2) {
    return showToast('Passwords do not match', 'error');
  }

  // Try to get location
  let lat = null, lng = null;
  try {
    const loc = await getLocation();
    lat = loc.lat;
    lng = loc.lng;
  } catch(e) { console.log('Location not available'); }

  const data = {
    name: document.getElementById('hosp-name').value,
    address: document.getElementById('hosp-address').value,
    location_link: document.getElementById('hosp-maps').value,
    latitude: lat,
    longitude: lng,
    contact_email: document.getElementById('hosp-email').value,
    contact_phone: document.getElementById('hosp-phone').value,
    admin_username: document.getElementById('hosp-username').value,
    password: pass,
    confirm_password: pass2,
    office_hours: getOfficeHours('hosp-hours')
  };

  // Validate required
  const required = ['name','address','contact_email','contact_phone','admin_username','password'];
  for (const field of required) {
    if (!data[field]) {
      return showToast('Please fill all required fields', 'error');
    }
  }

  try {
    // Signup directly - creates account
    await api('POST', '/hospitals/signup', data);
    showToast('Account created! Please login.', 'success');
    // Switch to login tab
    showScreen('screen-hospital-auth');
    const loginTab = document.querySelector('#screen-hospital-auth .auth-tab');
    if (loginTab) switchTab(loginTab, 'hospital-login');
    // Clear signup form
    ['hosp-name','hosp-address','hosp-maps','hosp-email','hosp-phone','hosp-username','hosp-pass','hosp-pass2']
      .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  } catch(e) {}
}

async function verifyHospitalOTP() {
  const otp = getOTP();
  if (otp.length !== 6) {
    return showToast('Enter 6-digit OTP', 'error');
  }

  const username = tempSignupData ? tempSignupData.admin_username || tempSignupData.data?.admin_username : null;
  if (!username) {
    return showToast('Username not found. Please request OTP again.', 'error');
  }

  try {
    const data = await api('POST', '/hospitals/otp/verify', {
      admin_username: username,
      otp: otp
    });
    currentToken = data.access_token;
    currentRole = 'hospital';
    localStorage.setItem('token', currentToken);
    localStorage.setItem('role', currentRole);
    showScreen('screen-hospital-dashboard');
    showToast('Welcome back!', 'success');
    loadHospitalDashboard();
  } catch(e) {}
}

async function hospitalLogin() {
  const user = document.getElementById('hosp-login-user').value;
  const pass = document.getElementById('hosp-login-pass').value;

  if (!user || !pass) {
    return showToast('Enter username and password', 'error');
  }

  try {
    const data = await api('POST', '/hospitals/login', {
      admin_username: user,
      password: pass
    });
    currentToken = data.access_token;
    currentRole = 'hospital';
    localStorage.setItem('token', currentToken);
    localStorage.setItem('role', currentRole);
    showScreen('screen-hospital-dashboard');
    showToast('Welcome back!');
    loadHospitalDashboard();
  } catch(e) {}
}

async function requestHospitalOTP() {
  const user = document.getElementById('hosp-login-user').value;
  if (!user) {
    return showToast('Enter username first', 'error');
  }

  try {
    await api('POST', '/hospitals/otp/request', {admin_username: user});
    tempSignupData = {admin_username: user};
    clearOTP();
    showScreen('screen-hospital-otp');
    showToast('OTP sent to your email');
  } catch(e) {}
}

async function loadHospitalDashboard() {
  // In real app, fetch stats from API
  document.getElementById('stat-patients').textContent = '0';
  document.getElementById('stat-remarks').textContent = '0';
}

// ===== PATIENT (Hospital creates) =====
async function addPatient() {
  const data = {
    nin: document.getElementById('pat-nin').value,
    full_name: document.getElementById('pat-name').value,
    date_of_birth: document.getElementById('pat-dob').value,
    sex: document.getElementById('pat-sex').value,
    blood_group: document.getElementById('pat-blood').value,
    height: document.getElementById('pat-height').value,
    weight: document.getElementById('pat-weight').value,
    address: document.getElementById('pat-address').value,
    phone: document.getElementById('pat-phone').value,
    email: document.getElementById('pat-email').value
  };

  // Validate
  const required = ['nin','full_name','date_of_birth','sex','address','phone','email'];
  for (const field of required) {
    if (!data[field]) {
      return showToast('Please fill all required fields', 'error');
    }
  }

  if (data.nin.length !== 11) {
    return showToast('NIN must be exactly 11 digits', 'error');
  }

  try {
    await api('POST', '/hospitals/patients', data, currentToken);
    showToast('Patient created successfully', 'success');
    showScreen('screen-hospital-dashboard');
    // Clear form
    ['pat-nin','pat-name','pat-dob','pat-sex','pat-blood','pat-height','pat-weight','pat-address','pat-phone','pat-email']
      .forEach(id => document.getElementById(id).value = '');
  } catch(e) {}
}

async function searchPatient() {
  const nin = document.getElementById('search-nin').value;
  if (nin.length !== 11) {
    return showToast('Enter valid 11-digit NIN', 'error');
  }

  try {
    const data = await api('GET', '/hospitals/patients/' + nin + '/full', null, currentToken);
    currentPatient = data;
    renderPatientRecord(data, 'patient-record-content', true);
    showScreen('screen-patient-record');
  } catch(e) {}
}

async function addRemark() {
  const subject = document.getElementById('rem-subject').value;
  const text = document.getElementById('rem-text').value;
  const doctor = document.getElementById('rem-doctor').value;
  const date = document.getElementById('rem-date').value;

  if (!subject || !text || !doctor || !date) {
    return showToast('Fill all remark fields', 'error');
  }

  try {
    await api('POST', '/hospitals/remarks', {
      patient_id: currentPatient.patient_id,
      subject: subject,
      full_text: text,
      doctor_name: doctor,
      date: date
    }, currentToken);
    showToast('Remark added successfully', 'success');
    // Clear form
    document.getElementById('rem-subject').value = '';
    document.getElementById('rem-text').value = '';
    document.getElementById('rem-doctor').value = '';
    document.getElementById('rem-date').value = '';
    // Refresh
    searchPatient();
  } catch(e) {}
}

// ===== WORKER =====
async function workerSignup() {
  const pass = document.getElementById('work-pass').value;
  const pass2 = document.getElementById('work-pass2').value;

  if (pass !== pass2) {
    return showToast('Passwords do not match', 'error');
  }

  // Try to get location
  let lat = null, lng = null;
  try {
    const loc = await getLocation();
    lat = loc.lat;
    lng = loc.lng;
  } catch(e) { console.log('Location not available'); }

  const data = {
    name: document.getElementById('work-name').value,
    email: document.getElementById('work-email').value,
    profession: document.getElementById('work-profession').value,
    license_number: document.getElementById('work-license').value,
    phone: document.getElementById('work-phone').value,
    address: document.getElementById('work-address').value,
    location_link: document.getElementById('work-maps').value,
    latitude: lat,
    longitude: lng,
    password: pass,
    confirm_password: pass2,
    office_hours: getOfficeHours('work-hours')
  };

  const required = ['name','email','profession','license_number','address','password'];
  for (const field of required) {
    if (!data[field]) {
      return showToast('Please fill all required fields', 'error');
    }
  }

  try {
    // Signup directly - creates account
    await api('POST', '/workers/signup', data);
    showToast('Account created! Please login.', 'success');
    // Switch to login tab
    showScreen('screen-worker-auth');
    const loginTab = document.querySelector('#screen-worker-auth .auth-tab');
    if (loginTab) switchTab(loginTab, 'worker-login');
    // Clear signup form
    ['work-name','work-email','work-profession','work-license','work-phone','work-address','work-maps','work-pass','work-pass2']
      .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  } catch(e) {}
}

async function verifyWorkerOTP() {
  const otp = getOTP();
  if (otp.length !== 6) {
    return showToast('Enter 6-digit OTP', 'error');
  }

  const email = tempSignupData ? tempSignupData.email || tempSignupData.data?.email : null;
  if (!email) {
    return showToast('Email not found. Please request OTP again.', 'error');
  }

  try {
    const data = await api('POST', '/workers/otp/verify', {
      email: email,
      otp: otp
    });
    currentToken = data.access_token;
    currentRole = 'worker';
    localStorage.setItem('token', currentToken);
    localStorage.setItem('role', currentRole);
    showScreen('screen-worker-dashboard');
    showToast('Welcome back!', 'success');
  } catch(e) {}
}

async function workerLogin() {
  const email = document.getElementById('work-login-email').value;
  const pass = document.getElementById('work-login-pass').value;

  if (!email || !pass) {
    return showToast('Enter email and password', 'error');
  }

  try {
    const data = await api('POST', '/workers/login', {
      email: email,
      password: pass
    });
    currentToken = data.access_token;
    currentRole = 'worker';
    localStorage.setItem('token', currentToken);
    localStorage.setItem('role', currentRole);
    showScreen('screen-worker-dashboard');
    showToast('Welcome back!');
  } catch(e) {}
}

async function requestWorkerOTP() {
  const email = document.getElementById('work-login-email').value;
  if (!email) {
    return showToast('Enter email first', 'error');
  }

  try {
    await api('POST', '/workers/otp/request', {email: email});
    tempSignupData = {email: email, data: {email: email}};
    clearOTP();
    showScreen('screen-worker-otp');
    showToast('OTP sent to your email');
  } catch(e) {}
}

async function workerSearchPatient() {
  const nin = document.getElementById('work-search-nin').value;
  if (nin.length !== 11) {
    return showToast('Enter valid 11-digit NIN', 'error');
  }

  try {
    const data = await api('GET', '/workers/patients/' + nin, null, currentToken);
    renderPatientRecord(data, 'worker-patient-result', false);
  } catch(e) {}
}

// ===== PATIENT (Self) =====
async function requestPatientOTP() {
  const nin = document.getElementById('pat-auth-nin').value;
  if (nin.length !== 11) {
    return showToast('Enter valid 11-digit NIN', 'error');
  }

  try {
    await api('POST', '/patients/otp/request', {nin: nin});
    tempNIN = nin;
    clearOTP();
    showScreen('screen-patient-otp');
    showToast('OTP sent to your registered email');
  } catch(e) {}
}

async function verifyPatientOTP() {
  const otp = getOTP();
  if (otp.length !== 6) {
    return showToast('Enter 6-digit OTP', 'error');
  }

  try {
    const data = await api('POST', '/patients/otp/verify', {nin: tempNIN, otp: otp});
    currentToken = data.access_token;
    currentRole = 'patient';
    localStorage.setItem('token', currentToken);
    localStorage.setItem('role', currentRole);

    const record = await api('GET', '/patients/me', null, currentToken);
    renderPatientRecord(record, 'patient-view-content', false);

    // Pre-fill update fields
    document.getElementById('update-phone').value = record.phone || '';
    document.getElementById('update-address').value = record.address || '';
    document.getElementById('update-email').value = record.email || '';

    showScreen('screen-patient-view');
    showToast('Welcome! Your record is ready.');
  } catch(e) {}
}

async function requestContactUpdateOTP() {
  const phone = document.getElementById('update-phone').value;
  const address = document.getElementById('update-address').value;
  const email = document.getElementById('update-email').value;

  if (!phone && !address && !email) {
    return showToast('No changes to update', 'error');
  }

  tempContactData = {
    phone: phone || null,
    address: address || null,
    email: email || null
  };

  try {
    await api('POST', '/patients/me/contact/request-otp', null, currentToken);
    clearOTP();
    showScreen('screen-contact-otp');
    showToast('OTP sent for verification');
  } catch(e) {}
}

async function verifyContactUpdate() {
  const otp = getOTP();
  if (otp.length !== 6) {
    return showToast('Enter 6-digit OTP', 'error');
  }

  try {
    await api('POST', '/patients/me/contact', {
      ...tempContactData,
      otp: otp
    }, currentToken);
    showToast('Contact info updated', 'success');
    showScreen('screen-patient-view');

    // Refresh record
    const record = await api('GET', '/patients/me', null, currentToken);
    renderPatientRecord(record, 'patient-view-content', false);
  } catch(e) {}
}

// ===== EMERGENCY =====
async function searchEmergency() {
  const query = document.getElementById('emergency-search').value.toLowerCase().trim();

  let lat = 9.0765, lng = 7.3986; // Default Abuja

  try {
    const pos = await new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej, {timeout: 5000});
    });
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;
  } catch(e) {
    console.log('Geolocation not available, using default');
  }

  try {
    const data = await api('POST', '/emergency/search', {
      latitude: lat,
      longitude: lng,
      max_distance_km: 50,
      provider_type: 'all'
    });
    renderEmergencyResults(data.providers, query);
  } catch(e) {
    // Fallback demo data
    renderEmergencyResults([
      {
        name: 'Dr. John Doe Clinic',
        type: 'worker',
        profession: 'Doctor',
        distance_km: 1.2,
        address: '123 Hospital Road, Garki, Abuja',
        phone: '+2348001112222',
        email: 'dr@example.com',
        location_link: 'https://maps.google.com/?q=9.0765,7.3986',
        office_hours: {
          monday: {open:'08:00',close:'17:00',closed:false},
          tuesday: {open:'08:00',close:'17:00',closed:false},
          wednesday: {open:'08:00',close:'17:00',closed:false},
          thursday: {open:'08:00',close:'17:00',closed:false},
          friday: {open:'08:00',close:'17:00',closed:false},
          saturday: {open:'09:00',close:'14:00',closed:false},
          sunday: {closed:true}
        }
      },
      {
        name: 'National Hospital Abuja',
        type: 'hospital',
        profession: null,
        distance_km: 2.5,
        address: 'Central Business District, Abuja',
        phone: '+2348003334444',
        email: 'info@nationalhospital.ng',
        location_link: 'https://maps.google.com/?q=9.08,7.40',
        office_hours: {
          monday: {open:'00:00',close:'23:59',closed:false},
          tuesday: {open:'00:00',close:'23:59',closed:false},
          wednesday: {open:'00:00',close:'23:59',closed:false},
          thursday: {open:'00:00',close:'23:59',closed:false},
          friday: {open:'00:00',close:'23:59',closed:false},
          saturday: {open:'00:00',close:'23:59',closed:false},
          sunday: {open:'00:00',close:'23:59',closed:false}
        }
      }
    ], query);
  }
}

async function useMyLocation() {
  document.getElementById('emergency-search').value = 'near me';
  searchEmergency();
}

function renderEmergencyResults(providers, query) {
  const container = document.getElementById('emergency-results');
  if (!container) return;

  let filtered = providers;
  if (query && query !== 'near me') {
    filtered = providers.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.address.toLowerCase().includes(query) ||
      (p.profession && p.profession.toLowerCase().includes(query))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No providers found matching your search.</p></div>';
    return;
  }

  container.innerHTML = filtered.map(p => {
    const open = isOpenNow(p.office_hours);
    const badge = open 
      ? '<span class="result-badge badge-open">Open Now</span>' 
      : '<span class="result-badge badge-closed">Closed</span>';
    const hours = formatHours(p.office_hours);
    const typeLabel = p.type === 'hospital' ? 'Hospital' : p.profession;

    return `
      <div class="result-card">
        <div class="result-name">${p.name} ${badge}</div>
        <div class="result-meta">${typeLabel} &bull; ${p.distance_km} km away</div>
        <div class="result-address">
          <div>Address: ${p.address}</div>
          <div>Phone: ${p.phone}</div>
          ${p.email ? '<div>Email: ' + p.email + '</div>' : ''}
        </div>
        <div class="result-hours">${hours}</div>
        <div class="result-actions">
          ${p.location_link ? '<a href="' + p.location_link + '" target="_blank" rel="noopener" class="btn btn-primary" style="text-decoration:none;">Get Directions</a>' : ''}
          <a href="tel:' + p.phone + '" class="btn btn-secondary" style="text-decoration:none;">Call Now</a>
        </div>
      </div>
    `;
  }).join('');
}

// ===== SHARED RENDERERS =====
function renderPatientRecord(data, containerId, editable) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const remarks = (data.remarks || []).map(r => `
    <div class="remark-card">
      <h4>${r.subject}</h4>
      <div class="remark-meta">By ${r.doctor_name} at ${r.hospital_name} &bull; ${r.date}</div>
      <div class="remark-text">${r.full_text}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="card">
      <h3 class="card-title">${data.full_name}</h3>
      <div class="info-grid">
        <div><strong>NIN Hash</strong>${data.patient_id}</div>
        <div><strong>Date of Birth</strong>${data.date_of_birth}</div>
        <div><strong>Sex</strong>${data.sex}</div>
        <div><strong>Blood Group</strong>${data.blood_group || 'N/A'}</div>
        <div><strong>Height</strong>${data.height || 'N/A'}</div>
        <div><strong>Weight</strong>${data.weight || 'N/A'}</div>
      </div>
      <div class="info-full">
        <div><strong>Address:</strong> ${data.address}</div>
        <div><strong>Phone:</strong> ${data.phone}</div>
        <div><strong>Email:</strong> ${data.email}</div>
      </div>
      <div style="margin-top:12px;font-size:12px;color:var(--text-light);">
        Created by: ${data.created_by_hospital_name}
      </div>
    </div>
    <div class="card">
      <h3 class="card-title">Medical Remarks (${data.remarks?.length || 0})</h3>
      ${remarks || '<p style="color:#999;font-size:13px;">No remarks yet</p>'}
    </div>
  `;
}

function logout() {
  currentToken = '';
  currentRole = '';
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  showScreen('screen-role-select');
  showToast('Logged out');
}
