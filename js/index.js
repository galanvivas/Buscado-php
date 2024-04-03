/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}



$(document).ready(function() {

 
    
    inicializarSlider();
    playVideoOnScroll();
    cargaSelect();

    var data = {
              ciudad: '',
              tipo: '',
              precio: 0
          };
     document.getElementById("mostrarTodos").addEventListener("click", function() {
          mostrarResultados(data);
      });

   
});



function cargaSelect() {
  
  // body...
  $.ajax({
      
    url : 'cargaSelect.php',
    // data : { id : 123 },
    type : 'GET',
    dataType : 'json',
    success : function(data) {
        $.each(data.ciudadesUnicas, function(key, value) {  
            
        $('#selectCiudad').append('<option value="' + value + '">' + value + '</option>');
        });

        $.each(data.tipoUnico, function(key, value) {  
          $('#selectTipo').append('<option value="' + value + '">' + value + '</option>');
      });
    },

    error : function(xhr, status) {
      alert('Disculpe, existió un problema');
    },

  });

}
$('#formulario').on('submit', function(evt){
    evt.preventDefault();
   
    // Obtener los valores de los select
    var ciudad = $('#selectCiudad').val();
    var tipo = $('#selectTipo').val();
    var precio = $('#rangoPrecio').val();

    var data = {
        ciudad: ciudad,
        tipo: tipo,
        precio: precio
    };
    // Llamar a la función para mostrar los resultados
    mostrarResultados(data);

  });
function mostrarResultados(data) {
  
alert(data.tipo);
  $.ajax({
        
      url : 'buscador.php',
      type : 'GET',
      dataType : 'json',
      data:data,
      success : function(data) {
          
          var resultadosHtml = '';

          // Construir el HTML para mostrar los resultados

          $.each(data, function(index, propiedad) { 
            resultadosHtml += "<div class='row tituloContenido card'>"+
                              "<div class='col s4'>" +
                                "<div class='card-image'>" +
                                   "<img src='img/home.jpg' class='img-thumbnail'>"+
                                "</div>"+
                                "</div>"+
                                "<div class='col s8 '>"+
                                  "<div class='card-conten'><p>"+
                                    "<strong>Dirección: </strong>"+propiedad.Direccion+
                                    "<br><strong>Ciudad: </strong>"+propiedad.Ciudad+
                                    "<br><strong>Teléfono: </strong>"+propiedad.Telefono+
                                    "<br><strong>Código postal: </strong>"+propiedad.Codigo_Postal+
                                    "<br><strong>Tipo: </strong>"+propiedad.Tipo+
                                    "<br><strong>Precio: </strong><span class='precioTexto'>"+propiedad.Precio+"</span>"+
                                  "</p></div>"+
                                  "<div class='card-action'>"+
                                    "<a href='#'>VER MAS</a>"+
                                  "</div>"+
                                "</div>"+
                                "</div>";
    
    
        });

        // Mostrar los resultados en el contenedor correspondiente
        $('#resultados').html(resultadosHtml);
       
      },

      error : function(xhr, status) {
        alert('Disculpe, existió un problema');
      },

    });
    
}
