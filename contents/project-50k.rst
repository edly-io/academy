The following is a business case analysis of a real-life load-testing scenario that Edly implemented for a customer on the Oracle Cloud platform. Details were presented during a conversation between Régis Behmo (VP of Engineering) and the SRE team who successfully led the project.

**Régis Behmo:** Last month (Dec. 2023), `Edly <https://edly.io>`__ engineers performed an impressive achievement by successfully running an `Open edX <https://openedx.org>`__ platform with **fifty thousand concurrent users**. To the best of my knowledge, this is the first time that this figure was reached. Today, I'm sitting with Jalal, Wahaj and Zakaria who are part of the team who lead this project. Can you tell us what's your role at Edly and what's your experience about Open edX?

**Muhammad Jalal ud Din:** Hi, I am working as a DevOps lead engineer here at Edly. I have been working with Open edX for quite some time now. Mostly I have worked with `Ansible <https://docs.ansible.com/ansible/latest/index.html>`__-based deployments for small- to medium-scale organizations as well as `Edly SaaS <https://edly.io/edly-lms/>`__ (a large, multi-tier deployment of Open edX). Over the past two years or so, we have started working with `Tutor </academy/what-is-tutor>`__-based deployments. This project is the largest deployment we have made so far with Tutor and `Kubernetes <https://kubernetes.io/>`__.

**Wahaj Akmal:** Hello, I'm a DevOps Engineer at Edly. Over the last 1.5 years, I've been involved mainly in deploying Open edX with Tutor. I've had the opportunity to deploy Open edX on `Amazon EKS <https://aws.amazon.com/eks/>`__ and `Oracle Kubernetes Engine (OKE) <https://www.oracle.com/cloud/cloud-native/container-engine-kubernetes/>`__ clusters. Given my expertise on containerization platforms, I've been actively engaged in deploying Tutor on Kubernetes.

**Muhammad Zakaria:** Hi, I work as a DevOps engineer on Open edX at Edly. I've been working with `Terraform <https://www.terraform.io/>`__ and OKE — that's where I got the opportunity to deploy and manage Open edX with Tutor. One of the key challenges of this project was that we needed to demonstrate the stability of the platform under heavy load. The target metric was fifty thousand concurrent users. This  required changes in terms of infrastructure and Kubernetes architecture.

**Régis:** What was the general context of this project? I understand there were stringent technical constraints, both in terms of software and hardware.

**Jalal:** This project was very stressful from day one, because we worked under tough constraints, with short deadlines and ambitious goals. We had to achieve these milestones, and at the same time undergo thorough security audits. Also, we were working with a very limited budget, in terms of hardware and cloud resources. Finally, for compliance reasons, the platform was being deployed in a Middle East region (specifically: `Jeddah <https://www.oracle.com/sa/cloud/>`__) where Oracle Cloud was the only provider.

**Régis:** What was the reason behind the choice of the Jeddah availability region?

**Zakaria:** Data security and accessibility restricted to the Saudi Arabia region.

**Régis:** How did you approach this challenge, given that you had no previous experience with some components of the technical stack?

**Jalal:** We had a fair amount of experience deploying applications with Kubernetes. We were also very familiar with Tutor local deployments. Generally, I think our extensive experience with Open edX helped us a lot. We spend a lot of time on the Tutor forum and documentation pages! And of course we brought you in for some Tutor-specific issues we couldn't figure out on our own.

**Wahaj:** I've been involved with Kubernetes for almost five years and have successfully deployed many projects on the platform. This was my first Kubernetes project at Edly, so there was a short learning curve. The approach made sense to me as soon as I realized that Tutor utilizes `kustomize manifest files <https://kustomize.io/>` — a tool I've been familiar with for quite some time. Whenever I got stuck in any issue we used to brainstorm within the team or reach out to you to understand how Tutor is working under the hood.

**Régis:** Can you tell us about the specifics of the Oracle Cloud environment? How does it compare with other well-known cloud providers?

**Jalal:** This cloud provider in itself posed a few challenges: for instance, it did not provide `Redis <https://redis.io/>`__, `ElasticSearch <https://www.elastic.co>`__ or `MongoDB <https://www.mongodb.com/>`__ as services, which are an essential components of any Open edX platform. Moreover, this was our first experience with Oracle Cloud, so we were discovering issues as we went, such as limited hardware capacity.

**Wahaj:** This hardware capacity issue was particularly problematic. We faced an issue where we could not increase the number of nodes in our Kubernetes cluster. We discovered that when we ran into the dreaded `out-of-host capacity error <https://www.google.com/search?hl=fr&q=out%2Dof%2Dhost%20capacity>`__. It turns out that Oracle had reached maximum datacenter capacity in the Jeddah region, so we simply could not launch new nodes. This meant that we could not perform cluster autoscaling. Not only did we have limited node capacity, but the node performance didn't match up well with AWS EKS in terms of performance.

**Régis:** In addition, you had to run Redis, ElasticSearch and MongoDB on premises, right?

**Zakaria:** Yes, we relied on the manifests provided by Tutor to deploy these three services. Though we had to adjust the manifests to deploy a `multi-node MongoDB cluster on Kubernetes <https://www.mongodb.com/products/integrations/kubernetes>`__.

