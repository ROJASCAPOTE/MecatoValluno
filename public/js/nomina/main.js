$(function () {

    var url_path = $('#url-path').val()

    actualizar_tabla()

    function traer_empleados(){
        $('#select-empleados').empty()
        $.ajax({
            url: url_path + 'usuarios/datos_tabla?rol=0',
            type:"GET",
            success: function (res) {
                res = JSON.parse(res)

                let options = '<option value="0">Seleccione un empleado</option>'
                for(const user of res){
                    if(user.rol_id != '6' && user.rol_id != '7' && user.rol_id != '1' && user.rol_id != '5'){
                        options += `<option value="${user.id}">${user.nombre}</option>`
                    }   
                    
                }
                $('#select-empleados').append(options)
            }
        })       
    }

    $('.btn-nuevo-cliente').on('click', function () {
        limpiar_modal()
        traer_empleados()
        $('#modal-crear-usuario').modal('show')

    })

    //Limpio los input del modal
    function limpiar_modal() {
        $('#pago').val(0)
        $('#select-empleados').val(0)
    }

    $('.btn-crear-cliente').on('click', function () {
        let url = url_path + 'nomina/crear'
        
        if($('#select-empleados').val() == 0){
            alert('Por favor seleccione un empleado.')
        }

        if($('#pago').val() == 0){
            alert('Por favor escriba un valor correcto')
        }

        $.ajax({
            url: url,
            type: "POST",
            data: {
                empleado_id: $('#select-empleados').val(),
                valor: $('#pago').val()
            },
            success: function (res) {
                if (res == 'false') {
                    toastr.error('Se ha presentado inconvenientes al registrar la nomina')
                    return
                }
                toastr.success('Se ha registrado la nomina.')
                $('#modal-crear-usuario').modal('hide')
                limpiar_modal()
                actualizar_tabla()
            },
            error: function () {
                toastr.error('Error interno al registrar la nomina.')
            }

        })
    })

    $(document).on('click', '#btn-eliminar', function () {
        let id = $(this).parent().attr('id')

        let res = confirm(`¿Seguro que desea eliminar?`)
        if (res == false)
            return

        $.ajax({
            url: url_path + 'nomina/eliminar',
            type: "POST",
            data: {
                id
            },
            success: function (res) {

                if (res == 'true') {
                    toastr.success('Se ha eliminado el pago de nomina.')
                } else {
                    toastr.error('No se elimino el pago.')
                }

                actualizar_tabla()
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar el pago.')
            }

        })


    })


    function actualizar_tabla() {
        let user_id = $('#user_id_login').val()
        $.ajax({
            url: url_path + 'nomina/datos_tabla',
            type: "GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)

                //Limpio el contenido de la tabla
                tabla.empty()
                let items = []
                for (const data of res) {
                    items.push(`
                    <tr>
                        <td class="py-3">${data.empleado}</td>
                        <td class="py-3">$${data.pago}</td>
                        <td class="py-3">${data.fecha}</td>
                        <td class="py-3" id=${data.id}>
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