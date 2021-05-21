$(function () {

var url_path = $('#url-path').val()

actualizar_tabla()

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

function actualizar_tabla() {
    let rol_filtro = $('#rol-vista').val()
    let cards = '', imagen_url = ''
    $('#contenedor-productos').empty()
    $.ajax({
        url: 'productos/datos',
        type: "GET",
        success: function (res) {
            res = JSON.parse(res)
            
            $.each(res, function(index, item){
                imagen_url = `${url_path}/public/storage/${item.imagen}`
               cards += `<div class="col-sm-4">
                      <div class="card card-poducto" style="background-color: #444140; color: #fff; width: 300px;">
                        <div class="card-header">
                          <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">
                            ${item.nombre}
                            <button type="button" class="btn btn-danger  btn-sm btn-eliminar" 
                            id="${item.id}">
                              <i class="gd-trash icon-text align-middle"></i>
                            </button>
                          </h5>

                      </div>
                      <div class="card-body pt-0">
                        <img src="${imagen_url}" class="rounded mx-auto d-block" alt="${item.nombre}"  style="width: 90%; max-height: 300px;">
                        <br>
                          Detalle: <br>
                          <p>Fecha de fabricacion: ${item.fecha_fin}</p>
                          <p>Cantidad: ${item.cantidad} </p>
                      </div>
                  </div>
                  </div>`
            })

            $('#contenedor-productos').append(cards)
        },
        error: function () {
            toastr.error('Error al traer los datos.')
        }

    })
}

$('.btn-buscar').on('click', function(){
    let busqueda = $('#buscar').val()
    $('#contenedor-productos').empty()

    $.ajax({
        url: 'productos/busqueda',
        type: "POST",
        data: { busqueda },
        success: function (res) {
            res = JSON.parse(res)
            if (res == 'false') {
                toastr.error('Se ha presentado inconvenientes al actualizar el estado')
                return
            }
            let cards = ''
            
            
            $.each(res, function(index, item){
                imagen_url = `${url_path}/public/storage/${item.imagen}`
               cards += `<div class="col-sm-4">
                      <div class="card" style="background-color: #444140; color: #fff; width: 300px;">
                        <div class="card-header">
                          <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">
                            ${item.nombre}
                          </h5>
                      </div>
                      <div class="card-body pt-0">
                        <img src="${imagen_url}" class="rounded mx-auto d-block" alt="${item.nombre}"  style="width: 90%; max-height: 300px;">
                        <br>
                          Detalle: <br>
                          <p>Fecha de fabricacion: ${item.fecha_fin}</p>
                          <p>Cantidad: ${item.cantidad} </p>
                      </div>
                  </div>
                  </div>`
            })

            $('#contenedor-productos').append(cards)
        },
        error: function () {
            toastr.error('Error interno al tratar de actualizar el estado.')
        }

    })
})

$(document).on('click', '.btn-eliminar', function(){
  let id = $(this).attr('id')

  $.ajax({
        url: 'productos/eliminar',
        type: "POST",
        data: {producto_id: id},
        success: function (res) {
            if (res == 'false') {
                toastr.error('Se ha presentado inconvenientes al eliminar el producto')
                return
            }
            toastr.success('Se ha eliminado el producto')
            $('#modal-cambiar-estado').modal('hide')
            actualizar_tabla()
        },
        error: function () {
            toastr.error('Error interno al eliminar el producto')
        }

    })

})



})