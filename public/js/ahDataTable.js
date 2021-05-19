$.fn.appendDataTable = function (opts) {
    /**
     *  pagerSelector: Selector del menu de navegacion o paginacion <ul>
     *  showPrevNext: true o false, Indica si se visualiza en el paginador un boton de siguiente
     *  showPrevPrevious: true o false, Indica si se visualizaa en el paginador un boton de antes
     *  perPage: Indica el numero de Items que se va a visualizar por pagina
     *  hidePageNumbers: Oculta los botones con el numero de la pagina
     *  data: Contiene la informacion de tipo Array que se va a pintar en la tabla
     *  @autor: Andres Estiven Henao
     */


     let $this = this,
     defaults = {
        perPage: 10,
        showPrevNext: false,
        showPrevPrevious: false,
        data: null,
        hidePageNumbers: null,
        search: false
    },
    settings = $.extend(defaults, opts);
    
    if (defaults.data == null) {
        console.log('No hay data para mostrar')
        return
    }

    if(defaults.search && ($('.search-datatable').length == 0)){
        $this.before(`
            <div class="row search-datatable">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
            <div class="input-group mb-3">
            <input type="text" class="form-control input-busq-datetable"  aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-primary" type="button" id="button-search-table">Search</button>
            </div>
            </div>
            <div class="col-sm-3"></div>
            </div>`)
    }
    
    let listElement = $this.find('tbody')
    let perPage = settings.perPage
    let pager = $('.pagination')
    pager.empty()
    //Texto Cargando.... 
    $this.after(`<div class="d-flex justify-content-center" id="loading-table">
        <h4>Cargando...</h4>
        </div>`)

    //Llamo la funcion que va a car el contenido en la tabla
    appendData(defaults.data, listElement)
    //Obtengo las datos de tbody
    let children = listElement.children()

    // if (typeof settings.childSelector != "undefined") {
    //     children = listElement.find(settings.childSelector)
    // }

    if (typeof settings.pagerSelector != "undefined") {
        pager = $(settings.pagerSelector)
    }

    //Calculo la cantidad de paginas que va a tener
    let numItems = defaults.data.length
    let numPages = Math.ceil(numItems / perPage)
    
    pager.data("curr", 0)

    if (settings.showPrevNext) {
        $('<li class="page-item"><a class="page-link prev_link" href="#"><<</a></li>').appendTo(pager);
    }

    //Este es el currentPage, creo los botones con los numeros de las paginas
    let curr = 0;
    while (numPages > curr && (settings.hidePageNumbers == false)) {
        $(`<li class="page-item"><a class="page-link page-number" href="#">${curr+1}</a></li>`).appendTo(pager)
        curr++
    }

    if (settings.showPrevNext) {
        $('<li class="page-item"><a class="page-link next_link" href="#">>></a></li>').appendTo(pager)
    }

    pager.find('.page-number:first').addClass('active')
    pager.find('.prev_link').hide()

    //Si solo hay una pagina, entonces oculto el boton de Next (>>)
    if (numPages <= 1) {
        pager.find('.next_link').hide()
    }
    
    //pager.children().eq(1).addClass("active")

    children.hide() //Oculto el contenido que hay en la tabla
    children.slice(0, perPage).show() //Muestro una parte del contenido dependiente de la pagina en la que este.

    pager.find('li .page-number').click(function () {
        let clickedPage = $(this).html().valueOf() - 1;
        goTo(clickedPage, perPage);
        return false;
    })

    pager.find('li .prev_link').click(function () {
        previous()
        return false;
    })

    pager.find('li .next_link').click(function () {
        next()
        return false;
    })

    $(document).on('keyup', '.input-busq-datetable', function(){
        let td = children.find('td')
        let busq = $('.input-busq-datetable').val().toLowerCase()
        let item = ''
        children.hide()
        if(busq == '')
            children.slice(0, perPage).show()

        $.each(children, function(index, elem){
            
            for(let c=0; c < td.length; c++){
                item = td[c].innerText.toLowerCase()
                for(var x = 0; x < busq.length; x++ ){
                    if(item.indexOf(busq) > -1 ){
                        $(td[c]).parent().show()
                    }
                }
            }
            
        })
        
    })

    function previous() {
        var goToPage = parseInt(pager.data("curr")) - 1;
        console.log(goToPage)
        goTo(goToPage)
    }

    function next() {
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage)
    }

    function goTo(page) {
        let startAt = page * perPage,
        endOn = startAt + perPage

        children.css('display', 'none').slice(startAt, endOn).show();

        if (page >= 1) {
            pager.find('.prev_link').show()
        } else {
            pager.find('.prev_link').hide()
        }

        if (page < (numPages - 1)) {
            pager.find('.next_link').show()
        } else {
            pager.find('.next_link').hide()
        }

        pager.data("curr", page)
        pager.children().removeClass("active")
        pager.children().find('a').removeClass("active")
        pager.children().eq(page + 1).addClass("active")

    }

    function appendData(data, tbody){
        $("#loading-table, h4").hide()
        $.each(data, function(index, value){
            tbody.append(value)
        })
    }



}