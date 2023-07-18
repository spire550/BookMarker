var SiteName = document.getElementById("SiteName");
var urlName = document.getElementById("URL");
var addBtn = document.getElementById("add");
var tbody = document.getElementById("tbody");


addBtn.addEventListener("click", () => {
  addTask();
});

SiteList = [];
currentvalue = "";

if (localStorage.getItem("task") != null) {
  var SiteList = JSON.parse(localStorage.getItem("task"));
  displayTask(SiteList);
} else {
  SiteList = [];
}

function addTask() {
  if (checkSiteName() && siteUrlRegex() == true) {
    var item = {
      name: SiteName.value,
      url: urlName.value,
    };

    SiteList.push(item);
    localStorage.setItem("task", JSON.stringify(SiteList));
    displayTask(SiteList);
    success();
    clear();
    feedback.innerHTML = "";
    urlfeedback.innerHTML = "";
  } else {
    notValidation();
  }
}

function displayTask(task) {
  row = "";

  for (var i = 0; i < task.length; i++) {
    row += `
               <tr>
               <td>${[i + 1]}</td>
               <td class="hightlight">${task[i].name}</td>
               <td><button class="btn btn-success" id= "sweetAlert" onclick = "visit(${i})" ><i class="fa-sharp fa-solid fa-eye"></i> Visit</button></td>
               <td><button class="btn btn-danger"  onclick = "testtt(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
               </tr>
        `;
  }
  tbody.innerHTML = row;
}

function clear() {
  SiteName.value = "";
  urlName.value = "";
}

function deletTask(index) {
  SiteList.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(SiteList));
  displayTask(SiteList);
}

function visit(index) {
  for (var i = 0; i < SiteList.length; i++) {
    var url = `${SiteList[index].url}`;
    location.assign(url);
  }
}

// validation for url and repeat sites

function siteUrlRegex() {
  var urlsRe = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;

  return urlsRe.test(urlName.value);
}

function notValidation() {
  if (SiteName.value == "") {
   failname();
  } else if (!siteUrlRegex()) {
    if (urlName.value == "") {
     failurl();
    } else {
      
       failurlvalid();
    }
  } else if (!checkSiteName()) {
    repeted();
  }
}

var x = [];
function checkSiteName() {
  for (var i = 0; i < SiteList.length; i++) {
    x.push(SiteList[i].name.toLowerCase());
  }
  if (x.includes(SiteName.value.toLowerCase())) {
    return false;
  } else {
    return true;
  }
}
function repeted() {
  swal.fire({
    icon: "error",
    title: "Oops!",
    text: "This WebSite is Already bookmarked",
  });
}
function success() {
  swal.fire({
    icon: "success",
    title: "Your site is bookmarked successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}

function failname() {
    swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please Enter the Site Name",
    });
  }

  function failurl() {
    swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Please Enter the URL",
    });
  }
  function failurlvalid() {
    swal.fire({
      icon: "error",
      title: "Oops!",
      text: "InValid SiteName , please Make Sure The URL like https://www.google.com",
      
    });
  }

function testtt(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
      
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      deletTask();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your Site still in bookmarker :)',
        'error'
      )
    }
  })}