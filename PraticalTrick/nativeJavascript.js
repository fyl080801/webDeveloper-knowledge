'use strict';

/*****************Native Reduce*********************/
Array.prototype.myReduce = function (callback, initialValue)  {
  let accumulator = initialValue ? initialValue : undefined
  for (let i = 0; i < this.length; i++) {
    if (accumulator) {
        accumulator = callback.call(undefined, accumulator, this[i], i, this);
    } else {
        accumulator = this[i]
    }
  }
  return accumulator
}

// let test it
const arr = [10, 20, 30, 40]
const total = arr.myReduce((prev, cur)=>{
    return prev + cur
}, 10)
console.log(total)

/*****************Native ForEach*********************/
Array.prototype.myForEach = function (callback)  {
    for (let i = 0; i < this.length; i ++) {
        callback(this[i], i, this)
    }
}
// let test it
const arr1 = ['hello', 'world']
arr1.myForEach((cur, index)=> {
    console.log('cur', cur)
})

/*****************Native Map*********************/
Array.prototype.myMap = function (callback)  {
    const emptyArr = []
    for ( let i = 0; i < this.length; i++) {
        emptyArr.push(callback(this[i], i , this))
    }
    return emptyArr
}
// let test it
const arr2 = ['g', 'o', 'l', 'f']
const result = arr2.myMap((cur)=>{
    return cur
})
console.log('result', result)

/*****************Native Filter*********************/
Array.prototype.myFilter = function (callback, context) {
    const returnArr = []
    for ( let i = 0; i < this.length; i++) {
        if(callback.call(context, this[i], i, this)) {
            returnArr.push(this[i])
        }
    }
    return returnArr
}
// let test it
const arr3 = [10, 20, 30, 40, 50]
const newResult = arr3.myFilter((item)=>{
    return item > 30
})
console.log('result', newResult)

/*****************Native Every*********************/
Array.prototype.myEvery = function (callback,context) {
    for (let i = 0; i < this.length; i ++) {
        if(!callback.call(context, this[i], i, this)) {
            return  false
        }
    }
    return  true
}
// let test it
const numberArr = [ -1, 2, -1, -3, 6]
const checkRes = numberArr.myEvery((cur)=> {
    return cur > 0
})
console.log('result', checkRes)

/*****************Native Some*********************/
Array.prototype.myEvery = function (callback,context) {
    for (let i = 0; i < this.length; i ++) {
        if(callback.call(context, this[i], i, this)) {
            return  true
        }
    }
    return  false
}
// let test it
const testArr = ['ab', 'cd', 'ef', 'gh']
const resultRes = testArr.myEvery((cur)=> {
    return cur === 'ab'
})
console.log('result', resultRes)

/*****************Native Call*********************/
// 1. if the target is undefined, assign window to newObj, otherwise assign to newObj
// 2. 'this' point to newObj
// 3. find the rest parameters
// 4. get the result after executing the function
// 5. remove the function
// 6. return the result

Function.prototype.myCall = function (context, parameter) {
    if ( typeof this !== 'function') {
        throw new Error(`${this}.myCall is not a function`)
    }
    const newObj = context ? context : window
    let fnSymbol = Symbol()
    newObj[fnSymbol] = this
    const result = newObj[fnSymbol](...parameter)
    delete newObj[fnSymbol]
    return result

}
// let test it
function testFunc () {
    console.log(this.name)
}
const obj = {
    name: 'Tab'
}
testFunc.myCall(obj)

/*****************Native Apply*********************/
Function.prototype.myApply = function (context, parameter) {
    if (typeof this !== 'function') {
        throw  new Error(`${this}.myApply is not  a function`)
    }
    let newObj
    if (typeof context === 'object') {
        newObj = context || window
    } else {
        newObj = Object.create(null)
    }
    let fnSymbol = Symbol()
    newObj[fnSymbol] = this
    newObj[fnSymbol](...parameter)
    delete  newObj[fnSymbol]
}
// let test it
let array = ['a', 'b']
let elements = [0, 1, 2]
array.push.myApply(array, elements)
console.info(array)

/*****************Native Bind*********************/
Function.prototype.myBind = function (context, parameter) {
    const me = this
    return function (...finallyParas) {
        return me.call(context, ...parameter, ...finallyParas)
    }
}
// let test it
let person = {
    name: 'Abel'
}
function sayHi(age,sex) {
    console.log(this.name, age, sex);
}
let personSayHi = sayHi.bind(person, 25)
personSayHi('男')
