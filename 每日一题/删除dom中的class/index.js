//数据结构大致如此，如果有误不必纠结，可以尝试用TS来写代码
var baseRoot = {
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
                            value: "Input"
                        },
                        {
                            key: "value",
                            value: "something"
                        }
                    ]
                }
            ],
            attribute: [
                {
                    key: "style",
                    value: "xxx"
                }
            ]
        }
    ],
    attribute: [
        {
            key: "class",
            value: "button"
        },
        {
            key: "data-text",
            value: "demo"
        }
    ]
};
var resultRoot = {
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
                            value: "something"
                        }
                    ]
                }
            ],
            attribute: [
                {
                    key: "style",
                    value: "xxx"
                }
            ]
        }
    ],
    attribute: [
        {
            key: "data-text",
            value: "demo"
        }
    ]
};
function removeClass(root) {
    //TO DO
    if (!root)
        return;
    var stack = [root];
    while (stack.length) {
        var currentNode = stack.shift();
        if (currentNode.children)
            stack.push.apply(stack, currentNode.children);
        if (currentNode.attribute)
            currentNode.attribute = currentNode.attribute.filter(function (k) { return k.key !== 'class'; });
    }
    return root;
}
console.log(removeClass(baseRoot));
