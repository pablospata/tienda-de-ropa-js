
/*
Funcion para cargar la pagina de producto.

Luego de que el usuario haga click en algun enlace de producto de la pagina principal, redireccionamos y enviamos el ID del producto con la URL para poder identificarlo y cargarlo en forma dinamica en product.html
*/

// Obtenemos el ID del producto del URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Buscamos el producto en el array de productos
let producto = productosArray.find(producto => producto.id == productId);

// Si el producto existe, mostramos la información
if(producto) {
    let productInfoDiv = document.getElementById('product-info');

    productInfoDiv.innerHTML = `
        <h1>${producto.nombre}</h1>
        <img src=".${producto.imagen1}" alt="${producto.nombre}">
        <img src=".${producto.imagen2}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio.toLocaleString('de-DE')}</p>
    `;
} else {
    // Si el producto no existe, mostramos un mensaje de error
    productInfoDiv.innerHTML = "<p>Producto no encontrado.</p>";
}