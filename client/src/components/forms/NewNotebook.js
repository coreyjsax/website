import React from "react"
import { Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Switch, Icon } from 'antd'
import { post } from '../../tools/Restful'

class NewNotebookForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            label: '',
            value: '',
            description: '',
            notes: '',
            public: true,
            formCompleted: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleInput(event, state){
        this.setState({[state]: event.target.value})
        //console.log((event.target.value).toLowerCase().replace(/\s/g, '_'))
        event.preventDefault()
    }
    handlePublic(event){
        this.setState({public: event})
    }
    handleSubmit(){
        let newNotebook = this.state
            newNotebook.value = newNotebook.label.toLowerCase().replace(/\s/g, '_')
            if (newNotebook.label != '') {
                this.setState({formCompleted: true})
            }
        let submitNotebook = () => new Promise((resolve) => resolve(post(`notebook`, newNotebook)))
        submitNotebook().then(data => console.log(data)).catch(err => console.log(err))
    }
    
    render(){
       console.log(this.state)
        return (
            <div>
                <Container>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Notebook Name</Label>
                        <Input type="text" name="label" placeholder="name..." onChange={(event) => this.handleInput(event, 'label')} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Description</Label>
                        <Input type="textarea" name="description" placeholder="description..." onChange={(event) => this.handleInput(event, 'description')} />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        tags go here
                    </FormGroup>
                    <FormGroup>
                        notes go here
                    </FormGroup>
                    <FormGroup>
                        <Label>Public?  </Label>
                        <Switch
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                            defaultChecked
                            onChange={(e) => this.handlePublic(e)}
                         />
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                    
                    </Form>
                </Container>
            </div>
            
        )
    }
}
export default NewNotebookForm