import styled from "@emotion/styled";

const BuilderLayout = styled.section`
  grid-template-columns: minmax(200px, auto) calc(50% - 200px - 1rem) 1fr;
  align-items: flex-start;
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "role-title . char-data"
    "role-select role-data char-data"
    "power-title . char-data"
    "power-select power-data char-data"
    "class-title . char-data"
    "class-select class-data char-data"
    "race-title . char-data"
    "race-select race-data char-data"
    ". . char-data";
  @media all and (max-width: 768px) {
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.5rem;
    grid-template-areas:
      "role-title role-select"
      "role-data role-data"
      "power-title power-select"
      "power-data power-data"
      "class-title class-select"
      "class-data class-data"
      "race-title race-select"
      "race-data race-data"
      "char-data char-data";
  }
`;

export default BuilderLayout;
