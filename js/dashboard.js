(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const hour = new Date().getHours();
    const text = hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";
    document.getElementById("greeting").textContent = text + (SITTA.currentUser ? ", " + SITTA.currentUser.nama : "") + " 👋";
    if (SITTA.currentUser) document.getElementById("userDescription").textContent = SITTA.currentUser.role + " • " + SITTA.currentUser.lokasi;

    document.getElementById("totalItems").textContent = dataBahanAjar.length;
    document.getElementById("totalStock").textContent = dataBahanAjar.reduce((sum,item) => sum + Number(item.stok),0).toLocaleString("id-ID");
    document.getElementById("totalDO").textContent = Object.keys(dataTracking).length;
    document.getElementById("totalHistory").textContent = SITTA.getHistory().length;

    renderMonitoring(); renderRecap(); renderHistory();

    document.getElementById("clearHistoryBtn").addEventListener("click", function () {
      if (window.confirm("Hapus seluruh histori transaksi?")) {
        localStorage.removeItem("sittaHistory");
        renderHistory();
        document.getElementById("totalHistory").textContent = "0";
      }
    });
  });

  function renderMonitoring() {
    document.getElementById("monitoringTable").innerHTML = Object.keys(dataTracking).map(key => {
      const item = dataTracking[key], progress = SITTA.getProgress(item.status);
      const badgeClass = progress === 100 ? "badge-success" : progress >= 65 ? "badge-info" : "badge-warning";
      return `<tr><td><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(item.nama)}</td><td>${escapeHtml(item.ekspedisi)}</td>
      <td><span class="badge ${badgeClass}">${escapeHtml(item.status)}</span></td>
      <td><div class="progress" aria-label="Progress ${progress}%"><div class="progress-bar" style="width:${progress}%"></div></div><small>${progress}%</small></td></tr>`;
    }).join("");
  }
  function renderRecap() {
    document.getElementById("recapTable").innerHTML = dataBahanAjar.map(item =>
      `<tr><td>${escapeHtml(item.kodeBarang)}</td><td>${escapeHtml(item.namaBarang)}</td><td>${escapeHtml(item.kodeLokasi)}</td>
      <td>${escapeHtml(item.jenisBarang)}</td><td><strong>${Number(item.stok).toLocaleString("id-ID")}</strong></td></tr>`
    ).join("");
  }
  function renderHistory() {
    const history = SITTA.getHistory(), tbody = document.getElementById("historyTable");
    if (!history.length) {
      tbody.innerHTML = `<tr><td colspan="3" class="muted">Belum ada transaksi. Pencarian tracking akan muncul di sini.</td></tr>`;
      return;
    }
    tbody.innerHTML = history.map(item =>
      `<tr><td>${escapeHtml(item.waktu)}</td><td>${escapeHtml(item.aktivitas)}</td><td>${escapeHtml(item.detail)}</td></tr>`
    ).join("");
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }
})();