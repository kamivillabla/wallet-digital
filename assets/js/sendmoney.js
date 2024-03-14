$(document).ready(() => {
  initializeLocalStorage();
  loadContacts();
  initializeEvents();
  $('.popover-wrapper').popover({ trigger: 'hover' });
  applyBalance();
});

$('#add-contact-btn').click(function () {
  $('#contacts-list').hide();
  $('#add-contact-form').show();
});

$('#show-contacts-btn').click(function () {
  $('#add-contact-form').hide();
  $('#contacts-list').show();
});

const createElementList = (contact) =>
  $(
    `<li class="list-group-item contact-item">
    <div class="contact-info">
      <span class="contact__name">${contact.nombre}</span><br>
      <span class="contact__info">rut: ${contact.rut}</span><br>
      <span class="contact__info">email: ${contact.email}</span><br>
      <span class="contact__info">banco: ${contact.banco}</span><br>
      <span class="contact__info">cta: ${contact.cta}</span>
    </div>
  </li>`
  );

const loadContacts = () => {
  const contacts = getLocalStorageItem('contacts', []);
  const lista = $('#contacts-list ul').empty();

  $.each(contacts, (index, contact) => {
    lista.append(
      createElementList(contact).click(() => {
        $('#nombre').val(contact.nombre);
        updateSendMoneyStatusButton();
      })
    );
  });
};

const initializeEvents = () => {
  $('#buscador').on('input', filterContacts);
  $('#send-money-form').on('submit', (event) => {
    event.preventDefault();
    sendMoney();
  });
  $('#add-contact-form').on('submit', (event) => {
    event.preventDefault();
    addContact();
  });
  $('#nombre, #monto').on('input', updateSendMoneyStatusButton);
};

const filterContacts = function () {
  const searchText = $(this).val().toLowerCase();
  $('.contact-item').each(function () {
    $(this).toggle($(this).text().toLowerCase().includes(searchText));
  });
};

const validateSendMoneyFields = () => {
  const name = $('#nombre').val().trim();
  const amount = $('#monto').val().trim();
  return name !== '' && amount !== '';
};

const updateSendMoneyStatusButton = () => {
  $('#enviar-dinero-btn').prop('disabled', !validateSendMoneyFields());
};

const validateContactFields = () => {
  const name = $('#name').val().trim();
  const rut = $('#rut').val().trim();
  const email = $('#email').val().trim();
  const bank = $('#bank').val().trim();
  const account = $('#account').val().trim();
  const nameRegex = /^[A-Za-z\s]+$/;

  const isValidName = nameRegex.test(name);
  const areFieldsFilled =
    name !== '' && rut !== '' && email !== '' && bank !== '' && account !== '';

  return {
    isValid: isValidName && areFieldsFilled,
    isNameInvalid: !isValidName,
    areFieldsNotFilled: !areFieldsFilled,
  };
};

const addContact = () => {
  const validation = validateContactFields();
  if (validation.isValid) {
    const name = $('#name').val().trim();
    const rut = $('#rut').val().trim();
    const email = $('#email').val().trim();
    const bank = $('#bank').val().trim();
    const account = $('#account').val().trim();

    const newContact = {
      nombre: name,
      rut: rut,
      email: email,
      banco: bank,
      cta: account,
    };

    const contacts = getLocalStorageItem('contacts', []);
    contacts.push(newContact);
    setLocalStorageItem('contacts', contacts);
    loadContacts();

    showAlert('¡Contacto agregado correctamente!', 'success');

    $('#add-contact')[0].reset();
  } else {
    if (validation.areFieldsNotFilled) {
      showAlert(
        'Por favor asegúrate de que todos los campos estén completos.',
        'danger'
      );
    } else if (validation.isNameInvalid) {
      showAlert(
        'Error: el nombre del contacto debe contener solo letras.',
        'danger'
      );
    }
  }
};

const sendMoney = () => {
  if (!validateSendMoneyFields()) {
    showAlert('Por favor, completa todos los campos requeridos.', 'danger');
    return;
  }

  const name = $('#nombre').val();
  const montoString = $('#monto').val().trim();
  const monto = parseFloat(montoString);

  if (isNaN(monto) || monto <= 0) {
    showAlert('Por favor, ingresa un monto válido y mayor que cero.', 'danger');
    return;
  }

  let currentBalance = parseFloat(getLocalStorageItem('currentBalance', 0));

  if (monto > currentBalance) {
    showAlert('No cuentas con suficiente saldo.', 'danger');
    return;
  }

  currentBalance -= monto;
  setLocalStorageItem('currentBalance', currentBalance);
  applyBalance();
  showAlert('Transferido correctamente', 'success');
  $('#send-money-form')[0].reset();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US');
  saveTransaction(name, monto, formattedDate, 'cargo');
};
