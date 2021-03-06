import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  useEffect,
} from "react";

import styled from "@emotion/styled";
import { BiX } from "react-icons/bi";

import { Colors, StatusColors } from "~/helpers/types";

const ToasterWrapper = styled.div<{ color: Colors }>`
  box-shadow: 0 0 1rem 2px ${({ theme }) => theme.black}33;
  border: 2px solid ${({ theme, color }) => theme[color]};
  background: ${({ theme }) => theme.white};
  width: calc(100% - 2rem);
  align-items: center;
  position: sticky;
  max-width: 425px;
  margin: 0 auto;
  display: grid;
  bottom: 1rem;
  z-index: 999;
  gap: 0;
`;

const ContentWrapper = styled.div`
  padding: 0.5rem;
`;

const TitleWrapper = styled.legend<{ color: Colors }>`
  color: ${({ theme, color }) => (color === "bg" ? theme.black : theme.white)};
  background: ${({ theme, color }) => theme[color]};
  justify-content: space-between;
  grid-auto-flow: column;
  align-items: center;
  padding: 0.5rem;
  display: grid;
`;

const IconButton = styled.button`
  color: ${({ theme }) => theme.white};
  margin-bottom: -0.25rem;
  background: transparent;
  font-size: 1.5rem;
  border: none;
  padding: 0;
`;

interface ToasterState {
  content: ReactNode;
  status: StatusColors;
  onClose?: (...args: unknown[]) => void;
  dismissible?: boolean;
  title?: string;
}

function Toaster({
  dismissible = true,
  content,
  onClose,
  status,
  title,
}: ToasterState) {
  return (
    <ToasterWrapper color={status}>
      <TitleWrapper color={status}>
        <span>{title ?? status}</span>
        {dismissible && (
          <IconButton onClick={onClose}>
            <BiX />
          </IconButton>
        )}
      </TitleWrapper>
      <ContentWrapper>{content}</ContentWrapper>
    </ToasterWrapper>
  );
}

const ToasterContext = createContext<
  [ToasterState | null, Dispatch<ToasterState | null>] | null
>(null);

export function ToasterProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [toasterProps, setToasterProps] = useState<ToasterState | null>(null);

  return (
    <ToasterContext.Provider value={[toasterProps, setToasterProps]}>
      {children}
      {toasterProps && (
        <Toaster
          {...toasterProps}
          onClose={() => {
            setToasterProps(null);

            toasterProps.onClose?.();
          }}
        />
      )}
    </ToasterContext.Provider>
  );
}

export default function useToaster() {
  const context = useContext(ToasterContext);

  useEffect(() => {
    // just call this on component unmount
    return () => setToasterProps(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (context === null) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }

  const [toasterProps, setToasterProps] = context;

  return { showToaster: setToasterProps, toaster: toasterProps };
}
