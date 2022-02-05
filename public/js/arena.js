const firstWarriorInp = document.getElementById('warrior1');
const secondWarriorInp = document.getElementById('warrior2');
const form = document.getElementById('arena');
const warrior1 = document.getElementById('warrior1Container');
const warrior2 = document.getElementById('warrior2Container');
const vs = document.getElementById('vs');
const logsContainer = document.getElementById('logs');
const result = document.getElementById('winner');

function init() {
    form.addEventListener('submit', fight);
    reset()
}

function reset() {
    firstWarriorInp.value = '';
    secondWarriorInp.value = '';
    warrior1.innerHTML = '';
    warrior2.innerHTML = '';
    vs.innerText = '';
    logsContainer.innerHTML = '';
    result.innerText = '';
}

function checkValidation() {
    const value1 = firstWarriorInp.value;
    const value2 = secondWarriorInp.value;
    if (!value1 || !value2 || value1 === value2) return false;
    return true;
}

function showWarrior(warrior, element) {
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('image-wrapper');
    const img = document.createElement('img');
    img.src = '/images/warrior.png';
    img.classList.add('img');
    const h2 = document.createElement('h2');
    h2.classList.add('name')
    h2.innerText = warrior.name;

    imgWrapper.append(img);
    element.append(imgWrapper);
    element.append(h2);
}

async function fight(e) {
    e.preventDefault();
    if (!checkValidation()) return alert('Wojownik nie może walczyć sam ze sobą!!!');
    const response = await fetch(`http://localhost:3000/warriors/fight/${firstWarriorInp.value}/${secondWarriorInp.value}`);
    reset()
    if (response.ok) {
        const { logs, warriors, winner } = await response.json();
        showWarrior(warriors[0], warrior1);
        vs.innerText = 'VS';
        showWarrior(warriors[1], warrior2);
        for (const log of logs) {
            const p = document.createElement('p');
            p.innerText = log;
            logsContainer.append(p);
        }
        result.innerText = `Zwyciężył ${winner.name}`;
    } else {
        alert('Coś poszło nie tak, chyba baza danych nawala...');
    }
}

init();