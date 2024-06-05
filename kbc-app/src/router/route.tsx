import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Welcome from '../module/quiz/welcome/welcome'
import GamePage from '../module/quiz/gamepage/gamepage'
import Leaderboard from '../module/quiz/leadboard/leadeboard'



const router = createBrowserRouter([

    {
        path: "/",
        element: <Welcome />
    },
    {
        path: "/gamepage",
        element: <GamePage />
    },
    {
        path: "/leaderboard",
        element: <Leaderboard/>
    }
])

const AppRouter = () => {
    return (
       <RouterProvider router={router} />
    )
}

export default AppRouter