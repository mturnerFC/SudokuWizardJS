class sudokuWizard {
    constructor(Model) {
        this.HandleFileSelectEvent = (handleFileSelectEvent) => {
            const selectedFile = handleFileSelectEvent.target.files[0];
            if (!selectedFile) {
                return;
            }
            const handleFileSelect = new HandleFileSelect(Model);
            handleFileSelect.LoadFile(selectedFile);
        };
        this.AddPencilMarks = () => {
            const addPencilMarks = new AddPencilMarks(Model);
            addPencilMarks.AddPencilMarks();
        };
        this.NumberPadClicked = (id) => {
            const setValuesOnDisplay = new SetValuesOnDisplay(Model);
            setValuesOnDisplay.NumberPadClicked(id);
        };
        this.CanvasClicked = (canvasClickEvent) => {
            const setValuesOnDisplay = new SetValuesOnDisplay(Model);
            setValuesOnDisplay.CanvasClicked(canvasClickEvent);
        };
        this.Clear = () => {
            const clearReset = new ClearReset(Model);
            clearReset.Clear();
        };
        this.Reset = () => {
            const clearReset = new ClearReset(Model);
            clearReset.Reset();
        };
        this.ReadMe = () => {
            const readMe = new ReadMe();
            readMe.ReadMe();
        };
        this.Save = () => {
            const saveState = new DisplayState(Model);
            saveState.DisplayState();
        };
        this.Step = (stepOrSolve) => {
            const step = new Step();
            step.Step(Model, stepOrSolve);
        };
        this.Solver = (puzzleName) => {
            const solver = new Solver(Model);
            solver.Solve(puzzleName);
        };
        this.Strategy = (action) => {
            const strategy = new Strategy();
            strategy.Strategy(action);
        };

        this.SdkFormat = () => {
            const sdkFormat = new SdkFormat();
            sdkFormat.SdkFormat();
        };
        this.NewDisplaySize = (selection) => {
            const createDisplay = new CreateDisplay(Model);
            createDisplay.NewDisplaySize(selection);
        };
        this.GetOffsetTop = (element) => {
            const utilities = new Utilities();
            const offsetTop = utilities.GetOffsetTop(element);
            return offsetTop;
        };
        this.GetOffsetLeft = (element) => {
            const utilities = new Utilities();
            const offsetLeft = utilities.GetOffsetLeft(element);
            return offsetLeft;
        };
    }
};

