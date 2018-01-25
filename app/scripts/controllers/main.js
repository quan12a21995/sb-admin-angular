'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', ['$scope', '$position','$timeout' ,'httpService' ,'$window',function($scope, $position,$timeout, httpService ,$window ) {
    var vm = this;
    $scope.UseName = $window.localStorage['UseName'];
    $scope.code = $window.localStorage['code'];
    vm.Model = $window.localStorage['Model'];


    vm.httpService = httpService;
    vm.SelectDate = new Date();
    console.log(vm.SelectDate);

    var getDateNow = function () {
      $scope.year = vm.SelectDate.getFullYear();
      $scope.month = vm.SelectDate.getMonth()+1;
      $scope.day = vm.SelectDate.getDate();
      vm.DateNow = $scope.day+'-'+$scope.month + '-'+$scope.year;
    };

    vm.chartOptions = {};
    vm.data = [];

    var getDataAPI = function () {
      //http://127.0.0.1/projects/PHP/demo3/index.php?UseName=Q&code=123&Year=2017&Month=10&Day=17&action=getDataOfFile
      var params = {
        UseName : $scope.UseName,
        code : $scope.code,
        Year : $scope.year ,
        Month : ($scope.month < 10 ? ('0'+$scope.month) : $scope.month),
        Day : ($scope.day < 10 ? ('0'+$scope.day) : $scope.day),
        action : 'getDataOfFile'
      };
      if (vm.Model !== null && vm.Model !== "") {
        params.Model = vm.Model;
      }
      vm.httpService.getData(params).then(function (items) {

        vm.listTime = [];
        vm.listTemperature = [];
        vm.listRadiant = [];
        vm.data = [];
        if (items.length > 0){
          angular.copy(items, vm.data);
          /*for (var i = items.length - 1; i >= 0; i--) {
            vm.data.push(items[i]);
          }*/
          // console.log('Lenght = '+vm.data.length);
          // console.log(vm.data);
          // vm.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: vm.data});
          /*for (var index = 0 ; index < items.length; index ++){
            vm.listTime.push(items[index].Time);
            vm.listTemperature.push(parseFloat(items[index].Temperature));
            vm.listRadiant.push(parseFloat(items[index].Radiant));
          }
          console.log(vm.listTime);
          console.log(vm.listTemperature);
          console.log(vm.listRadiant);
          console.log("End get data");*/
        }

        vm.chartOptions = {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Days Average Temperature And Radiant'
          },
          subtitle: {
            text: 'Source: Mbell.vn'
          },
          xAxis: {
            categories: vm.listTime
          },
          yAxis: {
            title: {
              text: 'Temperature And Radiant'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            name: 'Temperature',
            marker: {
              symbol: 'square'
            },
            data: vm.listTemperature

          }, {
            name: 'Radiant',
            marker: {
              symbol: 'diamond'
            },
            data: vm.listRadiant
          }]
        };
        Highcharts.chart('container',  vm.chartOptions);
        vm.isNoData = vm.data.length;
      }, function (status) {
        console.log(status);
      });

    };
    getDateNow();
    getDataAPI();

    vm.sortType     = 'Date'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchKeyword= '';     // set the default search/filter term
    $scope.Timer = setInterval(function () {
      getDateNow();
      getDataAPI();
    }, 8000);

    $scope.$on("$destroy",function(){
      console.log("destroy home");
      clearInterval($scope.Timer)
    });
  }]);
