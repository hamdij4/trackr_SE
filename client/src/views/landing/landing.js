import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container} from 'reactstrap';
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
import IconButton from '@material-ui/core/IconButton';
import TaskContainer from '../../components/task-container/task-container'
import DailyContainer from "../../components/daily-container/daily-container";
import HabbitContainer from "../../components/habbit-container/habbit-container";

function LandingScreen() {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("user");
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
            <Container style={{maxWidth: "80%"}}>
                <Row className = "welcome-title">
                    <Col>
                        <span className="greetings">Hello</span>
                        <span  className="greetings-name">{name}</span>
                        <div className="greetings" style={{fontSize:"16px", color: "gray", marginTop: "-22px"}}>Welcome to your <i>overview</i></div>
                    </Col>
                </Row>
                <Row className = "task-container">
                    <Col>
                        <HabbitContainer list={taskList}></HabbitContainer>
                    </Col>
                    <Col>
                        <TaskContainer list={taskList}></TaskContainer>
                    </Col>
                    <Col>
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