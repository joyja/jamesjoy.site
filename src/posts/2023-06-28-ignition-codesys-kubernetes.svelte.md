---
title: "Ignition & Codesys on Kubernetes 1"
description: "Part 1 of Many: Creating & Connecting"
author: 'James A. Joy'
date: '2023-06-28'
updated: '2023-06-28'
series: 'Ignition/Codesys Cloud Development'
published: true
---

Our Ignition Development environment is in the cloud on Kubernetes, which is super convenient so I can work with my team and clients collaboratively on projects. In case anyone is interested in seeting up something like this for themselves, this is how we do it:

## The Kubernetes Environment

We use Digital Ocean Kubernetes (DOKS) and are really happy with it. Creating the cluster is super easy and Digital Ocean walks you through it pretty well so I won't go through that in detail, but if you want to create a Digital Ocean account you can click the badge below for $200 in credits, and it helps out with my bills too:

<p style="text-align: center;"><a href="https://www.digitalocean.com/?refcode=7eb43ff4819d&amp;utm_campaign=Referral_Invite&amp;utm_medium=Referral_Program&amp;utm_source=badge" rel="nofollow"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge"></a></p>

then you can [create a new Kubernetes cluster](https://cloud.digitalocean.com/kubernetes/clusters/new). Here's a few helpful definitions:

- **Node**: A worker machine that participates in the cluster. In Digital Ocean, each node is a droplet. In Amazon EKS nodes are EC2 instances. If you were to build an on premise Kubernetes environment each node could be a physical or virtual machine. The size and number of nodes is typically what determines the bluk of the cost of your Kubernetes cluster for a given platform, though there are other peripherals we'll get to later.  
- **Pool**: Pool isn't really a Kubernetes term, but most platforms offering Kubernetes have them and it's simply a group of nodes. They come in handy if you have different types of nodes in your cluster. In Digital Ocean, you can specify for your workloads to only run on nodes that are part of a given pool. We only run one three node pool at the moment.

That's the very least to know before you purchase. You can go to the [Digital Ocean Quickstart](https://docs.digitalocean.com/products/kubernetes/quickstart/) for more information.

## Accessing your Cluster

There are two tools we'll use to access the cluster: `doctl` initially to configure our connection and then we'll use `kubetcl` to interact with our cluster from then on.

`doctl` is Digital Ocean's dedicated CLI tool that allows you to control all your Digital Ocean access and it has many helpful utilities. The specific utility we're interested in is automatic configuration of our `kubectl` client to access our Kubernetes environment. We're going to install `doctl` with snap since we mostly use Ubuntu, but you can find instructions for your platform on the [doctl Github](https://github.com/digitalocean/doctl).

`kubectl` is a command-line tool used to interact with Kubernetes clusters. It allows users to deploy, manage, and monitor applications and resources within a Kubernetes environment. We'll also use snap to install `kubectl`, but you can find intructions for your platform in the [Kubernetes Docs](https://kubernetes.io/docs/tasks/tools/).

First we'll install `kubectl`:

```bash
sudo snap install kubectl --classic
```

Then we'll install `doctl`:

```bash
sudo snap install doctl
``` 

Then we'll need a Personal Access Token to allow our tools to accesss the Digital Ocean environmnt, so head over to your [Application & API Dashboard](https://cloud.digitalocean.com/account/api/tokens) and generate a new personal access token. Make sure it has the Write scope and consider how often you'd like to renew it.

Then authenticate `doctl` using your newly created token, it will ask for it after running this command:

```bash
mkdir ~/.config #if it doesn't already exist
doctl auth init
```

Then you'll be able to configure `kubectl` to access your cluster like this:

```bash
mkdir ~/.kube #if it doesn't already exist
doctl kubernetes cluster kubeconfig save {cluster name}
```
Replace `{cluster name}` with the name of your Kubernetes cluster that you set when you created it.

Then you can test your cluster with the following:

```bash
kubectl cluster-info
```

It should return something like:
```bash
Kubernetes control plane is running at https://{Your Cluster ID}.k8s.ondigitalocean.com
CoreDNS is running at https://{Your Cluster ID}.k8s.ondigitalocean.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

Then you're all ready to connect. The next post in the series will be about creating the resources necessary to run the Ignition & Codesys services.