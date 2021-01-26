class ButtonStateControl {
    constructor (Model) {
	    const colors= new UIColors();
	    this.Initialize = () => {
            //colors = new UIColors();
		    const selectAPuzzleFileText = $("#selectAPuzzleFile")[0];
		    selectAPuzzleFileText.style.backgroundColor = colors.SecondaryButtonBackgroundColor;

            const selectFile = $("#SelectFile")[0];
            selectFile.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            this.EnableKeyPad();
            this.HideAddPencilMarks();
            this.HideClear();
            this.HideReset();
            this.HideStep();
            this.HideSolve();
            this.HideSaveState();
            //this.DisableActivitySpinner();
	    };
        this.EnableKeyPad = () => {
            for (let value = 0; value < Model.numberOfClues; value++) {
                const keypad = $("#keypad" + value)[0];
                keypad.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
                keypad.style.textColor = colors.SecondaryButtonTextColor;
                keypad.style.borderColor = colors.SecondaryButtonBorderColor;
            }
            const blankpad = $("#keypadBlank")[0];
            blankpad.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            blankpad.style.textColor = colors.SecondaryButtonTextColor;
            blankpad.style.borderColor = colors.SecondaryButtonBorderColor;
            Model.numberButtonsEnabled = true;

            const placeInitialClues = $("#placeInitialClues")[0];
            placeInitialClues.style.backgroundColor = colors.PrimaryButtonBackgroundColor;
            placeInitialClues.style.textColor = colors.PrimaryButtonTextColor;
            
            if (Model.prevKeypadId !== "") {
                const prevKeypad = $("#" + Model.prevKeypadId)[0];
				prevKeypad.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
                prevKeypad.style.color = colors.SecondaryButtonTextColor;
                prevKeypad.style.borderColor = colors.SecondaryButtonBorderColor;
            }
            Model.prevKeypadId = "";
        };
        this.DisableKeyPad = () => {
            for (let value = 0; value < Model.numberOfClues; value++) {
                const keypad = $("#keypad" + value)[0];
                keypad.style.backgroundColor = colors.DisabledButtonBackgroundColor;
                keypad.style.textColor = colors.SecondaryButtonTextColor;
                keypad.style.borderColor = colors.SecondaryButtonBorderColor;
            }
            const blankpad = $("#keypadBlank")[0];
            blankpad.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            blankpad.style.textColor = colors.SecondaryButtonTextColor;
            blankpad.style.borderColor = colors.SecondaryButtonBorderColor;

            Model.numberButtonsEnabled = false;

            const placeInitialClues = $("#placeInitialClues")[0];
            placeInitialClues.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            placeInitialClues.style.textColor = colors.SecondaryButtonTextColor;

            if (Model.prevKeypadId !== "") {
                const prevKeypad = $("#" + Model.prevKeypadId)[0];
				prevKeypad.style.backgroundColor = colors.DisabledButtonBackgroundColor;
                prevKeypad.style.color = colors.SecondaryButtonTextColor;
                prevKeypad.style.borderColor = colors.SecondaryButtonBorderColor;
            }
            Model.prevKeypadId = "";
        };
        this.ShowAddPencilMarks = () => {
            const addPencilMarks = $("#addPencilMarks")[0];
            addPencilMarks.hidden = false; 
            addPencilMarks.style.backgroundColor = colors.PrimaryButtonBackgroundColor;
            addPencilMarks.style.textColor = colors.PrimaryButtonTextColor;
            Model.addPencilMarksEnabled = true;
        };
        this.HideAddPencilMarks = () => {
            const addPencilMarks = $("#addPencilMarks")[0];
            addPencilMarks.hidden = true; 
            addPencilMarks.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            addPencilMarks.style.textColor = colors.PrimaryButtonTextColor;
            Model.addPencilMarksEnabled = false;
        };
        this.ShowClear = () => {
            const clear = $("#clear")[0];
            clear.hidden = false; 
            clear.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            clear.style.textColor = colors.SecondaryButtonTextColor;
            Model.clearEnabled = true;
        };
        this.HideClear = () => {
            const clear = $("#clear")[0];
            clear.hidden = true; 
            Model.clearEnabled = false;
        };
        this.EnableClear = () => {
            const clear = $("#clear")[0];
            clear.disabled = false;
            clear.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            clear.style.textColor = colors.SecondaryButtonTextColor;
            Model.clearEnabled = false;
        };
        this.DisableClear = () => {
            const clear = $("#clear")[0];
            clear.disabled = true;
            clear.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            clear.style.textColor = colors.SecondaryButtonTextColor;
            Model.clearEnabled = true;
        };
        this.ShowReset = () => {
            const reset = $("#reset")[0];
            reset.hidden = false; 
            reset.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            reset.style.textColor = colors.SecondaryButtonTextColor;
            Model.resetEnabled = true;
        };
        this.HideReset = () => {
            const reset = $("#reset")[0];
            reset.hidden = true; 
            Model.resetEnabled = false;
        };
        this.EnableReset = () => {
            const reset = $("#reset")[0];
            reset.disabled = false;
            reset.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            reset.style.textColor = colors.SecondaryButtonTextColor;
            Model.resetEnabled = true;
        };
        this.DisableReset = () => {
            const reset = $("#reset")[0];
            reset.disabled = true;
            reset.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            reset.style.textColor = colors.SecondaryButtonTextColor;
            Model.resetEnabled = false;
        };
        this.ShowStep = () => {
	        const stepButton = $('#stepButton')[0];
            stepButton.hidden = false;
            stepButton.style.backgroundColor = colors.PrimaryButtonBackgroundColor;
            stepButton.style.textColor = colors.PrimaryButtonTextColor;
            Model.stepEnabled = true;
        };
        this.HideStep = () => {
	        const stepButton = $('#stepButton')[0];
            stepButton.hidden = true; 
            Model.stepEnabled = false;
        };
        this.EnableStep = () => {
	        const stepButton = $('#stepButton')[0];
            stepButton.disabled = false;
            stepButton.style.backgroundColor = colors.PrimaryButtonBackgroundColor;
            stepButton.style.textColor = colors.PrimaryButtonTextColor;
            Model.stepEnabled = true;
        };
        this.DisableStep = () => {
	        const stepButton = $('#stepButton')[0];
            stepButton.disabled = true;
            stepButton.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            stepButton.style.textColor = colors.PrimaryButtonTextColor;
            Model.stepEnabled = false;
        };
        this.ShowSolve = () => {
            const solve = $("#solveButton")[0];
            solve.hidden = false;
            solve.backgroundColor = colors.SecondaryButtonBackgroundColor;
            solve.textColor = colors.SecondaryButtonTextColor;
            Model.stepEnabled = true;
        };
        this.HideSolve = () => {
            const solve = $("#solveButton")[0];
            solve.hidden = true; 
            Model.stepEnabled = false;
        };
        this.EnableSolve = () => {
            const solve = $("#solveButton")[0];
            solve.disabled = false;
            solve.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            solve.style.textColor = colors.SecondaryButtonTextColor;
            Model.stepEnabled = true;
        };
        this.DisableSolve = () => {
            const solve = $("#solveButton")[0];
            solve.disabled = true;
            solve.style.backgroundColor = colors.DisabledButtonBackgroundColor;
            solve.style.textColor = colors.PrimaryButtonTextColor;
            Model.stepEnabled = false;
        };
        this.ShowSaveState = () => {
            const save = $("#saveButton")[0];
            save.hidden = false;
            save.style.backgroundColor = colors.SecondaryButtonBackgroundColor;
            save.style.textColor = colors.SecondaryButtonTextColor;
            Model.saveCurrentState = true;
        };
        this.HideSaveState = () => {
            const save = $("#saveButton")[0];
            save.hidden = true;
            Model.saveCurrentState = false;
        };
        let spinner = () => {};
		this.EnableActivitySpinner = () => {
			const activityIndicator = $("#activityIndicator")[0];
            spinner = new Spinner(activityIndicator);
            spinner.Spin();
            activityIndicator.appendChild(spinner.el);
		};
		this.DisableActivitySpinner = () => {
            spinner.Stop();
		};
    }
}
