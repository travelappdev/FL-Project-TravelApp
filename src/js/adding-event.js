function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.add-image')
                .attr('src', e.target.result)
                .width(310)
                .height(322);
               

        };
        $('.upload_title').attr('style','display:none');
        reader.readAsDataURL(input.files[0]);
    }
}