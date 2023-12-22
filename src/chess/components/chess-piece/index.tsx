import { useMemo } from "react";
import { PieceType } from "../../enums/piece-type";
import { Props } from "./props";
import BlackBishop from "../../assets/BlackBishop.svg";
import BlackKing from "../../assets/BlackKing.svg";
import BlackKnight from "../../assets/BlackKnight.svg";
import BlackPawn from "../../assets/BlackPawn.svg";
import BlackQueen from "../../assets/BlackQueen.svg";
import BlackRook from "../../assets/BlackRook.svg";
import WhiteBishop from "../../assets/WhiteBishop.svg";
import WhiteKing from "../../assets/WhiteKing.svg";
import WhiteKnight from "../../assets/WhiteKnight.svg";
import WhitePawn from "../../assets/WhitePawn.svg";
import WhiteQueen from "../../assets/WhiteQueen.svg";
import WhiteRook from "../../assets/WhiteRook.svg";
import { Color } from "../../enums/color";

export function ChessPiece({ piece }: Props) {
  const { color, type } = piece;

  const image = useMemo(() => {
    const isBlack = color === Color.BLACK;
    switch (type) {
      case PieceType.BISHOP:
        return isBlack ? BlackBishop : WhiteBishop;
      case PieceType.KING:
        return isBlack ? BlackKing : WhiteKing;
      case PieceType.KNIGHT:
        return isBlack ? BlackKnight : WhiteKnight;
      case PieceType.PAWN:
        return isBlack ? BlackPawn : WhitePawn;
      case PieceType.QUEEN:
        return isBlack ? BlackQueen : WhiteQueen;
      case PieceType.ROOK:
        return isBlack ? BlackRook : WhiteRook;
    }
  }, [type]);

  return <img src={image} />;
}
