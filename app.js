/**
 * Driver License Hub - Generator & DMV Interactive Guide
 */

// Global State
let currentSide = 'front'; // 'front' or 'back'
let hologramActive = false;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let customSignatureDataUrl = null;

// Preset Configurations
const PRESETS = {
  california: {
    state: 'California',
    headerBg: 'bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900',
    headerBorder: 'border-amber-400',
    headerText: 'CALIFORNIA',
    licenseType: 'DRIVER LICENSE',
    accentColor: '#d97706',
    dlnPrefix: 'D',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    firstName: 'Jane Alexis',
    lastName: 'Doe',
    address: '1042 Sunset Blvd',
    citystate: 'Los Angeles, CA 90026',
    sex: 'F',
    hgt: `5'-06"`,
    eyes: 'BRN',
    dln: 'D7482910'
  },
  newyork: {
    state: 'New York',
    headerBg: 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950',
    headerBorder: 'border-orange-500',
    headerText: 'NEW YORK STATE',
    licenseType: 'DRIVER LICENSE',
    accentColor: '#f97316',
    dlnPrefix: 'NY',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    firstName: 'Marcus Anthony',
    lastName: 'Sterling',
    address: '742 Broadway Ave Apt 4B',
    citystate: 'New York, NY 10003',
    sex: 'M',
    hgt: `5'-11"`,
    eyes: 'BLU',
    dln: '849204819'
  },
  texas: {
    state: 'Texas',
    headerBg: 'bg-gradient-to-r from-red-700 via-slate-800 to-blue-900',
    headerBorder: 'border-red-500',
    headerText: 'TEXAS',
    licenseType: 'DRIVER LICENSE',
    accentColor: '#ef4444',
    dlnPrefix: 'TX',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    firstName: 'Travis Cole',
    lastName: 'Houston',
    address: '3814 Pecan Valley Dr',
    citystate: 'Austin, TX 78701',
    sex: 'M',
    hgt: `6'-01"`,
    eyes: 'HAZ',
    dln: '29481940'
  },
  florida: {
    state: 'Florida',
    headerBg: 'bg-gradient-to-r from-teal-700 via-emerald-800 to-green-900',
    headerBorder: 'border-amber-300',
    headerText: 'FLORIDA',
    licenseType: 'DRIVER LICENSE',
    accentColor: '#10b981',
    dlnPrefix: 'F',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    firstName: 'Elena Maria',
    lastName: 'Vance',
    address: '502 Ocean Breeze Way',
    citystate: 'Miami, FL 33139',
    sex: 'F',
    hgt: `5'-04"`,
    eyes: 'GRN',
    dln: 'V5209381'
  },
  junior: {
    state: 'Junior Driver',
    headerBg: 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600',
    headerBorder: 'border-yellow-300',
    headerText: 'KIDS DRIVER PERMIT',
    licenseType: 'BICYCLE & GO-KART LICENSE',
    accentColor: '#a855f7',
    dlnPrefix: 'KID',
    photo: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=400&q=80',
    firstName: 'Leo Tommy',
    lastName: 'Sparks',
    address: '12 Adventure Lane',
    citystate: 'Toytown, CA 90210',
    sex: 'M',
    hgt: `4'-02"`,
    eyes: 'BRN',
    dln: 'JR-2024-99'
  },
  pet: {
    state: 'Pet License',
    headerBg: 'bg-gradient-to-r from-rose-500 via-amber-500 to-pink-600',
    headerBorder: 'border-pink-300',
    headerText: 'OFFICIAL PET PERMIT',
    licenseType: 'ZOOMIES & WALKS CLASS',
    accentColor: '#ec4899',
    dlnPrefix: 'BARK',
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
    firstName: 'Buster Charlie',
    lastName: 'Barker',
    address: '99 Good Boy Blvd',
    citystate: 'Barksville, NY 10001',
    sex: 'M',
    hgt: `1'-08"`,
    eyes: 'BRN',
    dln: 'WOOF-7729'
  }
};

// Sample photo avatars list for cycling
const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
];
let samplePhotoIndex = 0;

