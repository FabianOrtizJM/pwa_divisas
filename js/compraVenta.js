
const tasasDeCambio = {
    USD: { compra: 18, venta: 15 },
    EUR: { compra: 21, venta: 17 }
};

// Función para calcular la compra
function calcularCompra() {
    const monto = document.getElementById("montoComprar").value;
    const moneda = document.getElementById("monedaComprar").value;
    const tasaCompra = tasasDeCambio[moneda].compra;
    const resultado = monto * tasaCompra;
    document.getElementById("resultadoCompra").textContent = `$${resultado.toLocaleString()}`;
}

// Función para calcular la venta
function calcularVenta() {
    const monto = document.getElementById("montoVender").value;
    const moneda = document.getElementById("monedaVender").value;
    const tasaVenta = tasasDeCambio[moneda].venta;
    const resultado = monto * tasaVenta;
    document.getElementById("resultadoVenta").textContent = `$${resultado.toLocaleString()}`;
}

// Asignar eventos
document.getElementById("montoComprar").addEventListener("input", calcularCompra);
document.getElementById("monedaComprar").addEventListener("change", calcularCompra);

document.getElementById("montoVender").addEventListener("input", calcularVenta);
document.getElementById("monedaVender").addEventListener("change", calcularVenta);

