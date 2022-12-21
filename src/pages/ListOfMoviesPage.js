import React, { useState } from "react";
import MovieList from "../features/movie/MovieList";
import "./commonStyles.css";
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import FilterLogo from '../icons/FilterLogo.png'
import "./listOfMoviePage.css";
import Filter from "../features/filter/Filter";

export default function ListOfMoviesPage() {
    const [showFilter, setShowFilter] = useState(false)
    const [filterTags, setFilterTags] = useState([])
    const toggleFilterModal=()=>{
        setShowFilter(!showFilter)
    }
    const onCheckChange=(filterTags)=>{
        setFilterTags(filterTags)
    }
    const groupTagObjByKey=(filterTagObjs)=>{
        return {
            'genre':filterTagObjs.filter((filterTagObj)=>filterTagObj.key=='genre').map(filterTagObj=>filterTagObj.value.toUpperCase()),
            'type':filterTagObjs.filter((filterTagObj)=>filterTagObj.key=='type').map(filterTagObj=>filterTagObj.value.toUpperCase())
        }
    }
    return (
        <>
            <div className={"title"} style={{ "paddingBottom": "32px" }} >
                <span style={{ "float": "left" }} >Now on cinemas</span>
                <Button style={{ "float": "right", "backgroundColor": "#7289DA" }} type="primary" icon={<span>Filter</span>} size={2} onClick={toggleFilterModal}>
                    <img id="filterIcon" src={FilterLogo} />                    
                </Button>                            
            </div>
            {showFilter ? <div><Filter checkedBoxes={filterTags} onCheckChange={onCheckChange}/></div> : <></>}
            <div className={"body"}>
                <MovieList filterTags={groupTagObjByKey(filterTags.map(tag=>JSON.parse(tag)))}/>
            </div>
        </>
    );
}