// Quiz Database
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When approaching an intersection with a flashing red traffic signal, what must you do?",
    options: [
      "Slow down and yield to oncoming traffic without stopping",
      "Treat it as a stop sign: come to a complete stop and proceed when safe",
      "Accelerate to clear the intersection quickly",
      "Stop only if pedestrians are in the crosswalk"
    ],
    correct: 1,
    explanation: "A flashing red traffic light has the exact same meaning as a stop sign. You must come to a full stop and yield the right-of-way before proceeding."
  },
  {
    id: 2,
    question: "What is the recommended safe following distance behind the vehicle in front of you under normal driving conditions?",
    options: [
      "1 second",
      "At least 3 to 4 seconds",
      "1 car length for every 50 mph",
      "10 feet"
    ],
    correct: 1,
    explanation: "The 3 to 4-second rule provides sufficient reaction time and stopping distance under normal driving conditions on dry pavement."
  },
  {
    id: 3,
    question: "When a school bus has stopped with its red lights flashing and stop arm extended, traffic traveling in both directions must:",
    options: [
      "Slow down to 15 mph and proceed with caution",
      "Stop at least 20 feet away until the red lights stop flashing (unless on a divided highway)",
      "Honk to notify students before passing",
      "Stop only if children are actively crossing"
    ],
    correct: 1,
    explanation: "Drivers approaching from either direction must stop when a school bus displays flashing red lights, unless traveling in the opposite direction on a divided multi-lane highway."
  },
  {
    id: 4,
    question: "What is the legal blood alcohol concentration (BAC) limit for drivers 21 and older in most US states?",
    options: [
      "0.02%",
      "0.05%",
      "0.08%",
      "0.10%"
    ],
    correct: 2,
    explanation: "In all 50 states (except Utah which is 0.05%), it is illegal to operate a motor vehicle with a BAC of 0.08% or higher."
  },
  {
    id: 5,
    question: "When you want to merge into highway traffic or change lanes, you should always check:",
    options: [
      "Only the rearview mirror",
      "Only the side mirrors",
      "Both side mirrors, rearview mirror, and over your shoulder (blind spot)",
      "Just honk before moving over"
    ],
    correct: 2,
    explanation: "Mirrors have blind spots that can conceal an entire car or motorcycle. You must visually look over your shoulder before changing lanes."
  },
  {
    id: 6,
    question: "What does an upside-down triangle road sign mean?",
    options: [
      "Stop completely",
      "Yield the right-of-way to other vehicles and pedestrians",
      "No passing zone",
      "School zone ahead"
    ],
    correct: 1,
    explanation: "An inverted triangle sign always signifies 'YIELD', requiring you to slow down and give way to traffic on the intersecting roadway."
  },
  {
    id: 7,
    question: "When driving in dense fog or heavy rain, which headlights should you use?",
    options: [
      "High beams for maximum illumination",
      "Low beam headlights",
      "Parking lights only",
      "Hazard lights while speeding up"
    ],
    correct: 1,
    explanation: "High beams reflect light directly back into your eyes off water droplets and fog, blinding you. Always use low beams or fog lights."
  },
  {
    id: 8,
    question: "If your vehicle begins to skid or hydroplane, what is the best immediate action?",
    options: [
      "Slam on the brakes as hard as possible",
      "Ease your foot off the accelerator and steer gently in the direction you want the front wheels to go",
      "Pull the emergency handbrake instantly",
      "Accelerate to regain tire grip"
    ],
    correct: 1,
    explanation: "Avoid hard braking, which locks wheels and prolongs skids. Ease off the gas pedal smoothly and steer in the intended direction of travel."
  },
  {
    id: 9,
    question: "At an uncontrolled 4-way intersection (no signs or lights), who has the right-of-way if two cars arrive simultaneously?",
    options: [
      "The vehicle on the left",
      "The vehicle on the right",
      "The faster-moving vehicle",
      "The vehicle making a left turn"
    ],
    correct: 1,
    explanation: "When two vehicles reach an uncontrolled intersection at the same time, the driver on the left must yield to the vehicle on their right."
  },
  {
    id: 10,
    question: "What does a solid yellow line on your side of the center road line indicate?",
    options: [
      "Passing is permitted at any time",
      "Passing is prohibited on your side",
      "You are entering a parking zone",
      "The speed limit is under 25 mph"
    ],
    correct: 1,
    explanation: "A solid yellow line on your side of the road means passing is prohibited because visibility or oncoming traffic makes it unsafe."
  }
];

let quizAnswers = {}; // { questionId: selectedIndex }

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initBarcode();
  initSignaturePad();
  renderQuiz();
  updateCardData();
});

