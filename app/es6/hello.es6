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
    this.proxyAppHandle = {
        apply(target,ctx,arg){//apply�������غ����ĵ��á�call��apply������
            return Reflect.apply(...arguments) * 2;
        }
    };
    this.sum = function(left,right){
        return left + right;
    };
    this.proxyApply = new Proxy(this.sum,this.proxyAppHandle);
    this.proxyHasHand = {
        has(target,key){//has������������HasProperty���������ж϶����Ƿ����ĳ������ʱ�������������Ч�����͵Ĳ�������in�������
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
/**���ַ������Ա�֤���ᱻ����串�ǣ�����Ҳ�п��ܻᱻ�޸ġ���main.es6**/
