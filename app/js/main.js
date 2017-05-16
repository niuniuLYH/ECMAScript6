'use strict';

require('babel-polyfill');

var _hello = require('./hello');

//global[Symbol.for('foo')] = 123;//重写了hello.es6中的模块
//main.es6

console.log('Symbol:' + _hello.greet.hello);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = _hello.greet.colors.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        console.log("Set 数据结构的keys方法" + item);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (var _iterator2 = _hello.greet.colors.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var value = _step2.value;

        console.log('Set数据结构的vlaues方法' + value);
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
    for (var _iterator3 = _hello.greet.colors.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var entry = _step3.value;

        console.log('Set 数据结构的entries方法' + entry);
    }
    /**可以省略values方法，直接遍历Set,结果和使用values方法遍历一样**/
} catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
        }
    } finally {
        if (_didIteratorError3) {
            throw _iteratorError3;
        }
    }
}

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
    for (var _iterator4 = _hello.greet.colors[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _item = _step4.value;

        console.log('省略values方法直接遍历Set：' + _item);
    }

    /**map数据结构**/
} catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
        }
    } finally {
        if (_didIteratorError4) {
            throw _iteratorError4;
        }
    }
}

console.log('map数据结构size：' + _hello.greet.map.size);

/**数组扩展**/
{
    var arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    //    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

    // ES6的写法
    var arr = Array.from(arrayLike); // ['a', 'b', 'c']
    console.log('数组的扩展：' + arr);

    /**扩展运算符的应用**/
    //合并数组
    var arr1 = [1, 2, 3];
    var arr2 = [3, 4, 5];
    var arr3 = [6, 7, 8];
    console.log('合并数组：' + [].concat(arr1, arr2, arr3));

    //与解构赋值结合
    var first = 1,
        rest = [2, 3, 4, 5];

    console.log('解构赋值结合' + first);
    console.log('解构赋值结合' + rest);
}

/**函数的扩展**/
{
    //箭头函数.this对象，就是定义是所在的对象，而不是使用时的对象
    var foo = function foo() {
        var _this = this;

        setTimeout(function () {
            console.log('箭头函数的this对象：' + _this.id);
        }, 1000);
        setTimeout(function () {
            console.log('一般函数的this对象：' + this.id);
        }, 1000);
    };

    //箭头函数的this对象深刻理解
    var Timer = function Timer() {
        this.s1 = 0;
        this.s2 = 0;
        //setInterval(() => {//箭头函数的this对象永远都只想Timer中，其中有s1和s2两个属性
        //    this.s1++;
        //},1000);
        //setInterval(function(){//在一般函数中，this指向函数调用的地方，即window，然而window对象中没有s2这个属性，所以在Timer函数中的s2永远都保持为0
        //    this.s2++;
        //},1000);
    };

    //思考题：以下有几个this
    var foo2 = function foo2() {
        var _this2 = this;

        return function () {
            return function () {
                return function () {
                    return console.log('箭头函数的this对象思考题: ' + _this2.id);
                };
            };
        };
    };

    /**尾递归**/
    //非尾递归的。函数的功能，求n个数的数列
    var fibonacci = function fibonacci(n) {
        if (n <= 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    };

    // 89
    //fibonacci(100); // 堆栈溢出。已经测试过，执行该代码之后，浏览器的该标签页出现卡顿的现象
    //fibonacci(500); // 堆栈溢出

    //尾递归，优化
    var fibonacci2 = function fibonacci2(n) {
        var ac1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var ac2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        //使用了函数的默认参数
        if (n <= 1) return ac2;
        return fibonacci2(n - 1, ac2, ac1 + ac2);
    };

    var id = 10;
    foo.call({ id: 21 });
    var timer = new Timer();
    setTimeout(function () {
        return console.log('箭头函数s1:' + timer.s1);
    }, 3100);
    setTimeout(function () {
        return console.log('一般函数s2:' + timer.s2);
    }, 3100);
    var f = foo2.call({ id: 1 });
    var fs1 = f.call({ id: 2 })()(); //因为箭头函数没有自己的this，所以它的this就是外层函数的this，即f方法传递进去的{id:1}。所以fs1.fs2.fs3都返回的是1
    var fs2 = f().call({ id: 3 })();
    var fs3 = f()().call({ id: 4 });
    fibonacci(10);
    fibonacci2(100); // 573147844013817200000
    fibonacci2(1000); // 7.0330367711422765e+208    都不会出现堆栈移除的现象
    fibonacci2(10000); // Infinity
}