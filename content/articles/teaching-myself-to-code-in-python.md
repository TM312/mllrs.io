---
title: Teaching myself to code in Python
description: This part covers weeks 0 to 2. Week 0 served as the preparation for this project. In week 1, I learned the basic Python syntax. In week 2, I scraped the website of my favorite music magazine and gained surprising insights based on the requests, bs4, and pandas libraries.
series: starting_to_code
# repository: https://github.com/TM312/building_blocks/tree/master/nuxt-useful-plugins
createdAt: "2019-04-22T00:00:00.000Z"
updatedAt: "2019-04-22T00:00:00.000Z"

img: article/hello.png
alt: header image
tags:
  - python

---


## Introduction

Today, the ubiquity of <a href="https://a16z.com/2011/08/20/why-software-is-eating-the-world/">software</a> and low transaction costs related to its distribution provide a great opportunity for innovators to create value through building IT-related products. Over the course of the coming weeks, I want to equip myself with the tools to build MVPs and test ideas. Coding appears to be a solid foundation to do so.

I give myself roughly 4 to 6 weeks to get familiar with <i>Python</i> and <i>web development</i> (i.e. html, css, …). From then on I will focus on building things, and over time start diving into machine learning approaches. I guess there is some potential for this experiment to fail, but it’s definitely going to be interesting and so it’s fine.

I start with off with <a href="https://www.Python.org/">Python(3.7)</a>, because it is

- a relatively easy-to-learn, yet flexible and powerful language
- one of the two main languages used for the development of machine learning models


__Why a (series of) blog post(s)?__

In order to increase my commitment to this project, I have told some friends about my plans (~⅔ of whom can not code). This has lead to lots of positive feedback, which indicated three main things: many people

1. want to learn coding and have thought about teaching it themselves;
2. often don’t know how to start off efficiently — given considerable time constraints;
3. are keen to learn about others’ experiences concerning their first steps.

Consequently, in the coming weeks I will report on my steps and progress, thereby hoping to serve as an inspiration especially to non-coders.


## Week 0: Preparation

The preparatory <i>Week 0</i> was a phase actually spanning several weeks during which the idea for this project emerged, followed by some search and identification of the best resources for beginners.

### Idea

Given an ever growing interest in CS-related issues and lack of time (I have been a PhD student for the past years), the most valuable steps to set priorities and building commitment have been (a) to consciously postpone this project until right <i>after</i> my dissertation defense, (b) <i>writing it down</i> in my notebook, (c) <i>telling my friends</i> about it already before I started.


### Programming Resources

There exist various resources aimed at beginners to start programming. In the course of my search I found the following ones to be particularly useful:

- __CS50x — Introduction to Computer Science__<br>
  <a href="https://www.edx.org/course/cs50s-introduction-to-computer-science">CS50x</a> is a Harvard online course on the edX platform. The lectures can also be found on YouTube (see here). I have seen CS50x being recommended very often to beginners who want to learn coding. The course is taught by Prof. David J. Malan, who does a great job in outlining the fundamental principles of key concepts before breaking them down into very simple tangible examples. The course also comes with a virtual development environment. Unlike the subsequent resources, the course does not focus on a single language but provides a solid foundation on the basics of CS.<br>
  I personally found the learning experience too passive (lectures are each ~2hrs) and I prefer text over video for studying. I also faced various errors using their virtual environment (potentially because I used the free version at edX.).

- __Codeacademy__<br>
  <a href="https://www.codecademy.com/">Codeacademy</a> is an online coding platform with different tracks such as <i>web development or data science (includes Python)</i>. It offers a free 7 day trial. There are several similar platforms, such as <a href="https://www.datacamp.com/">datacamp</a> or <a href="https://teamtreehouse.com/">teamtreehouse</a>.<br>
  I once tried Codeacademy’s HTML track for 2 or 3 days. These platforms are certainly a great resource for many beginners. The tasks increase only very incrementally in difficulty and contain various sub tasks that check every line of code. I personally, however, prefer a more natural setting, in which I face any kind of adjacent challenge that I will eventually face anyway at some point.

