var container = document.getElementById("blog-posts");
var load_more = document.getElementById("load-more");
var request_in_progress = false;

function showSpinner() {
  var spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

function hideSpinner() {
  var spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function showLoadMore() {
  load_more.style.display = "inline";
}

function hideLoadMore() {
  load_more.style.display = "none";
}

function appendToDiv(div, new_html) {
  var temp = document.createElement("div");
  temp.innerHTML = new_html;
  //
  //console.log(new_html);
  var class_name = temp.firstElementChild.className;
  //console.log(class_name);
  var items = temp.getElementsByClassName(class_name);
  //console.log(items[2]);
  var len = items.length;
  //console.log(len);
  for (i = 0; i < len; i++) {
    //console.log(items[0]);
    //console.log(items.length);
    div.appendChild(items[0]);
    //
  }
}

function setCurrentPage(page) {
  load_more.setAttribute("data-page", page);
}

function scrollReaction() {
  var content_height = container.offsetHeight;
  var current_y = window.innerHeight + window.pageYOffset;
  console.log(current_y + '/' + content_height);
  if (current_y >= content_height) {
    loadMore();
  }
}

function loadMore() {
  if (request_in_progress) {
    return;
  }
  request_in_progress = true;
  showSpinner();
  hideLoadMore();

  var page = parseInt(load_more.getAttribute("data-page"));
  var next_page = page + 1;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "data/data.php?page=" + next_page, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var result = xhr.responseText;
      console.log('Result: ' + result);

      hideSpinner();
      setCurrentPage(next_page);
      // append results to end of blog posts
      appendToDiv(container, result);
      showLoadMore();
      request_in_progress = false;
    }
  };
  xhr.send();
}

load_more.addEventListener("click", loadMore);
window.onscroll = function () {
  scrollReaction();
};
// Load even the first page with Ajax
loadMore();

//Filter category
$(document).ready(function () {
  $(".category_item").click(function (e) {
    e.preventDefault();
    var category = $(this).attr("id");
    if (category == "all") {
      $(".post").addClass("hide");
      setTimeout(function () {
        $(".post").removeClass("hide");
      }, 300);
    } else {
      $(".post").addClass("hide");
      setTimeout(function () {
        $("." + category).removeClass("hide");
      }, 300);
    }
  });
});
