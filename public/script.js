// Write your code from here!!

const questionsUrl = 'http://localhost:5000/questions';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let incorrectAnswers = 0;
let timer; // Timer variable
let timeLeft = 60; // 1 minute timer for the quiz
let progressBar = document.getElementById('progress-bar'); // Assuming a progress bar in the HTML
let timerElement = document.getElementById('timer'); // Assuming a timer display in the HTML

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
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    } else {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
      updateProgressBar();
    }
  }, 1000);
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
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
  } else {
    incorrectAnswers++; // Track incorrect answers
  }
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  clearInterval(timer); // Stop the timer when the quiz ends
  quizScreen.classList.add('hide');
  resultScreen.classList.remove('hide');
  scoreElement.textContent = `Score: ${score}`;
  const incorrectElement = document.getElementById('incorrect-answers');
  incorrectElement.textContent = `Incorrect Answers: ${incorrectAnswers}`;
}

startBtn.addEventListener('click', async () => {
  await fetchQuestions();
  startQuiz();
});
