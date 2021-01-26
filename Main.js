var SudokuWizard;
window.onload = function() {
    const Model = new model();
    SudokuWizard = new sudokuWizard(Model);
    Model.symbolarray[9] = "123456789";
    Model.symbolarray[12] = "0123456789AB";
    Model.symbolarray[16] = "0123456789ABCDEF";
    const createNumberButtons = new CreateNumberButtons(Model);
    createNumberButtons.CreateNumberButtons();
    
    const createDisplay = new CreateDisplay(Model);
    createDisplay.CreateDisplay();
    
    const dataArrays = new DataArrays(Model);
    dataArrays.CreateDataArrays();
    
    const candidateBackground = new CandidateBackground(Model);
    candidateBackground.CreateCandidateBackgroundColors();
    
    const display = new Display(Model);
    display.ClearDocs();
  
    const bsc = new ButtonStateControl(Model);
    bsc.Initialize(Model);
};

