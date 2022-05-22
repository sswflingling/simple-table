// 封装console
function createLog(): Console {
    // 创建一个对象 存储console里面的值，并且全都是非必填
    let logs:Partial<Console> = {};
    // 循环遍历console对象
    for (const k in console) {
        const key = k as keyof Console
        // 判断console中是否存在key
        if (Object.prototype.hasOwnProperty.call(console, key)) {
            
            const method:(...abc:any) => void = console[key ];

            // import.meta.env.DEV: 判断是否为开发环境
            logs[key] = (...abc) => import.meta.env.DEV && method(...abc);
        }
    }
    return logs as Console;
}

export const log = createLog()