import HomePage from "./pages/HomePage/HomePage";
import WebSocket from "./pages/WebSocket/WebSocket";

const routes = [
    {
        path: "/",
        element: <HomePage/>,
        name: "HomePage",
        description: "This is the home page",
        img: "https://guitar.com/wp-content/uploads/2018/02/fretboard-notes-all@1500x600.jpg"
    },
    {
        path: "/WebSocket",
        element: <WebSocket/>,
        name: "WebSocket",
        description: "This is the WebSocket page",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/10/Websocket_connection.png"

    }
]

export default routes;
