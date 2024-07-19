// IMPLEMENTAR O SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker registrado com sucesso: ', registration.scope);
        }, (err) => {
            console.log('Registro do Service Worker falhou: ', err);
        });
    });
}


// COLETA DE DADOS PRAS 3 FUNÇÕES SEGUINTES
const url = "https://api.thecatapi.com/v1/images/search";
const section = document.querySelector(".container-resultado");
const form = document.getElementById('quizForm');


// BOTAO DE ENVIAR FORMULARIO
form.addEventListener('submit', function(event) {

    event.preventDefault();

    // COLETA RESPOSTAS
    const answers = {
        q1: document.getElementById('name').value,
        q2: document.querySelector('input[name="q2"]:checked').value,
        q3: document.querySelector('input[name="q3"]:checked').value,
        q4: document.querySelector('input[name="q4"]:checked').value
    };


    // GUARDA RESPOSTAS NO LOCAL STORAGE
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    console.log(answers);

    // OBTEM O NOME PARA MOSTRAR NO PLACAR
    const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    const q1Answer = storedAnswers.q1;

    const conteudo = `
    <p id="item" class="item">${q1Answer}</p>
    `
    const item = document.createElement('li');

    item.innerHTML = conteudo;
    lista.appendChild(item);


    // LIMPA OS CAMPOS
    form.reset();

    
    // ESCONDE O FORMULÁRIO E MOSTRA O RESULTADO
    document.getElementById('quizForm').style.display = 'none'
    document.querySelector(".container-resultado").style.display = 'block';


    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Chama a função para mostrar a foto aleatória de gato
            randomCatPhoto(data);
        })
        .catch(error => console.error('Erro ao obter foto de gato:', error));
});

const randomCatPhoto = (json) => {
    let photo = json[0].url;
    section.classList.add("cats");

    // Remover imagem existente se houver
    let existingImage = section.querySelector(".random_cats");
    if (existingImage) {
        section.removeChild(existingImage);
    }

    let image = document.createElement("img");
    image.src = photo;
    image.classList.add("random_cats");
    image.alt = "Foto de um gato aleatório";
    section.appendChild(image);
};


// BOTAO DE VOLTAR NA PÁGINA DE RESULTADO
function voltarFormulario() {
    document.getElementById('quizForm').style.display = 'block';
    document.querySelector(".container-resultado").style.display = 'none';
}

