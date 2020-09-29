{
    let createPost = function () {
        let newPostForm = $('#post-data-form');

        newPostForm.submit(function(e){
            e.preventDefault();

        });
    }
    createPost();
    console.log("OKOKOK");
}