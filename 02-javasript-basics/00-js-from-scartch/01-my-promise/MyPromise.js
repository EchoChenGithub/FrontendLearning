// V1：
// 创建一个 MyPromise 类
// MyPromise 类的构造函数接收一个 executor 函数作为参数
// 构造函数初始化的时候设置三个核心属性 state（状态），value（成功值），reason（失败值）；以及两个回调函数数组，用于支持异步
// 在构造函数内部定义resolve 和 reject 函数，分别用于解决和拒绝 Promise（注意只有在 pending 状态下才能改变状态）
// 在构造函数中还要立即同步执行 executor 函数（这个 executor 是外部传进来的），并把 resolve 和 reject 函数作为参数

// V2：
// MyPromise 类的实例有一个 then 方法，用于注册解决和拒绝的回调函数
// then 方法接收两个参数，分别是 onFulfilled 和 onRejected，onFulfilled 和 onRejected 都是函数，分别用于处理解决和拒绝的情况
// then 方法定义了接口（then(onFulfilled, onRejected)），实现了“发布-订阅”模式以支持异步。当 executor是异步时，在调用 then 的时刻，promise 的状态会是 pending，此时不能立即执行回调，否则会丢失他们。解决方案是创建两个空数组用来暂存回调函数，然后在 下一个事件循环中执行resolve 或者 reject 时再遍历执行。

// V3：
// then 必须返回 promise对象，以支持链式调用
// 由于并不确定 onFulfilled 和 onRejected 函数的执行结果，所以需要对他们的返回值进行分类处理（_resolvePromise函数）：x 可以是，promise，thenable，普通值
// 如果 onFulfilled 或者 onRejected 返回的 x 是promise， 则需要通过 x.then 方法递归解析
// 如果 onFulfilled 或者 onRejected 返回的 x 是thenable， 则需要用  x.then.call(thisArg,successCallback, failedCallback) 方法调用它的 then 方法。注意，由于是第三方引入，所以 x.then可能是一个函数，也可能是普通值等
// 如果 onFulfilled 或者 onRejected 返回的 x 是普通值， 则直接返回 resolve(x)

// then 为 promise 注册 continuation 回调
// then 为 promise 实现链式调用


const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

class MyPromise {
    constructor (executor) {
        this.state = PENDING
        this.value = undefined  // 成功的值
        this.reason = undefined  // 失败的原因
        this.onFulfilledCallbacks = []  // 暂存回调函数。当状态还是 pending 的时候，then 方法不能立即执行后续任务，则需要有一个空间暂时存放 then 方法传入的回调函数，否则会丢失
        this.onRejectedCallbacks = []

        // 保存成功和失败的回调
        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach(callback => callback(this.value))  // 自动把成功值传给 then 方法中的回调函数
            }
        }
        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(callback => callback(this.reason))
            }
        }

        // 执行 executor 函数
        try {
            executor(resolve, reject) // 此处构造函数把 resolve 和 reject 函数作为参数传入了 外部传进来的 executor 函数中
        } catch (error) {
            reject(error)
        }
    }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        }

        const promise2 = new MyPromise((resolve, reject) => {
            // 如果状态是 fulfilled，执行 onFulfilled 函数
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        this._resolvePromise(promise2, x, resolve, reject)
                    }
                    catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            // 如果状态是 rejected， 执行 onRejected 函数
            else if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        this._resolvePromise(promise2,x,resolve, reject)
                    }
                    catch (error) {
                        reject(error)
                    }
                })
            }
            // 如果还没拿到 resolve 的结果，
            else if (this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            this._resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            this._resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (error) {
                            reject(error)
                        }
                    }, 0)
                })
            }
        })
        return promise2;
    }
    _resolvePromise (promise2, x, resolve, reject) {
        // 防止循环引用
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'))
        }

        // 判断onFulfilled/onRejected 的返回值 x 是否是 Promise 实例
        if (x instanceof MyPromise) {
            // 递归解析
            const fulfilled = y => this._resolvePromise(promise2, y, resolve, reject)
            x.then(fulfilled, reject)  // .then 承诺了，当 Promise x 成功时，会把 x 的成果结果（也就是 value），作为参数，传递给 y => ... 这个回调函数。所以，y 是接收过来的那个成功结果的变量
        }
        // x 是thenable
        else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
            let called = false
            try {
                const then = x.then
                if (typeof then === 'function') {
                    then.call(x, y => {  // 此处保证函数在执行的时候 this 一定指向 x
                        if (called) return
                        called = true
                        this._resolvePromise(promise2, y, resolve, reject)
                    }, r => {
                        if (called) return
                        called = true
                        reject(r)
                    })
                } else {  // then 不是一个函数，则是一个普通值
                    resolve(x)
                }
            } catch (error) {
                if (called) return
                called = true
                reject(error)
            }
        }
        // x 是一个普通值
        else {
             resolve(x)
        }
    }
}



