let productosArray = [];


async function cargarProductos() {
    try {
        let respuesta = await fetch('./js/productos.json');
        if (!respuesta.ok) {
            throw new Error('Error al obtener el archivo JSON');
        }
        let productosJSON = await respuesta.json();

        productosJSON.forEach(p => {
            productosArray.push(new Producto(p.id, p.nombre, p.categoria, p.precio, p.imagen1, p.imagen2, p.descripcion));
        });

        /*
        Funcion para cargar la pagina de producto.
        
        Luego de que el usuario haga click en algun enlace de producto de la pagina principal, redireccionamos y enviamos el ID del producto con la URL para poder identificarlo y cargarlo en forma dinamica en product.html
        */

        // Obtenemos el ID del producto del URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        let productInfoDiv = document.getElementById('product-info');

        // Buscamos el producto en el array de productos

        let producto = productosArray.find(producto => producto.id == productId);

        // Si el producto existe, mostramos la información
        if (producto) {

            productInfoDiv.innerHTML = `
            <div class="imagenes">
            <img class="product-page imagen-principal" src=".${producto.imagen1}" alt="${producto.nombre}">
            <img class="product-page imagen-secundaria" src=".${producto.imagen2}" alt="${producto.nombre}">
            </div>
            <div class="descripciones">
                <h1 class="titulo">${producto.nombre}</h1>
                <div class="container-talles">
                    <h3 class="titulo-talle">Talle</h3>
                    <div class="talles">
                        <div class="talle-selecionado"><input type="radio" name="size" value="S"><p>S</p></div>
                        <div class="talle-selecionado"><input type="radio" name="size" value="M"><p>M</p></div>
                        <div class="talle-selecionado"><input type="radio" name="size" value="L" checked><p>L</p></div>
                        <div class="talle-selecionado"><input type="radio" name="size" value="XL"><p>XL</p></div>
                        <div class="talle-selecionado"><input type="radio" name="size" value="2XL"><p>2XL</p></div>
                        <div class="talle-selecionado"><input type="radio" name="size" value="3XL"><p>3XL</p></div>
                    </div>
                </div>
                <div class="container-precio">
                    <div class="producto__precio">$${producto.precio.toLocaleString('de-DE')} <span>IVA incluido</span></div>
                    <div class="producto__cuotas">
                        <p>Hasta 6 cuotas sin interés de $ ${(producto.precio / 6).toLocaleString('de-DE')}</p>
                    </div>
                    <input type="number" name="cantidad" id="" value="1">
                    <button class="boton-comprar">
                        <img class="logo-bag" src="../assets/svg/bag2.svg" alt="" srcset="">
                        Comprar
                    </button>
                </div>
                <div class="container-descripcion">
                    <h3>Descripción</h3>
                    <p>${producto.descripcion}</p>
                </div>
            </div>
            `;
            document.querySelector('.boton-comprar').addEventListener('click', function () {
                const titulo = document.querySelector('.titulo').innerText;
                const precio = document.querySelector('.producto__precio').innerText.replace('IVA incluido', '').trim();
                const cantidad = document.querySelector('input[name="cantidad"]').value;
                const talle = document.querySelector('input[name="size"]:checked').value;

                agregarAlCarrito(titulo, precio, cantidad, talle);
                document.getElementById('cart').classList.add('open');
            });
        } else {
            // Si el producto no existe, mostramos un mensaje de error
            productInfoDiv.innerHTML = "<p>Producto no encontrado.</p>";
        }

    } catch (error) {
        console.error('Hubo un problema con la petición fetch:', error.message);
    }
}

cargarProductos();
