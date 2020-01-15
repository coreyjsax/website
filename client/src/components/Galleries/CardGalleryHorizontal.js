import React from "react";
import {Container, Row, Col} from "reactstrap"

import DynamicCard from './Cards/DynamicCard'
import { createReadStream } from "fs"

class CardGalleryHorizontal extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){

        const cards = this.props.data
        const title = this.props.title
        const model = this.props.model
        const tags = this.props.tags
        const items = this.props.items
        const locations = this.props.locations
         console.log(cards)
        return (
            <div
                className="wrapper-horizontal"
            >
                {
                    this.props.data ?
                    this.props.data.length >= 1 ? cards.map(card => 
                    <DynamicCard
                        title={title}
                        data={card}
                        model={model}
                        tags={tags}
                        items={items}
                        locations={locations}
                    />
                    )
                    : <span></span>
                :<span></span>
                }
            </div>
        )
    }
   
}
export default CardGalleryHorizontal