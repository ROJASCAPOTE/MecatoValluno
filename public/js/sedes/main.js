$(function () {

    var url_path = $('#url-path').val()
    traer_paises()
    actualizar_tabla()

    $('.btn-nuevo-pais').on('click', function () {
        $('.modal-title').text('Nuevo Ciudad')
        limpiar_modal()
        $('.btn-crear-cliente').attr('editar', 'no')
        $('.btn-crear-cliente').text('Crear')
        $('#modal-crear-pais').modal('show')
    })

    //Limpio los input del modal
    function limpiar_modal(){
        $('#formSede').val('')
        $('#formDir').val('')
        $('#selectPais').val('0')
        $('#selectCiudad').empty()
    }

    $('.btn-crear-cliente').on('click', function(){
        let idciudad = $('#selectCiudad').val()
        let nom_sede = $('#formSede').val()
        let dir = $('#formDir').val()
        let url = url_path + 'sedes/crear'

        let tr = $(this).parent().parent().children()
        let idsede = $(this).attr('id') == undefined ? null : $(this).attr('id')
        
        //Validaciones
        if(idciudad == 0){
            toastr.warning('Por favor selecione una Ciudad.')
            return
        }

        if(nom_sede.length < 2){
            toastr.warning('Por favor diligencia el campo de Sede.')
            return
        }

        if(dir.length < 2){
            toastr.warning('Por favor diligencia el campo de Direccion.')
            return
        }
        //Finde Validacion

        //Verifico si va a crear o editar
        if($(this).attr('editar') == 'si')
            url = url_path + 'sedes/editar'

        $.ajax({
            url: url,
            type:"POST",
            data:{
                idciudad,
                nom_sede,
                dir,
                idsede
            },
            success: function (res) {
                if(res == 'false'){
                    toastr.error('Se ha presentado inconvenientes al crear la Sede.')
                    return
                }
                toastr.success('Se ha creado/actualizado la Sede')
                $('#modal-crear-pais').modal('hide')
                //Limpio el input
               limpiar_modal()
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Error interno al tratar de crear la Sede')
            }

        })
    })

    function traer_paises(){
        $.ajax({
            url: url_path + 'paises/datos_tabla',
            type:"GET",
            success: function (res) {
                let select = $('#selectPais')
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

    //DEPENDIENDO DEL PAIS QUE ELIJA, TRAIGO LA CIUDAD
    $('#selectPais').on('change', function(){
        let idpais = $('#selectPais').val()
        traer_ciudades(idpais)
    })

    function traer_ciudades(idpais, idciudad = null){
        $.ajax({
            url: url_path + 'ciudad/ciudad_x_pais',
            type:"POST",
            data:{
                idpais
            },
            success: function (res) {
                let select = $('#selectCiudad')
                res = JSON.parse(res)
                //Limpio el contenido de la tabla
                select.empty()
                let items = '<option value="0">Seleccione una Ciudad</option>'
                for(const ciudad of res){
                    items += `<option value="${ciudad.id}">${ciudad.nombre}</option>`
                }

                select.append(items)
                if(idciudad != null)
                    $('#selectCiudad').val(idciudad)
            },
            error: function(){
                toastr.error('Error al traer los datos.')
            }

        })
    }

    $(document).on('click', '#btn-eliminar',function(){
        let idsede = $(this).parent().attr('idsede')
        let res = confirm(`¿Seguro que desea eliminar?`)
        if(res == false)
            return
       
        $.ajax({
            url: url_path + 'sedes/eliminar',
            type:"POST",
            data:{
                idsede
            },
            success: function (res) {
              
                if(res == 'true'){
                    toastr.success('Se ha eliminado la Sede.')
                }else{
                    toastr.error('No se elimino la Sede.')
                }
                
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la Sede.')
            }

        })
    })

    $(document).on('click', '#btn-editar', function(){
        let tr = $(this).parent().parent().children()
        let nom_sede = $(tr[0]).text()
        let dir = $(tr[2]).text()
        let nom_ciudad = $(tr[1]).text()
        let idsede = $(tr[4]).attr('idsede')
        let idpais = $(tr[4]).attr('idpais')
        let idciudad = $(tr[4]).attr('idciudad')
       
        //Cargo la info en el modal
        $('#selectPais').val(idpais)
        $('#formSede').val(nom_sede)
        $('#formDir').val(dir)
        traer_ciudades(idpais, idciudad)
        
        $('.btn-crear-cliente').attr('editar', 'si')
        $('.btn-crear-cliente').attr('id', idsede)
        $('.btn-crear-cliente').text('Actualizar')
        $('.modal-title').text('Editar Sede')
        $('#modal-crear-pais').modal('show')
        
    })

    function actualizar_tabla(){
        $('#data-table').empty()
        $.ajax({
            url: url_path + 'sedes/datos_tabla',
            type:"GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)
                
                let items = []
                for(const sede of res){
                    items.push(`
                    <tr>
                        <td class="py-3">${sede.nombre}</td>
                        <td class="py-3">${sede.ciudad}</td>
                        <td class="py-3">${sede.dir}</td>
                        <td class="py-3">${sede.fecha_registro}</td>
                        <td class="py-3" idsede="${sede.id}" idpais="${sede.pais_id}" idciudad="${sede.ciudad_id}">
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
            error: function(){
                toastr.error('Error al traer los datos.')
            }

        })
    }



})