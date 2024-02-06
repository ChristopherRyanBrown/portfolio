import { Color } from "../../../enums/color";
import { Move } from "../../../types/move";
import { Position } from "../../../types/position";
import { Chessboard } from "../../chessboard";
import { Piece } from "../../piece";

export function getHorizontalAndVerticalMoves(
  color: Color,
  position: Position,
  chessboard: Chessboard<Piece>,
): Move[] {
  const endPositions = new Array<Position>();

  const { column, row } = position;

  for (let i = row - 1; i >= 0; i--) {
    const newPosition: Position = { row: i, column };
    const piece = chessboard.at(newPosition);
    if (piece) {
      if (piece.color !== color) {
        endPositions.push(newPosition);
      }
      break;
    } else {
      endPositions.push(newPosition);
    }
  }

  for (let i = row + 1; i < 8; i++) {
    const newPosition: Position = { row: i, column };
    const piece = chessboard.at(newPosition);
    if (piece) {
      if (piece.color !== color) {
        endPositions.push(newPosition);
      }
      break;
    } else {
      endPositions.push(newPosition);
    }
  }

  for (let i = column - 1; i >= 0; i--) {
    const newPosition: Position = { row, column: i };
    const piece = chessboard.at(newPosition);
    if (piece) {
      if (piece.color !== color) {
        endPositions.push(newPosition);
      }
      break;
    } else {
      endPositions.push(newPosition);
    }
  }

  for (let i = column + 1; i < 8; i++) {
    const newPosition: Position = { row, column: i };
    const piece = chessboard.at(newPosition);
    if (piece) {
      if (piece.color !== color) {
        endPositions.push(newPosition);
      }
      break;
    } else {
      endPositions.push(newPosition);
    }
  }

  return endPositions.map((end: Position): Move => ({ end, start: position }));
}
