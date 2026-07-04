// ==================== CONFIG ====================
const API_BASE = localStorage.getItem('api_base') || 'https://emmanuel154-thrivelink-api.hf.space';
const APP_VERSION = '2.0 MVP';

// ==================== PROFESSIONS LIST ====================
const PROFESSIONS = [
    'Doctor',
    'Nurse',
    'Pharmacist',
    'Dentist',
    'Laboratory Technician',
    'Physiotherapist',
    'Midwife',
    'Radiologist',
    'Optometrist',
    'Medical Officer',
    'Surgeon',
    'Pediatrician',
    'Gynecologist',
    'General Practitioner',
    'Orthopedic Surgeon',
    'Cardiologist',
    'Dermatologist',
    'Psychiatrist',
    'Nutritionist',
    'Health Assistant',
    'Community Health Worker',
    'Medical Lab Scientist',
    'Pharmacy Technician',
    'Dental Technician',
    'Occupational Therapist',
    'Speech Therapist',
    'Audiologist',
    'Ophthalmologist',
    'Anesthesiologist',
    'Pathologist',
    'Emergency Medicine Specialist',
    'Family Medicine Physician',
    'Internal Medicine Specialist',
    'Obstetrician',
    'Public Health Physician',
    'Epidemiologist',
    'Biomedical Engineer',
    'Health Information Manager',
    'Clinical Psychologist',
    'Medical Social Worker',
    'Hospice Worker',
    'Caregiver',
    'Medical Assistant',
    'Ward Assistant',
    'First Aid Provider',
    'Ambulance Driver',
    'Health Educator',
    'Vaccinator',
    'Traditional Birth Attendant',
    'Herbal Medicine Practitioner',
    'Acupuncturist',
    'Chiropractor',
    'Homeopath',
    'Naturopath',
    'Reflexologist',
    'Massage Therapist',
    'Yoga Instructor',
    'Fitness Trainer',
    'Dietitian',
    'Mental Health Counselor',
    'Addiction Counselor',
    'Rehabilitation Counselor',
    'Genetic Counselor',
    'Patient Advocate',
    'Medical Interpreter',
    'Clinical Research Coordinator',
    'Quality Assurance Specialist',
    'Infection Control Specialist',
    'Wound Care Specialist',
    'Dialysis Technician',
    'EKG Technician',
    'EEG Technician',
    'Respiratory Therapist',
    'Sleep Technologist',
    'Surgical Technologist',
    'Sterile Processing Technician',
    'Endoscopy Technician',
    'Cath Lab Technician',
    'MRI Technologist',
    'CT Technologist',
    'Ultrasound Technologist',
    'Nuclear Medicine Technologist',
    'Radiation Therapist',
    'Dosimetrist',
    'Medical Physicist',
    'Cytotechnologist',
    'Histotechnologist',
    'Phlebotomist',
    'Blood Bank Technologist',
    'Transplant Coordinator',
    'Organ Procurement Coordinator',
    'Tissue Typing Technologist',
    'Forensic Pathologist',
    'Medical Examiner',
    'Coroner',
    'Death Investigator',
    'Toxicologist',
    'Pharmacologist',
    'Immunologist',
    'Microbiologist',
    'Virologist',
    'Parasitologist',
    'Mycologist',
    'Entomologist',
    'Biostatistician',
    'Health Economist',
    'Health Policy Analyst',
    'Healthcare Administrator',
    'Hospital Administrator',
    'Chief Medical Officer',
    'Chief Nursing Officer',
    'Director of Nursing',
    'Nurse Manager',
    'Charge Nurse',
    'Nurse Educator',
    'Nurse Researcher',
    'Nurse Practitioner',
    'Clinical Nurse Specialist',
    'Certified Nurse Midwife',
    'Certified Registered Nurse Anesthetist',
    'Nurse Informaticist',
    'Telehealth Nurse',
    'Flight Nurse',
    'Transport Nurse',
    'Camp Nurse',
    'School Nurse',
    'Occupational Health Nurse',
    'Public Health Nurse',
    'Parish Nurse',
    'Faith Community Nurse',
    'Forensic Nurse',
    'Legal Nurse Consultant',
    'Nurse Entrepreneur',
    'Nurse Attorney',
    'Nurse Writer',
    'Nurse Photographer',
    'Nurse Artist',
    'Nurse Musician',
    'Nurse Podcaster',
    'Nurse Blogger',
    'Nurse Influencer',
    'Nurse Model',
    'Nurse Actor',
    'Nurse Politician',
    'Nurse Activist',
    'Nurse Volunteer',
    'Nurse Missionary',
    'Nurse Military Officer',
    'Nurse Veteran',
    'Nurse Reservist',
    'Nurse Coast Guard',
    'Nurse Air Force',
    'Nurse Navy',
    'Nurse Army',
    'Nurse Marine',
    'Nurse Space Force',
    'Nurse NASA',
    'Nurse CDC',
    'Nurse WHO',
    'Nurse UN',
    'Nurse Red Cross',
    'Nurse MSF',
    'Nurse ICRC',
    'Nurse Peace Corps',
    'Nurse AmeriCorps',
    'Nurse FEMA',
    'Nurse DHS',
    'Nurse FBI',
    'Nurse CIA',
    'Nurse Secret Service',
    'Nurse White House',
    'Nurse Congress',
    'Nurse Senate',
    'Nurse Supreme Court',
    'Nurse Pentagon',
    'Nurse State Department',
    'Nurse Treasury',
    'Nurse Justice',
    'Nurse Interior',
    'Nurse Agriculture',
    'Nurse Commerce',
    'Nurse Labor',
    'Nurse Transportation',
    'Nurse Energy',
    'Nurse Education',
    'Nurse HUD',
    'Nurse VA',
    'Nurse EPA',
    'Nurse SBA',
    'Nurse GSA',
    'Nurse OPM',
    'Nurse NARA',
    'Nurse Smithsonian',
    'Nurse Library of Congress',
    'Nurse National Archives',
    'Nurse National Park',
    'Nurse Forest Service',
    'Nurse Fish and Wildlife',
    'Nurse Bureau of Land Management',
    'Nurse Bureau of Indian Affairs',
    'Nurse Bureau of Reclamation',
    'Nurse USGS',
    'Nurse NOAA',
    'Nurse NSF',
    'Nurse NIH',
    'Nurse FDA',
    'Nurse CMS',
    'Nurse HRSA',
    'Nurse IHS',
    'Nurse AHRQ',
    'Nurse SAMHSA',
    'Nurse ACL',
    'Nurse ASPE',
    'Nurse ASFR',
    'Nurse OIG',
    'Nurse OCR',
    'Nurse OMH',
    'Nurse ONC',
    'Nurse OSDBU',
    'Nurse OWH',
    'Nurse PCCB'
];;

// ==================== STATE ====================
let currentScreen = 'screen-splash';
let screenHistory = [];
let currentRole = null;
let currentUser = null;
let authToken = localStorage.getItem('token') || null;
let recentPatients = JSON.parse(localStorage.getItem('recentPatients') || '[]');
let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

