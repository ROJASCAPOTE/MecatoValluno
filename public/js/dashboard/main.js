$(function () {
    const { jsPDF } = window.jspdf;
    var url_path = $('#url-path').val()

    actualizar_tabla()

    $('.btn-pdf').on('click', function(){
        const pdf = new jsPDF();
        html2canvas(document.getElementById("content")).then(function(canvas) {
            let imgData = canvas.toDataURL("image/jpeg", 1.0);
            let pageWidth = pdf.internal.pageSize.getWidth();
            let pageHeight = pdf.internal.pageSize.getHeight();
            let imageWidth = canvas.width;
            let imageHeight = canvas.height;

            let ratio = imageWidth/imageHeight >= pageWidth/pageHeight ? pageWidth/imageWidth : pageHeight/imageHeight;
            pdf.addImage(imgData, 'JPEG', 0, 0, imageWidth * ratio, imageHeight * ratio);
            pdf.save("dashboard.pdf");
        });
    })

    function actualizar_tabla() {
        let user_id = $('#user_id_login').val()
        $.ajax({
            url: url_path + 'dashboard/datos_tabla',
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
                        <td class="py-3">$${data.valor}</td>
                        <td class="py-3">${data.fecha_registro}</td>
                    </tr>
                    `)
                }

                //tabla.append(items)
                $('#myTable').appendDataTable({
                    data: items,
                    showPrevNext:true,
                    hidePageNumbers: false,
                    perPage: 15,
                    search: false
                })
            },
            error: function () {
                toastr.error('Error al traer los datos.')
            }

        })
    }

    
   
})