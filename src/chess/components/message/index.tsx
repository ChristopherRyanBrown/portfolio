import Box from "@mui/material/Box";
import { Props } from "./props";
import { Color } from "../../enums/color";

export function Message({ color, isCheckMate, isInCheck }: Props) {
  return (
    <Box
      alignItems="center"
      color="gold"
      display="flex"
      flexDirection="column"
      fontSize={40}
      height={640}
      justifyContent="center"
      left={0}
      position="absolute"
      top={0}
      width={640}
      sx={{
        pointerEvents: "none",
        textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
      }}
    >
      {isCheckMate && (
        <Box alignItems="center" display="flex" flexDirection="column">
          <Box>Checkmate</Box>
          <Box>{color === Color.BLACK ? "Player 1 Wins" : "Player 2 Wins"}</Box>
        </Box>
      )}
      <Box
        sx={{
          opacity: isInCheck && !isCheckMate ? 1 : 0,
          transition: "opacity 2s",
        }}
      >
        Check
      </Box>
    </Box>
  );
}
