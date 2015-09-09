// JS  para funciones generales  del bingo

/**
 * Objetos globales del bingo 
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
//var bingo = {//objeto con los atributos y funciones del bingo 
//     name : "",
//     tipo_gane:"",
//     cartones : []
//}

/**
 * Objeto global del carton 
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
//var carton = {
//    estado:"",
//    id: "",
//    name:"",
//    num_filas:"",
//    num_columnas:"",
//    matriz_num:[]    
//}

/**
 * Objeto global de los numeros de un carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
//var numero_carton = {
//    id:"",
//    estado:"",//active or inactive
//    value:""  
//}


//---------- Funciones del Bingo ----------------------------------------------

/**
 * Funcion para crear el carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function new_carton(name, tipo_gane, num_filas, num_columnas) {

    var id_carton = guidGenerator();

    var carton = {//objeto carton
        modo: "juego", //edicion = modo edicion del carton
        id: id_carton,
        name: name,
        num_filas: num_filas,
        num_columnas: num_columnas,
        matriz_num: []
    };

    var bingo = {//objeto con los atributos y funciones del bingo 
        name: "nuevo_bingo",
        tipo_gane: tipo_gane,
        cartones: [],
        lista_numeros: []
    };

    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));

    if (typeof bingo_cookie === 'undefined') {//pregunta si existe la cookie
        carton = llenar_carton(carton);
        bingo.cartones.push(carton);
        bingo_cookie = bingo;
        localStorage.setItem('bingo', JSON.stringify(bingo_cookie));
    } else {
//        console.log(bingo_cookie);
        carton = llenar_carton(carton);
        bingo_cookie.tipo_gane = tipo_gane;
        bingo_cookie.cartones.push(carton);
//        console.log(bingo_cookie);
//        Cookies.remove('bingo');
        localStorage.setItem('bingo', JSON.stringify(bingo_cookie));
    }

    return carton;

}

/**
 * Funcion para tomar las variables de html y llamar a la funcion para crear un 
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function llenar_carton(carton) {

    var carton = carton;

    for (var fila = 0; fila < parseInt(carton.num_filas); fila++) {
        var carton_fila = new Array();
        for (var columna = 0; columna < parseInt(carton.num_columnas); columna++) {
            var id_carton = guidGenerator();
            var numero_carton = {
                id: "num-" + id_carton,
                estado: "", //active or "" 
                value: ""
            };
            var formula_fila_carton = ((parseInt(carton.num_filas) / 2) - 0.5);
            var formula_columna_carton = ((parseInt(carton.num_columnas) / 2) - 0.5);
            if ((formula_fila_carton == fila) && (formula_columna_carton == columna)) {//si es la mitad del carton
                numero_carton.estado = "active";
            }
            carton_fila.push(numero_carton);
        }
        carton.matriz_num.push(carton_fila);
    }

    return carton;
}

/**
 * Funcion para tomar las variables de html y llamar a la funcion para crear un 
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function create_new_carton() {
//    Cookies.remove('bingo');

    $("#alert-new-carton").hide();

    var name = $("#new-nombre").val();
    var tipo_gane = "";
    $('#content-tipo-gane input[type="checkbox"]').each(function(index, value) {
        if ($(this).prop('checked')) {
            tipo_gane = $(this).attr("id");
        }
    });
    var num_filas = $("#new-num-filas").val();
    var num_columnas = $("#new-num-columnas").val();



    if ((name == "") || (tipo_gane == "") || (num_filas == "") || (num_columnas == "")) {

        $("#alert-new-carton").show();

        $("#alert-new-carton .alert-content").html("Llene todos los campos");
    } else {
        var carton = new_carton(name, tipo_gane, num_filas, num_columnas);
        var carton_template = graficar_carton(carton);//graficar el carton

        var bingo_cookie3 = JSON.parse(localStorage.getItem('bingo'));
        console.log(bingo_cookie3);

        $("#cartones-content").prepend(carton_template);

        $('#modal-new-carton').modal('hide');

    }

}

/**
 * Funcion que actualiza el tipo de gane del bingo
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function actualizar_tipo_gane() {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));

    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        $('#content-tipo-gane input[type="checkbox"]').each(function(index, value) {
            if ($(this).prop('checked')) {
                var tipo_gane = $(this).attr("id");
                bingo_cookie.tipo_gane = tipo_gane;
                localStorage.setItem('bingo', JSON.stringify(bingo_cookie));
            }
        });
    }
}

/**
 * Funcion actualiza el tipo de gane cuando se refresca la pagina
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function marcar_tipo_gane() {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));

    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        $('#content-tipo-gane input[type="checkbox"]').prop('checked', false);
        $('#content-tipo-gane input[type="checkbox"]').attr('checked', false);
        $("#" + bingo_cookie.tipo_gane).prop('checked', true);
        $("#" + bingo_cookie.tipo_gane).attr('checked', true);
    }
}

//---------- Funciones de graficar ----------------------------------------------

/**
 * Funcion que grafica  un carton
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function graficar_carton(carton) {
    var html_carton = "";
    var matriz_num = carton.matriz_num;

    html_carton += '<div id="carton-' + carton.id + '" class="carton-content col-md-6">' +
            '<fieldset>' +
            '<div class="row content-carton-option">' +
            '<div class="col-md-6">' +
            '<input placeholder="Buscar N&uacute;mero en este carton..." type="text" class="form-control carton-btn-search">' +
            '</div>' +
            '<div class="col-md-6">' +
            '<div class="btn-group pull-right">' +
            '<button class="btn btn-default">' +
            '<strong>' + carton.name + '</strong>' +
            '</button>' +
            '<button data-toggle="dropdown" class="btn btn-default dropdown-toggle">' +
            '<span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li>' +
            '<a href="javascript:poner_carton_modo_edicion(\'' + carton.id + '\');">Editar Carton</a>' +
            '</li>' +
            '<li>' +
            '<a href="#">Limpiar Carton</a>' +
            '</li>' +
            '<li class="divider">' +
            '</li>' +
            '<li>' +
            '<a href="#">Eliminar Carton</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-12">' +
            '<div id="alert-' + carton.id + '" class="carton-alert alert alert-warning alert-dismissible" role="alert" style="display:none">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<div class="alert-content"><strong>Warning!</strong></div>' +
            '</div>' +
            '</div>' +
            '</div>';

    html_carton +=
            '<table class="table table-bordered table-hover">' +
            '<tbody>';

    for (var fila = 0; fila < parseInt(carton.num_filas); fila++) {
        html_carton += '<tr>';
        for (var columna = 0; columna < parseInt(carton.num_columnas); columna++) {
            var carton_numero = matriz_num[fila][columna];
            var formula_fila_carton = ((parseInt(carton.num_filas) / 2) - 0.5);
            var formula_columna_carton = ((parseInt(carton.num_columnas) / 2) - 0.5);

            if ((formula_fila_carton == fila) && (formula_columna_carton == columna)) {//si es la mitad del carton
                html_carton += '<td data-carton_id="' + carton.id + '" data-fila="' + fila + '" data-columna="' + columna + '"  id="td-' + carton_numero.id + '"  class="success center-star">';
                html_carton += '<img src = "../star.png">';
            } else {
                html_carton += '<td data-carton_id="' + carton.id + '" data-fila="' + fila + '" data-columna="' + columna + '" id="td-' + carton_numero.id + '"  class="' + carton_numero.estado + '">';
                html_carton += '<input type="number" disabled data-carton_id="' + carton.id + '" data-fila="' + fila + '" data-columna="' + columna + '"  id="' + carton_numero.id + '"  value="' + carton_numero.value + '"/>';
            }
            html_carton += '</td>';
        }
        html_carton += '</tr>';
    }

    html_carton +=
            '</tbody>' +
            '</table>';


    return html_carton;
}

/**
 * Funcion que grafica los cartones al refrescar la pagina
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function graficar_cartones() {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));


    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        var cartones = bingo_cookie.cartones;
        for (var carton_num = cartones.length - 1; carton_num >= 0; --carton_num) {
//            console.log(cartones[carton_num]);
            var carton = cartones[carton_num];
            var carton_template = graficar_carton(carton);//graficar el carton

            $("#cartones-content").prepend(carton_template);

            //Verificar si el carton esta en modo edicion
            if (carton.modo === "edicion") {
                poner_carton_modo_edicion(carton.id);
            }

        }
    }

}

/**
 * Funcion que agrega la clase active al td de un numero encontrado
 * @param {String} id_num id del numero en la matriz
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function set_active(id_num) {
    $("#td-" + id_num).removeClass("success");
    $("#td-" + id_num).removeClass("warning");
    $("#td-" + id_num).addClass("active");
}

/**
 * Funcion que agrega la clase success al td de un numero encontrado
 * @param {String} id_num id del numero en la matriz
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function set_success(id_num) {
    $("#td-" + id_num).removeClass("active");
    $("#td-" + id_num).removeClass("warning");
    $("#td-" + id_num).addClass("success");
}

/**
 * Funcion que agrega la clase warning al td de un numero encontrado
 * @param {String} id_num id del numero en la matriz
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function set_warning(id_num) {
    $("#td-" + id_num).removeClass("success");
    $("#td-" + id_num).removeClass("active");
    $("#td-" + id_num).addClass("warning");
}

//----------  Funciones  Opciones del carton ----------------------------------------------

/**
 * Funcion que modifica el atributo modo del carton (juego o edicion)
 * @param {String} id_content_carton es el id del contenedor de la estructura del carton
 * @param {String} modo_carton es el modo en el que esta el carton (juego o edicion)
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function set_carton_modo(id_content_carton, modo_carton) {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));


    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        var cartones = bingo_cookie.cartones;
        for (var carton_num = cartones.length - 1; carton_num >= 0; --carton_num) {
//            console.log(cartones[carton_num]);
            var carton = cartones[carton_num];

            if (carton.id == id_content_carton) {
                bingo_cookie.cartones[carton_num].modo = modo_carton;
            }
        }
    }

    localStorage.setItem('bingo', JSON.stringify(bingo_cookie));//guarda nuevamente el bingo actualizado el carton

    return bingo_cookie;
}
/**
 * Funcion que se encarga de poner el carton en modo edición
 * nuevo carton
 * @param {String} id_content_carton es el id del contenedor de la estructura del carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function poner_carton_modo_edicion(id_content_carton) {
    //pone el carton en modo edicion
    $("#carton-" + id_content_carton + " td input").removeAttr("disabled");
    $("#carton-" + id_content_carton + " td input").prop('disabled', false);

    //muestra el mensaje del warning con el mensaje de finalizar edicion
    $("#alert-" + id_content_carton).addClass("alert-warning");
    $("#alert-" + id_content_carton).show();
    $("#alert-" + id_content_carton + " .alert-content").html('<strong>Warning!</strong> El carton est&aacute; en modo edici&oacute;n    ' + '<button onclick="finalizar_carton_modo_edicion(\'' + id_content_carton + '\')" type="button" class="btn btn-primary">Finalizar modo  edici&oacute;n</button>');

//actualizar el modo del carton (juego o edicion)
    set_carton_modo(id_content_carton, "edicion");

}

/**
 * Funcion que se encarga de guardar los datos del carton y ponerlo desibled 
 * nuevo carton
 * @param {String} id_content_carton es el id del contenedor de la estructura del carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function finalizar_carton_modo_edicion(id_content_carton) {
    $("#carton-" + id_content_carton + " td input").prop('disabled', true);
    $("#carton-" + id_content_carton + " td input").attr('disabled', "disabled");

    //ocultar y limpiar alert
    $("#alert-" + id_content_carton).hide();
    $("#alert-" + id_content_carton + " .alert-content").html();

//actualizar el modo del carton (juego o edicion)
    set_carton_modo(id_content_carton, "juego");

}

//---------- Fin Funciones  Opciones del carton  ----------------------------------------------

//---------- Fin Funciones de graficar --------------------------------------------------------

/**
 * Funcion que actualiza el valor de un numero en un carton
 * nuevo carton
 * @param {String} id_carton es el id  del carton
 * @param {int} fila fila en la que esta el numero a actualizar
 * @param {int} columna en la que esta el numero a actualizar
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function update_value(id_carton, fila, columna, valor_num) {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));


    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        var cartones = bingo_cookie.cartones;
        for (var carton_num = cartones.length - 1; carton_num >= 0; --carton_num) {
//            console.log(cartones[carton_num]);
            var carton = cartones[carton_num];

            if (carton.id == id_carton) {
                carton.matriz_num[fila][columna].value = valor_num;
                bingo_cookie.cartones[carton_num] = carton;
            }
        }
    }

    localStorage.setItem('bingo', JSON.stringify(bingo_cookie));//guarda nuevamente el bingo actualizado el carton

    return bingo_cookie;
}

//---------- Funciones del juego -------------------------------------------
/**
 * Funcion que agrega el nuevo numero a la cola en el bingo
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function add_num(num) {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));

    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie

        bingo_cookie.lista_numeros.push(num);
        localStorage.setItem('bingo', JSON.stringify(bingo_cookie));

    }
    return bingo_cookie;
}

/**
 * Funcion que busca un numero en los cartones y actualiza el estado a active
 * nuevo carton
 * @author Yeinel Rodriguez Murillo
 * @version 1.0
 */
function add_cartones_num(num) {
    var bingo_cookie = JSON.parse(localStorage.getItem('bingo'));


    if (typeof bingo_cookie !== 'undefined') {//pregunta si existe la cookie
        var cartones = bingo_cookie.cartones;
        for (var carton_num = cartones.length - 1; carton_num >= 0; --carton_num) {
//            console.log(cartones[carton_num]);
            var carton = cartones[carton_num];

            for (var fila = 0; fila < parseInt(carton.num_filas); fila++) {
                var carton_fila = new Array();
                for (var columna = 0; columna < parseInt(carton.num_columnas); columna++) {
                    if (carton.matriz_num[fila][columna].value == num) {
                        carton.matriz_num[fila][columna].estado = "active";
                        set_active(carton.matriz_num[fila][columna].id);//marcar en los tableros
                    }

                }

            }
            bingo_cookie.cartones[carton_num] = carton;
        }
    }

    localStorage.setItem('bingo', JSON.stringify(bingo_cookie));//guarda nuevamente el bingo actualizado el carton

    return bingo_cookie;
}

//---------- Fin Funciones del juego -------------------------------------------

//---------- Fin Funciones del Bingo -------------------------------------------