import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/:coinId/*" element={<Coin />} />
                <Route path="/" element={<Coins />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
