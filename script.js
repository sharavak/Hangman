const category = document.querySelector('#category');
let show = document.querySelector('.show');
let guess = document.querySelector('.noOfGuess');
let img = document.querySelector('img');
let win = document.querySelector('.win');
let repeat = document.querySelector('.alrea');
const reset = document.querySelector('.newWord');
let span = document.querySelector('span');
let prev = document.querySelector('.prev');
show.nextElementSibling.style.display = 'none';
let user = document.querySelector('.user');

let userValue = '';
let words = wordList();
let word = '';
let position = [];
let check=''
let pushed = [];
let dupWord = '';
let noOfGuess = 0;
let c = 1;
let index = {};
let images = ['Hangman-0.png', 'Hangman-1.png', 'Hangman-2.png', 'Hangman-3.png', 'Hangman-4.png', 'Hangman-5.png', 'Hangman-6.png'];
img.src =`Images/${images[0]}`;
reset.disabled = true;
let alphabets = 'abcdefghijklmnopqrstuvwxyz';

function replace() {
    position = [];
    index = {};
    ind = [];
    pushed = [];
    show.textContent=''
}
category.addEventListener('change', function () {
    win.parentElement.classList.remove('winners')
    replace()
    userValue = category.value;
    word = random();
    reset.disabled = false;
})

function random() {
    let cate = words[userValue];
    let rand = Math.floor(Math.random() * cate.length);
    cate = cate[rand].toLowerCase();
    word = cate
    for (let c = 0; c < cate.length; c++) {
        index[c]=word[c]
        show.textContent += ' _ ';
        position.push('_');
        pushed.push(c)
    }
    dupWord = word;
    return word
}

user.addEventListener('input', function (e) {
        if (user.value.length === 1 && alphabets.includes(user.value.toLowerCase())&&show.textContent!=='') {
            repeat.textContent = '';
            check = user.value.toLowerCase();
            if (word.includes(check)) {
                if (!Object.values(index).includes(check)) {
                    repeat.textContent = 'You already Guessed the letter'
                }
                if (word.indexOf(check) !== -1 && dupWord.indexOf(check) !== -1) {
                    for (let i in index) {
                        if (index[i] !== '') {
                            let d = dupWord.indexOf(check);
                            let pus = pushed.splice(d, 1);
                            console.log(word);
                            position[pus] = check;
                            show.textContent = position.join(' ').replaceAll(',', ' ');
                            dupWord = dupWord.replace(check, '');
                            index[pus] = '';
                            break;
                        }
                    }
                    if (pushed.length === 0) {
                        win.parentElement.classList.add('winners')
                        win.textContent = 'You Won!!!'
                       }
                    }  
            }
            else {
                if (c === images.length - 1) {
                    img.src = `Images/${images[c]}`;
                    win.parentElement.classList.add('winners')
                    win.innerHTML = `<p class="win">You Lost the game</p><p class="win">The Word is ${word}`;
                }
                else {
                    show.nextElementSibling.style.display = 'inline-block';
                    prev.textContent+=check+','
                    guess.textContent = `No of Guess:${noOfGuess += 1}`;
                    img.src =`Images/${images[c]}`;
                    c = c + 1
                }
            }
              user.value = '';
        }
      
        else {
            user.value = '';
        }
})
reset.addEventListener('click', function () {
    win.textContent = '';
    guess.textContent = ''
    show.nextElementSibling.style.display = 'none';
    replace()
    word = random();
    win.parentElement.classList.remove('winners')
    img.src = `Images/${images[0]}`;
    prev.textContent = '';
    c = 1;
})
