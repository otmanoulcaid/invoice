export function initUpdateInvoicePage()
{
    document.getElementById('brand')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const invoiceForm = document.getElementById('invoice-form');
    invoiceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleFormSubmit();
    });
}