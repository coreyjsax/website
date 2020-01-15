
const root = `http://localhost:5000/api/`

export function get(model){
    return fetch(root + model)
    .then(res => res.json())
    .catch(err => err)
}

export function patch(model, body, id){
    return fetch(root + model + "/" + id, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .catch(err => {
        console.log(err)
        return err
    })
}

export function post(model, body, token){

    return fetch(root + model, {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)
}

export function remove(model, id){
    return fetch(root + model + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)
}

export async function FetchData(model, id){
    let url, options
    
    !id ? url = `http://localhost:5000/api/${model}`
        : url = `http://localhost:5000/api/${model}/${id}`
            
    try {   
        const res = await fetch(url, options)
        const json = await res.json()
        return json
    } catch (error) {
        return error
    } 
}