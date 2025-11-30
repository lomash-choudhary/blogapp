import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { customStore } from './store/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import Protected from './components/AuthLayout.tsx'
import Login from './components/Login.tsx'
import AllPostsPage from './pages/AllPostsPage.tsx'
import AddPostPage from './pages/AddPostPage.tsx'
import EditPost from './pages/EditPost.tsx'
import Post from './pages/Post.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element: <HomePage />
      },
      {
        path:"/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path:"/signup",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            {" "}
            <AllPostsPage />
          </Protected>
        )
      },
      {
        path: "/add-posts",
        element: (
          <Protected authentication>
            {" "}
            <AddPostPage />
          </Protected>
        )
      },
      {
        path: "/edit-posts/:slug",
        element: (
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={customStore}>
    <RouterProvider router={router}/>
    
  </Provider>,
)
