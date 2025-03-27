import HomePage from "../pages/HomePage/HomePage";
import SSE from "../pages/SSE/SSE";
import Temporal from "../pages/Temporal/Temporal";
import PokeGPT from "../pages/PokeGPT/PokeGPT";

const routes = [
    {
        path: "/",
        element: <HomePage/>,
        name: "HomePage",
        description: "This is the home page",
        img: "https://media.istockphoto.com/id/1312128591/vector/home-icon-vector-house-sign.jpg?s=612x612&w=0&k=20&c=jxUT546g8Cfgv1SiAfh2Eos46XI3DqYvPLhxGFaobpE=",
    },
    {
        path: "/SSE",
        element: <SSE/>,
        name: "SSE",
        description: "This is the SSE page",
        img: "https://miro.medium.com/v2/resize:fit:1400/1*ZOvd7h41rtYPVvxUcyP5Kw.png",
    },
    {
        path: "/PokeGPT",
        element: <PokeGPT/>,
        name: "PokeGPT",
        description: "This is the PokeGPT page",
        img: "https://loodibee.com/wp-content/uploads/Pokemon-Symbol-logo.png"
    },
]

export default routes;
