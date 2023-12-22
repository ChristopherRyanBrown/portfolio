import Box from "@mui/material/Box";
import { Props } from "./props";
import { ChessPiece } from "../chess-piece";
import { useMemo } from "react";

export function Cell({
  availableMoves,
  color,
  currentPlayer,
  onMove,
  onSelect,
  piece,
  position: { column, row },
  selectedCell,
}: Props) {
  const move = useMemo(
    () =>
      availableMoves.find(({ end }) => end.column === column && end.row == row),
    [availableMoves, column, row],
  );

  return (
    <Box
      height={80}
      width={80}
      onClick={() => onSelect(undefined)}
      sx={{ backgroundColor: color }}
    >
      <Box
        height="100%"
        width="100%"
        onClick={() => move && onMove(move)}
        sx={
          move && {
            backgroundColor: "rgba(255, 255, 0, 0.4)",
            cursor: "pointer",
          }
        }
      >
        {piece && (
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="center"
            width="100%"
            onClick={(evt) => {
              if (currentPlayer !== piece.color) {
                return;
              }
              if (!selectedCell) {
                evt.stopPropagation();
              }
              onSelect({ column, row });
            }}
            sx={{
              backgroundColor:
                selectedCell?.column === column && selectedCell?.row === row
                  ? "rgba(255, 255, 0, 0.6)"
                  : undefined,
              cursor: "pointer",
            }}
          >
            <ChessPiece piece={piece} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
