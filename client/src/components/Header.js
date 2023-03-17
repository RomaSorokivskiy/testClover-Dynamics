import {Container, Button} from "@mui/material";
import {GiArrowCursor} from "react-icons/gi";
import {DiGithubBadge} from "react-icons/di"
import {Link} from "react-router-dom"

// import

const Header = () => {
    return(
        <header>
            <Container maxWidth={"md"} style={{display:"flex",justifyContent:"space-between", padding:"0"}}>
                <h2>ReactTrello
                    <span>
                        <GiArrowCursor/>
                    </span>
                </h2>
                <div>
                </div>
                <div>
                    <Link to={"/"}>
                        <Button>Home</Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button>Register</Button>
                    </Link>
                    <Link to={"/login"}>
                        <Button>Login</Button>
                    </Link>
                    <Link to="https://github.com/RomaSorokivskiy/testClover-Dynamics">
                        <Button>Source Code <span><DiGithubBadge/></span></Button>
                    </Link>
                </div>
            </Container>
        </header>
    )
}
export default Header;