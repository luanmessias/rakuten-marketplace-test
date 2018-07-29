var mktApp = angular.module("mktApp", ['ngAnimate', 'ngSanitize']);

mktApp.controller("rkCtrl", function ($scope) {
    var s = $scope;
    var prodModifier = 0;
    var imgModifier = 0;

    //First level info
    s.prod     = ProductData;
    s.detail   = s.prod.productDetails;
    s.skus     = s.prod.SKUs;
    s.reviews  = s.prod.reviews;
    s.delivery = s.prod.delivery;
    s.related  = s.prod.relatedProducts;

    //Detail info
    s.prodVideo    = s.detail.video;

    //Img unavailable
    s.photoUnavailable = {
        "thumb" : "resource/img/unavailable_thumb.jpg",
        "detail" : "resource/img/unavailable_detail.jpg",
        "extended" : "resource/img/unavailable_extended.jpg"
    };

    //First Sku - Main Image 
    s.prodPhotoThumb  = s.skus[prodModifier].images[imgModifier].thumb;
    s.prodPhotoMedium = s.skus[prodModifier].images[imgModifier].detail;
    s.prodPhotoLarge  = s.skus[prodModifier].images[imgModifier].extended;

    //First Sku - Images 
    s.prodThumbs = s.skus[prodModifier].images;

    s.showPhoto = function() {
        jQuery(".mainPhoto__video").removeClass("active");
        jQuery(".mainPhoto__zoom").addClass("active");
        jQuery(".zoomContainer").addClass("active");
    }
    
    s.showVideo = function() {
        jQuery(".zoomContainer").removeClass("active");
        jQuery(".mainPhoto__zoom").removeClass("active");
        jQuery(".mainPhoto__video").addClass("active");
    }
    
 
});

// Function for set Unavailable image if the image is undefined.
mktApp.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {

            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });

            attrs.$observe('ngSrc', function (value) {
                if (!value && attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });

        }
    }
});





jQuery(window).load(function () {
    //initiate the plugin and pass the id of the div containing gallery images
    jQuery(".mainPhoto__zoom__photo").elevateZoom({
        gallery: 'thumbs',
        cursor: 'pointer',
        galleryActiveClass: 'active',
        imageCrossfade: true,
        scrollZoom: true,
        cursor: "crosshair",
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 750,
        loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
    });


    //pass the images to Fancybox
    jQuery(".mainPhoto__zoom__photo").bind("click", function (e) {
        var ez = $('.mainPhoto__zoom__photo').data('elevateZoom');
        $.fancybox(ez.getGalleryList());
        return false;
    });

});
