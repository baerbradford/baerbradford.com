jQuery.fn.resizeToParent = function (options) {
    var defaults = {
        parent: 'div'
    }

    var options = jQuery.extend(defaults, options);

    return this.each(function () {
        var o = options;
        var obj = jQuery(this);

        // bind to load of image
        obj.load(function () {
            // dimensions of the parent
            var parentWidth = obj.parents(o.parent).width();
            var parentHeight = obj.parents(o.parent).height();

            // dimensions of the image
            var imageWidth = obj.width();
            var imageHeight = obj.height();

            // step 1 - calculate the percentage difference between image width and container width
            var diff = imageWidth / parentWidth;

            // step 2 - if height divided by difference is smaller than container height, resize by height. otherwise resize by width
            if ((imageHeight / diff) < parentHeight) {
                obj.css({ 'width': 'auto', 'height': parentHeight });

                // set image variables to new dimensions
                imageWidth = imageWidth / (imageHeight / parentHeight);
                imageHeight = parentHeight;
            }
            else {
                obj.css({ 'height': 'auto', 'width': parentWidth });

                // set image variables to new dimensions
                imageWidth = parentWidth;
                imageHeight = imageHeight / diff;
            }

            // step 3 - center image in container
            var leftOffset = (imageWidth - parentWidth) / -2;
            var topOffset = (imageHeight - parentHeight) / -2;

            obj.css({ 'left': leftOffset, 'top': topOffset });
        });

        // force ie to run the load function if the image is cached
        if (this.complete) {
            obj.trigger('load');
        }
    });
}

jQuery.fn.generateArtistWall = function (options) {
    var defaults = {
        height: 400,
        width: $(this).parent().width() - 20,
        artistName: 'vampire weekend'
    }

    var options = jQuery.extend(defaults, options);

    var imageUrls = getArtistUrls(options.artistName);

    $(this).height(options.height);
    $(this).width(options.width);
    $(this).addClass('terminalTile');

    for (i = 0; i < 3; i++) {
        $('.terminalTile').each(function () {
            $(this).removeClass('terminalTile');

            if (i == 0 || i == 2) { // even - split width
                var newTileHeight = $(this).height();
                var newTileWidth = getRandomNumber($(this).width() * .20, $(this).width() * .80);

                var newTile = $('<div class="terminalTile" style="overflow: hidden; float: left;"></div>');

                $(this).append(newTile);
                newTile.width(newTileWidth);
                newTile.height(newTileHeight);
                newTile.css('background-color', get_random_color());

                var newTileHeight = $(this).height();
                var newTileWidth = $(this).width() - newTile.width();

                var newTile = $('<div class="terminalTile" style="overflow: hidden; float: left;"></div>');

                $(this).append(newTile);
                newTile.width(newTileWidth);
                newTile.height(newTileHeight);
                newTile.css('background-color', get_random_color());

                $(this).css('display', 'inline');
            } else if (i == 1) { // odd - split height
                var newTileHeight = getRandomNumber($(this).height() * .20, $(this).height() * .80);
                var newTileWidth = $(this).width();

                var newTile = $('<div class="terminalTile" style="overflow: hidden; float: top;"></div>');

                $(this).append(newTile);
                newTile.width(newTileWidth);
                newTile.height(newTileHeight);
                newTile.css('background-color', get_random_color());

                var newTileHeight = $(this).height() - newTile.height();
                var newTileWidth = $(this).width();

                var newTile = $('<div class="terminalTile" style="overflow: hidden; float: top;"></div>');

                $(this).append(newTile);
                newTile.width(newTileWidth);
                newTile.height(newTileHeight);
                newTile.css('background-color', get_random_color());
            }

        });
    }

    $('.terminalTile').each(function (index, value) {
        var image = $('<img src="' + imageUrls.pop() + '" alt="" onerror="hideImage(this);" />');
        $(value).append(image);
        image.resizeToParent({ parent: '.terminalTile' });
        image.css('position', 'relative');
    });

    // does not return a random color anymore. returns dark grey. This could be modified to provide random color from a good looking selection.
    function get_random_color() {
        //var letters = '0123456789ABCDEF'.split('');
        //var color = '#';
        //for (var i = 0; i < 6; i++) {
        //    color += letters[Math.round(Math.random() * 15)];
        //}

        var colorPalette = ['#000000', '#111111', '#222222', '#333333', '#444444', '#8CC63F',
                            '#555555', '#666666', '#777777', '#888888', '#999999', '#8CC63F',
                            '#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#8CC63F',
                            '#FFFFFF', '#8CC63F'];
        return colorPalette[Math.round(Math.random() * 16)];
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * ((max - min) - min + 1)) + Math.floor(min);
    }

    function getArtistUrls(artistName) {
        artistName = artistName.replace(' ', '+');
        var url = 'Music/ArtistImages/' + artistName;
        var toReturn = new Array();

        $.ajax({
            type: "GET",
            cache: false,
            async: false,
            url: url,
            success: function (msg) { 
                var lastImage;

                for (var i in msg) {
                    lastImage = msg[i];
                    toReturn.push(lastImage);
                }

                for (var i = toReturn.length; i < 16; i++) {
                    toReturn.push('');
                }
            }
        });

        fisherYates(toReturn);
        return toReturn;
    }

    function fisherYates(myArray) {
        var i = myArray.length;
        if (i == 0) return false;
        while (--i) {
            var j = Math.floor(Math.random() * (i + 1));
            var tempi = myArray[i];
            var tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }
    }
}

$(document).ready(function () {
    $('#tiles').generateArtistWall({
        artistName: $('#artistText').val(),
    });
});

function hideImage(image) {
    image.style.display = 'none';
}