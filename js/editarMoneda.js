// Obtener la clave de la moneda seleccionada de la URL
const urlParams = new URLSearchParams(window.location.search);
const claveMonedaOriginal = urlParams.get('clave');

// Cargar los datos de la moneda
window.onload = function() {
    const monedas = JSON.parse(localStorage.getItem('monedas')) || [];
    const moneda = monedas.find(m => m.clave === claveMonedaOriginal);

    if (moneda) {
        document.getElementById('clave').value = moneda.clave;
        document.getElementById('precioC').value = moneda.precioCompra.toFixed(2);
        document.getElementById('precioV').value = moneda.precioVenta.toFixed(2);
    } else {
        alert('Moneda no encontrada.');
        window.location.href = '../index.html';
    }
};

// Guardar los cambios en la moneda
document.getElementById('btn-editar-moneda').addEventListener('click', function() {
    let claveInput = document.getElementById('clave').value.trim();
    const precioCompraInput = document.getElementById('precioC').value;
    const precioVentaInput = document.getElementById('precioV').value;

    // Validación 1: Verificar que los campos estén completos
    if (!claveInput || !precioCompraInput || !precioVentaInput) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Validación 2: Verificar si la clave fue modificada
    if (claveInput.toUpperCase() !== claveMonedaOriginal) {
        // Convertir la clave a mayúsculas y validar que tenga exactamente 3 letras
        const clave = claveInput.toUpperCase(); // Convertir a mayúsculas
        const claveRegex = /^[A-Z]{3}$/;
        if (!claveRegex.test(clave)) {
            alert('La clave debe tener exactamente 3 letras y no debe contener números.');
            return;
        }

        // Validación 3: Verificar que la clave no esté duplicada
        const monedas = JSON.parse(localStorage.getItem('monedas')) || [];
        const claveExiste = monedas.some(m => m.clave === clave);

        if (claveExiste) {
            alert('La clave ya existe. Por favor, elija una clave diferente.');
            return;
        }

        // Asignar la clave modificada
        claveInput = clave;
    }

    // Validación 4: Los precios deben ser números con solo dos decimales
    const precioCompra = parseFloat(precioCompraInput).toFixed(2);
    const precioVenta = parseFloat(precioVentaInput).toFixed(2);

    if (isNaN(precioCompra) || isNaN(precioVenta)) {
        alert('Los precios deben ser números válidos.');
        return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(precioCompra) || !/^\d+(\.\d{1,2})?$/.test(precioVenta)) {
        alert('Los precios deben tener solo dos decimales.');
        return;
    }

    // Actualizar los datos de la moneda
    const monedas = JSON.parse(localStorage.getItem('monedas')) || [];
    const index = monedas.findIndex(m => m.clave === claveMonedaOriginal);

    if (index !== -1) {
        // Actualizar los datos
        monedas[index].clave = claveInput.toUpperCase();
        monedas[index].precioCompra = parseFloat(precioCompra);
        monedas[index].precioVenta = parseFloat(precioVenta);
        localStorage.setItem('monedas', JSON.stringify(monedas));
        alert('Moneda actualizada correctamente.');
        window.location.href = '../index.html';
    } else {
        alert('Error al actualizar la moneda.');
    }
});
