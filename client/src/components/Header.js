import {Container, Button} from "@mui/material";
import {GiArrowCursor} from "react-icons/gi";
import {DiGithubBadge} from "react-icons/di"
import {Link} from "react-router-dom"

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
                    <Link to={"/home"}>
                        <Button>Home</Button>
                    </Link>
                    <Link to={"board"}>
                        <Button>My Board</Button>
                    </Link>
                    <Link to="https://github.com/RomaSorokivskiy/taskCloverDynamics.git">
                        <Button>Source Code <span><DiGithubBadge/></span></Button>
                    </Link>
                </div>
            </Container>
        </header>
    )
}
export default Header;