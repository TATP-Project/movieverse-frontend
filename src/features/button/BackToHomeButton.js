import React from 'react'
import { Button } from 'antd';
import './BackToHomeButton.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSeatsStatus } from '../seats/seatSelectionSlice';
import { updateSeatsByMovieSessionId } from '../../api/movieSessions';
import { toggleLoading } from '../loading/loadingSlice';

export function cleanCacheAndRedirect(navigate, dispatch, seatSelection) {
    const AVAILABLE = "AVAILABLE";

    if (seatSelection && seatSelection.seats && seatSelection.seats.length > 0) {
        dispatch(toggleLoading(1))
        updateSeatsByMovieSessionId(
            seatSelection.movieSessionId,
            seatSelection.seats.map((seat) => {
                return {...seat, 'status':AVAILABLE};
            })
        ).then((response) => { })
            .finally(() => {
                dispatch(toggleLoading(-1))
                navigate('/');
                navigate(0);
            })
    } else {
        navigate('/');
        navigate(0);
    }
}

export default function BackToHomeButton() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const seatSelection = useSelector((state) => state.seatSelection);
    return (
        <div className="sessionExpired">
            <p>Session Not Found/Expired</p>
            <Button className={"button"} onClick={() => cleanCacheAndRedirect(navigate, dispatch, seatSelection)}>
                Back To Home
            </Button>
        </div>
    )
}
