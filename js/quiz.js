//^ jQuery Auto Complete ...
/// <reference types="../@types/jquery" />;

export class Quiz {
  constructor(results) {
    // console.log("hello from quiz class 👋🏻 ", results); //* just for testing
    this.results = results;
    document.getElementById("to").innerHTML = results.length;

    this.currentIndex = 0;
    this.questionTitle = document.getElementById("questionTitle");
    this.questionContent = document.getElementById("questionContent");
    this.correctAnswer;

    document
      .getElementById("next_question_btn")
      .addEventListener("click", () => {
        // alert("hi from button"); //* for testing
        this.nextQuestion();
      });

    document.getElementById("end_btn").addEventListener("click", () => {
      location.reload();
    });

    this.showQuestions();
    this.score = 0;
  }

  showQuestions() {
    document.getElementById("from").innerHTML = this.currentIndex + 1;

    const currentQuestion = this.results[this.currentIndex];
    // console.log(currentQuestion.question); //* for testing
    this.questionTitle.innerHTML = currentQuestion.question;

    this.correctAnswer = this.results[this.currentIndex].correct_answer;
    const answers = this.results[this.currentIndex].incorrect_answers;
    // const incorrectAnswer = this.results[this.currentIndex].incorrect_answers;
    // console.log(correctAnswer, answers); //* for testing

    let randomNumbers = Math.round(Math.random() * answers.length);
    answers.splice(randomNumbers, 0, this.correctAnswer);
    // console.log(randomNumbers, this.correctAnswer, answers); //* just for testing

    let cartona = "";
    for (let i = 0; i < answers.length; i++) {
      cartona += `<li>
      <div class="radio_container_  rounded p-2 ps-3 mb-2">
        <input
          class="form-check-input "
          type="radio"
          name="answer"
          value="${answers[i]}" />
        <label class="text-white"> ${answers[i]} </label>
      </div>
    </li>  `;
    }

    this.questionContent.innerHTML = cartona;
  }

  nextQuestion() {
    const currentAnswer = document.querySelector(
      "[name='answer']:checked"
    )?.value;

    if (currentAnswer != undefined) {
      if (currentAnswer == this.correctAnswer) {
        $("#correct").fadeIn(300);
        setTimeout(() => {
          $("#correct").fadeOut(300);
        }, 400);
        this.score++;
      } else {
        $("#inCorrect").fadeIn(300);
        setTimeout(() => {
          $("#inCorrect").fadeOut(300);
        }, 400);
      }
      document.getElementById("alertAns").classList.add("d-none");
      this.currentIndex++;
      if (this.currentIndex > this.results.length - 1) {
        $("#quiz_section").addClass("d-none");
        $("#finish_section").removeClass("d-none");
        document.getElementById("score").innerHTML = `${this.score} / ${this.results.length} `;
      } else {
        this.showQuestions();
      }
    }

  
    else {
      document.getElementById("alertAns").classList.remove("d-none");
    }
  }
}
