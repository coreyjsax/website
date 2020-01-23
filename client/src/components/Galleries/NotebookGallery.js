import React from "react"
import {
    RouterNavLink as Navlink,
    Link, Route, 
    BrowserRouter as Router,
    Switch, useHistory, useLocation,
    useParams
} from "react-router-dom";
//import {Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { Card, Drawer, Icon, Avatar, Button} from 'antd'
import styles from '../Galleries/CardGalleryStyles.css'
import Hero from '../Hero'
import Location from '../../views/Location'
const { Meta } = Card


function Modal(){
    const showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    
    const onClose = () => {
        this.setState({
            visible: false,
        });
    };

    
        return(
            <div
                style={{
                    height: 200,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid #ebedf0',
                    borderRadius: 2,
                    padding: 48,
                    textAlign: 'center',
                    background: '#fafafa',
                }}
            >
               
            </div>
        )
    
}


class NotebookGallery extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    showDrawer = () => {
        this.setState({visible: true})
    }
    onClose = () => {
        this.setState({
            visible: false,
          })
    }
    render(){
        return (
            <div className="wrapper-horizontal">
                <Router>
                {
                    this.props.Data ?
                        this.props.Data.length >= 1 ? this.props.Data.map(card =>(
                            <>
                            <Link to={`/entry/${card._id}`}>
                            <Card
                                className="card"
                                style={{"margin": "3px"}}
                                cover={
                                    <img
                                      alt="example"
                                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                
                                actions={
                                    this.props.User ? 
                                        this.props.User.email == 'corey@pizzaluce.com' ? 
                                            [   <Icon type="setting" key="setting" />,
                                                <Icon type="edit" key="edit" />,
                                                <Icon type="delete" key="delete" />
                                            ]
                                        :
                                       ""
                                    : 
                                    [
                                       <> <Icon type="read" key="read" /><span>read</span></>
                                    ]
                                }
                                hoverable={true}
                            >
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={card.title.value}
                                description={card.summary}
                            />
                            </Card>
                            </Link>
                            
                            </>
                        ))
                        : <span>This notebook is empty</span>
                    :   <span></span>
                }
                <Route path='/entry/:id' component={() => <Hero />} />
                </Router>
            </div>
        )
    }
    
}
export default NotebookGallery