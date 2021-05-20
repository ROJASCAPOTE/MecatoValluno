$(function () {

var url_path = $('#url-path').val()
var idmateria_prima = 0 //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion
actualizar_tabla()
traer_materia_prima()

function traer_materia_prima(){
    let selectMateria = $('#select-materia-prima')
    selectMateria.empty()
    $.ajax({
            url: url_path + 'materiaprima/datos_tabla',
            type: "GET",
            success: function (res) {
                let options = ''
                res = JSON.parse(res)

                $.each(res, function(index,value){

                    if(parseFloat(value.cant) != 0)
                        options += `<option value="${value.id}">${value.desc}</option>`
                })

                selectMateria.append(options)
            },
            error: function () {
                toastr.error('Error al traer la Materia Prima.')
            }

        })
}

$('.btn-nuevo-cliente').on('click', function () {
    $('.modal-title').text('Nueva Programacion')
    limpiar_modal()
    $('.btn-crear-cliente').attr('editar', 'no')
    $('.btn-crear-cliente').text('Crear')
    idmateria_prima = 0 //Reseteo el valor de la var a 0
    $('#modal-crear-usuario').modal('show')
})

//Limpio los input del modal
function limpiar_modal() {
    $('#formNom').val('')
    $('#formCant').val(0)
    $('#formValor').val(0)
    $('#formFinicio').val(null)
    $('#formFfin').val(null)
}

$('.btn-crear-cliente').on('click', function (event) {
    event.preventDefault()
    let url = url_path + 'produccion/crear'
    let form = $('#form-produccion')[0]

    let data = new FormData(form)

    //Verifico si va a crear o editar
    if ($(this).attr('editar') == 'si')
        url = url_path + 'produccion/editar'

    $.ajax({
        url: url,
        enctype: 'multipart/form-data',
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res == 'false') {
                toastr.error('Se ha presentado inconvenientes al crear la programacion de produccion')
                return
            }
            toastr.success('Se ha registrado la programacion de produccion.')
            $('#modal-crear-usuario').modal('hide')
            //Limpio el input
            limpiar_modal()
            actualizar_tabla()
        },
        error: function () {
            toastr.error('Error interno al tratar de actualizar la comision.')
        }

    })
})

$(document).on('click', '#btn-eliminar', function () {
    let producto_id = $(this).parent().attr('id')
   
    let res = confirm(`¿Seguro que desea eliminar?`)
    if (res == false)
        return

    $.ajax({
        url: url_path + 'produccion/eliminar',
        type: "POST",
        data: {
            producto_id
        },
        success: function (res) {

            if (res == 'true') {
                toastr.success('Se ha eliminado la programacion del producto.')
            } else {
                toastr.error('No se elimino la programacion del producto.')
            }

            actualizar_tabla()
        },
        error: function () {
            toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la programacion del producto.')
        }

    })

})

$(document).on('click', '#btn-cambiar-estado', function(){
    let id_producto = $(this).parent().attr('id')
    $('.btn-actualizar-estado').data('id_producto', id_producto)
    $('#select-estado').val(0)
    $('#modal-cambiar-estado').modal('show')
})

$('.btn-actualizar-estado').on('click', function(){
    let producto_id = $(this).data('id_producto')

    $.ajax({
        url: 'produccion/cambiar_estado',
        type: "POST",
        data: {estado: 1, producto: producto_id},
        success: function (res) {
            if (res == 'false') {
                toastr.error('Se ha presentado inconvenientes al actualizar el estado')
                return
            }
            toastr.success('Se ha registrado la programacion de produccion.')
            $('#modal-cambiar-estado').modal('hide')
            actualizar_tabla()
        },
        error: function () {
            toastr.error('Error interno al tratar de actualizar el estado.')
        }

    })
})

function limpiar_modal(){
    $('#formNom').val('')
    $('#formCant').val(0)
    $('#formValor').val(0)
    $('#formImg').val(null)
    $('#formFinicio').val(null)
    $('#formFfin').val(null)
    $('#select-materia-prima').val(0)
}

function actualizar_tabla() {
    let rol_filtro = $('#rol-vista').val()
    $('#data-table').empty()
    $.ajax({
        url: url_path + 'produccion/datos_tabla',
        type: "GET",
        success: function (res) {
            let tabla = $('#data-table')
            res = JSON.parse(res)
            
            if(res.length == 0)
                return
            //Limpio el contenido de la tabla
            
            let items = [], estado = ''
            for (const data of res) {
                
                if(data.estado == 0){
                    estado = '<span class="badge badge-pill badge-info">En proceso</span>'
                }
                items.push(`
                <tr>
                    <td class="py-3">${data.nombre}</td>
                    <td class="py-3">${data.cantidad}</td>
                    <td class="py-3">${estado}</td>
                    <td class="py-3">${data.fecha_inicio}</td>
                    <td class="py-3">${data.fecha_fin}</td>
                    <td class="py-3" id=${data.id}>
                        <button type="button" class="btn btn-icon btn-primary rounded-circle btn-sm " id="btn-cambiar-estado">
                            <i class="gd-pencil gd-reload"></i>
                        </button>
                        <button type="button" class="btn btn-icon btn-danger rounded-circle btn-sm" id="btn-eliminar">
                            <i class="gd-trash btn-icon-inner"></i>
                        </button>
                    </td>
                </tr>
                `)
            }

            //tabla.append(items)
            $('#myTable').appendDataTable({
                data: items,
                showPrevNext:true,
                hidePageNumbers: false,
                perPage: 10,
                search: true
            })
        },
        error: function () {
            toastr.error('Error al traer los datos.')
        }

    })
}



})