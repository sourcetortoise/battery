const DEFAULT_CAPACITY_MINS = 90;
const DEFAULT_BREAK_DURATION = 10;

const FULL_BATTERY = 100;
const MODE_REST = 0;
const MODE_DRAIN = 1;
const MODE_CHARGE = 2;

let batteryMode = MODE_REST;
let currentLevel = FULL_BATTERY;
let breakDurationMinutes = DEFAULT_BREAK_DURATION;

let capacityMinutes;

let drainInterval;
let chargeInterval;

const red    = "linear-gradient(40deg, rgba(231,15,15,1) 0%, rgba(241,77,77,1) 100%)";
const green  = "linear-gradient(40deg, rgba(19,231,59,1) 0%, rgba(0,255,155,1) 100%)";
const yellow = "linear-gradient(259deg, rgba(231,226,15,1) 0%, rgba(221,188,17,1) 100%)";
const blue   = null;  // we set the gradient in the css

function setMode(newMode) {
  batteryMode = newMode;

  if (newMode == MODE_DRAIN) {
    // DRAINING
    document.getElementById('capacity-slider').disabled = true;
    document.getElementById('break-duration').disabled = false;
    updateBatteryColor();

    clearAllIntervals();
    drainInterval = window.setInterval(function() {
      drainOnePercent();
    }, calcDrainIntervalTime());

  } else if (newMode == MODE_CHARGE) {
    // CHARGING
    document.getElementById('capacity-slider').disabled = false;
    document.getElementById('break-duration').disabled = true;
    updateBatteryColor();

    clearAllIntervals();
    chargeInterval = window.setInterval(function() {
      rechargeOnePercent();
    }, calcChargeIntervalTime());

  } else {
    // OFF
    clearAllIntervals();
    document.getElementById('capacity-slider').disabled = false;
    document.getElementById('break-duration').disabled = false;
  }
}

function clearAllIntervals() {
  if (drainInterval) {
    clearInterval(drainInterval);
  }
  if (chargeInterval) {
    clearInterval(chargeInterval);
  }
}

function setBatteryColor(color) {
  document.getElementById('battery-level').style.background = color;
}

function rechargeOnePercent() {
  setBatteryLevel(currentLevel + 1)
}

function drainOnePercent() {
  setBatteryLevel(currentLevel - 1)
}

function setBatteryLevel(newLevel) {
  currentLevel = newLevel;

  if (currentLevel < 0) {
    currentLevel = 0;
  } else if (currentLevel > 100) {
    currentLevel = 100;
  }

  updateBatteryColor();

  let levelElement = document.getElementById('battery-level');
  levelElement.style.width = currentLevel + '%';
}

function updateBatteryColor() {
  if (batteryMode == MODE_CHARGE) {
    setBatteryColor(blue);
    document.getElementById('battery-level').classList.add('charging');
  } else {
    document.getElementById('battery-level').classList.remove('charging');
    if (currentLevel < 25) {
      setBatteryColor(red);
    } else if (currentLevel < 60) {
      setBatteryColor(yellow);
    } else {
      setBatteryColor(green);
    }
  }
}

function setCapacitySlider(val) {
  capacityMinutes = val;
  document.getElementById('capacity-slider').value = capacityMinutes;
}

function updateCapacitySlider() {
  capacityMinutes = document.getElementById('capacity-slider').value;
  document.getElementById('capacity-label').innerHTML = `${capacityMinutes} minutes`;
}

function setBreakDuration() {
  breakDurationMinutes = document.getElementById('break-duration').value;
}

function calcDrainIntervalTime() {
  let capacityMs = capacityMinutes * 1000 * 60;
  return capacityMs / currentLevel;
}

function calcChargeIntervalTime() {
  let percentToCharge = 100 - currentLevel;
  let msOfBreak = breakDurationMinutes * 1000 * 60;
  return msOfBreak / percentToCharge;
}

function initializeBattery() {
  document.getElementById('break-duration').value = DEFAULT_BREAK_DURATION;
  setBatteryLevel(FULL_BATTERY);
  setCapacitySlider(DEFAULT_CAPACITY_MINS);
  updateCapacitySlider();
  document.querySelector('#capacity-slider').addEventListener('input', updateCapacitySlider, false);
}

initializeBattery();
