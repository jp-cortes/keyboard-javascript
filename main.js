const keys = [
    [
        ['1', '!'],
        ['2', '@'],
        ['3', '#'],
        ['4', '$'],
        ['5', '%'],
        ['6', '^'],
        ['7', '&'],
        ['8', '*'],
        ['9', '('],
        ['0', ')'],
        ['-', '_'],
        ['=', '+'],
    ],//first line
    [
        ['q', 'Q'],
        ['w', 'W'],
        ['e', 'E'],
        ['r', 'R'],
        ['t', 'T'],
        ['y', 'Y'],
        ['u', 'U'],
        ['i', 'I'],
        ['o', 'O'],
        ['p', 'P'],
        ['[', '{'],
        [']', '}'],
    ],
    [
        ['CAPS LOCK', 'CAPS LOCK'],
        ['a', 'A'],
        ['s', 'S'],
        ['d', 'D'],
        ['f', 'F'],
        ['g', 'G'],
        ['h', 'H'],
        ['j', 'J'],
        ['k', 'K'],
        ['l', 'L'],
        [';', ':'],
    ],
    [
        ['SHIFT', 'SHIFT'],
        ['z', 'Z'],
        ['x', 'X'],
        ['c', 'C'],
        ['v', 'V'],
        ['b', 'B'],
        ['n', 'N'],
        ['m', 'M'],
        ['<', ','],
        ['>', '.'],
        ['/', '?'],
    ],
    [
        ['SPACE', 'SPACE'],
    ]
];

let mayus = false;
let shift = false;
let current = null;

renderKeyboard()

function renderKeyboard () {
    const keyboardContainer = document.querySelector('#keyboard-container');
    let empty = `<div class="key-empty"></div>`;

    const layers = keys.map((layer) => {
        //se usan 2 maps  por tartarse de u arreglo tridimensional
        //el primero abarca key[] el segundo accede  a los array dentto de key[]
        return layer.map((key) => {
            if(key[0] === 'SHIFT') {
                return `<button class="key key-shift">${key[0]}</button>`;
            }
            if(key[0] === 'CAPS LOCK') {
                return `<button class="key key-caps-lock">${key[0]}</button>`;
            }
            if(key[0] === 'SPACE') {
                return `<button class="key key-space"></button>`;
            }
            return `<button class="key key-normal">
            ${shift
                 ? key[1] 
                 : mayus && 
                 key[0].toLowerCase().charCodeAt(0) >= 97 &&//97 c0digo de 'A'
                 key[0].toLowerCase().charCodeAt(0) <= 122 //122 codigo de 'Z'
                 ? key[1] 
                 : key[0]}
            </button>

            `;
        });
    });

    layers[0].push(empty);
    layers[1].unshift(empty);


    const htmlLayers = layers.map((layer) => {
        return layer.join('');
    });

    keyboardContainer.innerHTML = '';

    htmlLayers.forEach(layer => {
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`
    });

    document.querySelectorAll('.key').forEach((key) =>{
        key.addEventListener('click', (e) => {
            if (current) {
                if (key.textContent === 'SHIFT') {
                    shift = !shift;
                    
                } else if (key.textContent === 'CAPS LOCK') {
                    mayus = !mayus;
                    
                } else if (key.textContent === '') {
                    current.value += ' ';
                } else {
                    current.value += key.textContent.trim();
                    if (shift) {
                        shift = false;
                        
                    }
                }

                renderKeyboard()
                current.focus();

            }
        });
    });
}


document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('focusin', (e) => {
        current = e.target;
    })
});
