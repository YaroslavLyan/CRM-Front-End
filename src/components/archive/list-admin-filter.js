
const ListAdminFilter = (data) => {   
    const {id, name} = data;
    
        return (
            <>
            <option value={id}>{name}</option>
            </>
        
        )
    
    
    
}

export default ListAdminFilter;