import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
`;
const Loader = styled.span`
    text-align: center;
    display: center;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;
interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    /*     const [coins, setCoins] = useState<ICoin[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []); */
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>"Loading.."</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={`/${coin.id}`}
                                state={{ name: coin.name }}
                            >
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                                />
                                {coin.name}&rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}
export default Coins;
