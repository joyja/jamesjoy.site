---
title: "Spacing Children In Perspective"
description: "Using Advanced CSS to space child components in Ignition's Perspective Module"
author: 'James A. Joy'
date: '2023-07-12'
updated: '2023-07-12'
published: true
---

Let me start this by saying that the Advanced Stylesheet resource Inductive Automation added to Ignition Perspective in 8.1.22 is one of the best things they've ever done. I generally feel like I'm often working around the Perspective Module's built in features so I can do advanced things, but having access directly to the CSS makes things *much* better.

I'm talking about this jewel right here (and no, I can't add enough arrows):

![Ignition Advanced Stylesheet](https://res.cloudinary.com/jarautomation/image/upload/w_400,f_auto,q_auto/v1689225524/Ignition_Stylesheet.png)

Sure, I wish I could add multiple stylesheets, have the option of writing it in SASS, and I would totally love something similar that let me write custom Javascript against my screens... but I'll totally take whatever Inductive Automation is willing to give me. This is miles better than having to work in the Style Classes editor 😩.

There are a lot of powerful things you have access to now with this feature and I'll probably introduce many of them in future posts, but to kick it off I want to talk about spacing children. Before the Advanced Stylesheet resource if we had a flex component with some other components inside it like this:

![Flex Repeater with Children](https://res.cloudinary.com/jarautomation/image/upload/w_700,f_auto,q_auto/v1689233908/flex-repeater.png)

and then we decided that we wanted some space between each of the buttons. We'd have to add a margin style to each button or make a margin class and add it individually to each button we wanted to space. Then if we added more buttons we would have to make sure to modify the classes/styles of the top/bottom buttons to make sure they didn't have unecessary padding.

![Margins on each button](https://res.cloudinary.com/jarautomation/image/upload/w_700,f_auto,q_auto/v1689234447/margins.png)

But having the Advanced Stylesheet resource allows us to do some things we couldn't do with Style Classes, specifically, use the `:first-child` psuedo-class and the `> *` selector. Taking inspiration from [Tailwind CSS](https://tailwindcss.com/docs/space) we can create a class for the Flex Repeater that will automatically space all of it's children so you only have to apply a class in one place and never think about it again even if you're adding more children.

For example, we can create classes like the following for spacing the buttons vertically, where spacing unit is a css variable we're using for a predefined spacing multiplier:

```css
.psc-space-y-3 > * {
	margin-top: calc(var(--spacing-unit)*3);
}
.psc-space-y-3 > *:first-child {
	margin-top: 0px;
}
```

The first rule adds a top margin to each child of the flex repeater, and the second rule overrides that and sets the top margin to zero for the first child. So we can acheive the spacing between all the buttons by applying a single class to the Flex Repeater as shown below:

![Parent spacing class](https://res.cloudinary.com/jarautomation/image/upload/w_700,f_auto,q_auto/v1689235152/parent-spacing.png)

No extra classes or styling required on the buttons!