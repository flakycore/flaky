import {flaky} from 'src/flaky';
import {FooFilter} from './fixtures/FooFilter';

describe('Filter', () => {
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

  it('FooFilter should be exists in flaky', () => {
    expect(FooFilter).to.be.equals(flaky.module.filters[0]);
  });

  it('FooFilter should be exists in angular', () => {
    expect(createdFilter).to.be.ok;
  });

  it('FooFilter should return value from run(\'10\')', () => {
    expect(createdFilter("10")).to.equal(10);
  });

  it('FooFilter should return value from run(9) using injected service', () => {
    expect(createdFilter(9)).to.equal("Hello");
  });

});
