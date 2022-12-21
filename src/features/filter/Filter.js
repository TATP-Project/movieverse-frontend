import React from 'react'
import './Filter.css'
import FilterModal from '../../icons/FilterModal.png'
import { Checkbox, Col, Row } from 'antd';

export default function Filter(props) {
    const genreOption = [
        'Action', 'Adventure', 'Drama',
        'Comedy', 'Fantasy', 'Horror',
        'Romance', 'Western'
    ]
    const typeOption = [
        '2D', '3D', '4DX',
        'MX4D'
    ]
    return (
        <div id='filterModalContainer'>
            <img src={FilterModal} alt="error" />
            <div id='filterContentContainer'>
                <Checkbox.Group style={{ width: '100%' }} defaultValue={props.checkedBoxes} onChange={props.onCheckChange}>
                    <Row>
                        <Col span={24}><h2>Genre</h2></Col>
                        {genreOption.map((genre) => {
                            return <Col key={genre} span={8}>
                                <Checkbox value={JSON.stringify({"key":"genre","value":genre})}>{genre}</Checkbox>
                            </Col>
                        })}
                        <Col span={24}><h2>Type</h2></Col>
                        {typeOption.map((type) => {
                            return <Col key={type} span={8}>
                                <Checkbox key={type} value={JSON.stringify({"key":"type","value":type})}>{type}</Checkbox>
                            </Col>
                        })}
                    </Row>
                </Checkbox.Group>
            </div>
        </div>
    )
}
