// Initial balance
let balance = 200.00;
// Transaction history
let transactions = [];

// Format currency
function formatCurrency(amount) {
  return 'CHF ' + amount.toFixed(2);
}

// Update balance display
function updateBalance() {
  document.getElementById('balance').textContent = formatCurrency(balance);
}

// Send money function
function sendMoney() {
  const recipient = document.getElementById('recipient').value.trim();
  const amountInput = document.getElementById('amount').value;

  if (!recipient) {
    alert('Bitte geben Sie einen Empfänger ein.');
    return;
  }

  const amount = parseFloat(amountInput);

  if (isNaN(amount) || amount <= 0) {
    alert('Bitte geben Sie einen gültigen Betrag ein.');
    return;
  }

  if (amount > balance) {
    alert('Nicht genügend Guthaben verfügbar.');
    return;
  }

  // Update balance
  balance -= amount;
  updateBalance();

  // Add to transactions
  const transaction = {
    recipient: recipient,
    amount: amount,
    date: new Date(),
    type: 'sent'
  };

  transactions.unshift(transaction);
  updateTransactions();

  // Show success view
  document.getElementById('success-amount').textContent = formatCurrency(amount);
  document.getElementById('success-recipient').textContent = `An: ${recipient}`;
  document.getElementById('main-view').style.display = 'none';
  document.getElementById('success-view').style.display = 'block';

  // Clear inputs
  document.getElementById('recipient').value = '';
  document.getElementById('amount').value = '';
}

// Close success view
function closeSuccess() {
  document.getElementById('success-view').style.display = 'none';
  document.getElementById('main-view').style.display = 'block';
}

// Update transactions list
function updateTransactions() {
  const transactionsContainer = document.getElementById('transactions');

  if (transactions.length === 0) {
    transactionsContainer.innerHTML = '<p class="no-transactions">Keine Transaktionen verfügbar.</p>';
    return;
  }

  let html = '';

  transactions.forEach(transaction => {
    const date = transaction.date.toLocaleDateString('de-CH');
    const amountClass = transaction.type === 'sent' ? 'sent' : 'received';
    const amountPrefix = transaction.type === 'sent' ? '-' : '+';

    html += `
      <div class="transaction-item">
        <div class="transaction-details">
          <span class="transaction-recipient">${transaction.recipient}</span>
          <span class="transaction-date">${date}</span>
        </div>
        <span class="transaction-amount ${amountClass}">${amountPrefix} ${formatCurrency(transaction.amount)}</span>
      </div>
    `;
  });

  transactionsContainer.innerHTML = html;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  updateBalance();
  updateTransactions();
});