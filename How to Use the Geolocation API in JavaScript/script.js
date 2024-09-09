const options = {
	enableHighAccuracy: true, // enable high accuracy
	// timeout: 300000, // wait for 5 minutes
};
const getLocationButton = document.querySelector("#getLocation");

function successCB(geolocationResult) {
	const anchorTag = document.getElementById("locationResult");
	anchorTag.textContent = "Retrieving User Location...";
	let { coords } = geolocationResult;
	locationResult.textContent = "See my location on a map";
	locationResult.href = `https://www.openstreetmap.org?mlat=${coords.latitude}&mlon=${coords.longitude}`;
}

function errorCallback() {}

getLocationButton.addEventListener("click", () => {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(successCB, errorCallback, options);
	}
});
