---
title: "Project Kraken 1"
description: "Part 1 of Many: Building a distributed control platform"
author: 'James A. Joy'
date: '2023-06-27'
updated: '2023-06-27'
published: false
---

<script>
  import Mermaid from  '$lib/components/Mermaid.svelte'
</script>

<Mermaid height="400">
flowchart BT
  nebula:::nebula
  subgraph nebula[Nebula Network]
    direction BT
    A & B & C & D --Nebula----> lighthouse(Lighthouse)
    mantle --Nebula--> lighthouse
    laptop --Nebula--> lighthouse
    laptop("Remote 
    Access 
    Node")
    A & B & C & D --MQTT--> Broker(MQTT Broker)
    Broker ~~~ mantle(Mantle) --> Broker
    mantle(Mantle) ~~~ Broker
  end
  classDef nebula line-height:1.8rem, padding-right: 26rem;
</Mermaid>