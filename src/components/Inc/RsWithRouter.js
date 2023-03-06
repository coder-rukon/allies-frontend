import { useLocation,useNavigate,useParams  } from "react-router-dom";

const RsWithRouter = (Component) =>{
    const Wrapper = (props) =>{
        let location = useLocation();
        let navigate = useNavigate();
        let history =  ""
        let params = useParams();
        return <Component rs_router={{ location, navigate, params ,history }} {...props}/>
    } 
    return Wrapper;
}
export default RsWithRouter;