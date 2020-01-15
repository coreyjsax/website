export function modelMapper (model, data){
    console.log(data)
    if (model === 'location'){
        return data.map(location => (
            {
                id: location._id, 
                label: location.name.label,
                value: location.name.value,
                title: location.name.label,
                address: location.address,
                coordinates: location.coordinates,
                city: location.city,
                version: location.__v,
                image: location.image.url,
                hours: location.hours,
                menus: location.menus,
                coordinates: location.meta_data.coordinates,
                online_ordering: location.online_ordering_url,
                promos: location.promos,
                slices: location.slices,
                updated: location.updated,
                zip: location.zip,
            }
        ))
    } else if (model === 'item'){
        {
            return data.map(item => (
                {
                    id: item._id, label: item.name.label,
                    value: item.name.value,
                    title: item.name.label,
                    description: item.description,
                    locations: item.locations,
                    image: item.image.url,
                    tags: item.tags
                }
            ))
        }
    } else if (model === 'menu'){
            return data.map(menu => (
                {
                    id: menu._id, label: menu.name.label,
                    label: menu.name.label,
                    value: menu.name.value,
                    description: menu.description,
                    locations: menu.locations,
                    sections: menu.sections,
                    tags: menu.tags,
                    notes: menu.notes,
                    updated: menu.updated,
                    version: menu.__v
                }
            ))
    } else if (model === 'notebook'){
        return data.map(notebook => (
            {
                id: notebook._id, label: notebook.name.label,
                value: notebook.name.value,
                description: notebook.description,
                created: notebook.created,
                public: notebook.public 
            }
        ))
    }
}