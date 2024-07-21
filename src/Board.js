import br from './pieces-basic-svg/rook-b.svg';
import bn from './pieces-basic-svg/knight-b.svg';
import bb from './pieces-basic-svg/bishop-b.svg';
import bq from './pieces-basic-svg/queen-b.svg';
import bk from './pieces-basic-svg/king-b.svg';
import bp from './pieces-basic-svg/pawn-b.svg';
import wr from './pieces-basic-svg/rook-w.svg';
import wn from './pieces-basic-svg/knight-w.svg';
import wb from './pieces-basic-svg/bishop-w.svg';
import wq from './pieces-basic-svg/queen-w.svg';
import wk from './pieces-basic-svg/king-w.svg';
import wp from './pieces-basic-svg/pawn-w.svg';
import Piece from './Piece';
import { useEffect, useState } from 'react';

const Board = () => {
    const initPieces = () => {
        const initPos = {
            'br': [[1, 1], [1, 8]],
            'bn': [[1, 2], [1, 7]],
            'bb': [[1, 3], [1, 6]],
            'bq': [[1, 4]],
            'bk': [[1, 5]],
            'bp': [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8]],
            'wr': [[8, 1], [8, 8]],
            'wn': [[8, 2], [8, 7]],
            'wb': [[8, 3], [8, 6]],
            'wq': [[8, 4]],
            'wk': [[8, 5]],
            'wp': [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8]],
        };

        const sources = {
            'br': br,
            'bn': bn,
            'bb': bb,
            'bq': bq,
            'bk': bk,
            'bp': bp,
            'wr': wr,
            'wn': wn,
            'wb': wb,
            'wq': wq,
            'wk': wk,
            'wp': wp
        };

        let initPieces = [];
        for (const [type, posArr] of Object.entries(initPos)) {
            for (const pos of posArr) {
                initPieces.push({ type: type, pos: pos, src: sources[type], selected: false, moved: false });
            }
        }

        return initPieces;
    }

    const [pieces, setPieces] = useState(null);

    useEffect(() => {
        setPieces(initPieces());
    }, [])

    const [selectedId, setSelectedId] = useState(-1);
    const [board, setBoard] = useState(null);
    const [whiteMove, setWhiteMove] = useState(true);

    const constructBoardArray = () => {
        const boardArray = new Array(8).fill(null).map(() => new Array(8).fill(null));
        for (const piece of pieces) {
            boardArray[piece.pos[0] - 1][piece.pos[1] - 1] = piece.type;
        }
        return boardArray;
    }

    const getMoves = (pieceId) => {
        const piece = pieces[pieceId];
        const possibleMoves = [];
        const boardArray = constructBoardArray();
        console.log(boardArray);
        switch (piece.type[1]) {
            case 'p':
                let range = 2;
                if (piece.moved) {
                    range = 1;
                }
                if (piece.type[0] === 'w') {
                    for (let i = 0; i < range; i ++) {
                        if (boardArray[piece.pos[0] - i - 2][piece.pos[1] - 1] !== null) {
                            break;
                        }
                        possibleMoves.push([piece.pos[0] - i - 1,piece.pos[1]])
                    }
                    if (boardArray[piece.pos[0] - 2][piece.pos[1]] !== null) {
                        possibleMoves.push([piece.pos[0] - 1, piece.pos[1] + 1])
                    }
                    if (boardArray[piece.pos[0] - 2][piece.pos[1] - 2] !== null) {
                        possibleMoves.push([piece.pos[0] - 1, piece.pos[1] - 1])
                    }
                }
                else {
                    for (let i = 0; i < range; i ++) {
                        if (boardArray[piece.pos[0] + i][piece.pos[1] - 1] !== null) {
                            break;
                        }
                        possibleMoves.push([piece.pos[0] + i + 1, piece.pos[1]])
                    }
                    if (boardArray[piece.pos[0]][piece.pos[1]] !== null) {
                        possibleMoves.push([piece.pos[0] + 1, piece.pos[1] + 1])
                    }
                    if (boardArray[piece.pos[0]][piece.pos[1] - 2] !== null) {
                        possibleMoves.push([piece.pos[0] + 1, piece.pos[1] - 1])
                    }
                }
                break;

            case 'r':
                for (let i = piece.pos[0] - 2; i >= 0; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] - 1];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1]]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1]]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] - 1];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1]]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1]]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[1] - 2; i >= 0; i--) {
                    const targetPiece = boardArray[piece.pos[0] - 1][i];
                    if (targetPiece === null) {
                        possibleMoves.push([piece.pos[0], i + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([piece.pos[0], i + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[1]; i < 8; i++) {
                    const targetPiece = boardArray[piece.pos[0] - 1][i];
                    if (targetPiece === null) {
                        possibleMoves.push([piece.pos[0], i + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([piece.pos[0], i + 1]);
                        }
                        break;
                    }
                }
                break;

            case 'b':
                for (let i = piece.pos[0] - 2; i >= 0 && piece.pos[1] + (i - piece.pos[0]) >= 0; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] + (i - piece.pos[0])];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0] - 2; i >= 0 && piece.pos[1] + (piece.pos[0] - i - 2) < 8; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] + (piece.pos[0] - i - 2)];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8 && piece.pos[1] + (piece.pos[0] - i - 2) >= 0; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] + (piece.pos[0] - i - 2)];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8 && piece.pos[1] + (i - piece.pos[0]) < 8; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] + (i - piece.pos[0])];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                        }
                        break;
                    }
                }
                break;

            case 'q':
                for (let i = piece.pos[0] - 2; i >= 0; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] - 1];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1]]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1]]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] - 1];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1]]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1]]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[1] - 2; i >= 0; i--) {
                    const targetPiece = boardArray[piece.pos[0] - 1][i];
                    if (targetPiece === null) {
                        possibleMoves.push([piece.pos[0], i + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([piece.pos[0], i + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[1]; i < 8; i++) {
                    const targetPiece = boardArray[piece.pos[0] - 1][i];
                    if (targetPiece === null) {
                        possibleMoves.push([piece.pos[0], i + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([piece.pos[0], i + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0] - 2; i >= 0 && piece.pos[1] + (i - piece.pos[0]) >= 0; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] + (i - piece.pos[0])];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0] - 2; i >= 0 && piece.pos[1] + (piece.pos[0] - i - 2) < 8; i--) {
                    const targetPiece = boardArray[i][piece.pos[1] + (piece.pos[0] - i - 2)];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8 && piece.pos[1] + (piece.pos[0] - i - 2) >= 0; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] + (piece.pos[0] - i - 2)];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (piece.pos[0] - i - 2) + 1]);
                        }
                        break;
                    }
                }
                for (let i = piece.pos[0]; i < 8 && piece.pos[1] + (i - piece.pos[0]) < 8; i++) {
                    const targetPiece = boardArray[i][piece.pos[1] + (i - piece.pos[0])];
                    if (targetPiece === null) {
                        possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                    } else {
                        if (targetPiece[0] !== piece.type[0]) {
                            possibleMoves.push([i + 1, piece.pos[1] + (i - piece.pos[0]) + 1]);
                        }
                        break;
                    }
                }
                break;

            case 'n':
                for (const i of [-2, -1, 1, 2]) {
                    for (const j of [-2, -1, 1, 2]) {
                        if (Math.abs(i) === Math.abs(j)) continue;
                        const row = piece.pos[0] + i;
                        const col = piece.pos[1] + j;
                        if (row > 8 || row < 1 || col > 8 || col < 1) continue;
                        const targetPiece = boardArray[row - 1][col - 1];
                        if (targetPiece === null) {
                            possibleMoves.push([row, col]);
                        } else {
                            if (targetPiece[0] !== piece.type[0]) {
                                possibleMoves.push([row, col]);
                            }
                        }
                    }
                }
                break;

            case 'k':
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) continue;
                        const row = piece.pos[0] + i;
                        const col = piece.pos[1] + j;
                        if (row > 8 || row < 1 || col > 8 || col < 1) continue;
                        const targetPiece = boardArray[row - 1][col - 1];
                        if (targetPiece === null) {
                            possibleMoves.push([row, col]);
                        } else {
                            if (targetPiece[0] !== piece.type[0]) {
                                possibleMoves.push([row, col]);
                            }
                        }
                    }
                }
                break;
            default:
                throw new TypeError("Piece Type Mismatch");
        }
        console.log(possibleMoves);
        return possibleMoves;
    }

    const boardClick = (e) => {
        const rect = board.getBoundingClientRect();

        const mouseCol = Math.floor((e.clientX - rect.x - 6) / ((rect.width - 12) / 8)) + 1;
        if (mouseCol > 8 || mouseCol < 0) return;
        const mouseRow = Math.floor((e.clientY - rect.y - 6) / ((rect.height - 12) / 8)) + 1;
        if (mouseRow > 8 || mouseRow < 0) return;

        if (selectedId !== -1) {
            pieces[selectedId].selected = false;
            if (pieces[selectedId].pos[0] === mouseRow && pieces[selectedId].pos[1] === mouseCol) {
                setSelectedId(-1);
                return;
            }
        }

        for (const piece of pieces) {
            if (piece.pos[0] === mouseRow && piece.pos[1] === mouseCol
                && (piece.type[0] === 'w') === whiteMove) {
                setSelectedId(pieces.indexOf(piece));
                piece.selected = true;
                return;
            }
        }

        if (selectedId !== -1) {
            setPieces(prev => {
                const moves = getMoves(selectedId);
                if (!moves.some((e) => (e[0] === mouseRow && e[1] === mouseCol))) {
                    setWhiteMove(prev => (!prev));
                    return prev;
                }
                let toDelete = -1;
                for (const pieceId in prev) {
                    if (pieces[pieceId].pos[0] === mouseRow && pieces[pieceId].pos[1] === mouseCol) {
                        toDelete = pieceId;
                    }
                }
                prev[selectedId].pos = [mouseRow, mouseCol];
                prev[selectedId].moved = true;
                if (toDelete !== -1) prev.splice(toDelete, 1);
                return prev;
            });

            setWhiteMove(prev => (!prev));
            setSelectedId(-1);
        }
    }

    return (
        <div className="board-container">
            <div className="player black">BLACK PLAYER</div>
            <div className="board" onClick={boardClick} ref={el => {
                if (!el) return;
                setBoard(el);
            }}>
                {
                    pieces &&
                    pieces.map((piece, index) => (
                        <Piece
                            pos={piece.pos} src={piece.src} type={piece.type} key={index} selected={piece.selected}
                        />
                    ))
                }
            </div>
            <div className="player white">WHITE PLAYER</div>
        </div>
    );
}

export default Board;