# Media BackEnd Api

### Copy env file and setup
```
cp .env_example .env
```

### Server Run
```
npm run dev
```

### Api Document with Swagger Ui

After run Server, Can check Api usage in follow link.

```
http://localhost:3000/api-docs/
```

### Mongo DB setup
You need to connect mongo Db or other database connections.


### About the Project

*This is my own learning Backend mini project.*

First, This project need to do register and login. This method used authenication with Jwt and Bcrypt. And protect other routes with middleware Token.

#### Using Third party library
*I used all of library that show under the instruction.*
- npm install @types/express --save-dev
- npm install --save-dev nodemon
-  npm i dotenv
-  npm i mongoose
-  npm i express-fileupload
-  npm install --save-dev @types/express-fileupload
-  npm i joi
-  npm i bcryptjs
-  npm i jsonwebtoken
-  npm i --save-dev @types/jsonwebtoken
-  npm i swagger-ui-express
-  npm i swagger-jsdoc

####Reference

***Brighter Myanmar(Waiferkolar)***