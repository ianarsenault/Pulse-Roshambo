function randomChoice(){
  randomNum = Math.floor(Math.random() * 3);

  return randomNum;
}

function choiceName(number){
  return ["Rock", "Paper", "Scissors"][number];
}


function showChoice(ianChoice, jamesonChoice){
  ianString = 'Ian throws: <b>' + ianChoice + '</b>';
  jamesonString = 'Jameson throws: <b>' + jamesonChoice + '</b>';

  document.getElementById('ianChoice').innerHTML = ianString;
  document.getElementById('jamesonChoice').innerHTML = jamesonString;
}


function pictureChoice(ianNum, jamesonNum) {

  /*
  var ianObj = {'Rock': '<img class="responsive-img" src="../images/irock.png"/>', 'Paper': '<img class="responsive-img" src="../images/ipaper.png"/>', 'Scissors': '<img class="responsive-img" src="../images/iscissors.png"/>'};
  var ianPicture = ianObj[ianNum]; */

  var ianPicture = ['<img class="responsive-img" src="images/irock.png"/>', '<img class="responsive-img" src="images/ipaper.png"/>', '<img class="responsive-img" src="images/iscissors.png"/>' ][ianNum];

  document.getElementById('iChoiceIMG').innerHTML = ianPicture;

  var jamesonPicture = ['<img class="responsive-img" src="images/jrock.png"/>', '<img class="responsive-img" src="images/jpaper.png"/>', '<img class="responsive-img" src="images/jscissors.png"/>' ][jamesonNum];

  document.getElementById('jChoiceIMG').innerHTML = jamesonPicture;
}


function getOutcome(ianChoice, jamesonChoice){
  outcome = (3 + ianChoice - jamesonChoice) % 3;
  winner = ["Tie!", "Ian Won!", "Jameson won!"][outcome];


  document.getElementById('outcome').innerHTML = winner;
}

/* document.ready Code*/
$(document).ready(function () {
  /* Get Play Button */
  var button = document.getElementById('PlayButton');

  /* Listen for event on Play Button */
  button.addEventListener('click', function () {

    $('#outcome').removeClass('animated fadeInUp').hide();

    $('#iChoiceIMG').removeClass('animated bounceInDown').hide();
    $('#jChoiceIMG').removeClass('animated bounceInDown').hide();


    $('#iChoiceIMG').show().addClass('animated bounceInDown');
    $('#jChoiceIMG').show().addClass('animated bounceInDown');

    var ianNum = randomChoice();
    var jamesonNum = randomChoice();

    pictureChoice(ianNum, jamesonNum);

    var ianChoice = choiceName(ianNum);
    var jamesonChoice = choiceName(jamesonNum);

    showChoice(ianChoice, jamesonChoice);


    setTimeout(function () {
      getOutcome(ianNum, jamesonNum);
      $('#outcome').show().addClass('animated fadeInUp');
    }, 600);


    //console.log("Ian Choice: " + ianChoice);
    //console.log("Jameson Choice: " + jamesonChoice);

  });
});
