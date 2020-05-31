import React, { useState, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Row, Form, Label, Input} from 'reactstrap';
import './edit-modal.css'
import { FormGroup } from '@material-ui/core';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';

const EditModal = (props) => {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 25,
      label: '25',
    }
  ];

  const getClassFromType = (type) =>{
      if (type === 0){
          return "habbit"
      } else if (type === 1){
          return "task"
      } else if (type === 2){
          return "daily"
      } else {
        return "default"
    }
  }
  //const [open, setOpen] = useState(props.isOpen)
  const [value, setValue] = React.useState(props.data.points);
  const [data, setData] = useState(props.data)
  const {setOpen} = props;
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  var jwtDecode = require('jwt-decode');
  
  console.log(props.data)

  const handleInputField = useCallback(event => {
    setData({...data, [event.target.name] : event.target.value})
  })

  const editTask = async () => {
    let token = jwtDecode(localStorage.getItem("token"))
    let model = {
      _id : data._id,
      name: data.name,
      description: data.description,
      points: data.points,
      project: "",
      due: Date.now(),
      user: token.id
    }
    await axios.post('/user/editTask', model)
      .then(res => {
        console.log("success")
        setOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(

      )
  }
  const createTask = async () => {
    let token = jwtDecode(localStorage.getItem("token"))
    let option = ""
    let model = {
    }
    if(props.type == 0){
      option += "habbit"
      model = {
        _id : data._id,
        name: data.name,
        description: data.description,
        points: data.points,
        user: "",
        negative_count: 0,
        positive_count: 0,
        user: token.id,
        archived: false,
        type: 0
      }
    } else if (props.type == 1){
      option += "task"
      model = {
        _id : data._id,
        name: data.name,
        description: data.description,
        points: data.points,
        project: "",
        due: Date.now(),
        user: token.id,
        archived: false
      }
    } else if (props.type == 2){
      option += "daily"
      model = {
        _id : data._id,
        name: data.name,
        description: data.description,
        points: data.points,
        count: 0,
        done: false,
        user: token.id,
        archived: false
      }
    }
    await axios.post('/user/' + option, model)
      .then(res => {
        console.log("success")
        setOpen(false)
        props.setRefresh(!props.refresh)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(()=>{
      }
      )
  }

  const deleteItem = async () => {
    let option = ""
    let model = {
      _id : data._id
    }
    if(props.type == 0){
      option += "Habbit"
    } else if (props.type == 1){
      option += "Task"
    } else if (props.type == 2){
      option += "Daily"
    }
    await axios.post('/user/archive' + option, model)
      .then(res => {
        console.log("success")
        setOpen(false)
        props.setRefresh(!props.refresh)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(()=>{
      }
      )
  }

  const toggle = () => setOpen(!props.isOpen);
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={toggle} className={getClassFromType(props.type)}>
        <ModalBody style={{padding: "0"}}>
          <Container >
            <Row className={getClassFromType(props.type)} style={{padding: "10px"}}>
              <Col md={12}  style={{padding: "10px"}}>
                <div className="header">
                  { props.new ? (<span>
                    Add new <span style={{fontWeight: "500", fontSize:"28px"}}>{getClassFromType(props.type)}</span>
                    </span>):(<span>
                    Edit your <span style={{fontWeight: "500", fontSize:"28px"}}>{getClassFromType(props.type)}</span></span>
                    )}
                </div>
                <Form>
                  <FormGroup className="input-form">
                  <Label for="username"> Title
                            </Label>
                            <Input 
                                onChange={handleInputField} 
                                type="text" name="name" 
                                value={data.name}
                                className="field"
                            />
                    <Label for="description"> Description
                            </Label>
                            <Input 
                                onChange={handleInputField} 
                                type="text" name="description" 
                                value={data.description}
                                className="field"
                                style={{minHeight: "200px;"}}
                            />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="details" style={{
                marginTop: "15px", fontSize: "14px", color: "gray", alignItems:"center"
              }}>
                Points
            <span style={{marginLeft: "10px", fontWeight: "500", fontSize: "22px"}}>{value}</span>
              </Col>
              <Col md={12} className="details">
                <Slider
                  className="point-slider"
                  aria-labelledby="discrete-slider-restrict"
                  step={5}
                  valueLabelDisplay="auto"
                  marks={marks}
                  max={25}
                  style={{marginTop: "15px"}}
                  value={props.data.points}
                  onChange={handleSliderChange}
                />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter className="footer">
          { props.new ? (null): (<>
          <Button color="warning" onClick={toggle} onClick={()=> {
            deleteItem()
          }}>Remove</Button>{' '}
          </>)}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="success" onClick={toggle} onClick={()=> {
            if(props.new == true){
                createTask()
            } else {editTask()}
          }}>Save</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditModal;