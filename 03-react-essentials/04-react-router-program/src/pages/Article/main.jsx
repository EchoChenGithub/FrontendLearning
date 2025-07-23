import {Link, useParams} from "react-router-dom";
import {useSearchParams} from "react-router-dom";

const Article  = () => {
    const [params ] = useSearchParams();
    const id = params.get('id')
    const name = params.get('name')

    const param = useParams();
    const idx = param.id
    const namex = param.name
    return (
        <div>我是文章页面{idx}-{namex}
        <Link to="/login"><br/> 跳转到登录页面</Link>
        </div>
    )
}

export default Article