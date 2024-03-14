$(document).ready(() => {
  loadTransactions();
});

const loadTransactions = () => {
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  transactions.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const lista = $('.history-transactions');
  lista.empty();

  if (transactions.length === 0) {
    lista.append('<p class="text-center">No hay transacciones</p>');
  } else {
    transactions.forEach((transaction) => {
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
        <div class="history-transactions__item d-flex justify-content-between align-items-center rounded-4">
          <div class="history-transactions__item-name">${transaction.name}</div>
          <div class="history-transactions__item-date">${transaction.date}</div>
          <div class="history-transactions__item-amount">${formattedAmount}</div>
          <div class="history-transactions__item-status ${transactionTypeClass}">
            <span class="status-text">${transaction.type}</span>
            <i class="status-${transactionTypeClass} ${transactionIcon}"></i>
          </div>
        </div>
      `);
    });
  }
};
