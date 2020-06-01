import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, CardHeader} from 'reactstrap';
import './task-container.css'
import Axios from "axios";
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfoCard from '../../info-card/info-card'
import EditModal from '../../edit-modal/edit-modal'

function TaskContainer(props) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [habbitList, setHabbitList] = useState([]);
    const [dailiesList, setDailiesList] = useState([]);
    const [emptyTasks, setEmptyTasks] = React.useState(false);
    const [emptyHabbits, setEmptyHabbits] = React.useState(false);
    const [emptyDailies, setEmptyDailies] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);

    useEffect(() => {  
        Axios.get('/user/tasks', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.tasks)
            if(res.data.tasks.length == 0){
                setEmptyTasks(true)
            }
        })
        .catch(error => {
            setEmptyTasks(true)
            console.log(error)
        })
        .finally( () => {
            setIsLoaded(true)
        })
    }, [refresh])

    var emptyModel = {
        name: "Title",
        description: "Description",
        points: 15
    }
  

    const taskCards = taskList.map((model) =>{
        return model.finish != null ? 
        null
        :
        <Col lg={12} md={12} sm={12} >
        <InfoCard info={model} type={1} refresh={refresh} setRefresh={setRefresh}></InfoCard>
        </Col>
    }
    )

    return (
        <>
            { openModal ? (<EditModal isOpen={openModal} setOpen={setOpenModal} type={1} data={emptyModel} new={true} refresh={refresh} setRefresh={setRefresh}></EditModal>) : (null) }
            <Card variant="outlined" className="view-card">
                    <CardHeader  className="task-card-title" >
                    <span style={{ fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))", fontWeight:"300"}}
                     className="remove-mobile">These are your </span> Tasks
                    <Button variant="outlined" color="primary" className="add-button" onClick={()=>{setOpenModal(true)}}> Create </Button>
                    </CardHeader>
                <CardContent className="card-content-scroll">
                    {!emptyTasks ?
                        (
                            <Container className="card-container">
                                <Row>
                                    {taskCards}
                                </Row>
                            </Container>
                        ) : (<div className="no-tasks-available">No tasks available, you should make one!</div>)
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default TaskContainer;