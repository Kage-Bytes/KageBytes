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
