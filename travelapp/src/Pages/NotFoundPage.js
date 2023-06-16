import not404 from "../images/not404.gif";
import { Link } from "react-router-dom";
export default function NotFountPage(){
    return(
        <div className="container login-section" style={{backgroundImage: `url(${not404})` , height: '700px'}}>
            <section className="login-form-section">
            <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5 turn-back " style={{position:'absolute', bottom: 0}}>
              <h2 style={{color: '#071c55'}} className="heading-section">Not Found</h2>
              <button ><Link to="/">Back to home</Link></button>
            </div>
          </div>
                </section>

        </div>
    )
}