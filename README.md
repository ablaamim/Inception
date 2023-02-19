### Foreword :

----

This project aims to expand the knowledge of systems administration using [Docker](https://en.wikipedia.org/wiki/Docker_(software)).
You need to virtualize several [Docker images](https://www.techtarget.com/searchitoperations/definition/Docker-image) by creating them in your personal [virtual machine](https://www.vmware.com/topics/glossary/content/virtual-machine.html).

---

### What is Inception ?

---

</p>
<p align="center">
<img src="./images/docker.jpg" width="800"/>
</p>

---

Inception is an individual project at 1337 which requires us to build an infrastructure of services using [Docker](https://docs.docker.com/get-started/overview/), orchestrated by [Docker Compose](https://docs.docker.com/compose/).

In the mandatory part, a container with [nginx](https://www.nginx.com/resources/glossary/nginx/) and only it must be accessible through port 443, exposing the services of the internal [docker network](https://docs.docker.com/network/) for public access. The [nginx](https://www.nginx.com/resources/glossary/nginx/) service connects to the [wordpress](https://en.wikipedia.org/wiki/WordPress) container running [php-fpm](https://www.php.net/manual/en/install.fpm.php) which stores the data in a [mariadb](https://en.wikipedia.org/wiki/MariaDB) service on the network. The [wordpress](https://en.wikipedia.org/wiki/WordPress) and [mariadb](https://en.wikipedia.org/wiki/MariaDB) website data must be persisted each in its own [volume](https://docs.docker.com/storage/volumes/).

For the bonus we have to configure a container with an [FTP server](https://en.wikipedia.org/wiki/Vsftpd) that accesses the [wordpress](https://en.wikipedia.org/wiki/WordPress) [volume](https://docs.docker.com/storage/volumes/), a static site, [redis](https://redis.io/) to cache the database requests and a useful service of our choice. In this case the service chosen was [ngrok](https://ngrok.com/) to allow local services to be available on the web (public access over the internet).

---

### Project Badge :

---

</p>
<p align="center">
<img src="./images/inceptionm.png" width="150" height="150"/>
<p/>

---

#### Skills :

---

- Rigor.
- Network & system administration.

---

#### Architecture :

* A Docker container that contains NGINX with TLSv1.2 or TLSv1.3 only.
* A Docker container that contains WordPress + php-fpm (it must be installed and configured) only without nginx.
* A Docker container that contains MariaDB only without nginx.
* A volume that contains your WordPress database.
* A second volume that contains your WordPress website files.
* A docker-network that establishes the connection between your containers.

</p>
<p align="center">
<img src="./images/architecture" width="800"/>
</p>

---

#### Goal :

---

> Use docker-compose to create a LEMP stack (L for Linux, E for Nginx, M for Mariadb and P for PHP) with wordpress.

---

#### Setting up the virtual machine :

---

> First download a stable version of debian:buster and install it properly. (Personally did not use GUI)

---

#### System configuration :

---

> First use command line as super user / Switch user :

```
$> su -
Password:
```

> Update system :

```
$> apt-get update
```

> Then install needed software entring the following command :

###### if you used GUI :

```
$> apt-get install sudo ufw vim tree apt-transport-https ca-certificates curl git systemd make docker docker-compose htop
```

###### In case if you dont use GUI :

```
$> apt-get install sudo ufw vim tree apt-transport-https ca-certificates curl git systemd openbox xinit kitty firefox-esr make docker docker-compose htop
```

> apt-transport-https sets the package manager to use https protocol

> ca-certificates Obtain a certificate from CA (Certificate Authorities) to enable SSL communication. (SSL = secured sockets layer)

---

### Port forwarding :

---

##### Installing and Configuring UFW :

---

###### Perform the UFW installation :

---

```
$> sudo apt-get install ufw
```

##### Enable UFW with this command :

```
$> sudo ufw enable
```

##### Allow connections to your server through port 42 :

```
$> ufw allow ssh
$> ufw allow 42
$> ufw allow 443
$> ufw allow 80
```

##### Check the UFW settings :

```
$> ufw status
```

```
$> dpkg -l | grep ufw
```

---

##### Network adapter configuration :

---

##### Add forward rule for VirtualBox :

---

> Go to VirtualBox-> Choose the VM->Select Settings
Choose “Network”-> “Adapter 1"->”Advanced”->”Port Forwarding”
Add new rule (little green button on right top side) and next parameters:

---

```

**************************************************************************
* Protocol       Host IP       Host Port       Guest IP       Guest Port *
* TCP                             42                              42     *
* TCP                             443                             443    *
* TCP                             80                              80     *
**************************************************************************

```
---

> In your host (physical) machine open Terminal and run [ssh @localhost -p 4242]
Now you can control your virtual machine from the host terminal!

---

#### Sudoers policy :

> If you use the root account, there is no big problem, but in order to use Docker Compose smoothly with the login user account , register a general user as sudoer and at the same time register in the root group to obtain permission to access files and directories owned by root.

##### Switch user :

```
$> su -
Password:
```
##### Add the user to the sudo group :


```
$> sudo usermod -a -G sudo $login
```

##### Add the user to the root group :

```
$> sudo usermod -a -G root $login
```

##### add our user to the group with the command :

```
sudo usermod -aG docker $login
```



##### Modify /etc/sudoer using visudo

```
$> sudo visudo
```

```
   login       ALL=(ALL:ALL) ALL
    |           |    |        |
    |           |    |        |
   Username     |    |        |
              Host   |        |
                  All Users   |
                          All commands
```
##### switch user :

```
$> su - login
```

---

###### DNS :

If this is set up, you can connect to https://localhost without any problems and see that WordPress is provided. However, access is not possible with the domain name requested by the subject , but this can be applied by setting /etc/hosts .

```
$> sudo echo "127.0.0.1 $login" >> /etc/hosts
```


### Docker :

---

</p>
<p align="center">
<img src="https://i0.wp.com/ledatascientist.com/wp-content/uploads/2020/01/docker_logo.png?w=601&ssl=1" width="500"/>
<p/>

---

#### What is docker ?

---

> Docker is an open source project used to build a virtualization environment written in Go language. Compared to the existing virtualization technology, there is little performance loss, so it is used in many infrastructure solutions.

> Docker , which is generally referred to, is used in two contexts depending on the situation. It means Docker Engine , or it is called Docker as a collective name for several Docker projects .

> There are several projects in Docker , such as Docker Compose , Private Registry , Docker Machine , and Kinematic . These Docker projects are meant to use Docker Engine more efficiently, so in the end, the core is Docker Engine .

</p>
<p align="center">
<img src="https://oopy.lazyrockets.com/api/v2/notion/image?src=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8b42f68d-2f91-4dac-9413-27e0f9de5d5e%2FUntitled.png&blockId=58fb89f1-6ab3-4683-a143-283e59cb1a3d" width="500"/>
</p>

> Existing virtualization technology used a virtual machine (VM) , a concept in which a hypervisor exists on a host OS and guest OSes exist on top of it. Virtualization here means creating a space independent of the space of the machine you are currently using.
Docker also uses virtualization technology, but it is not structured using Hypervisor and Guest OS as before.
Hypervisor manages Guest OS and virtualizes resources so that system resources can be distributed to Guest OS . Among the processes, a lot of performance degradation occurs when virtualization of devices such as I/O used in the host OS is performed. And even when using a VM like this , you can create an image as in the case of using Docker . Since the image is created with the Kernel of the Guest OS included, not only the size of the image is quite large, but the image creation time is longer as the Kernel is included. long.
For these reasons, various attempts were made on paravirtualization technologies such as Intel 's Xen and Linux 's KVM , and after that, a technology called Container became the standard of virtualization technology.
Container is a technology that is used on Linux and is implemented only with Linux's own functions such as chroot , namespace , and cgroup to create an independent space for each process. Docker 's container uses Linux 's container , and by adding several functions to Linux 's container , it makes it easier to use the application as a container .

---

#### How Docker works ?

---

Docker works by using a client-server architecture, where the Docker client communicates with the Docker daemon to build, run, and manage containers.

When you run a Docker command, such as docker run, the Docker client sends a request to the Docker daemon to run a container. The Docker daemon pulls the image needed to run the container (if it's not already on the host machine), and then creates a container from the image.

The container runs in an isolated environment on the host machine, with its own file system, network, and process space. This isolation ensures that the application running in the container is completely self-contained and does not affect the host machine or other containers running on the same machine.

Docker also provides a centralized mechanism for managing containers, images, and networks. You can use Docker commands to list containers, inspect their state, start and stop containers, and more. Docker also provides a public registry, Docker Hub, where you can find and download images for use in your containers.

In summary, Docker provides a simple and efficient way to package and deploy applications in containers, and manage their lifecycle.

---

#### Docker network : what kind of network should I chose ?

Docker documentation says :

>In terms of Docker, a **bridge network** uses a software bridge which allows containers connected to the same bridge network to communicate, while providing isolation from containers which are not connected to that bridge network. The Docker bridge driver automatically installs rules in the host machine so that containers on different bridge networks cannot communicate directly with each other.
>Bridge networks apply to containers running **on the same Docker daemon host**.

For this project, as it will run on a single Docker host and as I need different containers to communicate, I chose to use a **user-defined bridge network**.

Unlike default bridge network, which is automatically created by Docker when you start new containers, user-defined bridge networks comes with some benefits :
* **Automatic DNS resolution** between containers : you can directly reference a container to another using their names instead of --link flag
* **Better isolation** : the containers are not attached to a default network where they can communicate with other unrelated containers
* Containers on the same network share **environment variables**

<br />

---

#### Depend-on : Control startup and shutdown order in Compose 

Docker-compose offers the possibility to condition the start of a container to the status of another.

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

For example in this project, Nginx is forwarding php traffic to php-fpm services of wordpress and adminer, In the configuration file of nginx, you have **references** to other containers :

```conf
...
location            ~* \.php$ 
    {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass    wordpress:9000;
        fastcgi_index   index.php;
        include         fastcgi_params;
        fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param   SCRIPT_NAME     $fastcgi_script_name;
    }
...

#### Networks

Containers on the same network can communicate.

If you need to secure a little bit more your multi-containers application, you can create **dedicated networks between certain containers instead of one big network for all containers**.

For example, in this project, I need my Nginx container to communicate with the wordpress/php-fpm container, but not with mariadb directly.

I could create multiple networks to allow communication between my containers :

```txt
network 1 : nginx / wordpress
network 2 : wordpress / mariadb
```

In the docker-compose.yml file, nginx will only be on `network 1`, mariadb on `network 2` and wordpress on `network 1` and `network 2`.

<br />

---

#### Container OS :

---

> Depending on the subject specification , debian:buster or alpine can be used as the OS to be based on the container . Since alpine has been chosen and used a lot as a lightweight OS on the container, tgars why better you choose it. alpine 3.13 to be more precised !

---

#### PID 1 :

---

> If you have created a Docker container at least once, you must have experienced that it is terminated even though the command is listed as an Entrypoint or Command . Let's understand this first and move on.
Among the many reasons to use Docker instead of VM , one that cannot be left out is PID 1 . This means that the container will be in charge of only one process registered with PID 1 , and accordingly, a single container means only one service (process), making it consistent in terms of server environment management.

> If so, you can simply launch a process that should be operated as a service, but you need to think about why the above behavior was attempted, which is related to the daemon process. Basically, if you look at the process structure in Unix , it has a tree structure in the form of starting with PID 1 , which is the root , and creating children. In normal use, such a structure shouldn't be a problem, but services that you maintain on the machine ( such as docker.d and mysql.d for example ) can be problematic. Processes maintained in a tree structure are all terminated when the parent process dies. If a process running as a service becomes unavailable due to the termination of the parent process, problems arise in other processes using it. Accordingly, processes that need to be maintained as services are created and operated by creating a separate root, which is called a daemon process.
Therefore, the daemon process is not basically run with PID 1 , so of course the Docker Container sees that there is nothing to run, and the terminated state is repeated. So, why not just run things that run as daemon processes as regular processes? That's right, so you need to look for options related to this. Typically, daemon processes provide this functionality.

[PID 1](https://daveiscoding.com/why-do-you-need-an-init-process-inside-your-docker-container-pid-1)

---

#### Dumb-init :

---

dumb-init is a simple process supervisor and init system designed to run as PID 1 inside minimal container environments (such as Docker). It is deployed as a small, statically-linked binary written in C.

Lightweight containers have popularized the idea of running a single process or service without normal init systems like systemd or sysvinit. However, omitting an init system often leads to incorrect handling of processes and signals, and can result in problems such as containers which can't be gracefully stopped, or leaking containers which should have been destroyed.

dumb-init enables you to simply prefix your command with dumb-init. It acts as PID 1 and immediately spawns your command as a child process, taking care to properly handle and forward signals as they are received.

[Dumb-init](https://engineeringblog.yelp.com/2016/01/dumb-init-an-init-for-docker.html)

---

#### Nginx :

---

</p>
<p align="center">
<img src="https://cdn-media-1.freecodecamp.org/images/RooSvbKlAWsOjkz8JPactXH-GPf4Pe6DC3Ue" width="800"/>
</p>

---

NGINX (pronounced "engine-x") is a popular open source web server and reverse proxy software. It was created by Igor Sysoev in 2002 and first released in 2004.

NGINX is designed to handle high traffic websites and applications with low resource usage. It is known for its high performance, scalability, and reliability. NGINX is used by many of the world's largest websites, including Airbnb, Dropbox, Netflix, and Pinterest.

In addition to serving static and dynamic content, NGINX can also act as a reverse proxy, load balancer, and HTTP cache. It is often used in conjunction with other software to provide a complete web application stack.

NGINX is available for free under the open source BSD license, and there are also commercial versions with additional features and support available from NGINX Inc.

---

### How to set up NGINX (our web server) :
- [Video tutorial](<http://nginx.org/en/docs/beginners_guide.html>)
Nginx is a webserver which stores hmtl, js, images files and use http request to display a website.
Nginx conf documents will be used to config our server and the right proxy connexion.

### configure .conf file on nginx :
#### useful nginx links :

- [location explanations](<https://www.digitalocean.com/community/tutorials/nginx-location-directive>)
- [What is a proxy server](<https://www.varonis.com/fr/blog/serveur-proxy>)
- [All nginx definitions](<http://nginx.org/en/docs/http/ngx_http_core_module.html>)
- [Nginx Command line](<https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/>)
- [PID 1 signal handling && nginx](https://cloud.google.com/architecture/best-practices-for-building-containers#signal-handling)
- [What is TLS(in french)](https://fr.wikipedia.org/wiki/Transport_Layer_Security)

#### Listen && Location :
- Listen will indicate to the server which request it has to accept:
	Listen can take ports and adresses : exemple Listen 80;
- The location directive within NGINX server block allows to route request to correct location within the file system.
	The directive is used to tell NGINX where to look for a resource by including files and folders while matching a location block against an URL.

### Fastcgi (or how to process PHP with nginx) :

#### Useful links :

- [What is http](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [difference between http && tcp](https://www.goanywhere.com/blog/http-vs-tcp-whats-the-difference#:~:text=TCP%20contains%20information%20about%20what,data%20in%20the%20stream%20contains.)
- [PHP Fast CGI Examples](https://www.nginx.com/resources/wiki/start/topics/examples/phpfcgi/)
- [Why using fastcgi_pass 127.0.0.1:9000](https://serverfault.com/questions/1094793/what-is-this-nginx-location-for-php-fpm-fastcgi-pass-127-0-0-19000-really-doing)
- [Install Nginx with php-fpm in video](https://www.youtube.com/watch?v=I_9-xWmkh28&ab_channel=ProgramWithGio)
- [Fast CGI explanations commands](https://www.digitalocean.com/community/tutorials/understanding-and-implementing-fastcgi-proxying-in-nginx)

PHP-FPM (for fast-cgi Process Manager) runs as an isolated service when you use PHP-FPM.
	Employing this PHP version as the language interpreter means requests will be processed via a TCP/IP socket,
	and the Nginx server handles HTTP requests only, while PHP-FPM interprets the PHP code. Taking advantage of two separate services is vital to become more efficient.
	It features with Wordpress

# Docker-compose :

- [tutorial open classroom dockercompose](https://openclassrooms.com/fr/courses/2035766-optimisez-votre-deploiement-en-creant-des-conteneurs-avec-docker/6211624-decouvrez-et-installez-docker-compose)

## Docker-Compose commands :

```c
- docker-compose up -d --build, //Create and build all the containers and they still run in the background
- docker-compose ps, //Check the status for all the containers
- docker-compose logs -f --tail 5, //see the first 5 lines of the logs of your containers
- docker-compose stop , //stop a stack of your docker compose
- Docker-compose down, //destroy all your ressources
- docker-compose config, //check the syntax of you docker-compose file
```

### Inside the docker-compose file :

All the information about what every line means are in this [tutorial](https://openclassrooms.com/fr/courses/2035766-optimisez-votre-deploiement-en-creant-des-conteneurs-avec-docker/6211677-creez-un-fichier-docker-compose-pour-orchestrer-vos-conteneurs)

### WORDPRESS :
#### Useful links :
- [What is the wordpress CLI](https://www.dreamhost.com/wordpress/guide-to-wp-cli/#:~:text=The%20WP%2DCLI%20is%20a,faster%20using%20the%20WP%2DCLI.)  
- [Know more about wp-config.php](https://wpformation.com/wp-config-php-et-functions-php-fichiers-wordpress/)  
- [php-fpm - www.conf](https://myjeeva.com/php-fpm-configuration-101.html)  

*definitions*
*wp-config.php* This file tells to your database how to get your files and how to treat them
### What are the steps to create your Wordpress :

1. **Create you dockerfile image** :

	- Download php-fpm
	- Copy the www.conf file in php/7.3/fpm/pool.d/
	- Create the php directory to enable php-fpm to run
	- Copy the script and launch it
	- Go to the html directory
	- Launch php-fpm

2. **Create a script** :

	- Download wordpress
	- Create the configuration file of wordpress
	- Move files from wordpress in the html directory
	- Give the 4th environmental variables for wordpress

3. **Create a www.conf** :

You need to edit www.conf and place it in /etc/php/7.3(the usual version of php on 42 vm)/fpm/pool.d and wp-content.php to disable access to the wordpress installation page when you access your site at https://login.42.fr
	- Put listen = 0.0.0.0:9000 to listen to all ports
	- Increase the number for the pm values in order to avoid a 502 page

# MARIADB :

MariaDB will be the database to store information about our wordpress users and settings.
In this section we have to create the Mariadb image and create 2 users.

## Useful links :

- [Import-export databases](https://www.interserver.net/tips/kb/import-export-databases-mysql-command-line/)  
- [Create and give permissions to a user](https://www.daniloaz.com/en/how-to-create-a-user-in-mysql-mariadb-and-grant-permissions-on-a-specific-database/)  
- [Why create /var/run/mysqld directory](http://cactogeek.free.fr/autres/DocumentationLinux-Windows/LinuxUbuntu/ProblemeMYSQL-mysqld.sockInexistant.pdf)  
- [How to give all privileges for a user on a database](https://chartio.com/resources/tutorials/how-to-grant-all-privileges-on-a-database-in-mysql/)  
- [How to import a data base](https://www.journaldunet.fr/web-tech/developpement/1202663-comment-importer-un-fichier-sql-dans-mysql-en-ligne-de-commande/)  

## MARIADB useful commands :
```c
mysql -uroot // To connect on mysql CLI
SELECT User FROM mysql.user; // To see all the users
USE wordpress // To connect on your wordpress database
mysqldump -u username -p databasename > filename.sql // To export the file
mysql -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < /usr/local/bin/wordpress.sql // To import the file
```

## What are the steps to create your own Maria DB image :
1. **Create a dockerfile** :
	- Download mariadb-server && mariadb-client
	- To run mariaDB on your container, you have to copy your .sh and the .sql on the /var/local/bin/
	- Give the right to execute your mysqld (which is the daemon for mysql)
	- Launch your script to install mariaDB
	- Then do a CMD to enable the database to listen to all the IPV4 adresses.

2. **Create a script (.sh file)** :

	- mysql_install_db initializes the MySQL data directory and creates the system tables that it contains, if they do not exist
	- In this script we downloaded Maria DB on the container, we have to install it and create the root user
	- Then we launch the commandline to give all the privileges to the root user. The function GRANT from mysqlcli (sql command line) gives access (or all access) to a user.

3. **Create your file.sql** :

	- 2 options :
		1. You create the database, the user and you give all privileges to the user
			as [malatini did](https://github.com/42cursus/inception/blob/validated/srcs/requirements/mariadb/config/create_db.sql)
		2. You export your own wordpress.sql as I did (and Lea did !!!!)
			- Step 1: Create your admin user on wordpress:
				You might don't know what it is, no prob! It means you will export your admin user from your database in order to put it in your .sql file.
				- Go to your wordpress website (localhost:443) and create your user by using the same username and password as your .env file.
			- Step 2: Export your admin user.sql
				You have to go on your mariaDB container and do the following command
				- mysqldump -u 'username' -p 'databasename' > filename.sql *it will export your user on the filename.sql, please change username, databasename by what you put in your .env file*
				- You have a file called filename.sql in your current directory
				- "cat filename.sql" in your container and copy past to your .sql project.
				- Your .sql is ready now to be imported
			- Step 3: relaunch your docker-compose
				- TADA you will be directly in your website by passing the phase of installation
![Wordpress without installation](images/wordpress_page.png)

### Commands to check if all is working :
```c
	SHOW DATABASES; // show the databes
	use 'wordpress'; // go in the wordpress databse
	SHOW TABLES; // show all the tables from the database you selected
	SELECT wp_users.display_name FROM wp_users; // display username from wordpress database
	SELECT *  FROM wp_users; // select
```