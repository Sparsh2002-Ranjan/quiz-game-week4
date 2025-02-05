// Write your code from here!!

const questionsUrl = 'http://localhost:5000/questions';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];

const startBtn = document.getElementById('st-btn');
const startScreen = document.getElementById('start');
const quizScreen = document.getElementById('quiz');
const resultScreen = document.getElementById('result');
const questionElement = document.getElementById('que');
const optionsElement = document.getElementById('opt');
const scoreElement = document.getElementById('score');

async function fetchQuestions() {
  try {
    const response = await fetch("http://localhost:5000/questions");
    const data = await response.json();
    questions = data;
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

function startQuiz() {
  startScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => selectAnswer(option));
      optionsElement.appendChild(button);
    });
  } else {
    endQuiz();
  }
}

function selectAnswer(selectedOption) {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  quizScreen.classList.add('hide');
  resultScreen.classList.remove('hide');
  scoreElement.textContent = score;
}

startBtn.addEventListener('click', async () => {
  await fetchQuestions();
  startQuiz();
});