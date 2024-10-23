document.addEventListener("DOMContentLoaded", function() {
    const currencies = [
        { name: "USD", buy: 34543, sell: 324 },
        { name: "EUR", buy: 21323, sell: 1023 },
        { name: "GBP", buy: 28120, sell: 1520 },
        { name: "KWN", buy: 28120, sell: 1520 }
    ];

    const container = document.getElementById("currency-container");

    currencies.forEach(currency => {
        // Create the main frame for each currency
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';

        const frame = document.createElement('div');
        frame.className = 'frame';

        // Add edit button
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.style.color = 'white'; 
        editButton.onclick = () => editarMoneda(currency.name);
        const editIcon = document.createElement('i');
        editIcon.className = 'bi bi-pencil-fill';
        editButton.appendChild(editIcon);
        frame.appendChild(editButton);

        // Currency name
        const currencyName = document.createElement('div');
        currencyName.className = 'text-center mb-3 label-medium';
        currencyName.textContent = currency.name;
        frame.appendChild(currencyName);

        // Create the buy and sell sections
        const row = document.createElement('div');
        row.className = 'row';

        const buyCol = document.createElement('div');
        buyCol.className = 'col-6 text-center';
        buyCol.innerHTML = `<div class="label-small">Compra</div><div class="label-large">$${currency.buy.toLocaleString()}</div>`;

        const sellCol = document.createElement('div');
        sellCol.className = 'col-6 text-center';
        sellCol.innerHTML = `<div class="label-small">Venta</div><div class="label-large">$${currency.sell.toLocaleString()}</div>`;

        row.appendChild(buyCol);
        row.appendChild(sellCol);
        frame.appendChild(row);

        col.appendChild(frame);
        container.appendChild(col);
    });
});

// Edit function for currency
function editarMoneda(moneda) {
    alert("Editando moneda: " + moneda);
}
