import { ReactNode } from "react";

import { Theme, ThemeProvider, Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MetaFunction,
  LiveReload,
  useCatch,
  Scripts,
  Outlet,
  Links,
  Link,
  Meta,
} from "remix";

import { ToasterProvider } from "~/helpers/useToaster";

const RootLayout = styled.main`
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  align-items: flex-start;
  display: grid;
  padding: 0;
  gap: 1rem;
`;

const HeaderLayout = styled.header`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  grid-template-columns: auto 1fr;
  justify-content: flex-start;
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

const ContentLayout = styled.article`
  grid-auto-flow: row;
  display: grid;
  padding: 1rem;
  gap: 1rem;
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

function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <RootLayout>
        <HeaderLayout>
          <Link to="/">
            <summary>{`D&D4 Tools`}</summary>
          </Link>
        </HeaderLayout>
        <ToasterProvider>
          <ContentLayout>{children}</ContentLayout>
        </ToasterProvider>
      </RootLayout>
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
            margin: 0;
          }

          button {
            font-family: "Cinzel", serif;
            font-weight: 700;
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

          [role="button"],
          button,
          a {
            cursor: pointer;
          }

          p,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          legend,
          summary {
            margin: 0;
            &:first-letter {
              text-transform: capitalize;
            }
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
            font-weight: 700;
            line-height: 1;
          }

          ul,
          ol {
            padding: 0 0 0 1rem;
            margin: 0;
            li {
              list-style: none;
            }
          }
        `}
      />
    </ThemeProvider>
  );
}

// TODO
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <h1>Oh no!</h1>
          {/* add the UI you want your users to see */}
          <Link to="/">Go home</Link>
          <Scripts />
        </Layout>
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
          <Link to="/">Go home</Link>
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
