# Go-to Pomodoro

This is a customizable pomodoro timer with BGM built with React, Redux.

The user is supposed to set a YouTube link as her/his own music. I used [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)  to embed the YouTube video in this app.

For styling, I used Sass, Styled Components, and Material UI.


## Project Status

Mostly done with functioning part.<br/>
Still needed some tests and refactoring.

## Project Result

 #### Home page, Setting page, and Setting page with some error messages
![1](https://user-images.githubusercontent.com/51708229/136717310-9d8622b8-00c7-491d-a48f-36cf21ff6e64.png)

 - The user can either select or set time and a BGM for each session respectively.
 - Custom inputs for both time and the BGM should be filled, so the error messages will be shown if they are empty.
 - Time should be more than 0 sec and less than 1000 min, so the error message will be shown to meet the condition.
 - The set button at the bottom of the setting page keeps disabled until all time and BGMs setting is specified. 

 #### Timer pages in each session (Focus, Short Break, Long Break)
![2](https://user-images.githubusercontent.com/51708229/136717316-4b3c1be9-4a1f-4bd8-a534-bdc9af0a7ba0.png)

- The user can control(start, pause, resume) the timer by clicking YouTube video's play button or button(s) below the video.
- The buttons below the video changes according to the timers status.
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
