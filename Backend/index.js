const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors');
const corsOptions = { origin: "*", credentials: true, optionSuccessStatus: 200 };
const issueRoutes = require("./Routes/issueRoutes");
const logger = require("./MiddleWares/logger");

const app = express();

dotenv.config();

app.use(express.json());
app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Issue Tracker API",
        version: "1.0.0",
        description: "Simple REST API for managing issues",
      },
      servers: [
        {
          url: "http://localhost:5000/api",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/api", issueRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
