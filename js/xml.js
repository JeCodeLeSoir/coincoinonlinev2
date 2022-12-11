
export default class Xml {
    constructor(xmltext) {
        this.xml = (new window.DOMParser()).parseFromString(xmltext, "text/xml")
    }
    get() {
        console.log(this.xml);
        return this.xml;
    }
}

