---
title: "Hyperconverged with Microk8s and Ceph"
description: "Rebuilding my Microk8s/Ceph Cluster"
author: 'James A. Joy'
date: '2023-06-10'
updated: '2023-06-10'
published: true
---

I have an awesome local MicroK8s/Ceph cluster that I use for many tasks on my local network. Ever since I got it running, I've wanted to document the process of creating one and share it. Now is the perfect opportunity because I have three Orange Pi 5s that I want to try out as MicroK8s nodes to see if it's a viable low-cost alternative to what I'm using now.

Right now, I'm using Compulab Fitlet 2 nodes, and they've been great, but they are a little less than $200 each. The shipping from Israel is pricey, and their availability has gotten far worse with the supply chain crisis. The Orange Pi 5 is $140 per node with free shipping from Amazon, though I'm giving up the Dual NICs, and I'll be switching to an ARM processor from Compulab's Intel Atom.

![Three Orange Pi 5 Single Board Computers](https://jamesjoy.sfo3.cdn.digitaloceanspaces.com/Orange%20Pi%205s.jpg)

The Orange Pi is smaller in general though, and it will be fun to try out 3D-printed cases and probably design my own in the end. I already printed the first one I'll try using white ASA filament. I picked it because it was the most popular one on printables. It came out pretty good.

![Orange Pi 5 with 3D-printed case](https://jamesjoy.sfo3.cdn.digitaloceanspaces.com/Orange%20Pi%205%20with%203D%20Printed%20Case.jpg)

I'm going to document my process of building this over a few posts, which gives me a great opportunity to add a series feature to the site so visitors can binge-read them easily.
