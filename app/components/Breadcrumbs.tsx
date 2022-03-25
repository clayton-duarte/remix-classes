import styled from "@emotion/styled";
import { Link } from "remix";

const Wrapper = styled.nav`
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
`;

export default function Breadcrumbs() {
  return (
    <Wrapper>
      <Link to="home">/</Link>
    </Wrapper>
  );
}
