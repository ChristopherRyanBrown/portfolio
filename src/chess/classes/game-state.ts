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
  color: Color;

  constructor(board?: Chessboard<Piece>, color?: Color) {
    if (board && color) {
      this.board = board;
      this.color = color;
    } else {
      const initialBoard = new Chessboard<Piece>();

      for (let i = 0; i < 8; i++) {
        initialBoard.addPiece(new Pawn(Color.BLACK, 0), {
          column: i,
          row: 1,
        });
        initialBoard.addPiece(new Pawn(Color.WHITE, 0), {
          column: i,
          row: 6,
        });
      }
      initialBoard.addPiece(new Rook(Color.BLACK, 0), {
        column: 0,
        row: 0,
      });
      initialBoard.addPiece(new Rook(Color.BLACK, 0), {
        column: 7,
        row: 0,
      });
      initialBoard.addPiece(new Rook(Color.WHITE, 0), {
        column: 0,
        row: 7,
      });
      initialBoard.addPiece(new Rook(Color.WHITE, 0), {
        column: 7,
        row: 7,
      });
      initialBoard.addPiece(new Knight(Color.BLACK, 0), {
        column: 1,
        row: 0,
      });
      initialBoard.addPiece(new Knight(Color.BLACK, 0), {
        column: 6,
        row: 0,
      });
      initialBoard.addPiece(new Knight(Color.WHITE, 0), {
        column: 1,
        row: 7,
      });
      initialBoard.addPiece(new Knight(Color.WHITE, 0), {
        column: 6,
        row: 7,
      });
      initialBoard.addPiece(new Bishop(Color.BLACK, 0), {
        column: 2,
        row: 0,
      });
      initialBoard.addPiece(new Bishop(Color.BLACK, 0), {
        column: 5,
        row: 0,
      });
      initialBoard.addPiece(new Bishop(Color.WHITE, 0), {
        column: 2,
        row: 7,
      });
      initialBoard.addPiece(new Bishop(Color.WHITE, 0), {
        column: 5,
        row: 7,
      });
      initialBoard.addPiece(new Queen(Color.BLACK, 0), {
        column: 3,
        row: 0,
      });
      initialBoard.addPiece(new Queen(Color.WHITE, 0), {
        column: 3,
        row: 7,
      });
      initialBoard.addPiece(new King(Color.BLACK, 0), {
        column: 4,
        row: 0,
      });
      initialBoard.addPiece(new King(Color.WHITE, 0), {
        column: 4,
        row: 7,
      });
      this.board = initialBoard;
      this.color = Color.WHITE;
    }

    this.executeMove = this.executeMove.bind(this);
  }

  clone(): GameState {
    return new GameState(this.board.clone(), this.color);
  }

  executeMove(move: Move): GameState {
    this.board.executeMove(move);
    const { end, specialtyMoveType } = move;
    const piece = this.board.at(end);
    if (specialtyMoveType) {
      piece?.specialtyMove?.(move, this.board);
    }
    return new GameState(
      this.board.clone(),
      this.color === Color.BLACK ? Color.WHITE : Color.BLACK,
    );
  }
}
