import { Chessboard } from "./chessboard";
import { Color } from "../enums/color";
import { Pawn } from "./pieces/pawn";
import { Piece } from "./piece";
import { Move } from "../types/move";
import { Knight } from "./pieces/knight";
import { Rook } from "./pieces/rook";
import { Bishop } from "./pieces/bishop";
import { Queen } from "./pieces/queen";
import { King } from "./pieces/king";

export class GameState {
  board: Chessboard<Piece>;

  constructor(board?: Chessboard<Piece>) {
    if (board) {
      this.board = board;
    } else {
      const initialBoard = new Chessboard<Piece>();

      for (let i = 0; i < 8; i++) {
        initialBoard.addPiece(new Pawn(Color.BLACK, false), {
          column: i,
          row: 1,
        });
        initialBoard.addPiece(new Pawn(Color.WHITE, false), {
          column: i,
          row: 6,
        });
      }
      initialBoard.addPiece(new Rook(Color.BLACK, false), {
        column: 0,
        row: 0,
      });
      initialBoard.addPiece(new Rook(Color.BLACK, false), {
        column: 7,
        row: 0,
      });
      initialBoard.addPiece(new Rook(Color.WHITE, false), {
        column: 0,
        row: 7,
      });
      initialBoard.addPiece(new Rook(Color.WHITE, false), {
        column: 7,
        row: 7,
      });
      initialBoard.addPiece(new Knight(Color.BLACK, false), {
        column: 1,
        row: 0,
      });
      initialBoard.addPiece(new Knight(Color.BLACK, false), {
        column: 6,
        row: 0,
      });
      initialBoard.addPiece(new Knight(Color.WHITE, false), {
        column: 1,
        row: 7,
      });
      initialBoard.addPiece(new Knight(Color.WHITE, false), {
        column: 6,
        row: 7,
      });
      initialBoard.addPiece(new Bishop(Color.BLACK, false), {
        column: 2,
        row: 0,
      });
      initialBoard.addPiece(new Bishop(Color.BLACK, false), {
        column: 5,
        row: 0,
      });
      initialBoard.addPiece(new Bishop(Color.WHITE, false), {
        column: 2,
        row: 7,
      });
      initialBoard.addPiece(new Bishop(Color.WHITE, false), {
        column: 5,
        row: 7,
      });
      initialBoard.addPiece(new Queen(Color.BLACK, false), {
        column: 3,
        row: 0,
      });
      initialBoard.addPiece(new Queen(Color.WHITE, false), {
        column: 3,
        row: 7,
      });
      initialBoard.addPiece(new King(Color.BLACK, false), {
        column: 4,
        row: 0,
      });
      initialBoard.addPiece(new King(Color.WHITE, false), {
        column: 4,
        row: 7,
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
