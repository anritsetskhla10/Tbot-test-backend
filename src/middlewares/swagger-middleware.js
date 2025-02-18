import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const SwaggerMiddleware = () => {
  const options = {
    customCss: ".swagger-ui .topbar { display:none}",
    customSiteTitle: "todoList",
  };
  const swaggerDocument = YAML.load("./src/config/swagger.yaml");
  return [SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, options)];
};


export default SwaggerMiddleware;