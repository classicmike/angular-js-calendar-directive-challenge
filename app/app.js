angular.module('calendarDemoApp', [])
    .directive('calendar', function(){
        return {
            restrict: 'E',
            templateUrl: 'calendar.html',
            transclude: true,
            controller: function($scope, $element, $attrs){
                $scope.calendar = {
                    today: new Date()
                };

                $scope.calendar.month = $scope.calendar.today.getMonth();
                $scope.calendar.year = $scope.calendar.today.getFullYear();

                var ctrl = this;

                this.setMonth = function(month){
                    if(!month){
                        return;
                    }

                    $scope.calendar.month = month;
                };

                this.getMonth = function(){
                    return $scope.calendar.month;
                };

                this.getYear = function(){
                    return $scope.calendar.year;
                };

                this.setYear = function(year){
                    if(!year){
                        return;
                    }
                    $scope.calendar.year = year;
                };

                this.refreshCalendar = function(){
                    $scope.renderCalendar(new Date($scope.calendar.year, $scope.calendar.month, 1));
                };

                $scope.renderCalendar = function(date){
                    console.log(date);
                    if(!date || date.constructor !== Date){
                        return;
                    }

                    $scope.calendar.days = CalendarRange.getMonthlyRange(date).days;


                };

                $scope.constructCalendar = function(){
                    var dayIndex = 0;
                    var weekIndex = 0;
                    $scope.calendar.layout = [];

                    //need to rearrange the days into a format for weeks and days
                    angular.forEach($scope.calendar.days, function(day){
                        console.log(day);

                        //if the day index modulus 7 is 0 start the row
                        $scope.calendar.layout[weekIndex].push(day);
                        //if the modulus of 7 is 6 then we need to conclude the week
                        if(dayIndex%7 === 6){
                            weekIndex++;
                        }

                        dayIndex++;
                    });
                }
            },
            link: function(scope, element, attrs){

                function constructCalendar(){
                    scope.renderCalendar(scope.calendar.today);
                }

                constructCalendar();
            }


        }
    })
    .directive('calendarPicker', function(){
        return {
            require: '?^calendar',
            restrict: 'E',
            templateUrl: 'calendar-picker.html',
            link: function(scope, element, attrs, calendarController){
                function compileYears(){
                    var currentYear = calendarController.getYear();

                    var pastLimit = currentYear - 20;
                    var futureLimit = currentYear + 20;
                    var compiledYears = [];

                    for(var i = pastLimit; i <= futureLimit; i++){
                        compiledYears.push(i);
                    }

                    return compiledYears;
                }

                scope.dropdowns = {
                    months: {
                        choices: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    },
                    years: {
                        currentYear: calendarController.getYear()
                    }
                };
                scope.dropdowns.months.currentMonth = scope.dropdowns.months.choices[calendarController.getMonth()];
                scope.dropdowns.years.choices = compileYears();


                scope.processMonthChange = function(){
                    calendarController.setMonth(scope.dropdowns.months.choices.indexOf(scope.dropdowns.months.currentMonth));
                    calendarController.refreshCalendar();
                };

                scope.processYearChange = function(){
                    calendarController.setYear(scope.dropdowns.years.currentYear);
                    calendarController.refreshCalendar();
                };


            }
        }
    });
// your controller and directive code go here