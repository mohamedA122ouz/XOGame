interface winLog {
    playerNum: number;
    win: boolean;
}

const board: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
function useBoard(board: number[][], player: number, r: number, c: number): number[][] {
    let board2 = board.map(row =>[...row]);
    board2[r][c] = player;
    return board2;
}
function isWinner(playerNum: number, board: number[][], r: number, c: number): winLog {
    if (playerNum === 0)
        return { playerNum: 0, win: false };
    if (board[r][c] === board[r][(c + 1) % 3] && board[r][(c + 1) % 3] === board[r][(c + 2) % 3]) {
        return { playerNum: playerNum, win: true };
    }
    else if (board[r][c] === board[(r + 1) % 3][c] && board[(r + 1) % 3][c] === board[(r + 2) % 3][c]) {
        return { playerNum: playerNum, win: true };
    }
    if (r == c) {
        if (board[r][c] === board[(r + 1) % 3][(c + 1) % 3] && board[(r + 1) % 3][(c + 1) % 3] === board[(r + 2) % 3][(c + 2) % 3]) {
            return { playerNum: playerNum, win: true };
        }
    }
    else if ((r + c) == 2 || ((r == c) && r == 1)) {
        if (board[r][c] === board[(r + 2) % 3][(c + 1) % 3] && board[(r + 2) % 3][(c + 1) % 3] === board[(r + 1) % 3][(c + 2) % 3]) {
            return { playerNum: playerNum, win: true };
        }
    }
    return { playerNum: playerNum, win: false };
}
function intializer() {
    scanTree(board.map(row =>[...row]) , 1, 0, 0);
    scanTree(board.map(row =>[...row]), 2, 0, 0);
}
function scanTree(board: number[][], playerNum: number, r: number, c: number) {
    let newBoard = useBoard(board, playerNum, r, c);
    console.log(`r=${r} c=${c}`, newBoard);
    if (playerNum !== 0 && isWinner(playerNum, newBoard, r, c).win) {
        return true;
    }
    else if (r === 2 && c === 2) {
        return false;
    }
    else if (c == 2 && r < 2) {
        r = ++r % 3;
    } 
    // else if (r == 2 && c < 2) {
    //     c = ++c % 3;
    // }
    scanTree(newBoard.map(el=>[...el]), 1, r, (c + 1) % 3);
    scanTree(newBoard.map(el=>[...el]), 2, r, (c + 1) % 3);
}

intializer();