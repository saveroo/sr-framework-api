// // import js from 'jsonfile'
// // import _ from 'lodash'
// // const _ = () => import('lodash');
// const js = require('jsonfile')
// import _ from 'lodash'
// const path = require('path')

// let data = js.readFileSync(path.resolve(__dirname, '../statics/SRFeature.json'))


// let key = Object.keys(data);

// const recur = (v: any, k: any) => {
//     let recurArr = [];

//     if(typeof(v) === typeof("")) {

//     }
//     else
//     if(typeof(v) === typeof([])) {

//     }
//     else
//     if(typeof(v) === typeof({})) {

//     }
// }

// const tp = (type: any, comparator: any) => {
//     if(typeof(tp) === typeof(comparator))
//     return true
//     return false
// }
// let arr: any = [];
// let str = "";

// // let l1 = Object.keys(data)
// // let l2 = Object.keys(l1)


// // console.log(l1)
// // console.log(l2)

// function process(key: any,value: any) {
//     arr.push(key);
// }
// let count = 0;
// let l = '';
// function traverse(o:any,func: any) {
//     for (var i in o) {
//         func.apply(this,[i,o[i]]);  
//         if (o[i] !== null && typeof(o[i])=="object") {
//             //going one step down in the object tree!!
//             // if(isNaN(o[i])) {

//             // }
//             traverse(o[i],func);
//         }
//     }
// }

// let arrr = []
// let s = '';
// _.each(data, (v, k) => {
//     if(typeof(v) !== typeof([]))
//     {
//         arrr.push(`${k}: "${v}",\n`)

//     }else if(typeof(v) !== typeof({}))
//     arrr.push(`let ${k} = "",\n`)    
//     else if(typeof(v) == typeof(""))
//     arrr.push(`let ${k} = "",\n`)    
//     else {
//         arrr.push(`${k}: [],\n`)    

//     }
// })
// console.log(...arrr);

// // let t = traverse(data, process)
// // console.log(count);
// // let unik =  _.uniq(arr);

// // let filt = _.filter(unik, (e) => {
// //     return !_.isNaN(e);
// // })

// // _.each(filt, (v, k) => {
// //     str += v + '';
// // })
// // console.log(str)

// // _.each(data, (v: any, k: any) => {
// //     if(typeof(v) === typeof("")) {
// //         arr.push(`${k}`);
// //         str += `${k}\n`;
        
// //     }
// //     else
// //     if(typeof(v) === typeof([])) {
// //         arr.push(`${k} [${data[k].length}]`);
// //         str += `${k} [${data[k].length}]\n`;

// //         if(typeof(v) === typeof([])) {
// //             for (let index = 0; index < v.length; index++) {

// //                 if(typeof(v[index]) === typeof({})) {
// //                     _.mapKeys
// //                     str += `--${Object.keys(v[index])}\n`;

// //                     // arr.push(Object.keys(v[index]))
// //                     break;
// //                 }
// //                 if(typeof(v[index]) === typeof([])) {
// //                     str += `--${v[index]} [${v[index].length}]\n`;
// //                     // arr.push("test")
// //                     break;
// //                 }
// //             }
// //         }
        
// //         // _.each(v, (vv, kk) => {
// //         //     // if(tp(vv, ""))
// //         //     if(typeof(vv) === typeof("")){
// //         //         // arr.push('--' + Object.keys(v[kk]))
// //         //     }


// //         //     if(typeof(vv) === typeof({})) {
// //         //         arr.push('--' + Object.keys(v[kk]))
// //         //     }
// //         // })
// //     }
// //     else
// //     if(typeof(v) === typeof(Object)) {
// //         arr.push(`--${k}`);

// //         for (let index = 0; index < v.length; index++) {

// //             if(typeof(v[index]) === typeof({})) {
// //                 str += `--${v[index]} [${data[k].length}]\n`;
// //                 arr.push(Object.keys(v[index]))
// //                 break;
// //             }
// //             if(typeof(v[index]) === typeof([])) {
// //                 str += `--${v[index]} [${data[k].length}]\n`;
// //                 arr.push("test")
// //                 break;
// //             }
// //         }
// //         // _.each(v, (vo, ko) => {
// //         //     arr.push(`---${v}`);
// //         // })
// //     }

// // })

// // for (let i = 0; i < data.length; i++) {
// //     let element = data[i];
// //     console.log(element);
// // }

// // console.log(arr)
// // console.log(str)

