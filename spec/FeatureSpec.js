'use strict';

describe ('Feature test:', function() {
  var plane;
  var airport;

  beforeEach(function() {
    plane = new Plane();
    airport = new Airport();
  });

  describe('under normal conditions',function(){
    beforeEach(function(){
      spyOn(Math,'random').and.returnValue(0);
    });

// User Story One
//
// As an air traffic controller
// To get passengers to a destination
// I want to instruct a plan to land at adairport and confirm that it has landed

    it ('plane scan be instructed to land in the airport', function() {
      plane.land(airport)
      expect(airport.planes()).toContain(plane);
    });


// User Story Two
//
// As an air traffic controller
// To get passengers to a destination
// I want to instruct a plane to take off from
//   an airport and confirm that it is no longer in the airport


    it('planes can be instructed to take off', function(){
      plane.land(airport);
      plane.takeoff();
      expect(airport.planes()).not.toContain(plane);
    });
  });

  describe('under stormy conditions',function(){

// User Story Three
//
// As an air traffic controller
// To ensure safety
// I want to prevent takeoff when weather is stormy

    it('prevents takeoff when weather is stormy', function() {
      spyOn(Math,'random').and.returnValue(0);
      plane.land(airport)
      spyOn(airport._weather,'isStormy').and.returnValue(true);
      expect(function(){ plane.takeoff();}).toThrowError('cannot takeoff during storm');
      expect(airport.planes()).toContain(plane);
    });

// User Story Four
//
// As an air traffic controller
// To ensure safety
// I want to prevent landing when weather is stormy

    it('blocks landing when weather is stormy', function(){
      spyOn(Math,'random').and.returnValue(1);
      expect(function(){ plane.land(airport); }).toThrowError('cannot land during storm');
      expect(airport.planes()).toEqual([]);
    });

  });

});
