const myData = angular.module("myPage", []); // component
myData.controller("showData", ($scope, $http) => {
  $scope.getallitems = () => {
    //function creation
    $http({
      method: "GET",
      url:
        "https://smalsusinfolabs.sharepoint.com/sites/Training/_api/web/lists/getByTitle('Employee_Table')/items?$select=ID,Title,Emp_Name,Designation,Salary,DOJ",
      header: {
        Accept: "application/json;odata=verbose",
      },
    }).then(
      function (getdata) {
        //console.log(getdata);
        $scope.Mydata = getdata.data;
        $scope.employee = $scope.Mydata.value;
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.getallitems();

  $scope.deleteController = (ID) => {
    $.ajax({
      url:
        "https://smalsusinfolabs.sharepoint.com/sites/Training/_api/web/lists/getByTitle('Employee_Table')/items(" +
        ID +
        ")",
      type: "POST",
      //contentType: "application/json;odata=verbose",
      headers: {
        Accept: "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE",
      },
      success: function (data) {
        $scope.getallitems();
      },
      error: function (data) {
        alert("data not display");
      },
    });
  };

  $scope.addEmployee = () => {
    const item = {
      __metadata: { type: "SP.Data.Employee_x005f_TableListItem" },
      Emp_Name: $scope.Emp_Name,
      Designation: $scope.Designation,
      Salary: $scope.Salary,
      DOJ: $scope.DOJ,
    };

    $.ajax({
      url:
        "https://smalsusinfolabs.sharepoint.com/sites/Training/_api/web/lists/getByTitle('Employee_Table')/items",
      type: "POST",
      //contentType: "application/json;odata=verbose",
      data: JSON.stringify(item), // convert in (JSON)string
      headers: {
        Accept: "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      },
      success: function (data, status, headers, config) {
        $scope.getallitems();
        alert("successfull added");
      },
      error: function (error) {
        console.log(error);
      },
    });
  };
});
