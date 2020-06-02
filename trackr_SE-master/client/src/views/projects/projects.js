import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, Progress, CardHeader} from 'reactstrap';
import './projects.css'
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
import TaskContainer from '../../components/containers/task-container/task-container'
import DailyContainer from "../../components/containers/daily-container/daily-container";
import HabbitContainer from "../../components/containers/habbit-container/habbit-container";

function ProjectScreen() {

    const [taskList, setTaskList] = useState([])
    const [habbitList, setHabbitList] = useState([])
    const [dailyList, setDailyList] = useState([])
    const [emptyTask, setEmptyTasks] = useState(true)
    const [empptyHabbit, setEmptyHabbit] = useState(true)
    const [emptyDaily, setEmptyDaily] = useState(true)


    useEffect(() => { 
        //tasks 
        Axios.get('/user/allTasks', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.tasks)
            if(res.data.tasks.length == 0){
                setEmptyTasks(true)
            }
            setEmptyTasks(false)
        })
        .catch(error => {
            setEmptyTasks(true)
            console.log(error)
        })
        .finally( () => {
        })
        //habbits
        Axios.get('/user/allHabbits', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setHabbitList(res.data.habbits)
            if(res.data.habbits.length == 0){
                setEmptyHabbit(true)
            }
            setEmptyHabbit(false)
        })
        .catch(error => {
            setEmptyHabbit(true)
            console.log(error)
        })
        .finally( () => {
        })
        //dailies
        Axios.get('/user/allDailies', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setDailyList(res.data.dailies)
            if(res.data.dailies.length == 0){
                setEmptyDaily(true)
            }
            setEmptyDaily(false)
        })
        .catch(error => {
            setEmptyDaily(true)
            console.log(error)
        })
        .finally( () => {
        })

    }, [])
    const getDate = (date) => {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('-');
    }
    const allDaily = dailyList.map((model) =>{
        return model.finished == null ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#95CCA4", fontSize: "12px", paddingLeft: "5px"}}>Daily</span></div>
                <div className="bottom-left">
                    { model.finished != null && model.archived == true ? "Archived " + getDate(model.finished) : null}
                    { model.finished != null && model.archived == false ? "Finished " + getDate(model.finished) : null}
                </div>
            </CardContent>
        </Card>
    }
    )

    const allTasks = taskList.map((model) =>{
        return model.finish == null ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#C9A2CA", fontSize: "12px", paddingLeft: "5px"}}>Task</span></div>
                <div className="bottom-left">
                    { model.archived == true ? "Archived " + getDate(model.finish) : null}
                    {  model.archived == false ? "Finished " + getDate(model.finish) : null}
                </div>
            </CardContent>
        </Card>
    }
    )

    const allHabbit = habbitList.map((model) =>{
        return model.archived == false ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#E3B36B", fontSize: "12px", paddingLeft: "5px"}}>Habbit</span></div>
                <div className="bottom-left">
                    {"Archived,  positive : " + model.positive_count + " |  negative : "+ model.negative_count}
                </div>
            </CardContent>
        </Card>
    }
    )


    const archivedDaily = dailyList.map((model) =>{
        return model.archived != true ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#95CCA4", fontSize: "12px", paddingLeft: "5px"}}>Daily</span></div>
                <div className="bottom-left">
                    {"Archived " + getDate(model.finished)}
                </div>
            </CardContent>
        </Card>
    }
    )

    const archivedTask = taskList.map((model) =>{
        return model.archived != true ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#95CCA4", fontSize: "12px", paddingLeft: "5px"}}>Task</span></div>
                <div className="bottom-left">
                   { "Archived " + getDate(model.finished)}
                </div>
            </CardContent>
        </Card>
    }
    )
    const archivedHabbit = habbitList.map((model) =>{
        return model.archived != true ? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#E3B36B", fontSize: "12px", paddingLeft: "5px"}}>Habbit</span></div>
                <div className="bottom-left">
                {"Archived,  positive : " + model.positive_count + " |  negative : "+ model.negative_count }
                </div>
            </CardContent>
        </Card>
    }
    )

    const finishTask = taskList.map((model) =>{
        return model.finish != null  && model.archived == false? 
        null
        :
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#95CCA4", fontSize: "12px", paddingLeft: "5px"}}>Task</span></div>
                <div className="bottom-left">
                    {"Finished " + getDate(model.finished) }
                </div>
            </CardContent>
        </Card>
    }
    )

    const finishDaily = taskList.map((model) =>{
        return model.finished != null  && model.archived == false? 
        <Card variant="outlined" className="history-item">
            <CardContent className="history-card">
                <div className="top-left">{model.name + " "} <span style={{color: "#C9A2CA", fontSize: "12px", paddingLeft: "5px"}}>Daily</span></div>
                <div className="bottom-left">
                   {"Finished " + getDate(model.finished)}
                </div>
            </CardContent>
        </Card>
        :
        null
    }
    )

    return (
        <>
        <div className="view-holder">  
        <Container>
            <Row>
                <Col lg={4} md={4} className="welcome-overview-column">
                            <Card variant="outlined" className="project-card">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        History </span>
                                </CardHeader>
                            <CardContent className="scrolly-boi">
                                { emptyDaily ? null : allDaily }
                                { emptyTask ? null : allTasks }
                                { empptyHabbit ? null : allHabbit }
                            </CardContent>
                            </Card>
                </Col>
                <Col lg={4} md={4} className="welcome-overview-column">
                            <Card variant="outlined" className="project-card">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        Archived </span>
                                </CardHeader>
                            <CardContent className="scrolly-boi">
                                { emptyDaily ? null : archivedDaily }
                                { emptyTask ? null : archivedTask }
                                { empptyHabbit ? null : archivedHabbit }
                            </CardContent>
                            </Card>
                </Col>
                <Col lg={4} md={4} >
                            <Card variant="outlined" className="project-card">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        Finished </span>
                                </CardHeader>
                            <CardContent className="scrolly-boi">
                                { emptyDaily ? null : finishTask }
                                { emptyTask ? null : finishDaily }
                            </CardContent>
                            </Card>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    )
}

export default ProjectScreen;