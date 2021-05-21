"use strict";

$(function () {
  var url_path = $('#url-path').val();
  var iduser = 0; //Uso esta variable para guardar el ID del cliente que voy a editar y poder usarla desde cualquier funcion

  actualizar_tabla();
  consultar_roles();
  traer_paises();

  function consultar_roles() {
    $.ajax({
      url: url_path + 'roles/roles_all',
      success: function success(res) {
        var data = JSON.parse(res);
        var options = '<option value="0">Seleccione un rol</option>';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rol = _step.value;
            options += "<option value=\"".concat(rol.id, "\">").concat(rol.nombre, "</option>");
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

        $('#formRol').append(options);
      }
    });
  }

  $('.btn-nuevo-usuario').on('click', function () {
    $('.modal-title').text('Nuevo Usuario');
    limpiar_modal();
    $('.btn-crear-cliente').attr('editar', 'no');
    $('.btn-crear-cliente').text('Crear');
    iduser = 0; //Reseteo el valor de la var a 0

    $('#modal-crear-usuario').modal('show');
  }); //Limpio los input del modal

  function limpiar_modal() {
    $('#formNombre').val('');
    $('#formEmail').val('');
    $('#formDir').val();
    $('#selectPais').val('0');
    $('#selectCiudad').val('0');
    $('#selectSede').val('0');
    $('#formRol').val('0');
    $('#formPassword').val();
  }

  $('.btn-crear-cliente').on('click', function () {
    var url = url_path + 'usuarios/crear';
    var datos = {
      nombre: $('#formNombre').val(),
      email: $('#formEmail').val(),
      dir: $('#formDir').val(),
      ciudad_id: $('#selectCiudad').val(),
      rol: $('#formRol').val(),
      pass: $('#formPassword').val() == '' ? null : $('#formPassword').val(),
      sede: $('#selectSede').val(),
      iduser: iduser == 0 ? null : iduser
    };
    console.log(datos); //Validaciones

    for (var elem in datos) {
      if (datos[elem] == '' || datos[elem] == undefined) {
        if (elem != 'pass' && elem != 'iduser') {
          toastr.warning('Por favor complete todos los campos. ');
          return;
        }
      }
    } //Finde Validacion
    //Verifico si va a crear o editar


    if ($(this).attr('editar') == 'si') url = url_path + 'usuarios/editar';
    $.ajax({
      url: url,
      type: "POST",
      data: {
        datos: datos
      },
      success: function success(res) {
        if (res == 'false') {
          toastr.error('Se ha presentado inconvenientes al crear el Usuario.');
          return;
        }

        toastr.success('Se ha creado/actualizado el Usuario.');
        $('#modal-crear-usuario').modal('hide'); //Limpio el input

        limpiar_modal();
        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Error interno al tratar de crear el Usuario.');
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
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var pais = _step2.value;
            items += "<option value=\"".concat(pais.id, "\">").concat(pais.nombre, "</option>");
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
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }

  function traer_sedes(idciudad) {
    var idsede = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    $('#selectSede').empty();
    $.ajax({
      url: url_path + 'sedes/ciudad',
      type: "POST",
      data: {
        idciudad: idciudad
      },
      success: function success(res) {
        var options = '<option value="0">Seleccione una Sede</option>';

        if (res.length != 0) {
          datos = JSON.parse(res);
          datos.forEach(function (element) {
            options += "<option value=\"".concat(element.id, "\">").concat(element.nombre, "</option>");
          });
          $('#selectSede').append(options);
        }

        if (idsede != 'null') {
          console.log('Entrooo'); //Selecciono la sede en el Select

          $('#selectSede').val(idsede);
        } else {
          $('#selectSede').val(0);
        }
      },
      error: function error() {
        toastr.error('Error interno al obtener las Sedes.');
      }
    });
  } //DEPENDIENDO DEL PAIS QUE ELIJA, TRAIGO LA CIUDAD


  $('#selectPais').on('change', function () {
    var idpais = $('#selectPais').val();
    traer_ciudades(idpais);
  });
  $('#selectCiudad').on('change', function () {
    var idciudad = $('#selectCiudad').val();
    traer_sedes(idciudad);
  });

  function traer_ciudades(idpais) {
    var idciudad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var idsede = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    $.ajax({
      url: url_path + 'ciudad/ciudad_x_pais',
      type: "POST",
      async: false,
      data: {
        idpais: idpais
      },
      success: function success(res) {
        var select = $('#selectCiudad');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        select.empty();
        var items = '<option value="0">Seleccione una Ciudad</option>';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = res[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var ciudad = _step3.value;
            items += "<option value=\"".concat(ciudad.id, "\">").concat(ciudad.nombre, "</option>");
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

        select.append(items);

        if (idciudad != null) {
          $('#selectCiudad').val(idciudad); //Cargo la sede

          traer_sedes(idciudad, idsede);
        }
      },
      error: function error() {
        toastr.error('Error al traer los datos.');
      }
    });
  }

  $(document).on('click', '#btn-eliminar', function () {
    var iduser = $(this).parent().attr('iduser');
    var res = confirm("\xBFSeguro que desea eliminar?");
    if (res == false) return;
    $.ajax({
      url: url_path + 'usuarios/eliminar',
      type: "POST",
      data: {
        iduser: iduser
      },
      success: function success(res) {
        if (res == 'true') {
          toastr.success('Se ha eliminado el usuario.');
        } else {
          toastr.error('No se elimino el usuario.');
        }

        actualizar_tabla();
      },
      error: function error() {
        toastr.error('Se ha presentado inconvenientes internos al momento de eliminar el usuario.');
      }
    });
  });
  $(document).on('click', '#btn-editar', function () {
    limpiar_modal();
    var tr = $(this).parent().parent().children();
    var nombre = $(tr[0]).text();
    var correo = $(tr[1]).text();
    var dir = $(tr[3]).text();
    var idsede = $(tr[5]).attr('idsede');
    var idpais = $(tr[6]).attr('idpais');
    iduser = $(tr[6]).attr('iduser');
    var idciudad = $(tr[6]).attr('idciudad');
    var rol = $(tr[4]).text(); //Cargo la info en el modal

    $('#formNombre').val(nombre);
    $('#formEmail').val(correo);
    $('#selectPais').val(idpais);
    $("#formRol option:contains(".concat(rol, ")")).attr('selected', true); //$('#formSede').val(nom_sede)

    $('#formDir').val(dir);
    traer_ciudades(idpais, idciudad, idsede);
    $('.btn-crear-cliente').attr('editar', 'si');
    $('.btn-crear-cliente').attr('id', idsede);
    $('.btn-crear-cliente').text('Actualizar');
    $('.modal-title').text('Editar Sede');
    $('#modal-crear-usuario').modal('show');
  });

  function actualizar_tabla() {
    var rol_filtro = $('#rol-vista').val();
    $.ajax({
      url: url_path + 'usuarios/datos_tabla?rol=' + rol_filtro,
      type: "GET",
      success: function success(res) {
        var tabla = $('#data-table');
        res = JSON.parse(res); //Limpio el contenido de la tabla

        tabla.empty();
        var items = '';
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = res[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var user = _step4.value;
            items += "\n                    <tr>\n                        <td class=\"py-3\">".concat(user.nombre, "</td>\n                        <td class=\"py-3\">").concat(user.email, "</td>\n                        <td class=\"py-3\">").concat(user.ciudad, "</td>\n                        <td class=\"py-3\">").concat(user.dir, "</td>\n                        <td class=\"py-3\"><span class=\"badge badge-info\">").concat(user.rol, "</span></td>\n                        <td class=\"py-3\" idsede=\"").concat(user.idsede, "\">").concat(user.sede, "</td>\n                        <td class=\"py-3\" iduser=\"").concat(user.id, "\" idpais=\"").concat(user.pais_id, "\" idciudad=\"").concat(user.ciudad_id, "\">\n                            <button type=\"button\" class=\"btn btn-icon btn-primary rounded-circle btn-sm \" id=\"btn-editar\">\n                                <i class=\"gd-pencil btn-icon-inner\"></i>\n                            </button>\n                            <button type=\"button\" class=\"btn btn-icon btn-danger rounded-circle btn-sm\" id=\"btn-eliminar\">\n                                <i class=\"gd-trash btn-icon-inner\"></i>\n                            </button>\n                        </td>\n                    </tr>\n                    ");
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
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