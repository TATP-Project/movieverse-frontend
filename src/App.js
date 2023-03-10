import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import CompletePage from "./pages/CompletePage";
import ListOfMoviesPage from "./pages/ListOfMoviesPage";
import NotFoundPage from "./pages/NotFoundPage";
import TicketInfoPage from "./pages/TicketInfoPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import MovieTimeslotsPage from "./pages/MovieTimeslotsPage";
import FoodPage from "./pages/FoodPage";
import { useSelector } from "react-redux";

function App() {
    const spinCircle = useSelector((state) => state.loading)
    return (
        <div className="App">
            {spinCircle ? <span className="loading" /> : <></>}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<ListOfMoviesPage />} />
                    <Route path="/movie-timeslots" element={<MovieTimeslotsPage />} />
                    <Route path="/new-order" element={<SeatSelectionPage />} />                    
                    <Route path="/food" element={<FoodPage />} />                    
                    <Route path="/ticketinfo" element={<TicketInfoPage />} />
                    <Route path="/complete" element={<CompletePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
