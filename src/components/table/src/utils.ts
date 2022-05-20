let styleIndex = 0

// 获取类当前下标
function getCssRuleIndex(className: string): number {
    const cssRules = document.styleSheets[0].cssRules
    for (const key in cssRules) {
        if ((cssRules.item(key as unknown as number) as any)?.selectorText == '.' + className) {
            return key as unknown as number
        }
    }
    return -1
}

// 动态插入css样式
export function insertRule(className: string, style: string) {
    if (getCssRuleIndex(className) !== -1) return;
    styleIndex += 1
    document.styleSheets[0].insertRule('.' + className + ' ' + style, styleIndex)
}
// 动态更改css样式
export function updateRule(className: string, obj: { [x: string]: string }) {
    const index = getCssRuleIndex(className)
    if (index === -1) return;
    const domStyle = (document.styleSheets[0].cssRules[index] as any).style
    for (const key in obj) {
        domStyle[key] = obj[key]
    }
}
