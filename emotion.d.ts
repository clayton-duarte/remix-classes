import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    primary: string;
    secondary: string;
    success: string;
    warn: string;
    error: string;
    black: string;
    white: string;
  }
}
