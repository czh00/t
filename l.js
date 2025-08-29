(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Lunisolar = factory());
})(this, (function () { 'use strict';

  const commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   * @typedef {import('./data-type').Gan} Gan
   * @typedef {import('./data-type').Zhi} Zhi
   * @typedef {import('./data-type').PlubicDate} PlubicDate
   * @typedef {import('./data-type').LunisolarDate} LunisolarDate
   * @typedef {import('./data-type').LunisolarMonth} LunisolarMonth
   * @typedef {import('./data-type').LunisolarDay} LunisolarDay
   * @typedef {import('./data-type').LunisolarHour} LunisolarHour
   * @typedef {import('./data-type').LunisolarYear} LunisolarYear
   * @typedef {import('./data-type').LunisolarTerm} LunisolarTerm
   * @typedef {import('./data-type').LunisolarTerms} LunisolarTerms
   * @typedef {import('./data-type').LunisolarCalendarData} LunisolarCalendarData
   * @typedef {import('./data-type').LunisolarFindTarget} LunisolarFindTarget
   * @typedef {import('./data-type').LunisolarFindOptions} LunisolarFindOptions
   * @typedef {import('./data-type').LunisolarSetOptions} LunisolarSetOptions
   */

  const a = 'àáâãäåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  /**
   * 字串轉換成slug
   * @param {string} string
   * @returns {string}
   */
  function slugify(string) {
    return string.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  }

  /**
   * @param {number} num
   */
  function padZone(num) {
    return String(num).padStart(2, '0');
  }

  /**
   * @param {Date} date
   */
  function getTimezoneOffset(date) {
    const offset = date.getTimezoneOffset() * -1;
    const hour = Math.floor(offset / 60);
    const minute = offset % 60;
    const sign = hour >= 0 ? '+' : '-';
    return `${sign}${padZone(Math.abs(hour))}:${padZone(Math.abs(minute))}`;
  }

  /**
   * 檢查一個值是否為空值 (null 或 undefined)。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是 null 或 undefined，則返回 true，否則返回 false。
   */
  function isNil(value) {
    return value === null || value === undefined;
  }

  /**
   * 檢查一個值是否為數字。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是數字，則返回 true，否則返回 false。
   */
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * 檢查一個值是否為整數。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是整數，則返回 true，否則返回 false。
   */
  function isInteger(value) {
    return Number.isInteger(value);
  }

  /**
   * 檢查一個值是否為字串。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是字串，則返回 true，否則返回 false。
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   * 檢查一個值是否為布林值。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是布林值，則返回 true，否則返回 false。
   */
  function isBoolean(value) {
    return typeof value === 'boolean';
  }

  /**
   * 檢查一個值是否為物件。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是物件，則返回 true，否則返回 false。
   */
  function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  /**
   * 檢查一個值是否為陣列。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是陣列，則返回 true，否則返回 false。
   */
  function isArray(value) {
    return Array.isArray(value);
  }

  /**
   * 檢查一個值是否為函式。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是函式，則返回 true，否則返回 false。
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   * 檢查一個值是否為 Date 物件。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是 Date 物件，則返回 true，否則返回 false。
   */
  function isDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
  }

  /**
   * 檢查一個值是否為正則表達式。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值是正則表達式，則返回 true，否則返回 false。
   */
  function isRegExp(value) {
    return value instanceof RegExp;
  }

  /**
   * 檢查一個值是否為空（空字串、空陣列、空物件）。
   *
   * @param {*} value - 要檢查的值。
   * @returns {boolean} 如果值為空，則返回 true，否則返回 false。
   */
  function isEmpty(value) {
    if (isNil(value)) {
      return true;
    }
    if (isString(value) || isArray(value)) {
      return value.length === 0;
    }
    if (isObject(value)) {
      return Object.keys(value).length === 0;
    }
    return false;
  }
  const types = {
    isNil,
    isNumber,
    isInteger,
    isString,
    isBoolean,
    isObject,
    isArray,
    isFunction,
    isDate,
    isRegExp,
    isEmpty
  };

  /**
   * 將傳入的參數轉換成Date物件
   * @param {PlubicDate} date
   * @returns {Date}
   */
  function toDate(date) {
    if (types.isDate(date)) {
      return new Date(date);
    }
    if (types.isString(date)) {
      const d = new Date(date.replace(/-/g, '/'));
      if (types.isDate(d)) {
        return d;
      }
    }
    if (types.isNumber(date)) {
      const d = new Date(date);
      if (types.isDate(d)) {
        return d;
      }
    }
    if (types.isObject(date)) {
      const {
        year,
        month,
        day,
        hour,
        minute,
        second
      } = date;
      const d = new Date(year, month - 1, day, hour, minute, second);
      if (types.isDate(d)) {
        return d;
      }
    }
    throw new Error('Invalid date');
  }

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   */
  const HeavenlyStems = [{
    "name": "甲",
    "value": 1,
    "yinYang": 1,
    "fiveElements": "木"
  }, {
    "name": "乙",
    "value": 2,
    "yinYang": -1,
    "fiveElements": "木"
  }, {
    "name": "丙",
    "value": 3,
    "yinYang": 1,
    "fiveElements": "火"
  }, {
    "name": "丁",
    "value": 4,
    "yinYang": -1,
    "fiveElements": "火"
  }, {
    "name": "戊",
    "value": 5,
    "yinYang": 1,
    "fiveElements": "土"
  }, {
    "name": "己",
    "value": 6,
    "yinYang": -1,
    "fiveElements": "土"
  }, {
    "name": "庚",
    "value": 7,
    "yinYang": 1,
    "fiveElements": "金"
  }, {
    "name": "辛",
    "value": 8,
    "yinYang": -1,
    "fiveElements": "金"
  }, {
    "name": "壬",
    "value": 9,
    "yinYang": 1,
    "fiveElements": "水"
  }, {
    "name": "癸",
    "value": 10,
    "yinYang": -1,
    "fiveElements": "水"
  }];
  const EarthlyBranches = [{
    "name": "子",
    "value": 1,
    "yinYang": 1,
    "fiveElements": "水",
    "zodiac": "鼠"
  }, {
    "name": "丑",
    "value": 2,
    "yinYang": -1,
    "fiveElements": "土",
    "zodiac": "牛"
  }, {
    "name": "寅",
    "value": 3,
    "yinYang": 1,
    "fiveElements": "木",
    "zodiac": "虎"
  }, {
    "name": "卯",
    "value": 4,
    "yinYang": -1,
    "fiveElements": "木",
    "zodiac": "兔"
  }, {
    "name": "辰",
    "value": 5,
    "yinYang": 1,
    "fiveElements": "土",
    "zodiac": "龍"
  }, {
    "name": "巳",
    "value": 6,
    "yinYang": -1,
    "fiveElements": "火",
    "zodiac": "蛇"
  }, {
    "name": "午",
    "value": 7,
    "yinYang": 1,
    "fiveElements": "火",
    "zodiac": "馬"
  }, {
    "name": "未",
    "value": 8,
    "yinYang": -1,
    "fiveElements": "土",
    "zodiac": "羊"
  }, {
    "name": "申",
    "value": 9,
    "yinYang": 1,
    "fiveElements": "金",
    "zodiac": "猴"
  }, {
    "name": "酉",
    "value": 10,
    "yinYang": -1,
    "fiveElements": "金",
    "zodiac": "雞"
  }, {
    "name": "戌",
    "value": 11,
    "yinYang": 1,
    "fiveElements": "土",
    "zodiac": "狗"
  }, {
    "name": "亥",
    "value": 12,
    "yinYang": -1,
    "fiveElements": "水",
    "zodiac": "豬"
  }];
  const Zodiacs = [{
    "name": "鼠",
    "value": 1
  }, {
    "name": "牛",
    "value": 2
  }, {
    "name": "虎",
    "value": 3
  }, {
    "name": "兔",
    "value": 4
  }, {
    "name": "龍",
    "value": 5
  }, {
    "name": "蛇",
    "value": 6
  }, {
    "name": "馬",
    "value": 7
  }, {
    "name": "羊",
    "value": 8
  }, {
    "name": "猴",
    "value": 9
  }, {
    "name": "雞",
    "value": 10
  }, {
    "name": "狗",
    "value": 11
  }, {
    "name": "豬",
    "value": 12
  }];
  const Eras = [{
    "name": "黃帝",
    "year": -2697
  }, {
    "name": "共和",
    "year": -841
  }, {
    "name": "秦",
    "year": -221
  }, {
    "name": "漢",
    "year": -202
  }, {
    "name": "新",
    "year": 9
  }, {
    "name": "玄漢",
    "year": 23
  }, {
    "name": "東漢",
    "year": 25
  }, {
    "name": "三國",
    "year": 220
  }, {
    "name": "晉",
    "year": 265
  }, {
    "name": "十六國",
    "year": 304
  }, {
    "name": "南朝",
    "year": 420
  }, {
    "name": "北朝",
    "year": 439
  }, {
    "name": "隋",
    "year": 581
  }, {
    "name": "唐",
    "year": 618
  }, {
    "name": "五代十國",
    "year": 907
  }, {
    "name": "宋",
    "year": 960
  }, {
    "name": "遼",
    "year": 916
  }, {
    "name": "金",
    "year": 1115
  }, {
    "name": "元",
    "year": 1271
  }, {
    "name": "明",
    "year": 1368
  }, {
    "name": "清",
    "year": 1644
  }, {
    "name": "中華民國",
    "year": 1912
  }];
  const SolarTerms = [{
    "name": "小寒",
    "value": "lesserCold"
  }, {
    "name": "大寒",
    "value": "greaterCold"
  }, {
    "name": "立春",
    "value": "springBegins"
  }, {
    "name": "雨水",
    "value": "theRains"
  }, {
    "name": "驚蟄",
    "value": "insectsAwaken"
  }, {
    "name": "春分",
    "value": "vernalEquinox"
  }, {
    "name": "清明",
    "value": "clearAndBright"
  }, {
    "name": "穀雨",
    "value": "grainRain"
  }, {
    "name": "立夏",
    "value": "summerBegins"
  }, {
    "name": "小滿",
    "value": "grainBuds"
  }, {
    "name": "芒種",
    "value": "grainInEar"
  }, {
    "name": "夏至",
    "value": "summerSolstice"
  }, {
    "name": "小暑",
    "value": "lesserHeat"
  }, {
    "name": "大暑",
    "value": "greaterHeat"
  }, {
    "name": "立秋",
    "value": "autumnBegins"
  }, {
    "name": "處暑",
    "value": "stillHot"
  }, {
    "name": "白露",
    "value": "whiteDews"
  }, {
    "name": "秋分",
    "value": "autumnalEquinox"
  }, {
    "name": "寒露",
    "value": "coldDews"
  }, {
    "name": "霜降",
    "value": "hoarFrostFalls"
  }, {
    "name": "立冬",
    "value": "winterBegins"
  }, {
    "name": "小雪",
    "value": "lightSnow"
  }, {
    "name": "大雪",
    "value": "heavySnow"
  }, {
    "name": "冬至",
    "value": "winterSolstice"
  }];
  const LunarMonths = [{
    "name": "正月",
    "value": 1,
    "isLeap": false
  }, {
    "name": "二月",
    "value": 2,
    "isLeap": false
  }, {
    "name": "三月",
    "value": 3,
    "isLeap": false
  }, {
    "name": "四月",
    "value": 4,
    "isLeap": false
  }, {
    "name": "五月",
    "value": 5,
    "isLeap": false
  }, {
    "name": "六月",
    "value": 6,
    "isLeap": false
  }, {
    "name": "七月",
    "value": 7,
    "isLeap": false
  }, {
    "name": "八月",
    "value": 8,
    "isLeap": false
  }, {
    "name": "九月",
    "value": 9,
    "isLeap": false
  }, {
    "name": "十月",
    "value": 10,
    "isLeap": false
  }, {
    "name": "十一月",
    "value": 11,
    "isLeap": false
  }, {
    "name": "十二月",
    "value": 12,
    "isLeap": false
  }, {
    "name": "閏正月",
    "value": 1,
    "isLeap": true
  }, {
    "name": "閏二月",
    "value": 2,
    "isLeap": true
  }, {
    "name": "閏三月",
    "value": 3,
    "isLeap": true
  }, {
    "name": "閏四月",
    "value": 4,
    "isLeap": true
  }, {
    "name": "閏五月",
    "value": 5,
    "isLeap": true
  }, {
    "name": "閏六月",
    "value": 6,
    "isLeap": true
  }, {
    "name": "閏七月",
    "value": 7,
    "isLeap": true
  }, {
    "name": "閏八月",
    "value": 8,
    "isLeap": true
  }, {
    "name": "閏九月",
    "value": 9,
    "isLeap": true
  }, {
    "name": "閏十月",
    "value": 10,
    "isLeap": true
  }, {
    "name": "閏十一月",
    "value": 11,
    "isLeap": true
  }, {
    "name": "閏十二月",
    "value": 12,
    "isLeap": true
  }];
  const LunarDates = [{
    "name": "初一",
    "value": 1
  }, {
    "name": "初二",
    "value": 2
  }, {
    "name": "初三",
    "value": 3
  }, {
    "name": "初四",
    "value": 4
  }, {
    "name": "初五",
    "value": 5
  }, {
    "name": "初六",
    "value": 6
  }, {
    "name": "初七",
    "value": 7
  }, {
    "name": "初八",
    "value": 8
  }, {
    "name": "初九",
    "value": 9
  }, {
    "name": "初十",
    "value": 10
  }, {
    "name": "十一",
    "value": 11
  }, {
    "name": "十二",
    "value": 12
  }, {
    "name": "十三",
    "value": 13
  }, {
    "name": "十四",
    "value": 14
  }, {
    "name": "十五",
    "value": 15
  }, {
    "name": "十六",
    "value": 16
  }, {
    "name": "十七",
    "value": 17
  }, {
    "name": "十八",
    "value": 18
  }, {
    "name": "十九",
    "value": 19
  }, {
    "name": "二十",
    "value": 20
  }, {
    "name": "廿一",
    "value": 21
  }, {
    "name": "廿二",
    "value": 22
  }, {
    "name": "廿三",
    "value": 23
  }, {
    "name": "廿四",
    "value": 24
  }, {
    "name": "廿五",
    "value": 25
  }, {
    "name": "廿六",
    "value": 26
  }, {
    "name": "廿七",
    "value": 27
  }, {
    "name": "廿八",
    "value": 28
  }, {
    "name": "廿九",
    "value": 29
  }, {
    "name": "三十",
    "value": 30
  }];
  const Weeks = [{
    "name": "星期日",
    "value": 0
  }, {
    "name": "星期一",
    "value": 1
  }, {
    "name": "星期二",
    "value": 2
  }, {
    "name": "星期三",
    "value": 3
  }, {
    "name": "星期四",
    "value": 4
  }, {
    "name": "星期五",
    "value": 5
  }, {
    "name": "星期六",
    "value": 6
  }];
  const Festivals = {
    "lunar": {
      "1-1": [{
        "name": "春節"
      }, {
        "name": "彌勒佛誕"
      }],
      "1-6": [{
        "name": "定光佛誕"
      }],
      "1-9": [{
        "name": "玉皇上帝誕"
      }],
      "1-15": [{
        "name": "元宵節"
      }, {
        "name": "上元天官誕"
      }],
      "2-1": [{
        "name": "一殿秦廣王千秋"
      }],
      "2-2": [{
        "name": "濟公活佛誕"
      }, {
        "name": "福德正神千秋"
      }],
      "2-3": [{
        "name": "文昌帝君誕"
      }],
      "2-8": [{
        "name": "三殿宋帝王千秋"
      }],
      "2-15": [{
        "name": "太上老君誕"
      }],
      "2-18": [{
        "name": "四殿五官王千秋"
      }],
      "2-19": [{
        "name": "觀世音菩薩誕"
      }],
      "2-21": [{
        "name": "普賢菩薩誕"
      }],
      "3-1": [{
        "name": "二殿楚江王千秋"
      }],
      "3-3": [{
        "name": "玄天上帝誕"
      }],
      "3-8": [{
        "name": "六殿卞城王千秋"
      }],
      "3-15": [{
        "name": "保生大帝誕"
      }, {
        "name": "中路財神誕"
      }],
      "3-16": [{
        "name": "準提菩薩誕"
      }],
      "3-19": [{
        "name": "太陽星君誕"
      }],
      "3-20": [{
        "name": "註生娘娘誕"
      }],
      "3-23": [{
        "name": "天上聖母誕"
      }],
      "3-27": [{
        "name": "七殿泰山王千秋"
      }],
      "3-28": [{
        "name": "蒼頡先師誕"
      }],
      "4-1": [{
        "name": "八殿都市王千秋"
      }],
      "4-4": [{
        "name": "文殊菩薩誕"
      }],
      "4-8": [{
        "name": "釋迦佛祖誕"
      }, {
        "name": "九殿平等王千秋"
      }],
      "4-14": [{
        "name": "孚佑帝君誕"
      }],
      "4-17": [{
        "name": "十殿輪轉王千秋"
      }],
      "4-21": [{
        "name": "李托塔天王誕"
      }],
      "4-28": [{
        "name": "神農大帝誕"
      }],
      "5-5": [{
        "name": "端午節"
      }],
      "5-7": [{
        "name": "巧聖先師誕"
      }],
      "5-13": [{
        "name": "關平太子誕"
      }],
      "5-18": [{
        "name": "張府天師誕"
      }],
      "6-3": [{
        "name": "韋馱菩薩誕"
      }],
      "6-19": [{
        "name": "觀世音菩薩得道"
      }],
      "6-24": [{
        "name": "關聖帝君誕"
      }],
      "7-7": [{
        "name": "七夕"
      }, {
        "name": "大成魁星誕"
      }],
      "7-13": [{
        "name": "大勢至菩薩誕"
      }],
      "7-15": [{
        "name": "中元地官誕"
      }],
      "7-19": [{
        "name": "值年太歲誕"
      }],
      "7-21": [{
        "name": "普庵菩薩誕"
      }],
      "7-24": [{
        "name": "龍樹菩薩誕"
      }],
      "7-30": [{
        "name": "地藏王菩薩誕"
      }],
      "8-3": [{
        "name": "北斗星君誕"
      }],
      "8-5": [{
        "name": "雷聲普化天尊誕"
      }],
      "8-15": [{
        "name": "中秋節"
      }, {
        "name": "太陰星君誕"
      }],
      "8-22": [{
        "name": "燃燈佛古誕"
      }],
      "8-27": [{
        "name": "至聖先師誕"
      }],
      "9-9": [{
        "name": "重陽節"
      }, {
        "name": "中壇元帥誕"
      }],
      "9-19": [{
        "name": "觀世音菩薩出家"
      }],
      "9-30": [{
        "name": "藥師佛誕"
      }],
      "10-5": [{
        "name": "達摩祖師誕"
      }],
      "10-12": [{
        "name": "齊天大聖誕"
      }],
      "10-15": [{
        "name": "下元水官誕"
      }],
      "11-4": [{
        "name": "文殊菩薩誕"
      }],
      "11-11": [{
        "name": "太乙救苦天尊誕"
      }],
      "11-17": [{
        "name": "阿彌陀佛誕"
      }],
      "11-19": [{
        "name": "九蓮菩薩誕"
      }],
      "12-8": [{
        "name": "釋迦佛祖得道"
      }],
      "12-16": [{
        "name": "尾牙"
      }],
      "12-24": [{
        "name": "送神"
      }],
      "12-29": [{
        "name": "除夕"
      }]
    },
    "solar": {
      "1-1": [{
        "name": "元旦"
      }],
      "2-14": [{
        "name": "情人節"
      }],
      "2-28": [{
        "name": "和平紀念日"
      }],
      "3-8": [{
        "name": "婦女節"
      }],
      "3-12": [{
        "name": "植樹節"
      }],
      "3-14": [{
        "name": "白色情人節"
      }],
      "3-29": [{
        "name": "青年節"
      }],
      "4-1": [{
        "name": "愚人節"
      }],
      "4-4": [{
        "name": "兒童節"
      }],
      "5-1": [{
        "name": "勞動節"
      }],
      "8-8": [{
        "name": "父親節"
      }],
      "9-3": [{
        "name": "軍人節"
      }],
      "9-28": [{
        "name": "教師節"
      }],
      "10-10": [{
        "name": "國慶日"
      }],
      "10-25": [{
        "name": "台灣光復節"
      }],
      "10-31": [{
        "name": "萬聖節"
      }],
      "11-12": [{
        "name": "國父誕辰"
      }],
      "12-25": [{
        "name": "聖誕節"
      }, {
        "name": "行憲紀念日"
      }]
    },
    "solarByWeek": {
      "5-2-0": [{
        "name": "母親節"
      }]
    }
  };
  const data = {
    HeavenlyStems,
    EarthlyBranches,
    Zodiacs,
    Eras,
    SolarTerms,
    LunarMonths,
    LunarDates,
    Weeks,
    Festivals
  };

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   * @typedef {import('./data-type').Gan} Gan
   * @typedef {import('./data-type').Zhi} Zhi
   * @typedef {import('./data-type').PlubicDate} PlubicDate
   * @typedef {import('./data-type').LunisolarDate} LunisolarDate
   * @typedef {import('./data-type').LunisolarMonth} LunisolarMonth
   * @typedef {import('./data-type').LunisolarDay} LunisolarDay
   * @typedef {import('./data-type').LunisolarHour} LunisolarHour
   * @typedef {import('./data-type').LunisolarYear} LunisolarYear
   * @typedef {import('./data-type').LunisolarTerm} LunisolarTerm
   * @typedef {import('./data-type').LunisolarTerms} LunisolarTerms
   * @typedef {import('./data-type').LunisolarCalendarData} LunisolarCalendarData
   * @typedef {import('./data-type').LunisolarFindTarget} LunisolarFindTarget
   * @typedef {import('./data-type').LunisolarFindOptions} LunisolarFindOptions
   * @typedef {import('./data-type').LunisolarSetOptions} LunisolarSetOptions
   */

  const {
    HeavenlyStems: HeavenlyStems$1,
    EarthlyBranches: EarthlyBranches$1,
    Zodiacs: Zodiacs$1,
    Eras: Eras$1,
    SolarTerms: SolarTerms$1,
    LunarMonths: LunarMonths$1,
    LunarDates: LunarDates$1,
    Weeks: Weeks$1,
    Festivals: Festivals$1
  } = data;
  class DataHub {
    constructor(options) {
      this._locale = 'zh-TW';
      this._heavenlyStems = HeavenlyStems$1;
      this._earthlyBranches = EarthlyBranches$1;
      this._zodiacs = Zodiacs$1;
      this._eras = Eras$1;
      this._solarTerms = SolarTerms$1;
      this._lunarMonths = LunarMonths$1;
      this._lunarDates = LunarDates$1;
      this._weeks = Weeks$1;
      this._festivals = Festivals$1;
      if (options) {
        this.config(options);
      }
    }
    config(options) {
      if (types.isObject(options)) {
        if (options.locale) {
          this._locale = options.locale;
        }
        if (options.heavenlyStems) {
          this._heavenlyStems = options.heavenlyStems;
        }
        if (options.earthlyBranches) {
          this._earthlyBranches = options.earthlyBranches;
        }
        if (options.zodiacs) {
          this._zodiacs = options.zodiacs;
        }
        if (options.eras) {
          this._eras = options.eras;
        }
        if (options.solarTerms) {
          this._solarTerms = options.solarTerms;
        }
        if (options.lunarMonths) {
          this._lunarMonths = options.lunarMonths;
        }
        if (options.lunarDates) {
          this._lunarDates = options.lunarDates;
        }
        if (options.weeks) {
          this._weeks = options.weeks;
        }
        if (options.festivals) {
          this._festivals = options.festivals;
        }
      }
    }
    get HeavenlyStems() {
      return this._heavenlyStems;
    }
    get EarthlyBranches() {
      return this._earthlyBranches;
    }
    get Zodiacs() {
      return this._zodiacs;
    }
    get Eras() {
      return this._eras;
    }
    get SolarTerms() {
      return this._solarTerms;
    }
    get LunarMonths() {
      return this._lunarMonths;
    }
    get LunarDates() {
      return this._lunarDates;
    }
    get Weeks() {
      return this._weeks;
    }
    get Festivals() {
      return this._festivals;
    }
  }

  /*
    Lunisolar.js by biliSW
    Github: https://github.com/biliSW/Lunisolar.js
    License: MIT
    */
  const lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63];
  const solarTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
  const sTermPreYear = 31556925974.7;
  const sTermNames = ['小寒', '大寒', '立春', '雨水', '驚蟄', '春分', '清明', '穀雨', '立夏', '小滿', '芒種', '夏至', '小暑', '大暑', '立秋', '處暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];
  const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const solarTerms = {}; // 節氣表

  /**
   * 傳回農曆 y年的總天數
   * @param {number} y
   */
  function lYearDays(y) {
    let i;
    let sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + leapDays(y);
  }

  /**
   * 傳回農曆 y年閏月的天數
   * @param {number} y
   */
  function leapDays(y) {
    if (leapMonth(y)) {
      return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  }

  /**
   * 傳回農曆 y年閏哪個月 1-12 , 沒閏傳回 0
   * @param {number} y
   */
  function leapMonth(y) {
    return lunarInfo[y - 1900] & 0xf;
  }

  /**
   * 傳回農曆 y年m月的總天數
   * @param {number} y
   * @param {number} m
   */
  function monthDays(y, m) {
    return lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  }
  /**
   * @param {Date} date
   */
  function getLunar(date) {
    let i;
    let temp = 0;
    const d = new Date(date);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let day = d.getDate();
    const offset = (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2050 && offset > 0; i++) {
      temp = lYearDays(i);
      // eslint-disable-next-line no-param-reassign
      y = i;
    }
    if (offset < 0) {
      y = 1900;
      temp = lYearDays(y);
    }
    let leap = leapMonth(y); // 閏哪個月
    let isLeap = false;

    // 校正 y和 offset
    if (offset < temp) {
      y--;
      temp = lYearDays(y);
      leap = leapMonth(y);
    }
    let lY = y;
    let lM = 1;
    let lD = offset;
    for (i = 1; i < 13 && lD > 0; i++) {
      // 閏月
      if (leap > 0 && i === leap + 1 && isLeap === false) {
        --i;
        isLeap = true;
        temp = leapDays(y);
      } else {
        temp = monthDays(y, i);
      }

      // 解除閏月
      if (isLeap === true && i === leap + 1) {
        isLeap = false;
      }
      lD -= temp;
      if (isLeap === false) {
        lM = i;
      }
    }
    if (lD < 0) {
      lD += temp;
      if (isLeap) {
        isLeap = false;
        lM = i - 2;
      } else {
        lM = i - 1;
      }
    }
    if (lD === 0 && leap > 0 && lM === leap) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --lM;
      }
    }
    if (offset === 0) {
      lD = 1;
    } else {
      lD++;
    }
    const gzY = getGZ(y - 1864);
    const gzM = getGZ(y * 12 + m + 11);
    const gzD = getGZ(offset + 40);
    return {
      year: y,
      month: m,
      day,
      lunarYear: lY,
      lunarMonth: lM,
      lunarDay: lD,
      isLeap,
      gzY,
      gzM,
      gzD
    };
  }

  /**
   * * @param {number} num 
   * @returns {{gan: string, zhi: string, ganIndex: number, zhiIndex: number}}
   */
  function getGZ(num) {
    const ganIndex = num % 10;
    const zhiIndex = num % 12;
    return {
      gan: gan[ganIndex],
      zhi: zhi[zhiIndex],
      ganIndex,
      zhiIndex
    };
  }

  /**
   * 取得y年的節氣時間
   * @param {number} y
   */
  function getSolarTerm(y) {
    const key = String(y);
    if (solarTerms[key]) {
      return solarTerms[key];
    }
    let diff;
    const result = {};
    for (let i = 0; i < 24; i++) {
      diff = sTermPreYear * (y - 1900) + solarTermInfo[i];
      const date = new Date(Date.UTC(1900, 0, 6, 2, 5) + diff);
      result[sTermNames[i]] = date;
    }
    solarTerms[key] = result;
    return result;
  }
  const calendar = {
    lYearDays,
    leapDays,
    leapMonth,
    monthDays,
    getLunar,
    getSolarTerm
  };

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   * @typedef {import('./data-type').Gan} Gan
   * @typedef {import('./data-type').Zhi} Zhi
   * @typedef {import('./data-type').PlubicDate} PlubicDate
   * @typedef {import('./data-type').LunisolarDate} LunisolarDate
   * @typedef {import('./data-type').LunisolarMonth} LunisolarMonth
   * @typedef {import('./data-type').LunisolarDay} LunisolarDay
   * @typedef {import('./data-type').LunisolarHour} LunisolarHour
   * @typedef {import('./data-type').LunisolarYear} LunisolarYear
   * @typedef {import('./data-type').LunisolarTerm} LunisolarTerm
   * @typedef {import('./data-type').LunisolarTerms} LunisolarTerms
   * @typedef {import('./data-type').LunisolarCalendarData} LunisolarCalendarData
   * @typedef {import('./data-type').LunisolarFindTarget} LunisolarFindTarget
   * @typedef {import('./data-type').LunisolarFindOptions} LunisolarFindOptions
   * @typedef {import('./data-type').LunisolarSetOptions} LunisolarSetOptions
   */

  class LunisolarCore {
    /**
     * @param {PlubicDate} date
     * @param {DataHub} dataHub
     */
    constructor(date, dataHub) {
      this._date = new Date();
      this._dataHub = dataHub;
      this.setDate(date);
    }
    get dataHub() {
      return this._dataHub;
    }

    /**
     * @param {PlubicDate} date
     */
    setDate(date) {
      this._date = toDate(date);
      this._year = this._date.getFullYear();
      this._month = this._date.getMonth() + 1;
      this._day = this._date.getDate();
      this._hour = this._date.getHours();
      this._minute = this._date.getMinutes();
      this._second = this._date.getSeconds();
      this._week = this._date.getDay();
      this._calendarData = calendar.getLunar(this._date);
      this._lunarYear = this._calendarData.lunarYear;
      this._lunarMonth = this._calendarData.lunarMonth;
      this._lunarDay = this._calendarData.lunarDay;
      this._isLeap = this._calendarData.isLeap;
    }
    get calendarData() {
      return this._calendarData;
    }
    get year() {
      return this._year;
    }
    get month() {
      return this._month;
    }
    get day() {
      return this._day;
    }
    get hour() {
      return this._hour;
    }
    get minute() {
      return this._minute;
    }
    get second() {
      return this._second;
    }
    get week() {
      return this._week;
    }
    get lunarYear() {
      return this._lunarYear;
    }
    get lunarMonth() {
      return this._lunarMonth;
    }
    get lunarDay() {
      return this._lunarDay;
    }
    get isLeap() {
      return this._isLeap;
    }
    get date() {
      return this._date;
    }

    /**
     * 取得當年生肖
     * @returns {Zodiac}
     */
    getZodiac() {
      const earthlyBranch = this.getYearInGanZhi().zhi;
      const zodiac = this._dataHub.EarthlyBranches.find(item => item.name === earthlyBranch).zodiac;
      return this._dataHub.Zodiacs.find(item => item.name === zodiac);
    }

    /**
     * 取得年份的天干地支
     * @returns {LunisolarYear}
     */
    getYearInGanZhi() {
      const {
        gan,
        zhi,
        ganIndex,
        zhiIndex
      } = this._calendarData.gzY;
      const heavenlyStem = this._dataHub.HeavenlyStems[ganIndex];
      const earthlyBranch = this._dataHub.EarthlyBranches[zhiIndex];
      return {
        name: `${gan}${zhi}`,
        gan: heavenlyStem,
        zhi: earthlyBranch
      };
    }

    /**
     * 取得月份的天干地支
     * @returns {LunisolarMonth}
     */
    getMonthInGanZhi() {
      const {
        gan,
        zhi,
        ganIndex,
        zhiIndex
      } = this._calendarData.gzM;
      const heavenlyStem = this._dataHub.HeavenlyStems[ganIndex];
      const earthlyBranch = this._dataHub.EarthlyBranches[zhiIndex];
      return {
        name: `${gan}${zhi}`,
        gan: heavenlyStem,
        zhi: earthlyBranch
      };
    }

    /**
     * 取得日期的天干地支
     * @returns {LunisolarDay}
     */
    getDayInGanZhi() {
      const {
        gan,
        zhi,
        ganIndex,
        zhiIndex
      } = this._calendarData.gzD;
      const heavenlyStem = this._dataHub.HeavenlyStems[ganIndex];
      const earthlyBranch = this._dataHub.EarthlyBranches[zhiIndex];
      return {
        name: `${gan}${zhi}`,
        gan: heavenlyStem,
        zhi: earthlyBranch
      };
    }

    /**
     * 取得時辰的天干地支
     * @returns {LunisolarHour}
     */
    getHourInGanZhi() {
      const dayGan = this.getDayInGanZhi().gan.name;
      const hourZhiIndex = Math.floor((this.hour + 1) / 2) % 12;
      const hourZhi = this._dataHub.EarthlyBranches[hourZhiIndex];
      const ganBase = {
        '甲': 1,
        '乙': 3,
        '丙': 5,
        '丁': 7,
        '戊': 9,
        '己': 1,
        '庚': 3,
        '辛': 5,
        '壬': 7,
        '癸': 9
      };
      const hourGanIndex = (ganBase[dayGan] + hourZhiIndex - 1) % 10;
      const hourGan = this._dataHub.HeavenlyStems[hourGanIndex];
      return {
        name: `${hourGan.name}${hourZhi.name}`,
        gan: hourGan,
        zhi: hourZhi
      };
    }

    /**
     * 取得農曆年(中文)
     * @returns {string}
     */
    getLunarYearName() {
      const year = String(this.lunarYear);
      const name = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      return year.split('').map(i => name[i]).join('');
    }

    /**
     * 取得農曆月(中文)
     * @returns {LunarMonth}
     */
    getLunarMonthName() {
      const month = this.lunarMonth;
      const isLeap = this.isLeap;
      return this._dataHub.LunarMonths.find(item => item.value === month && item.isLeap === isLeap);
    }

    /**
     * 取得農曆日(中文)
     * @returns {LunarDate}
     */
    getLunarDayName() {
      const day = this.lunarDay;
      return this._dataHub.LunarDates.find(item => item.value === day);
    }

    /**
     * 取得星期(中文)
     * @returns {Week}
     */
    getWeekName() {
      const week = this.week;
      return this._dataHub.Weeks.find(item => item.value === week);
    }

    /**
     * 取得年號
     * @returns {Era}
     */
    getEra() {
      const eras = this._dataHub.Eras;
      let era = eras[0];
      for (let i = 0; i < eras.length; i++) {
        if (this.year >= eras[i].year) {
          era = eras[i];
        }
      }
      return era;
    }

    /**
     * 取得民國年
     * @returns {number}
     */
    getEraYear() {
      const era = this.getEra();
      if (era.name === '中華民國') {
        return this.year - era.year + 1;
      }
      return null;
    }

    /**
     * 取得所有節氣
     * @returns {LunisolarTerms}
     */
    getSolarTerms() {
      const solarTerms = calendar.getSolarTerm(this.year);
      const result = {};
      for (const key in solarTerms) {
        const solarTerm = this._dataHub.SolarTerms.find(item => item.name === key);
        result[solarTerm.value] = {
          name: key,
          value: solarTerm.value,
          date: solarTerms[key]
        };
      }
      return result;
    }

    /**
     * 取得當日的節氣
     * @returns {LunisolarTerm}
     */
    getSolarTerm() {
      const solarTerms = this.getSolarTerms();
      const solarTermList = Object.values(solarTerms);
      for (let i = 0; i < solarTermList.length; i++) {
        const solarTerm = solarTermList[i];
        const d = new Date(solarTerm.date);
        if (d.getFullYear() === this.year && d.getMonth() + 1 === this.month && d.getDate() === this.day) {
          return solarTerm;
        }
      }
      return null;
    }

    /**
     * 取得節日
     * @returns {Festivals[]}
     */
    getFestivals() {
      const festivals = [];
      const {
        lunar: lunarFestivals,
        solar: solarFestivals,
        solarByWeek: solarByWeekFestivals
      } = this._dataHub.Festivals;
      // 農曆
      const lunarKey = `${this.lunarMonth}-${this.lunarDay}`;
      if (lunarFestivals[lunarKey]) {
        festivals.push(...lunarFestivals[lunarKey]);
      }
      // 國曆
      const solarKey = `${this.month}-${this.day}`;
      if (solarFestivals[solarKey]) {
        festivals.push(...solarFestivals[solarKey]);
      }
      // 國曆(週)
      const weekOfMonth = Math.floor((this.day - 1) / 7) + 1;
      const solarByWeekKey = `${this.month}-${weekOfMonth}-${this.week}`;
      if (solarByWeekFestivals[solarByWeekKey]) {
        festivals.push(...solarByWeekFestivals[solarByWeekKey]);
      }
      return festivals;
    }
  }

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   * @typedef {import('./data-type').Gan} Gan
   * @typedef {import('./data-type').Zhi} Zhi
   * @typedef {import('./data-type').PlubicDate} PlubicDate
   * @typedef {import('./data-type').LunisolarDate} LunisolarDate
   * @typedef {import('./data-type').LunisolarMonth} LunisolarMonth
   * @typedef {import('./data-type').LunisolarDay} LunisolarDay
   * @typedef {import('./data-type').LunisolarHour} LunisolarHour
   * @typedef {import('./data-type').LunisolarYear} LunisolarYear
   * @typedef {import('./data-type').LunisolarTerm} LunisolarTerm
   * @typedef {import('./data-type').LunisolarTerms} LunisolarTerms
   * @typedef {import('./data-type').LunisolarCalendarData} LunisolarCalendarData
   * @typedef {import('./data-type').LunisolarFindTarget} LunisolarFindTarget
   * @typedef {import('./data-type').LunisolarFindOptions} LunisolarFindOptions
   * @typedef {import('./data-type').LunisolarSetOptions} LunisolarSetOptions
   */

  /**
   * 格式化字串
   * @param {string} formatStr
   * @param {LunisolarCore} core
   * @returns {string}
   */
  function format(formatStr, core) {
    const {
      year,
      month,
      day,
      hour,
      minute,
      second,
      week,
      lunarYear,
      lunarMonth,
      lunarDay
    } = core;
    const lunarYearName = core.getLunarYearName();
    const lunarMonthName = core.getLunarMonthName().name;
    const lunarDayName = core.getLunarDayName().name;
    const yearInGanZhi = core.getYearInGanZhi();
    const monthInGanZhi = core.getMonthInGanZhi();
    const dayInGanZhi = core.getDayInGanZhi();
    const hourInGanZhi = core.getHourInGanZhi();
    const zodiac = core.getZodiac().name;
    const weekName = core.getWeekName().name;
    const era = core.getEra();
    const eraYear = core.getEraYear();
    const solarTerm = core.getSolarTerm();
    const festivals = core.getFestivals();
    const f = {
      // 年
      'Y': String(year),
      'y': String(year).slice(-2),
      'lY': String(lunarYear),
      'lYn': lunarYearName,
      'cY': yearInGanZhi.name,
      'cyn': yearInGanZhi.gan.name,
      'cyz': yearInGanZhi.zhi.name,
      'z': zodiac,
      'e': era.name,
      'ey': String(eraYear),
      // 月
      'M': padZone(month),
      'm': String(month),
      'lM': padZone(lunarMonth),
      'lm': String(lunarMonth),
      'lMn': lunarMonthName,
      'cM': monthInGanZhi.name,
      'cmn': monthInGanZhi.gan.name,
      'cmz': monthInGanZhi.zhi.name,
      // 日
      'D': padZone(day),
      'd': String(day),
      'lD': padZone(lunarDay),
      'ld': String(lunarDay),
      'lDn': lunarDayName,
      'cD': dayInGanZhi.name,
      'cdn': dayInGanZhi.gan.name,
      'cdz': dayInGanZhi.zhi.name,
      // 時間
      'H': padZone(hour),
      'h': String(hour),
      'I': padZone(minute),
      'i': String(minute),
      'S': padZone(second),
      's': String(second),
      'cH': hourInGanZhi.name,
      'chn': hourInGanZhi.gan.name,
      'chz': hourInGanZhi.zhi.name,
      // 其他
      'W': weekName,
      'w': String(week),
      't': solarTerm ? solarTerm.name : '',
      'f': festivals.map(item => item.name).join(','),
      'T': getTimezoneOffset(core.date)
    };
    let result = formatStr;
    for (const key in f) {
      result = result.replace(new RegExp(key, 'g'), f[key]);
    }
    return result;
  }

  /**
   * @typedef {import('./data/types').Era} Era
   * @typedef {import('./data/types').Zodiac} Zodiac
   * @typedef {import('./data/types').LunarMonth} LunarMonth
   * @typedef {import('./data/types').LunarDate} LunarDate
   * @typedef {import('./data/types').SolarTerm} SolarTerm
   * @typedef {import('./data/types').Festivals} Festivals
   * @typedef {import('./data/types').Week} Week
   * @typedef {import('./data/types').HeavenlyStem} HeavenlyStem
   * @typedef {import('./data-type').Gan} Gan
   * @typedef {import('./data-type').Zhi} Zhi
   * @typedef {import('./data-type').PlubicDate} PlubicDate
   * @typedef {import('./data-type').LunisolarDate} LunisolarDate
   * @typedef {import('./data-type').LunisolarMonth} LunisolarMonth
   * @typedef {import('./data-type').LunisolarDay} LunisolarDay
   * @typedef {import('./data-type').LunisolarHour} LunisolarHour
   * @typedef {import('./data-type').LunisolarYear} LunisolarYear
   * @typedef {import('./data-type').LunisolarTerm} LunisolarTerm
   * @typedef {import('./data-type').LunisolarTerms} LunisolarTerms
   * @typedef {import('./data-type').LunisolarCalendarData} LunisolarCalendarData
   * @typedef {import('./data-type').LunisolarFindTarget} LunisolarFindTarget
   * @typedef {import('./data-type').LunisolarFindOptions} LunisolarFindOptions
   * @typedef {import('./data-type').LunisolarSetOptions} LunisolarSetOptions
   */

  const plugins = {};
  class Lunisolar {
    /**
     * @param {PlubicDate} date
     * @param {LunisolarSetOptions} options
     */
    constructor(date, options) {
      this._dataHub = new DataHub(options);
      this._core = new LunisolarCore(date, this._dataHub);
      this._plugins = {};
      for (const key in plugins) {
        this._plugins[key] = new plugins[key](this);
      }
    }
    get core() {
      return this._core;
    }
    get dataHub() {
      return this._dataHub;
    }

    /**
     * 註冊插件
     * @param {string} name
     * @param {any} plugin
     */
    static extend(name, plugin) {
      plugins[name] = plugin;
    }

    /**
     * 取得插件
     * @param {string} name
     * @returns {any}
     */
    plugin(name) {
      return this._plugins[name];
    }
    get(key) {
      return this._core[key];
    }
    year() {
      return this._core.year;
    }
    month() {
      return this._core.month;
    }
    day() {
      return this._core.day;
    }
    hour() {
      return this._core.hour;
    }
    minute() {
      return this._core.minute;
    }
    second() {
      return this._core.second;
    }
    week() {
      return this._core.week;
    }
    lunarYear() {
      return this._core.lunarYear;
    }
    lunarMonth() {
      return this._core.lunarMonth;
    }
    lunarDay() {
      return this._core.lunarDay;
    }
    isLeap() {
      return this._core.isLeap;
    }
    date() {
      return this._core.date;
    }
    getZodiac() {
      return this._core.getZodiac();
    }
    getYearInGanZhi() {
      return this._core.getYearInGanZhi();
    }
    getMonthInGanZhi() {
      return this._core.getMonthInGanZhi();
    }
    getDayInGanZhi() {
      return this._core.getDayInGanZhi();
    }
    getHourInGanZhi() {
      return this._core.getHourInGanZhi();
    }
    getLunarYearName() {
      return this._core.getLunarYearName();
    }
    getLunarMonthName() {
      return this._core.getLunarMonthName();
    }
    getLunarDayName() {
      return this._core.getLunarDayName();
    }
    getWeekName() {
      return this._core.getWeekName();
    }
    getEra() {
      return this._core.getEra();
    }
    getEraYear() {
      return this._core.getEraYear();
    }
    getSolarTerms() {
      return this._core.getSolarTerms();
    }
    getSolarTerm() {
      return this._core.getSolarTerm();
    }
    getFestivals() {
      return this._core.getFestivals();
    }
    format(formatStr) {
      return format(formatStr, this._core);
    }
    set(options) {
      const {
        year,
        month,
        day,
        hour,
        minute,
        second
      } = options;
      const d = this._core.date;
      const newDate = new Date(year || d.getFullYear(), month ? month - 1 : d.getMonth(), day || d.getDate(), hour || d.getHours(), minute || d.getMinutes(), second || d.getSeconds());
      this._core.setDate(newDate);
      return this;
    }
    add(num, unit) {
      const d = this._core.date;
      const newDate = new Date(d);
      if (unit === 'year') {
        newDate.setFullYear(d.getFullYear() + num);
      } else if (unit === 'month') {
        newDate.setMonth(d.getMonth() + num);
      } else if (unit === 'day') {
        newDate.setDate(d.getDate() + num);
      } else if (unit === 'hour') {
        newDate.setHours(d.getHours() + num);
      } else if (unit === 'minute') {
        newDate.setMinutes(d.getMinutes() + num);
      } else if (unit === 'second') {
        newDate.setSeconds(d.getSeconds() + num);
      }
      this._core.setDate(newDate);
      return this;
    }
    subtract(num, unit) {
      return this.add(-num, unit);
    }

    /**
     *
     * @param {LunisolarFindTarget} target
     * @param {LunisolarFindOptions} options
     * @returns {Lunisolar}
     */
    find(target, options) {
      const {
        direction = 'next',
        strict = false
      } = options || {};
      const {
        lunarMonth,
        lunarDay,
        month,
        day,
        solarTerm,
        week,
        festival
      } = target;
      let count = 0;
      let result = null;
      const isForward = direction === 'next';
      let currentDate = new Lunisolar(this.date());
      if (strict) {
        currentDate = isForward ? currentDate.add(1, 'day') : currentDate.subtract(1, 'day');
      }
      while (count < 365 * 3) {
        let isMatch = true;
        if (lunarMonth && currentDate.lunarMonth() !== lunarMonth) {
          isMatch = false;
        }
        if (lunarDay && currentDate.lunarDay() !== lunarDay) {
          isMatch = false;
        }
        if (month && currentDate.month() !== month) {
          isMatch = false;
        }
        if (day && currentDate.day() !== day) {
          isMatch = false;
        }
        if (solarTerm) {
          const currentSolarTerm = currentDate.getSolarTerm();
          if (!currentSolarTerm || slugify(currentSolarTerm.name) !== slugify(solarTerm)) {
            isMatch = false;
          }
        }
        if (types.isNumber(week) && currentDate.week() !== week) {
          isMatch = false;
        }
        if (festival) {
          const currentFestivals = currentDate.getFestivals();
          if (!currentFestivals.some(f => slugify(f.name) === slugify(festival))) {
            isMatch = false;
          }
        }
        if (isMatch) {
          result = currentDate;
          break;
        }
        currentDate = isForward ? currentDate.add(1, 'day') : currentDate.subtract(1, 'day');
        count++;
      }
      return result;
    }
    clone() {
      return new Lunisolar(this.date());
    }
    fromLunar(options) {
      const {
        year,
        month,
        day,
        isLeap = false
      } = options;
      let offset = 0;
      let lyear = 1900;
      let lmonth = 1;
      let lday = 1;
      let days = 0;
      for (let i = 1900; i < year; i++) {
        days += calendar.lYearDays(i);
      }
      lyear = year;
      const leapMonth$1 = calendar.leapMonth(year);
      for (let i = 1; i < month; i++) {
        let monthDays$1 = calendar.monthDays(year, i);
        if (isLeap && i === leapMonth$1) {
          monthDays$1 += calendar.leapDays(year);
        }
        days += monthDays$1;
      }
      lmonth = month;
      if (isLeap) {
        days += calendar.monthDays(year, month);
      }
      days += day - 1;
      lday = day;
      offset = days;
      const date = new Date(Date.UTC(1900, 0, 31) + offset * 86400000);
      this._core.setDate(date);
      return this;
    }
    calendar(year, month) {
      const result = [];
      const date = new Date(year, month - 1, 1);
      const firstDay = date.getDay();
      const monthDays$1 = new Date(year, month, 0).getDate();
      let day = 1;
      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            const prevMonth = new Date(year, month - 1, 0);
            const prevMonthDays = prevMonth.getDate();
            const d = prevMonthDays - firstDay + j + 1;
            const y = prevMonth.getFullYear();
            const m = prevMonth.getMonth() + 1;
            week.push(new Lunisolar({
              year: y,
              month: m,
              day: d
            }));
          } else if (day > monthDays$1) {
            const nextMonth = new Date(year, month, 1);
            const d = day - monthDays$1;
            const y = nextMonth.getFullYear();
            const m = nextMonth.getMonth() + 1;
            week.push(new Lunisolar({
              year: y,
              month: m,
              day: d
            }));
            day++;
          } else {
            week.push(new Lunisolar({
              year,
              month,
              day
            }));
            day++;
          }
        }
        result.push(week);
      }
      return result;
    }
  }
  function index(date, options) {
    if (date === 'fromLunar') {
      return new Lunisolar(new Date()).fromLunar(options);
    }
    return new Lunisolar(date || new Date(), options);
  }
  index.extend = Lunisolar.extend;
  index.slugify = slugify;
  index.padZone = padZone;
  index.getTimezoneOffset = getTimezoneOffset;
  index.isNil = isNil;
  index.isNumber = isNumber;
  index.isInteger = isInteger;
  index.isString = isString;
  index.isBoolean = isBoolean;
  index.isObject = isObject;
  index.isArray = isArray;
  index.isFunction = isFunction;
  index.isDate = isDate;
  index.isRegExp = isRegExp;
  index.isEmpty = isEmpty;
  index.toDate = toDate;
  index.calendar = (year, month) => {
    return new Lunisolar().calendar(year, month);
  };
  index.version = '2.6.0';

  return index;

}));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('lunisolar')) :
  typeof define === 'function' && define.amd ? define(['lunisolar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Lunisolar));
})(this, (function (Lunisolar) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Lunisolar__default = /*#__PURE__*/_interopDefaultLegacy(Lunisolar);

  const dayGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const dayZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  const solarTerms = ["春分", "清明", "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至", "小寒", "大寒", "立春", "雨水", "驚蟄"];
  const pengzu = {
    "gan": ["甲不開倉財物耗散", "乙不栽植千株不長", "丙不修灶必見災殃", "丁不剃頭頭必生瘡", "戊不受田田主不祥", "己不破券二比並亡", "庚不經絡織機虛張", "辛不合醬主人不嘗", "壬不汲水更難提防", "癸不詞訟理弱敵強"],
    "zhi": ["子不問卜自惹禍殃", "丑不冠帶主不還鄉", "寅不祭祀神鬼不嘗", "卯不穿井水泉不香", "辰不哭泣必主重喪", "巳不遠行財物伏藏", "午不苫蓋屋主更張", "未不服藥毒氣入腸", "申不安床鬼祟入房", "酉不會客醉坐顛狂", "戌不吃犬作怪上床", "亥不嫁娶不利新郎"]
  };
  const chongSha = {
    "zhi": ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    "chong": ["馬", "羊", "猴", "雞", "狗", "豬", "鼠", "牛", "虎", "兔", "龍", "蛇"],
    "sha": ["南", "東", "北", "西", "中", "南", "東", "北", "西", "中", "南", "東"]
  };
  const naYin = {
    "甲子": "海中金",
    "乙丑": "海中金",
    "丙寅": "爐中火",
    "丁卯": "爐中火",
    "戊辰": "大林木",
    "己巳": "大林木",
    "庚午": "路旁土",
    "辛未": "路旁土",
    "壬申": "劍鋒金",
    "癸酉": "劍鋒金",
    "甲戌": "山頭火",
    "乙亥": "山頭火",
    "丙子": "澗下水",
    "丁丑": "澗下水",
    "戊寅": "城頭土",
    "己卯": "城頭土",
    "庚辰": "白蠟金",
    "辛巳": "白蠟金",
    "壬午": "楊柳木",
    "癸未": "楊柳木",
    "甲申": "井泉水",
    "乙酉": "井泉水",
    "丙戌": "屋上土",
    "丁亥": "屋上土",
    "戊子": "霹靂火",
    "己丑": "霹靂火",
    "庚寅": "松柏木",
    "辛卯": "松柏木",
    "壬辰": "長流水",
    "癸巳": "長流水",
    "甲午": "砂石金",
    "乙未": "砂石金",
    "丙申": "山下火",
    "丁酉": "山下火",
    "戊戌": "平地木",
    "己亥": "平地木",
    "庚子": "壁上土",
    "辛丑": "壁上土",
    "壬寅": "金箔金",
    "癸卯": "金箔金",
    "甲辰": "覆燈火",
    "乙巳": "覆燈火",
    "丙午": "天河水",
    "丁未": "天河水",
    "戊申": "大驛土",
    "己酉": "大驛土",
    "庚戌": "釵釧金",
    "辛亥": "釵釧金",
    "壬子": "桑柘木",
    "癸丑": "桑柘木",
    "甲寅": "大溪水",
    "乙卯": "大溪水",
    "丙辰": "沙中土",
    "丁巳": "沙中土",
    "戊午": "天上火",
    "己未": "天上火",
    "庚申": "石榴木",
    "辛酉": "石榴木",
    "壬戌": "大海水",
    "癸亥": "大海水"
  };
  const jianchu = {
    "正月": "建",
    "二月": "除",
    "三月": "滿",
    "四月": "平",
    "五月": "定",
    "六月": "執",
    "七月": "破",
    "八月": "危",
    "九月": "成",
    "十月": "收",
    "十一月": "開",
    "十二月": "閉"
  };
  const jianchuValue = ["建", "除", "滿", "平", "定", "執", "破", "危", "成", "收", "開", "閉"];
  const jianchuValueGood = {
    "建": "宜：出行、上任、會友、結婚、裁衣。忌：動土、開倉、掘井、乘船。",
    "除": "宜：沐浴、掃除、求醫、破屋。忌：出行、上任、會友、結婚、入宅。",
    "滿": "宜：嫁娶、祈福、開市、交易、立券、動土、安床。忌：服藥、栽種、掘井、訴訟。",
    "平": "宜：嫁娶、修造、動土、安床、開市、交易、立券、栽種。忌：開渠、放水、造橋、行船。",
    "定": "宜：祭祀、祈福、嫁娶、修造、動土、安床、開市、交易、立券。忌：訴訟、出行、交涉。",
    "執": "宜：嫁娶、開市、交易、立券、動土、安床、捕捉、栽種。忌：出行、移徙、入宅。",
    "破": "宜：求醫、破屋、訴訟。忌：嫁娶、開市、交易、立券、動土、安床。",
    "危": "宜：祭祀、祈福、嫁娶、修造、動土、安床、開市、交易、立券。忌：登高、行船、安葬。",
    "成": "宜：嫁娶、開市、交易、立券、動土、安床、出行、上任、會友。忌：訴訟、爭鬥。",
    "收": "宜：嫁娶、開市、交易、立券、動土、安床、出行、上任、會友。忌：安葬、行喪、破土。",
    "開": "宜：嫁娶、開市、交易、立券、動土、安床、出行、上任、會友。忌：安葬、行喪、破土。",
    "閉": "宜：安葬、行喪、破土。忌：嫁娶、開市、交易、立券、動土、安床。"
  };
  const gods = {
    "宜": {
      "天德": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "月德": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "天德合": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "月德合": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "天赦": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "天願": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "三合": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "六合": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "五富": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "不將": ["嫁娶"],
      "除神": ["沐浴", "掃除", "求醫", "破屋"],
      "續世": ["嫁娶"],
      "明星": ["嫁娶"],
      "天喜": ["嫁娶"],
      "天醫": ["求醫"],
      "要安": ["安床"],
      "玉宇": ["修造", "動土", "安床", "開市", "交易", "立券"],
      "驛馬": ["出行", "上任", "會友"],
      "普護": ["祭祀", "祈福"],
      "解神": ["祭祀", "祈福"],
      "福生": ["祭祀", "祈福"],
      "聖心": ["祭祀", "祈福"],
      "益後": ["嫁娶"],
      "金匱": ["嫁娶", "開市", "交易", "立券", "動土", "安床"],
      "敬安": ["祭祀", "祈福"],
      "鳴吠": ["祭祀", "祈福"],
      "時德": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "民日": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"],
      "陰德": ["祭祀", "祈福", "嫁娶", "修造", "動土", "安床", "開市", "交易", "立券", "出行", "上任", "會友"]
    },
    "忌": {
      "月建": ["動土", "開倉", "掘井", "乘船"],
      "月破": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "大耗": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "劫煞": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "災煞": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "月煞": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "月刑": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "月害": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "月厭": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "大時": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "天吏": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "四廢": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "五虛": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "四耗": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "四窮": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "九坎": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "九焦": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "九離": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "五離": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "天牢": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "地囊": ["嫁娶", "開市", "交易", "立券", "動土", "安床", "出行", "上任", "會友"],
      "孤辰": ["嫁娶"],
      "寡宿": ["嫁娶"],
      "往亡": ["出行", "上任", "會友"],
      "獨火": ["修造", "動土", "安床"],
      "血忌": ["嫁娶"],
      "歸忌": ["出行", "上任", "會友"],
      "復日": ["嫁娶"],
      "重日": ["嫁娶"],
      "天賊": ["開市", "交易", "立券"],
      "兵禁": ["出行", "上任", "會友"],
      "八專": ["嫁娶"],
      "探病": ["探病"]
    }
  };
  const data$1 = {
    dayGan,
    dayZhi,
    lunarMonths,
    solarTerms,
    pengzu,
    chongSha,
    naYin,
    jianchu,
    jianchuValue,
    jianchuValueGood,
    gods
  };

  class TheGods {
    constructor(lunisolar) {
      this.lunisolar = lunisolar;
      this.data = data$1;
    }
    get dayGan() {
      return this.lunisolar.getDayInGanZhi().gan.name;
    }
    get dayZhi() {
      return this.lunisolar.getDayInGanZhi().zhi.name;
    }
    get lunarMonth() {
      return this.lunisolar.getLunarMonthName().name;
    }
    get solarTerm() {
      return this.lunisolar.getSolarTerm() ? this.lunisolar.getSolarTerm().name : null;
    }
    get pengzu() {
      const ganIndex = this.data.dayGan.indexOf(this.dayGan);
      const zhiIndex = this.data.dayZhi.indexOf(this.dayZhi);
      return [this.data.pengzu.gan[ganIndex], this.data.pengzu.zhi[zhiIndex]];
    }
    get chongSha() {
      const zhiIndex = this.data.chongSha.zhi.indexOf(this.dayZhi);
      const chong = this.data.chongSha.chong[zhiIndex];
      const sha = this.data.chongSha.sha[zhiIndex];
      return `沖${chong}煞${sha}`;
    }
    get naYin() {
      const ganZhi = this.lunisolar.getDayInGanZhi().name;
      return this.data.naYin[ganZhi];
    }
    get jianchu() {
      const monthZhi = this.lunisolar.getMonthInGanZhi().zhi.name;
      const dayZhi = this.dayZhi;
      const monthZhiIndex = this.data.dayZhi.indexOf(monthZhi);
      const dayZhiIndex = this.data.dayZhi.indexOf(dayZhi);
      const diff = dayZhiIndex - monthZhiIndex;
      const jianchuIndex = diff >= 0 ? diff : diff + 12;
      const jianchu = this.data.jianchuValue[jianchuIndex];
      const goodBad = this.data.jianchuValueGood[jianchu];
      return {
        name: jianchu,
        goodBad
      };
    }
    get gods() {
      const good = [];
      const bad = [];
      const monthZhi = this.lunisolar.getMonthInGanZhi().zhi.name;
      const dayGan = this.dayGan;
      const dayZhi = this.dayZhi;
      const monthZhiIndex = this.data.dayZhi.indexOf(monthZhi);
      const dayGanIndex = this.data.dayGan.indexOf(dayGan);
      const dayZhiIndex = this.data.dayZhi.indexOf(dayZhi);

      // 天德
      if (["丁", "申", "壬", "巳", "辛", "寅", "甲", "亥", "癸", "申", "丙", "卯"][monthZhiIndex] === dayGan) {
        good.push("天德");
      }
      // 月德
      if (["丙", "甲", "壬", "庚", "丙", "甲", "壬", "庚", "丙", "甲", "壬", "庚"][monthZhiIndex] === dayGan) {
        good.push("月德");
      }
      // 天德合
      if (["壬", "乙", "丁", "庚", "丙", "己", "己", "丙", "戊", "乙", "辛", "庚"][monthZhiIndex] === dayGan) {
        good.push("天德合");
      }
      // 月德合
      if (["辛", "己", "丁", "乙", "辛", "己", "丁", "乙", "辛", "己", "丁", "乙"][monthZhiIndex] === dayGan) {
        good.push("月德合");
      }
      // 天赦
      const solarTerm = this.solarTerm;
      const solarTermIndex = this.data.solarTerms.indexOf(solarTerm);
      if (solarTermIndex !== -1) {
        if (["戊寅", "甲午", "戊申", "甲子"][Math.floor(solarTermIndex / 6)] === `${dayGan}${dayZhi}`) {
          good.push("天赦");
        }
      }
      // 天願
      if (["戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑", "甲寅", "乙卯"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        good.push("天願");
      }
      // 三合
      if (["亥卯未", "寅午戌", "巳酉丑", "申子辰"][monthZhiIndex % 4].includes(dayZhi)) {
        good.push("三合");
      }
      // 六合
      if (["寅", "丑", "子", "亥", "戌", "酉", "申", "未", "午", "巳", "辰", "卯"][dayZhiIndex] === monthZhi) {
        good.push("六合");
      }
      // 五富
      if (["戌", "亥", "丑", "寅", "卯", "辰", "午", "未", "酉"][dayZhiIndex] === monthZhi) {
        good.push("五富");
      }
      // 不將
      if (["酉", "午", "卯", "子", "戌", "未", "辰", "丑", "亥", "申", "巳", "寅"][monthZhiIndex] === dayZhi) {
        good.push("不將");
      }
      // 除神
      if (this.jianchu.name === "除") {
        good.push("除神");
      }
      // 續世
      if (["己巳", "戊辰", "丁卯", "丙寅", "乙丑", "甲子", "癸亥", "壬戌", "辛酉", "庚申", "己未", "戊午"][dayZhiIndex] === `${dayGan}${dayZhi}`) {
        good.push("續世");
      }
      // 明星
      if (["丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑", "甲寅", "乙卯", "丙辰", "丁巳"][dayZhiIndex] === `${dayGan}${dayZhi}`) {
        good.push("明星");
      }
      // 天喜
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][monthZhiIndex] === dayZhi) {
        good.push("天喜");
      }
      // 天醫
      if (["丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"][monthZhiIndex] === dayZhi) {
        good.push("天醫");
      }
      // 要安
      if (["酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申"][dayZhiIndex] === monthZhi) {
        good.push("要安");
      }
      // 玉宇
      if (["酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申"][dayZhiIndex] === monthZhi) {
        good.push("玉宇");
      }
      // 驛馬
      if (["申", "巳", "寅", "亥"][monthZhiIndex % 4] === dayZhi) {
        good.push("驛馬");
      }
      // 普護
      if (["卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅"][dayZhiIndex] === monthZhi) {
        good.push("普護");
      }
      // 解神
      if (["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"][dayZhiIndex] === monthZhi) {
        good.push("解神");
      }
      // 福生
      if (["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][dayZhiIndex] === monthZhi) {
        good.push("福生");
      }
      // 聖心
      if (["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][dayZhiIndex] === monthZhi) {
        good.push("聖心");
      }
      // 益後
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][dayZhiIndex] === `${dayGan}${dayZhi}`) {
        good.push("益後");
      }
      // 金匱
      if (["丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"][dayZhiIndex] === monthZhi) {
        good.push("金匱");
      }
      // 敬安
      if (["巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰"][dayZhiIndex] === monthZhi) {
        good.push("敬安");
      }
      // 鳴吠
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][monthZhiIndex] === dayZhi) {
        bad.push("鳴吠");
      }
      // 時德
      if (["丙", "甲", "壬", "庚", "丙", "甲", "壬", "庚", "丙", "甲", "壬", "庚"][dayZhiIndex] === dayGan) {
        good.push("時德");
      }
      // 民日
      if (["癸酉", "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未", "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑", "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥", "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申"].includes(`${dayGan}${dayZhi}`)) {
        good.push("民日");
      }
      // 陰德
      if (["丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉", "甲戌", "乙亥", "丙子", "丁丑"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        good.push("陰德");
      }

      // 月建
      if (monthZhi === dayZhi) {
        bad.push("月建");
      }
      // 月破
      if (["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"][monthZhiIndex] === dayZhi) {
        bad.push("月破");
      }
      // 大耗
      if (["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"][monthZhiIndex] === dayZhi) {
        bad.push("大耗");
      }
      // 劫煞
      if (["巳", "寅", "亥", "申"][monthZhiIndex % 4] === dayZhi) {
        bad.push("劫煞");
      }
      // 災煞
      if (["午", "卯", "子", "酉"][monthZhiIndex % 4] === dayZhi) {
        bad.push("災煞");
      }
      // 月煞
      if (["未", "辰", "丑", "戌"][monthZhiIndex % 4] === dayZhi) {
        bad.push("月煞");
      }
      // 月刑
      if (["寅", "巳", "申", "亥", "卯", "午", "酉", "子", "辰", "未", "戌", "丑"][monthZhiIndex] === dayZhi) {
        bad.push("月刑");
      }
      // 月害
      if (["酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑", "子", "亥", "戌"][monthZhiIndex] === dayZhi) {
        bad.push("月害");
      }
      // 月厭
      if (["戌", "酉", "申", "未", "午", "巳", "辰", "卯", "寅", "丑", "子", "亥"][monthZhiIndex] === dayZhi) {
        bad.push("月厭");
      }
      // 大時
      if (["酉", "午", "卯", "子", "戌", "未", "辰", "丑", "亥", "申", "巳", "寅"][monthZhiIndex] === dayZhi) {
        bad.push("大時");
      }
      // 天吏
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][monthZhiIndex] === dayZhi) {
        bad.push("天吏");
      }
      // 四廢
      if (["庚申", "辛酉", "壬子", "癸亥", "甲寅", "乙卯", "丙午", "丁巳"][Math.floor(solarTermIndex / 3)] === `${dayGan}${dayZhi}`) {
        bad.push("四廢");
      }
      // 五虛
      if (["甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("五虛");
      }
      // 四耗
      if (["甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("四耗");
      }
      // 四窮
      if (["丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("四窮");
      }
      // 九坎
      if (["壬申", "癸酉", "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("九坎");
      }
      // 九焦
      if (["甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳", "甲午", "乙未"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("九焦");
      }
      // 九離
      if (["丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("九離");
      }
      // 五離
      if (["辛酉", "壬戌", "癸亥", "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申"][monthZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("五離");
      }
      // 天牢
      if (["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"][dayZhiIndex] === monthZhi) {
        bad.push("天牢");
      }
      // 地囊
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][dayZhiIndex] === monthZhi) {
        bad.push("地囊");
      }
      // 孤辰
      if (["寅", "巳", "申", "亥"][monthZhiIndex % 4] === dayZhi) {
        bad.push("孤辰");
      }
      // 寡宿
      if (["戌", "丑", "辰", "未"][monthZhiIndex % 4] === dayZhi) {
        bad.push("寡宿");
      }
      // 往亡
      if (["寅", "巳", "申", "亥"][monthZhiIndex % 4] === dayZhi) {
        bad.push("往亡");
      }
      // 獨火
      if (["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"][dayZhiIndex] === monthZhi) {
        bad.push("獨火");
      }
      // 血忌
      if (["丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"][monthZhiIndex] === dayZhi) {
        bad.push("血忌");
      }
      // 歸忌
      if (["丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"][dayZhiIndex] === dayGan) {
        bad.push("歸忌");
      }
      // 復日
      if (["甲午", "乙未", "庚子", "辛丑", "戊戌", "己亥", "壬辰", "癸巳"][monthZhiIndex % 8] === `${dayGan}${dayZhi}`) {
        bad.push("復日");
      }
      // 重日
      if (["巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰"][dayZhiIndex] === monthZhi) {
        bad.push("重日");
      }
      // 天賊
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][dayZhiIndex] === monthZhi) {
        bad.push("天賊");
      }
      // 兵禁
      if (["戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉"][dayZhiIndex] === monthZhi) {
        bad.push("兵禁");
      }
      // 八專
      if (["甲寅", "乙卯", "己未", "庚申", "辛酉", "癸丑"].includes(`${dayGan}${dayZhi}`)) {
        bad.push("八專");
      }
      // 探病
      if (["壬寅", "癸卯", "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑"][dayZhiIndex] === `${dayGan}${dayZhi}`) {
        bad.push("探病");
      }
      return {
        good: [...new Set(good)],
        bad: [...new Set(bad)]
      };
    }
    get yi() {
      const yi = [];
      const gods = this.gods.good;
      for (const god of gods) {
        if (this.data.gods["宜"][god]) {
          yi.push(...this.data.gods["宜"][god]);
        }
      }
      return [...new Set(yi)];
    }
    get ji() {
      const ji = [];
      const gods = this.gods.bad;
      for (const god of gods) {
        if (this.data.gods["忌"][god]) {
          ji.push(...this.data.gods["忌"][god]);
        }
      }
      return [...new Set(ji)];
    }
    get() {
      return {
        dayGan: this.dayGan,
        dayZhi: this.dayZhi,
        lunarMonth: this.lunarMonth,
        solarTerm: this.solarTerm,
        pengzu: this.pengzu,
        chongSha: this.chongSha,
        naYin: this.naYin,
        jianchu: this.jianchu,
        gods: this.gods,
        yi: this.yi,
        ji: this.ji
      };
    }
  }
  Lunisolar__default["default"].extend("theGods", TheGods);

}));
