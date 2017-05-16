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
    this.proxyAppHandle = {
        apply(target,ctx,arg){//apply方法拦截函数的调用、call和apply操作。
            return Reflect.apply(...arguments) * 2;
        }
    };
    this.sum = function(left,right){
        return left + right;
    };
    this.proxyApply = new Proxy(this.sum,this.proxyAppHandle);
    this.proxyHasHand = {
        has(target,key){//has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
            if(key[0] === '_'){
                return false;
            }
            return key in target;
        }
    };
    this.hasTarget = {_prop:'foo',prop:'foo'};
    this.proxyHas = new Proxy(this.hasTarget,this.proxyHasHand);
}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new Greet();
}

exports.greet = global[FOO_KEY];
/**这种方法可以保证不会被无意间覆盖，但是也有可能会被修改。如main.es6**/
