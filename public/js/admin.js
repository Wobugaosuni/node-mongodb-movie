$(function () {
    $('.del-movie').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var category = target.data('category')

        var tr = $('.item-id-' + id);

        $.ajax({
            type:'DELETE',
            url:'/admin/movie/list?id=' + id + '&category=' + category
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
            url:'/admin/user/list?id=' + id
        })
        .done(function (results) {
            if(results.success === 1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })

    $('.del-category').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type:'DELETE',
            url:'/admin/category/list?id=' + id
        })
        .done(function (results) {
            if(results.success === 1){
                if(tr.length>0){
                    tr.remove();
                }
            }
        })
    })

    $('#douban').blur(function () {
        const douban = $(this)
        console.log('douban:', douban)
        const movieId = douban.val()

        if (movieId) {
            // 发请求获取数据
            $.ajax({
                type: 'GET',
                url: 'http://api.douban.com/v2/movie/subject/' + movieId,
                dataType: 'jsonp',
                jsonp: 'callback',
            })
            .done(function (results) {
                console.log('get movie success:', results)

                // 自动填充表单值
                $('#inputTitle').val(results.title)
                $('#inputDoctor').val(results.directors[0].name)
                $('#inputCountry').val(results.countries[0])
                $('#inputPoster').val(results.images.large)
                $('#inputYear').val(results.year)
                $('#inputSummary').val(results.summary)
            })
        }
    })
});
