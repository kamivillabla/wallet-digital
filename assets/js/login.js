const fictitiousUser = {
  email: 'user@gmail.com',
  password: 'password123',
};

$('#loginForm').on('submit', (e) => {
  e.preventDefault();

  const emailEntered = $('#email').val();
  const passwordEntered = $('#password').val();

  $('#email, #password').removeClass('input-error');

  if (
    emailEntered === fictitiousUser.email &&
    passwordEntered === fictitiousUser.password
  ) {
    window.location.href = 'menu.html';
  } else {
    showAlert(
      'El correo electrónico o la contraseña son incorrectos.',
      'danger'
    );
    $('#email, #password').addClass('input-error');

    $('#loginForm')[0].reset();

    setTimeout(() => {
      $('#email, #password').removeClass('input-error');
    }, 3000);
  }
});

$('#email, #password').on('input', (e) => {
  $(e.target).removeClass('input-error');
});
