import { useMemo } from "react";
import { Theme, ThemeProvider, Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  // ScrollRestoration,
  MetaFunction,
  LiveReload,
  useParams,
  Scripts,
  Outlet,
  Links,
  Link,
  Meta,
} from "remix";

import {
  CharacterPowerSource,
  CharacterClassName,
  CharacterRaceName,
  CharacterRole,
} from "~/helpers/dataTypes";

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
  grid-template-columns: auto 1fr;
  justify-content: flex-start;
  grid-area: header;
  position: sticky;
  display: grid;
  padding: 1rem;
  z-index: 999;
  gap: 1rem;
  top: 0;
  @media all and (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
`;

const BreadCrumbs = styled.nav`
  justify-content: flex-start;
  text-transform: capitalize;
  grid-auto-flow: column;
  align-items: center;
  font-size: 0.825rem;
  display: grid;
  gap: 1rem;
  @media all and (max-width: 768px) {
    gap: 0.5rem;
  }
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
  grid-template-columns: minmax(200px, auto) calc(50% - 200px - 1rem) 1fr;
  grid-template-rows: repeat(4, auto);
  justify-content: stretch;
  align-items: flex-start;
  grid-auto-flow: column;
  grid-area: content;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "role-title . ."
    "role-select role-data char-data"
    "power-title . char-data"
    "power-select power-data char-data"
    "class-title . char-data"
    "class-select class-data char-data"
    "race-title . char-data"
    "race-select race-data char-data";
  @media all and (max-width: 768px) {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "role-title ."
      "role-select role-data"
      "power-title ."
      "power-select power-data"
      "class-title ."
      "class-select class-data"
      "race-title ."
      "race-select race-data"
      "char-data char-data";
  }
`;

const theme: Theme = {
  primary: "#17405F",
  secondary: "#6B6C6D",
  success: "#619768",
  warn: "#D8941B",
  error: "#961233",
  black: "#231F1F",
  white: "#FEFEFE",
  bg: "#DCDBCC",
};

type RouteParams = {
  characterRole: CharacterRole;
  characterPower: CharacterPowerSource;
  characterClassName: CharacterClassName;
  characterRaceName: CharacterRaceName;
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
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Spectral:wght@400;700&display=swap",
    },
  ];
}

export default function App() {
  const {
    characterRole,
    characterPower,
    characterClassName,
    characterRaceName,
  } = useParams<RouteParams>();

  const pathParts = useMemo(
    () =>
      [
        characterRole,
        characterPower,
        characterClassName,
        characterRaceName,
      ].filter(Boolean),
    [characterRole, characterPower, characterClassName, characterRaceName]
  );

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
              <FakeLogo>Character Builder</FakeLogo>
              <BreadCrumbs>
                <Link to="/">home</Link>
                {pathParts.map((param, index) =>
                  pathParts.length === index + 1 ? (
                    <p key={param}>{param}</p>
                  ) : (
                    <Link
                      to={pathParts.slice(0, index + 1).join("/")}
                      key={param}
                    >
                      {param}
                    </Link>
                  )
                )}
              </BreadCrumbs>
            </HeaderLayout>
            <ContentLayout>
              <Outlet />
            </ContentLayout>
            <FooterLayout>todo: footer</FooterLayout>
          </PageLayout>
          <Global
            styles={(theme) => css`
              html,
              body {
                background: ${theme.white};
                font-family: "Spectral", serif;
                color: ${theme.black};
                line-height: 1.2;
                font-weight: 400;
                font-size: 16px;
                height: 100%;
                margin: 0;
              }

              button {
                font-family: "Spectral", serif;
                line-height: 1.2;
                font-size: 1rem;
              }

              a:visited,
              a:active,
              a:hover,
              a:focus,
              a {
                text-decoration: underline;
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
              h6,
              legend,
              summary {
                font-family: "Cinzel", serif;
                text-transform: capitalize;
                font-weight: 700;
                line-height: 1;
                margin: 0;
              }
            `}
          />
        </ThemeProvider>
        <LiveReload />
        {/* <ScrollRestoration /> */}
        <Scripts />
      </body>
    </html>
  );
}
