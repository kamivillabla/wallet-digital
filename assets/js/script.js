// navbar

$(document).ready(function () {
  const navToggle = $('.nav-toggle-label');
  const sidebar = $('.sidebar');

  navToggle.click(function () {
    sidebar.toggleClass('active');
    navToggle.toggleClass('toggled');
  });
});

// alert bootstrap
const showAlert = (message, type) => {
  const alertHtml = $(
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
  );

  const alertBox = $('#alert-container');
  alertBox.empty().append(alertHtml);
  setTimeout(() => {
    alertHtml.fadeOut();
  }, 3000);
};
