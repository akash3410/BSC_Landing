document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginFormPass");
  if (!form) return;

  // ===== Floating Label Logic =====
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const label = input.nextElementSibling;
    if (!label) return;

    function updateLabel() {
      if (input.value.trim() !== "") {
        label.classList.add("-top-2", "text-sm", "text-blue-800");
        label.classList.remove("top-2.5", "text-gray-500");
      } else {
        label.classList.remove("-top-2", "text-sm", "text-blue-800");
        label.classList.add("top-2.5", "text-gray-500");
      }
    }

    input.addEventListener("focus", () => {
      label.classList.add("-top-2", "text-sm", "text-blue-800");
      label.classList.remove("top-2.5", "text-gray-500");
    });

    input.addEventListener("blur", updateLabel);
    input.addEventListener("input", updateLabel);
  });

  // ===== Password Toggle Logic for multiple fields =====
  const toggleButtons = document.querySelectorAll("[id^=togglePassword]");

  toggleButtons.forEach((toggleBtn) => {
    const inputId = toggleBtn.getAttribute("data-target"); // target password field
    const passwordField = document.getElementById(inputId);
    const eyeIcon = toggleBtn.querySelector("i");

    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = passwordField.type === "password";
      passwordField.type = isHidden ? "text" : "password";

      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");

      const len = passwordField.value.length;
      passwordField.focus();
      passwordField.setSelectionRange(len, len);
    });
  });

});


// Image Upload (Registration)
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const prev_img = document.getElementById('prev_img');
const fileLabel = document.getElementById('fileLabel');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if(file) {
    fileLabel.textContent = file.name; // show filename
    const reader = new FileReader();
    reader.onload = e => {
      prev_img.src = e.target.result;
      preview.classList.remove('hidden');
      prev_img.classList.remove('hidden');
    }
    reader.readAsDataURL(file);
  }
});