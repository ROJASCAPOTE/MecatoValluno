$(function () {

    var url_path = $('#url-path').val()
    actualizar_tabla()

    $('.btn-nuevo-pais').on('click', function () {
        $('.modal-title').text('Nuevo Pais')
        $('#formPais').val('')
        $('.btn-crear-cliente').attr('editar', 'no')
        $('.btn-crear-cliente').text('Crear')
        $('#modal-crear-pais').modal('show')
    })

    $('.btn-crear-cliente').on('click', function () {
        let pais = $('#formPais').val()
        let idpais = $(this).attr('id')
        let url = url_path + 'paises/crear'

        if (pais.length < 3) {
            toastr.warning('Por favor diligencie el campo el campo Pais.')
            return
        }

        //Valido si va a crear o editar
        if ($(this).attr('editar') == 'si')
            url = url_path + 'paises/editar'

        $.ajax({
            url: url,
            type: "POST",
            data: {
                pais,
                idpais
            },
            success: function (res) {
                toastr.success('Se ha creado/actualizado el Pais')
                $('#modal-crear-pais').modal('hide')
                //Limpio el input
                $('#formPais').val('')
                actualizar_tabla()
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes al crear el Pais.')
            }

        })
    })

    function actualizar_tabla() {
        $.ajax({
            url: url_path + 'paises/datos_tabla',
            type: "GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)

                //Limpio el contenido de la tabla
                tabla.empty()
                let items = ''
                for (const pais of res) {
                    items += `
                    <tr>
                        <td class="py-3">${pais.nombre}</td>
                        <td class="py-3">${pais.fecha_registro}</td>
                        <td class="py-3" id="${pais.id}">
                            <button type="button" class="btn btn-icon btn-primary rounded-circle btn-sm " id="btn-editar">
                                <i class="gd-pencil btn-icon-inner"></i>
                            </button>
                            <button type="button" class="btn btn-icon btn-danger rounded-circle btn-sm" id="btn-eliminar">
                                <i class="gd-trash btn-icon-inner"></i>
                            </button>
                        </td>
                    </tr>
                    `
                }

                tabla.append(items)
            },
            error: function () {
                toastr.error('Error al traer los datos.')
            }

        })
    }

    $(document).on('click', '#btn-eliminar', function () {
        let idpais = $(this).parent().attr('id')
        let res = confirm(`¿Seguro que desea eliminar?`)
        if (res == false)
            return

        $.ajax({
            url: url_path + 'paises/tiene_ciudades',
            type: "POST",
            data: {
                idpais
            },
            success: function (res) {
                if (res == 'true') {
                    let res = confirm(`Este Pais tiene ciudades vinculadas, si continua se eliminaran todas las ciudades junto con el Pais.`)
                    if (res == false)
                        return
                        eliminar_pais(idpais)
                }
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes al eliminar el Pais.')
            }

        })


    })

    function eliminar_pais(idpais) {
        $.ajax({
            url: url_path + 'paises/eliminar',
            type: "POST",
            data: {
                idpais
            },
            success: function (res) {

                if (res == 'true') {
                    toastr.success('Se ha eliminado el Pais.')
                } else {
                    toastr.error('No se elimino el Pais solicitado.')
                }

                actualizar_tabla()
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes al eliminar el Pais.')
            }

        })
    }

    $(document).on('click', '#btn-editar', function () {
        let idpais = $(this).parent().attr('id')
        let tr = $(this).parent().parent().children()
        let nom_pais = $(tr[0]).text()
        //Cargo el nombre del Pais en el input
        $('#formPais').val(nom_pais)
        $('.btn-crear-cliente').attr('editar', 'si')
        $('.btn-crear-cliente').attr('id', idpais)
        $('.modal-title').text('Editar Pais')
        $('.btn-crear-cliente').text('Actualizar')
        $('#modal-crear-pais').modal('show')
    })



})