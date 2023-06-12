---
title: "Kubernetes Ingress Compression"
description: "Enabling Gzip/Brotli in ingress-nginx"
author: 'James A. Joy'
date: '2023-06-12'
updated: '2023-06-12'
published: true
---

I ran a few tests on this site with Lighthouse and realized that I hadn't enabled text compression, so I looked into how to do that with the Kubernetes ingress-nginx controller that serves it. It was super simple I just had to add some settings to the ConfigMap for the ingress controller.

<br />

Use the following to get a copy of the existing controller configuration:

```bash
kubectl get configmap ingress-nginx-controller -n ingress-nginx -o yaml
``` 

<br />

Edit the file to add **`use-gzip: "true"`** and **`enable-brotli: "true"`**: 

```yaml
apiVersion: v1
data:
  allow-snippet-annotations: "true"
  use-proxy-protocol: "true"
  use-gzip: "true"
  enable-brotli: "true"
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
```
<br />

Apply the configuration change:

```bash
kubectl apply -f configmap-ingress-nginx-controller.yml
```

Bingo Bango! We have compression happening when I look at the Network tab in Chrome Devtools:

![Compression as shown in devtools network tab](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto/v1686554780/jamesjoy.site/Compression.png)

It was an easy win!

![Lighthouse Performance](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_700/v1686578294/jamesjoy.site/lighthouse_performance.png)

