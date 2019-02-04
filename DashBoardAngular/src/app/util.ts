// see .angular-cli.json line 25 scripts for global context
declare var require: any;
var _ = require('underscore');
_.mixin({ deepPick: require('deep_pick') });


  /**
   *
   * special class Utils / mostly stuff for managing data structure
   *
   */
export class Utils {
  static multiFilter = (arr: Object[], filters: Object) => {
    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
      return filterKeys.every(eachKey => {
        if (!filters[eachKey].length) {
          return true;
        }
        return filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  static multiRemove = (arr: Object[], filters: Object) => {
    const filterKeys = Object.keys(filters);
    return arr.filter(eachObj => {
      return filterKeys.every(eachKey => {
        if (!filters[eachKey].length) {
          return true;
        }
        return !filters[eachKey].includes(eachObj[eachKey]);
      });
    });
  };

  static move(array, from, to) {
    if (to === from) {
      return array;
    }

    const target = array[from];
    const increment = to < from ? -1 : 1;

    for (let k = from; k !== to; k += increment) {
      array[k] = array[k + increment];
    }
    array[to] = target;
    return array;
  }

  static uniqFilterAccordingToProp(prop) {
    if (prop) {
      return (elt, i, arr) => arr.map(el => el[prop]).indexOf(elt[prop]) === i;
    } else {
      return (element, i, arr) => arr.indexOf(element) === i;
    }
  }
  // flatten nested object into one list of value
  static flat(xs) {
    const foldl = f => acc => xs => xs.reduce(uncurry(f), acc);
    const uncurry = f => (a, b) => f(a)(b);
    const concat = xs => y => xs.concat(y);
    const flatten = xs => foldl(concat)([])(xs);
    return flatten(xs);
  }

  static lpad(value, padding) {
    var zeroes = new Array(padding + 1).join('0');
    return (zeroes + value).slice(-padding);
  }

  static deepPick = _.deepPick;

  // flatten object with path as key, and value as value
  // let flattened = {}
  // Utils.flatten(json,flattened,'');
  static flatten(json, flattened, str_key) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        if (json[key] instanceof Object && json[key] != '') {
          Utils.flatten(json[key], flattened, str_key + '.' + key);
        } else {
          flattened[str_key + '.' + key] = json[key];
        }
      }
    }
  }
}
