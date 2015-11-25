'use strict';

describe('Http Service', function () {

  beforeEach(module('farseerApp'));

  var service,
    $httpBackend;

  beforeEach(inject(function (httpService, _$httpBackend_) {
    service = httpService;
    $httpBackend = _$httpBackend_;
  }));

  it('should return players data', function () {
    $httpBackend.expectGET('/api/worlds/world/players')
      .respond(['Harry Potter', 'Hermione Granger', 'Ron Weasley']);

    service.getPlayers().then(function (returnedPlayers) {
      expect(returnedPlayers.length).toEqual(3);
      expect(returnedPlayers[0]).toBe('Harry Potter');
      expect(returnedPlayers[1]).toBe('Hermione Granger');
      expect(returnedPlayers[2]).toBe('Ron Weasley');
    });

    $httpBackend.flush();

  });

  it('should add new player', function () {
    var newPlayer = '{"name":"Draco","email":"malfoy@email"}';
    $httpBackend.expectPOST('/api/worlds/world/players', newPlayer).respond(200);

    service.addPlayer(newPlayer).then(function (response) {
      expect(response.status).toBe(200);
    });
    $httpBackend.flush();
  });

  it('should update existing player', function () {
    var smitty = { name: 'Smith', email: 'smitty@email', _id: 'smitty123' };

    $httpBackend.expectPUT('/api/worlds/world/players/' + smitty._id, smitty).respond(200);

    service.update(smitty).then(function (response) {
      expect(response.status).toBe(200);
    });

    $httpBackend.flush();
  });

  it('should return team-to-players map data', function () {
    var expectedResult = [{ team: 'Gryffindor', players: [{ name: 'Harry Potter' }] }];
    $httpBackend.expectGET('/api/worlds/world/maps').respond(expectedResult);

    service.getTeamToPlayersMap().then(function (returnedMap) {
      expect(returnedMap).toEqual(expectedResult);
    });

    $httpBackend.flush();
  });

  it('should return team-to-players map data for a specified subteam', function () {
    var expectedResult = [{ team: 'Ravenclaw', players: [{ name: 'Luna Lovegood' }] }];
    $httpBackend.expectGET('/api/worlds/world/maps/Hogwarts/Ravenclaw').respond(expectedResult);

    service.getTeamToPlayersMap('/Hogwarts/Ravenclaw').then(function (returnedMap) {
      expect(returnedMap).toEqual(expectedResult);
    });

    $httpBackend.flush();
  });

  it('should return list of worlds', function () {
    $httpBackend.expectGET('/api/worlds')
      .respond(['Hogwarts', 'Beauxbatons', 'Durmstrang']);

    service.getWorlds().then(function (returnedWorlds) {
      expect(returnedWorlds.length).toEqual(3);
      expect(returnedWorlds[0]).toBe('Hogwarts');
      expect(returnedWorlds[1]).toBe('Beauxbatons');
      expect(returnedWorlds[2]).toBe('Durmstrang');
    });

    $httpBackend.flush();
  });
});