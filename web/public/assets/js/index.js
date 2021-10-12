$(document).ready(function () {

    let url = new URL(window.location.href)
    let params = new URLSearchParams(window.location.search);

    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });

    $("#eliminar").click(function () {

        $("#image-contaner").html('<input type="file" name="logo" id="input-logo">')
    })

    $('#delete').click(function () {

        if ($('input[type="checkbox"]:not(#check-design,#check-programming)').is(":checked")) {

            let list = []
            let confirmacion = confirm("Seguro que desea continuar con la eliminacion")

            if (confirmacion == true) {

                $('input[type="checkbox"]:checked:not(#check-design,#check-programming)').each(function () {
                    list.push($(this).val())
                })
                window.location = '/admin/job/delete/' + list
            }

        }


    })

    $('#main-check').click(function () {
        $('input[type=checkbox]:not(#check-design,#check-programming)').prop('checked', $(this).prop('checked'))

    })

    $('#btn-Search').click(function () {
        const url = window.location.pathname

        window.location = url + '?search=' + $('#input-search').val()
    })

    $('#login').click(function () {
        let url = window.location.pathname != '/' ? '/login?redirect=' + window.location.pathname + window.location.search : '/login'
        window.location = url
    })

    $('#check-design').click(function () {

        if ($(this).is(':checked')) {

            params.set('design', 'enable')
            url = url.pathname + '?' + params.toString()

        } else {

            params.set('design', 'disable')
            url = url.pathname + '?' + params.toString()
        }

        window.location = url
    })
    $('#check-programming').click(function () {

        if ($(this).is(':checked')) {

            params.set('programming', 'enable')
            url = url.pathname + '?' + params.toString()

        } else {

            params.set('programming', 'disable')
            url = url.pathname + '?' + params.toString()
        }
        window.location = url
    })
    $('#guardar').click(function () {

        window.location = './limit/' + $('#pagination').val()
    })
})