// app.js — Main ES6 Module: imports from timer.js

import { getTimeLeft, startTimer, schedule } from './timer.js';

// --- Countdown Timer ---
const targetDate = new Date("2026-12-31T00:00:00");
const countdownEl = document.getElementById("countdown");

const timerId = startTimer(() => {
  const t = getTimeLeft(targetDate);
  if (t) {
    countdownEl.innerHTML =
      `<span>${t.days}<small>D</small></span>
       <span>${t.hours}<small>H</small></span>
       <span>${t.minutes}<small>M</small></span>
       <span>${t.seconds}<small>S</small></span>`;
  } else {
    countdownEl.textContent = "🎉 Happy New Year 2027!";
    clearInterval(timerId);
  }
});

// --- Class Schedule (built with setTimeout for staggered render) ---
const tableBody = document.getElementById("schedule-body");

schedule.forEach((cls, i) => {
  setTimeout(() => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}</td><td>${cls.subject}</td><td>${cls.time}</td>`;
    row.style.animation = "fadeIn .4s ease forwards";
    tableBody.appendChild(row);
  }, i * 300);  // stagger each row by 300ms
});