// ==================== UTILITIES ====================
function $(id) { return document.getElementById(id); }
function showToast(msg, type = 'info') {
    const toast = $('toast');
    const toastMsg = $('toast-msg');
    toastMsg.textContent = msg;
    toast.className = 'toast show ' + type;
    setTimeout(() => toast.classList.remove('show'), 3000);
}
function showLoading(show) {
    const el = $('loading-overlay');
    if (show) el.classList.remove('hidden');
    else el.classList.add('hidden');
}
function togglePassword(id) {
    const input = $(id);
    const btn = input.parentElement.querySelector('.toggle-password i');
    if (input.type === 'password') { input.type = 'text'; btn.className = 'fas fa-eye-slash'; }
    else { input.type = 'password'; btn.className = 'fas fa-eye'; }
}
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatTime(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
}
function timeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
}
function getHoursObject(prefix) {
    return {
        mon: $(prefix + 'mon').value,
        tue: $(prefix + 'tue').value,
        wed: $(prefix + 'wed').value,
        thu: $(prefix + 'thu').value,
        fri: $(prefix + 'fri').value,
        sat: $(prefix + 'sat').value,
        sun: $(prefix + 'sun').value
    };
}
function isOpenNow(hours) {
    const now = new Date();
    const day = ['sun','mon','tue','wed','thu','fri','sat'][now.getDay()];
    const todayHours = hours[day] || hours[day.toLowerCase()] || 'Closed';
    if (todayHours.toLowerCase() === 'closed') return false;
    const match = todayHours.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/gi);
    if (!match || match.length < 2) return true;
    return true;
}
function populateProfessions(selectId, includeAll = false) {
    const select = $(selectId);
    if (!select) return;
    select.innerHTML = includeAll ? '<option value="">All Professions</option>' : '<option value="">Select profession</option>';
    PROFESSIONS.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p; opt.textContent = p;
        select.appendChild(opt);
    });
}

// ==================== API ====================
async function apiCall(endpoint, options = {}) {
    const url = API_BASE + endpoint;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': 'Bearer ' + authToken } : {}),
            ...options.headers
        },
        ...options
    };
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }
    try {
        const res = await fetch(url, config);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.detail || data.message || 'Request failed');
        }
        return data;
    } catch (err) {
        console.error('API Error:', err);
        throw err;
    }
}

// ==================== NAVIGATION ====================
function showScreen(screenId, saveHistory = true) {
    if (saveHistory && currentScreen !== screenId) {
        screenHistory.push(currentScreen);
    }
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = $(screenId);
    if (screen) screen.classList.add('active');
    currentScreen = screenId;
    window.scrollTo(0, 0);

    // Show/hide FAB based on screen
    const fab = $('fab-chatbot');
    if (fab) {
        if (screenId === 'screen-chatbot' || screenId === 'screen-splash' || screenId === 'screen-role-select') {
            fab.style.display = 'none';
        } else {
            fab.style.display = 'flex';
        }
    }

    // Update find care nav based on role
    if (screenId === 'screen-find-care') {
        updateFindCareNav();
    }
}
function goBack() {
    if (screenHistory.length > 0) {
        const prev = screenHistory.pop();
        showScreen(prev, false);
    } else {
        showScreen('screen-role-select', false);
    }
}
function selectRole(role) {
    currentRole = role;
    localStorage.setItem('lastRole', role);
    if (role === 'hospital') showScreen('screen-hospital-login');
    else if (role === 'worker') showScreen('screen-worker-login');
    else if (role === 'patient') showScreen('screen-patient-login');
}

// ==================== AUTH ====================
function setAuth(token, role, user) {
    authToken = token;
    currentRole = role;
    currentUser = user;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
}
function clearAuth() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
}
function logout() {
    clearAuth();
    showScreen('screen-role-select');
    showToast('Logged out successfully', 'success');
}
function checkAuth() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user');
    if (token && role && user) {
        authToken = token;
        currentRole = role;
        try { currentUser = JSON.parse(user); } catch(e) { currentUser = null; }
        return true;
    }
    return false;
}

