
// Single menu button: opens/closes the page list.
(function () {
  var btn = document.getElementById("menu-btn");
  var list = document.getElementById("menu-list");
  if (!btn || !list) return;

  function setOpen(open) {
    list.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(list.hidden);
  });

  document.addEventListener("click", function (e) {
    if (!list.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

// Members page: search bar that filters member cards (does nothing on other pages).
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
  if (!cards.length) return;

  // Build the search bar and place it under the intro line
  var wrap = document.createElement("div");
  wrap.className = "search";
  wrap.innerHTML =
    '<input id="member-search" type="search" placeholder="Search members…" ' +
    'aria-label="Search members" autocomplete="off" spellcheck="false">' +
    '<button type="button" id="search-clear" aria-label="Clear search" hidden>×</button>';

  var firstGrid = document.querySelector(".grid");
  var firstSection = firstGrid && firstGrid.previousElementSibling &&
                     firstGrid.previousElementSibling.tagName === "H2"
                     ? firstGrid.previousElementSibling : firstGrid;
  var intro = document.querySelector("main p");
  if (intro) intro.insertAdjacentElement("afterend", wrap);
  else firstSection.parentNode.insertBefore(wrap, firstSection);

  var empty = document.createElement("p");
  empty.id = "no-results";
  empty.hidden = true;
  empty.textContent = "No members found.";
  var grids = Array.prototype.slice.call(document.querySelectorAll(".grid"));
  grids[grids.length - 1].insertAdjacentElement("afterend", empty);

  var input = wrap.querySelector("input");
  var clear = wrap.querySelector("button");

  function filter() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;

    cards.forEach(function (card) {
      var name = card.querySelector("h3");
      var role = card.querySelector(".role");
      var text = ((name ? name.textContent : "") + " " + (role ? role.textContent : "")).toLowerCase();
      var match = !q || text.indexOf(q) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });

    // Hide a section's heading + grid when none of its cards match
    grids.forEach(function (grid) {
      var any = grid.querySelector(".card:not([hidden])") !== null;
      grid.hidden = !any;
      var h = grid.previousElementSibling;
      if (h && h.tagName === "H2") h.hidden = !any;
    });

    empty.hidden = shown !== 0;
    clear.hidden = !input.value;
  }

  input.addEventListener("input", filter);
  clear.addEventListener("click", function () {
    input.value = "";
    filter();
    input.focus();
  });
})();
