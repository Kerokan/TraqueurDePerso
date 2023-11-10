import { styled } from 'styled-components';
import { colors } from './assets/colors';
import { InitiativeList } from './initiativeList';

function App() {

  return (
    <Container>
      <InitiativeList/>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.white};

  font-family: 'Roboto', sans-serif;
`;

export default App
