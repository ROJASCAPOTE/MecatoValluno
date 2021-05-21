"use strict";

$(function () {
  var url_path = $('#url-path').val();
  traer_paises();
  actualizar_tabla();
  $('.btn-nuevo-pais').on('click', function () {
    $('.modal-title').text('Nuevo Ciudad');
    limpiar_modal();
    $('.btn-crear-cliente').attr('editar', 'no');
    $('.btn-crear-cliente').text('Crear');
    $('#modal-crear-pais').modal('show');
  }); //Limpio los input del modal

  function limpiar_modal() {
    $('#formSede').val('');
    $('#formDir').val('');
    $('#selectPais').val('0');
    $('#selectCiudad').empty();
  }

  $('.btn-crear-cliente').on('click', function () {
    var idciudad = $('#selectCiudad').val();
    var nom_sede = $('#formSede').val();
    var dir = $('#formDir').val();
    var url = url_path + 'sedes/crear';
    var tr = $(this).parent().parent().children();
    var idsede = $(this).attr('id') == undefined ? null : $(this).attr('id'); //Validaciones

    if (idciudad == 0) {
      toastr.warning('Por favor selecione una Ciudad.');
      return;
    }

    if (nom_sede.length < 2) {
      toastr.warning('Por favor diligencia el campo de Sede.');
      return;
    }

    if (dir.length < 2) {
      toastr.warning('Por favor diligencia el campo de Direccion.');
      return;
    } //Finde Validacion
    //Verifico si va a crear o editar


    if ($(this).attr('editar') == 'si') url = url_path + 'sedes/editar';
    $.ajax({
      url: url,
      type: "POST",
      data: {
        idciudad: idciudad,
        nom_sede: nom_sede,
        dir: dir,
        idsede: idsede
      },
      success: function success(res) {
        if (res == 'false') {
          toastr.error('Se ha presentado inconvenientes al crear la Sede.');
          return;
        }

        toastr.success('Se ha creado/actualizado la Sede');
        $('#modal-crear-pais').modal('hide'); //Limpio el input

        limpiar_modal();
        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Error interno al tratar de crear la Sede');
      }
    });
  });

  function traer_paises() {
    $.ajax({
      url: url_path + 'paises/datos_tabla',
      type: "GET",
      success: function success(res) {
        var select = $('#selectPais');
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
  } //DEPENDIENDO DEL PAIS QUE ELIJA, TRAIGO LA CIUDAD


  $('#selectPais').on('change', function () {
    var idpais = $('#selectPais').val();
    traer_ciudades(idpais);
  });

  function traer_ciudades(idpais) {
    var idciudad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    $.ajax({
      url: url_path + 'ciudad/ciudad_x_pais',
      type: "POST",
      data: {
        idpais: idpais
      },
      success: function success(res) {
        var select = $('#selectCiudad');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        select.empty();
        var items = '<option value="0">Seleccione una Ciudad</option>';
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var ciudad = _step2.value;
            items += "<option value=\"".concat(ciudad.id, "\">").concat(ciudad.nombre, "</option>");
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

        select.append(items);
        if (idciudad != null) $('#selectCiudad').val(idciudad);
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }

  $(document).on('click', '#btn-eliminar', function () {
    var idsede = $(this).parent().attr('idsede');
    var res = confirm("\xBFSeguro que desea eliminar?");
    if (res == false) return;
    $.ajax({
      url: url_path + 'sedes/eliminar',
      type: "POST",
      data: {
        idsede: idsede
      },
      success: function success(res) {
        if (res == 'true') {
          toastr.success('Se ha eliminado la Sede.');
        } else {
          toastr.error('No se elimino la Sede.');
        }

        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes internos al momento de eliminar la Sede.');
      }
    });
  });
  $(document).on('click', '#btn-editar', function () {
    var tr = $(this).parent().parent().children();
    var nom_sede = $(tr[0]).text();
    var dir = $(tr[2]).text();
    var nom_ciudad = $(tr[1]).text();
    var idsede = $(tr[4]).attr('idsede');
    var idpais = $(tr[4]).attr('idpais');
    var idciudad = $(tr[4]).attr('idciudad'); //Cargo la info en el modal

    $('#selectPais').val(idpais);
    $('#formSede').val(nom_sede);
    $('#formDir').val(dir);
    traer_ciudades(idpais, idciudad);
    $('.btn-crear-cliente').attr('editar', 'si');
    $('.btn-crear-cliente').attr('id', idsede);
    $('.btn-crear-cliente').text('Actualizar');
    $('.modal-title').text('Editar Sede');
    $('#modal-crear-pais').modal('show');
  });

  function actualizar_tabla() {
    $.ajax({
      url: url_path + 'sedes/datos_tabla',
      type: "GET",
      success: function success(res) {
        var tabla = $('#data-table');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        tabla.empty();
        var items = '';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = res[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var sede = _step3.value;
            items += "\n                    <tr>\n                        <td class=\"py-3\">".concat(sede.nombre, "</td>\n                        <td class=\"py-3\">").concat(sede.ciudad, "</td>\n                        <td class=\"py-3\">").concat(sede.dir, "</td>\n                        <td class=\"py-3\">").concat(sede.fecha_registro, "</td>\n                        <td class=\"py-3\" idsede=\"").concat(sede.id, "\" idpais=\"").concat(sede.pais_id, "\" idciudad=\"").concat(sede.ciudad_id, "\">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-icon btn-danger rounded-circle btn-sm\" id=\"btn-eliminar\">\n                                <i class=\"gd-trash btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    ");
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
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