$(function () {

    var url_path = $('#url-path').val()
    var idcomision = 0 //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion
    actualizar_tabla()


    //Limpio los input del modal
    function limpiar_modal(){
        $('#formComision').val('')
    }

    $('.btn-crear-cliente').on('click', function(){
        let url = url_path + 'configuracion/actualizar'
        let datos = {
            id: idcomision,
            comision: $('#formComision').val()
        }
        
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
        
        $.ajax({
            url: url,
            type:"POST",
            data: datos,
            success: function (res) {
                if(res == 'false'){
                    toastr.error('Se ha presentado inconvenientes al actualizar los datos')
                    return
                }
                toastr.success('Se ha actualizado la comision.')
                $('#modal-crear-usuario').modal('hide')
                //Limpio el input
                limpiar_modal()
                actualizar_tabla()
            },
            error: function(){
                toastr.error('Error interno al tratar de actualizar la comision.')
            }

        })
    })

    $(document).on('click', '#btn-editar', function(){
        limpiar_modal()
        let tr = $(this).parent().parent().children()
        let comision = $(tr[1]).text()
        idcomision = $(tr[2]).attr('id')
        console.log(idcomision)
        //Cargo la info en el modal
        $('#formComision').val(comision)
        
        $('#modal-crear-usuario').modal('show')
        
        
    })

    function actualizar_tabla(){
        let rol_filtro = $('#rol-vista').val()

        $.ajax({
            url: url_path + 'configuracion/datos_tabla',
            type:"GET",
            success: function (res) {
                let tabla = $('#data-table')
                res = JSON.parse(res)
                
                //Limpio el contenido de la tabla
                tabla.empty()
                let items = ''
                for(const confi of res){
                    items += `
                    <tr>
                        <td class="py-3">${confi.id}</td>
                        <td class="py-3">${confi.comision}</td>
                        <td class="py-3" id=${confi.id}>
                            <button type="button" class="btn btn-icon btn-primary rounded-circle btn-sm " id="btn-editar">
                                <i class="gd-pencil btn-icon-inner"></i>
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