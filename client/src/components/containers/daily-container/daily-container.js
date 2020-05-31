import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, CardHeader} from 'reactstrap';
import './daily-container.css'
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
import InfoCard from '../../info-card/info-card'
import EditModal from '../../edit-modal/edit-modal'

function DailyContainer(props) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [emptyTasks, setEmptyTasks] = React.useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect( () => {  
        Axios.get('/user/dailies', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.dailies)
            if(res.data.dailies.length == 0){
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      var emptyModel = {
          name: "Title",
          description: "Description",
          points: 15
      }


const DailyCards = taskList.map((model) =>
      <Col lg={12} md={12} sm={12} >
      <InfoCard info={model} type={2} refresh={refresh} setRefresh={setRefresh}></InfoCard>
      </Col>
  )
    return (
        <>
                { openModal ? (<EditModal isOpen={openModal} setOpen={setOpenModal} type={2} data={emptyModel} refresh={refresh} setRefresh={setRefresh} new={true}></EditModal>) : (null) }

                        <Card variant="outlined" className="view-card">
                            <CardHeader  className="daily-card-title" >
                            <span style={{ fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                            fontWeight:"300"}}  className="remove-mobile">
                                            These are your </span> Dailies
                            <Button variant="outlined" 
                                    color="primary" 
                                    className="add-button" 
                                    onClick={()=>{setOpenModal(true)}}
                                    style={{backgroundColor: "#95CCA4"}}>
                                         Create </Button>
                            </CardHeader>
                        <CardContent className="card-content-scroll">
                        {!emptyTasks ?
                        (
                            <Container className="card-container">
                                <Row>
                                    {DailyCards}
                                </Row>
                            </Container>
                        ) : (<div className="no-tasks-available">No dailies available, you should make some!</div>)
                    }
                        </CardContent>
                        </Card>
        </>
    )
}

export default DailyContainer;