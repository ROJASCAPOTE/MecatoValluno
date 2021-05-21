"use strict";

$(function () {
  var url_path = $('#url-path').val();
  var idcomision = 0; //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion

  actualizar_tabla(); //Limpio los input del modal

  function limpiar_modal() {
    $('#formComision').val('');
  }

  $('.btn-crear-cliente').on('click', function () {
    var url = url_path + 'configuracion/actualizar';
    var datos = {
      id: idcomision,
      comision: $('#formComision').val()
    }; //Validaciones

    for (var elem in datos) {
      if (datos[elem] == '' || datos[elem] == undefined) {
        if (elem != 'pass' && elem != 'iduser') {
          toastr.warning('Por favor complete todos los campos. ');
          return;
        }
      }
    } //Finde Validacion


    $.ajax({
      url: url,
      type: "POST",
      data: datos,
      success: function success(res) {
        if (res == 'false') {
          toastr.error('Se ha presentado inconvenientes al actualizar los datos');
          return;
        }

        toastr.success('Se ha actualizado la comision.');
        $('#modal-crear-usuario').modal('hide'); //Limpio el input

        limpiar_modal();
        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Error interno al tratar de actualizar la comision.');
      }
    });
  });
  $(document).on('click', '#btn-editar', function () {
    limpiar_modal();
    var tr = $(this).parent().parent().children();
    var comision = $(tr[1]).text();
    idcomision = $(tr[2]).attr('id');
    console.log(idcomision); //Cargo la info en el modal

    $('#formComision').val(comision);
    $('#modal-crear-usuario').modal('show');
  });

  function actualizar_tabla() {
    var rol_filtro = $('#rol-vista').val();
    $.ajax({
      url: url_path + 'configuracion/datos_tabla',
      type: "GET",
      success: function success(res) {
        var tabla = $('#data-table');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        tabla.empty();
        var items = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var confi = _step.value;
            items += "\n                    <tr>\n                        <td class=\"py-3\">".concat(confi.id, "</td>\n                        <td class=\"py-3\">").concat(confi.comision, "</td>\n                        <td class=\"py-3\" id=").concat(confi.id, ">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    ");
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        tabla.append(items);
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }
});