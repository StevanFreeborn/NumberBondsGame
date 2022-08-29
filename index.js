window.onload = () => {
    drawLines();
    generateProblem();

    document
        .getElementById('new-problem-button')
        .addEventListener('click', (e) => {
            e.preventDefault();
            generateProblem();
        });

    document
        .getElementById('number-bond-form')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            checkAnswer();
        })

    document
        .getElementById('difficulty')
        .addEventListener('change', () => {
            generateProblem();
        });

    document
        .getElementById('mode')
        .addEventListener('change', () => {
            generateProblem();
        });
    
    document.getElementById('nav-toggle')
    .addEventListener('click', () => {
        const navBar = document.getElementById('nav-bar');
        const navMenu = document.getElementById('top-nav-right');
        navMenu.classList.toggle('nav-responsive');
        navMenu.classList.toggle('nav');
        drawLines();
    });
}

window.onresize = () => {
    drawLines();
}

const checkAnswer = () => {
    const totalValue = document.getElementById('total-number').value;
    const partOneValue = document.getElementById('part-one-number').value;
    const partTwoValue = document.getElementById('part-two-number').value;

    if (!partOneValue || !partTwoValue) {
        return displayModalError('Enter a number to complete the number bond!');
    }

    const isCorrect = parseInt(totalValue) == parseInt(partOneValue) + parseInt(partTwoValue);

    if (isCorrect) {
        displayModalSuccess('Correct! Great job try another problem.');
    }
    else {
        return displayModalError('Incorrect! Try again.');
    }
}

const displayModalError = (message) => {
    const modalContent = document.getElementById('modal-content');
    const modalText = document.getElementById('modal-text');

    modalText.innerText = message;
    modalText.style.color = 'red';
    modalContent.style.border = 'red 1px solid';
    modal.style.display = 'flex';

    document
        .getElementById('close-modal-button')
        .addEventListener('click', () => {
            modal.style.display = 'none';
            closeButton.removeEventListener('click');
        });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const displayModalSuccess = (message) => {
    const modalContent = document.getElementById('modal-content');
    const modalText = document.getElementById('modal-text');

    modalText.innerText = message;
    modalText.style.color = 'green';
    modalContent.style.border = 'green 1px solid';
    modal.style.display = 'flex';

    const closeButton = document.getElementById('close-modal-button');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        generateProblem();
        closeButton.removeEventListener('click');
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            generateProblem();
        }
    }
}

const drawLines = () => {
    const total = document.getElementById('total');
    const partOne = document.getElementById('part-one');
    const partTwo = document.getElementById('part-two');
    const lineOne = document.getElementById('line-one');
    const lineTwo = document.getElementById('line-two');

    drawLine(total, partOne, lineOne);
    drawLine(total, partTwo, lineTwo);
}

const drawLine = (start, end, line) => {
    const startOff = getOffset(start);
    const endOff = getOffset(end);

    const x1 = startOff.left + startOff.width / 2 + window.scrollX;
    const y1 = startOff.top + startOff.height + window.scrollY;

    const x2 = endOff.left + endOff.width / 2 + window.scrollX;
    const y2 = endOff.top + window.scrollY;

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
}

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();

    return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
    };
}

const generateProblem = () => {
    const form = document.getElementById('number-bond-form');
    form.reset();

    const difficulty = document.getElementById('difficulty').value;
    const mode = document.getElementById('mode').value;

    let max;

    switch (difficulty) {
        case 'rookie':
            max = 10;
            break;
        case 'pro':
            max = 100;
            break;
        case 'all-start':
            max = 1000;
            break;
        case 'hacker':
            max = 1000000;
        default:
            max = Number.MAX_SAFE_INTEGER;
            break;
    }

    if (mode == 'addition') {
        const total = Math.ceil(Math.random() * max);
        const partOne = Math.floor(Math.random() * (total - 0) + 0);
        const partTwo = total - partOne;

        displayAdditionProblem(partOne, partTwo);
        return;
    }

    if (mode == 'subtraction') {
        const total = Math.ceil(Math.random() * max);
        const pos = Math.round(Math.random() * (2 - 1) + 1);
        const part = Math.floor(Math.random() * (total - 0) + 0);

        displaySubtractionProblem(total, pos, part);
        return;
    }
}

const displayAdditionProblem = (partOne, partTwo) => {
    const totalInput = document.getElementById('total-number');
    const partOneNumberInput = document.getElementById('part-one-number');
    const partTwoNumberInput = document.getElementById('part-two-number');

    totalInput.setAttribute('value', '');
    totalInput.readOnly = false;
    totalInput.focus();

    partOneNumberInput.setAttribute('value', '');
    partOneNumberInput.setAttribute('value', partOne);
    partOneNumberInput.readOnly = true;

    partTwoNumberInput.setAttribute('value', '');
    partTwoNumberInput.setAttribute('value', partTwo);
    partTwoNumberInput.readOnly = false;

}

const displaySubtractionProblem = (total, pos, part) => {
    const totalInput = document.getElementById('total-number');
    const partOneNumberInput = document.getElementById('part-one-number');
    const partTwoNumberInput = document.getElementById('part-two-number');

    totalInput.setAttribute('value', total);
    totalInput.readOnly = true;

    if (pos == 1) {
        partTwoNumberInput.setAttribute('value', '');
        partOneNumberInput.setAttribute('value', part);
        partOneNumberInput.readOnly = true;
        partTwoNumberInput.readOnly = false;
        partTwoNumberInput.focus();
    }
    else {
        partOneNumberInput.setAttribute('value', '');
        partTwoNumberInput.setAttribute('value', part);
        partTwoNumberInput.readOnly = true;
        partOneNumberInput.readOnly = false;
        partOneNumberInput.focus();
    }
}