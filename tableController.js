"use strict";angular.module("sbAdminApp").controller("ngTableCtrl",["$scope","httpService","$state","$window",function($scope,httpService,$state,$window){$scope.UseName=$window.localStorage.UseName,$scope.code=$window.localStorage.code;var vm=this,dateNow=new Date;vm.data=[],vm.oDate2=dateNow,vm.httpService=httpService,vm.SelectDate=new Date,console.log(vm.SelectDate),vm.data=[];var getDateNow=function(){$scope.year=vm.SelectDate.getFullYear(),$scope.month=vm.SelectDate.getMonth()+1,$scope.day=vm.SelectDate.getDate()},getDataAPI=function(){var params={UseName:$scope.UseName,code:$scope.code,Year:$scope.year,Month:$scope.month<10?"0"+$scope.month:$scope.month,Day:$scope.day<10?"0"+$scope.day:$scope.day,action:"getDataOfFile"};vm.httpService.getData(params).then(function(items){items.length>0&&angular.copy(items,vm.data),vm.isNoData=vm.data.length,console.log(vm.data)},function(status){console.log(status)})};vm.onGetDataTable=function(){console.log("onGetDataTable"),getDateNow(),getDataAPI()},getDateNow(),getDataAPI(),vm.sortType="Date",vm.sortReverse=!1,vm.searchKeyword="",vm.sushi=[{name:"Cali Roll",fish:"Crab",tastiness:2},{name:"Philly",fish:"Tuna",tastiness:4},{name:"Tiger",fish:"Eel",tastiness:7},{name:"Rainbow",fish:"Variety",tastiness:6}]}]);