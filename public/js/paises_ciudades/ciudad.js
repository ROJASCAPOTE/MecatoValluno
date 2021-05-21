$(function () {

    var url_path = $('#url-path').val()
    traer_paises()
    actualizar_tabla()

    $('.btn-nuevo-pais').on('click', function () {
        $('.modal-title').text('Nuevo Ciudad')
        $('#formCiudad').val('')
        $('#formPais').val('0')
        $('.btn-crear-cliente').attr('editar', 'no')
        $('.btn-crear-cliente').text('Crear')
        $('#modal-crear-pais').modal('show')
    })

    $('.btn-crear-cliente').on('click', function(){
        let idpais = $('#formPais').val()
        let ciudad = $('#formCiudad').val()
        let idciudad = $(this).attr('id')
        let url = url_path + 'ciudad/crear'

        if(idpais == 0){
            toastr.warning('Por favor selecione un Pais.')
            return
        }

        if(ciudad.length < 2){
            toastr.warning('Por favor diligencia el campo de Nombre.')
            return
        }

        //Valido si va a crear o editar
        if($(this).attr('editar') == 'si')
            url = url_path + 'ciudad/editar'

        $.ajax({
            url: url,
            type:"POST",
            data:{
                idpais,
                ciudad,
                idciudad
            },
            success: function (res) {
                if(res == 'false'){
                    toastr.error('Se ha presentado inconvenientes al crear la Ciudad.')
                    return
                }
                toastr.success('Se ha creado/actualizado la Ciudad')
                $('#modal-crear-pais').modal('hide')
                //Limpio el input
                $('#formCiudad').val('')
                $('#formPais').val('0')
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Error interno al tratar de crear la Ciudad')
            }

        })
    })

    function traer_paises(){
        $.ajax({
            url: url_path + 'paises/datos_tabla',
            type:"GET",
            success: function (res) {
                let select = $('#formPais')
                res = JSON.parse(res)
                
                //Limpio el contenido de la tabla
                select.empty()
                let items = '<option value="0">Seleccione un pais</option>'
                for(const pais of res){
                    items += `<option value="${pais.id}">${pais.nombre}</option>`
                }

                select.append(items)
            },
            error: function(){
                toastr.error('Error al traer los datos.')
            }

        })
    }

    $(document).on('click', '#btn-eliminar',function(){
        let idciudad = $(this).parent().attr('idciudad')
        let res = confirm(`¿Seguro que desea eliminar?`)
        if(res == false)
            return
       
        $.ajax({
            url: url_path + 'ciudad/eliminar',
            type:"POST",
            data:{
                idciudad
            },
            success: function (res) {
              
                if(res == 'true'){
                    toastr.success('Se ha eliminado la Ciudad.')
                }else{
                    toastr.error('No se elimino la Ciudad.')
                }
                
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la Ciudad.')
            }

        })
    })

    $(document).on('click', '#btn-editar', function(){
        let idpais = $(this).parent().attr('idpais')
        let idciudad = $(this).parent().attr('idciudad')
        let tr = $(this).parent().parent().children()
        let nom_ciudad = $(tr[1]).text()
        //Cargo el nombre del Pais en el input
        $('#formCiudad').val(nom_ciudad)
        $('#formPais').val(idpais)
        $('.btn-crear-cliente').attr('editar', 'si')
        $('.btn-crear-cliente').attr('id', idciudad)
        $('.btn-crear-cliente').text('Actualizar')
        $('.modal-title').text('Editar Ciudad')
        $('#modal-crear-pais').modal('show')
    })

    function actualizar_tabla(){
        $.ajax({
            url: url_path + 'ciudad/datos_tabla',
            type:"GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)
                
                //Limpio el contenido de la tabla
                tabla.empty()
                let items = ''
                for(const ciudad of res){
                    items += `
                    <tr>
                        <td class="py-3">${ciudad.pais}</td>
                        <td class="py-3">${ciudad.nombre}</td>
                        <td class="py-3">${ciudad.fecha_registro}</td>
                        <td class="py-3" idciudad="${ciudad.id}" idpais="${ciudad.idpais}">
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
            error: function(){
                toastr.error('Error al traer los datos.')
            }

        })
    }



})