$(function () {

    var url_path = $('#url-path').val()
    var iduser = 0 //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion
    actualizar_tabla()
    consultar_roles()
    traer_paises()

    function consultar_roles(){
        $.ajax({
            url: url_path + 'roles/roles_all',
            success: function(res){
                let data = JSON.parse(res)
                let options = '<option value="0">Seleccione un rol</option>'
                for(const rol of data){
                    options += `<option value="${rol.id}">${rol.nombre}</option>`
                }
                $('#formRol').append(options)
            },
          
          });
    }

    $('.btn-nuevo-usuario').on('click', function () {
        $('.modal-title').text('Nuevo Usuario')
        limpiar_modal()
        $('.btn-crear-cliente').attr('editar', 'no')
        $('.btn-crear-cliente').text('Crear')
        iduser = 0 //Reseteo el valor de la var a 0
        $('#modal-crear-usuario').modal('show')
    })

    //Limpio los input del modal
    function limpiar_modal(){
        $('#formNombre').val('')
        $('#formEmail').val('')
        $('#formDir').val()
        $('#selectPais').val('0')
        $('#selectCiudad').val('0')
        $('#selectSede').val('0')
        $('#formRol').val('0')
        $('#formPassword').val()
    }

    $('.btn-crear-cliente').on('click', function(){
        let url = url_path + 'usuarios/crear'
        let datos = {
            nombre: $('#formNombre').val(),
            email: $('#formEmail').val(),
            dir: $('#formDir').val(),
            ciudad_id: $('#selectCiudad').val(),
            rol: $('#formRol').val(),
            pass: $('#formPassword').val() == '' ? null : $('#formPassword').val(),
            sede: $('#selectSede').val(),
            iduser: iduser == 0 ? null : iduser 
        }
        console.log(datos)
        //Validaciones
       for(const elem in datos){

            if(datos[elem]== '' || datos[elem] == undefined){
                if(elem != 'pass' && elem != 'iduser'){
                    toastr.warning('Por favor complete todos los campos. ')
                    return
                }
                
            }
        }
        //Finde Validacion

        //Verifico si va a crear o editar
        if($(this).attr('editar') == 'si')
            url = url_path + 'usuarios/editar'
      
        $.ajax({
            url: url,
            type:"POST",
            data: {datos},
            success: function (res) {
                if(res == 'false'){
                    toastr.error('Se ha presentado inconvenientes al crear el Usuario.')
                    return
                }
                toastr.success('Se ha creado/actualizado el Usuario.')
                $('#modal-crear-usuario').modal('hide')
                //Limpio el input
                limpiar_modal()
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Error interno al tratar de crear el Usuario.')
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
    
    function traer_sedes(idciudad, idsede = null){
        $('#selectSede').empty()
        $.ajax({
            url: url_path + 'sedes/ciudad',
            type:"POST",
            data: {idciudad},
            success: function (res) {
                let options = '<option value="0">Seleccione una Sede</option>'
                if(res.length != 0){
                    datos = JSON.parse(res)
                    datos.forEach(element => {
                        options += `<option value="${element.id}">${element.nombre}</option>`
                    });

                    $('#selectSede').append(options)
                }
     
                if(idsede != 'null'){
                    console.log('Entrooo')
                    //Selecciono la sede en el Select
                    $('#selectSede').val(idsede)
                }else{
                    $('#selectSede').val(0)
                }
            },
            error: function(){
                toastr.error('Error interno al obtener las Sedes.')
            }

        })
    }

    //DEPENDIENDO DEL PAIS QUE ELIJA, TRAIGO LA CIUDAD
    $('#selectPais').on('change', function(){
        let idpais = $('#selectPais').val()
        traer_ciudades(idpais)
    })

    $('#selectCiudad').on('change', function(){
        let idciudad = $('#selectCiudad').val()
        traer_sedes(idciudad)
    })

    function traer_ciudades(idpais, idciudad = null, idsede = null){
        $.ajax({
            url: url_path + 'ciudad/ciudad_x_pais',
            type:"POST",
            async: false,
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
                if(idciudad != null){
                    $('#selectCiudad').val(idciudad)
                    //Cargo la sede
                    traer_sedes(idciudad, idsede)
                }

                    
            },
            error: function(){
                toastr.error('Error al traer los datos.')
            }

        })
    }

    $(document).on('click', '#btn-eliminar',function(){
        let iduser = $(this).parent().attr('iduser')
        let res = confirm(`¿Seguro que desea eliminar?`)
        if(res == false)
            return
       
        $.ajax({
            url: url_path + 'usuarios/eliminar',
            type:"POST",
            data:{
                iduser
            },
            success: function (res) {
              
                if(res == 'true'){
                    toastr.success('Se ha eliminado el usuario.')
                }else{
                    toastr.error('No se elimino el usuario.')
                }
                
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar el usuario.')
            }

        })
    })

    $(document).on('click', '#btn-editar', function(){
        limpiar_modal()
        let tr = $(this).parent().parent().children()
        let nombre = $(tr[0]).text()
        let correo = $(tr[1]).text()
        let dir = $(tr[3]).text()
        let idsede = $(tr[5]).attr('idsede')
        let idpais = $(tr[6]).attr('idpais')
        iduser = $(tr[6]).attr('iduser')
        let idciudad = $(tr[6]).attr('idciudad')
        let rol = $(tr[4]).text()
        //Cargo la info en el modal
        $('#formNombre').val(nombre)
        $('#formEmail').val(correo)
        $('#selectPais').val(idpais)
        $(`#formRol option:contains(${rol})`).attr('selected', true)
        //$('#formSede').val(nom_sede)
        $('#formDir').val(dir)
        traer_ciudades(idpais, idciudad, idsede)
        
        $('.btn-crear-cliente').attr('editar', 'si')
        $('.btn-crear-cliente').attr('id', idsede)
        $('.btn-crear-cliente').text('Actualizar')
        $('.modal-title').text('Editar Sede')
        $('#modal-crear-usuario').modal('show')
        
        
    })

    function actualizar_tabla(){
        let rol_filtro = $('#rol-vista').val()

        $.ajax({
            url: url_path + 'usuarios/datos_tabla?rol=' + rol_filtro,
            type:"GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)

                let items = []
                for(const user of res){
                    items.push(`
                    <tr>
                        <td class="py-3">${user.nombre}</td>
                        <td class="py-3">${user.email}</td>
                        <td class="py-3">${user.ciudad}</td>
                        <td class="py-3">${user.dir}</td>
                        <td class="py-3"><span class="badge badge-info">${user.rol}</span></td>
                        <td class="py-3" idsede="${user.idsede}">${user.sede}</td>
                        <td class="py-3" iduser="${user.id}" idpais="${user.pais_id}" idciudad="${user.ciudad_id}">
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