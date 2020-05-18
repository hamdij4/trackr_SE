import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container} from 'reactstrap';
import './info-card.css'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import EditModal from "../edit-modal/edit-modal";

function InfoCard(props) {

    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);

    const getMainColor = () => {
        if(props.type == 1) {
            return "#C9A2CA"
        } else if (props.type == 0){
            return "#F3BF71"
        } else if (props.type == 2){
            return "#95CCA4"
        } else {
            return "black"
        }
    }  
    const getAccentColor = () => {
        if(props.type == 1) {
            return "#B289B2"
        } else if (props.type == 0){
            return "#E3B36B"
        } else if (props.type == 2){
            return "#85B592"
        } else {
            return "black"
        }
    } 

    return (
        <>
        <Card variant="outlined" className="task-card"
            style={{borderColor: getMainColor()}}>
            <Row>
                <Col lg={9} md={9} sm={9} className="description-column" onClick={() => {setOpenModal(!openModal)}}>
                    { openModal ? (<EditModal isOpen={openModal} type={props.type} data={props.info}></EditModal>) : (null) }
                    <Row className="title-row">
                                <Typography variant="h6" component="h2">
                                    {props.info.name}
                                  <Chip     
                                    className="points-badge"
                                    label={props.info.points + " pts"} 
                                    variant="outlined" 
                                    size="small"
                                    style={{backgroundColor: getMainColor(), borderColor:  getMainColor(),
                                     marginLeft: "10px"}}/>
                                </Typography>
                                <div
                        className="info-column">
                                </div>
                    </Row>
                    <Row className="content-row">
                            <CardContent
                                className="card-content">
                                <div className="description-text">
                                            {props.info.description}
                                            </div>
                            </CardContent>
                    </Row>
                    <Row 
                        className="info-column">
                            Due date and info
                    </Row>
            </Col>
            <Col lg={3} md={3} sm={3}>
                <Row
                className="finished-button"
                style={{ backgroundColor: getMainColor()}}>
                    <span className="plus-sign"
                    style={{color: "white", fontSize: "32px", fontWeight: "500", backgroundColor:  getMainColor()}}>
                        +
                    </span>
                </Row>
                <Row
                className="info-button"
                style={{ backgroundColor: getAccentColor()}}>
                <span className="plus-sign" 
                style={{color: "white", fontSize: "32px", fontWeight: "500"}}>
                    -
                </span>
                </Row>
            </Col>
            </Row>
        </Card>
        </>
    )
}

export default InfoCard;