// Tab Navigation
function switchTab(tabId) {
  const tabs = ['generator', 'guide', 'quiz'];
  tabs.forEach(t => {
    const section = document.getElementById(`section-${t}`);
    const btn = document.getElementById(`tab-${t}`);
    if (t === tabId) {
      section.classList.remove('hidden');
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('text-slate-300', 'hover:text-white', 'hover:bg-slate-700/50');
    } else {
      section.classList.add('hidden');
      btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.add('text-slate-300', 'hover:text-white', 'hover:bg-slate-700/50');
    }
  });

  // Re-create lucide icons in newly visible content
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

// 3D Card Flipping
function flipCard() {
  const card = document.getElementById('license-card-3d');
  const indicator = document.getElementById('preview-face-indicator');
  
  if (currentSide === 'front') {
    card.classList.add('flipped');
    currentSide = 'back';
    indicator.textContent = 'Back Side';
  } else {
    card.classList.remove('flipped');
    currentSide = 'front';
    indicator.textContent = 'Front Side';
  }
}

// Hologram Overlay Toggle
function toggleHologram() {
  hologramActive = !hologramActive;
  const holoLayer = document.getElementById('holo-layer');
  const holoBtn = document.getElementById('btn-holo');
  
  if (hologramActive) {
    holoLayer.classList.remove('opacity-0');
    holoLayer.classList.add('opacity-100');
    holoBtn.classList.add('bg-blue-600/30', 'border-blue-500/50', 'text-blue-300');
  } else {
    holoLayer.classList.remove('opacity-100');
    holoLayer.classList.add('opacity-0');
    holoBtn.classList.remove('bg-blue-600/30', 'border-blue-500/50', 'text-blue-300');
  }
}

// Apply Preset
function applyPreset(name) {
  const preset = PRESETS[name];
  if (!preset) return;

  document.getElementById('input-state').value = preset.state;
  document.getElementById('input-firstname').value = preset.firstName;
  document.getElementById('input-lastname').value = preset.lastName;
  document.getElementById('input-address').value = preset.address;
  document.getElementById('input-citystate').value = preset.citystate;
  document.getElementById('input-dln').value = preset.dln;
  document.getElementById('input-sex').value = preset.sex;
  document.getElementById('input-hgt').value = preset.hgt;
  document.getElementById('input-eyes').value = preset.eyes;
  document.getElementById('input-sig-text').value = `${preset.firstName} ${preset.lastName}`;
  
  // Set photo
  const photoImg = document.getElementById('card-photo-img');
  const ghostImg = document.getElementById('card-ghost-img');
  photoImg.src = preset.photo;
  ghostImg.src = preset.photo;

  // Header update
  const cardHeader = document.getElementById('card-header');
  cardHeader.className = `relative z-10 px-4 py-2.5 ${preset.headerBg} text-white flex items-center justify-between border-b-2 ${preset.headerBorder}`;
  document.getElementById('card-state-name').textContent = preset.headerText;
  document.getElementById('card-license-type').textContent = preset.licenseType;

  updateCardData();
  updateBarcode(preset.dln);
}

// State Change Handler
function handleStateChange(val) {
  const stateNameElem = document.getElementById('card-state-name');
  stateNameElem.textContent = val.toUpperCase();
  
  // Update header styling based on state
  const header = document.getElementById('card-header');
  if (val === 'California') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between border-b-2 border-amber-400';
  } else if (val === 'New York') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white flex items-center justify-between border-b-2 border-orange-500';
  } else if (val === 'Texas') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-red-700 via-slate-800 to-blue-900 text-white flex items-center justify-between border-b-2 border-red-500';
  } else if (val === 'Florida') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-teal-700 via-emerald-800 to-green-900 text-white flex items-center justify-between border-b-2 border-amber-300';
  } else if (val === 'Junior Driver') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white flex items-center justify-between border-b-2 border-yellow-300';
  } else if (val === 'Pet License') {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-rose-500 via-amber-500 to-pink-600 text-white flex items-center justify-between border-b-2 border-pink-300';
  } else {
    header.className = 'relative z-10 px-4 py-2.5 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white flex items-center justify-between border-b-2 border-blue-400';
  }
}

// Update License Type
function updateLicenseType(val) {
  document.getElementById('card-license-type').textContent = val;
}

