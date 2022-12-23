# UCLA Connect

Fullstack programming project for CS35L at UCLA.

**Developed by**  
Samir Abdalla \[SamirOsAbdalla\]  
Remas Bashanfar \[remasbashanfar\]  
Elyse Foreman \[elyseforeman\]  
Mathias Duedahl \[Lussebullen\]  

## Description

The application is a website for hosting UCLA events.
It acts as a billboard where users can create and post their events for others to see, all in order to make events in the UCLA community accessible in a more centralized manner.

## Installation

First and foremost, Node.js is required. It can be downlaoded from here: https://nodejs.org/en/download/

After cloning the repository, packages and their dependencies should be installed.

To do this, in your CLI navigate to the server and
client directories (separately) and run:
npm install

> Expect warnings and vulnerabilities for the client (react-connectucla).  
> The server should be installed with no issues. 

**Running the application**

To launch the backend server:
- Open your commandline
- Navigate to ConnectUCLA/server
- run 'node index'

> If you see "listening on port 5000", the server is running.

To launch the client:
- Open your commandline
- Navigate to ConnectUCLA/react-connectucla
- run 'npm start'

> Your browser should open localhost:3000 and you should see the homepage.

### Note

This application is not made for production, as such there are limitations. 
The Google Calendar API will not work locally unless your @g.ucla.edu email is added as a test user (Our TA is added).
The MongoDB database is not hosted locally, it is hosted at cloud.mongodb.com, as such your network needs to allow
communications through the appropirate ports for the server to be able to connect (e.g. UCLA Web does not allow this, Eduroam does).

## Acknowledgements

We couldn't have figured everything out for this project without help from our fellow developers. 
Resources provided by the following people were of significant help:

Home Page Design  
Brian Design, https://github.com/briancodex/react-website-v1/tree/starter/public

Google Maps API  
Leigh Halliday, https://github.com/leighhalliday/google-maps-react-2020

Context API and Backend Development  
Safak, https://github.com/safak/youtube/tree/mern-social-app

MERN Stack Code Architecture  
Beau Carnes, FreeCodeCamp, https://github.com/beaucarnes/restaurant-reviews

