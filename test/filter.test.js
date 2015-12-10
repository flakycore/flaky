import {flaky} from 'flaky/flaky';
import {FooFilter} from './fixtures/FooFilter';

describe('FooFilter', () => {
  let $filter;
  let createdFilter;
  let filterNormalizeName = 'fooFilter';

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

  xit('field should be equal "foo"', () => {
  });

  xit('method should return "test"', () => {
  });
});
