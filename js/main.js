let productosContenedor = document.querySelector('.productos');
let filtroCategorais = document.querySelector('.filtroCategorias');

/*
Funcion para cargar los produtos. Se utiliza para la primer carga inicial, y luego para mostrar los productos que se van 
filtrando.

Recibe un array de productos como parametros.
*/
function displayProductosItems(productosItems) {
    let displayProductos = productosItems.map(function (item) {

        return `
                <article class="producto">
                    <div class="producto__imagen">
                        <a href="./pages/product.html?id=${item.id}">
                            <img src=${item.imagen1} alt=${item.nombre}>
                        </a>
                    </div>                    
                    <div class="producto__description">
                        <div class="producto__datos">
                            <div class="producto__col">
                                <div class="producto__categoria">
                                    <p>${item.categoria}</p>
                                </div>
                                <div class="producto__titulo">
                                    <h3><a href="./pages/product.html?id=${item.id}">${item.nombre}</a></h3>
                                </div>
                            </div>
                            <div class="producto__precio">
                                <span>$ ${item.precio.toLocaleString('de-DE')}</span>
                            </div>
                        </div>
                        <div class="producto__cuotas">
                            <p>Hasta 6 cuotas sin interés de <span>$ ${(item.precio / 6).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span></p>
                        </div>
                    </div>
                </article>
            `;
    });

    productosContenedor.innerHTML = displayProductos.join(' ');;
}

/*
Funcion para cargar las categorias y la cantidad de productos en cada una. Se utiliza para la primer carga inicial.

Recibe el array de categorias.
*/
function displayCategoriasItems(categoriasItems) {
    let displayCategorias = categoriasItems.map(function (item) {

        return `
                <li>
                    <div class="categoria">
                        <input type="checkbox" class="checkbox" value="${item.nombre}">
                        <p class="name">${item.nombre}</p>                    
                    </div>                            
                    <span class="count">(${item.cantidad})</span>
                </li>
                        
            `;
    });

    filtroCategorais.innerHTML = displayCategorias.join(' ');;
}

/*
En esta funcion se agrega los listeners a los filtros. 
*/
function addListeners() {
    // Buscamos todos los filtros de checkbox
    const filtrosCheckbox = document.querySelectorAll('.checkbox');

    // Recorremos cada checkbox
    filtrosCheckbox.forEach(element => {

        // A cada checkbox le agregamos el listener de 'change'
        element.addEventListener('change', () => {

            // Creamos un arreglo vacio para ir agregando las categorias que se marcan
            let categoriasSeleccionadas = [];

            // Buscamos todos los checkbox marcados con "checked"
            const checkboxMarcados = document.querySelectorAll('.checkbox:checked')

            // Recorremos los marcados y los agregamos al array categoriasSeleccionadas
            checkboxMarcados.forEach(marcado => {
                categoriasSeleccionadas.push(marcado.value);
            })

            // Si no hay categorias seleccionadas mostramos todos los productos
            if (categoriasSeleccionadas.length === 0) {
                displayProductosItems(productosArray);
            } else {
                let productosFiltrados = productosArray.filter(productosItems => {
                    return categoriasSeleccionadas.includes(productosItems.categoria);
                });
                displayProductosItems(productosFiltrados);
            }
        });
    });
}

displayCategoriasItems(categoriasArray);
displayProductosItems(productosArray);
addListeners();