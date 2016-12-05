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
    $scope.getList = function () {
        var list = [
            {
                "id": 1,
                "name": "Monika Trójniak",
                "count": 22,
                "unit": 6
            },
            {
                "id": 1,
                "name": "Szymon Spyra",
                "count": 5,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Maciek Jaros",
                "count": 8,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Paweł Pulit",
                "count": 3,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Rafał Kołaczek",
                "count": 1,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Ivan Kuziuk",
                "count": 1,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Krzysztof Bartyzel",
                "count": 1,
                "unit": 7
            },
            {
                "id": 1,
                "name": "Maciej Górecki",
                "count": 10,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Wojciech Ziomek",
                "count": 7,
                "unit": 1
            },
            {
                "id": 1,
                "name": "Agnieszka Musielak",
                "count": 2,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Michał Gawryjołek",
                "count": 5,
                "unit": 5
            },
            {
                "id": 1,
                "name": "Bartosz Rokita",
                "count": 2,
                "unit": 3
            },
            {
                "id": 1,
                "name": "Michal Skwarek",
                "count": 1,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Tomasz Grochowski",
                "count": 30,
                "unit": 2
            },
            {
                "id": 1,
                "name": "Przemek Szarlej",
                "count": 25,
                "unit": 1
            }
        ];
        $scope.list = list;
        maxCount = list.reduce(function(max, x) { return (x.count > max) ? x.count : max; }, 0)

//         $http.get('file:///C:/morele/janusze/api/list.json').then(function successCallback(response) {
// console.log(response);
//         }, function errorCallback(response) {
//             console.log(response);
//         });
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $('.janusze-info').on('click', function (e) {
            e.preventDefault();
            console.log($(this));
            $(this).siblings('.janusze-more-info').slideToggle();
        });
    });
    $scope.percentageWidth = function (count) {
        return parseInt(count)*100/parseInt(maxCount) + '%';
    };
    $scope.getList();
}]);

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

$('body').on('click', '[data-dialog]', function (e) {
    e.preventDefault();
    var $this = $(this);
    console.log($this.data('dialog'), $this.data('title'));
    dialog($this.data('dialog'), $this.data('title'));
});

function dialog(content, title) {
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
