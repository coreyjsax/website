import React from "react"
import {Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import styles from '../Galleries/CardGalleryStyles.css'
const NotebookGallery = (props) => {
    console.log(props)
    return (
        <div className="wrapper-horizontal">
            {
                props.Data ?
                    props.Data.length >= 1 ? props.Data.map(card =>(

                        <Card className="card">
                            <CardBody>
                                <CardTitle>
                                    {card.name.label}
                                </CardTitle>
                                <CardSubtitle>
                                    {card.summary}
                                </CardSubtitle>
                            </CardBody>
                           
                        </Card>
                    
                    ))
                    : <span>No Notebooks</span>
                :   <span></span>
            }
        </div>
    )
}
export default NotebookGallery