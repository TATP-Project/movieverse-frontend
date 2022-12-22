import React from "react";
import FoodList from "../features/food/FoodList";
import StatusBar from "../features/movie/StatusBar";

export default function ListOfMoviesPage() {
    return (
        <div>
            <StatusBar stage={2} />
            <FoodList />
        </div>
    );
}
