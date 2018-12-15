THIS README DETAILS HOW TO SET UP A COMPUTER WITH UBUNTU TO RUN THE CODE THAT RUNS THE WEBSITE

*In order to run the code, the ubuntu computer needs to be installed with the necessary packages
to be able to run the code properly: The prerequisites for the code are:
      -Apache
      -MySQL
      -PHP
      -phpMyAdmin
      -NodeJS


*Installing Apache, PHP and MySQL
 -First open Ubuntu's terminal by searching terminal in your computer and opening it
 -Next, enter this code to update your package repositories:

 --------------------------------------------------------------------------------------
 sudo apt-get update
 --------------------------------------------------------------------------------------

 -Next, run this code to install MySQL:

 --------------------------------------------------------------------------------------
 sudo apt install mysql-server
 --------------------------------------------------------------------------------------

 -Next, run this code to install PHP:
 --------------------------------------------------------------------------------------
 sudo apt install mysql-server
 --------------------------------------------------------------------------------------

 -Next, open a web browser and navigat to the url below and you should see a message saying
 -It works!

 --------------------------------------------------------------------------------------
 http://localhost/
 --------------------------------------------------------------------------------------

 -Next, run this code in the terminal to install to check your PHP installation:

 --------------------------------------------------------------------------------------
 php -r 'echo "\n\nYour PHP installation is working fine.\n\n\n";'
 --------------------------------------------------------------------------------------

 *Installing PHP MyAdmin

 -Next, run this code to install PHP MyAdmin Package:

 --------------------------------------------------------------------------------------
 sudo apt-get install -y phpmyadmin
 --------------------------------------------------------------------------------------


 *Configuring phpMyAdmin

 -After installing phpMyAdmin, you will be presented with the package configuration screen.

 -Press the SPACE bar to place an “*” beside “apache2.”

 -Press TAB to highlight “OK,” then hit ENTER.

 -Then, the installation process will continue until you’re back at another package configuration screen.

 -Select “Yes” and then hit ENTER at the dbconfig-common screen:

 -You will be prompted for your database administrator’s password.

 -Type it in, hit TAB to highlight “OK,” and then press ENTER.

 -Next, enter a password for the phpMyAdmin application itself

 -Confirm the phpMyAdmin application password.

 -After the installation process completes, it adds the phpMyAdin configuration file here:

  /etc/apache2/conf-enabled/phpmyadmin.conf


  *Enable PHP mcrypt Module

  -Check if the PHP mcrypt module is already in use by running this code in the terminal:

 --------------------------------------------------------------------------------------
 php -m | grep mcrypt
 --------------------------------------------------------------------------------------

 -If you don’t get any results, install the PHP mcrypt module with this code:

 --------------------------------------------------------------------------------------
 sudo php5enmod mcrypt
 --------------------------------------------------------------------------------------

 -Now when we check, you should see mcrypt enabled:

 --------------------------------------------------------------------------------------
 php -m | grep mcrypt
 --------------------------------------------------------------------------------------

 -Now we should restart the Apache web server for changes to take affect:
 --------------------------------------------------------------------------------------
 sudo service apache2 restart
 --------------------------------------------------------------------------------------

  *Access phpMyAdmin for the First Time

 -Now you can log in to phpMyAdmin by going to your server followed by /phpmyadmin.

 -You can just use http://YOUR_SERVER_IP/phpmyadmin if you don’t have domains set up yet.

 -Log in with the root user and the password you set for the phpMyAdmin application.


 *Installing node JS

  -Add Node.Js PPA by running this code in the terminal

  --------------------------------------------------------------------------------------
  sudo apt install curl
  --------------------------------------------------------------------------------------

  -Install Node.Js And NPM by running this code in the terminal:

  --------------------------------------------------------------------------------------
  sudo apt install nodejs
  --------------------------------------------------------------------------------------

  -Use the following command to check the versions of node Js and npm:

  --------------------------------------------------------------------------------------
  node -v
  --------------------------------------------------------------------------------------
  &
  --------------------------------------------------------------------------------------
  npm -v
  --------------------------------------------------------------------------------------

  -If the version of node JS is lower than 10.13.0, then input the next command to
  bring the installation up to that version
  --------------------------------------------------------------------------------------
  nvm install 10.13.0
  --------------------------------------------------------------------------------------

  -Check version

  *SQL setup to run the code

  -First enter into the phpMyAdmin server under the url below

  --------------------------------------------------------------------------------------
  http://localhost/phpmyadmin/index.php
  --------------------------------------------------------------------------------------

  -Then click where it says new on the left hand side of the screen
  -Under create database input the name:

  --------------------------------------------------------------------------------------
  InterReservations
  --------------------------------------------------------------------------------------

  -Go the InterReservations Folder and open the folder named _MySQL and open the InterReservation_Schema_Officioal_V1 file

  -Copy all of what is in the file and go to your PHPMyAdmin page in your web broser and click on the SQL TAB

  -Paste what was copied into the white box then click GO

  -Then open the InterReservations Folder, right click on an empty space on the white space in the folder and select open terminal

  -Next write the following code to start up your server:

  --------------------------------------------------------------------------------------
  node app.js
  --------------------------------------------------------------------------------------

  -To access the web paged, go to:

  --------------------------------------------------------------------------------------
  http://localhost:3000
  --------------------------------------------------------------------------------------

  Now you are ready to run the code and access all of the web pages.
