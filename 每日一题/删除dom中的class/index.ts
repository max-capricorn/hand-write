//数据结构大致如此，如果有误不必纠结，可以尝试用TS来写代码
const baseRoot = {
    tagName: 'div',
    children: [
        "this is a span",
        {
            tagName: 'span',
            children: [
                "hello world!",
                {
                    tagName: 'input',
                    children: [
                        "this is a input",
                    ],
                    attribute: [
                        {
                            key: "class",
                            value: "Input",
                        },
                        {
                            key: "value",
                            value: "something",
                        }
                    ]
                }
            ],
            attribute: [
                {
                    key: "style",
                    value: "xxx",
                }
            ]
        }
    ],
    attribute: [
        {
            key: "class",
            value: "button",
        },
        {
            key: "data-text",
            value: "demo",
        }
    ]
};
const resultRoot = {
    tagName: 'div',
    children: [
        "this is a span",
        {
            tagName: 'span',
            children: [
                "hello world!",
                {
                    tagName: 'input',
                    children: [
                        "this is a input",
                    ],
                    attribute: [
                        {
                            key: "value",
                            value: "something",
                        }
                    ]
                }
            ],
            attribute: [
                {
                    key: "style",
                    value: "xxx",
                }
            ]
        }
    ],
    attribute: [
        {
            key: "data-text",
            value: "demo",
        }
    ]
};
type properties = { key: string, value: string }

type Item = { tagName: string, children: (Item | string)[], attribute: properties[] }

type Root = Item


function removeClass (root: Root): Root {
    //TO DO
    if (!root) return
    const stack = [root]
    while (stack.length) {
        const currentNode = stack.shift()
        if (currentNode.children) stack.push(...currentNode.children as Item[])
        if (currentNode.attribute) currentNode.attribute = currentNode.attribute.filter(k => k.key !== 'class')
    }
    return root;
}


console.log(removeClass(baseRoot))