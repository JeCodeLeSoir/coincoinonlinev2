import Xml from '../xml.js'

export default class IBoards {

    constructor(data) {

        //data not contain text "error"



        if (data.toLowerCase().includes("error") || data.toLowerCase().includes("404 Not Found".toLowerCase())) {
            console.error("Error: " + data)
            return;
        }


        let xml = new Xml(data)
        /* board = [
             {
                 site: "moules",
                 value: {
                     post: {
                         time: 0,
                         id: 0,
                         value: {
                             info: "info",
                             login: "login",
                             message: "message",
                         }
                     }
                 }
             }
         ]*/

        this.board = xml.get().getElementsByTagName('board')

        //console.log(this.board);
        //console.log(this.board[0].getAttribute('site'));

        this.board = {
            site: this.board[0].getAttribute('site'),
            post: Array.from(this.board[0].getElementsByTagName('post')).map(post => {
                return {
                    time: post.getAttribute('time'),
                    id: post.getAttribute('id'),
                    value: {
                        info: post.getElementsByTagName('info')[0].innerHTML,
                        login: post.getElementsByTagName('login')[0].innerHTML,
                        message: post.getElementsByTagName('message')[0].innerHTML,
                    }
                }
            })

        }
    }

}