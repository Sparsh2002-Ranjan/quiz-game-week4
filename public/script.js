// Write your code from here!!

const questionsUrl = 'http://localhost:5000/questions';
let questions = [];
let curqueidx = 0;
let score = 0;
let selque = [];
let incans = 0;
let time;
let timeLeft = 60;
let prog = document.getElementById('progress-bar');
let timer = document.getElementById('time'); 

const startBtn = document.getElementById('st-btn');
const startScr = document.getElementById('start');
const quizScr = document.getElementById('quiz');
const resultScr = document.getElementById('result');
const queEle = document.getElementById('que');
const optEle = document.getElementById('opt');
const scrEle = document.getElementById('score');

async function fetchQuestions() {
  try {
    const response = await fetch("http://localhost:5000/questions");
    const data = await response.json();
    questions = data;
    selque = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

function startQuiz() {
  startScr.classList.add('hide');
  quizScr.classList.remove('hide');
  showQuestion();
  startTimer();
}

function startTimer() {
  time = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(time);
      endQuiz();
    } else {
      timeLeft--;
      timer.textContent = `Time Left: ${timeLeft}s`;
      updateProgressBar();
    }
  }, 1000);
}

function updateProgressBar() {
  const progress = ((curqueidx + 1) / selque.length) * 100;
  prog.style.width = `${progress}%`;
}

function showQuestion() {
  if (curqueidx < selque.length) {
    const currentQuestion = selque[curqueidx];
    queEle.textContent = currentQuestion.question;
    optEle.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => selectAnswer(option));
      optEle.appendChild(button);
    });
  } else {
    endQuiz();
  }
}

function selectAnswer(selectedOption) {
  const currentQuestion = selque[curqueidx];
  if (selectedOption === currentQuestion.answer) {
    score++;
  } else {
    incans++; 
  }
  curqueidx++;
  showQuestion();
}

function endQuiz() {
  clearInterval(time); 
  quizScr.classList.add('hide');
  resultScr.classList.remove('hide');
  scrEle.textContent = `Score: ${score}`;
  const incorrectElement = document.getElementById('incorrect-answers');
  incorrectElement.textContent = `Incorrect Answers: ${incans}`;
}

startBtn.addEventListener('click', async () => {
  await fetchQuestions();
  startQuiz();
});
