---
title: "Kubernetes Auto Deploy"
description: "Automatically deploying to k8s on push with Github Actions."
author: 'James A. Joy'
date: '2023-06-03'
updated: '2023-06-03'
published: true
---

I used this blog as an excuse to play with automatically deploying to Kubernetes on push with Github Actions. I kind of didn't expect to be able to get through it in an afternoon successfully, but I did! I host our Kubernetes cluster on Digital Ocean, and they have an [excellent guide](https://docs.digitalocean.com/products/kubernetes/how-to/deploy-using-github-actions/) in their Kubernetes docs for deploying from Github Action.

I followed that and after a few failed deploys due to my own mistakes, this blog is up and updated everytime I push to my main branch on Github!

![Github Actions Successful Deploy Checklist](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto/v1686537189/jamesjoy.site/successful_deploy.png)

[The repo for this site](https://github.com/joyja/jamesjoy.site) is public too, so feel free to peruse on Github.

If you want to use Digital Ocean click the badge below for $200 in credits, and it helps out with my bills too:

<p style="text-align: center;"><a href="https://www.digitalocean.com/?refcode=7eb43ff4819d&amp;utm_campaign=Referral_Invite&amp;utm_medium=Referral_Program&amp;utm_source=badge" rel="nofollow"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge"></a></p>

