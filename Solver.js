class Solver {
    constructor(Model) {
        this.Solve = (puzzleName) => {
            $.ajax({
                url: "jsp/solver/SolverCore.jsp",
                dataType:'html',
                success:function(data) {
                    $("#article").html(data);
                    const createNumberButtons = new CreateNumberButtons(Model);
                     createNumberButtons.CreateNumberButtons();

                    var createDisplay = new CreateDisplay(Model);
                    createDisplay.CreateDisplay();

                    if (!Model.displayIsCleared) {
                        const display = new Display(Model);
                        display.RestoreCurrentValues();
                        display.RestorePencilMarks();
                    }

                    const docElement = $("#docs")[0];
                    docElement.value = Model.currentDocs;

                    if (Model.stepResultsUpdateDisplayOnly0 !== "") {
                        const displayData = new DisplayData(Model);
                        displayData.UpdateDisplayOnly(Model.stepResultsUpdateDisplayOnly0);
                    }
                    const buttonStateControl = new ButtonStateControl(Model);
                    if (Model.numberButtonsEnabled) {
                        buttonStateControl.EnableKeyPad();
                    } else {
                        buttonStateControl.DisableKeyPad();
                    }
                    if (Model.addPencilMarksEnabled) {
                        buttonStateControl.ShowAddPencilMarks();
                    } else {
                        buttonStateControl.HideAddPencilMarks();
                    }
                    if (Model.clearEnabled) {
                        buttonStateControl.ShowClear();
                    } else {
                        buttonStateControl.HideClear();
                    }
                    if (Model.resetEnabled) {
                        buttonStateControl.ShowReset();
                    } else {
                        buttonStateControl.HideReset();
                    }
                    if (Model.stepEnabled) {
                        buttonStateControl.ShowStep();
                    } else {
                        buttonStateControl.DisableStep();
                    }
                    if (Model.saveCurrentState) {
                        buttonStateControl.ShowSaveState();
                    } else {
                        buttonStateControl.HideSaveState();
                    }
                    if (puzzleName === "") { return; }
        
                    const selectedFileName = "sdk/" + puzzleName + ".sdk";
                    $.ajax({
                        url: selectedFileName,
                        async: false,
                        success: function(data){ 
                            SudokuWizard.Clear();
                            const selectedFile = new File([data], selectedFileName);
                            var handleFileSelect = new HandleFileSelect(Model);
                            handleFileSelect.LoadFile(selectedFile);
                        }
                    });
                }
            });
        };
    }
}
