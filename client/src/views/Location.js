import React, { Fragment }  from "react"

import {
    Badge, Button, Card, CardBody, CardTitle,
    ListGroupItem, ListGroup, Container, Row, Col, UncontrolledCollapse
} from "reactstrap"

import Hero from "../components/Hero";
import Content from "../components/Content";
import Locationheader from "../components/Locationheader"
import CardGalleryHorizontal from '../components/Galleries/CardGalleryHorizontal'

class Location extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            locations: [],
            items: [],
            promos: [],
            slices: [],
            untappd_menus: [],
            positions: [],
        }
        this.fetchData = this.fetchData.bind(this)
    }
    fetchData(model, id){
        let url = `https://blooming-lowlands-36532.herokuapp.com/api/${model}/full`
        
        return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (model == 'item'){
                console.log('item hit')
                return data.map(obj => (
                    {	id: obj._id, label: obj.name.label, 
                        value: obj.name.value, 
                        title: obj.name.label, 
                        description: obj.description,
                        locations: obj.locations,
                        image: obj.image.url,
                        tags: obj.tags
                     }
                ))
            } else if (model == 'location'){
                console.log('location hit')
                return data.map(location => (
                    {
                        id: location._id, label: location.name.label,
                        value: location.name.value,
                        title: location.name.label,
                        address: location.address 
                    }
                ))
            }
        }).catch(err => err)
    }
    componentDidMount(){
        const fD = this.fetchData

        return Promise.all([
            fD('location'), fD('item')
        ])
        .then(([locs, items]) => {
           
            this.setState({
                locations: locs,
                items: items
            })
        }).catch(err => err)
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <h1 className="category-title">location page</h1>
                <Fragment>
                    <Hero 
                        
                    />
                    <CardGalleryHorizontal />
                    <hr />
                    <Content />
                </Fragment>
            </div>
        )
    }
}
export default Location