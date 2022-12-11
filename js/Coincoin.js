import Totoz from './Totoz.js'
import IBoards from './interface/IBoards.js'
class Coincoin {

    constructor() {
        let duck = ""
        duck += "       ,~~.    \n"
        duck += "      (  6 )-_,\n"
        duck += " (\___ )=='-'  \n"
        duck += "  \ .   ) )    \n"
        duck += "   \ `-' /     \n"
        duck += "~~~~'`~'`~~~~~~\n"

        console.log(duck)

        let totoz = new Totoz()
        /* input onChange */
        const totozFindInput = document.getElementById('totoz-find-input')

        totozFindInput.addEventListener('change', async (e) => {
            e.preventDefault();
            console.log(e.target.value);
            const totozes = await totoz.FindTotoz(e.target.value);

            /* for each totoz */

            let totozList = document.querySelector('.totoz-list .list')
            totozList.innerHTML = ""

            for (let i = 0; i < totozes.getElementsByTagName('totoz').length; i++) {
                const totozXml = totozes.getElementsByTagName('totoz')[i];
                const name = totozXml.getElementsByTagName('name')[0].innerHTML
                const url = totoz.config().urlImg + name

                let totozItem = document.createElement('div')
                totozItem.classList.add('totoz-item')
                totozItem.innerHTML = `<img src="${url}" />`
                totozItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log("===> click");
                    let senderMessage = document.getElementById('sender-message')
                    senderMessage.value += `[:${name}]`
                })
                totozList.appendChild(totozItem)
            }
        })

        const formSender = document.getElementById('form-sender')
        formSender.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("===> submit");

            /*
               post
                - ua = username
                - postdata = message
                - posturl = url
            */

            let fetch_post = await fetch('./backend/add.php', {
                method: 'POST',
                body: new URLSearchParams({
                    ua: document.getElementById('sender-username').value,
                    postdata: document.getElementById('sender-message').value,
                    posturl: 'http://localhost/FrontCoinCoin/add.php'
                })
            })

            let fetch_post_response = await fetch_post.text()
            console.log(fetch_post_response);

            document.getElementById('sender-message').value = ""

        })

        let LastId = 0;

        const SetMessages = (data) => {
            let iBoards = new IBoards(data)
            if (iBoards.board)
                iBoards.board.post.forEach(post => SetMessage(post))
        }

        const SetMessage = (post) => {
            let hour = post.time.substring(8);
            let clock = hour.substr(0, 2) + ':' + hour.substr(2, 2) + ':' + hour.substr(4, 2);
            let postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `<span>[${clock}]</span><span class="username">${post.value.info}</span><span>${totoz.LoadTotozInMessage(post.value.message)}</span>`;
            document.querySelector(".posts").appendChild(postElement);

            let id = parseInt(post.id);

            console.log(post.id);
            console.log(id);

            if (id > LastId)
                LastId = id;

            console.log(LastId);
        }

        fetch('./backend/backend.xml')
            .then(response => response.text())
            .then(data => {
                //console.log(data);
                SetMessages(data);
                document.querySelector(".posts").scrollTop = document.querySelector(".posts").scrollHeight;
            })

        setInterval(() => {
            fetch('./backend/last.php?last=' + LastId)
                .then(response => response.text())
                .then(data => {
                    SetMessages(data);
                    document.querySelector(".posts").scrollTop = document.querySelector(".posts").scrollHeight;
                })


        }, 1000)

    }


}

new Coincoin()