var app = angular.module('morelejanusze', []);

// Configuracja syntaksysu angulara
app.config(['$interpolateProvider', function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

// Dyrektywa skończenia ng-repeat
app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});

app.controller("januszelista", ['$scope', '$http', function ($scope, $http) {
    var maxCount = 0;
    $scope.showSendLoader = false;
    $scope.getList = function () {
        $scope.showPreloader = true;
        $http.get('/getpearsons').then(function successCallback(response) {
            if(response.statusText.toUpperCase() == 'OK'){
                console.log(response.data);
                $scope.list = response.data;
                $scope.showPreloader = false;
                maxCount = response.data.reduce(function(max, x) { return (x.janusze.count > max) ? x.janusze.count : max; }, 0)
            }
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.percentageWidth = function (count) {
        return parseInt(count)*100/parseInt(maxCount) + '%';
    };

    $scope.addNewJanusz = function ($form) {
        var $descInput = $form.find('textarea#addjanuszOpis'),
            id = $form.find('input#addjanuszPersone').val().trim(),
            desc = $descInput.val().trim(),
            $preloader = $form.siblings('div.preloader-section');

        $preloader.removeClass('hidden');
        $http({
            method: 'POST',
            url: '/addjanusz',
            contentType: 'application/json; charset=UTF-8',
            data: {
                janusz_pearson: parseInt(id),
                janusz_opis: desc
            }
        }).then(function successCallback(response) {
            if(response.statusText.toUpperCase() == 'OK'){
                $.notify(response.data, {type:"success"});
            }
            else {
                $.notify(response.data, {type:"danger"});
            }
            $preloader.addClass('hidden');
            $('body').removeClass('dialog-open');
            setTimeout(function () {
                $('body').removeClass('dialog-show');
                setTimeout(function () {
                    $('body').find('.dialog-outer').remove();
                }, 100)
            }, 300)
            $scope.getList();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $('body').on('submit', 'form#addjanusz', function (e) {
        e.preventDefault();
        var $form = $(this),
            $descInput = $form.find('textarea#addjanuszOpis');
        if(checkValidate()){
            $scope.addNewJanusz($form);
        }
        else {
            $.notify("Pole z opisem nie może być puste!", {type:"danger"});
        }

        $descInput.on('change', function () {
            checkValidate();
        });
        function checkValidate() {
            if($form.find('input#addjanuszPersone').val().trim() != '' && $form.find('input#addjanuszPersone').val().trim() != ' ' && $descInput.val().trim() !='' && $descInput.val().trim() != ' '){
                $descInput.removeClass('unvalid');
                return true;
            }
            else {
                $descInput.addClass('unvalid');
                return false;
            }
        }
    })

    $scope.getList();
}]);

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

$('body').on('click', '.janusze-info', function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $(this).siblings('.janusze-more-info').slideToggle();
});

$('body').on('change', 'select#select_theme', function (e) {
    var type = $(this).val();
    $.cookie('theme-type', type);
    if(type=='dark'){
        $('body').removeClass('theme-light').addClass('theme-dark');
    }
    else {
        $('body').removeClass('theme-dark').addClass('theme-light');
    }
});

$('body').on('click', '[data-dialog]', function (e) {
    e.preventDefault();
    var $this = $(this);
    dialog($this, $this.data('dialog'), $this.data('title'));
});

function dialog($this, content, title, close) {
    var dialog =
        '<div class="dialog-outer">'+
            '<div class="dialog">'+
                '<div class="display-table">'+
                    '<div class="table-row">'+
                        '<div class="table-col">'+
                            '<div class="dialog-content">';
                                if (title){
                                    dialog+='<div class="dialog-title">'+title+'</div>';
                                }
                                dialog += '<a href="#" class="dialog-close"><i class="fa fa-times-circle" aria-hidden="true"></i></a>'+
                                $(content).clone().html()+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    dialogOpen();

    $('.dialog-close').on('click', function (e) {
        e.preventDefault();
        dialogClose();
    });

    $('body').find('.dialog-outer').on('click', function (e) {
        if($(this).find('.table-col').has(e.target).length === 0){
            dialogClose();
        }
    });

    function dialogOpen() {
        $('body').append(dialog);
        setTimeout(function () {
            $('body').addClass('dialog-show');
            setTimeout(function () {
                $('body').addClass('dialog-open');
            }, 300)
        }, 100)
        if($this.data('copy-id')){
            console.log($this.data('janusz-id'));
            $('input#addjanuszPersone').val($this.data('janusz-id'))
        }
    }

    function dialogClose() {
        $('body').removeClass('dialog-open');
        setTimeout(function () {
            $('body').removeClass('dialog-show');
            setTimeout(function () {
                $('body').find('.dialog-outer').remove();
            }, 100)
        }, 300)
    }
}
