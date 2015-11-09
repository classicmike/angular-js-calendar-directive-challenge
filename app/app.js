angular.module('calendarDemoApp', [])
    .directive('calendar', function(){
        return {
            restrict: 'E',
            templateUrl: 'calendar.html',
            controller: function($scope, $element, $attrs){
                $scope.calendar = {
                    today: new Date()
                };

                $scope.calendar.month = $scope.calendar.today.getMonth();
                $scope.calendar.year = $scope.calendar.today.getMonth();

                console.log($scope.calendar.today);

                var ctrl = this;

                this.setMonth = function(){
                    return $scope.calendar.month;
                };

                this.getMonth = function(){
                    return $scope.calendar.month;
                };

                this.getYear = function(){
                    return $scope.calendar.year;
                };

                this.setYear = function(){
                    return $scope.calendar.year;
                }
            },
            link: function(){

            }


        }
    })
    .directive('calendarPicker', function(){
        return {
            require: '?^calendar',
            restrict: 'E',
            templateUrl: 'calendar-picker.html',
            link: function(scope, element, attrs, calendarController){
                console.log('Hello');
                function compileYears(){
                    var currentYear = calendarController.getYear();

                    var pastLimit = currentYear - 20;
                    var futureLimit = currentYear + 20;
                    var compiledYears = [];

                    for(var i = pastLimit; i <= futureLimit; i++){
                        compiledYears.push(i);
                    }
                }

                scope.dropdowns = {
                    months: {
                        choices: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        currentMonth: scope.dropdowns.months.choices[calendarController.getMonth()]
                    },
                    years: {
                        choices: compileYears(),
                        currentYear: calendarController.getYear()
                    }
                };

                scope.processMonthChange = function(){
                    calendarController.setMonth(scope.dropdowns.months.choices.indexOf(scope.dropdowns.months.currentMonth));
                };

                scope.processYearChange = function(){
                    calendar.setYear(scope.dropdowns.years.currentYear);
                };


            }
        }
    });
// your controller and directive code go here