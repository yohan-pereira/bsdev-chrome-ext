

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
        $('table').addClass("data_table");
        $( ".data_table" ).addClass("sortable");

        $("tbody tr").each(function(i, el){
          var that = this;
          var ip = $(this).children('td')[1];
          if(ip && ip.innerHTML){
            $(this).children('td:first-child')
              .css("cursor", "pointer")
              .click(function(){
                var ip = $(that).children('td:nth-child(2)').text();
                var region = $(that).children('td:nth-child(3)').text();
                var ttype = $(that).children('td:nth-child(4)').text();
                var os = $(that).children('td:nth-child(5)').text();
                console.log(ip, region, ttype, os);

                var osurl = os.substring(0, 3);
                console.log(os, osurl);

                var id = ip.split('.').join('_');
                $(that).children('td:nth-child(2)').append('<div id="status_'+id+'" style="color:blue; padding-top: 10px;">');
                $('#status_'+id).text("Getting Token");
                $.get("http://local.browserstack.com:3000/admin/add_"+osurl, null, function(data){
                  var page = $(data);
                  var token = page.find('input[name=authenticity_token]').val();
                  console.log(token);
                  $('#status_'+id).text("Adding Machine");

                  $.post("http://local.browserstack.com:3000/admin/add_win", {
                    authenticity_token: token,
                    ip: ip,
                    tt: ttype,
                    os: os,
                    region: region,
                    snapshot: "",
                    vpn: ""
                  })
                  .done(function(data){
                    console.log(data.responseText);
                    $('#status_'+id).text("Status: " + data.responseText);
                  })
                  .fail(function(data){
                    console.log("Error", data);
                    $('#status_'+id).text("Status: " + data.responseText);
                  });
                })
                .fail(function(e){
                  console.log("Error", e);
                });
              });
          }
        });
    } 
); 

console.log("extention started");
