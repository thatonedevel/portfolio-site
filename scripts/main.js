import { BLACKOUT, DEFENDER, GENERICRPG } from "./descriptions.js";

let pageContent = null;
let postContent = null;
let vplayer = null;
let videoContainer = null;
let projectAnchor = null;

let dummyPost = null; // placeholder post for error handling

const EMBED_URL = "https://www.yout-ube.com/embed/";
const EMBED_SETTINGS = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";

let posts = { // use this to store post references. it is shared state (so not great practice) but is fairly minor
    moonbaseDefender: null,
    blackout: null,
    genericRPG: null,
    euclideanDreams: null,
    caverns: null,
    edreams: null
}

class Post {
    title;
    image;
    textContent;
    videoID;
    contentUrl;
    isDownload = false;
    isPlatSpecific = true

    constructor(title, imageUrl, id=null, contentUrl=null, download=false, agnostic=false)
    {
        this.title = title;
        this.image = imageUrl;
        this.videoID = id;
        this.contentUrl = contentUrl;
        this.isDownload = download;
        this.isPlatSpecific = !agnostic;
    }

    setPostContent()
    {
        // set the content of the post body on the page
        let img = document.querySelector("#header-image");
        let body = document.querySelector("#body-text");
        let postTitle = document.querySelector("#post-title");

        postTitle.textContent = this.title;
        img.setAttribute("src", this.image);
        body.textContent = this.textContent;
        
        // attach the project link if we have a url
        if (this.contentUrl !== null)
        {
            projectAnchor.classList.remove("hidden");
            projectAnchor.setAttribute("href", this.contentUrl);
            if (this.isDownload) 
            {
                let url = projectAnchor.getAttribute("href");
                let urlSections = url.split("/");
                let filename = urlSections[urlSections.length - 1];

                console.log(filename);

                projectAnchor.setAttribute("download", filename);
                projectAnchor.textContent = this.isPlatSpecific? "Download (Windows Binary)" : "Download";
            }
            else 
            {
                // likely a link to the repo (which should have associated  releases)
                projectAnchor.textContent = "Project Repo / Source";
            }
        }
        else 
        {
            projectAnchor.classList.add("hidden");
            projectAnchor.removeAttribute("download");
        }

        // check if we have an associated video
        if (this.videoID !== null)
        {
            console.log(this.videoID);
            videoContainer.classList.remove("hidden");
            createYoutubePlayer(this.videoID);
        }        
    }
}

class PostSettings
{
    contentUrl;
    isDownload;

}

class ImageGallery {
    #images = [];
    #element;
    #index = 0;

    constructor(...sources)
    {
        this.#element = document.createElement("img");
        sources.forEach(element => {
            this.images.push(element);
        });
    }

    attach(parent)
    {
        parent.appendChild(this.#element);
    }

    addImage(source)
    {
        this.#images.push(source);
    }

    removeImage(index)
    {
        this.#images.splice(index, 1);
    }

    clear()
    {
        if (this.#images.length !== 0)
            this.#images.splice(0);
    }

    next()
    {
        this.index = this.index == this.#images.length - 1? 0: this.index + 1;
        this.#element.setAttribute("src", this.#images[index]);
    }

    previous()
    {
        this.index = this.index == 0? this.#images.length : this.index - 1;
        this.#element.setAttribute("src", this.#images[index]);
    }
}

function createPosts()
{
    // make the "posts" in here
    // ideally we wouldn't hardcode them in the script but i'm not sure if
    // we could use a http request on a gh pages site

    dummyPost = new Post("Post Not Found", "images/placeholder.png");
    dummyPost.textContent = "Sorry, I couldn't find that post";

    posts.moonbaseDefender = new Post("Moonbase Defender", 
        "images/post-thumbnails/moonbase_defender_thumbnail.png",
    "t0ecie6R_PM", "https://github.com/thatonedevel/MoonbaseDefender");

    posts.moonbaseDefender.textContent = DEFENDER;

    posts.blackout = new Post("Blackout", "images/post-thumbnails/blackout_thumbnail.png");
    posts.blackout.textContent = BLACKOUT;

    posts.genericRPG = new Post("A Generic Fantasy RPG", 
        "images/post-thumbnails/ci536_group_project_battle.png",
        "NEhe7gk0350", "https://github.com/BlueSwan4/CI536-Group-Project", false);

    posts.genericRPG.textContent = GENERICRPG;

    // caverns here
    posts.caverns = new Post("The Caverns of Phobos", "images/post-thumbnails/caverns_of_phobos.png",
         "qycteU3x730", "downloads/caverns_winx64_debug.zip", true, false); // vid id is a placeholder until i record the demo
    posts.caverns.textContent = "Caverns placeholder until i write the stuff";

    // euclidean dreams
    posts.edreams = new Post("Euclidean Dreams", 
        "images/post-thumbnails/edreams.png", "k7Ee_-nNlYA", 
        "https://github.com/thatonedevel/Euclidean-Dreams", false);
}

function onPostThumbnailClicked(evt)
{
    // open the post - hide the pageContent article and show postContent
    pageContent.classList.add("hidden");
    postContent.classList.remove("hidden");

    // lookup the post from the posts object
    console.log(evt.currentTarget.id);

    if (evt.currentTarget.id in posts)
    {
        // entry exists
        if (posts[evt.currentTarget.id] !== null)
        {
            // post exists
            posts[evt.currentTarget.id].setPostContent();
        }
        else
        {
            dummyPost.setPostContent();
        }
    }
    else 
    {
        dummyPost.setPostContent();
    }
}

function closePost()
{
    postContent.classList.add("hidden");
    pageContent.classList.remove("hidden");
    videoContainer.classList.add("hidden");
    deletePlayer();
}

function deletePlayer()
{
    if (vplayer !== null)
    {
        videoContainer.removeChild(vplayer);
        vplayer = null;
    }
}

function createYoutubePlayer(videoID)
{
    // make a youtube player for the video with the specified id
    if (vplayer !== null)
        return; // exit if player exists
    vplayer = Object.assign(document.createElement("iframe"), {
        src: EMBED_URL + videoID,
        id: "player",
        width: 560,
        height: 315,
        allow: EMBED_SETTINGS
    });
    
    videoContainer.appendChild(vplayer);
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
    .addEventListener("click", closePost);

    // create all the posts
    createPosts();

    //vplayer = document.querySelector("#player");
    videoContainer = document.querySelector("#player-container");

    projectAnchor = document.querySelector(".project-anchor");
    console.log("page loaded");
}


window.addEventListener("load", main);