import React from "react"
import { useAuth0 } from "../react-auth0-spa";
import { Card, CardTitle, CardText, Col, Row, Button, Form, FormGroup, Label, Nav, NavItem, NavLink, Input, TabContent} from 'reactstrap';
//import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Tabs, Select } from 'antd';
import NewCategory from '../components/forms/NewCategory'
import classnames from 'classnames';



//import './index.css';


const { TabPane } = Tabs;
const { Option } = Select;


class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tabPosition: 'top',
        }
        this.toggle = this.toggle.bind(this)
        this.callback = this.callback.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    toggle = (event, state, index) => {
        event.preventDefault()
        this.setState({
            [state]: index
        })
    }
    callback(key) {
        console.log(key)
    }
    changeTabPosition = tabPosition => {
    this.setState({ tabPosition })
    }
    fetchData(model){
        return 
    }
    componentDidMount(){

    }
    
    render(){
        const { size } = this.state;
        console.log(this.state)
        return (
            <div>
        <div style={{ marginBottom: 16 }}>
          Tab position：
          <Select
            value={this.state.tabPosition}
            onChange={this.changeTabPosition}
            dropdownMatchSelectWidth={false}
          >
            <Option value="top">top</Option>
            <Option value="bottom">bottom</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
          </Select>
        </div>
        <Tabs tabPosition={this.state.tabPosition}>
          <TabPane tab="Category" key="1">
            
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
      </div>
            
        )
    }
}
export default Admin