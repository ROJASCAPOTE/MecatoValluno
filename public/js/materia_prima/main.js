$(function () {

    var url_path = $('#url-path').val()
    var idmateria_prima = 0 //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion
    actualizar_tabla()


    $('.btn-nuevo-cliente').on('click', function () {
        $('.modal-title').text('Nuevo Materia Prima')
        limpiar_modal()
        $('.btn-crear-cliente').attr('editar', 'no')
        $('.btn-crear-cliente').text('Crear')
        idmateria_prima = 0 //Reseteo el valor de la var a 0
        $('#modal-crear-usuario').modal('show')
    })

    //Limpio los input del modal
    function limpiar_modal() {
        $('#formDesc').val('')
        $('#formValor').val(0)
        $('#formCant').val(0)
    }

    $('.btn-crear-cliente').on('click', function () {
        let url = url_path + 'materiaprima/crear'
        let datos = {
            id: idmateria_prima,
            descripcion: $('#formDesc').val(),
            cantidad: $('#formCant').val(),
            valor: $('#formValor').val()
        }

        //Validaciones
        for (const elem in datos) {

            if (datos[elem] == '' || datos[elem] == undefined) {
                if (elem != 'id' && elem != 'iduser') {
                    toastr.warning('Por favor complete todos los campos. ')
                    return
                }

            }
        }
        //Finde Validacion

        //Verifico si va a crear o editar
        if ($(this).attr('editar') == 'si')
            url = url_path + 'materiaprima/editar'

        $.ajax({
            url: url,
            type: "POST",
            data: {
                datos
            },
            success: function (res) {
                if (res == 'false') {
                    toastr.error('Se ha presentado inconvenientes al actualizar los datos')
                    return
                }
                toastr.success('Se ha actualizado la comision.')
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

    $(document).on('click', '#btn-editar', function () {
        limpiar_modal()
        let tr = $(this).parent().parent().children()
        idmateria_prima = $(tr[3]).attr('id')

        //Cargo los datos en la vista
        $('#formDesc').val($(tr[0]).text())
        $('#formCant').val($(tr[1]).text())
        $('#formValor').val($(tr[2]).text().replace('$', ''))
        $('.modal-title').text('Actualizar Materia Prima')

        $('.btn-crear-cliente').attr('editar', 'si')
        $('.btn-crear-cliente').text('Actualizar')

        $('#modal-crear-usuario').modal('show')


    })

    $(document).on('click', '#btn-eliminar', function () {
        let tr = $(this).parent().parent().children()
        idmateria_prima = $(tr[3]).attr('id')

        let res = confirm(`¿Seguro que desea eliminar?`)
        if (res == false)
            return

        $.ajax({
            url: url_path + 'materiaprima/eliminar',
            type: "POST",
            data: {
                idmateria_prima
            },
            success: function (res) {

                if (res == 'true') {
                    toastr.success('Se ha eliminado la materia prima.')
                } else {
                    toastr.error('No se elimino la materia prima.')
                }

                actualizar_tabla()
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la materia prima.')
            }

        })


    })


    function actualizar_tabla() {
        let rol_filtro = $('#rol-vista').val()

        $.ajax({
            url: url_path + 'materiaprima/datos_tabla',
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
                        <td class="py-3">${data.desc}</td>
                        <td class="py-3">${data.cant}</td>
                        <td class="py-3">$${data.valor}</td>
                        <td class="py-3" id=${data.id}>
                            <button type="button" class="btn btn-icon btn-primary rounded-circle btn-sm " id="btn-editar">
                                <i class="gd-pencil btn-icon-inner"></i>
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