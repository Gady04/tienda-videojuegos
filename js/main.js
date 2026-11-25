let carrito = [];
const contadorCarrito = document.getElementById('contador-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const btnVaciar = document.getElementById('btn-vaciar');

// 1. Funcionalidad: Agregar productos
document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-agregar');
        const nombre = btn.getAttribute('data-nombre');
        const precio = parseFloat(btn.getAttribute('data-precio'));

        carrito.push({ nombre, precio });
        actualizarCarritoUI();
    });
});

// 2. Funcionalidad: Actualizar vista del carrito
function actualizarCarritoUI() {
    contadorCarrito.innerText = carrito.length;
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="list-group-item text-center bg-transparent text-white border-secondary">Tu carrito está vacío.</li>';
        totalCarrito.innerText = '$0 MXN';
        return;
    }

    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center bg-transparent text-white border-secondary';
        li.innerHTML = `
            <span>${item.nombre}</span>
            <div>
                <span class="precio-xbox fw-bold me-2">$${item.precio} MXN</span>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">&times;</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    totalCarrito.innerText = `$${total} MXN`;
}

// 3. Funcionalidad: Eliminar producto individual
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarritoUI();
}

// 4. Funcionalidad: Vaciar Carrito completo
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        carrito = [];
        actualizarCarritoUI();
    });
}

// 5. Funcionalidad: Filtro dinámico por Consolas
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasProductos = document.querySelectorAll('.tarjeta-producto');

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach(b => b.classList.remove('active'));
        boton.classList.add('active');

        const filtro = boton.getAttribute('data-filtro');

        tarjetasProductos.forEach(tarjeta => {
            if (filtro === 'todos' || tarjeta.getAttribute('data-categoria') === filtro) {
                tarjeta.style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

// 6. Funcionalidad: Formulario de Contacto
const formContacto = document.getElementById('formContacto');
const alertaContacto = document.getElementById('alertaContacto');

if (formContacto) {
    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        alertaContacto.classList.remove('d-none');
        formContacto.reset();

        setTimeout(() => {
            alertaContacto.classList.add('d-none');
        }, 4000);
    });
}