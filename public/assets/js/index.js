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

    $('#main-check').click(function(){
        $('input[type=checkbox]').prop('checked',$(this).prop('checked'))
        
    })
    

})