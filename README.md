# Ultimate Pub Quiz

What happens when during a global pandemic bars and pubs have to close (at least in countries with sane leaders) or visiting them becomes to risky? Grab a beer and meet your friends or colleagues remotely, vie Teams, Zoom, etc.!

**But wait! Something is missing... It's the pub quiz!**

This is an attempt to fix this issue! Select a quizmaster, let him prepare a few questions and you are ready to go!

[Use it online here!](http://olewehrmeyer.github.io/ultimatepubquiz)

*Note: The UI of the webapp is only available in German at the moment*

## Features

(really not that many, this is pretty quick and dirty)

- No installation required (duh, it's a webapp)
- No data ever sent to the server
- Persists players and scores in local storage
- Questions support:
  - Auto-randomized multiple-choice
  - Images / GIFs and whatever else you can get an `<img>`-Tag to display
  - Audio with autoplay of a certain song section (mp3 + wav + ogg, using stupid browsers may limit choice)
  - All of the above at the same time
- Automatic countdown
- Even agile coaches can be quizmaster and create the quiz JSON (tested in a randomized study, N=1, previous coaching may or may not be necessary)

## Non-Features

- Players cannot (yet) directly submit answers via a separate web page. Sharing the screen of the quizmaster and collecting answers is out-of-scope for now.
- If you want custom images, you have to host them yourself and get a direct URL to them (e.g. S3, Google Drive...). If you exhibit masochistic traits, putting images into the quiz JSON in base64 is supported as well.

## How to use

1. Think of questions
2. Put them into a `.json` file in a format as described below and demonstrated in `example-quiz.json`
3. Add GIFs to every question that does not yet have an image.
4. Visit TODO and drag your quiz file in there
5. Grab your favorite beverage (required) and a few friends (technically optional)
6. Have a way to collect answers
7. Go!

## How to write questions

(Other developers please just check `Quiz` interface in [`src/models.ts`](https://github.com/olewehrmeyer/ultimatepubquiz/blob/master/src/models.ts) )

```javascript
// <-- everything after this slashes is a comment. Remove all of them from your .json file before starting, as they are not really allowed here and should only explain the format
{
  "greeting": {
    "title": "Dummy-Title",
    "preImageText": "Text before the image<br>HTML is supported!",
    "image": "https://media4.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif?cid=ecf05e47yi2vkp2tqxgw945xijt8t8mtuip8ykftm6lay3s0&rid=giphy.gif",
    "postImageText": "<i>Even more text</i>"
  },
  "questions": [
    {
      "questionHeader": "Round 1 - Question 1", // Add round/question progress here if you like. Or something else, mandatory
      "questionText": "What was special about the Ford Nucleon concept car that Ford developed in 1957?", // mandatory
      "image": "https://media4.giphy.com/media/mIMsLsQTJzAn6/giphy.gif?cid=ecf05e47g10kl6l6f14q3bvcbc9gaafp134bb9jqeqe5tt2h&rid=giphy.gif", // optional
      "optionsValues": ["It was powered by a nuclear reactor", "It was the first car with power steering", "It was a coorporation with GM", "It had five wheels"], // optional
      "questionEndText": "<i>Maybe add trivia here</i>", // optional
      "timerCountdown": 60 // countdown in seconds, optional
    },
    {
      "questionHeader": "Small break, see you in 5'", //  mandatory
      "questionText": "Nothing stops you from getting creative with what a 'question' really is" // mandatory
    },
    {
      "questionHeader": "Round 2 - Question 1", // mandatory
      "questionText": "Name this song!", // mandatory
      "audio": {
        "src": "http://example.com/fortunate-son.mp3", // mandatory
        "type": "mpeg", // mpeg for mp3, wav for wav, ogg for ogg, mandatory
        "startTime": 0, // in seconds, mandatory
        "playTime": 9.2 // in seconds, optional. If left out, will play until end
      },
      "image": "http://example.com/vietnam.gif",
      "timerCountdown": 60 // when audio is provided and playTime is set, will only start after play time is over
    }
  ]
}

```

## How to remove all players

In the browser developer console, run

```javascript
window.localStorage.clear()
```

## How to run locally

```sh
git clone https://github.com/olewehrmeyer/ultimatepubquiz.git
cd ultimatepubquiz
yarn
yarn start
```