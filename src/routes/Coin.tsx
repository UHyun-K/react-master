import { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
`;
const Loader = styled.span`
    text-align: center;
    display: center;
`;

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();

    interface RouterState {
        name: string;
    }
    const state = useLocation().state as RouterState;
    console.log(state);

    return (
        <Container>
            <Header>
                <Title>{state?.name || `Loading...`}</Title>
            </Header>
            {loading ? <Loader>"Loading.."</Loader> : null}
        </Container>
    );
}
export default Coin;
