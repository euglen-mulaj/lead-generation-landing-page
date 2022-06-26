//
$("#contact-form").on("submit", function (event) {
    event.preventDefault();
    $.LoadingOverlay("show");
  
    let formDataArray = $("#contact-form")
      .serializeArray()
      .reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
    console.log(formDataArray);
    $.post("/api/register", formDataArray)
      .done(function (response) {
        console.log(response);
        $("#contact-form").trigger("reset");
        toastr.success("Il tuo account manager ti contatterà nelle prossime 24 ore per darti il ​​benvenuto.");
      })
      .fail(function (jqxhr, settings, ex) {
        console.log(ex);
        console.log('failed');
      })
      .always(function () {
        $.LoadingOverlay("hide");
      });
  });