class Gallery {
    constructor(images) {
        this.myClass = 'gallery';
        this.images = images;
    }

    render() {
        var result = `<div class = "${this.myClass}">`;
        var res = this.images;
        res.forEach(function (node) {
            //console.log(node);
            if (node instanceof GalleryCreat) {
                result += node.createImage();
            }
        });
        result += '</div>';
        return result;
    }

}

class GalleryCreat extends Gallery {
    constructor(minhref, maxhref) {
        super();
        this.images = '';
        this.minhref = minhref;
        this.maxhref = maxhref;
    }

    createImage() {
        return `<a href="${this.maxhref}" class="min-img" target="_blank"><img src="${this.minhref}" alt=""></a>`;
    }
}