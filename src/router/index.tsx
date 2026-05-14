import { createBrowserRouter } from 'react-router-dom'
//路由定义
import { BoardPage} from '../pages/Board'
const routes = [
    {
        path: '/',
        element: <div>Home</div>
    },
    {
        path: '/board',
        element: <BoardPage />
    }

]


export const router = createBrowserRouter(routes)

