import React, { Fragment, useEffect } from "react"
import Restful, {FetchData} from "../tools/Restful"
import Hero from "../components/Hero"
import Content from "../components/Content"
import HomeContent from "../components/sections/HomeContent"
import Drawer from "../components/Drawer"
import NewNotebookForm from "../components/forms/NewNotebook"
import EditNotebookForm from "../components/forms/EditNotebook"
import { Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Switch, Icon } from 'antd'
import { post } from '../tools/Restful'
//import { changeConfirmLocale } from "antd/lib/modal/locale"


class Home extends React.Component {
  constructor(props){
    super(props);
    this.drawerElement = React.createRef()
    this.drawerElement2 = React.createRef()
      this.state = {
        models: ['notebook'],
        selectedModel: '',
        notebooks: [],
        user: '',
        notebookId: '',
        selectedNotebook:''
      }
      this.getData = this.getData.bind(this)
      this.handleDrawer = this.handleDrawer.bind(this)
      this.updateData = this.updateData.bind(this)
  }
  getData(){
    
    return Promise.all([FetchData('notebook')])
    .then(([notebooks]) => this.setState({notebooks: notebooks}))
    .catch(err => err)
  
  }
  componentDidMount(){
    this.getData()
  }
  updateData(){
    this.getData()
  }
  handleDrawer(e, data){
     console.log(data)
    if (data.notebookId){
      let selectedNotebook = this.state.notebooks.find(notebook => notebook._id == data.notebookId)
      this.setState({action: data.action, selectedModel: data.model, notebookId: data.notebookId, selectedNotebook: selectedNotebook})
      this.drawerElement2.current.openDrawer()
    }
    //this.setState({action: data.action, selectedModel: data.model})
    
  }
  lookupNotebook(){
    return this.state.locations.find(notebook => notebook._id == this.state.notebookId)
    
  }
  render(){
    console.log(this.state)
    return (
      <Fragment>
        <Hero />
        <hr />
        <HomeContent 
            Notebooks={this.state.notebooks} 
            handleDrawer={this.handleDrawer} 
            User={this.props.User} 
            updateData={this.updateData} 
        />
        <Content />
      </Fragment>
      
    )
  }
  
}

export default Home;
