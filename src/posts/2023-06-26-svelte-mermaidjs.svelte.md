---
title: "Svelte Mermaids"
description: "Mermaidjs in Svelte"
author: 'James A. Joy'
date: '2023-06-26'
updated: '2023-06-26'
published: true
---
I wanted to be able to add diagrams to this blog using the wonderful [Mermaidjs](https://mermaid.js.org/). Mermaid allows you to generate diagrams in markdown from text using a simple syntax.

My routes folder in Svelte looks like this:

```bash
.
├── +error.svelte
├── +layout.svelte
├── +layout.ts
├── +page.server.ts
├── +page.svelte
├── posts
│   └── [slug]
│       ├── +page.svelte
│       └── +page.ts
└── sitemap.xml
    └── +server.ts
```

<script>
  import Mermaid from '$lib/components/Mermaid.svelte'
  import Loading from '$lib/components/Loading.svelte'
</script>

## First Attempt

After reading the Mermaid documentation, I found the basic functionality is that mermaid will find any `<pre>` blocks with the `mermaid` class, parse the text within it and replace with an SVG diagram. So my first thought, was to just use the standard markdown code block syntax:

<pre class="language-bash"><code>```mermaid
flowchart TB
  A & B --> C & D
```</code></pre>

and then in my `posts/[slug]/page.svelte` I would do the following with my scripts:

```javascript
import { onMount } from 'svelte';

import mermaid from 'mermaid'

export let data: PageData;

mermaid.initialize({ 
  theme: 'neutral', 
  startOnLoad: false 
})
onMount(() => {
  setTimeout(async () => {
    await mermaid.run({
      querySelector: 'language-mermaid'
    })
  }, 0)
})
```

The couple things to note here are that [mdsvex](https://mdsvex.com/) automatically applies the language-mermaid class, and I also use setTimeout here to make sure mermaid doesn't run until after the tick on which mdsvex will do it's render of the markdown. Unforunately, this doesn't work. Mdsvex uses prismjs for syntax highlighting which inserts a bunch `<code>` blocks within the mermaid syntax so instead of a pretty chart I get this:

<Mermaid height="200">
  <code>flowchart TB</code>
  <code>  A & B --> C & D</code>
</Mermaid>

## Let's Make a Component Instead

It's okay though, I also realized that I'd want to show a nice loading widget while the charts render, have the charts fade in nicely when they're ready and be able to set a fixed height for each chart. To acheive that, the best thing to do is to create a Mermaid component. I'd still call my `mermaid.run` function in `posts/[slug]/page.svelte`, but I would use a `Mermaid` component.

So first I made a nice indeterminate `Loading.svelte` component:

```svelte
  <script lang="ts">
    import { fade } from "svelte/transition";
    export let loading = false
  </script>

  {#if loading}
    <div class="loading" transition:fade>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 45.714285714285715 45.714285714285715" 
        style="transform: rotate(calc(-90deg));"
      >
        <circle
          class="loading__underlay" 
          fill="transparent" 
          cx="50%" 
          cy="50%" 
          r="20" 
          stroke-width="5.714285714285714" 
          stroke-dasharray="125.66370614359172" 
          stroke-dashoffset="0"
        ></circle>
        <circle 
          class="loading__overlay" 
          fill="transparent" 
          cx="50%" 
          cy="50%" 
          r="20" 
          stroke-width="5.714285714285714" 
          stroke-dasharray="125.66370614359172" 
          stroke-dashoffset="100.53096491487338px"
        ></circle>
      </svg>
    </div>
  {/if}

  <style lang="scss">
    .loading {
      position: absolute;
      margin: auto;
      left:0;
      right:0;
      top:0;
      bottom:0;
      width: 64px;
      aspect-ratio: 1;
      z-index: 100;
      & > svg {
        animation: loading-rotate 1.4s linear infinite;
        transform-origin: center center;
        transition: all .2s ease-in-out;
        width: 100%;
        height: 100%;
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
      }
    }
    .loading__overlay {
      stroke: black;
      transition: all .2s ease-in-out,stroke-width 0s;
      z-index: 2;
      animation: loading-stroke 1.4s ease-in-out infinite;
      stroke-dasharray: 25,200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
    .loading__underlay {
      color: rgba(0, 0, 0, 0.12);
      stroke: currentColor;
      z-index: 1;
    }
  </style>
```

Which looks like this:

<div style="height:100px;position: relative;margin-bottom:calc(var(--spacing-unit)*5)">
  <Loading loading={ true }/>
</div>

Then I made the Mermaid component:

```svelte
<script>
  import { onMount } from "svelte";
  import mermaid from "mermaid";
	import { fade } from "svelte/transition";
	import Loading from "$lib/components/Loading.svelte";
  import { mermaidRendered } from "$lib/stores";
  export let height = 400;
</script>

<div class="container" style:height= { $mermaidRendered ? null : `${height}px`}>
  {#if $mermaidRendered}
  <pre in:fade={{ delay:1000, duration:300 }} class="mermaid" style:height={ `${height}px` }>
    <slot />
  </pre>
  {:else}
  <div out:fade={{ duration:300 }} class="placeholder" style:height={ `${height}px` }>
    <Loading loading={ true } />
  </div>
  {/if}
</div>

<style lang="scss">
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .placeholder {
    position: absolute;
    display: flex;
    flex-grow: 1;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
```

I decided to create a `mermaidRendered` Svelte store to keep track of whether the Mermaid render was complete. 

```typescript
import { writable } from "svelte/store"

export const mermaidRendered = writable(false)
```

I would use that to transition from the `Loading` component to the Mermaid diagram. I'm using `position:absolute` on the `Loading` component to keep it in place during the transition, and the built-in `fade` transition from Svelte.

I also modified the script in `posts/[slug]/page.svelte`:

```typescript
import { onMount } from 'svelte';
import { mermaidRendered } from '$lib/stores';
import mermaid from 'mermaid'

mermaid.initialize({ theme: 'neutral', startOnLoad: false })
onMount(() => {
  mermaidRendered.set(true)
  setTimeout(async () => {
    await mermaid.run()
  }, 0)
})
```

After all of that, I can now show mermaid diagrams by doing this in my markdown files:

```markdown
<script>
  import Mermaid from '$lib/components/Mermaid.svelte'
</script>

<Mermaid height="200">
flowchart TB
  A & B --> C & D
</Mermaid>
```

and get this:
<Mermaid height="200">
flowchart TB
  A & B --> C & D
</Mermaid>