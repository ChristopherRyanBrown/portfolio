import { Box } from "@mui/material";
import { useMemo } from "react";
import { PieceType } from "../../enums/piece-type";
import { Props } from "./props";

export function ChessPiece({ piece }: Props) {
  const { type } = piece;

  const image = useMemo(() => {
    switch (type) {
      case PieceType.BISHOP:
        return "B";
      case PieceType.KING:
        return "K";
      case PieceType.KNIGHT:
        return "Kn";
      case PieceType.PAWN:
        return "P";
      case PieceType.QUEEN:
        return "Q";
      case PieceType.ROOK:
        return "R";
    }
  }, [type]);

  return <Box>{image}</Box>;
}
