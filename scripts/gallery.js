export class ImageGallery {
    #images = [];
    #element;
    #index = 0;



    constructor(...sources)
    {
        this.#element = document.createElement("img");
        sources.forEach(element => {
            this.images.push(element);
        });

        // create the tag structure for the gallery
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
        this.#element.setAttribute("src", this.#images[index]);
    }

    previous()
    {
        this.index = this.index == 0? this.#images.length : this.index - 1;
        this.#element.setAttribute("src", this.#images[index]);
    }
}