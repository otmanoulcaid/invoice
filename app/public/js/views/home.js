export function renderInvoices(invoices) {
    const container = document.getElementById("results-container");
    const welcomeContainer = document.getElementById("welcome-container");
    container.innerHTML = "";

    if (!invoices || invoices.length === 0) {
        welcomeContainer.innerHTML = "";
        container.innerHTML = "<h2>No Invoice found!</h2>";
        return;
    }

    const content = invoices.map(invoice => renderSingleInvoice(invoice)).join('');
    container.innerHTML = content;
}

export function renderSingleInvoice(invoice) {
    const { numero, date, client, products } = invoice;

    const totalHT = products?.reduce((sum, p) => sum + (p.prix_u * p.qty), 0) ?? 0;
    const tva = totalHT * 0.20;
    const ttc = totalHT + tva;

    const productRows = (products ?? []).map(p => `
        <tr>
            <td>${p.nom}</td>
            <td>${p.prix_u.toFixed(2)} DH</td>
            <td>${p.qty}</td>
            <td>${(p.prix_u * p.qty).toFixed(2)} DH</td>
        </tr>
    `).join('');

    return `
    <div class="facture" data-invoice-num="${invoice.numero}">
        <div class="header">
            <h3>Facture N° : ${numero}</h3>
        </div>
        <div class="content">
            <div class="meta-data">
                <span><span class="bold-text">${client.adress} Le </span>: ${date}</span>
            </div>
            <div class="client-data">
                <h4>${client.nom}</h4>
                <div class="client-data-details">
                    <span>${client.adress}</span>
                    <span>${client.ville} ${client.pays}</span>
                </div>
            </div>
            <div class="products-data">
                <table class="products-table">
                    <tr>
                        <th>Article</th>
                        <th>Prix unitaire</th>
                        <th>Quantité</th>
                        <th>Montant</th>
                    </tr>
                    ${productRows}
                </table>
                <table class="total-prices-table">
                    <tr>
                        <th>Total Hors Taxes</th>
                        <td>${totalHT.toFixed(2)} DH</td>
                    </tr>
                    <tr>
                        <th>TVA (20%)</th>
                        <td>${tva.toFixed(2)} DH</td>
                    </tr>
                    <tr>
                        <th>Total TTC</th>
                        <td>${ttc.toFixed(2)} DH</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="footer">
            <span>Entreprise de vente de Materiel Informatique - ${client.ville}</span>
        </div>
    </div>
    `;
}
