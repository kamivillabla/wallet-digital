const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = (key, defaultValue = null) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

// Saldo Actual
const applyBalance = () => {
  let currentBalance = getLocalStorageItem('currentBalance', 50000);

  if ($('#saldo-actual').length > 0) {
    $('#saldo-actual').text(
      currentBalance.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
      })
    );
  }
  setLocalStorageItem('currentBalance', currentBalance);
};

// Transacciones
const saveTransaction = (name, amount, date, type) => {
  let transactions = getLocalStorageItem('transactions', []);
  transactions.push({ name, amount, date, type });
  setLocalStorageItem('transactions', transactions);
};

// Contactos
const initializeLocalStorage = () => {
  const sampleContacts = [
    {
      nombre: 'John Doe',
      rut: '12345678-9',
      email: 'john.doe@gmail.com',
      banco: 'santander',
      cta: '000123456789',
    },
    {
      nombre: 'Jane Roe',
      rut: '98765432-1',
      email: 'jane.roe@gmail.com',
      banco: 'banco estado',
      cta: '987654321000',
    },
    {
      nombre: 'Isa Roe',
      rut: '98765432-5',
      email: 'isa.roe@gmail.com',
      banco: 'falabella',
      cta: '987654321000',
    },
  ];

  if (!getLocalStorageItem('contacts')) {
    setLocalStorageItem('contacts', sampleContacts);
  }
};
