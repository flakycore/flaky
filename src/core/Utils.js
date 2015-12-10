import angular from 'angular';

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
    case 'lo':
      firstChar = firstChar.toLowerCase();
      break;
    case 'up':
      firstChar = firstChar.toUpperCase();
      break;
    }

    return firstChar + normalizeName.slice(1);
  }

  static normalizeComponentName(name) {
    return Utils.normalizeByPatternName(name, 'Component', 'lo');
  }

  static normalizeDirectiveName(name) {
    return Utils.normalizeByPatternName(name, 'Directive', 'lo');
  }

  static normalizeControllerAsName(name) {
    return 'ctrl' + Utils.normalizeByPatternName(name, 'Controller', 'up');
  }

  static normalizeDirectiveAsName(name) {
    return 'dt' + Utils.normalizeByPatternName(name, 'Directive', 'up');
  }

  static normalizeComponentAsName(name) {
    return 'cp' + Utils.normalizeByPatternName(name, 'Component', 'up');
  }

  static normalizeRouteName(name) {
    return Utils.normalizeByPatternName(name, 'Controller', 'lo');
  }

  static normalizeServiceName(name) {
    return '$' + Utils.normalizeByPatternName(name, false, 'lo');
  }

  static normalizeFilterName(name) {
    return Utils.normalizeByPatternName(name, 'Filter', 'lo');
  }

  static createInjectedFunction(callback, inject) {
    callback.$inject = inject;
    return callback;
  }
}
