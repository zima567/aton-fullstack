var global = {
    limit: 3,
    offset: 0,
    pageEnd: false
};

$(document).ready(function(){
    /**
     * check if user is logged in 
     */
    loadAuthSession(global);

    /**
     * close modal signup/login 
     */
    $(".close-button").on("click", function () {
        $(".popup-form").hide();
    });

    /**
     * Show modal signup 
     */
    $("#signupMenu").on("click", function () {
        showModals("register");
    });

    /**
     * Show modal login
     */
    $("#loginMenu").on("click", function () {
        showModals("login");
    });

    /**
     * on create new account
     */
    $("#signupBtn").on("click", function() {
        const login = $("#loginRegister").val().trim();
        const password = $("#passwordRegister").val().trim();
        const fio = $("#fioRegister").val().trim();
        //alert(login + " "+ password);
        const endpoint = "/api/auth/register";
        const httpMethod = "POST";
        const reqData = { login: login, password: password, fio: fio };
        const contentType = "application/json";
        let bearerToken = 0;
        sendRequestToApi(endpoint, httpMethod, JSON.stringify(reqData), contentType, bearerToken, function (res, err) {
            if(res) {
                console.log(res);
                hideModals();


            } else {
                console.log(err.responseJSON);
                $("#errorMessage").text(err.responseJSON.message);
            }
        });
    });

    /**
     * on login to get auth token
     */
    $("#loginBtn").on("click", function() {
        const login = $("#loginLogin").val().trim();
        const password = $("#passwordLogin").val().trim();

        const endpoint = "/api/auth/login";
        const httpMethod = "POST";
        const reqData = { login: login, password: password};
        const contentType = "application/json";
        let bearerToken = 0;
        sendRequestToApi(endpoint, httpMethod, JSON.stringify(reqData), contentType, bearerToken, function (res, err) {
            if(res) {
                console.log(res);
                hideModals();
                if(res.data.token) {
                    //Save token in browser local storage
                    localStorage.setItem('token-api-aton', JSON.stringify({ token: res.data.token, login: reqData.login }));
                    reloadPage();
                }
            } else {
                console.log(err.responseJSON);
                $("#errorMessageLogin").text(err.responseJSON.message);
            }
        });

    });

    /**
     * Capture event on change select for client status
     */
    var clientsWithModifiedStatus = [];
    $("#table-master-body").on("change", "select", function(event) {
        $("#save-changes").show();
        $("#load-more-button").hide();

        let changedElement = $(this);
        let htmlElementId = changedElement.attr("id");
        let clientId = htmlElementId.split("-")[1];
        clientsWithModifiedStatus.push({ id: clientId, status: changedElement.val().trim()});
    });

    /**
     * Save changes to db
     */
    $("#save-changes").on("click", function() {
        console.log(clientsWithModifiedStatus);
        if(clientsWithModifiedStatus.length > 0) {
            const endpoint = "/api/status/client";
            const httpMethod = "POST";
            const reqData = { clients: clientsWithModifiedStatus };
            const contentType = "application/json";
            let bearerToken = loadToken();
            if(bearerToken) {
                sendRequestToApi(endpoint, httpMethod, JSON.stringify(reqData), contentType, bearerToken, function (res, err) {
                    if(res) {
                        console.log(res);
                        $("#save-changes").hide();
                        $("#load-more-button").show();
                        clientsWithModifiedStatus = [];
                        loadUserClients(bearerToken, global.offset + global.limit, 0);
                        const updateResult = res.data.result;
                        let notiText = "Статус " + updateResult.length + " клиент(ы) обновлен! Успешные изменения будут отображены в таблице клиентов.";
                        showBottomNotification(notiText);

                    } else {
                        console.log(err);
                    }
                });
            } else {
                alert("You need to be authenticated");
            }
        }
        $("#save-changes").hide();
    });

    /**
     * Load more clients
     */
    $("#load-more-button").on("click", function() {
        let offset = 0;
        if(global.offset == 0) {
            offset = global.limit;
        } else {
            offset = global.offset + global.limit;
        }

        let limit = global.limit;

        let tokenAccess = loadToken();
        if(tokenAccess) {
            global.offset = offset;
            if(!global.pageEnd) {
                loadUserClients(tokenAccess, limit, offset, cleanPreviousRows = false);
            } else {
                global.offset = 0;
                loadUserClients(tokenAccess, limit, global.offset);
                global.pageEnd = false;
            }
        }
    });

    /* 
     *logout
     */
    $("#logout").on("click", function() {
        localStorage.removeItem("token-api-aton");
        setLogoutState();
    });

});

//Display loader
function showLoader(flag) {
    if(flag === true) {
      $("#loaderContainer").css("display","flex");
    } else {
      $("#loaderContainer").css("display","none");
    }
}

//Load clients of a responsable user
function loadUserClients(tokenAccess, limit = 25, offset = 0, cleanPreviousRows = true) {
    const endpoint = "/api/clients";
    const httpMethod = "GET";
    const reqData = { limit: limit, offset: offset };
    const contentType = "application/x-www-form-urlencoded";
    let bearerToken = tokenAccess;
    sendRequestToApi(endpoint, httpMethod, reqData, contentType, bearerToken, function (res, err) {
        if(res) {
            console.log(res);
            let arrClients = res.data.clients;
            if(arrClients.length > 0) {
                AddClientsToHtmlTable(arrClients, "table-master-body", cleanPreviousRows);
            } else {
                if(global.offset !== 0) {
                    global.offset = 0;
                    global.pageEnd = true;
                } else {
                    console.log("Did not find clients for this user");
                    let text = "Для вашего аккаунта у нас нет клиентов"
                    displayMessageInTable(text);
                }
            }
        } else {
            console.log(err);
        }
    });
}

