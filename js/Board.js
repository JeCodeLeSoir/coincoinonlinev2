/************************************************************
 * OnlineCoinCoin, by Chrisix (chrisix@gmail.com)
 * Updated by JeCodeLeSoir (twitch.tv/jecodelesoir)
 * Définition de la classe Board, gérant une tribune
 ************************************************************/

class Tribune {
    constructor(config) {
        this.isPrivate = config.isPrivate;
        this.name = config.name;
        this.urlGet = config.urlGet;
        this.urlPost = config.urlPost;
        this.color = config.color;
    }

    GetMessage() {

    }

    PostMessage(Username, Message) {

    }

    Start() {

    }
}

class Board {

    constructor(configs) {
        configs.forEach(config => {
            this[config.name] = new Tribune(config);
        });
    }

    Start() {
        this.update();
    }

    update() {

    }

}

new Board([{
    isPrivate: false,
    name: 'moules',
    urlGet: 'http://localhost:8080/board/get.php',
    urlPost: 'http://localhost:8080/board/add.php',
    color: '#ffe3c9',
    cookie: 'moules'
}]);