let progress;
let answerChoice; // 正解の宝箱
let playerChoice; // プレーヤーが選んだ宝箱
let montyChoice; // モンティが開けた宝箱
let boxList = ["宝箱A", "宝箱B", "宝箱C"];
let count = 0; // 試行回数
let successCount = 0; // 当たり回数

window.onload = initialize((resetFlg = 1));

// 初期処理
function initialize(resetFlg) {
  progress = 0;
  answerChoice = Math.floor(Math.random() * 3);
  document.getElementById("intro-msg1").textContent = "どの宝箱が当たりでしょうか？";
  document.getElementById("intro-msg2").textContent = "ボタンを押して選んでね。";
  for (let i = 0; i < 3; i++) {
    document.getElementById(`msg${i}`).textContent = "？";
  }
  if (resetFlg === 1) {
    progress = 0;
    count = 0;
    successCount = 0;
    document.getElementById("count-msg").textContent = "試行回数：0回";
    document.getElementById("success-count-msg").textContent = "当たり回数：0回";
    document.getElementById("success-rate-msg").textContent = "当たり割合：-%";
  }
}

for (let i = 0; i < 3; i++) {
  document.getElementById(`btn${i}`).addEventListener("click", function () {
    if (progress === 0) {
      playerChoice = i;
      do {
        montyChoice = Math.floor(Math.random() * 3);
      } while (montyChoice === answerChoice || montyChoice === playerChoice);
      document.getElementById("intro-msg1").textContent = `ヒントを言うと${boxList[montyChoice]}は外れです。`;
      document.getElementById("intro-msg2").textContent = "今なら選択を変更してよいですがどうしますか？";
      document.getElementById(`msg${montyChoice}`).textContent = "外れ";
      progress = 1;
    } else if (progress === 1) {
      playerChoice = i;
      count += 1;
      if (playerChoice === answerChoice) {
        successCount += 1;
        document.getElementById("intro-msg1").textContent = "正解！";
        document.getElementById("intro-msg2").textContent = `当たりは${boxList[answerChoice]}でした。`;
        document.getElementById(`msg${playerChoice}`).textContent = "当たり";
        document.getElementById(`msg${3 - playerChoice - montyChoice}`).textContent = "外れ";
      } else {
        document.getElementById("intro-msg1").textContent = "残念！";
        document.getElementById("intro-msg2").textContent = `当たりは${boxList[answerChoice]}でした。`;
        document.getElementById(`msg${playerChoice}`).textContent = "外れ";
        document.getElementById(`msg${3 - playerChoice - montyChoice}`).textContent = "当たり";
      }
      document.getElementById("count-msg").textContent = `試行回数：${count}回`;
      document.getElementById("success-count-msg").textContent = `当たり回数：${successCount}回`;
      document.getElementById("success-rate-msg").textContent = `当たり割合：${((successCount * 100) / count).toFixed(1)}%`;
      progress = 2;
    }
  });
}

document.getElementById("reset-btn").addEventListener("click", function () {
  initialize((resetFlg = 1));
});

document.getElementById("retry-btn").addEventListener("click", function () {
  initialize((resetFlg = 0));
});
