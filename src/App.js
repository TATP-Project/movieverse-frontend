import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CompletePage from "./pages/CompletePage";
import ListOfMoviesPage from "./pages/ListOfMoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import FoodPage from "./pages/FoodPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ListOfMoviesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/complete" element={<CompletePage />} />
                    <Route path="/food" element={<FoodPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
