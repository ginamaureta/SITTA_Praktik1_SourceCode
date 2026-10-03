(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trackingForm");
    const input = document.getElementById("nomorDO");
    const result = document.getElementById("trackingResult");
    const empty = document.getElementById("trackingEmpty");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const nomor = input.value.trim();
      if (!nomor) { window.alert("Nomor Delivery Order wajib diisi."); input.focus(); return; }

      const data = dataTracking[nomor];
      if (!data) {
        result.hidden = true; empty.hidden = false;
        empty.textContent = "Data Delivery Order tidak ditemukan. Silakan periksa nomor DO.";
        window.alert("Nomor Delivery Order tidak ditemukan.");
        return;
      }

      const progress = SITTA.getProgress(data.status);
      const badgeClass = progress === 100 ? "badge-success" : progress >= 65 ? "badge-info" : "badge-warning";

      result.innerHTML = `
        <div class="tracking-grid">
          <article class="panel">
            <div class="section-heading"><div><p class="eyebrow">Hasil Pencarian</p><h2>Delivery Order ${escapeHtml(nomor)}</h2></div>
            <span class="badge ${badgeClass}">${escapeHtml(data.status)}</span></div>
            <div class="detail-list">
              <div class="detail-item"><small>Nama Mahasiswa</small><strong>${escapeHtml(data.nama)}</strong></div>
              <div class="detail-item"><small>Ekspedisi</small><strong>${escapeHtml(data.ekspedisi)}</strong></div>
              <div class="detail-item"><small>Tanggal Kirim</small><strong>${escapeHtml(data.tanggalKirim)}</strong></div>
              <div class="detail-item"><small>Jenis Paket</small><strong>${escapeHtml(data.paket)}</strong></div>
              <div class="detail-item"><small>Total Pembayaran</small><strong>${escapeHtml(data.total)}</strong></div>
              <div class="detail-item"><small>Progress</small><strong>${progress}%</strong></div>
            </div>
            <div style="margin-top:18px"><div class="progress" aria-label="Progress ${progress}%"><div class="progress-bar" style="width:${progress}%"></div></div></div>
          </article>
          <article class="panel">
            <p class="eyebrow">Detail Ekspedisi</p><h2>Riwayat Perjalanan</h2>
            <div class="timeline">
              ${data.perjalanan.map(step => `<div class="timeline-item"><time>${escapeHtml(step.waktu)}</time><p>${escapeHtml(step.keterangan)}</p></div>`).join("")}
            </div>
          </article>
        </div>`;

      result.hidden = false; empty.hidden = true;
      SITTA.saveHistory("Tracking Delivery Order", "DO " + nomor + " • " + data.status + " • " + data.nama);
    });
  });
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }
})();