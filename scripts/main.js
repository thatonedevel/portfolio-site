import { BLACKOUT, DEFENDER, GENERICRPG, CAVERNS, VR, EDREAMS } from "./descriptions.js";
import { parseString, removeText } from "./parser.js";
import { ImageGallery } from "./gallery.js";

let pageContent = null;
let postContent = null;
let vplayer = null;
let videoContainer = null;
let projectAnchor = null;
let gallery = null;

let dummyPost = null; // placeholder post for error handling

const EMBED_URL = "https://www.yout-ube.com/embed/";
const EMBED_SETTINGS = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";

let posts = { // use this to store post references. it is shared state (so not great practice) but is fairly minor
    moonbaseDefender: null,
    blackout: null,
    genericRPG: null,
    euclideanDreams: null,
    caverns: null,
    edreams: null,
    vr: null
}

class Post {
    title;
    image;
    textContent;
    videoID;
    contentUrl;
    isDownload = false;
    isPlatSpecific = true;
    galleryImages = [];

    constructor(title, imageUrl, id=null, contentUrl=null, download=false, agnostic=false)
    {
        this.title = title;
        this.image = imageUrl;
        this.videoID = id;
        this.contentUrl = contentUrl;
        this.isDownload = download;
        this.isPlatSpecific = !agnostic;
    }

    setGallerySources(...sources)
    {
        this.galleryImages = sources;
    }

    setPostContent()
    {
        // set the content of the post body on the page
        let img = document.querySelector("#header-image");
        let body = document.querySelector("#body-text");
        let postTitle = document.querySelector("#post-title");

        postTitle.textContent = this.title;
        img.setAttribute("src", this.image);
        parseString(body, this.textContent);
        
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
    posts.genericRPG.setGallerySources("images/genericrpg/title.png", "images/genericrpg/overworld.png", 
        "images/genericrpg/goblins.png", "images/genericrpg/npc.png", "images/genericrpg/giant_spider.png");

    // caverns here
    posts.caverns = new Post("The Caverns of Phobos", "images/post-thumbnails/caverns_of_phobos.png",
         "m8ZRoJi4rpU", "downloads/caverns_winx64_debug.zip", true, false);
    posts.caverns.textContent = CAVERNS;

    // euclidean dreams
    posts.edreams = new Post("Euclidean Dreams", 
        "images/post-thumbnails/edreams.png", "k7Ee_-nNlYA", 
        "https://github.com/thatonedevel/Euclidean-Dreams");
    posts.edreams.textContent = EDREAMS;
    
    posts.vr = new Post("Brighton Dome VR Simulation", 
        "images/post-thumbnails/brighton_vr.png", "0gL6wZMQowA",
        "https://github.com/thatonedevel/CI606_VR_Systems", false
    );

    posts.vr.textContent = VR;
}

function onPostThumbnailClicked(evt)
{
    // open the post - hide the pageContent article and show postContent
    pageContent.classList.add("hidden");
    postContent.classList.remove("hidden");
    let currentPost = null;

    // lookup the post from the posts object
    console.log(evt.currentTarget.id);

    if (evt.currentTarget.id in posts)
    {
        // entry exists
        if (posts[evt.currentTarget.id] !== null)
        {
            // post exists
            posts[evt.currentTarget.id].setPostContent();
            currentPost = posts[evt.currentTarget.id];
        }
        else
        {
            dummyPost.setPostContent();
            currentPost = dummyPost;
        }
    }
    else 
    {
        dummyPost.setPostContent();
        currentPost = dummyPost;
    }

    // check if we have images
    if (currentPost.galleryImages.length > 0)
    {
        updateGallerySources(currentPost.images);
        gallery.show();
        console.log("showing");
    }
    else
    {
        // hide the gallery
        gallery.hide();
        console.log("hiding");
    }
}

function closePost()
{
    postContent.classList.add("hidden");
    pageContent.classList.remove("hidden");
    videoContainer.classList.add("hidden");
    removeText(document.querySelector("#body-text"));
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

function makeGallery()
{
    // add the gallery to the page
    let root = document.querySelector("#gallery");
    gallery = new ImageGallery(root, "images/placeholder.png");
}

function updateGallerySources(...newSources)
{
    gallery.clear();
    gallery.setSources(...newSources);
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
    makeGallery();
    console.log("page loaded");
}

window.addEventListener("load", main);