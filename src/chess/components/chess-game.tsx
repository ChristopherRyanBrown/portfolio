import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";
import { GameState } from "../classes/game-state";
import { Position } from "../types/position";
import { Cell } from "./cell";

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
    return piece?.getAvailableMoves(selectedCell, board) ?? [];
  }, [board, selectedCell]);

  const grid = useMemo(
    () =>
      new Array(8)
        .fill(null)
        .map((_, row) =>
          new Array(8).fill(null).map((_, column) => board.at({ column, row })),
        ),
    [availableMoves, board, selectedCell],
  );

  useEffect(() => {
    setSelectedCell(undefined);
  }, [board]);

  return (
    <Box display="flex" flexDirection="column">
      {grid.map((columns, row) => (
        <Box display="flex" flexDirection="row" key={row}>
          {columns.map((piece, column) => (
            <Cell
              availableMoves={availableMoves}
              color={(row + column) % 2 === 0 ? "tan" : "brown"}
              currentPlayer={color}
              piece={piece}
              position={{ column, row }}
              selectedCell={selectedCell}
              onMove={(move) => setChessGame(executeMove(move))}
              onSelect={setSelectedCell}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
