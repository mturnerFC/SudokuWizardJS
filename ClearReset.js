class ClearReset {
    constructor (Model) {
        this.Reset = () => {
            if (Model.stepResultsUpdateMatrixAndDisplay.length > 0) {
                const displayData = new DisplayData(Model);
                displayData.ClearDisplay(Model.stepResultsUpdateMatrixAndDisplay.shift());
            }
            const buttonStateControl = new ButtonStateControl(Model);
            buttonStateControl.HideReset();
            buttonStateControl.ShowStep();
            buttonStateControl.EnableSolve();

            const display = new Display(Model);
            display.ClearDocs();
            for (let row = 0; row < Model.numberOfClues; row++) {
                for (let column = 0; column < Model.numberOfClues; column++) {
                    const value = Model.initialValues[row][column];
                    Model.currentValues[row][column] = value;

                    const finalValueID = "#finalValuerow" + row + "column" + column;
                    const finalValue = $(finalValueID)[0];

                    if (value === "") {
                        display.TurnOffFinalValue(row, column);
                        display.TurnOnCandidateTable(row, column);
                        finalValue.innerHTML = "";

                        Model.initialPencilMarks[row][column] = Model.symbols;
                        Model.currentPencilMarks[row][column] = Model.symbols;
                    }
                }
            }
            buttonStateControl.EnableStep();
            buttonStateControl.EnableSolve();
            SudokuWizard.AddPencilMarks(Model);

            Model.stepResultsUpdateDisplayOnly = [];
            Model.stepResultsUpdateMatrixAndDisplay = [];

            Model.stepResultsUpdateDisplayOnly0 =  "";
            Model.currentDocs =  "";
            Model.numberOfNonZeroCells = 0;
        };
        this.Clear = () => {
            if (Model.stepResultsUpdateMatrixAndDisplay.length > 0) {
                const displayData = new DisplayData(Model);
                displayData.ClearDisplay(Model.stepResultsUpdateMatrixAndDisplay.shift());
            }

            Model.displayIsCleared = true;

            const display = new Display(Model);
            display.ClearDocs();
            for (let row = 0; row < Model.numberOfClues; row++) {
                for (let column = 0; column < Model.numberOfClues; column++) {
                    Model.initialValues[row][column] = "";
                    Model.currentValues[row][column] = "";

                    display.TurnOnFinalValue(row, column);
                    display.TurnOffCandidateTable(row, column);

                    const finalValueID = "#finalValuerow" + row + "column" + column;
                    const finalValue = $(finalValueID)[0];
                    finalValue.innerHTML = "";

                    Model.initialPencilMarks[row][column] = Model.symbols;
                    Model.currentPencilMarks[row][column] = Model.symbols;
                }
            }

            const candidateBackground = new CandidateBackground(Model);
            candidateBackground.ResetCandidateBackgroundArrays();

            const buttonStateControl = new ButtonStateControl(Model);
            buttonStateControl.HideClear();
            buttonStateControl.HideReset();
            buttonStateControl.HideStep();
            buttonStateControl.HideSolve();
            buttonStateControl.HideAddPencilMarks();
            buttonStateControl.HideSaveState();
            buttonStateControl.HideStep();
            buttonStateControl.HideSolve();

            buttonStateControl.EnableKeyPad();

            Model.stepResultsUpdateDisplayOnly = [];
            Model.stepResultsUpdateMatrixAndDisplay = [];

            Model.stepResultsUpdateDisplayOnly0 =  "";
            Model.currentDocs =  "";
            Model.numberOfNonZeroCells = 0;
        };
    }
}
