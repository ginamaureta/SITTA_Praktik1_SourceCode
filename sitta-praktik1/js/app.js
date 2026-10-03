(function () {
  "use strict";
  const currentUser = JSON.parse(sessionStorage.getItem("sittaCurrentUser") || "null");
  const publicPages = ["login.html", "index.html", ""];
  const currentPage = location.pathname.split("/").pop() || "index.html";

  if (!publicPages.includes(currentPage) && !currentUser) {
    window.location.href = "login.html";
    return;
  }

  function getProgress(status) {
    const map = {"Diproses":25,"Dikirim":65,"Dalam Perjalanan":80,"Selesai":100};
    return map[status] || 20;
  }
  function getHistory() {
    return JSON.parse(localStorage.getItem("sittaHistory") || "[]");
  }
  function saveHistory(activity, detail) {
    const history = getHistory();
    history.unshift({waktu:new Date().toLocaleString("id-ID"),aktivitas:activity,detail});
    localStorage.setItem("sittaHistory", JSON.stringify(history.slice(0,30)));
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");
    document.body.classList.remove("modal-open");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const userChip = document.getElementById("userChip");
    if (userChip && currentUser) userChip.textContent = currentUser.nama;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", function () {
      sessionStorage.removeItem("sittaCurrentUser");
      window.location.href = "login.html";
    });

    document.querySelectorAll("[data-modal-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        const modal = document.getElementById(button.dataset.modalOpen);
        if (modal) {
          modal.classList.add("show");
          modal.setAttribute("aria-hidden","false");
          document.body.classList.add("modal-open");
          const firstInput = modal.querySelector("input, select, button");
          if (firstInput) setTimeout(() => firstInput.focus(), 50);
        }
      });
    });

    document.querySelectorAll("[data-modal-close]").forEach(function (button) {
      button.addEventListener("click", function () { closeModal(button.closest(".modal")); });
    });
    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.addEventListener("click", function (event) {
        if (event.target === modal) closeModal(modal);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const modal = document.querySelector(".modal.show");
        if (modal) closeModal(modal);
      }
    });
  });

  window.SITTA = {currentUser,getProgress,getHistory,saveHistory,closeModal};
})();