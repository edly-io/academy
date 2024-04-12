Overview
--------

Docker is a platform for developing, shipping, and running applications in containers. Containers allow developers to package an application with all of its dependencies, including libraries and runtime, and ship it as a single package. This ensures that the application runs consistently across different environments, making it easy to deploy and scale.

Docker "Hello World"
--------------------

Getting started with Docker is as easy as running a "Hello World" container. This section helps you get started with the ``docker`` command.

Make sure Docker is installed on your system. If not, follow the installation instructions for your operating system from the `official Docker website <https://docs.docker.com/get-docker/>`_

Open a terminal and run the following command to download and run the "Hello World" Docker image::

   docker run hello-world

This command does not require root access and is designed to tesTt the basic functionality of your Docker installation.

If the installation is successful, you should see a message confirming that your Docker installation is working::

   Hello from Docker!
   This message shows that your installation appears to be working correctly.

Congratulations! You've successfully run the "Hello World" container with Docker without requiring root access. This is a simple yet crucial step in getting started with Docker.

If user root access is needed, then they should refer to `this <https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user>`__ and run::

   sudo usermod -aG docker $USER

This will add the current user to the "docker" group on a Linux system.

Docker VS Virtual Machines
--------------------------

The overview of Docker may lead to the idea that Docker is another name for a VM but that's not true at all. Docker containerization and virtual machines (VMs) are both technologies that enable the isolation and deployment of applications, yet they differ significantly in their approaches and resource utilization.

Here's a concise comparison highlighting their distinctions:

1. Architecture
~~~~~~~~~~~~~~~

Docker containers share the host system's kernel but encapsulate the application and its dependencies. They leverage containerization technology to provide a lightweight and efficient runtime environment. Containers are portable and can run consistently across various environments.

Virtual machines, on the other hand, emulate an entire operating system (OS) and run on a hypervisor, which is a layer between the hardware and the virtualized instances. VMs require a full OS stack for each instance, leading to a more substantial resource overhead.

2. Resource Utilization
~~~~~~~~~~~~~~~~~~~~~~~

Containers are highly efficient in terms of resource utilization. They share the host OS's kernel, consuming fewer resources compared to VMs. This efficiency allows for faster startup times and facilitates the deployment of more containers on a given host.

VMs necessitate more resources since each instance runs a complete OS with its kernel. This can result in increased memory and storage overhead, potentially leading to slower boot times and more significant resource consumption.

3. Isolation
~~~~~~~~~~~~

Containers provide process-level isolation, ensuring that applications and their dependencies are encapsulated and run independently. However, they share the same OS kernel, which may pose security concerns in certain scenarios.

VMs offer stronger isolation by emulating entire OS environments. Each VM operates as an independent entity with its own kernel, enhancing security but at the cost of increased resource usage.

4. Portability
~~~~~~~~~~~~~~

Docker emphasizes portability. Containers encapsulate the application and its dependencies, making it easier to move and deploy applications across different environments consistently.

VMs, while portable to some extent, are typically bulkier due to their need for a complete OS. Moving VMs across different environments may involve more complexities.

Docker containerization and virtual machines cater to different use cases, with Docker excelling in lightweight, portable applications, and VMs providing stronger isolation for more substantial workloads. Understanding the nuances between these technologies enables informed decisions when choosing the most suitable solution for specific deployment scenarios.


Docker Images (Layered Architecture)
------------------------------------

Docker uses a layered architecture for images, providing efficiency and flexibility. Each layer in a Docker image represents a set of file changes or instructions in the Dockerfile. Layers are cached, and if there are no changes in a particular layer, Docker reuses the cached layer, speeding up the image build process.

The layered architecture allows for incremental builds and facilitates sharing common layers between different images, reducing the overall storage space and improving effeciency.

for example: redis image needs following images to complete itself::

   $ docker pull redis
   Using default tag: latest
   latest: Pulling from library/redis
   1f7ce2fa46ab: Downloading [=======>                                           ]  4.483MB/29.15MB
   3c6368585bf1: Download complete
   3911d271d7d8: Download complete
   ac88aa9d4021: Downloading [====================>                              ]    8.6MB/20.83MB
   127cd75a68a2: Download complete
   4f4fb700ef54: Download complete
   f3993c1104fc: Download complete


Docker Images and Containers
----------------------------

