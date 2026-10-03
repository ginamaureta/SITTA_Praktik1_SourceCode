(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    document.getElementById("togglePassword").addEventListener("click", function () {
      const isPassword = password.type === "password";
      password.type = isPassword ? "text" : "password";
      this.textContent = isPassword ? "🙈" : "👁";
      this.setAttribute("aria-label", isPassword ? "Sembunyikan password" : "Tampilkan password");
    });

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      emailError.textContent = ""; passwordError.textContent = "";
      let valid = true;

      if (!email.value.trim()) { emailError.textContent = "Email wajib diisi."; valid = false; }
      else if (!email.validity.valid) { emailError.textContent = "Format email belum valid."; valid = false; }
      if (!password.value) { passwordError.textContent = "Password wajib diisi."; valid = false; }
      if (!valid) return;

      const user = dataPengguna.find(item =>
        item.email.toLowerCase() === email.value.trim().toLowerCase() &&
        item.password === password.value
      );

      if (!user) {
        window.alert("email/password yang anda masukkan salah");
        return;
      }
      sessionStorage.setItem("sittaCurrentUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    });

    document.getElementById("forgotForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const input = document.getElementById("forgotEmail");
      const user = dataPengguna.find(item => item.email.toLowerCase() === input.value.trim().toLowerCase());
      if (!user) { window.alert("Email tidak terdaftar pada data demo."); return; }
      window.alert("Permintaan pemulihan password untuk " + user.email + " berhasil disimulasikan.");
      SITTA.closeModal(document.getElementById("forgotModal"));
      this.reset();
    });

    document.getElementById("registerForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("registerName").value.trim();
      const emailValue = document.getElementById("registerEmail").value.trim();
      const passwordValue = document.getElementById("registerPassword").value;
      if (!name || !emailValue || passwordValue.length < 6) {
        window.alert("Lengkapi data pendaftaran. Password minimal 6 karakter.");
        return;
      }
      window.alert("Pendaftaran akun berhasil disimulasikan untuk " + name + ".");
      SITTA.closeModal(document.getElementById("registerModal"));
      this.reset();
    });
  });
})();