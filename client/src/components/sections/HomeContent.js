import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { PageHeader, Drawer, Switch } from 'antd'
import {Form, FormGroup, FormText, Input, Button } from 'reactstrap'
import Select, {components} from 'react-select'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotebookGallery from '../Galleries/NotebookGallery'
import CardGalleryHorizontal from '../Galleries/CardGalleryHorizontal'
import NewNote from '../forms/NewNote'
import { patch } from '../../tools/Restful'


class HomeContent extends Component {
    constructor(props){
        super(props)
        this.state = {
            notebookId: '',
            visible: false,
            newNoteVisible: false,
            notebooks: [],
            selectedNotebook: '',
            name: '',
            public: false,
            noteName: '',
            noteBody: ''
        }
        this.openDrawer = this.openDrawer.bind(this)
        this.closeDrawer = this.closeDrawer.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNewNote = this.handleNewNote.bind(this)
        this.closeNewNote = this.closeNewNote.bind(this)
        this.handleNewNoteText = this.handleNewNoteText.bind(this)
    }
    openDrawer(e){
      
        this.setState({visible: true})
    }
    handleSwitch(e){
        if (this.state.public == false){
            this.setState({public: true})
        } else {
            this.setState({public: false})
        }
        
    }
    findNotebook(id){
      console.log(this.props.Notebooks.find(notebook => notebook._id == id))
       return this.props.Notebooks.find(notebook => notebook._id == id)
    }
    closeDrawer(){
        this.setState({visible: false, selectedNotebook: '', noteBookId: ''})
        
    }
    handleEditButton(e){
        const id = e.target.value
        const selectedNotebook = this.findNotebook(id)
        console.log(selectedNotebook)
        const promise = new Promise((res, reject) => {
            this.setState({selectedNotebook: selectedNotebook, notebookId: id})
            res()
        })
        //this.setState({selectedNotebook: selectedNotebook, notebookId: id})
        promise.then(() => this.openDrawer(id))
        //this.openDrawer(id)
       
    }
    handleNoteInput(e){

    }
    handleSubmit(e){
        let newNotebook = {
            name: {value: this.state.name.toLowerCase().replace(/\s/g, '_'),
            label: this.state.name},
            description: this.state.description,
            notes: this.state.notes,
            public: this.state.public
        }
        console.log(newNotebook)
        patch('notebook', newNotebook, this.state.notebookId).then(() => {
            this.props.updateData()
        })
        this.setState({visible: false})
        

    }
    handleInput(e, state){
        console.log(e)
        this.setState({[state]: e.target.value})
    }
    handleNewNoteText(data){
        console.log(data)
        this.setState({noteBody: data})
    }
    handleNewNote(e){
        this.setState({newNoteVisible: true, notebookId: e.target.value})
    }
    closeNewNote(e){
        this.setState({newNoteVisible: false})
    }
    render(){
    let user2
    let notebooks
    console.log(this.props)
    console.log(this.state)
    
    if (!this.props){
        notebooks = []
        user2 = []
    }   notebooks = this.props.Notebooks
        user2 = this.props.User
        console.log(this.state)
        let selectedNotebook = this.state.selectedNotebook
        console.log(selectedNotebook)
        return (
        
            <div>
                {
                    notebooks.length > 0 ?
                        notebooks.map(notebook => (
                            <div>
                                <PageHeader
                                    title={notebook.name.label}
                                    subTitle={notebook.description}
                                >
                                    <button onClick={(e) => this.handleEditButton(e)} value={notebook._id}>edit notebook</button>
                                    <button onClick={(e) => this.handleNewNote(e)} value={notebook._id}>Create note</button>
                                </PageHeader>
                                <NotebookGallery Data={notebook.entries}/>    
                                  
                            </div>
                        ))
                    :
                       
                    <span></span>
                }
                
                {
                    user2 != undefined ?
                    
                        <button onClick={(e, data) => this.props.handleDrawer(e, {action: "create", model: "notebook"})}>Create a new Notebook</button>
                    :
                        <span>not logged in.</span>
                }
                <Drawer
                    visible={this.state.visible}
                    onClose={this.closeDrawer}
                    placement="bottom"
                    height="400"

                >
                    <Form>
                        <FormGroup>
                            <PageHeader
                                title={this.state.name ? this.state.name
                                    : this.state.selectedNotebook ? this.state.selectedNotebook.name.label
                                        : "loading..."}

                                subTitle={
                                    this.state.description ? this.state.description
                                    : this.state.selectedNotebook ? this.state.selectedNotebook.description
                                        : "loading..."
                                }
                            >
            
                            </PageHeader>
                                
                            <Input type="text" placeHolder={selectedNotebook ? selectedNotebook.name.label : "loading..."} onChange={(e) => this.handleInput(e, 'name')} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" placeholder={selectedNotebook ? selectedNotebook.description : "loading..."} onChange={(e) => this.handleInput(e, 'description')}/>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm={8}>
                                    <Select 
                                        id={'notes'}
                                        closeMenuOnSelect={false}
                                        isMulti
                                        placeholder={`notes`}
                                
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Switch defaultChecked={this.state.selectedNotebook.public} onChange={(e) => this.handleSwitch(e)} />
                                </Col>
                            </Row>
                            
                        </FormGroup>
                        <Button onClick={this.handleSubmit}>Update</Button>
                    </Form>
                </Drawer>
                <Drawer
                    visible={this.state.newNoteVisible}
                    onClose={this.closeNewNote}
                    placement="bottom"
                    height='800'
                >
                    <NewNote
                        NotebookId={this.state.notebookId} 
                        Name={this.state.noteTitle} 
                        Body={this.state.noteBody} 
                        handleInput={this.handleNewNoteText} 
                        handleForm={this.handleInput} 
                    />
                </Drawer>
            </div>
        )
    }
}
export default HomeContent