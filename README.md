# Go-to Pomodoro

This is a customizable pomodoro timer with BGM built with React and Redux.

The user is supposed to set a YouTube link as her/his own music. I used [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)  to embed the YouTube video in this app.

For styling, I used Sass, Styled Components, and Material UI.


## Project Status

Mostly done with functioning part.<br/>
Still needed some tests and refactoring.

## Project Result

 #### Home page, Setting page, and Setting page with some error messages
![go-to-pomodoro-1](https://user-images.githubusercontent.com/51708229/136832266-5a881c75-9526-4ef0-a363-111b0c41e3df.png)

 - The user can either select or set time and a BGM for each session respectively.
 - Custom inputs for both time and the BGM should be filled, so the error messages will be shown if they are empty.
 - Time should be more than 0 sec and less than 1000 min, so the error message will be shown to meet the condition.
 - The set button at the bottom of the setting page keeps disabled until all time and BGMs setting is specified. 

 #### Timer pages in each session (Focus, Short Break, Long Break)
![go-to-pomodoro-2](https://user-images.githubusercontent.com/51708229/136832279-3bffefae-583b-45c9-9f4a-fd755b5cb1cb.png)

- The user can control(start, pause, resume) the timer by clicking YouTube video's play button or button(s) below the video.
- The buttons below the video change according to the timers status.
- There are the volume control slider and the toggle for the bell that rings when each session's time is up.
- The colour scheme changes on each session.


### Production Site

https://go-to-pomodoro.vercel.app/

## Installation and Setup Instructions

Clone down `main` repository. You will need `npm` and `node` installed grobally on your local machine.

Installation:

`npm install`

To start a server:

`npm start`

To visit the app:

`localhost:3000`

## Reflection

I created this app with my very own idea and design. Also, I decided to create it with an API and some new things such as `styled-components` or Material UI to challenge myself.

First, I tried to connect to YouTube IFrame Player API following the official documentation. However, the code in there are all written in JavaScript.<br/>
I couldn't figure out how to convert those codes to React, so I used [`react-youtube` npm package](https://www.npmjs.com/package/react-youtube).

As always, I started this process by putting the following command `npx create-react app react-todo-app --template redux`, which is creating a redux + plain JS boilerplate.

There are two parts that I mostly struggled with.

1. The timer<br/>
I implement the timer with `setInterval` first. It simply counts down time in every one second, which was not very accurate.<br/>
In order to make the timer accurate as possible, I switched to use `setTimeout`. <br/><br/>
Set the following three states: `lastUpdatedTime`, `elapsedTime`, `totalTime`<br/>
In `setTimeout`, I created the callback function that calculates `lastUpdateTime`, which is given by `Date.now()` and accumulates `elapsedTime` by adding `Date.now() - lastUpdateTime` to the previous `elapsedTime`.  This `setTimeout` runs in 100 milliseconds.<br/><br/>
Placed this `setTimeout` under `useEffect` that has `lastUpdateTime` as a dependency.<br/>
Therefore, this `setTimeout` keeps running until `clearTimeout` gets called.<br/><br/>
`lastUpdateTime` gets updated in very short time, so this timer won't get a time lag as big as we can recognize.


2. Setting events that control YouTube video player.<br/>
I needed to add events to the button elements to make them control the YouTube video player. Since I used `react-youtube` package, I couldn't implement the way that the API's official documantation shows.<br/><br/>
In `react-youtube`, the target YouTube video player is identified with `e.target`.  Set the function that gets and sets `e.target` as the state with `onReady` props in the `YouTube` component.


The some components still have repetitive codes. Also, using both Sass and Styled Components might be confusing. I need to rethink how and when I should use Styled Components and Scss.
