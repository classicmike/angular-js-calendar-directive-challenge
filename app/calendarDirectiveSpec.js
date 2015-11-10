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
        + "<calendar-picker></calendar-picker>" +
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
        html;

    beforeEach(module('calendarDemoApp'));
    beforeEach(module('calendar.html'));
    beforeEach(module('calendar-picker.html'));
    beforeEach(inject(function($rootScope, $compile){
        html = "";
        html += "<calendar>" +
        + "<calendar-picker></calendar-picker>" +
        "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();

    }));

    it('should render the element correctly', function(){
        console.log(element);
    });
});