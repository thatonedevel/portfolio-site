export class ImageGallery {
    images = [];
    index = 0;

    // element references
    #galleryContainer;
    #prevButton;
    #nextButton;
    #display;

    constructor(parent, ...sources)
    {
        // creates the image gallery and sources

        sources.forEach(element => {
            this.images.push(element);
        });

        // create the tag structure for the gallery
        this.#galleryContainer = document.createElement("div");

        console.log(this.#galleryContainer);

        this.#galleryContainer.classList.add("gallery-container");

        this.#prevButton = document.createElement("button");
        this.#prevButton.classList.add("gallery-button");

        this.#nextButton = document.createElement("button");
        this.#nextButton.classList.add("gallery-button");

        this.#display = Object.assign(document.createElement("img"), {
            src: this.images[0]
        });
        this.#display.classList.add("gallery-image");

        // assign button callbacks
        this.#nextButton.addEventListener("click", this.next);
        this.#prevButton.addEventListener("click", this.previous);

        // add the elements to the container & then the parent element
        this.#galleryContainer.appendChild(this.#prevButton);
        this.#galleryContainer.appendChild(this.#display);
        this.#galleryContainer.appendChild(this.#nextButton);


        // add icons to the buttons
        
        
        let icoA = document.createElement("i");
        icoA.classList.add("fa-solid", "fa-angle-left");
        this.#prevButton.appendChild(icoA);


        let icoB = document.createElement("i");
        icoB.classList.add("fa-solid", "fa-angle-right");
        this.#nextButton.appendChild(icoB);

        // add gallery to the page
        parent.appendChild(this.#galleryContainer);
    }

    addImage(source)
    {
        this.images.push(source);
    }

    removeImage(index)
    {
        this.images.splice(index, 1);
    }

    clear()
    {
        if (this.images.length !== 0)
            this.images.splice(0);
    }

    setSources(...newSources)
    {
        this.clear();
        newSources.forEach((source) => {
            this.images.push(source);
        });
    }

    next()
    {
        console.log("Gallery size: ", this.images.length);
        this.index = this.index == this.images.length - 1? 0: this.index + 1;
        this.#display.setAttribute("src", this.images[this.index]);
    }

    previous()
    {
        console.log("Gallery size: ", this.images.length);
        this.index = this.index == 0? this.images.length : this.index - 1;
        this.display.setAttribute("src", this.images[this.index]);
    }

    hide()
    {
        this.#galleryContainer.classList.add("hidden");
    }

    show()
    {
        this.#galleryContainer.classList.remove("hidden");
    }
}