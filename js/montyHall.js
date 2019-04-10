function changeOrNotYourChoise(resultsChange, flag, chW, chL, chP) {
	
	var winOrLose = "";     // глобальная var для сообщения win or lose
	var chngTask = $("#task");  // глобал var для записей в блок task
	
	// inc нажатия на кнопку NO
	resultsChange.total += 1;
	// открываем оставшиеся двери
	for (var i = 1; i < 4; i++) {
		$("#b"+i).css(
      {"transform": "rotateY(180deg)", "transition":"0.5s"}
    );
	}
	// прописываем результаты, если угадал...
	if (flag) {
		resultsChange.win += 1;
		$("#"+chW).text("WIN: " + resultsChange.win);
		resultsChange.chance = resultsChange.win / resultsChange.total * 100;
		$("#"+chP).text("Win chance = " + resultsChange.chance.toFixed(1) + "%");
		// и готовим сообщение о выигрыше
	    winOrLose = "You WIN :)";
	} else { // ...и если не угадал
		resultsChange.lose += 1;
		$("#"+chL).text("LOSE: " + resultsChange.lose);
		resultsChange.chance = resultsChange.win / resultsChange.total * 100;
		$("#"+chP).text("Win chance = " + resultsChange.chance.toFixed(1) + "%");
		// и готовим сообщение о проигрыше
	    winOrLose = "You LOSE :(";
	}
	
	// закрываем двери
	setTimeout( function() {
		for (var i = 1; i < 4; i++) {
			$("#b"+i).css(
				{"transform": "rotateY(0deg)", "transition":"0.5s"}
			);
		}
		// убираем приз и прописываем там ноль
	    $(".front").text("$0");
		// меняем текст условия на начальный
        chngTask.text("There is a prize behind a door! Chose one!");
	}, 1500 
	);
	
	// сообщение выиграл или нет
    chngTask.text(winOrLose);
	// прячем кнопки
	$("#changeButtons").toggleClass("hide");
	// перекрашиваем дверь и возвращаем кликабельность
	$(".back").css({
    "background":"#1af",
    "pointer-events":"auto"
    });
	// убираем вопрос о замене выбора
	$("#change").css("visibility","hidden");
	
}

///////////////////////////////////////////////////////////////////////////////////////
/////      Сверху - описание функции, обрабатывающей нажатия кнопок YES и NO      /////
/////                                                                             /////
/////                     Снизу - основное тело программы                         /////
///////////////////////////////////////////////////////////////////////////////////////



// используем объекты, чтобы работать с функцией changeOrNotYourChoise
var resultsChange = {win : 0, lose : 0, chance : 0, total : 0};
var resultsNotChange = {win : 0, lose : 0, chance : 0, total : 0};

var userDoor, prizeDoor, openDoor;


// изменение цвета двери
$(".back").on("click", function() {
  var backs = $(".back");
  // сперва все закрашиваем в синий
  backs.css({
    "background":"#1af",
    "pointer-events":"none"
  });
  // и красим в зеленый ту, на которой click
  var door = $( this );
  door.css("background", "#0f0");
  // берем номер двери, которую выбрал user
  userDoor = +door.attr("id")[1];
  
  // меняем описание
  var chngTask = $("#task");
  chngTask.text("Got it! Now I will open one of the rest!")
  
  // генерируем $1000 за одной из дверей
  prizeDoor = Math.floor(Math.random() * (3 + 1 - 1)) + 1;
  $("#f"+prizeDoor).text("$1000");
  
  // открываем одну из дверей без приза
  setTimeout ( function() {
    // выбираем какую открывать
    openDoor = Math.floor(Math.random() * (3 + 1 - 1)) + 1;
    while(openDoor == prizeDoor || openDoor == userDoor) {
       openDoor = +Math.floor(Math.random() * (3 + 1 - 1)) + 1;
    }
    // и открываем её     
    $("#b"+openDoor).css(
      {"transform": "rotateY(180deg)", "transition":"0.5s"}
    );
    $("#change").css("visibility","visible");
    $("#changeButtons").toggleClass("hide");
  }, 500
  ); 
  
}); // конец функции клика на дверь


// обрабатываем нажатие кнопки NO ...
$("#noBtn").on("click", function(event) {
	changeOrNotYourChoise(resultsNotChange, userDoor == prizeDoor, "notchWin", "notchLose", "notchPercent")
}); 

// ... и кнопки YES
$("#yesBtn").on("click", function(event) {
	changeOrNotYourChoise(resultsChange, userDoor != prizeDoor, "chWin", "chLose", "chPercent") 
});
