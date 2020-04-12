# Team Double Name CEN3031 Project

## Installation & Deployment

The driver safety app runs on the LAMP stack with a React front end. To deploy the app, perform the following steps:

1. Install a MySQL server and log in as the root user

2. Run the init.sql file inside of the ```CEN3031/server/authserver/sql``` folder by either copy/pasting its contents into the MySQL shell or by running it directly with the ```source``` command. 

3. Install Apache and PHP

4. Copy the contents of ```CEN3031/server/authserver/www``` into the root directory of your Apache installation

5. Compile the React client by using ```npm run-scripts build``` inside of the ```/CEN3031/client``` folder

6. Copy the contents of ```CEN3031/client/build``` into ```CEN3031/server/authserver/www```

7. Assuming your LAMP installation is correctly configured, you should have a working installation. Make sure to take the usual security hardening steps needed for publicly facing apps. 

## Admin Access

By default ...
