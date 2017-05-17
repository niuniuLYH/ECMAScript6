//hello.es6

//function greet(name) {
//    return new Promise((resolve, reject) => {
//        setTimeout(() => {
//            resolve('hello ' + name);
//        }, 1000);
//    });
//}
const FOO_KEY = Symbol.for('foo');
function Greet(){
    this.hello = 'hello world!';
    this.colors = new Set(['red','green','blue']);
    this.map = new Map([['name','张三'],['title','author']]);
    this.proxyHandle = {
        get : function (target, name) {//拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            if(name === 'prototype'){
                return Object.prototype;
            }
            return 'hello' + name;
        },

        apply : function(target,thisBinding,args){//拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
            return args[0];
        },

        construct : function (target,args) {//拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
            return {value:args[1]};
        }
    };
    this.proxy = new Proxy(function(x,y){
        return x + y;
    },this.proxyHandle);
    this.createArray = function (...elements){//使用get拦截，实现数组读取负数的索引。
        let handler = {
            get(target,propkey,receiver){
                let index = Number(propkey);
                if(index < 0){
                    propkey = String(target.length + index);
                }
                return Reflect.get(target,propkey,receiver);
            }
        };
        let target = [];
        target.push(...elements);
        return new Proxy(target,handler);
    };
    this.validator = {//该方法是判断设置对象的age值是否符合要求，不符合就抛出错误
        set : function(obj,prop,value){//set方法用来拦截某个属性的赋值操作。
            if(prop === 'age'){
                if(!Number.isInteger(value)){//判断设置的age属性的值是否是一个整数
                    throw new TypeError('the age is not an integer');
                }
                if(value > 200){//判断设置的age属性的值是否是一哥小于200的整数
                    throw new RangeError('the age seems invalid');
                }
            }
            obj[prop] = value;//age意外的属性，直接保存
        }
    };
    this.proxySet = new Proxy({},this.validator);

}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new Greet();
}

exports.greet = global[FOO_KEY];
/**这种方法可以保证不会被无意间覆盖，但是也有可能会被修改。如main.es6**/
