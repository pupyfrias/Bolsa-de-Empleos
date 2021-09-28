$(document).ready(function(){

    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });

    $("#eliminar").click(function(){

        $("#image-contaner").html('<input type="file" name="logo" id="input-logo">')

    })

    $('#delete').click(function(){
        let list = []
        $('input[type=checkbox]:checked').each(function(){
            list.push($(this).val())
        })
        window.location = '/admin/job/delete/'+list
    })

    $('#main-check').click( function(){
        $('input[type=checkbox]:not(#check-desing,#check-pragramacion)').prop('checked',$(this).prop('checked'))
          
    })

    $('#btn-Search').click(function(){
        const url = window.location.pathname

        window.location = url+'?search='+$('#input-search').val()
    })
    
    $('#login').click(function(){
        let url = window.location.pathname!= '/'?'/login?redirect='+window.location.pathname+window.location.search:'/login'
        window.location = url
    })

    $('#check-desing').click(function(){
        
        let url = window.location.search ? window.location.pathname+
        window.location.search+'&desing=disable': location.pathname+'?desing=disable'
        window.location = url
    })
    $('#check-pragramacion').click(function(){
        let url = window.location.search ? window.location.pathname+
        window.location.search+'&programacion=disable': location.pathname+'?programacion=disable'
        window.location = url
    })

})