const mail_li = {
    'email': 'log@kingdomctv.mail',
    'passcode': '@divineLog22'
}

function moveOn() {
    const mail = document.querySelector('#email').value;
    const passcode = document.querySelector('#passcode').value;
    const link = document.getElementById('link');
    const btn = document.getElementById('btn')

    if (mail === mail_li.email && passcode === mail_li.passcode) {
        const link = document.getElementById('link');
        link.href = 'main.html'
    } else {
        link.innerText = 'Error!!'
        btn.style = "background-color: red"

        setTimeout(() => {
            link.innerText = 'Login Now'
            btn.style = "background-color: #4070f4"
        }, 1500);
    }
}
