
## [How to Use the Geolocation API in JavaScript](https://www.freecodecamp.org/news/how-to-use-the-javascript-geolocation-api/)

The Geolocation API is a standard API implemented in browsers to retrieve the location of the people who are interacting with a web application.

This API enable users to send their location to a web application to enable relevant services, such as seeking a restaurant or hotel near the user.

In this article, I'm going to show you how to use the Geolocation API with JavaScript and display a user's current location using a map API.

Let's get started!

How to Access the Geolocation API
---------------------------------

Browsers implement the geolocation API in the `navigator.geolocation` object. You can check if the browser you use supports this API as follows:
```js
if ('geolocation' in navigator) {
  console.log('Geolocation is Available');
} else {
  console.log('Geolocation is NOT Available');
} 
```

If the browser replies with 'Geolocation is Available', then you can use the methods of the `geolocation` object to get the user data.

The Geolocation API is only available under a secure HTTPS context, but modern browsers like Chrome and Firefox allow access to this API from localhost for development purposes.

There are two methods you can use to get user data:

*   `getCurrentPosition()`: Returns the current position of the device.
*   `watchPosition()`: Observes the position of the device continuously until the watcher is stopped.

Both methods above receive 3 arguments as follows:

*   `success`: a callback function for when the geolocation data is retrieved (required).
*   `error`: a callback function for when the method encounters an error (optional).
*   `options`: an object defining extra parameters when running the method (optional).

When the Geolocation API is accessed for the first time, a permission request will pop up near the URL bar as shown below:

![Image](https://www.freecodecamp.org/news/content/images/2024/02/geolocation-permission.png) 


You might be familiar with the pop up above. When you choose to block the request, then the `error` callback function will be executed by the API.

Otherwise, the `success` callback will be executed.

How to Get User's Current Position
----------------------------------

To get the user's current position, you can call the `getCurrentPosition()` from the `navigator.geolocation` object as shown below:
```js
function success(position) {
  console.log(position);
}

navigator.geolocation.getCurrentPosition(success);
```    

The `getCurrentPosition()` method will send the `position` object to the `success()` function above.

The `position` object contains the location coordinates and timestamp showing when the location was retrieved.

Below is an example of the `position` object:
```
    {
      coords: {
        latitude: 1.314,
        longitude: 103.84425
        altitude: null
      },
      timestamp: 1708674456885
    }
```

Using the latitude and longitude information, you can pinpoint the user's location and provide relevant information and services.

For example, let's see how you can send a request to the [OpenStreetMap](https://www.openstreetmap.org/) website and pin the user's current location using the data from Geolocation API.

OpenStreetMap is an open source project providing a free geographic map of the whole earth.

You need to create an HTML document with the following body content:
```html
<body>
  <button id="getLocation">Get Location</button>
  <br>
  <a id="locationResult" target="_blank"></a>
</body>
```

When the user clicks on the _"Get Location"_ button above, we will access the Geolocation API, retrieve the user location, and provide a link to see the user's location on a map.

Next, create a `<script>` tag before the closing `</body>` tag and write the following JavaScript code:
```js
  const locationResult = document.querySelector('#locationResult');
  document.querySelector('#getLocation').addEventListener('click', () => {
    locationResult.textContent = 'Retrieving User Location...'

    function success(position) {
      let { coords } = position;
      locationResult.textContent = 'See my location on a map';
      locationResult.href = `https://www.openstreetmap.org?mlat=${coords.latitude}&mlon=${coords.longitude}`;
    }

    navigator.geolocation.getCurrentPosition(success);
  });
```

When the button is clicked, we'll run the `getCurrentPosition()` method and set the `href` attribute of the `<a>` tag to the OpenStreetMap website, passing along the `latitude` and `longitude` data under the `mlat` and `mlong` query string.

Visiting the link would show a map of the current location as shown below:

![OpenStreetMap Using Geolocation API data](https://www.freecodecamp.org/news/content/images/2024/02/geolocation-getCurrentPosition.png) _The OpenStreetMap Website Pin On the Latitude and Longitude Data_

And that's how you get the current location of the user. How to process the location information is up to you.

I've created a website where you can test this functionality at [https://nathansebhastian.github.io/js-geolocation-api/](https://nathansebhastian.github.io/js-geolocation-api/)

Next, let's learn about the `watchPosition()` method.

How to Watch User's Position
----------------------------

The `watchPosition()` method will continue watching the device position when called. It will run the `success` callback function each time the device location changes.

You can call the method as follows:
```js
function success(position) {
  const { coords } = position;
  console.log('Latitude data: ' + coords.latitude);
  console.log('Longitude data: ' + coords.longitude);
}

navigator.geolocation.watchPosition(success);
```

The `watchPosition()` method returns an ID number that tracks the watcher. If you want to stop the watcher from sending location data, you need to call the `clearWatch()` method and pass the ID number:
```js
function success(position) {
  const { coords } = position;
  console.log('Latitude data: ' + coords.latitude);
  console.log('Longitude data: ' + coords.longitude);
}

// Store the ID number in a variable
const watcherID = navigator.geolocation.watchPosition(success);

// Stop the watcher
navigator.geolocation.clearWatch(watcherID);
```    

And that's all there is to the `watchPosition()` method.

### How to Add the Options Object

Next, let's take a look at the optional `options` object that you can pass to `getCurrentPosition()` and `watchPosition()` methods.

The `options` object allows you to customize the behavior of the methods. There are three options you can set:

*   `enableHighAccuracy`: a Boolean value that instructs the method to provide a more accurate position. This will increase power consumption. The default value is `false`.
*   `timeout`: a number value representing how long the method waits for a response. The default value is `Infinity`, which means the method will wait until a location is available.
*   `maximumAge`: a number value representing how long the Geolocation API can send the previous location data. The default value is `0`, so the API always returns the latest location. If set to `Infinity`, then the API will always return the first location data retrieved.

You can use the options object when calling the `geolocation` methods.

For example:
```js
    const options = {
      enableHighAccuracy: true, // enable high accuracy
      timeout: 300000, // wait for 5 minutes
    };
    
    function success(position) {
      console.log(position);
    }
    
    function error(error) {
      console.log(error);
    }
    
    // Run the getCurrentPosition() method with custom options
    navigator.geolocation.getCurrentPosition(
      success,
      error,
      options
    );
    
```
In the code above, the `getCurrentPosition()` method will use high accuracy mode, and it will wait for 5 minutes for a response from the device.

Summary
-------

The Geolocation API is a standard JavaScript API that allows a web application to access user location data.

Using the Geolocation data, you can provide services or content relevant to the user's location, such as the nearest public transport or hospital.
