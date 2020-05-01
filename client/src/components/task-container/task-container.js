import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, CardHeader} from 'reactstrap';
import './task-container.css'
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
import InfoCard from '../../components/info-card/info-card'
import EditModal from '../../components/edit-modal/edit-modal'

function TaskContainer(props) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [habbitList, setHabbitList] = useState([]);
    const [dailiesList, setDailiesList] = useState([]);
    const [emptyTasks, setEmptyTasks] = React.useState(false);
    const [emptyHabbits, setEmptyHabbits] = React.useState(false);
    const [emptyDailies, setEmptyDailies] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    useEffect(() => {  
        Axios.get('/user/tasks', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.tasks)
            console.log(res.data.tasks)
            if(res.data.tasks.length == 0){
                setEmptyTasks(true)
            }
        })
        .catch(error => {
            setEmptyTasks(true)
            console.log(error)
        })
        .finally( () => {
            // var testModel = {
            //     name: "John Doe's task",
            //     description: "A task John Doe has to do",
            //     points: 25
            // }
            // var array = []
            // array.push(testModel)
            // array.push(testModel)
            // setTaskList(array)
            setIsLoaded(true)
        })
    }, [])

    var emptyModel = {
        name: "Title",
        description: "Description",
        points: 15
    }
  

    const taskCards = taskList.map((model) =>
            <Col lg={12} md={12} sm={12} >
            <InfoCard info={model} type={1}></InfoCard>
            </Col>
        )

    return (
        <>
            { openModal ? (<EditModal isOpen={openModal} type={1} data={emptyModel} new={true}></EditModal>) : (null) }
                        <Card variant="outlined" className="view-card">
                            <CardHeader  className="task-card-title" >
                            <span style={{ fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))", fontWeight:"300"}}>These are your </span> Tasks
                            <Button variant="outlined" color="primary" className="add-button" onClick={()=>{setOpenModal(true)}}> Create </Button>
                            </CardHeader>
                        <CardContent>
                {!emptyTasks ?
                    (
                        <Container className="card-container">
                            <Row>
                                {taskCards}
                            </Row>
                        </Container>
                    ) : (
                        <div className="no-tasks-available">No tasks available, you should make one!</div>
                    )
                }
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                        </Card>
        </>
    )
}

export default TaskContainer;