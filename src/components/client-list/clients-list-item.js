const CliendsListItem = (data) => {   
    const {id, fio, tel, email, messanger, card_num, card_summ, comment} = data;
    
        return (
            <tr>
                <td>{id}</td>
                <td>{fio}</td>
                <td>{tel}</td>
                <td>{email}</td>
                <td>{messanger}</td>
                <td>{card_num}{card_summ}</td>
                <td>{comment}</td>
            </tr>
        
        )
    
    
    
}

export default CliendsListItem;