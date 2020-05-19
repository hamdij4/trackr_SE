import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, Progress} from 'reactstrap';
import './landing.css'
import Axios from "axios";
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import TaskContainer from '../../components/task-container/task-container'
import DailyContainer from "../../components/daily-container/daily-container";
import HabbitContainer from "../../components/habbit-container/habbit-container";

function LandingScreen() {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("Hamdija");
    const [taskList, setTaskList] = useState([]);
    const [habbitList, setHabbitList] = useState([]);
    const [dailyList, setDailyList] = useState([]);

    useEffect(() => {  
        if(localStorage.getItem("name")){
            setName(localStorage.getItem("name"));
        }
    }, [])

    return (
        <>
        <div
        className="view-container">
            <Container className="view-holder">
                <Row className = "welcome-title">
                    <Col lg={6} md={6} className="welcome-overview-column">
                        <div  className="greetings-name"> 
                        <span className="welcome-text">Hello</span>{name}</div>
                        <div className="greetings" style={{fontSize:"16px", color: "gray", marginTop: "-22px"}}>
                            Welcome to your overview
                        <Progress 
                        striped 
                        color="secondary" 
                        value={50} 
                        style={{minWidth: "250px",
                            maxWidth: "300px", marginTop: "15px"
                        }}></Progress>
                        </div>
                        <div className="points-progress-text">55 / 200</div>
                    </Col>
                    <Col lg={6} md={6} className="stats-overview-column">
                        {/* <div className="stats-title">These are your overall <span className="stats-text"> stats</span></div> */}
                        <div className="stats-title">Your completion <span className="stats-text"> stats</span></div>
                        <Row style={{margin: "0 auto", color: "white"}}>
                            <Col md={4} className="habbit-stats">12</Col>
                            <Col md={4} className="task-stats">4</Col>
                            <Col md={4} className="daily-stats">11</Col>
                        </Row>
                        <div className="stats-title" style={{marginTop: "15px;"}}>Your active challenges</div>
                        <Row style={{margin: "0 auto", color: "white"}}>
                            <Col md={4} className="habbit-stats">Habbits</Col>
                            <Col md={4} className="task-stats">Tasks</Col>
                            <Col md={4} className="daily-stats">Dailies</Col>
                        </Row>
                    </Col>
                </Row>
                <Row className = "task-container">
                    <Col  lg={4}>
                        <HabbitContainer list={taskList}></HabbitContainer>
                    </Col>
                    <Col  lg={4}>
                        <TaskContainer list={taskList}></TaskContainer>
                    </Col>
                    <Col lg={4}>
                        <DailyContainer list={taskList}></DailyContainer>
                    </Col>
                </Row>
            </Container>
                {/* {isLoaded ?
                    (
                        <Container className="card-container">
                            <Row>
                                {taskCards}
                            </Row>
                        </Container>
                    ) : (
                        <h3>Loading items...</h3>
                    )
                } */}
        </div>  
        </>
    )
}

export default LandingScreen;