const button = document.querySelector('#button');
getSurvey = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/survey', true);
    xhr.onload = function () {
        if (this.status === 200) {
        }
    }
    xhr.send();
}

button.addEventListener('click', getSurvey)   