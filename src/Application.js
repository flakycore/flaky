import {injectRun, injectConfig} from './decorators';
import {Module} from './Module';

@injectConfig('$locationProvider', '$httpProvider')
@injectRun('$rootScope')
export class Application extends Module {

  constructor(name) {
    super(name);
    this._useHtml5Mode = true;
    this._requireBase = true;
    this._rewriteLinks = true;
    this._urlPrefix = '!';
  }

  run(rootScope) {
    super.run();

    rootScope.$on('$stateChangeStart', (...args) => {
      this.onStateChangeStart.call(args);
    });

    rootScope.$on('$stateChangeSuccess', (...args) => {
      this.onStateChangeSuccess.call(args);
    });
  }

  config(stateProvider, locationProvider, httpProvider) {
    super.config(stateProvider);

    locationProvider.html5Mode({
      'enabled': this._useHtml5Mode,
      'requireBase': this._requireBase,
      'rewriteLinks': this._rewriteLinks
    }).hashPrefix(this._urlPrefix);

    for (let [interceptor, type] of this._interceptors) {
      httpProvider.interceptors.push(interceptor.name);
    }
  }

  onStateChangeStart(event, toState, toParams, fromState, fromParams) {
  }

  onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
  }

  setUseHtml5Mode(useHtml5Mode) {
    this._useHtml5Mode = useHtml5Mode;
    return this;
  }

  setRequireBase(requireBase) {
    this._requireBase = requireBase;
  }

  setRewriteLinks(rewriteLinks) {
    this._rewriteLinks = rewriteLinks;
  }

  setUrlPrefix(urlPrefix) {
    this._urlPrefix = urlPrefix;
  }
}
