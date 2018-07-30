var mktApp = angular.module("mktApp", ['ngAnimate', 'ngSanitize', 'angular.filter']);


mktApp.controller("rkCtrl", function ($scope) {
    var s = $scope;

    //First level info
    s.prod = ProductData;
    s.detail = s.prod.productDetails;
    s.skus = s.prod.SKUs;
    s.reviews = s.prod.reviews;
    s.delivery = s.prod.delivery;
    s.related = s.prod.relatedProducts;
    s.prodName = s.detail.name;
    s.prodCode = s.detail.code;
    s.prodBrand = s.detail.brand;
    s.prodPoints = s.detail.superpoints;

    //First Sku - Variations
    s.prodSkus = s.skus;

    //Img unavailable
    s.photoUnavailable = {
        "thumb": "resource/img/unavailable_thumb.jpg",
        "detail": "resource/img/unavailable_detail.jpg",
        "extended": "resource/img/unavailable_extended.jpg"
    };

    //Youtube secure URL fix
    s.prodVideo = s.detail.video.trim(" ").trim("").split("/");
    s.prodVideo = s.prodVideo.pop();


    //Toggles
    s.showVideo = false;
    s.activeVideo = function () {
        s.showVideo = true;
    };
    s.activePhoto = function () {
        s.showVideo = false;
    };


    s.initZoom = function () {
        //initiate the plugin and pass the id of the div containing gallery images
        jQuery(".mainPhoto__zoom__photo").elevateZoom({
            gallery: 'thumbs',
            cursor: 'pointer',
            galleryActiveClass: 'active',
            imageCrossfade: true,
            scrollZoom: true,
            cursor: "crosshair",
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750
        });


        //pass the images to Fancybox
        jQuery(".mainPhoto__zoom__photo").bind("click", function (e) {
            var ez = $('.mainPhoto__zoom__photo').data('elevateZoom');
            $.fancybox(ez.getGalleryList());
            return false;
        });

        //Solve HTTPS youtube video
        var ytId = jQuery(".mainPhoto__zoom__video").attr("data-yt-id");
        jQuery(".mainPhoto__zoom__video").attr("src", "https://www.youtube.com/embed/" + ytId);
    }


    s.loadProd = function (color, size) {
        var skuCode = s.detail.code;
        var colorDefault = s.skus[0].variations[0].value[0].toUpperCase();
        var sizeDefault = s.skus[0].variations[1].value[0].toUpperCase();

        if (!color) {
            color = colorDefault;
        } else {
            color = color[0].toUpperCase();
        }

        if (!size) {
            size = sizeDefault;
        } else {
            size = size[0].toUpperCase();
        }

        s.partNumber = `${skuCode}-${color}-${size}`;
    }

    s.checkColor = function (color, partNumber) {
        color = color[0].toUpperCase();
        partNumber = partNumber.split("-")[1].toUpperCase();

        if (color === partNumber) {
            return true
        } else {
            return false
        }

    }

    s.checkSize = function (size, partNumber) {
        size = size[0].toUpperCase();
        partNumber = partNumber.split("-")[2].toUpperCase();

        if (size === partNumber) {
            return true
        } else {
            return false
        }

    }

    s.changeColor = function (color) {
        var selectedSize = jQuery("#groupSize .active").text();
        selectedSize = selectedSize.trim(" ")[0].toUpperCase();
        color = color.trim(" ")[0].toUpperCase();
        s.loadProd(color, selectedSize);
    }

    s.changeSize = function (size) {
        var selectedColor = jQuery("#groupColor .active").text();
        selectedColor = selectedColor.trim(" ")[0].toUpperCase();
        size = size.trim(" ")[0].toUpperCase();
        s.loadProd(selectedColor, size);
    }


    s.qtdInput = 1;
    s.qtdPlus = function(value, max) {
        if(value == max){
            return max;
        } else if(value > max) {
            s.qtdInput = max;
        } else {
            s.qtdInput++;
        }
        
    }
    s.qtdMinus = function(value) {
        if(value == 1){
            return max;
        } else {
            s.qtdInput--;
        }
    }
    s.resetQtd = function() {
        s.qtdInput = 1;
    }


   
    //Calc review
    s.calcReviews = function() {
        var total = 0;
        for (var i  = 0; i < s.reviews.length; i++){
            total  += s.reviews[i].rating;
        }
        total = total/5;
        return total;
    } 

    //Insert Review
    s.putReview = function(name, mail, msg, rating) {
       
        if(name && mail && msg && rating){
            var newRate = {
                customerName: name,
                customerEmail: mail,
                rating: Number(rating),
                comment: msg
            }
            s.reviews.push(newRate);
            console.log(s.reviews);
        } else {
            return false;
        }
    }

    s.calcCep = function(cep) {
        if(cep){
            if(cep.length == 8){
                var cep = cep.replace("-", "");
                for (var i  = 0; i < s.delivery.length; i++){
                    var min = s.delivery[i].zipCodeInitial;
                    var max = s.delivery[i].zipCodeFinal;

                    if(cep > min && cep < max){
                        s.cepService  = s.delivery[i].service;
                        s.cepValue  = s.delivery[i].value;
                        s.cepTime  = s.delivery[i].time;
                       
                    }

                }        
            }
        }
    }

});




function formatar(mascara, documento) {
    var i = documento.value.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i)

    if (texto.substring(0, 1) != saida) {
        documento.value += texto.substring(0, 1);
    }
}




mktApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    }
});


mktApp.filter('createarray', function () {
    return function (value, propertyName) {
        var arrayList = [];
        angular.forEach(value, function (val) {
            angular.forEach(val[propertyName], function (v) {
                arrayList.push(v)
            });
        });
        return arrayList;
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