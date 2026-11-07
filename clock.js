// clock.js
// O'Clock: shows the current time in a city of my choice.
// The city name AND the time both come from an API, requested with the Fetch API.

// 1. The timezone I chose (change it to show another city, e.g. "Europe/Paris")
const TIMEZONE = "Africa/Conakry";

// 2. Where the data comes from.
// The first API is tried first; the second one is only a backup if the first fails.
const APIS = [
    {
        url: "https://worldtimeapi.org/api/timezone/" + TIMEZONE,
        read: (data) => ({ zone: data.timezone, datetime: data.datetime })
    },
    {
        url: "https://timeapi.io/api/Time/current/zone?timeZone=" + TIMEZONE,
        read: (data) => ({ zone: data.timeZone, datetime: data.dateTime })
    }
];

// 3. The elements of the page that will be filled
const cityEl = document.getElementById("clock-city");
const timeEl = document.getElementById("clock-time");
const dateEl = document.getElementById("clock-date");

// 4. What we remember from the last successful request
let baseSeconds = null; // seconds since midnight in the chosen city, at the last request
let baseTimestamp = 0;  // the browser clock (in ms) at the last request

// Ask the API for the current time (uses the Fetch API)
async function fetchTime() {
    for (const api of APIS) {
        try {
            const response = await fetch(api.url);
            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }
            const data = await response.json();
            return api.read(data);
        } catch (error) {
            console.warn("Clock API failed:", api.url, error);
        }
    }
    throw new Error("All clock APIs failed");
}

// Add a leading zero: 7 -> "07"
function pad(number) {
    return String(number).padStart(2, "0");
}

// Show the time on the page (called every second, no request needed)
function showTime() {
    if (baseSeconds === null) {
        return;
    }
    const elapsed = Math.floor((Date.now() - baseTimestamp) / 1000);
    const total = (baseSeconds + elapsed) % 86400; // 86400 seconds in one day
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    timeEl.textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

// Ask the API, then update the city, the date and the starting time
async function syncClock() {
    try {
        const { zone, datetime } = await fetchTime();

        // City name: "Africa/Conakry" -> "Conakry"
        const city = zone.split("/").pop().replace(/_/g, " ");

        // datetime looks like "2026-11-05T10:12:00.123456+00:00"
        const [datePart, timePart] = datetime.split("T");
        const [h, m, s] = timePart.slice(0, 8).split(":").map(Number);

        baseSeconds = h * 3600 + m * 60 + s;
        baseTimestamp = Date.now();

        cityEl.textContent = city;
        dateEl.textContent = new Date(datePart + "T00:00:00").toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        showTime();
    } catch (error) {
        console.error(error);
        // Only show an error if we never managed to get the time
        if (baseSeconds === null) {
            cityEl.textContent = "Time unavailable";
            timeEl.textContent = "--:--:--";
            dateEl.textContent = "Please check your connection.";
        }
    }
}

syncClock();                        // first request when the page opens
setInterval(showTime, 1000);        // the clock ticks every second
setInterval(syncClock, 60 * 1000);  // new request every minute to stay accurate