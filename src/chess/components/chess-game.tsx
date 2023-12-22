import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { GameState } from "../classes/game-state";
import { Position } from "../types/position";
import { ChessPiece } from "./chess-piece";

export function ChessGame() {
  const [{ board, color, executeMove }, setChessGame] = useState(
    () => new GameState(),
  );
  const [selectedCell, setSelectedCell] = useState<Position>();

  const availableMoves = useMemo(() => {
    if (!selectedCell) {
      return [];
    }
    const piece = board.at(selectedCell);
    return (
      piece?.getAvailableMoves(selectedCell, board).map(({ end }) => end) ?? []
    );
  }, [board, selectedCell]);

  const grid = useMemo(
    () =>
      new Array(8).fill(null).map((_, row) =>
        new Array(8).fill(null).map((_, column) => {
          const piece = board.at({ column, row });
          const isAvailableForMove = !!availableMoves.find(
            (position) => position.row === row && position.column === column,
          );
          const isSelected =
            selectedCell?.column === column && selectedCell?.row === row;
          return { isAvailableForMove, isSelected, piece };
        }),
      ),
    [availableMoves, board, selectedCell],
  );

  useEffect(() => {
    setSelectedCell(undefined);
  }, [board]);

  return (
    <Box display="flex" flexDirection="column">
      {grid.map((row, i) => (
        <Box display="flex" flexDirection="row" key={i}>
          {row.map(({ isAvailableForMove, isSelected, piece }, j) => (
            <Box
              key={j}
              color={piece?.color}
              height={80}
              width={80}
              onClick={() => setSelectedCell(undefined)}
              sx={{ backgroundColor: (i + j) % 2 === 0 ? "tan" : "brown" }}
            >
              <Box
                height="100%"
                width="100%"
                onClick={() =>
                  isAvailableForMove &&
                  setChessGame(
                    executeMove({
                      end: { column: j, row: i },
                      start: selectedCell!,
                    }),
                  )
                }
                sx={
                  isAvailableForMove
                    ? {
                        backgroundColor: "rgba(255, 255, 0, 0.4)",
                        cursor: "pointer",
                      }
                    : null
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
                      if (color !== piece.color) {
                        return;
                      }
                      if (!selectedCell) {
                        evt.stopPropagation();
                      }
                      setSelectedCell({ column: j, row: i });
                    }}
                    sx={{
                      backgroundColor: isSelected
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
          ))}
        </Box>
      ))}
    </Box>
  );
}