// ==================== INIT ====================
function initApp() {
    populateProfessions('h-signup-profession');
    populateProfessions('w-signup-profession');
    populateProfessions('fc-profession', true);

    // Check for saved auth
    if (checkAuth()) {
        if (currentRole === 'hospital') {
            loadHospitalDashboard();
            showScreen('screen-hospital-dashboard', false);
        } else if (currentRole === 'worker') {
            loadWorkerDashboard();
            showScreen('screen-worker-dashboard', false);
        } else if (currentRole === 'patient') {
            loadPatientDashboard();
            showScreen('screen-patient-dashboard', false);
        }
    } else {
        // Splash auto-navigate
        setTimeout(() => {
            showScreen('screen-role-select', false);
        }, 2500);
    }

    // Dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        $('setting-darkmode').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', initApp);

// ==================== HOSPITAL AUTH ====================
async function handleHospitalLogin(e) {
    e.preventDefault();
    const username = $('h-login-username').value.trim();
    const password = $('h-login-password').value;
    showLoading(true);
    try {
        const data = await apiCall('/hospitals/login', {
            method: 'POST',
            body: { username, password }
        });
        setAuth(data.access_token, 'hospital', data.hospital);
        showToast('Login successful!', 'success');
        loadHospitalDashboard();
        showScreen('screen-hospital-dashboard');
    } catch (err) {
        showToast(err.message || 'Login failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleHospitalSignup(e) {
    e.preventDefault();
    const password = $('h-signup-password').value;
    const confirm = $('h-signup-confirm').value;
    if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }

    const body = {
        name: $('h-signup-name').value.trim(),
        username: $('h-signup-username').value.trim(),
        email: $('h-signup-email').value.trim(),
        phone: $('h-signup-phone').value.trim(),
        password: password,
        address: $('h-signup-address').value.trim(),
        profession: $('h-signup-profession').value,
        website: $('h-signup-website').value.trim() || undefined,
        office_hours: getHoursObject('h-hours-')
    };
    showLoading(true);
    try {
        const data = await apiCall('/hospitals/signup', { method: 'POST', body });
        setAuth(data.access_token, 'hospital', data.hospital);
        showToast('Account created successfully!', 'success');
        loadHospitalDashboard();
        showScreen('screen-hospital-dashboard');
    } catch (err) {
        showToast(err.message || 'Signup failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleHospitalOTP(e) {
    e.preventDefault();
    const username = $('h-otp-username').value.trim();
    showLoading(true);
    try {
        await apiCall('/hospitals/otp/send', { method: 'POST', body: { username } });
        showToast('OTP sent to your email', 'success');
        $('hospital-otp-form').classList.add('hidden');
        $('hospital-otp-verify-form').classList.remove('hidden');
        $('h-otp-code').focus();
        startOTPTimer('h-otp-timer', 'h-otp-send-btn', username, 'hospital');
    } catch (err) {
        showToast(err.message || 'Failed to send OTP', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleHospitalOTPVerify(e) {
    e.preventDefault();
    const username = $('h-otp-username').value.trim();
    const otp = $('h-otp-code').value.trim();
    showLoading(true);
    try {
        const data = await apiCall('/hospitals/otp/verify', {
            method: 'POST',
            body: { username, otp_code: otp }
        });
        setAuth(data.access_token, 'hospital', data.hospital);
        showToast('Login successful!', 'success');
        loadHospitalDashboard();
        showScreen('screen-hospital-dashboard');
    } catch (err) {
        showToast(err.message || 'Invalid OTP', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleHospitalForgot(e) {
    e.preventDefault();
    const username = $('h-forgot-username').value.trim();
    const password = $('h-forgot-password').value;
    if (password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
    showLoading(true);
    try {
        await apiCall('/hospitals/password/reset', { method: 'POST', body: { username, new_password: password } });
        showToast('Password reset successfully!', 'success');
        showScreen('screen-hospital-login');
    } catch (err) {
        showToast(err.message || 'Reset failed', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== HOSPITAL DASHBOARD ====================
async function loadHospitalDashboard() {
    if (!currentUser) return;
    $('h-dashboard-name').textContent = currentUser.name || 'Hospital';
    $('h-dashboard-profession').textContent = currentUser.profession || 'Healthcare Provider';

    // Load stats from localStorage (since backend has no list endpoint)
    const patients = JSON.parse(localStorage.getItem('hospitalPatients') || '[]');
    const today = new Date().toDateString();
    const todayCount = patients.filter(p => new Date(p.createdAt).toDateString() === today).length;
    const remarks = JSON.parse(localStorage.getItem('hospitalRemarks') || '[]');

    $('h-stat-patients').textContent = patients.length;
    $('h-stat-today').textContent = todayCount;
    $('h-stat-remarks').textContent = remarks.length;

    renderRecentPatients();
}

function renderRecentPatients() {
    const container = $('h-recent-patients');
    if (recentPatients.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>No recent patients</p></div>';
        return;
    }
    container.innerHTML = recentPatients.slice(0, 10).map(p => `
        <div class="recent-item" onclick="viewHospitalPatient('${p.nin}')">
            <i class="fas fa-user-injured"></i>
            <div class="info"><h4>${p.name}</h4><p>NIN: ${p.nin}</p></div>
            <span class="time">${timeAgo(p.timestamp)}</span>
        </div>
    `).join('');
}

function addRecentPatient(patient) {
    recentPatients = recentPatients.filter(p => p.nin !== patient.nin);
    recentPatients.unshift({ ...patient, timestamp: new Date().toISOString() });
    localStorage.setItem('recentPatients', JSON.stringify(recentPatients.slice(0, 20)));
    renderRecentPatients();
}

function clearRecentPatients() {
    recentPatients = [];
    localStorage.removeItem('recentPatients');
    renderRecentPatients();
    showToast('Recent patients cleared', 'success');
}

// ==================== HOSPITAL PATIENT SEARCH ====================
async function searchHospitalPatient() {
    const nin = $('h-search-nin').value.trim();
    if (!nin || nin.length !== 11) { showToast('Please enter a valid 11-digit NIN', 'error'); return; }
    showLoading(true);
    try {
        const data = await apiCall('/hospitals/patients/' + encodeURIComponent(nin) + '/full');
        renderHospitalPatientResult(data);
        addRecentPatient({ nin: data.nin || nin, name: data.name || 'Unknown' });
    } catch (err) {
        showToast(err.message || 'Patient not found', 'error');
        $('h-search-results').innerHTML = '<div class="empty-state"><i class="fas fa-user-slash"></i><p>Patient not found. You can create a new record.</p><button class="btn-primary" style="margin-top:16px;" onclick="showScreen('screen-hospital-patient-create'); $('hp-create-nin').value = '' + nin + '';">Create Record</button></div>';
    } finally {
        showLoading(false);
    }
}

function renderHospitalPatientResult(data) {
    const container = $('h-search-results');
    const remarks = data.remarks || [];
    container.innerHTML = `
        <div class="patient-result-card">
            <h3>${data.name || 'Unknown'}</h3>
            <p class="meta">NIN: ${data.nin || 'N/A'} | ${data.gender || 'N/A'} | ${formatDate(data.date_of_birth)}</p>
            <div class="details">
                <div class="detail-row"><i class="fas fa-tint"></i><span>Blood Type: ${data.blood_type || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-phone"></i><span>${data.phone || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-map-marker-alt"></i><span>${data.address || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-allergies"></i><span>Allergies: ${data.allergies || 'None recorded'}</span></div>
                <div class="detail-row"><i class="fas fa-ambulance"></i><span>Emergency: ${data.emergency_contact || 'N/A'}</span></div>
            </div>
            <div class="actions">
                <button class="btn-primary btn-sm" onclick="showAddRemark('${data.nin}')"><i class="fas fa-comment-medical"></i> Add Remark</button>
                <button class="btn-outline btn-sm" onclick="viewHospitalPatientDetail('${data.nin}')"><i class="fas fa-eye"></i> Full Record</button>
            </div>
        </div>
        ${remarks.length > 0 ? `
        <div class="remarks-section" style="margin-top:20px;">
            <h3><i class="fas fa-history"></i> Medical History (${remarks.length})</h3>
            <div class="remarks-list">
                ${remarks.map(r => `
                    <div class="remark-card">
                        <div class="remark-header">
                            <span class="remark-author">${r.hospital_name || 'Hospital'}</span>
                            <span class="remark-date">${formatDate(r.created_at)} ${formatTime(r.created_at)}</span>
                        </div>
                        <div class="remark-text">${r.content}</div>
                    </div>
                `).join('')}
            </div>
        </div>` : ''}
    `;
}

function viewHospitalPatient(nin) {
    $('h-search-nin').value = nin;
    searchHospitalPatient();
}

function viewHospitalPatientDetail(nin) {
    showScreen('screen-hospital-patient-detail');
    // Load full detail
    showLoading(true);
    apiCall('/hospitals/patients/' + encodeURIComponent(nin) + '/full')
        .then(data => {
            const body = $('h-patient-detail-body');
            const remarks = data.remarks || [];
            body.innerHTML = `
                <div class="patient-detail-header">
                    <h3>${data.name || 'Unknown'}</h3>
                    <p>NIN: ${data.nin || 'N/A'} | ${data.gender || 'N/A'} | ${formatDate(data.date_of_birth)}</p>
                </div>
                <div class="patient-info-grid">
                    <div class="patient-info-row"><i class="fas fa-tint"></i><div><div class="label">Blood Type</div><div class="value">${data.blood_type || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-phone"></i><div><div class="label">Phone</div><div class="value">${data.phone || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-envelope"></i><div><div class="label">Email</div><div class="value">${data.email || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-map-marker-alt"></i><div><div class="label">Address</div><div class="value">${data.address || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-allergies"></i><div><div class="label">Allergies</div><div class="value">${data.allergies || 'None recorded'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-ambulance"></i><div><div class="label">Emergency Contact</div><div class="value">${data.emergency_contact || 'N/A'}</div></div></div>
                </div>
                <div class="remarks-section">
                    <h3>Medical Remarks (${remarks.length})</h3>
                    <div class="remarks-list">
                        ${remarks.length > 0 ? remarks.map(r => `
                            <div class="remark-card">
                                <div class="remark-header">
                                    <span class="remark-author">${r.hospital_name || 'Hospital'}</span>
                                    <span class="remark-date">${formatDate(r.created_at)}</span>
                                </div>
                                <div class="remark-text">${r.content}</div>
                            </div>
                        `).join('') : '<p style="color:var(--text-muted);font-size:14px;">No remarks yet.</p>'}
                    </div>
                </div>
                <button class="btn-primary" style="margin-top:20px;" onclick="showAddRemark('${nin}')"><i class="fas fa-comment-medical"></i> Add New Remark</button>
            `;
        })
        .catch(err => showToast(err.message, 'error'))
        .finally(() => showLoading(false));
}

// ==================== CREATE PATIENT ====================
async function handleCreatePatient(e) {
    e.preventDefault();
    const body = {
        nin: $('hp-create-nin').value.trim(),
        name: $('hp-create-name').value.trim(),
        date_of_birth: $('hp-create-dob').value || undefined,
        gender: $('hp-create-gender').value || undefined,
        blood_type: $('hp-create-blood').value || undefined,
        allergies: $('hp-create-allergies').value.trim() || undefined,
        phone: $('hp-create-phone').value.trim() || undefined,
        address: $('hp-create-address').value.trim() || undefined,
        emergency_contact: $('hp-create-emergency').value.trim() || undefined
    };
    showLoading(true);
    try {
        const data = await apiCall('/hospitals/patients', { method: 'POST', body });
        showToast('Patient record created!', 'success');
        // Save to local stats
        const patients = JSON.parse(localStorage.getItem('hospitalPatients') || '[]');
        patients.push({ ...data, createdAt: new Date().toISOString() });
        localStorage.setItem('hospitalPatients', JSON.stringify(patients));
        addRecentPatient({ nin: data.nin, name: data.name });
        showScreen('screen-hospital-dashboard');
        loadHospitalDashboard();
    } catch (err) {
        showToast(err.message || 'Failed to create patient', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== ADD REMARK ====================
function showAddRemark(nin) {
    $('h-remark-nin').value = nin;
    $('h-remark-content').value = '';
    showScreen('screen-hospital-add-remark');
}

async function handleAddRemark(e) {
    e.preventDefault();
    const nin = $('h-remark-nin').value;
    const content = $('h-remark-content').value.trim();
    if (!content) { showToast('Please enter a remark', 'error'); return; }
    showLoading(true);
    try {
        await apiCall('/hospitals/remarks', { method: 'POST', body: { nin, content } });
        showToast('Remark added successfully!', 'success');
        // Save to local stats
        const remarks = JSON.parse(localStorage.getItem('hospitalRemarks') || '[]');
        remarks.push({ content, createdAt: new Date().toISOString() });
        localStorage.setItem('hospitalRemarks', JSON.stringify(remarks));
        goBack();
        // Refresh if on detail screen
        if (currentScreen === 'screen-hospital-patient-detail') {
            viewHospitalPatientDetail(nin);
        }
    } catch (err) {
        showToast(err.message || 'Failed to add remark', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== HOSPITAL PROFILE ====================
async function loadHospitalProfile() {
    if (!currentUser) return;
    const body = $('h-profile-body');
    body.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar"><i class="fas fa-hospital"></i></div>
            <h3>${currentUser.name || 'Hospital'}</h3>
            <p>${currentUser.profession || 'Healthcare Provider'}</p>
        </div>
        <div class="profile-details">
            <div class="profile-detail-row"><i class="fas fa-user"></i><div class="info"><div class="label">Username</div><div class="value">${currentUser.username || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-envelope"></i><div class="info"><div class="label">Email</div><div class="value">${currentUser.email || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-phone"></i><div class="info"><div class="label">Phone</div><div class="value">${currentUser.phone || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-map-marker-alt"></i><div class="info"><div class="label">Address</div><div class="value">${currentUser.address || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-globe"></i><div class="info"><div class="label">Website</div><div class="value">${currentUser.website || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-clock"></i><div class="info"><div class="label">Office Hours</div><div class="value">${formatOfficeHours(currentUser.office_hours)}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-map-pin"></i><div class="info"><div class="label">Location</div><div class="value">${currentUser.latitude ? currentUser.latitude + ', ' + currentUser.longitude : 'Not set'}</div></div></div>
        </div>
        <div style="padding: 0 20px 20px;">
            <button class="btn-primary" style="margin-bottom: 12px;" onclick="showScreen('screen-hospital-location')"><i class="fas fa-location-arrow"></i> Update Location</button>
            <button class="btn-outline" style="margin-bottom: 12px;" onclick="showScreen('screen-settings')"><i class="fas fa-cog"></i> Settings</button>
            <button class="btn-outline" style="color: var(--accent); border-color: var(--accent);" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    `;
}

function formatOfficeHours(hours) {
    if (!hours) return 'N/A';
    if (typeof hours === 'string') return hours;
    const days = ['mon','tue','wed','thu','fri','sat','sun'];
    return days.map(d => d.toUpperCase() + ': ' + (hours[d] || 'Closed')).join(', ');
}

// ==================== LOCATION UPDATE ====================
async function updateHospitalLocation() {
    if (!navigator.geolocation) { showToast('Geolocation not supported', 'error'); return; }
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            try {
                await apiCall('/hospitals/location/update', { method: 'POST', body: { latitude: lat, longitude: lon } });
                $('h-current-coords').textContent = lat.toFixed(6) + ', ' + lon.toFixed(6);
                showToast('Location updated!', 'success');
                // Update currentUser
                if (currentUser) { currentUser.latitude = lat; currentUser.longitude = lon; }
            } catch (err) {
                showToast(err.message || 'Update failed', 'error');
            } finally {
                showLoading(false);
            }
        },
        (err) => { showToast('Location access denied', 'error'); showLoading(false); },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function saveManualLocation(role) {
    const lat = parseFloat($((role === 'hospital' ? 'h' : 'w') + '-lat-manual').value);
    const lon = parseFloat($((role === 'hospital' ? 'h' : 'w') + '-lon-manual').value);
    if (isNaN(lat) || isNaN(lon)) { showToast('Enter valid coordinates', 'error'); return; }
    showLoading(true);
    try {
        const endpoint = role === 'hospital' ? '/hospitals/location/update' : '/workers/location/update';
        await apiCall(endpoint, { method: 'POST', body: { latitude: lat, longitude: lon } });
        $((role === 'hospital' ? 'h' : 'w') + '-current-coords').textContent = lat.toFixed(6) + ', ' + lon.toFixed(6);
        showToast('Location saved!', 'success');
    } catch (err) {
        showToast(err.message || 'Failed to save', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== WORKER AUTH ====================
async function handleWorkerLogin(e) {
    e.preventDefault();
    const username = $('w-login-username').value.trim();
    const password = $('w-login-password').value;
    showLoading(true);
    try {
        const data = await apiCall('/workers/login', { method: 'POST', body: { username, password } });
        setAuth(data.access_token, 'worker', data.worker);
        showToast('Login successful!', 'success');
        loadWorkerDashboard();
        showScreen('screen-worker-dashboard');
    } catch (err) {
        showToast(err.message || 'Login failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleWorkerSignup(e) {
    e.preventDefault();
    const password = $('w-signup-password').value;
    const confirm = $('w-signup-confirm').value;
    if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }

    const body = {
        name: $('w-signup-name').value.trim(),
        username: $('w-signup-username').value.trim(),
        email: $('w-signup-email').value.trim(),
        phone: $('w-signup-phone').value.trim(),
        password: password,
        address: $('w-signup-address').value.trim(),
        profession: $('w-signup-profession').value,
        hospital_affiliation: $('w-signup-hospital').value.trim() || undefined,
        office_hours: getHoursObject('w-hours-')
    };
    showLoading(true);
    try {
        const data = await apiCall('/workers/signup', { method: 'POST', body });
        setAuth(data.access_token, 'worker', data.worker);
        showToast('Account created successfully!', 'success');
        loadWorkerDashboard();
        showScreen('screen-worker-dashboard');
    } catch (err) {
        showToast(err.message || 'Signup failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleWorkerOTP(e) {
    e.preventDefault();
    const username = $('w-otp-username').value.trim();
    showLoading(true);
    try {
        await apiCall('/workers/otp/send', { method: 'POST', body: { username } });
        showToast('OTP sent to your email', 'success');
        $('worker-otp-form').classList.add('hidden');
        $('worker-otp-verify-form').classList.remove('hidden');
        $('w-otp-code').focus();
        startOTPTimer('w-otp-timer', 'w-otp-send-btn', username, 'worker');
    } catch (err) {
        showToast(err.message || 'Failed to send OTP', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleWorkerOTPVerify(e) {
    e.preventDefault();
    const username = $('w-otp-username').value.trim();
    const otp = $('w-otp-code').value.trim();
    showLoading(true);
    try {
        const data = await apiCall('/workers/otp/verify', { method: 'POST', body: { username, otp_code: otp } });
        setAuth(data.access_token, 'worker', data.worker);
        showToast('Login successful!', 'success');
        loadWorkerDashboard();
        showScreen('screen-worker-dashboard');
    } catch (err) {
        showToast(err.message || 'Invalid OTP', 'error');
    } finally {
        showLoading(false);
    }
}

async function handleWorkerForgot(e) {
    e.preventDefault();
    const username = $('w-forgot-username').value.trim();
    const password = $('w-forgot-password').value;
    if (password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
    showLoading(true);
    try {
        await apiCall('/workers/password/reset', { method: 'POST', body: { username, new_password: password } });
        showToast('Password reset successfully!', 'success');
        showScreen('screen-worker-login');
    } catch (err) {
        showToast(err.message || 'Reset failed', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== WORKER DASHBOARD ====================
async function loadWorkerDashboard() {
    if (!currentUser) return;
    $('w-dashboard-name').textContent = currentUser.name || 'Worker';
    $('w-dashboard-profession').textContent = currentUser.profession || 'Medical Worker';
    renderRecentSearches();
}

function renderRecentSearches() {
    const container = $('w-recent-searches');
    if (recentSearches.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>No recent searches</p></div>';
        return;
    }
    container.innerHTML = recentSearches.slice(0, 10).map(s => `
        <div class="recent-item" onclick="viewWorkerPatient('${s.nin}')">
            <i class="fas fa-search"></i>
            <div class="info"><h4>${s.name}</h4><p>NIN: ${s.nin}</p></div>
            <span class="time">${timeAgo(s.timestamp)}</span>
        </div>
    `).join('');
}

function addRecentSearch(patient) {
    recentSearches = recentSearches.filter(s => s.nin !== patient.nin);
    recentSearches.unshift({ ...patient, timestamp: new Date().toISOString() });
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 20)));
    renderRecentSearches();
}

function clearRecentSearches() {
    recentSearches = [];
    localStorage.removeItem('recentSearches');
    renderRecentSearches();
    showToast('Recent searches cleared', 'success');
}

// ==================== WORKER PATIENT SEARCH ====================
async function searchWorkerPatient() {
    const nin = $('w-search-nin').value.trim();
    if (!nin || nin.length !== 11) { showToast('Please enter a valid 11-digit NIN', 'error'); return; }
    showLoading(true);
    try {
        const data = await apiCall('/workers/patients/' + encodeURIComponent(nin) + '/full');
        renderWorkerPatientResult(data);
        addRecentSearch({ nin: data.nin || nin, name: data.name || 'Unknown' });
    } catch (err) {
        showToast(err.message || 'Patient not found', 'error');
        $('w-search-results').innerHTML = '<div class="empty-state"><i class="fas fa-user-slash"></i><p>Patient not found in the database.</p></div>';
    } finally {
        showLoading(false);
    }
}

function renderWorkerPatientResult(data) {
    const container = $('w-search-results');
    const remarks = data.remarks || [];
    container.innerHTML = `
        <div class="patient-result-card">
            <h3>${data.name || 'Unknown'}</h3>
            <p class="meta">NIN: ${data.nin || 'N/A'} | ${data.gender || 'N/A'} | ${formatDate(data.date_of_birth)}</p>
            <div class="details">
                <div class="detail-row"><i class="fas fa-tint"></i><span>Blood Type: ${data.blood_type || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-phone"></i><span>${data.phone || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-map-marker-alt"></i><span>${data.address || 'N/A'}</span></div>
                <div class="detail-row"><i class="fas fa-allergies"></i><span>Allergies: ${data.allergies || 'None recorded'}</span></div>
                <div class="detail-row"><i class="fas fa-ambulance"></i><span>Emergency: ${data.emergency_contact || 'N/A'}</span></div>
            </div>
            <div class="actions">
                <button class="btn-outline btn-sm" onclick="viewWorkerPatientDetail('${data.nin}')"><i class="fas fa-eye"></i> View Full Record</button>
            </div>
        </div>
        ${remarks.length > 0 ? `
        <div class="remarks-section" style="margin-top:20px;">
            <h3><i class="fas fa-history"></i> Medical History (${remarks.length})</h3>
            <div class="remarks-list">
                ${remarks.map(r => `
                    <div class="remark-card">
                        <div class="remark-header">
                            <span class="remark-author">${r.hospital_name || 'Hospital'}</span>
                            <span class="remark-date">${formatDate(r.created_at)}</span>
                        </div>
                        <div class="remark-text">${r.content}</div>
                    </div>
                `).join('')}
            </div>
        </div>` : ''}
    `;
}

function viewWorkerPatient(nin) {
    $('w-search-nin').value = nin;
    searchWorkerPatient();
}

function viewWorkerPatientDetail(nin) {
    showScreen('screen-worker-patient-detail');
    showLoading(true);
    apiCall('/workers/patients/' + encodeURIComponent(nin) + '/full')
        .then(data => {
            const body = $('w-patient-detail-body');
            const remarks = data.remarks || [];
            body.innerHTML = `
                <div class="patient-detail-header">
                    <h3>${data.name || 'Unknown'}</h3>
                    <p>NIN: ${data.nin || 'N/A'} | ${data.gender || 'N/A'} | ${formatDate(data.date_of_birth)}</p>
                </div>
                <div class="patient-info-grid">
                    <div class="patient-info-row"><i class="fas fa-tint"></i><div><div class="label">Blood Type</div><div class="value">${data.blood_type || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-phone"></i><div><div class="label">Phone</div><div class="value">${data.phone || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-envelope"></i><div><div class="label">Email</div><div class="value">${data.email || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-map-marker-alt"></i><div><div class="label">Address</div><div class="value">${data.address || 'N/A'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-allergies"></i><div><div class="label">Allergies</div><div class="value">${data.allergies || 'None recorded'}</div></div></div>
                    <div class="patient-info-row"><i class="fas fa-ambulance"></i><div><div class="label">Emergency Contact</div><div class="value">${data.emergency_contact || 'N/A'}</div></div></div>
                </div>
                <div class="remarks-section">
                    <h3>Medical Remarks (${remarks.length})</h3>
                    <div class="remarks-list">
                        ${remarks.length > 0 ? remarks.map(r => `
                            <div class="remark-card">
                                <div class="remark-header">
                                    <span class="remark-author">${r.hospital_name || 'Hospital'}</span>
                                    <span class="remark-date">${formatDate(r.created_at)}</span>
                                </div>
                                <div class="remark-text">${r.content}</div>
                            </div>
                        `).join('') : '<p style="color:var(--text-muted);font-size:14px;">No remarks yet.</p>'}
                    </div>
                </div>
            `;
        })
        .catch(err => showToast(err.message, 'error'))
        .finally(() => showLoading(false));
}

async function updateWorkerLocation() {
    if (!navigator.geolocation) { showToast('Geolocation not supported', 'error'); return; }
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            try {
                await apiCall('/workers/location/update', { method: 'POST', body: { latitude: lat, longitude: lon } });
                $('w-current-coords').textContent = lat.toFixed(6) + ', ' + lon.toFixed(6);
                showToast('Location updated!', 'success');
                if (currentUser) { currentUser.latitude = lat; currentUser.longitude = lon; }
            } catch (err) {
                showToast(err.message || 'Update failed', 'error');
            } finally {
                showLoading(false);
            }
        },
        (err) => { showToast('Location access denied', 'error'); showLoading(false); },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function loadWorkerProfile() {
    if (!currentUser) return;
    const body = $('w-profile-body');
    body.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar"><i class="fas fa-user-md"></i></div>
            <h3>${currentUser.name || 'Worker'}</h3>
            <p>${currentUser.profession || 'Medical Worker'}</p>
        </div>
        <div class="profile-details">
            <div class="profile-detail-row"><i class="fas fa-user"></i><div class="info"><div class="label">Username</div><div class="value">${currentUser.username || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-envelope"></i><div class="info"><div class="label">Email</div><div class="value">${currentUser.email || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-phone"></i><div class="info"><div class="label">Phone</div><div class="value">${currentUser.phone || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-map-marker-alt"></i><div class="info"><div class="label">Address</div><div class="value">${currentUser.address || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-hospital"></i><div class="info"><div class="label">Hospital Affiliation</div><div class="value">${currentUser.hospital_affiliation || 'Independent'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-clock"></i><div class="info"><div class="label">Office Hours</div><div class="value">${formatOfficeHours(currentUser.office_hours)}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-map-pin"></i><div class="info"><div class="label">Location</div><div class="value">${currentUser.latitude ? currentUser.latitude + ', ' + currentUser.longitude : 'Not set'}</div></div></div>
        </div>
        <div style="padding: 0 20px 20px;">
            <button class="btn-primary" style="margin-bottom: 12px;" onclick="showScreen('screen-worker-location')"><i class="fas fa-location-arrow"></i> Update Location</button>
            <button class="btn-outline" style="margin-bottom: 12px;" onclick="showScreen('screen-settings')"><i class="fas fa-cog"></i> Settings</button>
            <button class="btn-outline" style="color: var(--accent); border-color: var(--accent);" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    `;
}

// ==================== PATIENT AUTH ====================
async function handlePatientLogin(e) {
    e.preventDefault();
    const username = $('p-login-username').value.trim();
    const password = $('p-login-password').value;
    showLoading(true);
    try {
        const data = await apiCall('/patients/login', { method: 'POST', body: { username, password } });
        setAuth(data.access_token, 'patient', data.patient);
        showToast('Login successful!', 'success');
        loadPatientDashboard();
        showScreen('screen-patient-dashboard');
    } catch (err) {
        showToast(err.message || 'Login failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function handlePatientSignup(e) {
    e.preventDefault();
    const password = $('p-signup-password').value;
    const confirm = $('p-signup-confirm').value;
    if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
    if (password.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }

    const body = {
        nin: $('p-signup-nin').value.trim(),
        name: $('p-signup-name').value.trim(),
        date_of_birth: $('p-signup-dob').value || undefined,
        gender: $('p-signup-gender').value || undefined,
        phone: $('p-signup-phone').value.trim(),
        email: $('p-signup-email').value.trim() || undefined,
        password: password,
        address: $('p-signup-address').value.trim() || undefined,
        emergency_contact: $('p-signup-emergency').value.trim() || undefined
    };
    showLoading(true);
    try {
        const data = await apiCall('/patients/signup', { method: 'POST', body });
        setAuth(data.access_token, 'patient', data.patient);
        showToast('Account created successfully!', 'success');
        loadPatientDashboard();
        showScreen('screen-patient-dashboard');
    } catch (err) {
        showToast(err.message || 'Signup failed', 'error');
    } finally {
        showLoading(false);
    }
}

async function loadPatientDashboard() {
    if (!currentUser) return;
    $('p-dashboard-name').textContent = currentUser.name || 'Patient';
    const card = $('p-profile-card');
    card.innerHTML = `
        <h3>${currentUser.name || 'Patient'}</h3>
        <p>NIN: ${currentUser.nin || 'N/A'}</p>
        <div class="nin-display">${currentUser.nin || 'N/A'}</div>
    `;
}

async function loadPatientProfile() {
    if (!currentUser) return;
    const body = $('p-profile-body');
    body.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar"><i class="fas fa-heartbeat"></i></div>
            <h3>${currentUser.name || 'Patient'}</h3>
            <p>NIN: ${currentUser.nin || 'N/A'}</p>
        </div>
        <div class="profile-details">
            <div class="profile-detail-row"><i class="fas fa-id-card"></i><div class="info"><div class="label">NIN</div><div class="value">${currentUser.nin || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-calendar"></i><div class="info"><div class="label">Date of Birth</div><div class="value">${formatDate(currentUser.date_of_birth)}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-venus-mars"></i><div class="info"><div class="label">Gender</div><div class="value">${currentUser.gender || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-tint"></i><div class="info"><div class="label">Blood Type</div><div class="value">${currentUser.blood_type || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-phone"></i><div class="info"><div class="label">Phone</div><div class="value">${currentUser.phone || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-envelope"></i><div class="info"><div class="label">Email</div><div class="value">${currentUser.email || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-map-marker-alt"></i><div class="info"><div class="label">Address</div><div class="value">${currentUser.address || 'N/A'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-allergies"></i><div class="info"><div class="label">Allergies</div><div class="value">${currentUser.allergies || 'None recorded'}</div></div></div>
            <div class="profile-detail-row"><i class="fas fa-ambulance"></i><div class="info"><div class="label">Emergency Contact</div><div class="value">${currentUser.emergency_contact || 'N/A'}</div></div></div>
        </div>
        <div style="padding: 0 20px 20px;">
            <button class="btn-outline" style="margin-bottom: 12px;" onclick="showScreen('screen-settings')"><i class="fas fa-cog"></i> Settings</button>
            <button class="btn-outline" style="color: var(--accent); border-color: var(--accent);" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    `;
}

// ==================== FIND CARE ====================
let findCareResults = [];
let currentFindCareLocation = null;

function updateFindCareNav() {
    const nav = $('find-care-nav');
    if (!nav) return;
    if (currentRole === 'hospital') {
        nav.innerHTML = `
            <button class="nav-item" onclick="showScreen('screen-hospital-dashboard')"><i class="fas fa-home"></i><span>Home</span></button>
            <button class="nav-item" onclick="showScreen('screen-hospital-patient-search')"><i class="fas fa-search"></i><span>Search</span></button>
            <button class="nav-item nav-add" onclick="showScreen('screen-hospital-patient-create')"><i class="fas fa-plus"></i></button>
            <button class="nav-item active" onclick="showScreen('screen-find-care')"><i class="fas fa-map-marker-alt"></i><span>Care</span></button>
            <button class="nav-item" onclick="showScreen('screen-hospital-profile')"><i class="fas fa-user"></i><span>Profile</span></button>
        `;
    } else if (currentRole === 'worker') {
        nav.innerHTML = `
            <button class="nav-item" onclick="showScreen('screen-worker-dashboard')"><i class="fas fa-home"></i><span>Home</span></button>
            <button class="nav-item" onclick="showScreen('screen-worker-patient-search')"><i class="fas fa-search"></i><span>Search</span></button>
            <button class="nav-item active" onclick="showScreen('screen-find-care')"><i class="fas fa-map-marker-alt"></i><span>Care</span></button>
            <button class="nav-item" onclick="showScreen('screen-worker-profile')"><i class="fas fa-user"></i><span>Profile</span></button>
        `;
    } else {
        nav.innerHTML = `
            <button class="nav-item" onclick="showScreen('screen-patient-dashboard')"><i class="fas fa-home"></i><span>Home</span></button>
            <button class="nav-item active" onclick="showScreen('screen-find-care')"><i class="fas fa-map-marker-alt"></i><span>Care</span></button>
            <button class="nav-item" onclick="showScreen('screen-patient-profile')"><i class="fas fa-user"></i><span>Profile</span></button>
        `;
    }
}

function toggleFindCareFilters() {
    $('find-care-filters').classList.toggle('open');
}

function updateRadiusLabel() {
    $('fc-radius-val').textContent = $('fc-radius').value;
}

async function useCurrentLocationForFindCare() {
    if (!navigator.geolocation) { showToast('Geolocation not supported', 'error'); return; }
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            currentFindCareLocation = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            showToast('Location acquired. Searching...', 'success');
            searchFindCare();
            showLoading(false);
        },
        (err) => { showToast('Location access denied', 'error'); showLoading(false); },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function searchFindCare() {
    let lat, lon;
    if (currentFindCareLocation) {
        lat = currentFindCareLocation.lat;
        lon = currentFindCareLocation.lon;
    } else {
        // Default to Lagos if no location
        lat = 6.5244;
        lon = 3.3792;
    }
    const radius = $('fc-radius').value;
    const profession = $('fc-profession').value;
    const openNow = $('fc-open-now').checked;

    showLoading(true);
    try {
        const data = await apiCall('/emergency/search?lat=' + lat + '&lon=' + lon + '&radius=' + radius);
        findCareResults = data.providers || data || [];

        // Client-side filtering
        if (profession) {
            findCareResults = findCareResults.filter(p => 
                (p.profession || '').toLowerCase().includes(profession.toLowerCase())
            );
        }
        if (openNow) {
            findCareResults = findCareResults.filter(p => isOpenNow(p.office_hours || {}));
        }

        renderFindCareResults();
    } catch (err) {
        showToast(err.message || 'Search failed', 'error');
        // Show demo data if API fails
        showDemoFindCareResults();
    } finally {
        showLoading(false);
    }
}

function showDemoFindCareResults() {
    // Demo data for when API is unavailable
    findCareResults = [
        { name: 'Lagos General Hospital', profession: 'Hospital', address: 'Broad Street, Lagos Island, Lagos', phone: '+234 801 234 5678', email: 'info@lagosgeneral.gov.ng', website: 'https://lagosgeneral.gov.ng', distance: 1.2, office_hours: { mon: '8:00 AM - 5:00 PM', tue: '8:00 AM - 5:00 PM', wed: '8:00 AM - 5:00 PM', thu: '8:00 AM - 5:00 PM', fri: '8:00 AM - 5:00 PM', sat: '9:00 AM - 2:00 PM', sun: 'Closed' }, latitude: 6.5244, longitude: 3.3792 },
        { name: 'Dr. Adebayo Clinic', profession: 'Doctor', address: '15 Allen Avenue, Ikeja, Lagos', phone: '+234 802 345 6789', email: 'dr.adebayo@clinic.ng', website: '', distance: 2.5, office_hours: { mon: '9:00 AM - 6:00 PM', tue: '9:00 AM - 6:00 PM', wed: '9:00 AM - 6:00 PM', thu: '9:00 AM - 6:00 PM', fri: '9:00 AM - 6:00 PM', sat: '10:00 AM - 3:00 PM', sun: 'Closed' }, latitude: 6.6018, longitude: 3.3515 },
        { name: 'Ikeja Pharmacy', profession: 'Pharmacist', address: '22 Obafemi Awolowo Way, Ikeja, Lagos', phone: '+234 803 456 7890', email: 'ikeja@pharmacy.ng', website: '', distance: 3.1, office_hours: { mon: '8:00 AM - 9:00 PM', tue: '8:00 AM - 9:00 PM', wed: '8:00 AM - 9:00 PM', thu: '8:00 AM - 9:00 PM', fri: '8:00 AM - 9:00 PM', sat: '8:00 AM - 9:00 PM', sun: '10:00 AM - 6:00 PM' }, latitude: 6.6145, longitude: 3.3579 },
        { name: 'Midwife Grace Center', profession: 'Midwife', address: '7 Yaba Road, Yaba, Lagos', phone: '+234 804 567 8901', email: 'grace@midwife.ng', website: '', distance: 4.8, office_hours: { mon: '24 Hours', tue: '24 Hours', wed: '24 Hours', thu: '24 Hours', fri: '24 Hours', sat: '24 Hours', sun: '24 Hours' }, latitude: 6.5056, longitude: 3.3792 },
        { name: 'Dental Care Plus', profession: 'Dentist', address: '45 Admiralty Way, Lekki, Lagos', phone: '+234 805 678 9012', email: 'info@dentalcare.ng', website: 'https://dentalcare.ng', distance: 8.3, office_hours: { mon: '9:00 AM - 5:00 PM', tue: '9:00 AM - 5:00 PM', wed: '9:00 AM - 5:00 PM', thu: '9:00 AM - 5:00 PM', fri: '9:00 AM - 5:00 PM', sat: '10:00 AM - 2:00 PM', sun: 'Closed' }, latitude: 6.4478, longitude: 3.4723 }
    ];
    renderFindCareResults();
}

function renderFindCareResults() {
    const container = $('fc-results');
    if (findCareResults.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-search-location"></i><p>No providers found in this area.</p><p class="sub">Try increasing the search radius or changing filters.</p></div>';
        return;
    }
    container.innerHTML = findCareResults.map(p => {
        const hours = p.office_hours || {};
        const open = isOpenNow(hours);
        const dist = p.distance ? (typeof p.distance === 'number' ? p.distance.toFixed(1) + ' km' : p.distance) : 'Distance unknown';
        return `
            <div class="provider-card">
                <div class="provider-header">
                    <h3>${p.name || 'Unknown'}</h3>
                    <span class="provider-profession">${p.profession || 'Provider'}</span>
                </div>
                <div class="provider-distance"><i class="fas fa-location-arrow"></i> ${dist}</div>
                <div class="provider-info">
                    <div class="provider-info-row"><i class="fas fa-map-marker-alt"></i><span>${p.address || 'Address not available'}</span></div>
                    <div class="provider-info-row"><i class="fas fa-phone"></i><span>${p.phone || 'N/A'}</span></div>
                    <div class="provider-info-row"><i class="fas fa-envelope"></i><span>${p.email || 'N/A'}</span></div>
                    ${p.website ? `<div class="provider-info-row"><i class="fas fa-globe"></i><span><a href="${p.website}" target="_blank">${p.website}</a></span></div>` : ''}
                </div>
                <div class="provider-hours">
                    <span class="${open ? 'open-now' : 'closed'}">${open ? '<i class="fas fa-check-circle"></i> Open Now' : '<i class="fas fa-times-circle"></i> Closed'}</span>
                    ${hours.mon ? `<span>Mon: ${hours.mon}</span>` : ''}
                    ${hours.tue ? `<span>Tue: ${hours.tue}</span>` : ''}
                    ${hours.wed ? `<span>Wed: ${hours.wed}</span>` : ''}
                    ${hours.thu ? `<span>Thu: ${hours.thu}</span>` : ''}
                    ${hours.fri ? `<span>Fri: ${hours.fri}</span>` : ''}
                    ${hours.sat ? `<span>Sat: ${hours.sat}</span>` : ''}
                    ${hours.sun ? `<span>Sun: ${hours.sun}</span>` : ''}
                </div>
                <div class="provider-actions">
                    ${p.phone ? `<a href="tel:${p.phone}" class="btn-call"><i class="fas fa-phone"></i> Call</a>` : ''}
                    ${p.latitude ? `<a href="https://www.google.com/maps?q=${p.latitude},${p.longitude}" target="_blank" class="btn-map"><i class="fas fa-map-marked-alt"></i> Map</a>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// ==================== CHATBOT ====================
function handleChatKeypress(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = $('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addChatMessage(msg, 'user');
    processChatResponse(msg);
}

function sendChatSuggestion(text) {
    addChatMessage(text, 'user');
    processChatResponse(text);
}

function addChatMessage(text, sender) {
    const container = $('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-message ' + sender;
    div.innerHTML = `
        <div class="chat-avatar"><i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i></div>
        <div class="chat-bubble">${text}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function processChatResponse(msg) {
    const lower = msg.toLowerCase();
    let response = '';
    let suggestions = [];

    if (lower.includes('doctor') || lower.includes('find') || lower.includes('care') || lower.includes('near')) {
        response = 'I can help you find medical professionals near you. Would you like to open the Find Care feature?';
        suggestions = ['Open Find Care', 'Search by profession', 'Emergency help'];
    } else if (lower.includes('patient') || lower.includes('search') || lower.includes('nin')) {
        response = 'To search for a patient, you need their 11-digit NIN (National Identification Number). This ensures secure and accurate record access. Would you like to go to the search screen?';
        suggestions = ['Go to Search', 'What is NIN?', 'How to get NIN'];
    } else if (lower.includes('nin')) {
        response = 'NIN stands for National Identification Number. It is a unique 11-digit number assigned to every Nigerian citizen by NIMC. It is used for secure patient identification in Thrivelink.';
        suggestions = ['How to get NIN', 'Search patient', 'Back to menu'];
    } else if (lower.includes('login') || lower.includes('sign') || lower.includes('account')) {
        response = 'You can login with your username and password, or use OTP for added security. If you forgot your password, use the reset feature.';
        suggestions = ['Forgot password', 'Create account', 'OTP login'];
    } else if (lower.includes('contact') || lower.includes('support') || lower.includes('help')) {
        response = 'For support, please contact EML Tech Studio at emltechstudio.site or use the contact form on the Thrivelink website.';
        suggestions = ['Visit website', 'Report bug', 'Feature request'];
    } else if (lower.includes('emergency') || lower.includes('urgent')) {
        response = 'For emergencies, please call the nearest hospital directly or dial Nigeria emergency services at 112. You can also use Find Care to locate the nearest open facility.';
        suggestions = ['Open Find Care', 'Emergency numbers', 'First aid tips'];
    } else if (lower.includes('worker') || lower.includes('read only')) {
        response = 'Medical workers have read-only access to patient records for security and privacy. Only registered hospitals can create and modify patient records.';
        suggestions = ['Worker features', 'Hospital features', 'Privacy policy'];
    } else if (lower.includes('location') || lower.includes('gps')) {
        response = 'You can update your location in your profile settings. This helps patients find you when they search for care nearby.';
        suggestions = ['Update location', 'Find Care', 'Privacy settings'];
    } else if (lower.includes('version') || lower.includes('update') || lower.includes('new')) {
        response = 'You are using Thrivelink Health v2.0 MVP. We are continuously improving the platform with new features and better security.';
        suggestions = ['Changelog', 'Feedback', 'Back to menu'];
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        response = 'Hello! Welcome to Thrivelink Health. I am your virtual assistant. How can I help you today?';
        suggestions = ['Find care', 'Search patient', 'Contact support'];
    } else {
        response = 'I am a basic assistant for now. I can help you navigate the app, find care, or answer common questions. For complex queries, please contact support.';
        suggestions = ['Find care', 'Search patient', 'Contact support'];
    }

    setTimeout(() => {
        addChatBotResponse(response, suggestions);
    }, 500);
}

function addChatBotResponse(text, suggestions) {
    const container = $('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-message bot';
    let sugHtml = '';
    if (suggestions && suggestions.length > 0) {
        sugHtml = '<div class="chat-suggestions">' + suggestions.map(s => 
            `<button onclick="sendChatSuggestion('${s}')">${s}</button>`
        ).join('') + '</div>';
    }
    div.innerHTML = `
        <div class="chat-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-bubble"><p>${text}</p>${sugHtml}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// ==================== SETTINGS ====================
function toggleDarkMode() {
    const enabled = $('setting-darkmode').checked;
    if (enabled) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', enabled);
}

// ==================== OTP TIMER ====================
function startOTPTimer(timerId, btnId, username, role) {
    let seconds = 60;
    const timerEl = $(timerId);
    const btnEl = $(btnId);
    if (btnEl) btnEl.disabled = true;

    const interval = setInterval(() => {
        seconds--;
        if (timerEl) timerEl.textContent = 'Resend in ' + seconds + 's';
        if (seconds <= 0) {
            clearInterval(interval);
            if (timerEl) timerEl.textContent = 'Resend OTP';
            if (timerEl) timerEl.style.cursor = 'pointer';
            if (timerEl) timerEl.onclick = () => resendOTP(username, role, timerId, btnId);
            if (btnEl) btnEl.disabled = false;
        }
    }, 1000);
}

async function resendOTP(username, role, timerId, btnId) {
    const endpoint = role === 'hospital' ? '/hospitals/otp/send' : '/workers/otp/send';
    showLoading(true);
    try {
        await apiCall(endpoint, { method: 'POST', body: { username } });
        showToast('OTP resent!', 'success');
        startOTPTimer(timerId, btnId, username, role);
    } catch (err) {
        showToast(err.message || 'Failed to resend', 'error');
    } finally {
        showLoading(false);
    }
}

// ==================== PROFILE SCREEN LOADERS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Hook profile screens to load data when shown
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            if (m.type === 'attributes' && m.attributeName === 'class') {
                const el = m.target;
                if (el.classList.contains('active')) {
                    if (el.id === 'screen-hospital-profile') loadHospitalProfile();
                    if (el.id === 'screen-worker-profile') loadWorkerProfile();
                    if (el.id === 'screen-patient-profile') loadPatientProfile();
                    if (el.id === 'screen-hospital-dashboard') loadHospitalDashboard();
                    if (el.id === 'screen-worker-dashboard') loadWorkerDashboard();
                    if (el.id === 'screen-patient-dashboard') loadPatientDashboard();
                }
            }
        });
    });
    document.querySelectorAll('.screen').forEach(s => observer.observe(s, { attributes: true }));
});
