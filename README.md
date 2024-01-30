mymoovies/
   |- index.js
   |- package.json
   |- package-lock.json
      .gitignore
   |- README.md
   |- .env
   |- .env.example
   |- src/
       |- controllers/
           |- mooviesController.js
           |- categoryController.js
       |- routes/
           |- moovies.js
           |- category.js
       |- db/
           |- index.js



           # Schema DB
           
          CREATE TABLE category (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE moovie (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    realease_date VARCHAR(255)
);