- __Al Sweigart — Automate the Boring Stuff__<br>
  <img src="~/assets/images/learning_python/automate_the_boring_stuff.png" /><br>
  Image for post<br>
  Eventually, I stumbled across Al Sweigart’s book on Python for beginners <a href="https://www.amazon.com/gp/product/1593275994/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593275994&linkCode=as2&tag=playwithpyth-20&linkId=HDM7V3T6RHC5VVN4">“Automate the Boring Stuff”</a>. The first part of the book focuses on Python fundamentals, the second one explores more advanced features in the context of mini projects. The book exists in a physical form, but I was very pleased to see that Al Sweigart also put the whole content <a href="https://automatetheboringstuff.com/">online</a>. Over the course of the next weeks I will work through this book.

## Week I: Fundamentals

Coding with Al Sweigart’s book has went surprisingly well so far. At first, my biggest fear was to get a single bug into my code, which I would then of course never be able to find. Naturally, the first code I ran immediately returned an error. But it turned out that by reading the line of code where the error happens and the one describing it the problem could be fixed without much trouble.

Week 1 [chapters 0–8] covered the basics of the Python syntax, its elements, and flow control, i.e. Boolean operators, loops, variables and data types, functions and methods, and the modules (os, re, argv, shelve)

Three simple factors have been particularly valuable:

- __Setting__: For the first couple of weeks I have moved to a calm place at the Dutch coast. Although this remoteness from basically everything comes along with a couple of downsides (e.g., no friends to hang out with) to me it has been great to stay focused.

- __Personal Wiki__: I have created a Google Spreadsheet for myself, a kind of wiki, in which I write down concepts, explanations, examples, or other things I consider important. I constantly use it when checking for functions or methods I have explored before.

<figure>

  <img src="~/assets/images/learning_python/wiki_coding.png"><br></img>

  <figcaption>A screenshot of my Google spreadsheet. I have started out by creating one worksheet per chapter, but more recently moved to topical worksheets, e.g., one for the pandas module.</figcaption>

</figure>


- __Exploring code examples__: Independent from the chosen coding resource, every course provides code examples to demonstrate the structure of the introduced element. Although many things may appear easy and logic in the beginning, I gained intuitive understanding only after playing around with each new function or methods myself.

<figure>

  <img src="~/assets/images/learning_python/os_module.png"><br></img>


  <figcaption>I played around with the ‘os’-module to create folders for each book chapter. I found it particularly exciting to see that the module allows one to create files and even write into them.</figcaption>

</figure>


## Week II: Mini Case — Scraping laut.de and analysis

Week 2 turned to a lot of fun in chapter 11 when I started to experiment with web scraping.

My brother has this theory. For many years, we both have been reading a German online music magazine, <a href="http://www.laut.de/">laut.de</a>, to explore new artists or albums. Besides the coverage of music related news, laut.de writes reviews on all major album releases. This includes a text, as well as a rating on a scale of 1 (the album is shit) to 5 (great album). This rating is called “editorial rating”. He is a huge <i>Muse</i> fan, and more recently, told me that that the editor covering their latest records appears to be negatively biased towards them. Even more, this guy’s rating would be very negative in general.

<figure>

  <img src="~/assets/images/learning_python/laut_main.png"><br></img>

  <figcaption>Laut.de’s Main Page</figcaption>

</figure>

Web scraping refers to the automated download and processing of web content. I have been very curious to learn about this topic and found the sample exercise in the book a bit boring. The inquiry into my brother’s theory appeared much more appealing.

### Planning the process

I interpreted my brother’s two propositions as follows :

1. <b>editor S__ K__ rates Muse albums lower than his predecessors from the editorial team</b>

*Based on the assumption that Muse albums are of a consistent quality, I should be able to test the proposition by comparing the ratings of every Muse album grouped by editor. Since the number is fairly manageable (i.e. 8 Studio albums, and 3 Live albums), I actually don’t need Python, but it’s just an exercise anyway.*

2. <b>editor S___ K___ rates albums very low in general</b>

