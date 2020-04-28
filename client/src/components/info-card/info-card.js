import React, { useState, useCallback, useEffect} from "react";
import { Col, Row, Container} from 'reactstrap';
import './info-card.css'
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';

function InfoCard(props) {

    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    return (
        <>
        <Card variant="outlined" className="task-card">
            <Row className="title-row">
                          <Typography variant="h6" component="h2">
                              {props.info.name}
                          </Typography>
            </Row>
            <Row className="content-row">
                <Col lg={3} md={3} sm={3} className="checkbox-custom">
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="default"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Col>
                <Col lg={8} md={8} sm={8} className="column">
                      <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                              {props.info.points} Points
                          </Typography>
                      </CardContent>
                      <CardActions className="card-action-bar">
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                          <Typography paragraph>{props.info.description}</Typography>
                          </CardContent>
                      </Collapse>
                </Col>
            </Row>
            {/* <Row className="footer-row">
                                <IconButton
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </IconButton>
                    {/* <IconButton aria-label="plus-one" className="button">
                        <AddIcon />
                    </IconButton>

                    <IconButton aria-label="plus-one" className="button">
                        <AddIcon />
                    </IconButton> }
                    </Row> */}
        </Card>
        </>
    )
}

export default InfoCard;