import {Container} from "@mui/material";

const Main = () => {
    return(
        <main>
            <Container maxWidth={"md"} style={{display:"flex", justifyContent:"space-between", padding:"0"}}>
                <div>
                    <h2>React Trello</h2>
                    <h3>Simple ToDo app, for begging using app<br/>Click button <span>LOGIN/REGISTER</span><br/>
                    Then use it like <a href="https://trello.com/">Trello App</a>
                    </h3>
                </div>
                <div>
                    <h2>
                        Many thanks to Clover Dynamics <br/> for allowing me to take their test!
                    </h2>
                </div>
            </Container>
        </main>
    )
}
export default Main;