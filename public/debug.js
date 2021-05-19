console.log("This should load when you hit the debug page");

$(() => {
  let bugTemplate = Handlebars.compile(`{{#each bug}}
 <tr class="eachRow" id="row-{{id}}"
 data-id={{id}}
 data-userid={{user_id}}>
 
            
            <td>{{problem}}
            </td>
            <td>{{whatshouldbe}}
            </td>
            <td>
              {{whatactuallyis}}
            </td>
            <td>{{hypothesis}}
            </td>
            <td>{{plan}}</td>
             <td>
              <button type="submit" data-id="{{id}}" class="delete btn btn-outline-dark waves-effect"> Delete </button>
            </td>
             
          </tr>
{{/each}}`);
  /**********************************************
   * Given an array of data, will input into bug template and load accordingly
   * ==================================
   ***********************************************/
  const loadBugs = (data) => {
    $("#tableBody").html(bugTemplate({ bug: data }));
  };

  /**********************************************
   * Get notes -
   * ==================================
   ***********************************************/
  function getNotes() {
    axios
      .get(`api/bugs`)
      .then((object) => {
        loadBugs(object.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getNotes();

  /**********************************************
   *
   * ==================================
   ***********************************************/
  $("#debuggingForm").submit((event) => {
    event.preventDefault();

    console.log("Someone submitting something");
    // console.log($("input[name=problem]").val());
    let problem = $("input[name=problem]").val();
    // console.log("Problem", problem);
    let whatshouldbe = $("input[name=whatshouldbe]").val();
    let whatactuallyis = $(
      "input[name=whatactuallyis]"
    ).val();
    let hypothesis = $("input[name=hypothesis]").val();
    let plan = $("input[name=plan]").val();
    let debuggingObject = {
      problem: problem,
      whatshouldbe: whatshouldbe,
      whatactuallyis: whatactuallyis,
      hypothesis: hypothesis,
      plan: plan,
      // user_id here
    };
    console.log("New Debugging Object", debuggingObject);
    /**********************************************
     *
     * ==================================
     ***********************************************/
    axios
      .post(`/api/bugs`, {
        bug: debuggingObject,
      })
      .then(() => {
        console.log("posted");
        getNotes();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  });
  /**********************************************
   *
   * ==================================
   ***********************************************/
  $("#debuggingTable").on(
    "click",
    ".eachRow",
    function (clickEvent) {
      // grabbing all the columns
      let columns = $(this).children();
      // actually grab the correct user id first
      let userId = $(this).data().userid;
      let bugId = $(this).data().id;
      //   let bugId = $(this).data("bugid");
      console.log("User id: ", userId);
      console.log("Bug id: ", bugId);
      //   console.log("Bug id: ", bugId);
      // console.logging the length of the columns
      console.log("Number of columns: ", columns.length);
      // Place the columns into the form
      let updateFormElements = $(
        "#updateDebuggingForm input"
      ).slice(0, columns.length);
      console.log(
        "Update Form Elements: ",
        updateFormElements
      );
      // loop through each column and then apply the input to the form
      for (let i = 0; i < 5; i++) {
        console.log(
          "Each element: ",
          updateFormElements[i]
        );
        $(updateFormElements[i]).val($(columns[i]).html());
      }
      console.log("Id: ", $(this).attr("id"));
      // make sure that im grabbing the correct id and then putting it on the id
      $("#updateDebuggingForm").prop(
        "row-id",
        $(this).attr("id")
      );
      $("#updateDebuggingForm").data("userid", userId);
      $("#updateDebuggingForm").data("bugid", bugId);
    }
  );
  /**********************************************
   *
   * ==================================
   ***********************************************/
  $("#updateDebuggingForm").submit((event) => {
    event.preventDefault();
    console.log("Pressed on update form");
    console.log("1. Should see bug id");
    console.log("2. Should see row id");
    console.log("Data");
    let data = $(event.currentTarget).data();
    console.log("Data", data);

    let userId = data.userid;
    let bugId = data.bugid;

    console.log("update form user id", userId);
    console.log("update form bug id", bugId);
    let problem = $("input[name=updateProblem]").val();
    // console.log("Problem", problem);
    let whatshouldbe = $(
      "input[name=updateWhatShouldBe]"
    ).val();
    let whatactuallyis = $(
      "input[name=updateWhatActuallyIs]"
    ).val();
    let hypothesis = $(
      "input[name=updateHypothesis]"
    ).val();
    let plan = $("input[name=updatePlan]").val();

    let debuggingObject = {
      problem: problem,
      whatshouldbe: whatshouldbe,
      whatactuallyis: whatactuallyis,
      hypothesis: hypothesis,
      plan: plan,
      user_id: userId,
    };
    console.log("New Debugging Object", debuggingObject);
    axios
      .put(`/api/bugs/${bugId}`, debuggingObject)
      .then(() => {
        console.log("Frontend edited");

        getNotes();
      })
      .catch((error) => {
        console.log("error", error);
      });
    $(this).find(".clear").click();
  });

  /**********************************************
   *
   * ==================================
   ***********************************************/
  $("#tableBody").on("click", ".delete", function (event) {
    let id = $(event.currentTarget).data().id;
    console.log("Bug id to delete:", id);
    axios
      .delete(`/api/bugs/${id}`)
      .then(() => {
        console.log("deleted");
        getNotes();
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});
