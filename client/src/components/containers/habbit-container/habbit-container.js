import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container, CardHeader} from 'reactstrap';
import './habbit-container.css'
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

function HabbitContainer(props) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [emptyTasks, setEmptyTasks] = React.useState(false);
    const [refresh, setRefresh] = useState(false);

    const fetchData = async () => {

        await Axios.get('/user/habbits', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.habbits)
            if(res.data.habbits.length == 0){
                setEmptyTasks(true)
            }
        })
        .catch(error => {
            setEmptyTasks(true)
            console.log("err", error)
        })
        .finally( () => {
            setIsLoaded(true)
        })
    }

    useEffect(() => {  
        fetchData();
    }, [refresh])
    console.log("habbit", refresh)
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      var emptyModel = {
          name: "Title",
          description: "Description",
          points: 15
      }


    const habbitCards = taskList.map((model) =>
    <Col lg={12} md={12} sm={12} >
    <InfoCard info={model} type={0} refresh={refresh} setRefresh={setRefresh}></InfoCard>
    </Col>
)
    return (
        <>
            { openModal ? (<EditModal isOpen={openModal} setOpen={setOpenModal} type={0} data={emptyModel} new={true} refresh={refresh} setRefresh={setRefresh}></EditModal>) : (null) }


                        <Card variant="outlined" className="view-card">
                            <CardHeader  className="habbit-card-title" >
                            <span style={{ 
                                fontSize: "calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)))",
                                 fontWeight:"300"}}  className="remove-mobile">
                                     These are your </span> Habbits
                            <Button variant="outlined" 
                                    color="primary" 
                                    className="add-button" 
                                    onClick={()=>{setOpenModal(true)}}> 
                                    Create </Button>
                            </CardHeader>

                        <CardContent className="card-content-scroll">
                        {!emptyTasks ?
                        (
                            <Container className="card-container">
                                <Row>
                                    {habbitCards}
                                </Row>
                            </Container>
                        ) : (<div className="no-tasks-available">No dailies available, you should make some!</div>)
                    }
                        </CardContent>
                        </Card>
        </>
    )
}

export default HabbitContainer;