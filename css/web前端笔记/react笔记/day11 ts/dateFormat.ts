
// YYYY-MM-DD    2022-02-17
// YYYY/M/D      2022/2/17
// YYYY年MM月DD日 hh:mm:ss 2022年02月17日 09:49:12
function dateFormat(dateType: string, date: Date): string {


    let obj = {
        'M+': date.getMonth() + 1 + '',
        'D+': date.getDate() + '',
        'h+': date.getHours() + '',
        'm+': date.getMinutes() + '',
        's+': date.getSeconds() + ''
    }

    // RegExp.$1代表获取正则表达式匹配到的第一组值
    // if (/(Y+)/.test(dateType)) {
    //     // console.log(RegExp.$1);
    //     // console.log(RegExp.$2);
        
    //     // 2022 22
    //     dateType = dateType.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    // }

    for(let v in obj){
        console.log(obj[v]);
        
        // console.log(v);
        if(new RegExp(`(${v})`).test(dateType)){
            dateType=dateType.replace(RegExp.$1,RegExp.$1.length===1?obj[v]:('00' + obj[v]).substr(obj[v].length));

        }    
    }

    // /M+/
    for (let k in obj) {
        // /k/这样的正则表达式是不能写变量的
        if (new RegExp(`(${k})`).test(dateType)) {
            // console.log(RegExp.$1);
            // 002 0011
            dateType = dateType.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[k] : ('00' + obj[k]).substr(obj[k].length));
            // console.log(dateType);
        }
    }


    return dateType;
}

// dateFormat('YYYY-MM-DD', new Date());
// dateFormat('YYYY-M-DD', new Date());
const result = dateFormat('YYYY-M-DD hh:mm:s', new Date());
console.log(result);

const result2 = dateFormat('YYYY年M月DD日 hh:mm:s', new Date());
console.log(result2);

const result3 = dateFormat('YYYY/M/DD hh时mm分s秒', new Date());
console.log(result3);

// dateFormat('YY-MM-DD', new Date());
// dateFormat('YYY-MM-DD', new Date());


class DateFormat {
    dateType: string;
    date: Date;
    constructor(dateType: string, date: Date) {
        this.dateType = dateType;
        this.date = date;
    }

    format() {

        let obj = {
            'M+': this.date.getMonth() + 1 + '',
            'D+': this.date.getDate() + '',
            'h+': this.date.getHours() + '',
            'm+': this.date.getMinutes() + '',
            's+': this.date.getSeconds() + ''
        }
    
        // RegExp.$1代表获取正则表达式匹配到的第一组值
        if (/(Y+)/.test(this.dateType)) {
            // console.log(RegExp.$1);
            // console.log(RegExp.$2);
            
            // 2022 22
            this.dateType = this.dateType.replace(RegExp.$1, (this.date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
    
        // /M+/
        for (let k in obj) {
            // /k/这样的正则表达式是不能写变量的
            if (new RegExp(`(${k})`).test(this.dateType)) {
                // console.log(RegExp.$1);
                // 002 0011
                this.dateType = this.dateType.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[k] : ('00' + obj[k]).substr(obj[k].length));
                // console.log(dateType);
            }
        }
    
    
        return this.dateType;
    }
}

const dateFormatCl = new DateFormat('YYYY/M/DD hh时mm分s秒', new Date());
const result4 = dateFormatCl.format();
console.log('result4:', result4);


export default {};