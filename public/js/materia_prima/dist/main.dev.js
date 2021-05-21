"use strict";

$(function () {
  var url_path = $('#url-path').val();
  var idmateria_prima = 0; //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion

  actualizar_tabla();
  $('.btn-nuevo-cliente').on('click', function () {
    $('.modal-title').text('Nuevo Materia Prima');
    limpiar_modal();
    $('.btn-crear-cliente').attr('editar', 'no');
    $('.btn-crear-cliente').text('Crear');
    idmateria_prima = 0; //Reseteo el valor de la var a 0

    $('#modal-crear-usuario').modal('show');
  }); //Limpio los input del modal

  function limpiar_modal() {
    $('#formDesc').val('');
    $('#formValor').val(0);
    $('#formCant').val(0);
  }

  $('.btn-crear-cliente').on('click', function () {
    var url = url_path + 'materiaprima/crear';
    var datos = {
      id: idmateria_prima,
      descripcion: $('#formDesc').val(),
      cantidad: $('#formCant').val(),
      valor: $('#formValor').val()
    }; //Validaciones

    for (var elem in datos) {
      if (datos[elem] == '' || datos[elem] == undefined) {
        if (elem != 'id' && elem != 'iduser') {
          toastr.warning('Por favor complete todos los campos. ');
          return;
        }
      }
    } //Finde Validacion
    //Verifico si va a crear o editar


    if ($(this).attr('editar') == 'si') url = url_path + 'materiaprima/editar';
    $.ajax({
      url: url,
      type: "POST",
      data: {
        datos: datos
      },
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
    idmateria_prima = $(tr[3]).attr('id'); //Cargo los datos en la vista

    $('#formDesc').val($(tr[0]).text());
    $('#formCant').val($(tr[1]).text());
    $('#formValor').val($(tr[2]).text().replace('$', ''));
    $('.modal-title').text('Actualizar Materia Prima');
    $('.btn-crear-cliente').attr('editar', 'si');
    $('.btn-crear-cliente').text('Actualizar');
    $('#modal-crear-usuario').modal('show');
  });
  $(document).on('click', '#btn-eliminar', function () {
    var tr = $(this).parent().parent().children();
    idmateria_prima = $(tr[3]).attr('id');
    var res = confirm("\xBFSeguro que desea eliminar?");
    if (res == false) return;
    $.ajax({
      url: url_path + 'materiaprima/eliminar',
      type: "POST",
      data: {
        idmateria_prima: idmateria_prima
      },
      success: function success(res) {
        if (res == 'true') {
          toastr.success('Se ha eliminado la materia prima.');
        } else {
          toastr.error('No se elimino la materia prima.');
        }

        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la materia prima.');
      }
    });
  });

  function actualizar_tabla() {
    var rol_filtro = $('#rol-vista').val();
    $.ajax({
      url: url_path + 'materiaprima/datos_tabla',
      type: "GET",
      success: function success(res) {
        var tabla = $('#data-table');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        tabla.empty();
        var items = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var data = _step.value;
            items.push("\n                    <tr>\n                        <td class=\"py-3\">".concat(data.desc, "</td>\n                        <td class=\"py-3\">").concat(data.cant, "</td>\n                        <td class=\"py-3\">$").concat(data.valor, "</td>\n                        <td class=\"py-3\" id=").concat(data.id, ">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-icon btn-danger rounded-circle btn-sm\" id=\"btn-eliminar\">\n                                <i class=\"gd-trash btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    "));
          } //tabla.append(items)

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

        $('#myTable').appendDataTable({
          data: items,
          showPrevNext: true,
          hidePageNumbers: false,
          perPage: 10,
          search: true
        });
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }
});