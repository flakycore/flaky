import angular from 'angular';

const LOWER = 0;
const UPPER = 1;

export class Utils {

  static isDefined(value) {
    return angular.isDefined(value);
  }

  static isArray(value) {
    return angular.isArray(value);
  }

  static isFunction(value) {
    return angular.isFunction(value);
  }

  static normalizeByPatternName(name, patternRegexp, type = false) {
    let firstChar = name.charAt(0);
    let normalizeName = patternRegexp !== false ? name.replace(new RegExp(patternRegexp), '') : name;

    switch (type) {
    case LOWER:
      firstChar = firstChar.toLowerCase();
      break;
    case UPPER:
      firstChar = firstChar.toUpperCase();
      break;
    }

    return firstChar + normalizeName.slice(1);
  }

  static normalizeInterceptorName(name) {
    return '$' + Utils.normalizeByPatternName(name, false, LOWER);
  }

  static normalizeComponentName(name) {
    return Utils.normalizeByPatternName(name, 'Component', LOWER);
  }

  static normalizeDirectiveName(name) {
    return Utils.normalizeByPatternName(name, 'Directive', LOWER);
  }

  static normalizeControllerAsName(name) {
    return 'ctrl' + Utils.normalizeByPatternName(name, 'Controller', UPPER);
  }

  static normalizeDirectiveAsName(name) {
    return 'dt' + Utils.normalizeByPatternName(name, 'Directive', UPPER);
  }

  static normalizeComponentAsName(name) {
    return 'cp' + Utils.normalizeByPatternName(name, 'Component', UPPER);
  }

  static normalizeRouteName(name) {
    return Utils.normalizeByPatternName(name, 'Controller', LOWER);
  }

  static normalizeServiceName(name) {
    return '$' + Utils.normalizeByPatternName(name, false, LOWER);
  }

  static normalizeFilterName(name) {
    return Utils.normalizeByPatternName(name, 'Filter', LOWER);
  }

  static normalizeConfigurationName(name) {
    return 'cfg.' + Utils.normalizeByPatternName(name, 'Configuration', LOWER);
  }

  static createInjectedFunction(callback, inject) {
    callback.$inject = inject;
    return callback;
  }
}
