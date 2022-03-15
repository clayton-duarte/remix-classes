import {
  ScrollRestoration,
  LiveReload,
  Scripts,
  Outlet,
  Links,
  Meta,
} from "remix";
import type { MetaFunction } from "remix";
import { Theme, ThemeProvider, Global, css } from "@emotion/react";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

const theme: Theme = {
  primary: "#00ADB5",
  secondary: "#393E46",
  warn: "#FFC300",
  error: "#FF1818",
  black: "#222831",
  white: "#EEEEEE",
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Global
            styles={(theme) => css`
              html {
                font-size: 16px;
                color: ${theme.black};
                background: ${theme.white};
              }

              body {
                font-family: sans-serif;
                padding: 1rem;
                margin: 0;
              }

              a:visited,
              a:active,
              a:hover,
              a:focus,
              a {
                color: inherit;
              }

              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                text-transform: capitalize;
              }
            `}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
