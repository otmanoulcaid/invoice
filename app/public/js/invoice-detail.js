import { fetchInvoiceByNumber, deleteInvoice } from "./api/fetch-api.js";
import { renderSingleInvoice } from "./views/home.js";
document.addEventListener('DOMContentLoaded', initInvoiceDetailPage);

async function initInvoiceDetailPage() {
    document.getElementById('brand')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const params = new URLSearchParams(window.location.search);
    const invoiceNum = params.get('num');

    if (!invoiceNum) {
        alert("Invalid invoice URL");
        window.location.href = "index.html";
    }


    try {
        const invoice = await fetchInvoiceByNumber(invoiceNum);
        console.log("💡 raw invoice object:", invoice);

        const container = document.getElementById('results-container');
        container.innerHTML = renderSingleInvoice(invoice);

        setupEventListeners(invoiceNum);
    } catch (error) {
        showError("Failed to load invoice details");
        console.error("Error loading invoice:", error);
    }
}

function setupEventListeners(invoiceNum) {
    document.getElementById('edit-btn').addEventListener('click', () => {
        window.location.href = `edit-invoice.html?num=${invoiceNum}`;
    });

    document.getElementById('delete-btn').addEventListener('click', async () => {
        const confirmed = confirm("Are you sure you want to delete this invoice? This action cannot be undone.");
        if (confirmed) {
            try {
                await deleteInvoice(invoiceNum);
                alert("Invoice deleted successfully!");
                window.location.href = 'index.html';
            } catch (error) {
                console.error("Error deleting invoice:", error);
                alert("Failed to delete invoice. Please try again.");
            }
        }
    });
}

function showError(message) {
    const container = document.getElementById('results-container');
    container.innerHTML = `
        <div class="error-container">
            <h2>${message}</h2>
            <p>Return to <a href="index.html">home page</a></p>
        </div>
    `;
}