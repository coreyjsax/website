import React from "react"
import { Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Switch, Icon } from 'antd'
import { patch } from '../../tools/Restful'
import { faThList } from "@fortawesome/free-solid-svg-icons";

class EditNotebookForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            label: '',
            value: '',
            description: '',
            notes: '',
            public: true,
            formCompleted: false,
            selectedForm: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePublic = this.handlePublic.bind(this)
    }
    handleInput(event, state){
        this.setState({[state]: event.target.value})
        //console.log((event.target.value).toLowerCase().replace(/\s/g, '_'))
        
    }
    
    handlePublic(event){
        this.setState({public: event})
    }
    handleSubmit(){

        let newNotebook = {
            name: {value: this.state.label.toLowerCase().replace(/\s/g, '_'),
            label: this.state.label},
            description: this.state.description,
            notes: this.state.notes,
            public: this.state.public
        }

        if (newNotebook.name.value == '' || newNotebook.description == ''){
            this.setState({formCompleted: false})
        }
            
        let submitNotebook = () => new Promise((resolve) => resolve(patch(`notebook`, newNotebook)))
        submitNotebook().then(data => console.log(data)).catch(err => console.log(err))
    }
    componentDidMount(){
        let notebook = this.props.notebooks.find(notebook => notebook._id == this.props.notebookId)
        this.setState({selectedForm : notebook})
    }
    render(){
        console.log(this.props)
        return (
            <div>
                <Container>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input type="text" name="label" placeholder="name..." defaultValue={this.props.name} onChange={event => this.handleInput(event, 'label')}  />
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
export default EditNotebookForm