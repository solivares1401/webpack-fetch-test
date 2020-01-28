let datos;
let itemsPorPagina = 50;
let paginaActual = 1;
let paginasTotales;

let cargarApi = () => {
    fetch('https://picsum.photos/list').then((res) => {
        return res.json();
    })    
        .then((imgs) => {
            datos = imgs.sort();               
            paginasTotales = Math.round(datos.length / itemsPorPagina);
            let imagenes = imgs.filter((img, i) => i < itemsPorPagina);            
            render(imagenes);
            console.log(`itemsPorPagina= ${itemsPorPagina} paginasTotales= ${paginasTotales}`);          
        })
}

document.addEventListener("DOMContentLoaded", (e) => {
    console.log("dom cargado...");
    cargarApi();    
    init();        
});	

let cambioPagina = (n) =>{
    paginaActual = n;
        let imagenes = datos.filter((img, i) => i < itemsPorPagina * paginaActual);
        render(imagenes);    
}

let init = () =>{    
    
    document.querySelector('#paginador').addEventListener("click", (e)=>{
        e.preventDefault(); 
        console.log("clic paginador", e.target.text);         
        cambioPagina(parseInt(e.target.text));

    });
}

let render = (imagenes) =>{
    let html = '';
    imagenes.forEach((img) => {
        html += `					
        <div class="row">
            <div class="col-2">	
                ${img.id}						
            </div>
            <div class="col-2">	
                ${img.author}						
            </div>
            <div class="col-2">
                ${img.filename}								
            </div>
            <div class="col-4">
                <a href="${img.post_url}" target="_blank"><i class="far fa-image"></i> Ver</a>
            </div>	
        </div>																															
    `    
    })   
    
    let pags = '';
    for (var i = 0; i < paginasTotales; i++) {
        pags += `
            <li class="page-item"><a id=pag${i+1}" class="page-link" href="#">${i+1}</a></li>
        `
     }    
    
    let paginador = `<nav aria-label="Page navigation example">
        <ul class="pagination"> 
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            ${pags} 
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>`;

    document.getElementById('resultado').innerHTML = html;  

    document.getElementById('paginador').innerHTML = paginador;  

   
     init();

}