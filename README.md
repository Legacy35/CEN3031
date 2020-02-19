# Team Double Name CEN3031 Project

## Project Status

Planning phase

### MERN Stack

* MongoDB 
  * Used for more complex data that cannot easily be stored in an SQL table

* ExpressJS
  * Request routing

* ReactJS
  * Used for the web client

* NodeJS
  * Used as a proxy between client and Apache

### LAMP Stack

* Linux
  * Used to host project VPS

* Apache web server
  * Used as an environment to run PHP

* MySQL
  * Used where convenient due to its simplistic integration with PHP

* PHP
  * Used for CRUD operations due to its simplicity and relative lack of boilerplate compared to MongoDB

### Libraries

* Bootstrap 4 (CSS)
  * If you use pure vanilla CSS and no Bootstrap you're insane

### Current considerations

* [Matplotlib](https://matplotlib.org/ "Matplotlib Python library") graphing library (Python)

* [DJango](https://www.djangoproject.com/ "DJango Python Library") (Python). Required to use Matplotlib on the back-end. 

## (Theoretical) Project Architecture

* Client

  * Web server

    * NodeJS (Express)

      * Django

      * Apache

        * PHP

          * MySQL

          * User authentication

      * MongoDB

      * Filesystem

## Important links

[Project Discord](https://discord.gg/9q7qJ8T "Discord")

[Aaron's GitHub Guide](https://cdn.discordapp.com/attachments/676921412933648425/677981813343518771/Github_Essentials.DOCX)

[ReactJS Crash Course](https://www.youtube.com/watch?v=sBws8MSXN7A)

[NodeJS Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4)

## Code Snippets & Configuation Master List

###  Configuring non-standard directories in Apache:

**000-default.conf**

*Make sure to replace the /var/www directory configuration with the modified one as described below*

DocumentRoot /home/cameron/Desktop/CEN3031/server/www

<Directory /home/cameron/Desktop/CEN3031/server/www>

	Require all granted

</Directory>

### Securely configure MySQL Server

**sudo mysql_secure_installation**

followed by

***sudo*** mysql -u root -p #Sudo is required to connect after setting up the secure installation. The setup script disables remote login for root.

