import { Chessboard } from "./chessboard";
import { Color } from "../enums/color";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./piece";
import { Move } from "../types/move";
import { King } from "./pieces/king";

export class GameState {
  board: Chessboard<Piece>;

  constructor(board?: Chessboard<Piece>) {
    if (board) {
      this.board = board;
    } else {
      const initialBoard = new Chessboard<Piece>();
      initialBoard.addPiece(new Pawn(Color.WHITE, false), {
        column: 4,
        row: 3,
      });
      initialBoard.addPiece(new King(Color.WHITE, false), {
        column: 3,
        row: 5,
      });
      this.board = initialBoard;
    }

    this.executeMove = this.executeMove.bind(this);
  }

  clone(): GameState {
    return new GameState(this.board.clone());
  }

  executeMove(move: Move): GameState {
    return new GameState(this.board.executeMove(move));
  }
}