function AddClientsToHtmlTable(clients, idTableBodyHtml, cleanPreviousRows = true) {
    if(cleanPreviousRows) {
        $("#" + idTableBodyHtml).html("");
    }

    for (let index = 0; index < clients.length; index++) {
        let element = clients[index];
        //Order the select of status to be displayed
        let options = ['В работе', 'Отказ', 'Сделка закрыта'];
        options.splice(options.indexOf(element.status), 1);
        options.unshift(element.status);
        let statustSelect = '<select id = "select-'+ element.id +'">';
        options.forEach(option => {
            statustSelect += '<option value="'+option+'">'+option+'</option>';
        });
        statustSelect += '</select>';

        let tableRow = '<tr id = "row-'+element.id+'">\
        <td>'+ element.accountNumber +'</td>\
        <td>'+ element.lastName +'</td>\
        <td>'+ element.firstName +'</td>\
        <td>'+ element.middleName +'</td>\
        <td>' + formatDate(element.dateOfBirth) + '</td>\
        <td>' +element.inn+ '</td>\
        <td>'+ element.User.fioResponsable+'</td>\
        <td>'+ statustSelect + '</td></tr>';

      $("#" + idTableBodyHtml).append(tableRow);  
    }
}

//Write custom message text to the main html table
function handleEmptyHtmlTable(idTableBodyHtml, defaultText) {
    console.log(idTableBodyHtml, defaultText);
    $("#" + idTableBodyHtml).text("");
    $("#" + idTableBodyHtml).append("<tr><td>" + defaultText + "</td></tr>");
}

//Function to handle ajax request
function sendRequestToApi(endpoint, httpMethod, reqData, contentType, bearerToken = 0, callBack) {
    $.ajax({
        url: endpoint,
        type: httpMethod,
        contentType: contentType,
        data: reqData,
        beforeSend: function(xhr) {
          if(bearerToken) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + bearerToken);
          }
          showLoader(true);
        },
        success: function(response) {
            //hide loader
            showLoader(false);
            callBack(response, null);

        },
        error: function(error) {
          showLoader(false);
          // Handle error or display an error message
          callBack(null, error);
        }
    });  
}

//Hide login and signup modals
function hideModals() {
    $(".popup-form").hide();
}

//Show login and signup modals
function showModals(type) {
    if(type == "register") {
        $("#popup-form-signup").css("display", "flex");
    } else if ( type == "login") {
        $("#popup-form-login").css("display", "flex");
    }
}

//Display and hide required html elements when user is logged in
function setLoginState(data) {
    $("#signupMenu").hide();
    $("#loginMenu").hide();
    $("#welcome-span").text("Добро пожаловать, "+ data.login +"!");
    $("#logout").show();
}

//Display and hide required element when no user is logged in
function setLogoutState() {
    $("#signupMenu").show();
    $("#loginMenu").show();
    $("#welcome-span").text("");
    $("#logout").hide();
    $("#load-more-button").hide();
    reloadPage();
    let text = "Пожалуйста, авторизируйтесь, чтобы увидеть клиентов, привязанных к вашей учетной записи."
    displayMessageInTable(text);
}

//Very if authentication token has been saved and automatically log in user
function loadAuthSession(global) {
    let storedToken = localStorage.getItem('token-api-aton');
    if(storedToken) {
        setLoginState(JSON.parse(storedToken));
        loadUserClients(JSON.parse(storedToken).token, global.limit, global.offset);
        showBottomNotification("Welcome back to ATON CRM "+ JSON.parse(storedToken).login + "!");
    } else {
        let text = "Пожалуйста, авторизируйтесь, чтобы увидеть клиентов, привязанных к вашей учетной записи.";
        displayMessageInTable(text);
    }
}

//Get value of saved token in the local storage memory
function loadToken() {
    let storedToken = localStorage.getItem('token-api-aton');
    if(storedToken) {
        return JSON.parse(storedToken).token;
    }
    return null;
}

//Format birth date value from the database
function formatDate(dateArgs) {

    const date = new Date(dateArgs);
  
    // Get the year, month, day
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    // Pad the month
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
  
    // Return the formatted date string
    return `${paddedDay}.${paddedMonth}.${year}`;
}

//Reload web page
function reloadPage(val = false) {
    location.reload(val);
}

//Display text message in table of id = table-master-body
function displayMessageInTable(text) {
    const idTable = "table-master-body";
    handleEmptyHtmlTable(idTable, text);
    $("#load-more-button").hide();
}

//Display notification at the bottom of the webpage
function showBottomNotification(text = "") {
    $("#notification").text(text);
     // Show the notification
     setTimeout(function() {
        $("#notification").addClass("show");
      }, 1000);
  
      // Hide the notification after 5 seconds
      setTimeout(function() {
        $("#notification").removeClass("show");
      }, 5000);
}
