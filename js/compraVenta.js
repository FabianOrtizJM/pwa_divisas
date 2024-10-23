document.addEventListener("DOMContentLoaded", function () {

    // Por defecto, mostrar la pestaña de venta
    document.getElementById("pills-vender-tab").classList.add("active");
    document.getElementById("pills-vender").classList.add("show", "active");

    // Llenar los select de monedas dinámicamente
    const selectMonedaComprar = document.getElementById("monedaComprar");
    const selectMonedaVender = document.getElementById("monedaVender");
    llenarSelectMonedas(selectMonedaComprar);
    llenarSelectMonedas(selectMonedaVender);

    // Asignar eventos para la compra
    document.getElementById("montoComprar").addEventListener("input", calcularCompra);
    document.getElementById("monedaComprar").addEventListener("change", calcularCompra);

    // Asignar eventos para la venta
    document.getElementById("montoVender").addEventListener("input", calcularVenta);
    document.getElementById("monedaVender").addEventListener("change", calcularVenta);
});

const tasasDeCambio = {
    USD: { compra: 18, venta: 15 },
    EUR: { compra: 21, venta: 17 },
    GBP: { compra: 25, venta: 22 } // Puedes agregar más monedas aquí
};

// Función para llenar el select con las monedas disponibles
function llenarSelectMonedas(selectElement) {
    Object.keys(tasasDeCambio).forEach(moneda => {
        const option = document.createElement("option");
        option.value = moneda;
        option.textContent = moneda;
        selectElement.appendChild(option);
    });
}

// Función para calcular la compra
function calcularCompra() {
    const monto = document.getElementById("montoComprar").value;
    const moneda = document.getElementById("monedaComprar").value;
    const tasaCompra = tasasDeCambio[moneda].compra;
    const resultado = monto / tasaCompra;
    //Resultado con la moneda seleccionada
    document.getElementById("resultadoCompra").textContent = `$${resultado.toLocaleString()} ${moneda}`;
}

// Función para calcular la venta
function calcularVenta() {
    const monto = document.getElementById("montoVender").value;
    const moneda = document.getElementById("monedaVender").value;
    const tasaVenta = tasasDeCambio[moneda].venta;
    const resultado = monto * tasaVenta;
    document.getElementById("resultadoVenta").textContent = `$${resultado.toLocaleString()}`;
}

// Validación para permitir solo números y hasta dos decimales
function validarMontoInput(event) {
    const input = event.target;
    const valor = input.value;
    const regex = /^\d{0,10}(\.\d{0,2})?$/;

    if (!regex.test(valor)) {
        // Si el valor no es válido, remueve el último carácter introducido
        input.value = valor.slice(0, -1);
    }
}

// Asignar la validación de input para los montos
document.getElementById("montoComprar").addEventListener("input", validarMontoInput);
document.getElementById("montoVender").addEventListener("input", validarMontoInput);
