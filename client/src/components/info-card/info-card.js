import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container} from 'reactstrap';
import './info-card.css'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

function InfoCard(props) {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <>
        <Card variant="outlined" className="task-card">
            <Row>
                <Col lg={9} md={9} sm={9} className="column">
                      <CardContent>
                          <Typography variant="h5" component="h2">
                              {props.info.name}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                              {props.info.points} Points
                          </Typography>
                      </CardContent>
                      <CardActions className="card-action-bar">
                              <IconButton
                                  onClick={handleExpandClick}
                                  aria-expanded={expanded}
                                  aria-label="show more"
                                  >
                                  <ExpandMoreIcon />
                                  </IconButton>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                          <Typography paragraph>{props.info.description}</Typography>
                          </CardContent>
                      </Collapse>
                      </Col>
                <Col lg={3} md={3} sm={3}  className="column icons" >
                    <IconButton aria-label="plus-one" className="button">
                        <AddIcon />
                    </IconButton>
                    <br></br>
                    <IconButton aria-label="plus-one" className="button">
                        <AddIcon />
                    </IconButton>
                </Col>
            </Row>
        </Card>
        </>
    )
}

export default InfoCard;