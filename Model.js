class model{
    constructor () {
	    
        this.symbols = "123456789";
        this.symbolarray =  [];
        this.blank = "(Blank)";
        this.numberOfClues = 9;
        this.numberOfRowsPerArea = 3;
        this.numberOfColumnsPerArea = 3;
        this.prevKeypadId = "";
        this.selectedValue = "";
        this.numberOfNonZeroCells = 0;
        this.initialValues = [];
        this.currentValues = [];
        this.initialPencilMarks = [];
        this.currentPencilMarks = [];
        this.lastCandidatesHighlighted = [];
        this.clearDisplayData = null;
        this.stepResultsUpdateDisplayOnly = [];
        this.stepResultsUpdateMatrixAndDisplay = [];
        this.solve = [];

        this.stepResultsUpdateDisplayOnly0 = "";
        this.solve = "";
        this.currentDocs = "";

        this.numberButtonsEnabled = true;
        this.addPencilMarksEnabled = false;
        this.clearEnabled = false;
        this.resetEnabled = false;
        this.stepEnabled = false;
        this.displayIsCleared = true;
        this.saveCurrentState = false;

        this.candidateBackgroundColors = [];
    }
}
