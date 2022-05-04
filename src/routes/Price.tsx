import { fetchExchange } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

interface KEY {
    price: number;
    volume_24h: number;
}

interface Quotes {
    USD: KEY;
}

interface IExchange {
    exchange_id: string;
    exchange_name: string;
    pair: string;
    base_currency_id: string;
    base_currency_name: string;
    quote_currency_id: string;
    quote_currency_name: string;
    market_url: string;
    category: string;
    fee_type: string;
    outlier: boolean;
    adjusted_volume_24h_share: number;
    quotes: Quotes;
    last_updated: Date;
}

interface exchangeProps {
    coinId: string;
}

const Container = styled.div`
    background: #000;
    border-radius: 5px;
    padding: 20px;
`;
const Bold = styled.div`
    font-weight: 600;
    font-size: 15px;
`;
const Volume = styled(Bold)`
    color: tomto;
`;

function Price({ coinId }: exchangeProps) {
    const { isLoading, data } = useQuery<IExchange[]>(
        ["exchange", coinId],
        () => fetchExchange(coinId),
        {
            refetchInterval: 5000,
        }
    );

    return (
        <Container>
            {isLoading ? (
                <Bold>"Loading price.."</Bold>
            ) : (
                <div>
                    {data?.slice(0, 10).map((coin) => (
                        <Bold>
                            {coin.exchange_name} $ {coin.quotes.USD.price}
                        </Bold>
                    ))}
                </div>
            )}
        </Container>
    );
}
export default Price;