*[The underlying assumption here is that the “editorial rating” represents the editor’s rating who also writes the accompanying review text. There are two indicators that make this a plausible assumption: a) in some reviews the editors announce ratings, which can then be found as the official editorial rating, b) the ratings are stored as integers, which would be — due to its impreciseness — at least be questionable once it would be supposed to represent multiple ratings]*

*Two simple tests of the second proposition could be: i) compare the editor’s average rating with that of his peers at the editorial team and see where he is positioned in regards to the percentiles; ii) check for the average rating of the editor.*

In order to conduct these tests, I need to

- analyse the __webpage structure__ to understand how to systematically gather information on artists, (albums), editors, editorial ratings
- __retrieve this information__ for all reviewed albums
- __analyse__ the data


### Let's go

#### 1. __Analysing the webpage structure__

Apart from the main page, laut.de has several sub-URL, one on which I found 20 album reviews per page. Clicking on the next button at the bottom of the page reveals that the URL follows a structure in which the number at its end increases per click.
Image for post

<figure>

  <img src="~/assets/images/learning_python/laut_album_subpage.png"><br></img>


  <figcaption>laut.de’s ‘Album’ subpages appear suitable to collect the necessary information.</figcaption>

</figure>


Chrome’s inspector tool allows to locate the information of interest within the website’s source code.

<figure>

  <img src="~/assets/images/learning_python/laut_de_src_code.png"><br></img>


  <figcaption>A look at the source code allows to understand the underlying structure of the information displayed on the web page.</figcaption>

</figure>


#### 2. Retrieving data of interest

The previous step reveals: Retrieving the data of interest requires two loops

*a) the __first one__ to gather all data from a given sub-URL*

Gathering data from a given HTML structure can be done using the <a href="https://pypi.org/project/beautifulsoup4/">Beautiful Soup (BS4)</a> library. It can be easily installed using the pip module in the terminal (i.e. `pip3 install beautifulsoup4`).
Image for post

I found the official documentation quite helpful for the specification of the CSS Selectors that describe the elements in the source code to be retrieved.

<figure>

  <img src="~/assets/images/learning_python/bs4_inner_loop.png"><br></img>


  <figcaption>A code excerpt displaying the structure of the inner loop. Soup.find_all(*CSS_Selector*) represents the part of the source code in which the relevant data is stored. Each data point can be retrieved through an individual selector.</figcaption>

</figure>

*b) the __second and overarching one__ to perform this task for every sub-URL*

For this I relied on the requests library. Bs4 and requests are typically used in combination. Requests allows to download a webpage.

Eventually, I wanted to write the retrieved data into a database. This can be done using the os library, which allows for the creation of files such as csv, xlsx, or txt.


  <!-- <img :src="require('~/assets/images/learning_python/laut_de_scraper.png')"><br></img> -->


<figure>

  <d-image post-name="learning_python" file="laut_de_scraper" Image-alt="Screenshot of the laut.de scaper code" ><br></d-image>
  <figcaption>The code for the laut.de-scraper.</figcaption>

</figure>


### 3. Data analysis

In the beginning I had somehow expected that the main work of this project would lie in the data retrieval. I would just import my txt-File into Excel and then do the analysis manually. But only until the moment, when I realized that the Excel-sheet now comprised more than 22’000 rows, each containing all data points of interest for one review. I don’t know how to write VBA-macros, but it became pretty clear that there was no way to handle the data with regular functions. A few minutes of reading into Excel macros convinced me that it would stay that way in the near future.

Fortunately, I was referred to an excellent python library, perfectly suited to handle such data structures: <a href="https://pandas.pydata.org/">pandas</a>. Pandas can also be installed using the pip installer in the terminal (for OS: `pip3 install pandas`).

There exists a YouTube tutorial, which I found very helpful to learn how to analyse the data set with pandas:

<iframe width="510" height="287" src="https://www.youtube.com/embed/vmEHCJofslg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- __Testing proposition one__<br>
  I tested proposition one by identifying all albums that were listed under the string “Muse” in the “Artist” column. The column name refers to the name of the first row of each column and can also be checked using dataframe.columns (see code line 10 below).
  Image for post
