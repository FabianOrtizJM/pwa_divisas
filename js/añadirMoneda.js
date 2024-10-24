document.getElementById('btn-guardar-moneda').addEventListener('click', function() {
    const claveInput = document.getElementById('clave').value.trim();
    const precioCompraInput = document.getElementById('precioC').value;
    const precioVentaInput = document.getElementById('precioV').value;

    // Validación 1: Verificar que todos los campos estén completos
    if (!claveInput || !precioCompraInput || !precioVentaInput) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Validación 2: La clave debe tener exactamente 3 letras (sin números)
    const clave = claveInput.toUpperCase(); // Validación 3: Convertir a mayúsculas
    const claveRegex = /^[A-Z]{3}$/;
    if (!claveRegex.test(clave)) {
        alert('La clave debe tener exactamente 3 letras y no debe contener números.');
        return;
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

    // Verificar si la clave ya existe
    let monedas = JSON.parse(localStorage.getItem('monedas')) || [];
    const claveExiste = monedas.some(moneda => moneda.clave === clave);

    if (claveExiste) {
        alert('Ya existe una moneda con esa clave.');
        return;
    }

    // Guardar los datos de la moneda
    const monedaData = {
        clave: clave, // Ya está en mayúsculas
        precioCompra: parseFloat(precioCompra),
        precioVenta: parseFloat(precioVenta)
    };

    monedas.push(monedaData);
    localStorage.setItem('monedas', JSON.stringify(monedas));

    alert('Moneda guardada correctamente');
    window.location.href = '../index.html';
});

// Cargar monedas almacenadas (opcional)
window.onload = function() {
    const monedas = JSON.parse(localStorage.getItem('monedas')) || [];
    console.log(monedas);  // Mostrar las monedas en la consola
};

const storedEmpresa = JSON.parse(localStorage.getItem('empresa'));
    if (storedEmpresa) {
        document.getElementById('navbar-foto').src = storedEmpresa.foto || '/img/noImage.jpg';
        document.getElementById('navbar-empresa').textContent = storedEmpresa.nombre || 'nombre_empresa';
    }
