import React from "react"


import {
    Container, Row, Col
} from 'reactstrap'

class Locationheader extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            defaultModal: false,
            locations: []
        }
    }
    toggleAlert = state => {
        this.setState({
            [state]: !this.state[state]
        })
    }
    render(){
        return (
            <>
            <div
            className="header pb-6 d-flex align-items-center"
            style={{
                minHeight: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center top"
            }}
            >
            <span className="mask bg-gradient-danger opacity-8" />

            <Container className="d-flex align-items-center" fluid>
                <Row>
                <Col lg="7" md="10">
                    <h1 className="display-2 text-white">{this.state.pageName}</h1>
                    <p className="text-white mt-0 mb-5">
                    This is your profile page. You can see the progress you've
                    made with your work and manage your projects or assigned tasks
                    </p>
                    
                </Col>
                </Row>
                
               
            </Container>
            </div>
        </>
        )
    }
}
export default Locationheader