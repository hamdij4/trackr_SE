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

function LandingScreen() {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [alert, setAlert] = useState(false);
    const [name, setName] = useState("user");
    const [taskList, setTaskList] = useState([]);
    const [habbitList, setHabbitList] = useState([]);
    const [dailyList, setDailyList] = useState([]);

    useEffect(() => {  
    }, [])

    return (
        <>
        <div
        className="view-container">
            <Container style={{maxWidth: "80%"}}>
                <Row className = "welcome-title">
                    <Col>
                    <Typography variant="h1" gutterBottom>
                        Hello {name}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Here is your overview
                    </Typography>
                    </Col>
                </Row>
                <Row className = "task-container">
                    <Col>
                        <Card variant="outlined" className="view-card">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                These are your
                            </Typography>
                            <Typography variant="h5" component="h2">
                            Habbits
                            </Typography>
                        </CardContent>
                        </Card>
                    </Col>
                    <Col>
                        <TaskContainer list={taskList}></TaskContainer>
                    </Col>
                    <Col>
                        <Card variant="outlined" className="view-card">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                These are your
                            </Typography>
                            <Typography variant="h5" component="h2">
                            Dailies
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                        </Card>
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