import React from "react"
import { NavLink as RouterNavLink, Link } from "react-router-dom";
//import {Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap"
import { Card, Icon, Avatar, Button} from 'antd'
import styles from '../Galleries/CardGalleryStyles.css'
const { Meta } = Card

const NotebookGallery = (props) => {
    console.log(props)
    return (
        <div className="wrapper-horizontal">
            {
                props.Data ?
                    props.Data.length >= 1 ? props.Data.map(card =>(
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
                                props.User ? 
                                    props.User.email == 'corey@pizzaluce.com' ? 
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
                    ))
                    : <span>This notebook is empty</span>
                :   <span></span>
            }
        </div>
    )
}
export default NotebookGallery