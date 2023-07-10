---
title: "Succinct Iterables in Ignition"
description: "List comprehension and dictionary unpacking in Inductive Automation's Ignition platform"
author: 'James A. Joy'
date: '2023-07-05'
updated: '2023-07-05'
published: true
---

Flex repeaters (and other similar components) are already a powerful feature of Inductive Automation's Ignition platform, but often we have to modify the arrays and objects we pass in. To demonstrate, we'll use the example of a simple menu. Our menu will have two components:

1. The `selector` component that will display and act as a button for each menu item.
2. The `menu` component the will contain a flex repeater, with an instance of `selector` for each menu item.

Our selector component will look like this:

![Ignition Perspective Selector Component with Properties](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_400/v1688948845/jamesjoy.site/selector.png)

Our menu component will look like this:

![Ignition Perspective Menu Component with Properties](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_400/v1688948845/jamesjoy.site/menu.png)

where the pages custom property is being pulled from a database and used directly in the instances of the flex repeater.

Doesn't look to bad, right? Well, what if we wanted to highlight the menu item of the page we're currently on so the user would easily know? We don't want to store that in the database, because it will be different for every session. So to start we'll add a custom property to the menu component to store the current page called `selectedPage`. In a real application it would probably be bound to `page.props.path`, but for this demonstration we'll just set it to `/page1`.

![Ignition Perspective Menu Component selectedPage Property](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_400/v1688949774/jamesjoy.site/selectedPage.png)

Then we also need to add a `selected` parameter to the `selector` component:

![Ignition Perspective Selected Prop](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_400/v1688950361/selectedProp.png)

We've also made it so that the if the `selected` property is `true` we highlight the menu component blue.

Now we finally get to the part of this post I want to showcase. We need to add a transform to the binding on the flex repeater instances property that will add the selected property to each instance, setting the value to `true` for the currently selected menu item and `false` for all others. Years ago, this is probably how I would have approached that and it is typically what I see other people do:

![Ignition Perspective Menu Bindings with Transform](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_600/v1688950935/menuBindings.png)

Here it is in text:

```python
def transform(self, value, quality, timestamp):
  pages = []
  for page in value['pages']:
    pages.append({
      'text': page['text'],
      'location': page['location'],
      'selected': page['location'] == value['selectedPage'],
    })
  return pages
```

But there are a couple problems with this:

- Every time pages is updated with additional information we may need in the `selector` component we have to update this script.
- It feels long and clunky for something we have to do often.

We can make this better with a couple modern Python concepts: dictionary unpacking and list comprehension.

Lets use list comprehension to shorten this and make it more intuitive first. Python's list comprehension syntax feature allows us to write a for loop within square brackets to instantiate a list. So the above would become this:

```python
def transform(self, value, quality, timestamp):
  return [{
    'text': page['text'],
    'location': page['location'],
    'selected': page['location'] == value['selectedPage']
  } for page in value['pages']]
```

This eliminates three lines of code making it more succinct and, arguably more readable.

Now we'll use a concept called dictionary unpacking so each dictionary will just inherit all of the properties from the pages dictionary, and then we'll add the `selected` property. In modern python (v3) that changes our transform to this:

```python
def transform(self, value, quality, timestamp):
  return [{
    **page,
    'selected': page['location'] == value['selectedPage']
  } for page in value['pages']]
```

*Unfortunately*, Ignition uses Jython which is currently stuck on version 2.7 of python, and can't use the ** operator for dictionary unpacking. The most succinct way I've found to get around this limitation is the following:

```python
def transform(self, value, quality, timestamp):
  return [dict(
    page,
    **{'selected': page['location'] == value['selectedPage']}
  ) for page in value['pages']]
```

It's not quite as nice as the latest versions of Python, but it works and you can see how this gets even nicer when there are more properties coming from the source list. Here's the complete picture:

![Inductive Automation Ignition Perspective Menu Component using dictionary unpacking and list comprehension](https://res.cloudinary.com/jarautomation/image/upload/f_auto,q_auto,w_700/v1688955943/menuFinal.png)

