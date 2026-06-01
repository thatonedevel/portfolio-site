export class ImageGallery {
    #images = [];
    #index = 0;

    // element references
    #galleryContainer;
    #prevButton;
    #nextButton;
    #display;

    constructor(parent, ...sources)
    {
        // creates the image gallery and sources

        sources.forEach(element => {
            this.#images.push(element);
        });

        // create the tag structure for the gallery
        this.#galleryContainer = Object.assign(document.createElement("div"), {
            class: "gallery-container"
        });

        this.#prevButton = Object.assign(document.createElement("button"), {
            class: "gallery-button"
        });

        this.#nextButton = Object.assign(document.createElement("button"), {
            class: "gallery-button"
        });

        this.#display = Object.assign(document.createElement("img"), {
            class: "gallery-image",
            src: this.#images[0]
        });

        // assign button callbacks
        this.#nextButton.addEventListener("click", this.next);
        this.#prevButton.addEventListener("click", this.previous);

        // add the elements to the container & then the parent element
        this.#galleryContainer.appendChild(this.#prevButton);
        this.#galleryContainer.appendChild(this.#display);
        this.#galleryContainer.appendChild(this.#nextButton);


        // add icons to the buttons
        this.#prevButton.appendChild(
            Object.assign(document.createElement("i"), {
                    class: "fa-solid fa-angle-left"
                })
        );

        this.#nextButton.appendChild(
            Object.assign(document.createElement("i"), {
                class: "fa-solid fa-angle-right"
            })
        );

        // add gallery to the page
        parent.appendChild(this.#galleryContainer);
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

    setSources(...newSources)
    {
        this.clear();
        newSources.forEach((source) => {
            this.#images.push(source);
        });
    }

    next()
    {
        this.index = this.index == this.#images.length - 1? 0: this.index + 1;
        this.#display.setAttribute("src", this.#images[index]);
    }

    previous()
    {
        this.index = this.index == 0? this.#images.length : this.index - 1;
        this.#display.setAttribute("src", this.#images[index]);
    }
}