# SITTA Praktik 1 – Front-End

Implementasi Tugas Praktik 1 menggunakan HTML semantik, CSS (external + internal + inline), dan JavaScript DOM.

**Demo aplikasi:** https://ginamaureta.github.io/SITTA_Praktik1_SourceCode/

## Cara menjalankan

### Opsi 1: Online (tanpa mengunduh)

1. Buka https://ginamaureta.github.io/SITTA_Praktik1_SourceCode/
2. Login menggunakan salah satu akun demo di bawah, misalnya `admin@ut.ac.id` / `admin123`.
3. Setelah masuk, gunakan menu di sisi kiri untuk membuka Dashboard, Informasi Bahan Ajar, dan Tracking Pengiriman.

### Opsi 2: Di komputer sendiri

1. Klik tombol hijau **Code**, lalu **Download ZIP**.
2. Ekstrak file ZIP.
3. Buka `index.html` (atau `login.html`) dengan browser seperti Chrome atau Edge.

Aplikasi tidak membutuhkan database maupun backend. Untuk hasil paling konsisten, jalankan melalui server lokal, misalnya ekstensi Live Server pada VS Code.

## Struktur

- `index.html` – pengarah ke halaman login.
- `login.html` – login, validasi, modal lupa password dan daftar.
- `dashboard.html` – greeting berdasarkan local time, navigasi, monitoring DO, rekap bahan ajar, histori.
- `tracking.html` – pencarian nomor DO dan detail pengiriman.
- `stok.html` – tabel data bahan ajar dinamis + tambah/hapus data.
- `css/style.css` – stylesheet utama.
- `js/data.js` – data dummy dari lampiran tugas.
- `js/app.js` – fungsi bersama: sesi login, modal, histori, progress.
- `js/login.js`, `js/dashboard.js`, `js/tracking.js`, `js/stok.js` – JavaScript modular per halaman.
- `img/` – cover bahan ajar.

## Akun demo

- `rina@ut.ac.id` / `rina123`
- `agus@ut.ac.id` / `agus123`
- `siti@ut.ac.id` / `siti123`
- `doni@ut.ac.id` / `doni123`
- `admin@ut.ac.id` / `admin123`

## Nomor DO demo (untuk halaman Tracking)

- `2023001234`
- `2023005678`

## Catatan data

Lampiran data tracking memiliki ketidaksesuaian pada objek dengan key `2023005678`, karena properti `nomorDO` di objek tersebut bernilai `2023001234`. Aplikasi menggunakan key objek sebagai nomor DO pencarian agar kedua nomor demo tetap dapat diuji.
