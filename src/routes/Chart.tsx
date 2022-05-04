import { useQuery } from "react-query";
import { fetchCoinHistroy } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}
interface ChartProps {
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistroy(coinId),
        {
            refetchInterval: 5000,
        }
    );
    const mappedOhlcvData = data?.map((data: IHistorical) => ({
        x: data.time_open,
        y: [
            data.open.toFixed(2),
            data.high.toFixed(2),
            data.low.toFixed(2),
            data.close.toFixed(2),
        ],
    }));
    return (
        <div>
            {isLoading ? (
                "Loading chart.."
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[{ data: mappedOhlcvData }] as unknown as number[]}
                    options={{
                        theme: {
                            mode: "dark",
                        },

                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => price.time_close),
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default Chart;
