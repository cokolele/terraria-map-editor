function ImageData() {
    var i = 0;
    if(arguments[0] instanceof Uint8ClampedArray) {
        var data = arguments[i++];
    }
    var width = arguments[i++];
    var height = arguments[i];

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.createImageData(width, height);
    if(data) imageData.data.set(data);
    return imageData;
}