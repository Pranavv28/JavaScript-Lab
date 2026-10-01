// timer.js — ES6 Module: exports timer utilities

// Calculates time remaining until a target date
export function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

// Starts a 1-second interval, calls callback each tick
export function startTimer(callback) {
  callback();                          // immediate first tick
  return setInterval(callback, 1000);  // then every 1s
}

// Schedule data — array of upcoming classes
export const schedule = [
  { subject: "Mathematics",       time: "09:00 AM" },
  { subject: "Physics",           time: "10:00 AM" },
  { subject: "Web Technology",    time: "11:30 AM" },
  { subject: "Data Structures",   time: "01:00 PM" },
  { subject: "Operating Systems", time: "02:30 PM" }
];