// Toggles for REAL ID, Donor, Watermark
function toggleRealID(checked) {
  document.getElementById('real-id-star').style.display = checked ? 'flex' : 'none';
}

function toggleDonor(checked) {
  document.getElementById('organ-donor-badge').style.display = checked ? 'flex' : 'none';
}

function toggleWatermark(checked) {
  document.getElementById('watermark-overlay').style.display = checked ? 'flex' : 'none';
}

// Format dates from YYYY-MM-DD to MM/DD/YYYY
function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}/${parts[0]}`;
  }
  return dateStr;
}

// Real-time Update of Card Data
function updateCardData() {
  const firstName = document.getElementById('input-firstname').value || 'Jane Alexis';
  const lastName = document.getElementById('input-lastname').value || 'Doe';
  const address = document.getElementById('input-address').value || '1042 Sunset Blvd';
  const citystate = document.getElementById('input-citystate').value || 'Los Angeles, CA 90026';
  const dln = document.getElementById('input-dln').value || 'D1234567';
  const dob = formatDate(document.getElementById('input-dob').value) || '04/18/1998';
  const exp = formatDate(document.getElementById('input-exp').value) || '12/04/2029';
  const iss = formatDate(document.getElementById('input-iss').value) || '12/04/2024';
  const sex = document.getElementById('input-sex').value || 'F';
  const hgt = document.getElementById('input-hgt').value || `5'-06"`;
  const eyes = document.getElementById('input-eyes').value || 'BRN';

  document.getElementById('card-fullname').textContent = `${lastName.toUpperCase()}, ${firstName.toUpperCase()}`;
  document.getElementById('card-address').textContent = address.toUpperCase();
  document.getElementById('card-citystate').textContent = citystate.toUpperCase();
  document.getElementById('card-dln').textContent = dln.toUpperCase();
  document.getElementById('card-exp').textContent = exp;
  document.getElementById('card-iss').textContent = iss;
  document.getElementById('card-dob').textContent = dob;
  document.getElementById('card-sex').textContent = sex;
  document.getElementById('card-hgt').textContent = hgt;
  document.getElementById('card-eyes').textContent = eyes;

  // Also update signature text if not using drawn canvas signature
  if (!customSignatureDataUrl) {
    const sigText = document.getElementById('input-sig-text').value;
    document.getElementById('card-signature-text').textContent = sigText || `${firstName} ${lastName}`;
  }

  // Barcode update
  updateBarcode(dln);
}

// Update Signature Text
function updateSignatureText(val) {
  customSignatureDataUrl = null;
  document.getElementById('card-signature-img').style.display = 'none';
  const sigTextElem = document.getElementById('card-signature-text');
  sigTextElem.style.display = 'block';
  sigTextElem.textContent = val || 'Sign Here';
}

// Random Sample Generator
function randomizeData() {
  const firstNames = ['Sophia', 'Liam', 'Emma', 'Noah', 'Olivia', 'James', 'Ava', 'Lucas', 'Mia', 'Ethan', 'Chloe', 'Daniel'];
  const lastNames = ['Miller', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
  const streets = ['452 Oak Ridge Ln', '710 Maple Valley Dr', '1288 Pinecrest Ave', '904 Cedar Heights Way', '315 Elm Street'];
  const cities = [
    { city: 'San Diego', state: 'CA', zip: '92101' },
    { city: 'Dallas', state: 'TX', zip: '75201' },
    { city: 'Orlando', state: 'FL', zip: '32801' },
    { city: 'Seattle', state: 'WA', zip: '98101' },
    { city: 'Chicago', state: 'IL', zip: '60601' }
  ];

  const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomStreet = streets[Math.floor(Math.random() * streets.length)];
  const randomCityObj = cities[Math.floor(Math.random() * cities.length)];

  document.getElementById('input-firstname').value = randomFirst;
  document.getElementById('input-lastname').value = randomLast;
  document.getElementById('input-address').value = randomStreet;
  document.getElementById('input-citystate').value = `${randomCityObj.city}, ${randomCityObj.state} ${randomCityObj.zip}`;
  document.getElementById('input-sig-text').value = `${randomFirst} ${randomLast}`;
  
  generateRandomDLN();
  cycleSamplePhoto();
  updateCardData();
}

// Generate Random DLN
function generateRandomDLN() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters.charAt(Math.floor(Math.random() * letters.length));
  const num = Math.floor(1000000 + Math.random() * 9000000);
  const newDLN = `${letter}${num}`;
  document.getElementById('input-dln').value = newDLN;
  updateCardData();
}

