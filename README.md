# Neighborhood Map (in React)

This is the last project (8th project) provided in Udacity's Front-End Nanodegree Program.
The project is about using:

* React Essential skills
* Google Maps API
* AJAX asynchronous requests
* Accessibility in web development

to build a "Neighborhood Map" with favorite places on it.

To get started and test this application:

* Clone the project files to your device with `git clone https://github.com/CompuWiser/NeighborhoodMap-React`
* install all project dependencies with: `npm install`. dependencies are:
  * `react`, `react-scripts` and `react-dom`
  * `google-maps-react`
  * `escape-string-regexp`
* start the development server with `npm start`

## Functionality

* Locations list are rendered from local JSON file
* Locations list and markers can be filtered by typing any text
* Markers are rendered from locations list
* Clicking on any marker should view info-window
* Information in the info-window is fetched using FourSquare API

### Service Workers

* The service worker is only enabled in the production mode. It's recommended that you do not enable an offline-first service worker in a development mode.
* Build the application (using `npm run build`) and run a simple http server from your build directory to test the service worker locally.