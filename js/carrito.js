let botonComprar = document.querySelector('.boton-comprar');
if (botonComprar) {
    botonComprar.addEventListener('click', function () {            
        const titulo = document.querySelector('.titulo').innerText;
        const precio = document.querySelector('.producto__precio').innerText.replace('IVA incluido', '').trim();
        const cantidad = document.querySelector('input[name="cantidad"]').value;
        const talle = document.querySelector('input[name="size"]:checked').value;
    
        agregarAlCarrito(titulo, precio, cantidad, talle);

        document.getElementById('cart').classList.add('open');
    });
}

document.querySelector('#close-cart').addEventListener('click', function () {
    document.getElementById('cart').classList.remove('open');
});

document.querySelector('.carrito-icono').addEventListener('click', function () {
    document.getElementById('cart').classList.add('open');
});

// Carga el carrito desde el localStorage al inicio
document.addEventListener('DOMContentLoaded', function () {
    renderizarCarrito();
});

function agregarAlCarrito(titulo, precio, cantidad, talle, actualizarLocalStorage = true) {
    const cartItems = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    const precioNumerico = parseFloat(precio.replace('$', '').replace('.', '')) * cantidad;
    itemDiv.innerHTML = `<span>${titulo} - ${talle} - ${cantidad} x ${precio} = $${(precioNumerico).toLocaleString('es-AR')}</span>`;

    cartItems.appendChild(itemDiv);

    const totalActual = parseFloat(totalDiv.innerText.replace('Total: $', '').replace('.', ''));
    const nuevoTotal = totalActual + precioNumerico;

    totalDiv.innerText = `Total: $${(nuevoTotal).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

    actualizarContador(cantidad);

    if (actualizarLocalStorage) {
        const item = { titulo, precio, cantidad, talle };
        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

        carrito.push(item);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

function actualizarContador(cantidad) {
    const cartCount = document.getElementById('cart-count');
    const valorActual = parseInt(cartCount.innerText) || 0;
    const nuevoValor = valorActual + parseInt(cantidad);

    if (nuevoValor > 0) {
        cartCount.innerText = nuevoValor;
        cartCount.classList.add('show');
    } else {
        cartCount.innerText = '';
        cartCount.classList.remove('show');
    }
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

// Renderiza el carrito desde el localStorage
function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total').innerText = 'Total: $0';
    document.getElementById('cart-count').innerText = '';
    document.getElementById('cart-count').classList.remove('show');

    carrito.forEach(item => agregarAlCarrito(item.titulo, item.precio, item.cantidad, item.talle, false));
}

document.querySelector('#vaciar-carrito').addEventListener('click', function () {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres vaciar el carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            Swal.fire(
                'Vaciado',
                'Tu carrito ha sido vaciado.',
                'success'
            )  
            Toastify({
                text: "Carrito vaciado",
                duration: 3000,
                gravity: 'bottom',
                position: 'left',
                style: {
                    background: 'linear-gradient(135deg, #f44336, #000000)'
                }
            }).showToast();
        }
    })
});