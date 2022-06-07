const AdminsListItem = (data) => {   
    const {id, name, tel, email, passw, rule, active} = data;
    
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{tel}</td>
            <td>{passw}</td>
            <td>{email}</td>
            <td>{rule}</td>
            <td>{active}</td>
        </tr>
    
    )

}

export default AdminsListItem;