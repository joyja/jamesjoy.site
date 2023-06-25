---
title: "Stop Systemd from Stopping"
description: "Configuring Systemd so my daemon's won't quit."
author: 'James A. Joy'
date: '2023-06-25'
updated: '2023-06-25'
published: true
---

<script>
  import Mermaid from '$lib/components/Mermaid.svelte'
</script>

So I have a customer site that I connect to using [Nebula](https://github.com/slackhq/nebula). I love Nebula. I'll make another post soon in the future about how to use it and why you don't need to pay money for great, secure, flexible remote access.

<Mermaid height={ 200 }>
  flowchart TD
    laptop(Laptop w/ Nebula) -- "Nebula Connection Brokered by a Lighthouse" -->remote(Remote w/ Nebula)
</Mermaid>

To ensure that my remote access is always available, it's best to daemonize Nebula using Systemd so that it will restart automatically on reboot and after any other failure. This is exactly what I've done, BUT the remote site Nebula daemon would often just cease to come alive after the server clearly lost power. Granted, this particular site has an unreliable electrical system where power goes out often and the server shuts down, so outages are common, but I needed my remote access to come back when the server came back online and it... wasn't.

My systemd config file `/etc/systemd/system/nebula.service` looked like this:

```ini
[Unit]
Description=nebula
Wants=basic.target
After=basic.target network-online.target
Before=sshd.service

[Service]
SyslogIdentifier=nebula
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/nebula -config /etc/nebula/config.yml
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

I have `Restart=always` so what gives? Well after some googling I found (this StackExchange question)[https://unix.stackexchange.com/questions/289629/systemd-restart-always-is-not-honored]. Specifically looking at the comments of the accepted answer. For this scenario setting `StartLimitIntervalSec=0` seems to have done the trick so far. 

**WARNING:** *I don't think this is the right solution for every software you are trying to Daemonize, but I think it's just what i needed to make sure I never lose remote access*

So the new config file looked like this:

```ini
[Unit]
Description=nebula
Wants=basic.target
After=basic.target network-online.target
Before=sshd.service

[Service]
SyslogIdentifier=nebula
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/nebula -config /etc/nebula/config.yml
Restart=always
RestartSec=10
StartLimitIntervalSec=0

[Install]
WantedBy=multi-user.target
```
