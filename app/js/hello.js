'use strict';

//hello.es6

//function greet(name) {
//    return new Promise((resolve, reject) => {
//        setTimeout(() => {
//            resolve('hello ' + name);
//        }, 1000);
//    });
//}
var FOO_KEY = Symbol.for('foo');
function Greet() {
    this.hello = 'hello world!';
    this.colors = new Set(['red', 'green', 'blue']);
    this.map = new Map([['name', '����'], ['title', 'author']]);
}
if (!global[FOO_KEY]) {
    global[FOO_KEY] = new Greet();
}

exports.greet = global[FOO_KEY];
/**���ַ������Ա�֤���ᱻ�����串�ǣ�����Ҳ�п��ܻᱻ�޸ġ���main.es6**/