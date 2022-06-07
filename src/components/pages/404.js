
import {Link} from 'react-router-dom'
import img404 from './404.jpg'

const Page404 = () => {
    return (
        <>
            <img src={img404} alt="error 404"/>
            <p>Уважаемый посетитель, запрашиваемая вами страница была удалена либо переименована и перемещена в другой раздел.
            Приносим извинения за временные неудобства.</p>
            <Link to="/">
                Home page
            </Link>
        </>
    )
}
export default Page404;