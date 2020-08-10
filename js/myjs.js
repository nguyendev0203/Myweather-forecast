if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const api = {
    key: "c409bfe61ff7bf4fd46b3c9e95d7332a",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const find = document.getElementById("find");
  const value = "vietnam";
  getResults(value);
  find.addEventListener("click", setQuery);

  function setQuery(evt) {
    var searchbox = document.querySelector(".search-box");
    getResults(searchbox.value);
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
      //console.log(searchbox.value);
    }
  }

  function getResults(query) {
    fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  }

  function displayResults(weather) {
    let arrFiveDays = new Array();

    for (let i = 0; i < weather.list.length; i += 8) {
      arrFiveDays.push(weather.list[i]);
    }
    console.log(arrFiveDays);
    console.log(weather);

    let forecast = document.getElementsByClassName("forecast");
    //console.log(forecast);

    //Vong lap de gan 5 ngay vao 5 div khac nhau
    for (let i = 0; i < forecast.length; i++) {
      if (i == 0) {
        //hom nay
        let frheader = forecast[i].getElementsByClassName("forecast-header")[0];
        let day = frheader.getElementsByClassName("day")[0];
        let date1 = frheader.getElementsByClassName("date")[0];

        let now = new Date();

        date1.innerText = dateBuilder(now);
        day.innerText = dayBuilder(now);

        let frcontent = forecast[i].getElementsByClassName(
          "forecast-content"
        )[0];
        let location = frcontent.getElementsByClassName("location")[0];
        location.innerText = `${weather.city.name}, ${weather.city.country}`;

        let degree = frcontent.getElementsByClassName("degree")[0];
        let temp = degree.getElementsByClassName("num")[0];
        let description = degree.getElementsByClassName("description")[0];
        description.innerHTML = `${arrFiveDays[i].weather[0].description}`;

        temp.innerHTML = `${Math.round(weather.list[i].main.temp).toFixed(
          0
        )}<span>°C</span>`;
        let iconcode = `${arrFiveDays[i].weather[0].icon}`;

        let iconurl =
          "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
        document.getElementById("wicon").setAttribute("src", iconurl);

        let humidity = frcontent.getElementsByClassName("humidity")[0];
        humidity.innerHTML = `<img src="images/icon-umberella.png" alt="">${arrFiveDays[i].main.humidity}%`;

        let windspeed = frcontent.getElementsByClassName("windspeed")[0];
        windspeed.innerHTML = `<img src="images/icon-wind.png" alt="">${arrFiveDays[i].wind.speed}km/h`;

        let pressure = frcontent.getElementsByClassName("pressure")[0];
        pressure.innerHTML = `<img src="images/icon-compass.png" alt="">${arrFiveDays[i].main.pressure}hPa`;
      } else {
        //nhung ngay khac
        let frheader = forecast[i].getElementsByClassName("forecast-header")[0];
        let day = frheader.getElementsByClassName("day")[0];

        let now = new Date();
        now.setDate(now.getDate() + i);

        day.innerText = dayBuilder(now);

        let frcontent = forecast[i].getElementsByClassName(
          "forecast-content"
        )[0];
        let fricon = frcontent.getElementsByClassName("forecast-icon")[0];

        let icon = fricon.getElementsByTagName("img")[0];

        let iconcode = `${arrFiveDays[i].weather[0].icon}`;
        let iconurl =
          "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
        icon.setAttribute("src", iconurl);

        let degree = frcontent.getElementsByClassName("degree")[0];
        let tempmin = frcontent.getElementsByTagName("small")[0];
        tempmin.innerHTML = `${Math.round(arrFiveDays[i].main.temp_min).toFixed(
          0
        )}<span>°C</span>`;
        degree.innerHTML = `${Math.round(arrFiveDays[i].main.temp).toFixed(
          0
        )}<span>°C</span>`;

        let description = frcontent.getElementsByClassName("description")[0];
        description.innerHTML = `${arrFiveDays[i].weather[0].description}`;

        let humidity = frcontent
          .getElementsByClassName("forecast-extrainfo")[0]
          .getElementsByClassName("humidity")[0];
        humidity.innerHTML = `${arrFiveDays[i].main.humidity}%`;

        let windspeed = frcontent
          .getElementsByClassName("forecast-extrainfo")[0]
          .getElementsByClassName("windspeed")[0];
        windspeed.innerHTML = `${arrFiveDays[i].wind.speed.toFixed(1)}km/h`;

        let pressure = frcontent
          .getElementsByClassName("forecast-extrainfo")[0]
          .getElementsByClassName("pressure")[0];
        pressure.innerHTML = `${arrFiveDays[i].main.pressure}hPa`;
      }
    }
  }

  function dayBuilder(d) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    return `${day}`;
  }
  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = d.getDate();
    let month = months[d.getMonth()];
    return `${date} ${month}`;
  }
  function dateConvert(d) {
    let months = [
      "January",
      "February",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${date}-${month}-${year}`;
  }
  function dateConvert(str) {
    let newDate = new Date(str);
    let day = newDate.getDate();
    let month = newDate.getUTCMonth() + 1;
    let year = newDate.getFullYear();

    return day + "-" + month + "-" + year;
  }

  // Function return to top
  //Get the button
  var mybutton = document.getElementById("myBtn");
  // When the user scrolls down 20px from the top of the document, show the buttot
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 50) {
      // If page is scrolled more than 50px
      $("#myBtn").fadeIn(100); // Fade in the arrow
    } else {
      $("#myBtn").fadeOut(100); // Else fade out the arrow
    }
  });
  // When the user clicks on the button, scroll to the top of the document
  $("#myBtn").click(function () {
    // When arrow is clicked
    $("body,html").animate(
      {
        scrollTop: 0, // Scroll to top of body
      },
      500
    );
  });

  //Hover on video
  // $('video').hover(function() {
  //   this.paused ? this.play() : this.pause();
  // });



  // AUTOCOMPLETE
 
}
