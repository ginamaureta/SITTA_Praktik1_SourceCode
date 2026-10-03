(function () {
  "use strict";
  const storageKey = "sittaAdditionalStock";

  document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("stockTable");
    const search = document.getElementById("stockSearch");
    const count = document.getElementById("stockCount");
    const form = document.getElementById("addStockForm");

    render();
    search.addEventListener("input", render);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const item = {
        kodeLokasi: document.getElementById("newLocation").value.trim().toUpperCase(),
        kodeBarang: document.getElementById("newCode").value.trim().toUpperCase(),
        namaBarang: document.getElementById("newName").value.trim(),
        jenisBarang: document.getElementById("newType").value,
        edisi: document.getElementById("newEdition").value,
        stok: Number(document.getElementById("newStock").value),
        cover: document.getElementById("newCover").value.trim() || "img/pengantar_komunikasi.jpg"
      };
      if (!item.kodeLokasi || !item.kodeBarang || !item.namaBarang || item.stok < 0) {
        window.alert("Lengkapi data stok dengan benar."); return;
      }
      const existing = getAdditional(); existing.push(item);
      localStorage.setItem(storageKey, JSON.stringify(existing));
      form.reset(); document.getElementById("newEdition").value = "1"; document.getElementById("newStock").value = "100";
      SITTA.closeModal(document.getElementById("addStockModal"));
      SITTA.saveHistory("Tambah Stok", item.kodeBarang + " • " + item.namaBarang);
      render(); window.alert("Data stok berhasil ditambahkan.");
    });

    table.addEventListener("click", function (event) {
      const button = event.target.closest("[data-delete-index]");
      if (!button) return;
      const index = Number(button.dataset.deleteIndex), extra = getAdditional(), removed = extra[index];
      if (!removed) return;
      if (window.confirm("Hapus data " + removed.namaBarang + "?")) {
        extra.splice(index,1); localStorage.setItem(storageKey, JSON.stringify(extra));
        SITTA.saveHistory("Hapus Stok", removed.kodeBarang + " • " + removed.namaBarang); render();
      }
    });

    function getAdditional() { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    function getAll() { return dataBahanAjar.concat(getAdditional()); }

    function render() {
      const keyword = search.value.trim().toLowerCase(), all = getAll();
      const filtered = all.filter(item =>
        item.kodeBarang.toLowerCase().includes(keyword) ||
        item.namaBarang.toLowerCase().includes(keyword) ||
        item.kodeLokasi.toLowerCase().includes(keyword)
      );
      table.innerHTML = filtered.map(item => {
        const extraIndex = getAdditional().findIndex(x => x.kodeBarang === item.kodeBarang);
        const action = extraIndex >= 0 ? `<button class="action-btn" type="button" data-delete-index="${extraIndex}">Hapus</button>` : `<span class="muted">Data awal</span>`;
        return `<tr><td><img class="cover-thumb" src="${escapeAttr(item.cover)}" alt="Cover ${escapeAttr(item.namaBarang)}" onerror="this.src='img/pengantar_komunikasi.jpg'"></td>
        <td>${escapeHtml(item.kodeLokasi)}</td><td><strong>${escapeHtml(item.kodeBarang)}</strong></td><td>${escapeHtml(item.namaBarang)}</td>
        <td>${escapeHtml(item.jenisBarang)}</td><td>${escapeHtml(item.edisi)}</td><td><strong>${Number(item.stok).toLocaleString("id-ID")}</strong></td><td>${action}</td></tr>`;
      }).join("");
      count.textContent = filtered.length + " data";
    }
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }
  function escapeAttr(value) { return escapeHtml(value); }
})();