Docker Images
~~~~~~~~~~~~~

- Docker images are the building blocks for containers.
- They are lightweight, standalone, and executable packages that include everything needed to run a piece of software, including the code, runtime, libraries, and system tools.
- Images are defined by a set of layers, each representing a specific instruction in the Dockerfile.

Docker Containers
~~~~~~~~~~~~~~~~~

- Containers are instances of Docker images that run in isolation on the host system.
- They encapsulate the application and its dependencies, ensuring consistent behavior across different environments.
- Containers are portable, enabling seamless deployment across various environments without modification.

Docker Run vs Docker Start
--------------------------

``docker run``:

The primary purpose of ``docker run`` is to create and start a new container based on a specified image.

Key Points
~~~~~~~~~~

- If the specified image is not already available locally, ``docker run`` will attempt to pull it from the Docker Hub or another registry.
- It creates a new container instance based on the specified image and runs the default command (or the command specified) inside the container.
- Supports various options for configuring the container, such as specifying ports, volumes, environment variables, and more.

Example::

   docker run -d -p 8080:80 nginx

``docker start``:

The primary purpose of ``docker start`` is to start an existing stopped container.

Key Points

- It is used when you have a container that was previously created and run (possibly using ``docker run``) and has been stopped.
- It restarts a stopped container, using the same configuration and settings as when it was last stopped.

Example::

   docker start my_container

Despite the clarified distinctions outlined above, one may ponder why Docker necessitates two separate commands for container execution. Let's resolve this potential ambiguity.

``run`` creates a **new/fresh** container of the image and executes it, you can create multiple clones having different ids and names of the same image while the ``start`` only relaunches the already **existing** container. ``start`` is particularly useful for situations where a container has been intentionally stopped, often with the ``docker stop`` command, and needs to be resumed without reconfiguring or recreating it.


Docker Container Debugging
--------------------------

Listing Container
~~~~~~~~~~~~~~~~~~~

To check all the running containers/processes::

   docker ps

Adding the ``-a`` option allows you to view all containers (including stopped).

Viewing Container Logs
~~~~~~~~~~~~~~~~~~~~~~

To check the logs of a container::

   docker logs <container-id>

Adding the ``-f`` option allows you to follow the log output in real-time.

Accessing a Container Shell
~~~~~~~~~~~~~~~~~~~~~~~~~~~

For interactive debugging, accessing a shell inside a running container can be invaluable. Use::

   docker exec -it <container-id> /bin/bash

Replace ``/bin/bash`` with the appropriate shell for your image (e.g., ``/bin/sh``).

Inspecting Container Details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To get detailed information about a container::

   docker inspect <container-id>

This will provide a JSON-formatted response with comprehensive details including configuration, networking, and environment variables.

You can use the ``--format`` option to filter and format specific details from the docker inspect command.
For example, to get only the container's IP address, you can use::

   docker inspect --format='{{ .NetworkSettings.IPAddress }}' container_id

Similarly, to view only the container's environment variables::

   docker inspect --format='{{ .Config.Env }}' container_id

The information extracted from inspect is useful for troubleshooting, debugging, and understanding the runtime environment of your containers.

Attaching to a Running Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To interact with the main process of a running container::

    docker attach <container-id>

This allows you to see the output of the container's main process and send input to it.

Copying Files to/from a Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Files can be moved to/from your local machine and a Docker container::

   # Copy from local to container
   docker cp local_file.txt container_id:/path/in/container/

   # Copy from container to local
   docker cp container_id:/path/in/container/local_file.txt .

This is useful for moving configuration files, scripts, or debugging tools into or out of a container.

Monitoring Container Resource Usage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Monitoring container performance involves tracking various metrics, such as CPU usage, memory utilization, network activity, and storage metrics. To monitor the resource usage of a running container::

   docker stats <container-id>

This command provides real-time statistics on CPU usage, memory usage, network I/O, and block I/O.
Many third-party monitoring tools like Prometheus, Grafana, and Datadog can also be engaged with Docker to provide historical analysis, visualization of container metrics etc. To explore more about them, visit `here <https://sematext.com/blog/docker-container-monitoring/>`__


Docker Networking
-----------------

Docker provides a flexible and powerful networking model that allows containers to communicate with each other and with the outside world.

Docker containers can be connected through various types of networks. To learn about all of them, visit `docker docs <https://docs.docker.com/network/drivers/>`_.

