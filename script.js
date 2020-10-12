const server = "https://polybian-square.herokuapp.com";
//const server = "";
const xhr = new XMLHttpRequest();

function EncodeRequest(text) {
    if (!text) {
        return document.getElementById('status').textContent = 'Введите сообщение! Пожалуйста... ♥';
    }
    xhr.open('POST', server + '/encode', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`str=${utf8_to_b64(text.toLowerCase())}`);
    xhr.onload = () => {
        let response = xhr.response.substring(1, (xhr.response.length-1));
        let responseText = response.substring(1, (response.indexOf(',') - 1));
        let responseKey = response.substring(response.indexOf(',') + 2, (response.length - 1));
        if(xhr.status == 200){
          document.getElementById('textarea').value = b64_to_utf8(responseText);
          document.getElementById('key').style.display = 'flex';
          document.getElementById('key').value = responseKey;
        }
        else{
            document.getElementById('status').textContent = response;
        }
    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
    xhr.onprogress = (e) => {
        document.getElementById('status').textContent = `Загрузка... ${e.loaded} из ${e.total}`;
    }
}
function DecodeRequest(text, key) {
    if (!key) {
        return document.getElementById('status').textContent = 'Введите ключ! Пожалуйста... ♥';
    }
    if (!text) {
        return document.getElementById('status').textContent = 'Введите сообщение! Пожалуйста... ♥';
    }
    xhr.open('POST', server + '/decode', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`str=${utf8_to_b64(text.toLowerCase())}&key=${key}`);
    xhr.onload = () => {
        if(xhr.status == 200){
          document.getElementById('textarea').value = b64_to_utf8(xhr.response);
        }
        else{
          document.getElementById('status').textContent = response;
        }
    }
    xhr.onerror = () => {
        document.getElementById('status').textContent = 'Ошибка соединения... Т_Т';
    }
    xhr.onprogress = (e) => {
        document.getElementById('status').textContent = `Загрузка... ${e.loaded} из ${e.total}`;
    }
}
function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
