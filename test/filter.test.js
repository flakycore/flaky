import {flaky} from 'flaky/flaky';
import {FooFilter} from './fixtures/FooFilter';

describe('FooFilter', () => {
  let $filter;
  let createdFilter;
  let filterNormalizeName = 'foo';

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$filter_) => {
    $filter = _$filter_;
  }));

  beforeEach(() => {
    createdFilter = $filter(filterNormalizeName);
  });

  it('should be exists in flaky', () => {
    expect(FooFilter).to.be.equals(flaky.filters[0]);
  });

  it('should be exists in angular', () => {
    expect(createdFilter).to.be.ok;
  });

  it('should return value from run(\'10\')', () => {
    expect(createdFilter("10")).to.equal(10);
  });

  it('should return value from run(9) using injected service', () => {
    expect(createdFilter(9)).to.equal("Hello");
  });

});
