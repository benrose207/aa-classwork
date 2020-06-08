class DOMNodeCollection {
    constructor (elementsArray) {
        this.elements = elementsArray;
    }

    html (str) {
        if (str === undefined) {
            return this.elements[0].innerHTML;
        } else {
            this.elements.forEach(el => {
                el.innerHTML = str;
            });
        }
    }

    empty () {
        this.elements.forEach(el => {
            el.innerHTML = "";
        })
    }

    append (args) {
        args.forEach (arg => {
            this.elements.forEach(el => {
                el.innerHTML += arg.outerHTML;
            });
        })
    }
}

module.exports = DOMNodeCollection;