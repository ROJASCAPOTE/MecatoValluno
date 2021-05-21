"use strict";

$(function () {
  var url_path = $('#url-path').val();
  actualizar_tabla();
  $('.btn-nuevo-pais').on('click', function () {
    $('.modal-title').text('Nuevo Pais');
    $('#formPais').val('');
    $('.btn-crear-cliente').attr('editar', 'no');
    $('.btn-crear-cliente').text('Crear');
    $('#modal-crear-pais').modal('show');
  });
  $('.btn-crear-cliente').on('click', function () {
    var pais = $('#formPais').val();
    var idpais = $(this).attr('id');
    var url = url_path + 'paises/crear';

    if (pais.length < 3) {
      toastr.warning('Por favor diligencie el campo el campo Pais.');
      return;
    } //Valido si va a crear o editar


    if ($(this).attr('editar') == 'si') url = url_path + 'paises/editar';
    $.ajax({
      url: url,
      type: "POST",
      data: {
        pais: pais,
        idpais: idpais
      },
      success: function success(res) {
        toastr.success('Se ha creado/actualizado el Pais');
        $('#modal-crear-pais').modal('hide'); //Limpio el input

        $('#formPais').val('');
        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes al crear el Pais.');
      }
    });
  });

  function actualizar_tabla() {
    $.ajax({
      url: url_path + 'paises/datos_tabla',
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
            var pais = _step.value;
            items += "\n                    <tr>\n                        <td class=\"py-3\">".concat(pais.nombre, "</td>\n                        <td class=\"py-3\">").concat(pais.fecha_registro, "</td>\n                        <td class=\"py-3\" id=\"").concat(pais.id, "\">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-icon btn-danger rounded-circle btn-sm\" id=\"btn-eliminar\">\n                                <i class=\"gd-trash btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    ");
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

  $(document).on('click', '#btn-eliminar', function () {
    var idpais = $(this).parent().attr('id');
    var res = confirm("\xBFSeguro que desea eliminar?");
    if (res == false) return;
    $.ajax({
      url: url_path + 'paises/tiene_ciudades',
      type: "POST",
      data: {
        idpais: idpais
      },
      success: function success(res) {
        if (res == 'true') {
          var _res = confirm("Este Pais tiene ciudades vinculadas, si continua se eliminaran todas las ciudades junto con el Pais.");

          if (_res == false) return;
          eliminar_pais(idpais);
        }
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes al eliminar el Pais.');
      }
    });
  });

  function eliminar_pais(idpais) {
    $.ajax({
      url: url_path + 'paises/eliminar',
      type: "POST",
      data: {
        idpais: idpais
      },
      success: function success(res) {
        if (res == 'true') {
          toastr.success('Se ha eliminado el Pais.');
        } else {
          toastr.error('No se elimino el Pais solicitado.');
        }

        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes al eliminar el Pais.');
      }
    });
  }

  $(document).on('click', '#btn-editar', function () {
    var idpais = $(this).parent().attr('id');
    var tr = $(this).parent().parent().children();
    var nom_pais = $(tr[0]).text(); //Cargo el nombre del Pais en el input

    $('#formPais').val(nom_pais);
    $('.btn-crear-cliente').attr('editar', 'si');
    $('.btn-crear-cliente').attr('id', idpais);
    $('.modal-title').text('Editar Pais');
    $('.btn-crear-cliente').text('Actualizar');
    $('#modal-crear-pais').modal('show');
  });
});