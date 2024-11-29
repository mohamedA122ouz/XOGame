let settings = {
	enableSwap: true,
	enableScore: true,
	allowSounds: true
}
class Player {
	winLog() {
		console.log(this.number);
		winner = true;
		console.log(document.getElementById(`${this.number}`));
		return document.getElementById(`${this.number}`);
	}
	playerIcon() {
		return document.querySelector(`#charIcon${this.number}`);
	}
	playerInfo() {
		return document.querySelector(`#i${this.number}`);
	}
	constructor(playerChar, playerName, num) {
		this.number = num;
		this.char = playerChar;
		this.name = playerName;
		this.score = 0;
	}
}
let resetPlayer = new Player();
let winner = false;
let p1 = new Player("X", "player1", 1);
let p2 = new Player("O", "player2", 2);
function changePlayerName(playerIndex, name) {
	if (playerIndex == 1) {
		p1.name = name;
	} else if (playerIndex == 2) {
		p2.name = name;
	}
}
try {
	let playersArr = JSON.parse(sessionStorage.getItem("player"));
	p1.score = playersArr[0].score;
	p2.score = playersArr[1].score;
	if (p1.name === "player1" && playersArr[0].name !== "player1")
		p1.name = playersArr[0].name;
	if (p2.name === "player2" && playersArr[1].name !== "player2")
		p2.name = playersArr[1].name;

	if (settings.enableScore) {
		document.getElementById("s1").textContent = `score: ${p1.score}`;
		document.getElementById("s2").textContent = `score: ${p2.score}`;
	}
	if (settings.enableSwap) {
		p1.playerIcon().className = playersArr[1].char;
		p2.playerIcon().className = playersArr[0].char;
		p1.char = playersArr[1].char;
		p2.char = playersArr[0].char;
	}
}
catch (e) {
	console.log(e);
}
document.getElementById("1").innerText = p1.name;
document.getElementById("2").innerText = p2.name;
p1.char === "X" ? p1.playerInfo().classList.add("current") : p2.playerInfo().classList.add("current");
let boardController = {
	numberOfSteps: 0,
	board: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]
	,
	player: true,//true for X and false for O player
	i: 0,
	choose: function (obj) {
		if (this.i === 0) {
			this.player = (p1.char === "X");
			this.i++;
		}
		if (!winner) {
			let playerChar;
			let currentPlayer;
			if (this.player) {
				currentPlayer = p1;
				playerChar = `<p class="innerChar">${currentPlayer.char}</p>`;
			}
			else {
				currentPlayer = p2;
				playerChar = `<p class="innerChar">${currentPlayer.char}</p>`;
			}
			//console.log(obj.classList);
			if (!obj.classList.value.includes("done")) {
				this.player = !this.player;
				obj.classList.add("done");
				let board = obj.id;
				board = board.split('s');
				this.board[board[0] - 1][board[1] - 1] = currentPlayer.number;
				obj.innerHTML = playerChar;
				let win = this.didYouWon(currentPlayer, (board[0] - 1), (board[1] - 1));
				if (currentPlayer === p1 && !win) {
					p1.playerInfo().classList.remove("current");
					p2.playerInfo().classList.add("current");
				}
				else if (currentPlayer === p2 && !win) {
					p2.playerInfo().classList.remove("current");
					p1.playerInfo().classList.add("current");
				}
				//	console.log(this.board);
			}
		}
	},
	didYouWon: function (player, r, c) {
		//console.log(r+c);
		//console.log((r+c)==2);
		this.numberOfSteps++;
		if (this.board[r][c] === this.board[r][(c + 1) % 3] && this.board[r][(c + 1) % 3] === this.board[r][(c + 2) % 3]) {
			player.winLog().innerHTML += ` winner`;
			player.score++;
		}
		else if (this.board[r][c] === this.board[(r + 1) % 3][c] && this.board[(r + 1) % 3][c] === this.board[(r + 2) % 3][c]) {
			player.winLog().innerHTML += ` winner`;
			player.score++;
		}
		if (r == c) {
			if (this.board[r][c] === this.board[(r + 1) % 3][(c + 1) % 3] && this.board[(r + 1) % 3][(c + 1) % 3] === this.board[(r + 2) % 3][(c + 2) % 3]) {
				player.winLog().innerHTML += ` winner`;
				player.score++;
			}
		}
		else if ((r + c) == 2 || ((r == c) && r == 1)) {
			if (this.board[r][c] === this.board[(r + 2) % 3][(c + 1) % 3] && this.board[(r + 2) % 3][(c + 1) % 3] === this.board[(r + 1) % 3][(c + 2) % 3]) {
				player.winLog().innerHTML += ` winner`;
				player.score++;
			}
		}
		if (winner && settings.enableScore) {
			let details = [p1, p2];
			document.getElementById(`s${player.number}`).textContent = `score: ${player.score}`;
			document.querySelector(`#gameLogTitle`).textContent = `${player.name || (player == p1 ? "player1" : "player2")} is a winner`;
			document.querySelector(`#gameLog`).style.display = "flex";
			sessionStorage.setItem("player", JSON.stringify(details));
			if (settings.allowSounds)
				document.querySelector("audio").volume = 0.5;
			document.querySelector("audio").play();
			return true;
		}
		else if (this.numberOfSteps === 9) {
			document.querySelector(`#gameLog`).style.display = "flex";
			document.querySelector(`#gameLogTitle`).textContent = `Draw no one Win`;

		}
		return false;
	}
	,
};