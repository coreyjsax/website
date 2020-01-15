import React from "react"
import { Drawer } from "antd"

class DrawerSlide extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            visible: false,
        }
    }
    toggleDrawer = (id, status, model) => {

        const lookUpId = (id, model) => {
            let recordArray = this.state[model]
            let record = recordArray.find(r => r.id == id)
            return record
        }

        if (status === 'open'){
            this.setState({visible:true, recordId: id})
            let record = lookUpId(id, model)
            this.setState({currentRecord: record})
            
        } else if (status === 'close'){
            this.setState({visible:false})
            
        }
    }
    openDrawer(){
        this.setState({visible: true})
    }
    closeDrawer(){
        this.setState({visible: false})
    }
    render() {
        return (
            <Drawer
                title={`${this.props.action} ${this.props.title}`}
                placement="bottom"
                height={"65%"}
                onClose={() => this.toggleDrawer('', 'close')}
                closable={true}
                visible={this.state.visible}
                maskClosable={true}
            >
                {this.props.children}
            </Drawer>
        )
    }
}
export default DrawerSlide