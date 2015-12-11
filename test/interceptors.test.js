import {flaky} from 'src/flaky';
import {FooResponseInterceptor, FooRequestInterceptor, FooResponseErrorInterceptor, FooRequestErrorInterceptor} from './fixtures/FooInterceptors';

describe('Interceptors', () => {
  let $fooResponseInterceptor,
    $fooRequestInterceptor,
    $fooResponseErrorInterceptor,
    $fooRequestErrorInterceptor;

  let inputObj = {test: 'test'};
  let expectedObj = {test: 'test', fromService: 'Hello from service'};

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$fooResponseInterceptor_,
                     _$fooRequestInterceptor_,
                     _$fooResponseErrorInterceptor_,
                     _$fooRequestErrorInterceptor_) => {

    $fooResponseInterceptor = _$fooResponseInterceptor_;
    $fooRequestInterceptor = _$fooRequestInterceptor_;
    $fooResponseErrorInterceptor = _$fooResponseErrorInterceptor_;
    $fooRequestErrorInterceptor = _$fooRequestErrorInterceptor_;
  }));

  it('All interceptors should be exists in flaky', () => {
    let expectedArray = [
      [FooResponseInterceptor, 'response'],
      [FooRequestInterceptor, 'request'],
      [FooResponseErrorInterceptor, 'responseError'],
      [FooRequestErrorInterceptor, 'requestError']
    ];
    expect(flaky.module.interceptors).to.have.length(expectedArray.length);
    expect(flaky.module.interceptors).to.deep.include.members(expectedArray);
  });

  it('All interceptors should be exists in angular', () => {
    expect($fooResponseInterceptor).to.be.ok;
    expect($fooRequestInterceptor).to.be.ok;
    expect($fooResponseErrorInterceptor).to.be.ok;
    expect($fooRequestErrorInterceptor).to.be.ok;
  });

  it('FooResponseInterceptor[\'response\'] should return updated argument', () => {
    let responseInterceptor = $fooResponseInterceptor['response'];
    expect(responseInterceptor(inputObj)).to.deep.equal(expectedObj);
  });

  it('FooRequestInterceptor[\'request\'] should return updated argument', () => {
    let requestInterceptor = $fooRequestInterceptor['request'];
    expect(requestInterceptor(inputObj)).to.deep.equal(expectedObj);
  });

  it('FooResponseErrorInterceptor[\'responseError\'] should return updated argument', () => {
    let responseErrorInterceptor = $fooResponseErrorInterceptor['responseError'];
    expect(responseErrorInterceptor(inputObj)).to.deep.equal(expectedObj);
  });

  it('FooRequestErrorInterceptor[\'requestError\'] should return updated argument', () => {
    let requestErrorInterceptor = $fooRequestErrorInterceptor['requestError'];
    expect(requestErrorInterceptor(inputObj)).to.deep.equal(expectedObj);
  });

});
