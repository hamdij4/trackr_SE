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
   
    return (
        <>
        <div className="view-holder">  
        <Container>
            <Row>
                <Col lg={6} md={6} className="welcome-overview-column">
                    <div  className="greetings-name"> 
                    <span className="welcome-text">This is </span> Project Name</div>
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={12}>
                    <Row style={{flexDirection: "column"}}>
                        <Col>
                            <Card variant="outlined" className="project-tasks">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        Active tasks</span>
                                </CardHeader>
                            <CardContent >
                                Tasks baby
                            </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} sm={12}>
                    <Row style={{flexDirection: "column"}}>
                        <Col>
                            <Card variant="outlined" className="small-card">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        Members </span>
                                </CardHeader>
                            <CardContent >
                                Tasks baby
                            </CardContent>
                            </Card>
                        </Col>
                        <Col>
                            <Card variant="outlined" className="small-card">
                                <CardHeader>
                                <span style={{ 
                                    fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                    fontWeight:"300"}}>
                                        History </span>
                                </CardHeader>
                            <CardContent >
                                Tasks baby
                            </CardContent>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    )
}

export default ProjectScreen;