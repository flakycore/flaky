import {flaky} from 'flaky/flaky';

describe('Flaky', () => {
  it('should be exists', () => {
    expect(flaky).to.be.ok;
  });

  it('should be type object', () => {
    expect(flaky).to.be.an('object');
  });
});
