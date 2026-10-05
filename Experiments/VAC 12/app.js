// app.js — VAC 12: Interactive Real-Time Dashboard
// Demonstrates: DOM manipulation, Events, localStorage, AJAX (jQuery), jQuery

$(document).ready(function () {

  // =============================================
  //  1. REAL-TIME CLOCK (setInterval + DOM)
  // =============================================
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    });
    const dateStr = now.toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    $("#live-clock").text(timeStr.toUpperCase());
    $("#live-date").text(dateStr);

    // Dynamic greeting
    const h = now.getHours();
    let greet = "Good Evening";
    if (h < 12) greet = "Good Morning";
    else if (h < 17) greet = "Good Afternoon";
    $("#greeting").text(greet + " ☀️");
  }
  updateClock();
  setInterval(updateClock, 1000);

  // =============================================
  //  2. THEME TOGGLE (localStorage + Events)
  // =============================================
  const savedTheme = localStorage.getItem("dashboard-theme") || "dark";
  if (savedTheme === "light") $("body").addClass("light");
  updateThemeIcon();

  // Event: click on theme toggle button
  $("#theme-toggle").on("click", function () {
    $("body").toggleClass("light");
    const theme = $("body").hasClass("light") ? "light" : "dark";
    localStorage.setItem("dashboard-theme", theme);     // Storage
    updateThemeIcon();
  });

  function updateThemeIcon() {
    $("#theme-toggle").text($("body").hasClass("light") ? "🌙" : "☀️");
  }

  // =============================================
  //  3. QUICK NOTES (DOM + Events + localStorage)
  // =============================================
  let notes = JSON.parse(localStorage.getItem("dashboard-notes") || "[]");
  renderNotes();

  // Event: Add note on button click
  $("#add-note-btn").on("click", addNote);

  // Event: Add note on Enter key in the text field
  $("#note-text").on("keypress", function (e) {
    if (e.key === "Enter") addNote();
  });

  function addNote() {
    const title = $.trim($("#note-title").val()) || "Untitled";
    const text  = $.trim($("#note-text").val());
    if (!text) {
      // jQuery animation — shake effect on empty input
      $("#note-text").css("border-color", "#ff4757")
        .animate({ marginLeft: -6 }, 50)
        .animate({ marginLeft: 6 }, 50)
        .animate({ marginLeft: 0 }, 50, function () {
          $(this).css("border-color", "");
        });
      return;
    }
    const note = {
      id: Date.now(),
      title: title,
      text: text,
      time: new Date().toLocaleString("en-IN")
    };
    notes.unshift(note);                                  // DOM: add to beginning
    saveNotes();
    renderNotes();
    $("#note-title").val("");
    $("#note-text").val("").focus();                       // Event: refocus input
  }

  // Event delegation: delete note (click on dynamically-created elements)
  $("#notes-list").on("click", ".note-delete", function () {
    const id = $(this).closest(".note-item").data("id");
    notes = notes.filter(n => n.id !== id);               // DOM: remove from array
    saveNotes();
    $(this).closest(".note-item").slideUp(300, function () {
      $(this).remove();                                    // jQuery: animate removal
      updateNotesUI();
    });
  });

  // Event: search / filter notes (live input event)
  $("#note-search").on("input", function () {
    const query = $(this).val().toLowerCase();
    $(".note-item").each(function () {
      const title = $(this).find("h4").text().toLowerCase();
      const text  = $(this).find("p").text().toLowerCase();
      $(this).toggle(title.includes(query) || text.includes(query));  // DOM: show/hide
    });
  });

  // Event: clear all notes
  $("#clear-notes-btn").on("click", function () {
    if (notes.length === 0) return;
    $(".note-item").slideUp(200);                          // jQuery: batch animation
    setTimeout(() => {
      notes = [];
      saveNotes();
      renderNotes();
    }, 250);
  });

  function saveNotes() {
    localStorage.setItem("dashboard-notes", JSON.stringify(notes));  // Storage
  }

  function renderNotes() {
    const $list = $("#notes-list").empty();                 // DOM: clear list
    notes.forEach(n => {
      // DOM manipulation: create elements dynamically
      const $item = $(`
        <li class="note-item" data-id="${n.id}">
          <h4>${escapeHtml(n.title)}</h4>
          <p>${escapeHtml(n.text)}</p>
          <div class="note-time">${n.time}</div>
          <button class="note-delete" title="Delete note">✕</button>
        </li>
      `);
      $list.append($item);
    });
    updateNotesUI();
  }

  function updateNotesUI() {
    const count = notes.length;
    $("#notes-count").text(count + (count === 1 ? " note" : " notes"));
    $("#notes-empty").toggle(count === 0);
    $("#clear-notes-btn").prop("disabled", count === 0);
  }

  // =============================================
  //  4. RANDOM QUOTES (AJAX via jQuery)
  // =============================================
  fetchQuote();

  // Event: fetch new quote on button click
  $("#new-quote-btn").on("click", fetchQuote);

  function fetchQuote() {
    $("#quote-text").css("opacity", 0.3);                  // jQuery: fade effect
    // AJAX: jQuery $.ajax call to external API
    $.ajax({
      url: "https://dummyjson.com/quotes/random",
      method: "GET",
      dataType: "json",
      success: function (data) {
        $("#quote-text").text(`"${data.quote}"`).animate({ opacity: 1 }, 400);
        $("#quote-author").text("— " + data.author);
      },
      error: function () {
        // Fallback quotes if API is unreachable
        const fallback = [
          { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
          { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
          { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
          { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" }
        ];
        const q = fallback[Math.floor(Math.random() * fallback.length)];
        $("#quote-text").text(`"${q.quote}"`).animate({ opacity: 1 }, 400);
        $("#quote-author").text("— " + q.author);
      }
    });
  }

  // =============================================
  //  5. GITHUB PROFILE LOOKUP (AJAX via jQuery)
  // =============================================

  // Event: search on button click
  $("#github-search-btn").on("click", searchGitHub);

  // Event: search on Enter key
  $("#github-input").on("keypress", function (e) {
    if (e.key === "Enter") searchGitHub();
  });

  function searchGitHub() {
    const username = $.trim($("#github-input").val());
    if (!username) return;

    $("#github-result").addClass("hidden");
    $("#github-error").addClass("hidden");

    // AJAX: jQuery $.get shorthand for GET request
    $.get("https://api.github.com/users/" + encodeURIComponent(username))
      .done(function (user) {
        // DOM manipulation: populate profile data
        $("#gh-avatar").attr("src", user.avatar_url);
        $("#gh-name").text(user.name || user.login);
        $("#gh-bio").text(user.bio || "No bio available");
        $("#gh-repos").text(user.public_repos + " repos");
        $("#gh-followers").text(user.followers + " followers");
        $("#gh-following").text(user.following + " following");
        $("#gh-link").attr("href", user.html_url);
        // DOM: reveal result card
        $("#github-result").removeClass("hidden").hide().fadeIn(400);   // jQuery animation
      })
      .fail(function () {
        $("#github-error").removeClass("hidden").hide().fadeIn(300);    // jQuery animation
      });
  }

  // =============================================
  //  6. TODAY'S TASKS (DOM + Events + localStorage)
  // =============================================
  let tasks = JSON.parse(localStorage.getItem("dashboard-tasks") || "[]");
  renderTasks();

  // Event: add task on button click
  $("#add-task-btn").on("click", addTask);

  // Event: add task on Enter key
  $("#task-input").on("keypress", function (e) {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = $.trim($("#task-input").val());
    if (!text) return;
    tasks.push({ id: Date.now(), text: text, done: false });
    saveTasks();
    renderTasks();
    $("#task-input").val("").focus();
  }

  // Event delegation: toggle task completion
  $("#task-list").on("change", ".task-checkbox", function () {
    const id = $(this).closest(".task-item").data("id");
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.done = this.checked;
      $(this).siblings(".task-label").toggleClass("done", this.checked);
      saveTasks();
      updateTaskProgress();
    }
  });

  // Event delegation: delete task
  $("#task-list").on("click", ".task-delete", function () {
    const id = $(this).closest(".task-item").data("id");
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    $(this).closest(".task-item").slideUp(250, function () {
      $(this).remove();
      updateTaskProgress();
      $("#tasks-empty").toggle(tasks.length === 0);
    });
  });

  function saveTasks() {
    localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));    // Storage
  }

  function renderTasks() {
    const $list = $("#task-list").empty();
    tasks.forEach(t => {
      // DOM: dynamically create task elements
      const $item = $(`
        <li class="task-item" data-id="${t.id}">
          <input type="checkbox" class="task-checkbox" ${t.done ? "checked" : ""} />
          <span class="task-label ${t.done ? "done" : ""}">${escapeHtml(t.text)}</span>
          <button class="task-delete" title="Remove task">✕</button>
        </li>
      `);
      $list.append($item);
    });
    $("#tasks-empty").toggle(tasks.length === 0);
    updateTaskProgress();
  }

  function updateTaskProgress() {
    const total = tasks.length;
    const done  = tasks.filter(t => t.done).length;
    const pct   = total ? (done / total) * 100 : 0;
    $("#progress-fill").css("width", pct + "%");                       // DOM: style update
    $("#task-progress-text").text(`${done} / ${total} completed`);

    // jQuery: animate progress bar color based on completion
    if (pct === 100 && total > 0) {
      $("#progress-fill").css("background", "linear-gradient(90deg, #2ed573, #7bed9f)");
    } else {
      $("#progress-fill").css("background", "");
    }
  }

  // =============================================
  //  UTILITY: Escape HTML to prevent XSS
  // =============================================
  function escapeHtml(str) {
    return $("<div>").text(str).html();
  }

  // =============================================
  //  KEYBOARD SHORTCUTS (Global Events)
  // =============================================
  $(document).on("keydown", function (e) {
    // Ctrl+Shift+T → toggle theme
    if (e.ctrlKey && e.shiftKey && e.key === "T") {
      e.preventDefault();
      $("#theme-toggle").trigger("click");
    }
    // Ctrl+Shift+Q → new quote
    if (e.ctrlKey && e.shiftKey && e.key === "Q") {
      e.preventDefault();
      fetchQuote();
    }
  });

});