// Cycle through sample headshots
function cycleSamplePhoto() {
  samplePhotoIndex = (samplePhotoIndex + 1) % SAMPLE_PHOTOS.length;
  const newUrl = SAMPLE_PHOTOS[samplePhotoIndex];
  document.getElementById('card-photo-img').src = newUrl;
  document.getElementById('card-ghost-img').src = newUrl;
}

// Handle Photo Upload
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    document.getElementById('card-photo-img').src = dataUrl;
    document.getElementById('card-ghost-img').src = dataUrl;
  };
  reader.readAsDataURL(file);
}

// Barcode rendering with JsBarcode
function initBarcode() {
  const dln = document.getElementById('input-dln').value || 'D1234567';
  updateBarcode(dln);
}

function updateBarcode(text) {
  try {
    if (typeof JsBarcode === 'function') {
      JsBarcode('#barcode-1d', text, {
        format: "CODE128",
        width: 1.5,
        height: 38,
        displayValue: false,
        margin: 0,
        background: "transparent",
        lineColor: "#1e293b"
      });
    }
  } catch (err) {
    console.warn("Barcode rendering fallback:", err);
  }
}

// ==================== SIGNATURE CANVAS PAD ====================
function initSignaturePad() {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDraw(e) {
    if (isDrawing) {
      isDrawing = false;
    }
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);
}

function openSignatureModal() {
  document.getElementById('sig-modal').classList.remove('hidden');
  clearSignatureCanvas();
}

function closeSignatureModal() {
  document.getElementById('sig-modal').classList.add('hidden');
}

