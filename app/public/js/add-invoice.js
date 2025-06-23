import { addInvoice } from './api/fetch-api.js';

export function initAddInvoicePage() {
  document.getElementById('brand')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  const invoiceForm = document.getElementById('invoice-form');
  const productContainer = document.getElementById('products-container');
  const addProductBtn = document.getElementById('add-product');

  addProductBtn.addEventListener('click', () => {
    if (productContainer.children.length >= 5) return;

    const div = document.createElement('div');
    div.classList.add('form-row', 'product-row');

    div.innerHTML = `
      <div class="input-group">
        <label>Product Name</label>
        <input type="text" class="product-name" required>
      </div>
      <div class="input-group">
        <label>Unit Price (DH)</label>
        <input type="number" class="product-price" required min="0">
      </div>
      <div class="input-group">
        <label>Quantity</label>
        <input type="number" class="product-qty" required min="1">
      </div>
      <button type="button" class="remove-btn">Remove</button>
    `;

    div.querySelector('.remove-btn').addEventListener('click', () => {
      div.remove();
    });

    productContainer.appendChild(div);
  });

  invoiceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit();
  });
}

async function handleFormSubmit() {
  const numero = document.getElementById('invoice-number').value.trim();
  const date = document.getElementById('invoice-date').value;

  const nom = document.getElementById('client-name').value.trim();
  const adress = document.getElementById('client-address').value.trim();
  const ville = document.getElementById('client-city').value.trim();
  const pays = document.getElementById('client-country').value.trim();

  const productRows = Array.from(document.querySelectorAll('.product-row'));
  const products = productRows.map(row => ({
    nom: row.querySelector('.product-name').value.trim(),
    prix_u: parseFloat(row.querySelector('.product-price').value),
    qty: parseInt(row.querySelector('.product-qty').value),
    facture: numero
  }));

  const confirmMsg = `Are you sure you want to add invoice number ${numero}?`;
  const confirmed = confirm(confirmMsg);
  if (!confirmed) return;

  try {
    await addInvoice({
      numero,
      date,
      client: { nom, adress, ville, pays },
      products
    });

    alert('Invoice added successfully.');
    window.location.href = 'index.html';
  } catch (error) {
    console.error(error);
    alert('Error adding invoice: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', initAddInvoicePage);
