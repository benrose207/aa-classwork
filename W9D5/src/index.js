const DOMNodeCollection = require("./dom_node_collection");

window.$l = (arg) => {
    let arr;
    if (arg instanceof HTMLElement) {
        arr = [arg];
    } else {
        const nodeList = document.querySelectorAll(arg);
        arr = Array.from(nodeList);
    }
    return new DOMNodeCollection(arr);
};