**Wahaj:** Because these services were not provided by Oracle Cloud as managed services, we had to run them in the cluster, leaving even less space for application nodes. So we had to find creative solutions, all under a tight deadline.

**Jalal:** Furthermore, OKE has a single ``me-jeddah-1`` region, which limited our capacity for high availability.

**Régis:** OK that sounds challenging. But what does Oracle Cloud have going for it?

**Wahaj:** The logging tool in OKE proved to be effective, allowing us to view all resources, including nodes, deployments, and pods within the OKE cluster. This feature significantly facilitated our debugging process.

**Jalal:** Oracle cloud offers pretty decent services in terms of uptime and availability, when we don't run into the capacity issue. OKE also offers MySQL as a service, called `Heatwave <https://www.oracle.com/mysql/heatwave/>`__.

**Régis:** It does sound like a challenging technical environment to work in. Let's talk about how you achieved that 50k milestone in that context. I understand it was not actual traffic, but you conducted load testing on the platform, right?

**Jalal:** That's correct. It was not actual traffic: we used the `Locust <https://locust.io/>`__ load-testing framework to mimic the behaviour of actual traffic.

**Wahaj:** Reaching the 50k milestone presented a genuine challenge. We initially adopted a trial-and-error approach to observe the behavior of the OKE cluster nodes, pods, and `Nginx ingress <https://docs.nginx.com/nginx-ingress-controller/>`. With each iteration, we identified and addressed shortcomings, gradually configuring each component as necessary. While our attempt to horizontally auto-scale the LMS pods proved ineffective, we pivoted our strategy to vertically scale the pods until reaching the 50k mark. Throughout this process, adjustments to the Nginx ingress configuration were also necessary.

**Régis:** More specifically, what adjustments did you make?

**Wahaj:** We made many changes to the Nginx ingress configuration in the initial stage. Including::

    nginx.ingress.kubernetes.io/keep-alive-requests: "5000"
    nginx.ingress.kubernetes.io/limit-connections: "5000"
    nginx.ingress.kubernetes.io/proxy-body-size: "500M"
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "3600s"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600s"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600s"
    nginx.ingress.kubernetes.io/service-upstream: "true"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/timeout-socket: "120s"

Also, we updated some Open edX variables in the Tutor configuration to maximise the limits of requests from each testing machine. More specifically, we increased the number of uwsgi workers to 5 with::

    tutor config save --set OPENEDX_LMS_UWSGI_WORKERS=5

We then tuned the buffer configuration of `uwsgi <https://uwsgi-docs.readthedocs.io>`__ workers:

- `buffer-size <https://uwsgi-docs.readthedocs.io/en/latest/Options.html#buffer-size>`__ = 16000
- `post-buffering-bufsize <https://uwsgi-docs.readthedocs.io/en/latest/Options.html#post-buffering-bufsize>`__ = 8192

**Régis:** Awesome. Let's talk about the load testing client configuration of Locust. How many worker nodes were you running?

**Jalal:** We used one master node and 50 workers nodes from where we distributed the 50k concurrent requests. Load test flow was as follows: once a user is logged-in, it will have multiple options according to some assigned weights:

1. Go to Dashboard → Profile → Account section
2. Course enrollment
3. View Courses → Open course → Start course
4. Navigate to programs section

After login, each virtual user followed the above mentioned flow with some assigned weight probability.

**Régis:** During this load test, which service(s) did you have to horizontally scale up? How many pods on how many nodes did you end up with?

**Jalal:** During the whole load-testing benchmark, we used multiple approaches. Initially, we tried to horizontally scale pods based on resource usage, with multiple pods per node. But the results were not very promising, so we decided to dump this approach. We went forward with vertical pod scaling, where we had just one pod per node, and each node had maximum resource. We did this for the LMS, the CMS and WordPress (which is used as a marketing catalog for the LMS).

As we increased the load, one LMS pod started choking. So we decided to add more nodes, keeping just one pod per node. In the final iteration of the test we were running 5 LMS pods on 5 separate nodes. We were doing the same for the CMS and WordPress (2 nodes and 1 node respectively). We used the 4 remaining nodes for the other services and we went with horizontal pod auto-scaling.

**Wahaj:** This brought us to a total of 12 nodes in the OKE cluster. But we discovered that we could improve that figure and optimize costs by packing all services except the LMS on just 2 nodes. This brought us to a total of **7 nodes**. With this architecture, we were able to reach 50k concurrent users.

This architecture is not optimal, in terms of high availability, but it meant that we could achieve the desired milestone with minimal costs.

**Régis:** Given the small amount of nodes, I expect that they must have high-end specs?

**Wahaj:** We were running `VM.Standard.E4.Flex <https://docs.oracle.com/en-us/iaas/Content/Compute/References/computeshapes.htm>`__ virtual machines with 30 OCPUs and 128 GB memory. Our boot volume was buffed up to 80GB.

**Jalal:** We could have used lower-specs machines, but the Oracle Capacity really kept our hands tied throughout the process.

**Régis:** This makes this achievement all the more impressive. Thank you all for taking the time and sharing the detailed information!
