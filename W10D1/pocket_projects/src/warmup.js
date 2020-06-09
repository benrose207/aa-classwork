
const partyHeader = document.getElementById('party');

export const htmlGenerator = (string, htmlElement) => {
    const children = Array.from(htmlElement.children);
    if (children) {
        children.forEach(node => node.remove());
    }

    const p = document.createElement("p");
    const pText = document.createTextNode(string);
    p.appendChild(pText);
    htmlElement.appendChild(p);
};

htmlGenerator('Welcome To the Pocket Project Marathon!', partyHeader);