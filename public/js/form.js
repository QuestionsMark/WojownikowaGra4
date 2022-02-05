const form = document.getElementById('new-warrior');
const nameInp = document.getElementById('name');
const pointsParagraph = document.getElementById('points');
const powerSpan = document.getElementById('power');
const defenceSpan = document.getElementById('defence');
const vitalitySpan = document.getElementById('vitality');
const agilitySpan = document.getElementById('agility');
const pointsButtons = document.querySelectorAll('.point-btn');

let points = 6;
let power = 1;
let defence = 1;
let vitality = 1;
let agility = 1;

function init() {
    pointsButtons.forEach(btn => {
        btn.addEventListener('click', changePoints);
    });
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!checkValidation()) return;
        const response = await fetch('http://localhost:3000/warriors/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInp.value,
                power,
                defence,
                vitality,
                agility,
            }),
        });
        reset();
        if (response.ok) {
            alert('Dodano nowego wojownika!');
        } else {
            alert('Coś poszło nie tak, a może wojownik o takiej nazwie już istnieje?');
        }
    });
}

function render() {
    pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
    powerSpan.innerText = power;
    defenceSpan.innerText = defence;
    vitalitySpan.innerText = vitality;
    agilitySpan.innerText = agility;
}

function changePoints(e) {
    e.preventDefault();
    const { name: action, parentElement } = e.target;
    const attribute = parentElement.classList[0];
    if (points === 0 && action === 'add') return;
    switch (attribute) {
        case 'power':
            if (action === 'add') {
                power += 1;
                points -= 1;
            } else {
                if (power === 1) return;
                power -= 1;
                points += 1;
            }
            powerSpan.innerText = power;
            pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
            break;
        case 'defence':
            if (action === 'add') {
                defence += 1;
                points -= 1;
            } else {
                if (defence === 1) return;
                defence -= 1;
                points += 1;
            }
            defenceSpan.innerText = defence;
            pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
            break;
        case 'vitality':
            if (action === 'add') {
                vitality += 1;
                points -= 1;
            } else {
                if (vitality === 1) return;
                vitality -= 1;
                points += 1;
            }
            vitalitySpan.innerText = vitality;
            pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
            break;
        case 'agility':
            if (action === 'add') {
                agility += 1;
                points -= 1;
            } else {
                if (agility === 1) return;
                agility -= 1;
                points += 1;
            }
            agilitySpan.innerText = agility;
            pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
            break;

        default:
            break;
    }
}

function checkValidation() {
    if (nameInp.value.length < 1) return false;
    if (points !== 0) return false;
    return true;
}

function reset() {
    nameInp.value = '';
    points = 6;
    power = 1;
    defence = 1;
    vitality = 1;
    agility = 1;

    render();
}

render();
init();