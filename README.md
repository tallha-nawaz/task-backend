run these commands for running project locally

1: npm install
2: npx prisma generate
3: npx prisma migrate dev
4: npm run start:dev

 
make an .env file at root, setup mysql database locally  and  add the following in env file 

DB_HOST=localhost
DB_PORT=your_port
DB_USER=your_user_name
DB_PASSWORD=your_password
DB_DATABASE=data_base_name
DB_CONNECTION_LIMIT=5