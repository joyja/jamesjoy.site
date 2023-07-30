---
title: "A Practical Use of Chat GPT"
description: "Building a Microsoft Excel macro with my robot friend"
author: 'James A. Joy'
date: '2023-07-30'
updated: '2023-07-30'
published: true
---

Just like everybody else, I've been watching the rise of ChatGPT and other AI tools with fascination. I've been playing with ChatGPT for the last few months, but hadn't really done anything with AI that could be considered productive. Then last week, I signed up for GitHub Copilot, which has already had a huge effect on how fast I can code. To put it simply, it just eliminates so many tedious tasks, Google searches, and psychological roadblocks. So that experience put AI at the front of my mind when a client sent me a large spreadsheet of data that needed to be moved to a database.

The spreadsheet is a time series table with a timestamp column, and then 76 more columns representing different data points and nearly 500,000 rows.

<table>
  <thead>
    <tr>
      <th>Timestamp</th>
      <th>Value 1</th>
      <th>Value 2</th>
      <th>...</th>
      <th>Value 76</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1/1/23 00:01</td>
      <td>176.5</td>
      <td>1.5</td>
      <td>...</td>
      <td>560</td>
    </tr>
    <tr>
      <td>1/1/23 00:02</td>
      <td>177.1</td>
      <td>1.6</td>
      <td>...</td>
      <td>561</td>
    </tr>
    <tr>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <td>12/31/23 11:59</td>
      <td>177.6</td>
      <td>1.8</td>
      <td>...</td>
      <td>563</td>
    </tr>
  </tbody>
</table>

I needed to move all of this to a single table in a relational database with three columns representing the timestamp, the name of the data point, and the value of the data point at that time.

<table>
  <thead>
    <tr>
      <th>Value</th>
      <th>Timestamp</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>176.5</td>
      <td>1/1/23 00:01</td>
      <td>Value 1</td>
    </tr>
    <tr>
      <td>1.6</td>
      <td>1/1/23 00:01</td>
      <td>Value 2</td>
    </tr>
    <tr>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <td>563</td>
      <td>12/31/23 11:59</td>
      <td>Value 76</td>
    </tr>
  </tbody>
</table>

My database is PostgreSQL, so I just needed to turn the spreadsheet into 76 CSV files I could then import using pgadmin.

That's when I realized I needed to write a VBA Excel macro to convert the data from the spreadsheet to the CSV files. This is great, except... I *hate* writing VBA Excel macros, and it's been a long time, so I would need to refresh myself on how to do a lot of the things. This is a huge mental roadblock... I have to spend a lot of time researching things I don't care about learning to do something pretty uninteresting. After I spent some time procrastinating, I thought about using Chat GPT to get me over this hurdle.

So I went to ChatGPT and had [this conversation](https://chat.openai.com/share/f45bf494-2c99-44dc-a359-ea609f37b444) with my robot friend.

You can read the whole thing in that link, but here's a summary of what we accomplished together:

I started by asking ChatGPT for a simple example of a VBA macro that will create a CSV from arbitrary columns of an Excel worksheet. It then gave me a great working example that did what I asked for. I then kept asking ChatGPT to add small features to the script:

- Add a name column from the first row of the value column.
- Re-arrange the columns.
- Filter the values to eliminate blanks or invalid characters.
- Etc.

Whenever the generated modifications caused an error, I simply told ChatGPT what happened, and it would give me modified code to fix it. I only had to make a few improvements myself, and I probably didn't really even need to do that; they were just cases where it was faster to make the fix than to add to my ChatGPT conversation. I obviously don't know exactly how much time I saved, but it definitely feels like I did it 2-3 times faster than I would have without using ChatGPT. Perhaps more importantly, it was far more enjoyable to create the macro this way. Working with the AI was engaging and satisfying. I never felt so stuck that I needed to take a break.

One of the best parts of the ChatGPT conversation was when running the script, specifically the row filtering part, was taking far too long to complete. I asked ChatGPT if it could improve the performance, and it quickly gave me several suggestions with a new script modified to take advantage of them. Its first suggestion still had performance issues, so I asked it if it had any other way to make it better. Then it gave me the final alternative with pros and cons of the approach. The cons were dependent on how much data I needed to process. I asked about the specifics of the data I was processing, and it answered that it should be fine for my application. The solution works beautifully.

In just a few short weeks, I've found using AI tools for coding has not only improved my productivity but also made it way more fun. If you code with an IDE and you haven't tried [GitHub Copilot](https://github.com/features/copilot), you should check it out! For a general-purpose AI, check out [ChatGPT](https://chat.openai.com/).