describe('calendar', function(){
    var scope,
        element,
        compiled,
        html,
        transcludedText,
        ctrl;

    beforeEach(module('calendarDemoApp'));
    beforeEach(module('calendar.html'));
    beforeEach(inject(function($rootScope, $compile){
        transcludedText = "<calendar-picker></calendar-picker>";

        html = "";
        html += "<calendar>" +
        + transcludedText +
        "</calendar>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.digest();

    }));

    it('should render the element correctly', function(){
        var calendarContainer = element.find('.calendar-container');
        console.log(scope.calendar.days);
        expect(calendarContainer.length).toBe(1);
        //expect(calendarContainer.find('.calendar-cell').length)
    });

});