$(document).ready(() => {
  applyBalance();
  loadLastThreeTransactions();
});

const loadLastThreeTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const lista = $('.transactions-list');

  lista.empty();
  const lastThreeTransactions = transactions.slice(-3).reverse();
  if (transactions.length === 0) {
    lista.append('<p class="text-center">No hay transacciones</p>');
  } else {
    lastThreeTransactions.forEach((transaction) => {
      const formattedAmount = parseFloat(transaction.amount).toLocaleString(
        'es-CL',
        { style: 'currency', currency: 'CLP' }
      );
      const transactionTypeClass =
        transaction.type === 'abono' ? 'abono' : 'cargo';
      const transactionIcon =
        transaction.type === 'abono'
          ? 'bi bi-arrow-down-left'
          : 'bi bi-arrow-up-right';

      lista.append(`
        <div class="last-transactions__item d-flex justify-content-between align-items-center rounded-4">
          <div class="last-transactions__item-name">${transaction.name}</div>
          <div class="last-transactions__item-date">${transaction.date}</div>
          <div class="last-transactions__item-amount">${formattedAmount}</div>
          <div 
          class="last-transactions__item-status text-center ${transactionTypeClass}">
          <span class="status-text">${transaction.type}</span>
          <i class="status-${transactionTypeClass} ${transactionIcon}"></i>
        </div>
        </div>      
      `);
    });
  }
};

const getTotalSpentThisMonth = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const transactionsEsteMes = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth() + 1;
    return transactionMonth === currentMonth && transaction.type === 'cargo';
  });

  const totalSpentThisMonth = transactionsEsteMes.reduce(
    (total, transaction) => {
      return total + parseFloat(transaction.amount);
    },
    0
  );

  return totalSpentThisMonth;
};

const getTotalReceivedThisMonth = () => {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const transactionsEsteMes = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth() + 1;
    return transactionMonth === currentMonth && transaction.type === 'abono';
  });
  const totalReceivedThisMonth = transactionsEsteMes.reduce(
    (total, transaction) => total + parseFloat(transaction.amount),
    0
  );
  return totalReceivedThisMonth;
};

const totalSpentThisMonth = getTotalSpentThisMonth();
$('#total-gastado').text(
  totalSpentThisMonth.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
);

const totalReceivedThisMonth = getTotalReceivedThisMonth();
$('#total-recibido').text(
  totalReceivedThisMonth.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
);
