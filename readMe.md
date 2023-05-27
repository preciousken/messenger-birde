# Messager bird
- Users can upload files for sharing
- The uploaded files expires in 24hours
- Users can deactive/ delete the files before the expiry time
- Users can increase the expiry time of a file using a 4-digit code
- User can upload the file and email go send the file to
- User can always return back to dashboard to share the file again before expiration
- User will be notified when the file is delivered or viewed by the receiver
- Save the IpAddress of people that view the file using the concept below
- - you can secure your files for receiver to send a request to view so you can only grant permissions to people you decided to share file with. meaning not everyone can have access to your file
  
  ```js
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  ```

- User can get the location of the user
- Get number of time viewed by a single  ipAddress
- You are using the linkshortener approach though you are not to shorten or redirect user.

## The concept needed to know the location of a user

```js
  // Client-side JavaScript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Send the latitude and longitude to the server
    fetch('/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });
  });
}



// Server-side JavaScript
const express = require('express');
const bodyParser = require('body-parser');
const mapquestGeocoding = require('mapquest-geocoding');

const app = express();
app.use(bodyParser.json());

// MapQuest Geocoding configuration
const MAPQUEST_API_KEY = 'YOUR_MAPQUEST_API_KEY';
mapquestGeocoding.init(MAPQUEST_API_KEY);

app.post('/location', (req, res) => {
  const { latitude, longitude } = req.body;

  // Reverse geocoding to get location details
  mapquestGeocoding.reverse(latitude, longitude, (err, location) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(location);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

