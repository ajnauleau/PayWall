window.onload = function() {

    let links = document.querySelectorAll("div[class=r] > a")

    links.forEach((link) => {
        let url = link.getAttribute("href")

        // async function getHtml(url = '') {
        //     const response = await fetch(url, {
        //         method: 'GET',
        //         mode: 'cors',
        //         cache: 'no-cache',
        //         credentials: 'same-origin',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         redirect: 'follow',
        //         referrerPolicy: 'no-referrer'
        //     });
        //     return response
        // }

        function validURL(str) {
            let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
        }

        // if (validURL(url)) {
        //     getHtml(url).then(data => {
        //         console.log(data)
        //         console.log('works')
        //     })
        // }


        async function callHtml(url = '') {
            const options = {
                method: 'GET',
                mode: 'no-cors'
            };
           return fetch(url, options)
                .then(function(response) {
                    // When the page is loaded convert it to text
                    return response.text()
                })
                .then(function(html) {
                    // Initialize the DOM parser
                    var parser = new DOMParser();

                    // Parse the text
                    var doc = parser.parseFromString(html, "text/html");

                    // You can now even select part of that html as you would in the regular DOM
                    // Example:
                    // var docArticle = doc.querySelector('article').innerHTML;

                    console.log(`Doc ${doc}`)

                    if(doc.body) {
                        link.style.color = 'green'
                    }


                })
                .catch(function(err) {
                    console.log('Failed to fetch page: ', err);
                });
        }

        if (validURL(url)) {
            callHtml(url).then(html => {
                console.log(`Logging: ${html}`)
            })
            console.log(url)
        }

    })


}
