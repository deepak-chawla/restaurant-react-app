import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input, FormFeedback} from 'reactstrap';
import { Field } from 'react-redux-form';

class CommentForm extends React.Component{

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        
        this.state = {
          isModalOpen: false,
          firstname: '',
          touched:{
              firstname: false
          }
        };
    }

    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) =>{
        this.setState({
            touched:{...this.state.touched, [field]:true}
        });
    }

    validate(firstname){
        const errors = {firstname: ''};
        if(this.state.touched.firstname && firstname.length < 3 )
            {errors.firstname = 'Name character length should be 3'}
        else if(this.state.touched.firstname && firstname.length > 15 )
            {errors.firstname = 'Name character length should be less than 15'} 
    }

    
    render(){
        const errors = this.validate(this.state.firstname);
        return(
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    placeholder="Your Name"
                                    value={this.state.firstname}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')}
                                    onChange={this.handleInputChange} />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <textarea className="form-control" rows="8" type="text"id="comment" name="comment"/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit Comment</Button>
                        </Form>
            </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
            <span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
        </div>
        );
    }
}

export default CommentForm;