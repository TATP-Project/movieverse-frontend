import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CompletePage from "./pages/CompletePage";
import ListOfMoviesPage from "./pages/ListOfMoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import TicketInfoPage from "./pages/TicketInfoPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import MovieTimeslotsPage from "./pages/MovieTimeslotsPage";
import FoodPage from "./pages/FoodPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ListOfMoviesPage />} />
                    <Route path="/new-order" element={<SeatSelectionPage />} />
                    <Route
                        path="/movie-timeslots"
                        element={<MovieTimeslotsPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/food" element={<FoodPage />} />
                    <Route path="/complete" element={<CompletePage />} />
                    <Route path="/ticketinfo" element={<TicketInfoPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
