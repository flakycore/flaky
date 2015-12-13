import {flaky} from 'src/flaky';

describe('Route', () => {
  let $rootScope;
  let $stateService;
  let $injector;
  let stateName = 'foo';
  let state;

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$rootScope_, _$state_, _$injector_) => {
    $rootScope = _$rootScope_;
    $stateService = _$state_;
    $injector = _$injector_;
    state = $stateService.get(stateName);
  }));

  it('should be exists', () => {
    expect($stateService.get(stateName)).to.be.ok;
  });

  it('should respond to URL', function() {
    expect(state.url).to.be.equals('/foo');
  });

  it('should be go to /foo', () => {
    $stateService.go(stateName);
    $rootScope.$digest();
    expect($stateService.current.name).to.be.equals(stateName);
  });

  it('should be template', () => {
    expect(state.template).to.be.equals('<foo></foo>');
  });
});
