const nameLabel = document.getElementById('labelName');
const photoLabel = document.getElementById('labelPhoto');
const subButton = document.querySelector('#button');
subButton.addEventListener('click', (event) => {
    event.preventDefault();

    const scores = [];
    const userName = document.getElementById('userName').value.trim();
    const userImage = document.querySelector('#image').value.trim();
    const questionList = document.querySelectorAll('select');

    questionList.forEach((curVal) => {scores.push(parseInt(curVal.value))});
    const totalScore = scores.reduce((acc, curVal) => {
        return acc += curVal
    }, 0);

    if (userName && userImage) {
        const userObj = {
            name: userName,
            image: userImage,
            developerScore: totalScore
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/developers', true);
        xhr.onload = function () {
            if (this.status === 200) {
                let apiResponse = JSON.parse(this.responseText);
                const developerMatch = responseData(apiResponse, totalScore);
                createModal(developerMatch);
            }
        }
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(JSON.stringify(userObj));
    } else {
        nameLabel.textContent = '* Name (Required)';
        nameLabel.style.color = 'red';
        photoLabel.textContent = '* Link to Photo Image (Required)';
        photoLabel.style.color = 'red';
        alert('Please complete both the name and image forms before submitting.');
    } 

});

responseData = (results, score) => {
    console.log(results);
    for(let i = 0; i < results.length; i++) {
        var scoreDiff = score - results[i].developerScore;
        console.log('scoreDiff', scoreDiff);
        if (scoreDiff <= 10 && scoreDiff >= -10) {
            const developer = results[i];
            return developer;
        } 
    }
    return "No developers are similar to your preferences.";
}

const closeButton = document.querySelector("#close");
closeButton.addEventListener('click', removeDynamicElements);

function removeDynamicElements() {
    modal.style.display = 'none';
    const modalContent = document.querySelector('#modal-content');
    const childNodes = modalContent.children;
    // Removes all childeren nodes except for our close button
    while (modalContent.children.length > 1) {
        modalContent.removeChild(modalContent.firstChild);
    }
}

createModal = (results) => {
    nameLabel.style.color = 'black';
    photoLabel.style.color = 'black';
    document.getElementById('userName').value = "";
    document.querySelector('#image').value = "";

    const infoText = document.createElement("p");
    const modal = document.querySelector("#modal");
    const modalContent = document.querySelector("#modal-content");
    const imgTag = document.createElement("img");
    const nameEle = document.createElement("h3");
    const nameText = document.createTextNode(results.name);
    const quoteEle = document.createElement('p');
    

    modal.style.display = "block";
    infoText.appendChild(document.createTextNode("You're Closest Match"));
    modalContent.insertBefore(infoText,closeButton);
    modalContent.insertBefore(nameEle, closeButton);
    modalContent.insertBefore(imgTag, closeButton);
    nameEle.appendChild(nameText);
    imgTag.setAttribute('src', results.image);
    imgTag.setAttribute('alt', 'codeImg.jpg');
    if (results.quote !== undefined) {
        const quoteText = document.createTextNode(results.quote);
        quoteEle.appendChild(quoteText);
        modalContent.insertBefore(quoteEle, closeButton)
    }



    imgTag.style.height = '300px';
    imgTag.style.width = '300px';
    imgTag.style.margin = 'auto';


}