===========================
Install Open edX with Tutor
===========================

Hi! If you are watching this video, then you probably want to install Open edX on your server. That's exactly what we are going to do here. If you are not quite ready yet and you want to learn more about Open edX and Tutor first, that will be the topic of another video.

Server
======

Let's get started. Before we do anything, we are going to need two things: a server and a domain name. That server should have `at the very minimum <https://docs.tutor.edly.io/install.html#requirements>`__ 4GB of memory, 2 CPUs and 8 GB of disk space. But really, to run a production server comfortably, we need at least 8GB of memory, 4 CPU and 25 GB of disk space.

We can pick a server from any provider, such as `AWS <https://aws.amazon.com/>`__, `Azure <https://azure.microsoft.com/en-us>`__, `Google Cloud <https://cloud.google.com/>`__ or even a bare metal instance. My personal favorite, for reasons of price, performance, reliability and ease of use, is `DigitalOcean <https://www.digitalocean.com/>`__.

Note that we can use any operating system that supports Docker. In this video, we will be running Ubuntu version 22.04.

DNS records
===========

Once we have launched our server, we should copy its public IP address. We are going to configure our DNS records to point to this IP address.

In this example, we have registered a domain name with `Namecheap <https://www.namecheap.com>`__, which is a popular registrar. But we could follow the same procedure with any other domain name registrar.

First, we are going to create an A-type DNS record to point to our server. This record will be the address of our LMS. Here, our LMS will run at learn.edly.academy. So we create a record for that "learn" subdomain. Then, we create a CNAME record to point all subdomains of the LMS domain to the same server. That way, requests sent to any subdomain of our LMS will also be forwarded to our server.

DNS propagation is going to take some time after we have created the DNS records: typically a few minutes. We can check the status of DNS propagation with an online tool such as `DNSchecker.com <https://dnschecker.com>`__.

Once our DNS records have been successfully propagated, we can start installing Open edX on our server.

User creation
=============

To do that, we ssh to our server. Here, we are connecting as root. But we really, really do not want to run Open edX as root. So the first thing we do is create a non-root user. We will call it "openedx". We are going to install a few packages as root before we login as this new user.
Requirements installation
To install Open edX, we are going to run Tutor. And to run Tutor, we need three things: Python, Docker and Docker Compose. On Ubuntu, each of these can be installed from the apt package repositories.

Docker
------

To install Docker and the compose plugin, we follow the `instructions <https://docs.docker.com/engine/install/>`__ from the Docker documentation::

    curl https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor > /etc/apt/keyrings/d.gpg
    echo 'deb [arch="amd64" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "jammy" stable"' > /etc/apt/sources.list.d/docker.list
    apt update
    apt install docker-ce docker-compose-plugin

Our "openedx" user needs access to Docker. To do that, we add the user to the "docker" group. We can then verify that the "openedx" user can run Docker by running the hello-world image::

    su openedx
    docker run hello-world

It is imperative that we are able to run this command successfully as a user which is not root.

In some cases, the operating system does not pick up the addition of the user to the "docker" group. We can check if that was successful by running the "groups" command. The "docker" string should be included in the output of that command. If it isn't, then we should exit our user session and start a new session. When we login again, with "su openedx", our user should belong to the "docker" group.

Python
------

Once our user can successfully run Docker commands, we can move on to the next step, which is the installation of Python and pip, which is the Python package manager. We can check whether pip is already installed by running "which pip". If this command does not yield anything, then it means that pip is not installed on our system, and we must install it. To do that, we run::

    apt install python3-pip

We can verify that pip is correctly installed by running "which pip" again. On some systems, "pip" is actually "pip3". For those systems, we should replace "pip" by "pip3" in all subsequent commands. 
Tutor installation
Once we have both Docker and Python on our system, we are ready to install Tutor. We do that by running::

    pip install 'tutor[full]'

This command installs Tutor in the ``~/.local/bin directory``. But our system does not know about this directory. So, after we install Tutor, we still cannot run "tutor" commands. To resolve this, we are going to tell the system about Tutor. We switch back to root and create a symbolic link from our tutor executable to /usr/local/bin. Then, we switch back to our "openedx" user and now we can run "tutor" commands.

Open edX
========

OK now comes the exciting part! Let's install Open edX. Tutor is famous for its one-click installation. Everything happens in a single command::

    tutor local launch

We are then prompted to configure our Open edX installation. There, we write the domain name of our LMS. If we make any mistake during this procedure, we can just cancel it by typing control-c and running the same "tutor local launch" command again. We do want to enable SSL certificates, because we adequately configured our DNS records. These SSL certificates will be generated automatically.

After that, we are pretty much done and we can watch the platform installation go through the different steps. The installation should take about 20 to 40 minutes. It should complete very reliably, provided we have enough memory, disk space and network bandwidth.

User creation
-------------

After the installation is complete, we are able to access the platform from our own browser. But we can't login! That's because we should create an admin user account. To do that, we run the createuser command::

    tutor local do createuser --staff --superuser admin admin@edly.academy

After this command completes successfully, we can login with the username and password we just created.

Demo course creation
--------------------

But there is no course there! Let's import the official demo course. To do that, we run::

    tutor local do importdemocourse

And then we can check out the demo course right in our LMS.

Forum plugin
------------

We can run the "tutor local launch" command again at any point. For instance, to enable the forum feature, we should enable the "forum" plugin. To do that, we run::

    tutor plugins enable forum

And then we launch the platform again::

    tutor local launch

After a while, the forum is properly initialized.

Last words
----------

And there you have it: a fully operational Open edX platform! We'll be rolling out more videos on Open edX and Tutor in the near future, so keep an eye on this channel. Catch you in the next video!
