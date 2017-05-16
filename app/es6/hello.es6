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
}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new Greet();
}

exports.greet = global[FOO_KEY];
/**这种方法可以保证不会被无意间覆盖，但是也有可能会被修改。如main.es6**/
