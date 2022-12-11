/* 
    Totoz -> https://totoz.eu/
    cmd : [:totoz]
    url : https://totoz.eu/img/totoz
    by JeCodeLeSoir (twitch.tv/jecodelesoir)
*/

export default class Totoz {

    constructor() {
        this.urlFind = 'https://totoz.eu/search.xml?terms='
        this.urlImg = 'https://totoz.eu/img/'
        this.regex = /\[\:([^\]]+)\]/g
    }

    config() {
        return {
            urlImg: this.urlImg,
            regex: this.regex
        }
    }

    SetConfig(config) {
        this.urlImg = config.urlImg
        this.regex = config.regex
    }

    LoadTotozInMessage(message) {
        this.regex.lastIndex = 0
        message = message.replace(this.regex, (match, p1) => {
            return `<img src="${this.urlImg}${p1}" alt="${p1}" title="${p1}">`
        })
        return message;
    }

    async FindTotoz(name) {
        let url = `${this.urlFind}${name}`
        let totozget = await fetch(url)
        totozget = await totozget.text()
        let data = (new window.DOMParser()).parseFromString(totozget, "text/xml")
        return data;
    }
}