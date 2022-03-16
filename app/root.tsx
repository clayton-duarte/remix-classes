import {
  ScrollRestoration,
  MetaFunction,
  LiveReload,
  Scripts,
  Outlet,
  Links,
  Meta,
} from "remix";
import { Theme, ThemeProvider, Global, css } from "@emotion/react";
import styled from "@emotion/styled";

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

const PageLayout = styled.main`
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  display: grid;
  height: 100%;
  padding: 0;
  gap: 1rem;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

const HeaderLayout = styled.header`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  grid-area: header;
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const FooterLayout = styled.footer`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  grid-area: footer;
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const ContentLayout = styled.article`
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);
  justify-content: stretch;
  align-items: flex-start;
  grid-area: content;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "role race race race race"
    "power race race race race"
    "class race race race race";
`;

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
          <PageLayout>
            <HeaderLayout>
              <h1>Character Builder</h1>
            </HeaderLayout>
            <ContentLayout>
              <Outlet />
            </ContentLayout>
            <FooterLayout>footer</FooterLayout>
          </PageLayout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Global
            styles={(theme) => css`
              html,
              body {
                background: ${theme.white};
                font-family: sans-serif;
                color: ${theme.black};
                font-size: 16px;
                height: 100%;
                margin: 0;
              }

              a:visited,
              a:active,
              a:hover,
              a:focus,
              a {
                color: inherit;
              }

              p {
                margin: 0;
              }

              h1,
              h2,
              h3,
              h4,
              h5,
              h6 {
                text-transform: capitalize;
                margin: 0;
              }

              section {
                display: grid;
                justify-content: stretch;
                align-items: flex-start;
                gap: 1rem;
              }

              div {
                display: grid;
                justify-content: stretch;
                align-items: flex-start;
                gap: 1rem;
              }
            `}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
