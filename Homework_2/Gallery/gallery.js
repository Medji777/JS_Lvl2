function Gallery(images) {
    this.myClass = 'gallery';
    this.images = images;
}

Gallery.prototype.render = function () {
    var result = '<div class="'+this.myClass+'">';
    var res = this.images;
    res.forEach(function (node) {
        console.log(node);
        if(node instanceof GalleryCreat){
            result += node.createImage();
        }
    });


        result += '</div>';
        return result;
};

function GalleryCreat(minhref, maxhref) {
    Gallery.call();
    this.minhref = minhref;
    this.maxhref = maxhref;
}

GalleryCreat.prototype = Object.create(Gallery.prototype);
GalleryCreat.prototype.constructor = GalleryCreat;

GalleryCreat.prototype.createImage = function () {
    return '<a href="'+this.maxhref+'" target="_blank"><img src="'+this.minhref+'"></a>';
};

