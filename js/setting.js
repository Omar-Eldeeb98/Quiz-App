//^ jQuery Auto Complete ...
/// <reference types="../@types/jquery" />;

import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    console.log(this); //* just for testing
    document.getElementById("start_btn").addEventListener("click", () => {
      this.startQuestion();
    });
  }

  async startQuestion() {
    const category = document.getElementById("category").value;
    const difficulty = document.querySelector(
      "[name = 'difficulty' ]:checked"
    ).value;
    const amount = document.getElementById("amount").value;
    if (amount > 0 && amount <= 50) {
      const results = await this.getQuestions(category, difficulty, amount);
      // console.log(results); //* just for testing // return [] array of objects "questions"
      $("#settings_section").addClass("d-none");
      $("#quiz_section").removeClass("d-none");
      const quiz = new Quiz(results); //* create instance from class Quiz
      $("#alert_number").fadeOut(400);
    } else {
      $("#alert_number").fadeIn(1000);
    }
  }

  async getQuestions(category, difficulty, amount) {
    const apiResponse = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    );
    const response = await apiResponse.json();
    return response.results;
  }
}
