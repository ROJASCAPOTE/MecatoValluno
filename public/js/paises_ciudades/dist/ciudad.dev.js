"use strict";

$(function () {
  var url_path = $('#url-path').val();
  traer_paises();
  actualizar_tabla();
  $('.btn-nuevo-pais').on('click', function () {
    $('.modal-title').text('Nuevo Ciudad');
    $('#formCiudad').val('');
    $('#formPais').val('0');
    $('.btn-crear-cliente').attr('editar', 'no');
    $('.btn-crear-cliente').text('Crear');
    $('#modal-crear-pais').modal('show');
  });
  $('.btn-crear-cliente').on('click', function () {
    var idpais = $('#formPais').val();
    var ciudad = $('#formCiudad').val();
    var idciudad = $(this).attr('id');
    var url = url_path + 'ciudad/crear';

    if (idpais == 0) {
      toastr.warning('Por favor selecione un Pais.');
      return;
    }

    if (ciudad.length < 2) {
      toastr.warning('Por favor diligencia el campo de Nombre.');
      return;
    } //Valido si va a crear o editar


    if ($(this).attr('editar') == 'si') url = url_path + 'ciudad/editar';
    $.ajax({
      url: url,
      type: "POST",
      data: {
        idpais: idpais,
        ciudad: ciudad,
        idciudad: idciudad
      },
      success: function success(res) {
        if (res == 'false') {
          toastr.error('Se ha presentado inconvenientes al crear la Ciudad.');
          return;
        }

        toastr.success('Se ha creado/actualizado la Ciudad');
        $('#modal-crear-pais').modal('hide'); //Limpio el input

        $('#formCiudad').val('');
        $('#formPais').val('0');
        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Error interno al tratar de crear la Ciudad');
      }
    });
  });

  function traer_paises() {
    $.ajax({
      url: url_path + 'paises/datos_tabla',
      type: "GET",
      success: function success(res) {
        var select = $('#formPais');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        select.empty();
        var items = '<option value="0">Seleccione un pais</option>';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var pais = _step.value;
            items += "<option value=\"".concat(pais.id, "\">").concat(pais.nombre, "</option>");
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

        select.append(items);
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }

  $(document).on('click', '#btn-eliminar', function () {
    var idciudad = $(this).parent().attr('idciudad');
    var res = confirm("\xBFSeguro que desea eliminar?");
    if (res == false) return;
    $.ajax({
      url: url_path + 'ciudad/eliminar',
      type: "POST",
      data: {
        idciudad: idciudad
      },
      success: function success(res) {
        if (res == 'true') {
          toastr.success('Se ha eliminado la Ciudad.');
        } else {
          toastr.error('No se elimino la Ciudad.');
        }

        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la Ciudad.');
      }
    });
  });
  $(document).on('click', '#btn-editar', function () {
    var idpais = $(this).parent().attr('idpais');
    var idciudad = $(this).parent().attr('idciudad');
    var tr = $(this).parent().parent().children();
    var nom_ciudad = $(tr[1]).text(); //Cargo el nombre del Pais en el input

    $('#formCiudad').val(nom_ciudad);
    $('#formPais').val(idpais);
    $('.btn-crear-cliente').attr('editar', 'si');
    $('.btn-crear-cliente').attr('id', idciudad);
    $('.btn-crear-cliente').text('Actualizar');
    $('.modal-title').text('Editar Ciudad');
    $('#modal-crear-pais').modal('show');
  });

  function actualizar_tabla() {
    $.ajax({
      url: url_path + 'ciudad/datos_tabla',
      type: "GET",
      success: function success(res) {
        var tabla = $('#data-table');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        tabla.empty();
        var items = '';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var ciudad = _step2.value;
            items += "\n                    <tr>\n                        <td class=\"py-3\">".concat(ciudad.pais, "</td>\n                        <td class=\"py-3\">").concat(ciudad.nombre, "</td>\n                        <td class=\"py-3\">").concat(ciudad.fecha_registro, "</td>\n                        <td class=\"py-3\" idciudad=\"").concat(ciudad.id, "\" idpais=\"").concat(ciudad.idpais, "\">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-icon btn-danger rounded-circle btn-sm\" id=\"btn-eliminar\">\n                                <i class=\"gd-trash btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    ");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
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