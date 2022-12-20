import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CompletePage from "./pages/CompletePage";
import ListOfMoviesPage from "./pages/ListOfMoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import TicketInfoPage from "./pages/TicketInfoPage";
import SeatSelection from "./features/seats/SeatSelection";
import MovieTimeslotsPage from "./pages/MovieTimeslotsPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ListOfMoviesPage />} />
                    <Route path="/new-order" element={<SeatSelection />} />
                    <Route
                        path="/movie-timeslots"
                        element={<MovieTimeslotsPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/complete" element={<CompletePage />} />
                    <Route path="/ticketinfo" element={<TicketInfoPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