Creating a Bridge Network
~~~~~~~~~~~~~~~~~~~~~~~~~

The default network driver is the **bridge** network, which allows containers on the same host to communicate with each other using their container names. Each container connected to the bridge network gets its own IP address.

To create a custom bridge network::

   docker network create my-bridge-network

This creates a new bridge network named `my-bridge-network`.

Connecting Containers to a Network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When starting a container, you can specify the network it should connect to:

   docker run --network=my-bridge-network -d --name=container1 my-image

Here, `my-bridge-network` is the name of the network, and `container1` is the name of the running container.

Inspecting Networks
~~~~~~~~~~~~~~~~~~~

To view details about a Docker network, use::

   docker network inspect <network-name>

This command provides information such as network ID, subnet, gateway, and connected containers.

Docker Volumes
--------------

Docker volumes provide a flexible and persistent way to manage data in containers. Volumes allow data to be shared and stored independently of the container lifecycle, ensuring that data persists even when containers are stopped or removed. Volumes can be shared among multiple containers, facilitating data collaboration.

Creating Volumes
~~~~~~~~~~~~~~~~

Docker volumes can be created::

   docker volume create <volume-name>

Attaching Volumes to Containers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To use a volume, you need to attach it to a container during the container creation or when starting an existing container::

   docker run -v <volume-name>:/path/in/container -d <image>

Here, `/path/in/container` is the path where the volume is mounted inside the container.

Inspecting Volumes
~~~~~~~~~~~~~~~~~~

To view details about a Docker volume::

   docker volume inspect <volume-name>

This command provides information about the volume, such as its name, driver, mount point, and labels.

For more detailed information, refer to the official `Docker documentation <https://docs.docker.com/storage/volumes/>`_ on volumes.


Docker Compose
--------------

Managing all containers, networks, volumes can sometimes get a little overwhelmed but don't worry, that's where docker-compese comes into play. Using Docker Compose simplifies the process of orchestrating multi-container applications, and it is particularly useful for development, testing, and staging environments.

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to describe all services, networks, and volumes in a single `docker-compose.yml` file, serves as a blueprint for defining the entire application stack, making it easy to manage and deploy complex applications.

Key Concepts
~~~~~~~~~~~~

- Services: Services represent the containers that make up the application.
- Networking: Defines how containers communicate with each other.
- Volume Mounts: Persists data generated by and used by containers.
- Environment Variables and Configuration: Docker Compose allows you to set environment variables for services, making it simple to configure different environments (e.g., development, testing, production) without modifying the application code.
- Scaling: Docker Compose makes it easy to scale services horizontally by specifying the number of replicas for a service. This is useful for load balancing and improving application performance.

Docker Compose Common Commands
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Navigate to the directory containing your ``docker-compose.yml`` file and run::

   docker-compose up

This command creates and starts the containers defined in the ``docker-compose.yml`` file. To run it in detached mode, use ``docker-compose up -d``

Inversely, to stop and remove the containers::

   docker-compose down

After changes to your Dockerfile or related build context::

   docker-compose build

This will (re)build the services.

To scale a service to the specified number of replicas::

   docker-compose up --scale <service_name>=<number_of_replicas>

Scaling is useful in scenarios where you want to distribute incoming requests or workloads across multiple instances of a service.

To see and validate the composed configuration, use::

   docker-compose config

Note: These commands can only execute in the same directory as ``docker-compose.yml``

Example
~~~~~~~

Let’s dive deep into an example to learn how docker-compose actually saves the day.

To clearify the picture and understand the struture of docker-compose, take a trivial example to create and start two docker containers i-e mongodb and mongo-express and connect them via a single docker network.

1. Let's first do it without using docker-compose.

- First create a docker-network for containers to communicate using just the container name::

   Docker network create mongo-net

- Start mongodb container::

   docker run -d \                                     (running in the detach mode)
   -p 27017:27017 \                                    (specify the port)
   -e MONGO_INITDB_ROOT_USERNAME=admin \               (specify environment variable)
   -e MONGO_INITDB_ROOT_PASSWORD=password \            (specify environment variable)
   –net mongo-network \					                   (network for container)
   –name mongodb \	           					          (container name)
   mongo 							                         (image name)

