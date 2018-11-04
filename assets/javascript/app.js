

    var ques0 = {
        question: "Which player has scored the most goals ever in the UEFA Champions League?",
        choices: ["Lionel-Messi", "Thierry-Henry", "Cristiano-Ronaldo", "Wayne-Rooney"],
        answer: "Cristiano-Ronaldo",
    };
    var ques1 = {
        question: "which soccer club has the most UEFA Champions League titles?",
        choices: ["Real-Madrid", "Manchester-United", "FC-Barcelona", "AC-Milan"],
        answer: "Real-Madrid",
    };;
    var ques2 = {
        question: "Which player has the most assists ever in the UEFA Champions League?",
        choices: ["Ryan-Giggs", "Lionel-Messi", "Cristiano-Ronaldo", "Zlatan-Ibrahimovic"],
        answer: "Cristiano-Ronaldo",
    };
    var ques3 = {
        question: "Which nation has the most womens World Cup titles?",
        choices: ["Brazil", "Japan", "Germany", "United-States"],
        answer: "United-States",
    };
    var ques4 = {
        question: "Of the following four players, which is the only player who has ever scored a hat trick in a World Cup final?",
        choices: ["Pele", "Carli-Lloyd", "Diego-Maradona", "Abby-Wambach"],
        answer: "Carli-Lloyd",
    };
    var ques5 = {
        question: "Which of the following players has scored the most goals ever in international soccer matches?",
        choices: ["Marta", "Abby-Wambach", "Carli-Lloyd", "Mia-Hamm"],
        answer: "Abby-Wambach",
    };
    var ques6 = {
        question: "How many World Cup titles has the US Womens team won?",
        choices: ["three", "one", "two", "five"],
        answer: "three",
    };
    var ques7 = {
        question: "Who scored the infamous-hand of god-goal in the World Cup?",
        choices: ["David-Beckham", "Zinedine-Zidane", "Pele", "Diego-Maradona"],
        answer: "Diego-Maradona",
    };
    var ques8 = {
        question: "Which soccer player is known for head-butting another player in the final minutes of the 2006 World Cup final?",
        choices: ["Zlatan-Ibrahimovic", "Marco-Materazzi", "Zinedine-Zidane", "Andrea-Pirlo"],
        answer: "Zinedine-Zidane",
    };
    var ques9 = {
        question: "Who is the youngest player to ever score in a World Cup final?",
        choices: ["Pele", "Kylian-Mbappe", "Cristiano-Ronaldo", "Lionel-Messi"],
        answer: "Pele",
    };

    var timeLeft = 10;
    var losses = 0;
    var wins = 0;
    var number = 0;

    var questions = [ques0.question, ques1.question, ques2.question, ques3.question, ques4.question, ques5.question, ques6.question, ques7.question, ques8.question, ques9.question];

    var options = [ques0.choices, ques1.choices, ques2.choices, ques3.choices, ques4.choices, ques5.choices, ques6.choices, ques7.choices, ques8.choices, ques9.choices];

    var answers = [ques0.answer, ques1.answer, ques2.answer, ques3.answer, ques4.answer, ques5.answer, ques6.answer, ques7.answer, ques8.answer, ques9.answer];

    function winPage() {
        $(".screen").prepend('<img id="win" src="assets/images/soccer-goal.png"/>');
        $(".timer").text("");
    };
    function losePage() {
        $(".timer").text("");
        // $(".screen").prepend('<img id="lose" src="assets/images/loser-image.png"/>')

    };
    function endPage() {
        $(".screen").empty();
        $(".timer").text("");
        // $(".screen").prepend('<img id="end" src="assets/images/fallback.png"The End!/>')
    }

    var replaceOptions = "<div class='row'>"
    "<p>Answer Choices</p>"
    "</div>"
    "<div class='row choice1'></div>"
    "<div class='row choice2'></div>"
    "<div class='row choice3'></div>"
    "<div class='row choice4'></div>"

    function countdown() {
        if (timeLeft === 0) {
            clearInterval(intervalID);
            $(".timer").text("Time Remaining: " + 0);
            $(".results").text("Times up! The correct answer is: " + answers[number]);
            losePage();
            losses++;
            number++;
            setTimeout(game, 3000);
        }
        else {
            timeLeft--;
            $(".timer").text("Time Remaining: " + timeLeft);

        }
    }

    function game() {
        if (number < questions.length) {
            timeLeft = 10;
            $(".results").text("");
            $(".screen").html(replaceOptions);
            $(".timer").text("Time Remaining: " + timeLeft);
            intervalId = setInterval(countdown, 1000);
            $(".question").text(questions[number]);
            $(".choice1").html("<button class='buttons button1' value=" + options[number][0] + ">" + options[number][0] + "</button>");
            $(".choice2").html("<button class='buttons button2' value=" + options[number][1] + ">" + options[number][1] + "</button>");
            $(".choice3").html("<button class='buttons button3' value=" + options[number][2] + ">" + options[number][2] + "</button>");
            $(".choice4").html("<button class='buttons button4' value=" + options[number][3] + ">" + options[number][3] + "</button>");

            $(".buttons").on("click", function () {
                var userClick = $(this).attr("value");

                if (userClick === answers[number]) {
                    $(".results").text("Correct! The answer is: " + answers[number]);
                    wins++;
                    clearInterval(intervalId);
                    winPage();
                    number++;
                    setTimeout(game, 3000);

                }
                else {
                    $(".results").text("Wrong! The correct answer is: " + answers[number]);
                    losses++;
                    clearInterval(intervalId);
                    losePage();
                    number++;
                    setTimeout(game, 3000);

                }
            });
        }
        else {
            clearInterval(intervalId);
            endPage();
            $(".results").text("Game over! Press Restart to Play Again");
            $(".question").text("");
            $(".correct").text("Wins: " + wins);
            $(".incorrect").text("Losses: " + losses);
            $(".buttons").remove();
            $(".timer").text("");
            $(".restart").show();
        }
    }

    function reset() {
        $(".restart").hide();
        losses = 0;
        $(".incorrect").text("");
        wins = 0;
        $(".correct").text("");
        number = 0;
        game();
    }

    $(".restart").hide();

    $(".start").on("click", function () {
        $(this).hide();
        game();
    });

    $(".restart").on("click", function () {
        reset();
    });


