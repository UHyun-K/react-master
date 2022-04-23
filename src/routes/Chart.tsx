import { useQuery } from "react-query";
import { fetchCoinHistroy } from "../api";

interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
        fetchCoinHistroy(coinId)
    );
    return <h1>Chart</h1>;
}

export default Chart;
