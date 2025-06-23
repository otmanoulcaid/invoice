import { 
    fetchAllInvoices, 
    fetchInvoiceByNumber, 
    fetchInvoicesByClient 
} from "./api/fetch-api.js";
import { renderInvoices } from "./views/home.js";

document.addEventListener('DOMContentLoaded', initHomePage);

function cookieExist(token) {
    return document.cookie.split('; ').some(cookie => cookie.includes(token));
}


async function initHomePage() {
    try {
        if (!cookieExist('token'))
        {
            window.location.href = 'form.html'
        }
        else
        {
            const invoices = await fetchAllInvoices();
            renderInvoices(invoices);
            document.getElementById('search-btn').addEventListener('click', handleSearch);
            document.getElementById('brand').addEventListener('click', () => location.reload());
            document.getElementById('new-invoice-btn').addEventListener('click', () => window.location.href = 'add-invoice.html');
            document.getElementById('results-container').addEventListener('click', handleInvoiceClick);
        }
        
    } catch (error) {
        console.error("Failed to load data:", error);
        alert("Failed to load invoices. Please try again later.");
    }
}

async function handleSearch() {
    const query = document.getElementById('search-input').value.trim();
    const type = document.getElementById('search-type').value;

    if (!query) {
        const invoices = await fetchAllInvoices();
        renderInvoices(invoices);
        return;
    }

    try {
        let invoices = [];
        if (type === 'number') {
            const invoice = await fetchInvoiceByNumber(query);
            invoices = [{
                ...invoice,
                produits: invoice.products || invoice.produits || []
            }];
        } else if (type === 'client') {
            invoices = await fetchInvoicesByClient(query);
        }
        
        renderInvoices(invoices);
    } catch (error) {
        console.error("Search failed:", error);
        document.getElementById('results-container').innerHTML = `
            <div class="no-results">
                <p>No invoices found matching "${query}"</p>
            </div>
        `;
    }
}

function handleInvoiceClick(e) {
    const invoiceElement = e.target.closest('.facture');
    
    if (!invoiceElement) {
        console.error("Clicked element is not an invoice");
        return;
    }

    const invoiceNum = invoiceElement.dataset.invoiceNum;
    
    if (!invoiceNum) {
        console.error("No invoice number found on element:", invoiceElement);
        console.log("Element dataset:", invoiceElement.dataset);
        return;
    }

    console.log("Navigating to invoice:", invoiceNum);
    window.location.href = `invoice-detail.html?num=${encodeURIComponent(invoiceNum)}`;
}