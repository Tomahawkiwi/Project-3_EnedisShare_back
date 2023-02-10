## Concept

This project is our 3rd and last project in the WCS training, in collaboration with Enedis.  
It's an API managing our data for our concepted platform of internal social network "Enedis Share".  
The purpose is to share posts with title, text, image, and be able to comment.  
These posts are protected by classing by spaces and categories (sub-spaces) with restricted members.  

See also the front-end app :  
https://github.com/Tomahawkiwi/Project-3_EnedisShare_front  


## Technos back-end

__LANGUAGE__ : Typescript <img height="20" alt="logo Typescript" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png">  
__FRAMEWORK BACK__ : NodeJS <img height="20" alt="logo NodeJS" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png"> / Express <img height="20" alt="logo Express" src="https://wsofter.ru/wp-content/uploads/2017/12/node-express.png">  
__BDD__ : PostgreSQL <img height="20" alt="logo PostgreSQL" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png">, Docker <img height="20" alt="logo Docker" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"> (for dev), Caprover <img height="20" alt="logo Caprover" src="https://caprover.com/img/logo.png"> (for prod) and Cloudinary <img height="20" alt="logo Cloudinary" src="https://cloudinary-res.cloudinary.com/image/upload/website/cloudinary_web_favicon.png"> (for images)  
__ORM__ : Prisma <img height="20" alt="logo Prisma" src="https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_.png">  

## App overview

See the front-end app :  
https://github.com/Tomahawkiwi/Project-3_EnedisShare_front  


## Available Commands

- `npm run dev` : Starts server backend in one terminal  
- `npx prisma generate` : Create the prisma client for types  
- `npx prisma migrate` : Create the database with schema.prisma info  


## Environment variables

Report to the env.sample to create your own .env. Reminder :  

* DATABASE_URL=CUSTOM_URL_LINK_DATABASE
* JWT_SECRET=YOUR_SECRET_KEY

* CLOUDINARY_CLOUD=USERNAME
* CLOUDINARY_API_KEY=API_KEY
* CLOUDINARY_SECRET_KEY=SECRET_KEY
* CLOUDINARY_DIRECTORY=DRIECTORY_TARGET_IN_CLOUDINARY

* NODE_ENV=development
