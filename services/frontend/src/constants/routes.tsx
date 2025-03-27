import HomePage from "../pages/HomePage/HomePage";
import SSE from "../pages/SSE/SSE";
import Temporal from "../pages/Temporal/Temporal";
import PokeGPT from "../pages/PokeGPT/PokeGPT";

const routes = [
    {
        path: "/",
        element: <HomePage/>,
        name: "HomePage",
        description: "Welcome to Ideate!",
        img: "https://media.istockphoto.com/id/1312128591/vector/home-icon-vector-house-sign.jpg?s=612x612&w=0&k=20&c=jxUT546g8Cfgv1SiAfh2Eos46XI3DqYvPLhxGFaobpE="
    },
    {
        path: "/SSE",
        element: <SSE/>,
        name: "SSE",
        description: "Explore real-time server communication using Server-Sent Events (SSE) with FastAPI and React - see live updates in action!",
        img: "https://miro.medium.com/v2/resize:fit:1400/1*ZOvd7h41rtYPVvxUcyP5Kw.png"
    },
    {
        path: "/PokeGPT",
        element: <PokeGPT/>,
        name: "PokeGPT",
        description: "Your AI Pokémon expert! Ask questions about moves, types, and strategies with this ChatGPT-powered Pokédex companion",
        img: "https://loodibee.com/wp-content/uploads/Pokemon-Symbol-logo.png"
    },
    // {
    //     path: "/Temporal",
    //     element: <Temporal/>,
    //     name: "Temporal",
    //     description: "This is the Temporal page",
    //     img: "https://raw.githubusercontent.com/quarkiverse/quarkus-temporal/master/docs/modules/ROOT/assets/images/temporal_logo.svg"
    // }
]

export default routes;