function clearSignatureCanvas() {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveSignatureCanvas() {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;
  
  // Convert canvas to transparent PNG
  customSignatureDataUrl = canvas.toDataURL('image/png');
  
  const sigImg = document.getElementById('card-signature-img');
  const sigText = document.getElementById('card-signature-text');
  
  sigImg.src = customSignatureDataUrl;
  sigImg.style.display = 'block';
  sigText.style.display = 'none';
  
  closeSignatureModal();
}

// ==================== EXPORT & DOWNLOAD ====================
async function downloadCard(side) {
  // If user requested back but card is front, ensure element is ready
  const targetId = side === 'back' ? 'card-back' : 'card-front';
  const element = document.getElementById(targetId);
  
  if (!element) return;

  try {
    // Show quick feedback
    const originalTransform = element.style.transform;
    element.style.transform = 'none'; // reset backface flip during canvas snapshot

    const canvas = await html2canvas(element, {
      scale: 3, // 3x high resolution for crisp print quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    });

    element.style.transform = originalTransform;

    const link = document.createElement('a');
    const dln = document.getElementById('input-dln').value || 'License';
    link.download = `driver_license_${side}_${dln}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error("Export error:", err);
    alert("Unable to generate image export. You can also print the card using the Print button.");
  }
}

function printCard() {
  window.print();
}

// ==================== CHECKLIST LOGIC ====================
function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.chk-item');
  let checkedCount = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const progressBadge = document.getElementById('checklist-progress');
  progressBadge.textContent = `${checkedCount} / ${checkboxes.length} Ready`;

  if (checkedCount === checkboxes.length) {
    progressBadge.className = 'text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  } else {
    progressBadge.className = 'text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30';
  }
}

// ==================== QUIZ ENGINE ====================
function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  container.innerHTML = '';
  quizAnswers = {};
  updateQuizScore();

  QUIZ_QUESTIONS.forEach((q, qIndex) => {
    const qCard = document.createElement('div');
    qCard.id = `quiz-card-${q.id}`;
    qCard.className = 'bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 transition';

    const header = document.createElement('div');
    header.className = 'flex items-start justify-between gap-3';
    header.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-bold">${qIndex + 1}</span>
        <h4 class="text-sm font-semibold text-white leading-snug">${q.question}</h4>
      </div>
      <span id="quiz-status-${q.id}" class="text-xs font-bold hidden"></span>
    `;
    qCard.appendChild(header);

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'space-y-2 pt-1';

    q.options.forEach((opt, optIndex) => {
      const optBtn = document.createElement('button');
      optBtn.id = `opt-${q.id}-${optIndex}`;
      optBtn.className = 'w-full text-left p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 transition flex items-center gap-2.5';
      optBtn.onclick = () => selectQuizAnswer(q.id, optIndex);
      
      const letter = String.fromCharCode(65 + optIndex);
      optBtn.innerHTML = `
        <span class="w-5 h-5 rounded-md bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px] flex-shrink-0">${letter}</span>
        <span class="flex-1">${opt}</span>
      `;
      optionsDiv.appendChild(optBtn);
    });

    qCard.appendChild(optionsDiv);

    // Explanation container (hidden initially)
    const explanationDiv = document.createElement('div');
    explanationDiv.id = `quiz-exp-${q.id}`;
    explanationDiv.className = 'hidden text-xs p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 mt-2';
    explanationDiv.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    qCard.appendChild(explanationDiv);

    container.appendChild(qCard);
  });
}

function selectQuizAnswer(qId, selectedIndex) {
  // Prevent re-answering
  if (quizAnswers[qId] !== undefined) return;

  quizAnswers[qId] = selectedIndex;
  const q = QUIZ_QUESTIONS.find(item => item.id === qId);
  if (!q) return;

  const isCorrect = selectedIndex === q.correct;
  const selectedBtn = document.getElementById(`opt-${qId}-${selectedIndex}`);
  const statusSpan = document.getElementById(`quiz-status-${qId}`);
  const expDiv = document.getElementById(`quiz-exp-${qId}`);

  // Highlight selected button
  if (isCorrect) {
    selectedBtn.classList.remove('bg-slate-800/70', 'border-slate-700/60', 'text-slate-300');
    selectedBtn.classList.add('bg-emerald-900/40', 'border-emerald-500/60', 'text-emerald-200');
    statusSpan.textContent = '✓ Correct';
    statusSpan.className = 'text-xs font-bold text-emerald-400 block';
  } else {
    selectedBtn.classList.remove('bg-slate-800/70', 'border-slate-700/60', 'text-slate-300');
    selectedBtn.classList.add('bg-rose-900/40', 'border-rose-500/60', 'text-rose-200');
    
    // Also highlight correct button in green
    const correctBtn = document.getElementById(`opt-${qId}-${q.correct}`);
    if (correctBtn) {
      correctBtn.classList.add('border-emerald-500/50', 'bg-emerald-950/30', 'text-emerald-300');
    }

    statusSpan.textContent = '✗ Incorrect';
    statusSpan.className = 'text-xs font-bold text-rose-400 block';
  }

  // Show explanation
  expDiv.classList.remove('hidden');

  updateQuizScore();
}

function updateQuizScore() {
  const answeredCount = Object.keys(quizAnswers).length;
  let correctCount = 0;

  Object.entries(quizAnswers).forEach(([qId, ansIndex]) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === parseInt(qId));
    if (q && q.correct === ansIndex) {
      correctCount++;
    }
  });

  const scoreBadge = document.getElementById('quiz-score-badge');
  if (scoreBadge) {
    scoreBadge.textContent = `${correctCount} / ${QUIZ_QUESTIONS.length}`;
  }

  // If all answered, show summary
  if (answeredCount === QUIZ_QUESTIONS.length) {
    showQuizSummary(correctCount);
  }
}

function showQuizSummary(score) {
  const summaryBox = document.getElementById('quiz-summary');
  const summaryTitle = document.getElementById('quiz-summary-title');
  const summaryDesc = document.getElementById('quiz-summary-desc');
  const summaryIcon = document.getElementById('quiz-summary-icon');

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const passed = pct >= 80;

  if (passed) {
    summaryIcon.textContent = '🎉';
    summaryTitle.textContent = `Congratulations! You Passed! (${pct}%)`;
    summaryDesc.textContent = `You answered ${score} out of ${QUIZ_QUESTIONS.length} correctly. You meet the standard passing threshold for the official DMV written knowledge exam.`;
  } else {
    summaryIcon.textContent = '📚';
    summaryTitle.textContent = `Keep Studying! (${pct}%)`;
    summaryDesc.textContent = `You answered ${score} out of ${QUIZ_QUESTIONS.length} correctly. Most states require 80% or higher to pass the official permit test. Review the answers and try again!`;
  }

  summaryBox.classList.remove('hidden');
  summaryBox.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
  const summaryBox = document.getElementById('quiz-summary');
  if (summaryBox) summaryBox.classList.add('hidden');
  renderQuiz();
}
