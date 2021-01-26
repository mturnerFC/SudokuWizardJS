class SetValuesOnDisplay {
    constructor (Model) {
        const colors = new UIColors();
        //let numberOfNonZeroCells = 0;

        this.NumberPadClicked = (id) => {
            const keypad = $("#" + id)[0];
            keypad.style.backgroundColor = colors.SelectedNumberButtonBackgroundColor;
			keypad.style.color = colors.SelectedNumberButtonTextColor;
            if (keypad.value === Model.blank) {
				Model.selectedValue = "";
			} else {
	            Model.selectedValue = keypad.value;
			}

            if (Model.prevKeypadId !== "") {
                const prevKeypad = $("#" + Model.prevKeypadId)[0];
				prevKeypad.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
                prevKeypad.style.color = colors.CandidateTextColor;
                prevKeypad.style.borderColor = colors.SecondaryButtonBorderColor;
            }
            Model.prevKeypadId = id;
        };

        this.CanvasClicked = (event) => {
            const canvas = $("#canvas")[0];
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const row = Math.floor((Model.numberOfClues * y) / canvasHeight);
            const column = Math.floor((Model.numberOfClues * x) / canvasWidth);
            const finalValueID = "#finalValuerow" + row + "column" + column;
            const finalValue = $(finalValueID)[0];
            const display = new Display(Model);
            if (Model.initialValues[row][column] === "" && Model.selectedValue !== "") {
				Model.numberOfNonZeroCells++;
			}
            if (Model.initialValues[row][column] !== "" && Model.selectedValue === "") {
				Model.numberOfNonZeroCells--;
			}
            if (Model.prevKeypadId !== "keypadBlank") {
                display.TurnOffCandidateTable(row, column);
                display.TurnOnFinalValue(row, column);
            } else {
                display.TurnOffFinalValue(row, column);
            }
            finalValue.innerHTML = Model.selectedValue;
            finalValue.style.color = colors.CellInitialTextColor;

            Model.initialValues[row][column] = Model.selectedValue;
            Model.currentValues[row][column] = Model.selectedValue;


            const buttonStateControl = new ButtonStateControl(Model);
            if (Model.numberOfNonZeroCells > 16) {
                buttonStateControl.ShowAddPencilMarks();
            } else {
                buttonStateControl.HideAddPencilMarks();
            }
            if (Model.numberOfNonZeroCells > 0) {
                buttonStateControl.ShowClear();
            } else {
                buttonStateControl.HideClear();
            }
        };
    }
}
