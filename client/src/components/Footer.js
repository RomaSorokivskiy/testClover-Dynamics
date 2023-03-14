import {Container} from "@mui/material";

const Footer = () => {
    return(
        <footer>
            <Container maxWidth={"md"} style={{display:"flex",justifyContent:"space-between", padding: "0"}}>
                <div>
                    <h3>Made by SorokSkull</h3>
                    <p>Real name Sorokivskyi Roman</p>
                </div>
                <div>
                    <p>Test Task</p>
                    <h3>Clover Dynamics</h3>
                </div>
            </Container>
        </footer>
    )
}
export default Footer;