import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: "localhost:8000",
    issuerBaseURL: "https://dev-ih1ltzefousgarzl.us.auth0.com/",
    tokenSigningAlg: "RS256"
});

export default jwtCheck;
