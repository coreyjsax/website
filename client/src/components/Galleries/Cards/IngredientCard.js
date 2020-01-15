import React, { useState } from 'react'
import { 
    Alert, Badge, Button, Card, CardHeader, CardBody, CardFooter,
    CardImg, CardImgOverlay, CardTitle, CardText, Container, 
    FormGroup, Input, ListGroupItem, ListGroup, Modal, Row, Col
} from "reactstrap"
import CreatableSelect from 'react-select'
import toaster from 'toasted-notes'
import { get, post, remove } from '../../../tools/Restful'
import 'toasted-notes/src/styles.css'



const portalRoot = document.getElementById('portal')


class IngredientCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            alert: false, 
            editMode: false,
            confirmDelete: false,
            ingredient_to_delete_id: '',
            ingredient_to_delete_name: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.setEditMode = this.setEditMode.bind(this)
        this.handleTags = this.handleTags.bind(this)
        this.deleteIngredient = this.deleteIngredient.bind(this)
    }
    toggleModal = (state, e, card) => {
        let cardId = card.id
        console.log(card)
        this.setState({
            [state]: !this.state[state]
        })
    }
    confirmDeleteCard = (state, e, card) => {
        console.log(card)
        let cardId = card.id
        let cardName = card.label
        
        console.log(card)
        this.setState({
            ingredient_to_delete_id: cardId,
            ingredient_to_delete_name: cardName
        })
        this.toggleModal(state, e, card)
    }
    setEditMode = (e) => {
        this.setState({editMode:true})
    }
    resetEditMode = (e) => {
        this.setState({editMode:false})
    }
    
    handleTags = (e) => {
        let selected = e
        this.setState({chosenTags: selected})
    }
    deleteIngredient = (e, card) => {
        
        console.log(card)
        console.log('delete ingredient')

        const removeItem = () => remove('ingredient', card.id).then((data) => data)
        e.preventDefault()
        removeItem()
        this.toggleModal("confirmDelete", card)
        toaster.notify(({ onClose }) => (
            <Alert
                color="default"
                className="alert"
            >
                <div className="alert-text">
                    <Row>
                        <div onClick={onClose}>
                            <i class="remove fas fa-times"></i>
                        </div>
                    </Row>
                    <Row>
                        <span className="alert-title" data-notify="title">
                            <strong> {card.title} Deleted! </strong>
                        </span>
                    </Row>
                </div>
            </Alert>
        ), {duration: 2000});

    }
    render(){
        let card = this.props.data
        let tags = this.props.tags

        return (
            <Card className='card card-content'>
            {
                this.state.editMode === false
                ?   <div>
                        <CardBody key={card.id}>
                            <CardTitle>{card.label}</CardTitle>
                            <CardText>{card.description}</CardText>
                            <CardText>{card.notes}</CardText>
                            <Container className='item-card-tag-container'>
                                <strong>tags</strong>
                                {card.tags.map(tag => (
                                    <span>
                                        <Badge color="success" className="location-badge">
                                            {tag.name.label}
                                        </Badge>
                                    </span>
                                ))}            
                            </Container>
                            <Button
                                size="sm"
                                className="edit-button"
                                color="primary"
                                onClick={e => this.setEditMode(e)}
                            >
                                edit
                            </Button>
                            <Button
                                key={card.id}
                                size='sm'
                                className='delete-button'
                                color='danger'
                                onClick={(e) => this.confirmDeleteCard('confirmDelete', e, card)}
                                //onClick={e => deleteCard(e, card.id, model)}
                            >
                                delete
                            </Button>
                        </CardBody>
                    </div>
                :   <div>
                        <CardBody>
                            <FormGroup>
                                
                                <Input 
                                    type="text"
                                    defaultValue={card.title}
                                />
                            </FormGroup>
                                <Input 
                                    type="textarea"
                                    defaultValue={card.description}
                                />
                                <Input 
                                    type="textarea"
                                    defaultValue={card.notes}
                                />
                            <FormGroup>
                                <label>Tags</label>
                                <CreatableSelect 
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={tags}
                                    onChange={e => this.handleTags(e)}
                                    defaultValue={card.tags}
    
                                />
                            </FormGroup>
                                <Button
                                    size="sm"
                                    color="default"
                                    onClick={e => this.resetEditMode(e)}
                                >
                                    Back
                                </Button>
                                <Button
                                    size="sm"
                                    color="primary"
                                    onClick={e => this.resetEditMode(e)}
                                >
                                    Submit
                                </Button>
                        </CardBody>
                    </div>
            }
          
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.confirmDelete}
                    toggle={() => this.toggleModal('confirmDelete')}
                >
                    <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-default">
                      You Are About to Delete {this.state.ingredient_to_delete_name}!
                    </h6>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={(e) => this.toggleModal("confirmDelete", e, card)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      If you delete {this.state.ingredient_to_delete_name} it will be permenently removed. 
                    </p>
                  </div>
                  <div className="modal-footer">
                    <Button 
                        color="danger"
                        type="button"
                        onClick={(e) => this.deleteIngredient(e, card)}

                    >
                      Delete {this.state.ingredient_to_delete_name}!
                    </Button>
                    <Button
                      className="ml-auto"
                      color="link"
                      data-dismiss="modal"
                      type="button"
                      onClick={(e) => this.toggleModal("confirmDelete", e, card)}
                    >
                      Nevermind...
                    </Button>
                  </div>
                </Modal>
            </Card>
        )
    }
}
export default IngredientCard





 /*   
    const [state, setState] = useState(
        {
            editMode: false, alert: false,
            showModal: false
        }
    )

    const card = props.data
    const model = props.model
    const title = props.title
    const tags = props.tags

    const setEditMode = (e) => {
        setState({editMode:true})
    }
    const resetEditMode = (e) => {
        setState({editMode:false})
    }
    const showModal = (e) => {
        setState({showModal: true})
    }
    const hideModal = (e) => {
        setState({showModal: false})
    }
    const handleTags = (e) => {
        let selected = e
        setState({chosenTags: selected})
    }
    
    const confirmDeleteCard = (e, id, model) => {
       console.log('confirm delete card')
       console.log(state)
       if (state.showModal == false){
           console.log('modal turning on...')
           showModal(e)
       } else if (state.showModal == true){
           console.log('modal turning off...')
           hideModal(e)
       }
    }
    

    const deleteCard = (e, id, model) => {
        
        
        
        
        const removeItem = () => remove(model, id).then((data) => data)
        e.preventDefault()
        removeItem()
        toaster.notify(({ onClose }) => (
            <Alert
                color="default"
                className="alert"
            >
                <div className="alert-text">
                    <Row>
                        <div onClick={onClose}>
                            <i class="remove fas fa-times"></i>
                        </div>
                    </Row>
                    <Row>
                        <span className="alert-title" data-notify="title">
                            <strong> {card.title} Deleted! {model} </strong>
                        </span>
                    </Row>
                </div>
            </Alert>
        ), {duration: 2000});
    }
    return (
        <Card className='card card-content'>
        {
            state.editMode === false
            ?   <div>
                    <CardBody key={card.id}>
                        <CardTitle>{card.label}</CardTitle>
                        <CardText>{card.description}</CardText>
                        <CardText>{card.notes}</CardText>
                        <Container className='item-card-tag-container'>
                            <strong>tags</strong>
                            {card.tags.map(tag => (
                                <span>
                                    <Badge color="success" className="location-badge">
                                        {tag.name.label}
                                    </Badge>
                                </span>
                            ))}            
                        </Container>
                        <Button
                            size="sm"
                            className="edit-button"
                            color="primary"
                            onClick={e => setEditMode(e)}
                        >
                            edit
                        </Button>
                        <Button
                            key={card.id}
                            size='sm'
                            className='delete-button'
                            color='danger'
                            onClick={() => confirmDeleteCard()}
                            //onClick={e => deleteCard(e, card.id, model)}
                        >
                            delete
                        </Button>
                    </CardBody>
                </div>
            :   <div>
                    <CardBody>
                        <FormGroup>
                            
                            <Input 
                                type="text"
                                defaultValue={card.title}
                            />
                        </FormGroup>
                            <Input 
                                type="textarea"
                                defaultValue={card.description}
                            />
                            <Input 
                                type="textarea"
                                defaultValue={card.notes}
                            />
                        <FormGroup>
                            <label>Tags</label>
                            <CreatableSelect 
                                closeMenuOnSelect={false}
                                isMulti
                                options={tags}
                                onChange={e => handleTags(e)}
                                defaultValue={card.tags}

                            />
                        </FormGroup>
                            <Button
                                size="sm"
                                color="default"
                                onClick={e => resetEditMode(e)}
                            >
                                Back
                            </Button>
                            <Button
                                size="sm"
                                color="primary"
                                onClick={e => resetEditMode(e)}
                            >
                                Submit
                            </Button>
                    </CardBody>
                </div>
        }
      
            <Modal
                className="modal-dialog-centered"
                isOpen={state.showModal}
               // toggle={() => toggleModal('confirmDeleteModal')}
            >
                <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Type your modal title
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  //onClick={(e) => toggleModal("confirmDeleteModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind
                  texts. Separated they live in Bookmarksgrove right at the
                  coast of the Semantics, a large language ocean.
                </p>
                <p>
                  A small river named Duden flows by their place and supplies
                  it with the necessary regelialia. It is a paradisematic
                  country, in which roasted parts of sentences fly into your
                  mouth.
                </p>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Save changes
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  //onClick={() => toggleModal("confirmDeleteModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
        </Card>
    )

*/