$(function () {

    var url_path = $('#url-path').val()
    let dataPost = []

    actualizar_tabla()
    traer_productos()
    traer_clientes()

    function traer_productos(){
        $('#select-producto').empty()

        $.ajax({
            url: 'productos/datos',
            type: "GET",
            success: function (res) {
                res = JSON.parse(res)
                let options = '<option value="0">Seleccione un producto</option>'
                $.each(res, function(index, item){

                    if(item.cantidad !=0)
                        options += `<option value="${item.id}" max="${item.cantidad}"
                        valor="${item.valor}">${item.nombre}</option>`
                })

                $('#select-producto').append(options)
            },
            error: function () {
                toastr.error('Error al traer los datos.')
            }

        })
    }

    function traer_clientes(){
        $.ajax({
            url: url_path + 'usuarios/datos_tabla?rol=5',
            type:"GET",
            success: function (res) {
                res = JSON.parse(res)

                let options = '<option value="0">Seleccione un cliente</option>'
                for(const user of res){
                    options += `<option value="${user.id}">${user.nombre}</option>`
                }
                $('#select-cliente').append(options)
            }
        })       
    }

    $('#select-producto').on('change', function(){
        let optionValue = $(this).val(),
            options = $(this).children()
        let cantMax = 0
        let valor = 0
        $.each(options, function(index, value){
            if($(value).val() == optionValue){
                cantMax = $(value).attr('max')
                valor = $(value).attr('valor')

            }
        })
        $(this).data('cantMax', cantMax)
        $(this).data('valor', valor)
    })

    $('#cantidad').on('keyup', function(){
        let cantMax = parseInt($('#select-producto').data('cantMax'))
        if($(this).val() > cantMax){
            $('#cantidad').val(cantMax)
        }
    })

    $('.btn-agregar-producto').on('click', function(){
        let producto_id = $('#select-producto').val(),
            cantidad = $('#cantidad').val()
            valor = $('#select-producto').data('valor'),
            nombre = $('#select-producto option:selected').text(),
            cliente_id = $('#select-cliente').val()

        let subtotal = cantidad * valor
        $('#table-productos').append(`
            <tr producto_id="${producto_id}">
                <td class="py-3">${nombre}</td>
                <td class="py-3">${cantidad}</td>
                <td class="py-3">$${valor}</td>
                <td class="py-3">$${subtotal}</td>
            </tr>
            `, [$('#total')])

        calcTotal()
        dataPost.push({
            producto_id, cantidad, cliente_id
        })
    })

    function calcTotal(){
        let trs = $('#table-productos tr')
        let subtotal = ''
        let total = 0
        $.each(trs, function(index, value){
            let dato = $(value).children()[3]
            
            if(dato != undefined){
                subtotal = dato.innerText.replace('$','').replace(/ /g, "")
                subtotal = Number(subtotal)

                if($(dato).parent().attr('id') == undefined){
                    total += subtotal
                }   
            }

            
        })
        let td_total = $('#total td')[2]
        $(td_total).text(`$${total}`)
    }

    $('.btn-nuevo-cliente').on('click', function () {
        traer_productos()
        $('.modal-title').text('Nueva Venta')
        limpiar_modal()
        $('.btn-crear-cliente').text('Registrar')
        $('#modal-crear-usuario').modal('show')

    })

    //Limpio los input del modal
    function limpiar_modal() {
        $('#select-producto').val(0)
        $('#cantidad').val(0)
        $('#table-productos').empty()
        $('#table-productos').append(
            `<tr id="total">
                <td></td>
                <td></td>
                <td colspan="2" class="table-active">Total: $0</td>
            </tr>`)
        dataPost = []
        $('#select-cliente').val(0)
    }

    $('.btn-crear-cliente').on('click', function () {
        let url = url_path + 'ventas/crear'
        if(dataPost.length == 0){
            alert('Por favor agregue productos')
            return
        }
        
        if($('#select-cliente').val() == 0){
            alert('Por favor a seleccione un cliente')
            return
        }

        if($('#cantidad').val() == 0){
            alert('Por favor a escriba una cantidad diferente a 0')
            return
        }

        $.ajax({
            url: url,
            type: "POST",
            data: {
                dataPost
            },
            success: function (res) {
                if (res == 'false') {
                    toastr.error('Se ha presentado inconvenientes al registrar la venta')
                    return
                }
                toastr.success('Se ha registrado la venta.')
                $('#modal-crear-usuario').modal('hide')
                limpiar_modal()
                actualizar_tabla()
            },
            error: function () {
                toastr.error('Error interno al registrar la venta.')
            }

        })
    })

    $(document).on('click', '#btn-eliminar', function () {
        let venta_id = $(this).parent().attr('id')
        let tr = $(this).parent().parent().children()
        let cant = tr[1].innerText.replace('$','')

        let res = confirm(`¿Seguro que desea eliminar?`)
        if (res == false)
            return

        $.ajax({
            url: url_path + 'ventas/eliminar',
            type: "POST",
            data: {
                venta_id, cant
            },
            success: function (res) {

                if (res == 'true') {
                    toastr.success('Se ha eliminado la venta.')
                } else {
                    toastr.error('No se elimino la venta.')
                }

                actualizar_tabla()
            },
            error: function () {
                toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la venta.')
            }

        })


    })


    function actualizar_tabla() {
        let user_id = $('#user_id_login').val()
        $.ajax({
            url: url_path + 'ventas/datos_tabla?user=' + user_id,
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
                        <td class="py-3">${data.nombre}</td>
                        <td class="py-3">${data.cant}</td>
                        <td class="py-3">$${data.precio_uni}</td>
                        <td class="py-3">$${data.total}</td>
                        <td class="py-3">${data.cliente}</td>
                        <td class="py-3">${data.fecha_venta}</td>
                        <td class="py-3" id=${data.venta_id}>
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