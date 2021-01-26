class Step {
    Step(Model, stepOrSolve){
        const buttonStateControl = new ButtonStateControl(Model);
        buttonStateControl.ShowReset();
        buttonStateControl.DisableStep();
        buttonStateControl.DisableSolve();
        buttonStateControl.DisableClear();
        buttonStateControl.DisableReset();
        buttonStateControl.EnableActivitySpinner();

        if (Model.stepResultsUpdateMatrixAndDisplay.length > 0) {
            const displayData = new DisplayData(Model);
            displayData.UpdateMatrixAndDisplay(Model.stepResultsUpdateMatrixAndDisplay.shift());
            buttonStateControl.EnableStep();
            buttonStateControl.EnableSolve();
            buttonStateControl.EnableClear();
            buttonStateControl.EnableReset();
            buttonStateControl.DisableActivitySpinner();
        }
        if (Model.stepResultsUpdateDisplayOnly.length > 0) {
            const displayData = new DisplayData(Model);
            displayData.UpdateDisplayOnly(Model.stepResultsUpdateDisplayOnly.shift());

            return;
        }
        const display = new Display(Model);
        const currentValues = display.CurrentValues();
        const currentPencilMarks = display.CurrentPencilMarks();

        let command = "jsp/solver/Step.jsp";
        command += "?stepOrSolve=" + stepOrSolve;
        command += "&puzzle=" + currentValues;
        command += "&pencilMarks=" + currentPencilMarks;
        command += "&rowsPerArea=" + Model.numberOfRowsPerArea;

        // Send AJAX Request    
        $.ajax({
            url: command,
            dataType: 'html',
            success: function (htmlDoc) {
                const firstGoodChar = htmlDoc.indexOf("<");
                htmlDoc = htmlDoc.substring(firstGoodChar);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(htmlDoc, "application/xml");

                if (stepOrSolve === "step") {
                    const data = xmlDoc.getElementsByTagName("ALGORITHM_UPDATE_DISPLAY_ONLY");
                    Model.stepResultsUpdateDisplayOnly = [].slice.call(data);

                    const displayData = new DisplayData(Model);
                    Model.stepResultsUpdateDisplayOnly0 = Model.stepResultsUpdateDisplayOnly.shift();
                    displayData.UpdateDisplayOnly(Model.stepResultsUpdateDisplayOnly0);
                } else {
                    const data = xmlDoc.getElementsByTagName("ALGORITHM_MATRIX_AND_DISPLAY");
                    Model.solve = [].slice.call(data);
                    
                    const displayData = new DisplayData(Model);
                    Model.solve0 = Model.solve.shift();
                    displayData.Solve(Model.solve0);
                }
                Model.clearDisplayData = Model.stepResultsUpdateDisplayOnly[0];

                const data2 = xmlDoc.getElementsByTagName("ALGORITHM_MATRIX_AND_DISPLAY");
                Model.stepResultsUpdateMatrixAndDisplay = [].slice.call(data2);

                Model.displayIsCleared = false;
	            buttonStateControl.EnableClear();
	            buttonStateControl.EnableReset();
                buttonStateControl.DisableActivitySpinner();
            }
        });
    }
}
