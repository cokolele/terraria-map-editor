const apiBaseURI = process.env.NODE_ENV == "development" ? "/api" : "144.91.97.116/api";
const serverBaseURI = process.env.NODE_ENV == "development" ? "" : "144.91.97.116";

export { apiBaseURI, serverBaseURI };