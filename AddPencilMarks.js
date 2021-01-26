class AddPencilMarks { 
    constructor(Model) {
        this.AddPencilMarks = () => {
            const display = new Display(Model);
            for (let row = 0; row < Model.numberOfClues; row++) {
                for (let column = 0; column < Model.numberOfClues; column++) {
                    let value = Model.initialValues[row][column];
                    if (value === "") {
                        display.TurnOffFinalValue(row, column);
                        display.TurnOnCandidateTable(row, column);
                        continue;
                    }
                }
            }

            const displayData = new DisplayData(Model);
            for (let row = 0; row < Model.numberOfClues; row++) {
                for (let column = 0; column < Model.numberOfClues; column++) {
                    displayData.PropagateFinalValue(row, column, true);
                }
            }
            const buttonStateControl = new ButtonStateControl(Model);

            buttonStateControl.HideAddPencilMarks();
            buttonStateControl.DisableKeyPad();

            buttonStateControl.ShowClear();
            buttonStateControl.ShowStep();
            buttonStateControl.EnableStep();
            buttonStateControl.ShowSolve();
            buttonStateControl.EnableSolve();
            buttonStateControl.HideReset();
            buttonStateControl.ShowSaveState();
        };
    }
}
