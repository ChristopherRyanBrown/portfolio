import { Color } from "../../enums/color";

export interface Props
  extends Readonly<{
    color: Color;
    isInCheck: boolean;
    isCheckMate: boolean;
  }> {}
