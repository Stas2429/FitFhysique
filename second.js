
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.classList.toggle('bx-show');
  this.classList.toggle('bx-hide');
});


const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirm-password');
toggleConfirmPassword.addEventListener('click', function () {
  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);
  this.classList.toggle('bx-show');
  this.classList.toggle('bx-hide');
});

document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessageDiv = document.getElementById('error-message');

  errorMessageDiv.textContent = '';

  if (password !== confirmPassword) {
    errorMessageDiv.textContent = "Пароли не совпадают! Пожалуйста, попробуйте еще раз.";
    return;
  }

  alert("Регистрация прошла успешно."); 
});

document.getElementById('login-link').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = 'login.html';
});

document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'signup.html';
  });