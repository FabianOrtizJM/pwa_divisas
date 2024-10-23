document.addEventListener("DOMContentLoaded", function () {
    // Por defecto, mostrar la pestaña de venta
    document.getElementById("pills-vender-tab").classList.add("active");
    document.getElementById("pills-vender").classList.add("show", "active");

    // Obtener las monedas guardadas en localStorage
    const monedasGuardadas = JSON.parse(localStorage.getItem('monedas')) || [];

    // Verificar si hay monedas guardadas, si no hay, mostrar una alerta
    if (monedasGuardadas.length === 0) {
        alert('No hay monedas disponibles. Por favor, guarde algunas monedas primero.');
        return;
    }

    // Llenar los select de monedas dinámicamente
    const selectMonedaComprar = document.getElementById("monedaComprar");
    const selectMonedaVender = document.getElementById("monedaVender");
    llenarSelectMonedas(selectMonedaComprar, monedasGuardadas);
    llenarSelectMonedas(selectMonedaVender, monedasGuardadas);

    // Asignar eventos para la compra
    document.getElementById("montoComprar").addEventListener("input", calcularCompra);
    document.getElementById("monedaComprar").addEventListener("change", calcularCompra);

    // Asignar eventos para la venta
    document.getElementById("montoVender").addEventListener("input", calcularVenta);
    document.getElementById("monedaVender").addEventListener("change", calcularVenta);

    // Asignar la validación de input para los montos
    document.getElementById("montoComprar").addEventListener("input", validarMontoInput);
    document.getElementById("montoVender").addEventListener("input", validarMontoInput);
});

// Función para llenar los select con las monedas disponibles
function llenarSelectMonedas(selectElement, monedasGuardadas) {
    // Limpiar las opciones del select antes de llenarlo
    selectElement.innerHTML = '';

    // Crear una opción por cada moneda guardada en localStorage
    monedasGuardadas.forEach(moneda => {
        const option = document.createElement("option");
        option.value = moneda.clave;
        option.textContent = moneda.clave; // Mostrar la clave de la moneda
        selectElement.appendChild(option);
    });
}

// Función para calcular la compra
function calcularCompra() {
    const monto = document.getElementById("montoComprar").value;
    const moneda = document.getElementById("monedaComprar").value;

    // Obtener las monedas guardadas de localStorage
    const monedasGuardadas = JSON.parse(localStorage.getItem('monedas')) || [];

    // Buscar la moneda seleccionada en las monedas guardadas
    const monedaSeleccionada = monedasGuardadas.find(m => m.clave === moneda);

    if (monedaSeleccionada) {
        const tasaCompra = monedaSeleccionada.precioCompra;
        const resultado = monto / tasaCompra;
        document.getElementById("resultadoCompra").textContent = `$${resultado.toLocaleString()} ${moneda}`;
    }
}

// Función para calcular la venta
function calcularVenta() {
    const monto = document.getElementById("montoVender").value;
    const moneda = document.getElementById("monedaVender").value;

    // Obtener las monedas guardadas de localStorage
    const monedasGuardadas = JSON.parse(localStorage.getItem('monedas')) || [];

    // Buscar la moneda seleccionada en las monedas guardadas
    const monedaSeleccionada = monedasGuardadas.find(m => m.clave === moneda);

    if (monedaSeleccionada) {
        const tasaVenta = monedaSeleccionada.precioVenta;
        const resultado = monto * tasaVenta;
        document.getElementById("resultadoVenta").textContent = `$${resultado.toLocaleString()}`;
    }
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
