import {Module} from 'src/Module';
import {FooConfiguration} from './fixtures/FooConfiguration';

describe('Configuration', () => {
  it('FooConfiguration should be exists', () => {
    let module = new Module();
    module.addConfiguration(new FooConfiguration());
    expect(module.configurations[0]).to.be.an.instanceof(FooConfiguration);
  });

  it('FooConfiguration should be throw', () => {
    let module = new Module();
    module.addConfiguration(new FooConfiguration());
    expect(() => {
      module.load();
    }).to.throw(Error);
  });
});
