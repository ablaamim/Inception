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

> First download a stable version of debian:buster and install it properly (Better install it with GUI).

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

```
$> apt-get install sudo ufw vim tree apt-transport-https ca-certificates curl git systemd 
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
$ ufw allow 42
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
* TCP                            42            		              42     *
**************************************************************************

```
---

> In your host (physical) machine open Terminal and run [ssh @localhost -p 4242]
Now you can control your virtual machine from the host terminal!

---

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

#### Install docker :

---

```
$> sudo apt-get install docker
```
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

#### Container OS :

---

> Depending on the subject specification , debian:buster or alpine can be used as the OS to be based on the container . Since alpine has been chosen and used a lot as a lightweight OS on the container, tgars why better you choose it. alpine 3.13 to be more precised !

---

#### Nginx :

---


