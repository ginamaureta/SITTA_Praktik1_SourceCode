# SITTA Praktik 1 – Front-End

Implementasi Tugas Praktik 1 menggunakan HTML semantik, CSS (external + internal + inline), dan JavaScript DOM.

## Struktur
- `index.html` – pengarah ke halaman login.
- `login.html` – login, validasi, modal lupa password dan daftar.
- `dashboard.html` – greeting berdasarkan local time, navigasi, monitoring DO, rekap bahan ajar, histori.
- `tracking.html` – pencarian nomor DO dan detail pengiriman.
- `stok.html` – tabel data bahan ajar dinamis + tambah/hapus data.
- `css/style.css` – stylesheet utama.
- `js/data.js` – data dummy dari lampiran tugas.
- `js/login.js`, `js/dashboard.js`, `js/tracking.js`, `js/stok.js` – JavaScript modular per halaman.
- `img/` – cover bahan ajar.

## Akun demo
- `rina@ut.ac.id` / `rina123`
- `agus@ut.ac.id` / `agus123`
- `siti@ut.ac.id` / `siti123`
- `doni@ut.ac.id` / `doni123`
- `admin@ut.ac.id` / `admin123`

## Nomor DO demo
- `2023001234`
- `2023005678`

## Catatan data
Lampiran data tracking memiliki ketidaksesuaian pada objek dengan key `2023005678`, karena properti `nomorDO` di objek tersebut bernilai `2023001234`. Aplikasi menggunakan key objek sebagai nomor DO pencarian agar kedua nomor demo tetap dapat diuji.

## Cara menjalankan
Buka `index.html` atau `login.html` melalui browser. Tidak membutuhkan database maupun backend. Untuk hasil paling konsisten, jalankan melalui server lokal (misalnya VS Code Live Server).

## Demonstrasi video
1. Login benar/salah dan validasi form.
2. Modal Lupa Password dan Daftar.
3. Greeting berdasarkan local time.
4. Monitoring progress DO.
5. Tracking DO dengan detail dan progress bar.
6. Informasi stok yang dibentuk dengan DOM.
7. Tambah dan hapus data stok.
8. Pencarian/filter stok.
9. Histori transaksi melalui localStorage.
