let pageContent = null;
let postContent = null;

function onPostThumbnailClicked()
{
    // open the post - hide the pageContent article and show postContent
    pageContent.classList.add("hidden");
    postContent.classList.remove("hidden");
}

function closePost()
{
    postContent.classList.add("hidden");
    pageContent.classList.remove("hidden");
}

function main()
{
    // initialise references
    pageContent = document.querySelector(".content");
    postContent = document.querySelector(".post");

    let postAnchors = document.querySelectorAll(".post-thumb");

    postAnchors.forEach(element => {
        element.addEventListener("click", onPostThumbnailClicked);
    });

    document.querySelector("#close-post")
    .addEventListener("click", closePost)

    console.log("page loaded");
}


window.addEventListener("load", main);