- Start mongo-express container::

   docker run -d \                                     (running in the detach mode)
   -p 8081:8081 \                                      (specify the port)
   -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \          (specify environment variable)
   -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \       (specify environment variable)
   -e ME_CONFIG_MONGODB_SERVER=mongodb\                (specify environment variable (mongodb container) )
   –net mongo-network \                                (network for container)
   –name mongo-express \                               (container name)
   mongo-express                                       (image name)


2. Now, let’s try to achieve the same outcome with a ``docker-compose.yml`` file

- Structure of docker-compose::

   Version: ‘<latest-version>’
   Services:					                              (list of containers)
   mongodb:				                                    (container name)
   		image:mongo			                              (image need to create container)
   		ports:
   		   -27017:27017		                           (port host:container)
   		environment:				                        (environment variables)
                  -MONGO_INITDB_ROOT_USERNAME=admin
                  -MONGO_INITDB_ROOT_PASSWORD=password

      mongo-express:					                        (container name)
   		image:mongo-express			                     (image need to create container)
   		ports:
   		   -8081:8081				                        (port host:container)
   		environment:					                     (environment variables)
                  -ME_CONFIG_MONGODB_ADMINUSERNAME=admin
                  -ME_CONFIG_MONGODB_ADMINPASSWORD=password
                  -ME_CONFIG_MONGODB_SERVER=mongodb


You would have noticed that the network configuration is not there in the docker-compose. Docker compose takes care of creating a common network for containers, so we don’t have to create the network manually.

Dockerfile (An Image Blueprint)
-------------------------------

Until this section, we have only explored the already build images but we also need to know how to build our own image and eventually build a container using that. A Dockerfile is a script to define the steps and instructions for building a Docker image. It serves as a blueprint for images. The Dockerfile specifies the base image, sets up the environment, installs dependencies, copies application code, and configures the container. It's a good idea to get familiar with the dockerfile commands and syntax which follows pretty much the same pattern across different usecases.

