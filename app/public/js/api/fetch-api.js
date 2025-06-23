const API_BASE_URL = 'http://localhost:3003/api';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
}

export async function fetchAllInvoices() {
  try {
    const [invoices, clients, products] = await Promise.all([
      fetch(`${API_BASE_URL}/invoice`).then(handleResponse),
      fetch(`${API_BASE_URL}/client`).then(handleResponse),
      fetch(`${API_BASE_URL}/product`).then(handleResponse),
    ]);

    return invoices.map(invoice => ({
      ...invoice,
      client: clients.find(c => c.nom === invoice.client),
      products: products.filter(p => p.facture === invoice.numero)
    }));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}

export async function fetchInvoiceByNumber(numero) {
  try {
    let invResp = await fetch(`${API_BASE_URL}/invoice/${encodeURIComponent(numero)}`)
      .then(handleResponse);

    const raw = Array.isArray(invResp) ? invResp[0] : invResp;
    const allProducts = await fetch(`${API_BASE_URL}/product`).then(handleResponse);
    let clientResp = await fetch(`${API_BASE_URL}/client/${encodeURIComponent(raw.client)}`)
      .then(handleResponse);
    const client = Array.isArray(clientResp) ? clientResp[0] : clientResp;

    return {
      ...raw,
      client,
      products: allProducts.filter(p => p.facture === numero)
    };
  } catch (error) {
    console.error(`Error fetching invoice ${numero}:`, error);
    throw error;
  }
}

export async function fetchInvoicesByClient(clientName) {
  try {
    const allInvoices = await fetchAllInvoices();
    return allInvoices.filter(invoice =>
      invoice.client.nom.toLowerCase().includes(clientName.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching invoices by client:', error);
    throw error;
  }
}

export async function updateInvoice(numero, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/invoice/${encodeURIComponent(numero)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    });

    return handleResponse(response);
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
}

export async function deleteInvoice(numero) {
  try {
    const response = await fetch(`${API_BASE_URL}/invoice/${encodeURIComponent(numero)}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete invoice');
    }

    return true;
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
}

export async function addInvoice({ numero, date, nom, adress, ville, pays, products }) {
  try {
    const clientResponse = await fetch(`${API_BASE_URL}/client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom, adress, ville, pays })
    });
    const client = await handleResponse(clientResponse);

    const invoiceResponse = await fetch(`${API_BASE_URL}/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numero, date, client_id: client.id })
    });
    await handleResponse(invoiceResponse);

    for (const product of products) {
      await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...product, facture: numero })
      }).then(handleResponse);
    }
  } catch (error) {
    console.error('Error adding invoice:', error);
    throw error;
  }
}
