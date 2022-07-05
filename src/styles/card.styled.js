import styled from "styled-components";

export const CardsContainer = styled.section`
  margin: 50px;
`;

export const Card = styled.div`
  background-color: hsl(60, 40%, 100%);
  border: 1px solid hsl(0, 0%, 87%);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border-radius: 3px;
  max-width: 450px;
`;

export const CardTitle = styled.div`
  color: hsl(0, 1%, 38%);
  border-bottom: 1px solid hsl(0, 0%, 87%);
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;

export const CardBody = styled.div`
  color: hsl(0, 1%, 38%);
  padding: 10px;
`;