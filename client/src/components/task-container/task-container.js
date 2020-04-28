import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container} from 'reactstrap';
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

function TaskContainer(props) {
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {  
        Axios.get('/user/tasks', { headers : {'auth' : localStorage.getItem("token")}})
        .then(res => {
            setTaskList(res.data.tasks)
            console.log(res.data.tasks)
        })
        .catch(error => {
            console.log(error)
        })
        .finally( () => {
            //refresh()
            setIsLoaded(true)
        })
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const taskCards = taskList.map((model) =>

      <Col lg={12} md={12} sm={12} >
      <InfoCard info={model}></InfoCard>
      </Col>
  )
    return (
        <>
                        <Card variant="outlined" className="view-card">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                These are your
                            </Typography>
                            <Typography variant="h5" component="h2">
                            Tasks
                            </Typography>
                {isLoaded ?
                    (
                        <Container className="card-container">
                            <Row>
                                {taskCards}
                            </Row>
                        </Container>
                    ) : (
                        <h3>Loading items...</h3>
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