import HomePage from "../pages/HomePage/HomePage";
import WebSocket from "../pages/WebSocket/WebSocket";
import SSE from "../pages/SSE/SSE";
import ChatApp from "../pages/ChatApp/ChatApp";
import Temporal from "../pages/Temporal/Temporal";

const routes = [
    {
        path: "/",
        element: <HomePage/>,
        name: "HomePage",
        description: "This is the home page",
        img: "https://media.istockphoto.com/id/1312128591/vector/home-icon-vector-house-sign.jpg?s=612x612&w=0&k=20&c=jxUT546g8Cfgv1SiAfh2Eos46XI3DqYvPLhxGFaobpE="
    },
    {
        path: "/SSE",
        element: <SSE/>,
        name: "SSE",
        description: "This is the SSE page",
        img: "https://miro.medium.com/v2/resize:fit:1400/1*ZOvd7h41rtYPVvxUcyP5Kw.png"
    },
    {
        path: "/WebSocket",
        element: <WebSocket/>,
        name: "WebSocket",
        description: "This is the WebSocket page",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/10/Websocket_connection.png"

    },
    {
        path: "/ChatApp",
        element: <ChatApp/>,
        name: "ChatApp",
        description: "This is the ChatApp page",
        img: "https://cdn-icons-png.flaticon.com/512/5539/5539745.png"
    },
    {
        path: "/Temporal",
        element: <Temporal/>,
        name: "Temporal",
        description: "This is the Temporal page",
        img: "https://raw.githubusercontent.com/quarkiverse/quarkus-temporal/master/docs/modules/ROOT/assets/images/temporal_logo.svg"
    }
]

export default routes;
