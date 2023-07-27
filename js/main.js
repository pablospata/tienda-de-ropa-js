let productosContenedor = document.querySelector('.productos');


/*
Funcion para cargar los produtos. Se utiliza para la primer carga, y para mostrar los productos que se van 
filtrando
*/
function displayProductosItems(productosItems) {
    let displayProductos = productosItems.map(function (item) {

        return `
                <article class="producto">
                    <div class="producto__imagen">
                        <a href="#">
                            <img src=${item.imagen} alt=${item.nombre}>
                        </a>
                    </div>                    
                    <div class="producto__description">
                        <div class="producto__datos">
                            <div class="producto__col">
                                <div class="producto__categoria">
                                    <p>${item.categoria}</p>
                                </div>
                                <div class="producto__titulo">
                                    <h3><a href="#">${item.nombre}</a></h3>
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

displayProductosItems(productosArray);