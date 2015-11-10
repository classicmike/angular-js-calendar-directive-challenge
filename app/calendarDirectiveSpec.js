describe('calendar', function(){
    var scope,
        element,
        compiled,
        html,
        transcludedText,
        ctrl;

    beforeEach(module('calendarDemoApp'));
    beforeEach(module('calendar.html'));
    beforeEach(module('calendar-picker.html'));
    beforeEach(inject(function($rootScope, $compile){
        transcludedText = "<calendar-picker></calendar-picker>";

        html = "";
        html += "<calendar>" +
        "<calendar-picker></calendar-picker>" +
        "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();

    }));

    it('should render the element correctly', function(){
        var calendarContainer = element.find('.calendar-container');
        var daysOfTheWeek = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

        expect(calendarContainer.length).toBe(1);
        expect(calendarContainer.find('.calendar-cell').length).toBe(scope.calendar.days.length + daysOfTheWeek.length);
    });

});

describe('calendar-picker', function(){
    var scope,
        element,
        compiled,
        html,
        monthsAvailable,
        ctrl,
        changedMonth,
        changedYear;

    beforeEach(module('calendarDemoApp'));
    beforeEach(module('calendar.html'));
    beforeEach(module('calendar-picker.html'));
    beforeEach(inject(function($rootScope, $compile){
        html = "";
        html += "<calendar>" +
        "<calendar-picker></calendar-picker>" +
        "</calendar>";

        monthsAvailable = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        changedMonth = monthsAvailable[4];
        changedYear = 2014;

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();

    }));

    it('should render the element correctly', function(){
        var today = new Date();
        var monthPicker = element.find('select[ng-model="dropdowns.months.currentMonth"]');
        expect(monthsAvailable.indexOf(monthPicker.val())).toBe(today.getMonth());
        var yearPicker = element.find('select[ng-model="dropdowns.years.currentYear"]');
        expect(parseInt(yearPicker.val())).toBe(today.getFullYear());

        ctrl = element.data('$calendarController');
        spyOn(ctrl, 'setMonth');
        spyOn(ctrl, 'setYear');
        monthPicker.val(changedMonth);
        yearPicker.val(changedYear);
        expect(ctrl.setMonth).toHaveBeenCalledWith(changedMonth);
        expect(parseInt(ctrl.setYear)).toHaveBeenCalledWith(changedYear);

    });
});