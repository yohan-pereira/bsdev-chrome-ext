

function make_request(url, map) {
  if (map["Os"].indexOf("mac") == 0 ) {
    $.ajax({
        type: "POST",
        url: url + "/admin/add_mac",
        data: map
    });
  }
};

    
$(document).ready(function() { 
        console.log("document ready");
        $( ".data_table" ).addClass("sortable");
        $("tr th").each(function (index, element) {
          console.log(index+" has "+element.html());
        });
    } 
); 

console.log("extention started");
