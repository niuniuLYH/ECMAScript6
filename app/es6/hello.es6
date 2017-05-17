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
    this.map = new Map([['name','����'],['title','author']]);
    this.proxyHandle = {
        get : function (target, name) {//���ض������ԵĶ�ȡ������proxy.foo��proxy['foo']��
            if(name === 'prototype'){
                return Object.prototype;
            }
            return 'hello' + name;
        },

        apply : function(target,thisBinding,args){//���� Proxy ʵ����Ϊ�������õĲ���������proxy(...args)��proxy.call(object, ...args)��proxy.apply(...)��
            return args[0];
        },

        construct : function (target,args) {//���� Proxy ʵ����Ϊ���캯�����õĲ���������new proxy(...args)��
            return {value:args[1]};
        }
    };
    this.proxy = new Proxy(function(x,y){
        return x + y;
    },this.proxyHandle);
    this.createArray = function (...elements){//ʹ��get���أ�ʵ�������ȡ������������
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
    this.validator = {//�÷������ж����ö����ageֵ�Ƿ����Ҫ�󣬲����Ͼ��׳�����
        set : function(obj,prop,value){//set������������ĳ�����Եĸ�ֵ������
            if(prop === 'age'){
                if(!Number.isInteger(value)){//�ж����õ�age���Ե�ֵ�Ƿ���һ������
                    throw new TypeError('the age is not an integer');
                }
                if(value > 200){//�ж����õ�age���Ե�ֵ�Ƿ���һ��С��200������
                    throw new RangeError('the age seems invalid');
                }
            }
            obj[prop] = value;//age��������ԣ�ֱ�ӱ���
        }
    };
    this.proxySet = new Proxy({},this.validator);

}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new Greet();
}

exports.greet = global[FOO_KEY];
/**���ַ������Ա�֤���ᱻ����串�ǣ�����Ҳ�п��ܻᱻ�޸ġ���main.es6**/
