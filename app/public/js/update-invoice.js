import { fetchInvoiceByNumber, updateInvoice } from './api/fetch-api.js';

export function initUpdateInvoicePage() {
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
        <input type="text" class="product-name" required />
      </div>
      <div class="input-group">
        <label>Unit Price (DH)</label>
        <input type="number" class="product-price" required min="0" />
      </div>
      <div class="input-group">
        <label>Quantity</label>
        <input type="number" class="product-qty" required min="1" />
      </div>
      <button type="button" class="remove-btn">Remove</button>
    `;

    div.querySelector('.remove-btn').addEventListener('click', () => div.remove());
    productContainer.appendChild(div);
  });

  invoiceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit();
  });

  loadInvoiceData();
}

async function loadInvoiceData() {
  const urlParams = new URLSearchParams(window.location.search);
  const num = urlParams.get('num');
  if (!num) {
    alert('No invoice number specified.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const invoice = await fetchInvoiceByNumber(num);

    document.getElementById('invoice-number').value = invoice.numero;
    document.getElementById('invoice-date').value = invoice.date;

    document.getElementById('client-name').value = invoice.client.nom || '';
    document.getElementById('client-address').value = invoice.client.adress || '';
    document.getElementById('client-city').value = invoice.client.ville || '';
    document.getElementById('client-country').value = invoice.client.pays || '';

    const productContainer = document.getElementById('products-container');
    productContainer.innerHTML = '';

    invoice.products.forEach((prod) => {
      const div = document.createElement('div');
      div.classList.add('form-row', 'product-row');

      div.innerHTML = `
        <div class="input-group">
          <label>Product Name</label>
          <input type="text" class="product-name" required value="${prod.nom}" />
        </div>
        <div class="input-group">
          <label>Unit Price (DH)</label>
          <input type="number" class="product-price" required min="0" value="${prod.prix_u}" />
        </div>
        <div class="input-group">
          <label>Quantity</label>
          <input type="number" class="product-qty" required min="1" value="${prod.qty}" />
        </div>
        <button type="button" class="remove-btn">Remove</button>
      `;

      div.querySelector('.remove-btn').addEventListener('click', () => div.remove());
      productContainer.appendChild(div);
    });
  } catch (error) {
    alert('Failed to load invoice data: ' + error.message);
    window.location.href = 'index.html';
  }
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

  const confirmMsg = `Are you sure you want to update invoice number ${numero}?`;
  if (!confirm(confirmMsg)) return;

  try {
    await updateInvoice(numero, {
      numero,
      date,
      client: { nom, adress, ville, pays },
      products
    });

    alert('Invoice updated successfully.');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Error updating invoice: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', initUpdateInvoicePage);