This below example Dockerfile is for a Flask application and includes common Dockerfile instructions::

   FROM ubuntu:20.04                                        # Use an official base image

   WORKDIR /app                                             # Set the working directory inside the container

   COPY . /app                                              # Copy the local directory's contents into the container at /app

   RUN apt-get update && \                                  # Install necessary dependencies
       apt-get install -y \
       python3 \
       python3-pip \
       && rm -rf /var/lib/apt/lists/*

   RUN pip3 install -r requirements.txt                     # Install Python dependencies

   EXPOSE 5000                                              # Expose port 5000 to the outside world

   ENV FLASK_APP=app.py                                     # Define environment variable

   CMD ["flask", "run", "--host=0.0.0.0"]                   # Command to run on container start


Now, Let's destructure this sample dockerfile and look deeply on each dockerfile command.

`FROM <https://docs.docker.com/engine/reference/builder/#from>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: First line of every dockerfile is almost always ``FROM <image>``, so whatever image you’re building, you always want to base it on another existing image.

``FROM ubuntu:20.04``: A ready ubuntu image (tag:20.04) is being used to base our image on. This means that we are going to have ubuntu installed in our image so when we start a container and use CLI, we can see that ubuntu commands are available.

It's important to note that unless a registry is specified, it is assumed that images are pulled from `DockerHub <https://hub.docker.com/>`__ . Users can search for specific existing imaage tags. For instance, to explore available Ubuntu tags, visit https://hub.docker.com/_/ubuntu/tags?page=1&name=20.


Format: ``FROM <image>[:version]``

`WORKDIR <https://docs.docker.com/engine/reference/builder/#workdir>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it in the Dockerfile. WORKDIR is necessary because Dockerfile authors can't just ``RUN cd /some/path`` That path would not be preserved across RUN instructions.

``WORKDIR /app``: When the container is created and started from image, /home/app directory will be created inside the container file system and not on the host machine.  /app will now be the active directory where all ``RUN``, ``CMD`` etc will execute.

Format: ``WORKDIR /path/to/directory``

`COPY <https://docs.docker.com/engine/reference/builder/#copy>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: Copies files or directories from the build context (local machine) to the container's filesystem. The difference between COPY and RUN is that RUN commands get executed inside the container but COPY command executes on the host.

``COPY . /app``: This can copy the contect from host current directory as dockerfile to inside the specified directory of the container i-e /app

Format: ``COPY <src> <dest>``

`ADD <https://docs.docker.com/engine/reference/builder/#add>`__ : Similar to COPY but has additional features, such as extracting compressed files and downloading files from URLs.

`RUN <https://docs.docker.com/engine/reference/builder/#run>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: A command following 'RUN' executes in a new layer on top of the current image and commits the results. Used for installing packages, updating repositories, or any command-line operations. Using run, you can run any linux commands.

``RUN pip3 install -r requirements.txt``: When the container is created and started from image, this will install all the requirements required for the project to run successfully. (likewise for in the local machine setup)

Format: ``RUN <command>``

`EXPOSE <https://docs.docker.com/engine/reference/builder/#expose>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: Informs Docker that the container listens on specified network ports at runtime. It does not publish the ports to the host machine; rather, it is more of a documentation feature.

``EXPOSE 5000``: Informs Docker that the container will listen on port 5000 at runtime.

Format: ``EXPOSE <port> [<port>/<protocol>]``

Note: Expose doesn't inherently make the specified ports accessible from outside the container. This can lead to confusion, as developers might expect the container to be reachable on the specified ports directly. Instead, use `-p` or `--publish` when running the container to explicitly publish and map ports.


`ENV <https://docs.docker.com/engine/reference/builder/#env>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: Sets environment variables in the image. These variables are available to subsequent instructions in the Dockerfile. We have already done it using the ``docker run`` command or in ``docker-compose`` but this is another alternative to define these variables (though preferred way is to write in docker-compose).

``ENV FLASK_APP=app.py``: Sets an environment variable ``FLASK_APP`` with the value ``app.py``.

Format: ``ENV <key> <value>``

Note: Avoid attempting to set environment variables using ``RUN export MY_VAR=somevalue`` Instead, use the ``ENV`` instruction. For example, to add a path to the environment, use::

   ENV PATH=/some/path:${PATH}

Environment variables can then be referenced using the `$VAR` syntax in subsequent instructions in the Dockerfile. This ensures a consistent and reliable way to manage environment configurations within your Docker image.

`CMD <https://docs.docker.com/engine/reference/builder/#cmd>`__
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Description: Defines the default command to run when a container is started. If a command is provided during container startup, it overrides the CMD instruction. The CMD is always part of dockerfile, it executes an entrypoint linux command.

``CMD ["flask", "run", "--host=0.0.0.0"]``: This command is equivilent to ``flask run --host=0.0.0.0`` on local machine which actually starts the server in the container

An ambiguity may arise here between ``CMD`` and ``RUN`` command as one can say that ``RUN flask run --host=0.0.0.0`` might also be used as an alternative but that is not it. CMD is an entrypoint command which can only be a single command in the dockerfile which in this case can run the server in container and nothing else..

Format: ``CMD ["executable","param1","param2"]`` (exec form) or ``CMD command param1 param2`` (shell form)

`ENTRYPOINT <https://docs.docker.com/engine/reference/builder/#entrypoint>`__ Similar to CMD, it allows you to configure a container to run a specific command. The difference is that the CMD command can be overridden by the container command-line args, while ENTRYPOINT cannot.

To conclude, ``ENTRYPOINT`` is used to define the main executable of the container, while ``CMD`` is used to provide default arguments for that executable or to specify a default command if there is no ``ENTRYPOINT``. They can be used together to create a flexible and customizable container. If you want to explore further about ENTRYPOINT and CMD, you can refer `here <https://spacelift.io/blog/docker-entrypoint-vs-cmd>`__

To explore this section further, you can always refer to `docker official docs <https://docs.docker.com/engine/reference/builder/>`__.

Image Build
-----------

In order to build an image from dockerfile, we have to provide two parameters. First is the  (-t) tag and the second required parameter is path to dockerfile directory::

   docker build -t <name>[:version] path/to/dockerfile

Example : ``Docker build -t my-app:1.0 .``

This will build the image from the dockerfile. Now the image prepared can allow us to create and start a container using ``docker run``::

   docker run <image-name>:<version>

Now, whenever any change in the dockerfile, the image needs to be build again and so is the container.

Build Optimization
------------------

Optimzing docker images for build is a fundamental step in containerized application development. Efficient Docker builds not only save time during development but also contribute to faster deployments and reduce the overall footprint of containerized applications. Always keep the below points in mind to generate optimized images.

1. Layer Caching
~~~~~~~~~~~~~~~~

- Leveraging Cache Layers: Docker uses a layered file system, and each instruction in a Dockerfile creates a new layer. Utilizing caching effectively can significantly speed up builds. Place instructions that are less likely to change frequently (e.g., package installations) early in the Dockerfile to maximize cache reuse.

- Explicit Cache Invalidation: When an instruction is expected to change frequently, use explicit cache invalidation points. For instance, include a timestamp or version number in the instruction to force Docker to ignore the cache for subsequent steps when the input changes.


2. Image Multi-Stage Build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Docker multi-stage builds allow you to create more efficient Docker images by using multiple `FROM` instructions in a single Dockerfile by splitting your dockerfile into stages. This way, you can build the application in one stage and copy only the necessary components that the application needs to run to the final image. This technique is particularly useful when you need build tools and dependencies during the build stage but want to keep the final image small and optimized.

Benefits

   1. Reduced Image Size: Multi-stage builds help minimize the size of the final Docker image by discarding unnecessary artifacts and dependencies from intermediate build stages.

   2. Enhanced Build Performance: Multi-stage builds help parallelize the build process, enabling independent stages to be built simultaneously. This parallelization capability allows Docker to cache intermediate layers, making subsequent builds significantly faster by executing only the changed layers.

   3. Isolation of Build Dependencies: Build dependencies and tools are isolated to the build stage, ensuring that only the necessary artifacts are included in the final image.

   4. Improved Security: By removing unnecessary components in the final stage, you reduce the attack surface and enhance the security of your Docker images.

Each stage in the Dockerfile will generate its container image. However, when the build process concludes, Docker consolidates only one of these images into the local container registry (default image = final stage).If you prefer to use the image from a different stage, you can specify the target stage using the ``target=<stage name>`` option with the ``docker build`` command.

Example::

   # Build Stage
   FROM node:14 AS builder

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .

   # Build the application
   RUN npm run build

   # Final Stage
   FROM nginx:alpine

   # Copy built artifacts from the build stage to the final stage
   COPY --from=builder /app/dist /usr/share/nginx/html

   EXPOSE 80

   CMD ["nginx", "-g", "daemon off;"]

This example demonstrates a Node.js application where the build stage installs dependencies, builds the application, and the final stage copies only the **necessary artifacts** to an Nginx base image, Hence, resulting in a more smaller and optimized image.

3. Minimize Image Layers
~~~~~~~~~~~~~~~~~~~~~~~~

- Combining RUN Instructions: Combine multiple RUN instructions into a single instruction, using && or \ to concatenate commands. This reduces the number of layers in the image, improving build performance and reducing image size. for example::

   RUN npm install \
    && npm run build

This means that both commands will be executed in the same layer, reducing the number of layers in the resulting image.

- Cleaning Up: Remove unnecessary files and artifacts within the same layer where they are created. This can be achieved using the && operator within a single RUN instruction. Cleaning up unnecessary files reduces the size of the image. for example::

   RUN npm install \
    && npm prune --production
    # Cleanup unnecessary files (e.g., development dependencies)

We use the ``&&`` to combine the ``npm install`` and the subsequent cleanup command ``npm prune --production`` within the same RUN instruction. This ensures that unnecessary development dependencies are removed immediately after installing the production dependencies.

4. Parallelize Builds
~~~~~~~~~~~~~~~~~~~~~

- Docker BuildKit: Introduced in Docker 18.09, enables parallel builds and better resource utilization. It allows for concurrent execution of independent build stages, resulting in faster build times. For projects with multiple build stages that are independent of each other, consider parallelizing these stages. This can be achieved by running separate build processes for different stages simultaneously.

To learn more about this, refer to the `docker buildkit <https://docs.docker.com/build/buildkit/>`__.

5. Minimize Build Context
~~~~~~~~~~~~~~~~~~~~~~~~~

- The build context includes files and directories that are sent to the Docker daemon during the build process. Minimize the size of the build context by excluding unnecessary files or utilizing .dockerignore to exclude files and directories that don't contribute to the build.

- For large projects, consider using a remote build context rather than sending all files to the Docker daemon. This can be achieved using the ``docker build - < Dockerfile`` allowing the Dockerfile to be read from stdin. To learn in more depth about this, visit `docker remote content <https://docs.docker.com/build/building/context/#remote-context>`__.

Continuous Integration and Deployment with Docker
-------------------------------------------------

Continuous Integration (CI) and Continuous Deployment (CD) are essential practices in modern software development that aim to streamline the process of building, testing, and deploying code changes. When combined with Docker, offer a powerful solution for automating and enhancing the software delivery lifecycle.

Continuous Integration (CI)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

CI involves automatically integrating code changes from multiple contributors into a shared repository. CI tools like `Jenkins <https://www.jenkins.io/>`__, `Travis CI <https://www.travis-ci.com/>`__, or `GitLab CI <https://about.gitlab.com/solutions/continuous-integration/>`__ can be configured to trigger automated builds whenever changes are pushed to the repository. During the CI process, Docker images are built, and tests are executed within isolated containers, ensuring reproducibility and consistency.

Continuous Deployment (CD)
~~~~~~~~~~~~~~~~~~~~~~~~~~

CD extends CI by automatically deploying code to production or staging environments after successful integration and testing. Docker provides a lightweight and portable environment for applications, allowing seamless deployment across different environments. CD tools, such as `Kubernetes <https://kubernetes.io/>`__, `Docker Swarm <https://docs.docker.com/engine/swarm/>`__, or cloud-based solutions like `AWS ECS <https://aws.amazon.com/ecs/>`__, can orchestrate the deployment of Docker containers to various target environments.

Benefits:

- Accelerate Deployment: Enable rapid code delivery with automated testing for daily and even hourly releases, ensuring high-quality meeting predefined criteria in production.
- Streamline Operations: CI/CD automates DevOps tasks, reducing manual effort and errors across various lifecycle stages, from handoffs to testing, improving efficiency.
- Prevent Downtime: A robust CI/CD pipeline supports continuous integration of small code batches, enabling early issue detection and preventing significant outages and vulnerabilities.
- Elevate Code Quality: CI/CD pipelines facilitate collaborative code integration in small increments, enhancing overall code quality by eliminating siloed work.
- Facilitate Rollback: CI/CD provides an efficient rollback mechanism, empowering quick identification of production issues. In the event of any issues, the process enables a prompt recovery by rollback.

Workflow:

1. Developers commit code changes to the version control system (e.g., Git).
2. CI tool detects changes and triggers an automated build.
3. Docker images are built, and tests are run within containers.
4. If tests pass, the Docker image is tagged and pushed to a registry.
5. CD tool deploys the updated container to the target environment.

Common Troubleshooting
----------------------

1. Docker Daemon Not Running
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Issue: Docker commands fail because the Docker daemon is not running.
- Solution: Start the Docker daemon using either::

      sudo systemctl start docker  # on systems using systemd
      sudo service docker start    # on systems using init.d

2. Insufficient Disk Space
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Issue: Running out of disk space on the host machine.
- Solution:
   1. Identify Disk Space Usage

      Before taking any corrective actions, it's essential to understand what is consuming the disk space.
      Run the following command to get a breakdown of Docker's disk usage::

         docker system df

      This command will show the usage of data in volumes, images, and containers. Analyze the output to identify which source is using up the most space.

   2. Clean up Unused Docker Resources

      Once you've identified the source of high disk usage, you can proceed to clean up unused Docker resources. Use the following command::

         docker system prune -a

      This command removes all stopped containers, dangling images, and unused networks and volumes. It helps free up disk space by removing unnecessary Docker artifacts.

   3. Additional Cleanup (if needed)

      Depending on your analysis in Step 1, you might need to perform more targeted cleanup. For example:

      - To remove specific images, use::

         docker image rm <image_id>

      - To remove specific containers, use::

         docker container rm <container_id>

      - To remove specific volumes, use::

         docker volume rm <volume_name>

      Be cautious when removing specific resources, as it may impact running containers or services.


3. Port Already in Use
~~~~~~~~~~~~~~~~~~~~~~

- Issue: Unable to start a container because the specified port is already in use.
- Solution:
   - Choose a different port, or stop the process using the occupied port.
      hint: To filter and display information about running Docker containers, based on the presence of a specific port, use::

         docker ps | grep <PORT>

4. Image Not Found Locally
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Issue: Docker cannot find the specified image locally.
- Solution:
   - Pull the image from the registry using::

      docker pull image_name:version


Checkout this `cheatsheet <https://quickref.me/docker>`_ for a quick summary of common docker commands.
