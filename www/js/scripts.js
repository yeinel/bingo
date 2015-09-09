// JS para Acciones generales

/**
 * Funcion para que sea posible marcar una unica opción entre las opciones de 
 * tipo de gane del carton.
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
$('#content-tipo-gane input[type="checkbox"]').on('change', function() {
    $('#content-tipo-gane input[type="checkbox"]').each(function(index, value) {
        $(this).prop('checked', false);
        $(this).attr('checked', false);
    });
    $(this).prop('checked', true);
    $(this).attr('checked', true);
});

/**
 * Funcion para generar un id aleatorio
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function guidGenerator() {
    var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

/**
 * Funcion que se ejecuta cuando se levanta el modal de crear nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
$('#modal-new-carton').on('show.bs.modal', function(e) {
    // do something...
    $("#alert-new-carton").hide();//ocultar mensajes de error

});

/**
 * Funcion a ejecutar en el onchange de los tipos de gane
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
$('#content-tipo-gane input[type="checkbox"]').on("change", function(e) {
    actualizar_tipo_gane();//actualiza el cookie con el tipo de gane
//    var bingo_cookie = Cookies.getJSON('bingo');
//    console.log(bingo_cookie);
});


/**
 * Funcion de llamada general para graficar los cartones
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
$(document).ready(function() {



    //marcar el tipo de gane seleccionado si se refresca la pagina
    marcar_tipo_gane();

    var bingo_storage = JSON.parse(localStorage.getItem('bingo'));
    console.log(bingo_storage);
    graficar_cartones();//graficar los cartones que estan en session

    call_onchange_number();//llamar a la funcion del onchange
});

/**
 * Funcion a ejecutar en el onchange del input del carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function call_onchange_number() {
    $(".carton-content td input[type='number']").on("change", function() {

        var id_carton = $(this).data("carton_id");
        var fila = $(this).data("fila");
        var columna = $(this).data("columna");
        var valor_num = $(this).val();
        update_value(id_carton, fila, columna, valor_num);
    });
    $(".carton-content td input[type='number']").on("keypress", function() {
        var id_carton = $(this).data("carton_id");
        var fila = $(this).data("fila");
        var columna = $(this).data("columna");
        var valor_num = $(this).val();
        update_value(id_carton, fila, columna, valor_num);
    });
    $(".carton-content td input[type='number']").on("keyup", function() {
        var id_carton = $(this).data("carton_id");
        var fila = $(this).data("fila");
        var columna = $(this).data("columna");
        var valor_num = $(this).val();
        update_value(id_carton, fila, columna, valor_num);
    });
    $(".carton-content td input[type='number']").on("keydown", function() {
        var id_carton = $(this).data("carton_id");
        var fila = $(this).data("fila");
        var columna = $(this).data("columna");
        var valor_num = $(this).val();
        update_value(id_carton, fila, columna, valor_num);
    });
}


/**
 * Funcion de llamada a la busqueda de numero en los cartones
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function add_new_number() {
    var num = $("#inputNumber").val();
    if (num != ""){
        add_cartones_num(num);//llama a la funcion para buscar los numeros en los cartones
    }

}