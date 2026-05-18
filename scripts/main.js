let pageContent = null;
let postContent = null;

class Post {
    title;
    imageSource;
    textContent;
    videoEmbed;

    constructor(title)
    {
        this.title = title;
    }
}

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

function createPosts()
{
    // make the "posts" in here
    // ideally we wouldn't hardcode them in the script but i'm not sure if
    // we could use a http request on a gh pages site
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