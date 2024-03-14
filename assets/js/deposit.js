$(document).ready(() => {
  initializeLocalStorage();
  applyBalance();
});

const getCurrentDate = () => new Date().toLocaleDateString('en-US');

const getValidatedAmount = (inputValue) => {
  const numericValue = inputValue.replace(/\./g, '').replace(',', '.');
  const amount = parseFloat(numericValue);
  return !isNaN(amount) && amount > 0 ? amount : null;
};

$('#deposit').on('submit', (event) => {
  event.preventDefault();

  const selectedAccount = $('#accountSelection').val();
  const amount = getValidatedAmount($('#amount').val());

  if (!selectedAccount) {
    showAlert(
      'Por favor, selecciona desde qué cuenta quieres depositar.',
      'danger'
    );
    return;
  }

  if (amount === null) {
    showAlert('Por favor, ingresa un monto válido.', 'danger');
    return;
  }

  let currentBalance = getLocalStorageItem('currentBalance', 0);
  currentBalance += amount;
  setLocalStorageItem('currentBalance', currentBalance);

  applyBalance();
  saveTransaction('Abono', amount, getCurrentDate(), 'abono');

  $('#amount').val('');
  $('#accountSelection').val('');
  showAlert('Depositado correctamente', 'success');
});
