import {
  ScrollRestoration,
  MetaFunction,
  LiveReload,
  Scripts,
  Outlet,
  Links,
  Link,
  Meta,
} from "remix";
import { Theme, ThemeProvider, Global, css } from "@emotion/react";
import styled from "@emotion/styled";

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
  position: sticky;
  display: grid;
  padding: 1rem;
  gap: 1rem;
  top: 0;
`;

const FakeLogo = styled.h1`
  font-size: 1.25rem;
`;

const FooterLayout = styled.footer`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  grid-area: footer;
  display: grid;
  gap: 1rem;
`;

const ContentLayout = styled.article`
  grid-template-columns: minmax(200px, auto) 1fr;
  grid-template-rows: repeat(4, auto);
  justify-content: stretch;
  align-items: flex-start;
  grid-area: content;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "role role-data"
    "power power-data"
    "class class-data"
    "race race-data";
`;

const theme: Theme = {
  primary: "#17405F",
  secondary: "#4B4C4D",
  success: "#619768",
  warn: "#D8941B",
  error: "#961233",
  black: "#231F1F",
  white: "#FEFEFE",
  bg: "#DCDBCC",
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export function links() {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: true,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cinzel&family=Spectral&display=swap",
    },
  ];
}

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
              <Link to="/">
                <FakeLogo>Character Builder</FakeLogo>
              </Link>
            </HeaderLayout>
            <ContentLayout>
              <Outlet />
            </ContentLayout>
            <FooterLayout>todo: footer</FooterLayout>
          </PageLayout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Global
            styles={(theme) => css`
              html,
              body {
                background: ${theme.white};
                font-family: "Spectral", serif;
                color: ${theme.black};
                font-size: 16px;
                height: 100%;
                margin: 0;
              }

              button {
                font-family: "Spectral", serif;
                font-size: 1rem;
              }

              a:visited,
              a:active,
              a:hover,
              a:focus,
              a {
                text-decoration: none;
                color: inherit;
              }

              a:hover {
                text-decoration: underline;
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
                font-family: "Cinzel", serif;
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
