class Gallery {
    constructor(images){
        this.myClass = 'gallery';
        this.images = images;
    }

    render(){
        var result = `<div class = "${this.myClass}">`;
        var res = this.images;
        res.forEach(function (node) {
            if (node instanceof GalleryCreat) {
                result += node.createImage();
            }
        });
        result += '</div>';
        return result;
    }
}

class GalleryCreat extends Gallery{
    constructor(imghref){
        super();
        this.images = '';
        this.imghref = imghref;
    }

    createImage(){
        return `<a class="min-img"><img src="/Gallery/images${this.imghref}" alt=""></a>`;
    }
}