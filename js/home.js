document.addEventListener("DOMContentLoaded", function() {
    // Obtener las monedas almacenadas en localStorage
    const currencies = JSON.parse(localStorage.getItem('monedas')) || [];

    // Obtener el contenedor donde se agregarán las tarjetas dinámicamente
    const container = document.getElementById("currency-container");

    // Recorrer las monedas y crear una tarjeta para cada una
    currencies.forEach(currency => {
        // Crear la columna contenedora para cada tarjeta
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';

        // Crear el contenedor de la tarjeta (frame)
        const frame = document.createElement('div');
        frame.className = 'frame';

        // Añadir botón de edición
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.style.color = 'white'; 
        editButton.onclick = () => editarMoneda(currency.clave);
        const editIcon = document.createElement('i');
        editIcon.className = 'bi bi-pencil-fill';
        editButton.appendChild(editIcon);
        frame.appendChild(editButton);

        // Añadir el nombre de la moneda (clave)
        const currencyName = document.createElement('div');
        currencyName.className = 'text-center mb-3 label-medium';
        currencyName.textContent = currency.clave;
        frame.appendChild(currencyName);

        // Crear las secciones de compra y venta
        const row = document.createElement('div');
        row.className = 'row';

        const buyCol = document.createElement('div');
        buyCol.className = 'col-6 text-center';
        buyCol.innerHTML = `<div class="label-small">Compra</div><div class="label-large">$${currency.precioCompra.toFixed(2)}</div>`;

        const sellCol = document.createElement('div');
        sellCol.className = 'col-6 text-center';
        sellCol.innerHTML = `<div class="label-small">Venta</div><div class="label-large">$${currency.precioVenta.toFixed(2)}</div>`;

        // Añadir las secciones a la fila
        row.appendChild(buyCol);
        row.appendChild(sellCol);

        // Añadir la fila al frame
        frame.appendChild(row);

        // Añadir el frame a la columna
        col.appendChild(frame);

        // Añadir la columna al contenedor de monedas
        container.appendChild(col);
    });
});

// Función para editar moneda (por ahora muestra un alert)
function editarMoneda(clave) {
    alert("Editando moneda: " + clave);
}
