
const $start = $('#start');
const $startBtn = $('.button',$start);
const $player1 = $('#player1');
const $player2 = $('#player2');

const $boxes = $('.boxes');
const $box = $('.box');
const p1Token = 'X';
const p2T oken = 'O';

const $finish = $('#finish');
const $finishMsg = $('.message',$finish);
const $finishBtn = $('.button',$finish);

let grid1 = [''];
let grid2 = [''];
let clickCount = 0;

$startBtn.css('font-weight','bold');
$finish.hide();
$finishBtn.css('font-weight','bold');

// check both player arrays each time
function isGameOver() {
  if (
    // across
    grid1[0] && grid1[1] && grid1[2] ||
    grid1[3] && grid1[4] && grid1[5] ||
    grid1[6] && grid1[7] && grid1[8] ||
    // down
    grid1[0] && grid1[3] && grid1[6] ||
    grid1[1] && grid1[4] && grid1[7] ||
    grid1[2] && grid1[5] && grid1[8] ||
    // diagonal
    grid1[0] && grid1[4] && grid1[8] ||
    grid1[6] && grid1[4] && grid1[2]
  ) {
    $finish
    .addClass('screen-win-one')
    .removeAttr('style');
    $finishMsg.append(`Winner`);
  }
  // check if player 2 has winning combo
  if (
    // across
    grid2[0] && grid2[1] && grid2[2] ||
    grid2[3] && grid2[4] && grid2[5] ||
    grid2[6] && grid2[7] && grid2[8] ||
    // down
    grid2[0] && grid2[3] && grid2[6] ||
    grid2[1] && grid2[4] && grid2[7] ||
    grid2[2] && grid2[5] && grid2[8] ||
    // diagonal
    grid2[0] && grid2[4] && grid2[8] ||
    grid2[6] && grid2[4] && grid2[2]
  ) {
    $finish
    .addClass('screen-win-two')
    .removeAttr('style');
    $finishMsg.append(`Winner`);
  }
}

// rotate players each click
function boxDown() {
  const $this = $(this);
  if (!$this.hasClass('taken')) {
    if (clickCount % 2 == 0) {
      const x = $this.data('x');
      $player1.removeClass('active');
      $this.addClass('taken box-filled-1').removeAttr("style");
      $player2.addClass('active');
      // log player1 move to player1 array
      grid1[x] = p1Token;
    }
    if (clickCount % 2 == 1) {
      const o = $this.data('y');
      $player2.removeClass('active');
      $this.addClass('taken box-filled-2').removeAttr("style");
      $player1.addClass('active');
      // log player2 move to player2 array
      grid2[o] = p2Token;
    }
    // check player move against winning array combos
    isGameOver();
    // if no winning combo found, on final click declare a draw
    if (clickCount == 8 && !isGameOver()) {
      $finish
      .addClass('screen-win-tie')
      .removeAttr('style');
      $finishMsg.append(`It's a Tie!`);
    }
    clickCount += 1;
  }
};

// display player icon on hover
function boxOver() {
  const $this = $(this);
  if (!$this.hasClass('taken')) {
    if (clickCount % 2 == 0) {
      $this.css({'background':'url(img/o.svg) no-repeat center #efefef','background-size':'70%'});
    }
    else {
      $this.css({'background':'url(img/x.svg) no-repeat center #efefef','background-size':'70%'});
    }
  }
};

// remove player icon when hover complete
function boxOut() {
  const $this = $(this);
  if (!$this.hasClass('taken')) {
    $this.css('background','');
  }
};

// remove splash screen to reveal game
const revealGame = () => {
  $start.fadeOut();
  $player1.addClass('active');
};

// reset game data, inc. click count & arrays
const resetGame = () => {
  $finish.removeClass('screen-win-tie screen-win-one screen-win-two');
  $box.removeClass('taken box-filled-1 box-filled-2');
  $player2.removeClass('active');
  $finish.hide();
  $start.hide();
  $finishMsg.empty();
  grid1 = [''];
  grid2 = [''];
  clickCount = 0;

  if (!$player1.hasClass('active')) {
    $player1.addClass('active');
  }
};

// add meta data to game grid
function addMetaData(i) {
  $(this)
  .attr('data-x',[i])
  .attr('data-y',[i]);
}

$box
.each(addMetaData)
.on('mousedown',boxDown)
.on('mouseover',boxOver)
.on('mouseout',boxOut);

$startBtn.on('mousedown',revealGame);
$finishBtn.on('mousedown',resetGame);
