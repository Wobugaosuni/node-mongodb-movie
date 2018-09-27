$(function () {
    $('.del-movie').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type:'DELETE',
            url:'/admin/movieList?id=' + id
        })
        .done(function (results) {
            if(results.success === 1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })
    $('.del-user').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type:'DELETE',
            url:'/admin/userList?id=' + id
        })
        .done(function (results) {
            if(results.success === 1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })
});
