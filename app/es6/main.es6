//main.es6

import "babel-polyfill";

import {greet} from './hello';

//global[Symbol.for('foo')] = 123;//重写了hello.es6中的模块
console.log('Symbol:' + greet.hello);
for(let item of greet.colors.keys()){
    console.log("Set 数据结构的keys方法" + item);
}
for(let value of greet.colors.values()){
    console.log('Set数据结构的vlaues方法' + value);
}
for(let entry of greet.colors.entries()){
    console.log('Set 数据结构的entries方法' + entry);
}
/**可以省略values方法，直接遍历Set,结果和使用values方法遍历一样**/
for(let item of greet.colors){
    console.log('省略values方法直接遍历Set：'+ item);
}

/**map数据结构**/
console.log('map数据结构size：' + greet.map.size);

/**数组扩展**/
{
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

// ES5的写法
//    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
    let arr = Array.from(arrayLike); // ['a', 'b', 'c']
    console.log('数组的扩展：' + arr);

    /**扩展运算符的应用**/
    //合并数组
    let arr1 = [1,2,3];
    let arr2 = [3,4,5];
    let arr3 = [6,7,8];
    console.log('合并数组：' + [...arr1,...arr2,...arr3]);

    //与解构赋值结合
    const [first,...rest] = [1,2,3,4,5];
    console.log('解构赋值结合' + first);
    console.log('解构赋值结合' + rest);
}

/**函数的扩展**/
{
    //箭头函数.this对象，就是定义是所在的对象，而不是使用时的对象
    function foo(){
        setTimeout(() => {
            console.log('箭头函数的this对象：' + this.id);
        },1000);
        setTimeout(function () {
            console.log('一般函数的this对象：' + this.id);
        },1000)
    }
    var id = 10;
    foo.call({id:21});

    //箭头函数的this对象深刻理解
    function Timer(){
        this.s1 = 0;
        this.s2 = 0;
        //setInterval(() => {//箭头函数的this对象永远都只想Timer中，其中有s1和s2两个属性
        //    this.s1++;
        //},1000);
        //setInterval(function(){//在一般函数中，this指向函数调用的地方，即window，然而window对象中没有s2这个属性，所以在Timer函数中的s2永远都保持为0
        //    this.s2++;
        //},1000);
    }
    var timer = new Timer();
    setTimeout(() => console.log('箭头函数s1:' + timer.s1),3100);
    setTimeout(() => console.log('一般函数s2:' + timer.s2),3100);

    //思考题：以下有几个this
    function foo2(){
        return () => {
            return () => {
                return () => console.log('箭头函数的this对象思考题: ' + this.id);
            }
        }
    }
    var f = foo2.call({id:1});
    var fs1 = f.call({id:2})()();//因为箭头函数没有自己的this，所以它的this就是外层函数的this，即f方法传递进去的{id:1}。所以fs1.fs2.fs3都返回的是1
    var fs2 = f().call({id:3})();
    var fs3 = f()().call({id:4});

    /**尾递归**/
    //非尾递归的。函数的功能，求n个数的数列
    function fibonacci(n){
        if(n <= 1) return 1;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    fibonacci(10); // 89
    //fibonacci(100); // 堆栈溢出。已经测试过，执行该代码之后，浏览器的该标签页出现卡顿的现象
    //fibonacci(500); // 堆栈溢出

    //尾递归，优化
    function fibonacci2(n,ac1 = 1,ac2 = 1){//使用了函数的默认参数
        if(n <= 1) return ac2;
        return fibonacci2(n - 1,ac2,ac1 + ac2);
    }
    fibonacci2(100); // 573147844013817200000
    fibonacci2(1000); // 7.0330367711422765e+208    都不会出现堆栈移除的现象
    fibonacci2(10000); // Infinity

}