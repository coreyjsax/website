import React from 'react'
import { CardText } from "reactstrap"
import ItemCard from './ItemCard'
import 'toasted-notes/src/styles.css'
import IngredientCard from './IngredientCard'
import LocationCard from './LocationsCard'

const DynamicCard = (props) => {
    
    const card = props.data
    const model = props.model
    const title = props.title
    const tags = props.tags

    const cardSectionsByModel = (model) => {
        
        switch(model){
            case 'item':
                console.log(card)
                return <ItemCard data={card} title={title} model={model} />
            case 'ingredient':
                return <IngredientCard data={card} title={title} model={model} tags={tags} />
            case 'menu':
                return <CardText>menu card text</CardText>
            case 'category': 
                return <CardText>category card text</CardText>
            case 'tag':
                return <CardText>tag card text</CardText>
            case 'ingredient':
                return <CardText>ingredient card text</CardText>
            case 'ordertype':
                return <CardText>order-type card text</CardText>
            case 'locations':
                return <LocationCard data={card} title={title} model={model}/>
            
                
            default: 
                return <span></span>
        }
    }
    return cardSectionsByModel(model)
}
export default DynamicCard