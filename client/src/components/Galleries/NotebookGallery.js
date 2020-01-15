import React from "react"

const NotebookGallery = (props) => {
    console.log(props)
    return (
        <div className="wrapper-horizontal">
            {
                props.Data ?
                    props.Data.length >= 1 ? props.Data.map(card =>(

                        <div>{card.name}</div>
                    
                    ))
                    : <span>No Notebooks</span>
                :   <span></span>
            }
        </div>
    )
}
export default NotebookGallery