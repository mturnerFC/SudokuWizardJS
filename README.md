# SudokuWizardJS
JavaScript for www.sudokuwizard.org

## Overall thoughts
I use let and const throughout. The only exception is var SudokuWizard in main.js

I use classes in many places. To make public and private methods, I use a constructor with 
this.methodname for public methods, and variables declared within the constructor result in private
class variables.

It's pretty much pure javascript (ES6) with a bit of jQuery used for AJAX calls only.

## Main.js
The first file to look at is Main.js. It contains the only global variable, SudokuWizard, 
which is used to interact with the web page. All other variables are const or let.
The Model contains mostly constants and storage for the web site.

SudokuWizard.js contains the event handling code top layer. CreateNumberButtons.js and 
CreateDisplay.js do what you might think, creating the display 
table and number buttons. DataArrays works with a small set of fields from the Model for local
storage of the state of the puzzle. CandidateBackground is used to put multiple colors 
on a candidate in the display when needed.

The base html includes the left menu and the common command buttons. It does not contain
the actual display grid or the number buttons. The display grid for a 9x9 puzzle, contains 
over 900 table elements. For a 16x16 puzzle, this increases to over 2000 items. It is 
more efficient to download a few lines of javascript and create the table locally.

## Model.js 
This file consists only of a constructor for all the common fields used through out the 
javascript.

## SudokuWizard.js
The methods here are called directly from the html onClick for each button on the page.

## CreatNumberButtons.js
Creates the number button pad for entering values into the puzzle. It is a rectangular
grid, with an extra row for a single button to put a blank where a value was initially
placed, typically by mistake.

## CreateDisplay.js
The display is a table with three rows and three columns for each 3x3 box. Writeboxes
does the work. Each box is a 3x3 table for each cell, created with the WriteCells method.
Each cell has another 3x3 table for the candidates, created with the WriteCandidates method.
Each cell also has a <p> element to hold the final value. Only one of the candidates or final 
value are visible at a time.
  
Overlaying the display table is a Canvas element. This is used to display curves and lines
that connect candidates in several of the solution methods. It adds a bit of complexity
when entering initial values into the display. See SetNumbersOnDisplay.js for more details.

## SetValuesOnDisplay.js
To enter values onto the grid, the user clicks on a value in the number pad and then on a cell
in the display. The value shows up on the display as a final value. 

The NumberPadClicked method handles the event when a number (or blank) is clicked on. The Model 
keeps track of the current and previous numbers clicked. The previous value is needed so the 
number can be restored to its unselected style. The current value needs to be stored so that
it can be placed on the display correctly.

The CanvasClicked method handles the actual placement into the display. The canvas element 
is the top layer of the display, so it is the element that accepts the click event. A bit 
of legerdemain in lines 29-34 convert the click location to the underlying row and column 
desired. The display is updated accordingly and the value stored in the Model for later use.

## AddPencilMarks.js
Once the initial values are entered into the display, the next step is to display the 
remaining possible values in all of the other cells. This is done by clicking on the Add
Pencil Marks button. For each cell, if there has been no value clicked in, the candidates
table is made visible and the final value element made invisible using an instance of the 
Display class.

Next, an instance of DisplayData class is used to propagate the values selected, turning off
candidates that are no longer possibilities for that cell.

Finally, the control buttons are enabled or disabled as appropriate for the next possible actions.

## Step.js
With the initial values and pencil marks entered, it is now possible to proceed with
solving the puzzle. Step is what makes that happen.

Solving is a two step process. First, the display must be cleared of the updates
that were displayed from the previous Step call. Then the current state of the puzzle
is sent to the server via AJAX, which returns XML with the next steps of the solution.
This XML has two main parts: various candidates to highlight in a variety of ways, 
shapes to be drawn on the canvas, and data for which candidates to turn off and final values 
to display as appropriate.

Control buttons are adjusted as necessary.

## ClearReset.js
Clicking on the Reset button restores the display to where it was before the initial Step
was done. Clear creates a completely blank display.

## DisplayData.js
This is where all the methods to update the display based on the results of the Step 
action, and undoing them in preparation for the next solution from the server.

## Display,js
Methods to show and hide candidates, the candidates table and final element. Also methods
to get the current state of the puzzle for sending to the server and restoring the display.

## ButtonStateControl.js
Methods to enable and disable the various buttons.

## CandidateBackgroundColors.js
Occasionally a candidate will need to have more than one color. AddCandidateBackgroundColor
does this by using color gradients. 

## Canvas.js
Where lines and curves are drawn on the canvas. Straight lines are, well, straight. Curved
lines use a quadratic curve (see line 63) with two control points. There is some interesting
calculations done here.

## Constant.js
This class contains a number of helpful utility calculation methods used in many places.

## HandleFileSelect
A user can select to load a local file with puzzle data in .sdk format and update the display with 
initial vales and pencil marks.

## SdkFormat.js
From the left menu, a user can load a puzzle that demonstrates a particular solving technique.
These files are stored on the server. This class contains the AJAX call to get a particular
file. 

## ReadMeButton.js
Opens and closes a modal dialog about how to use the website.

## ResizeMenu.js
Some functions that are used to place the controls correctly based on the size of the puzzle.

## Solver.js
A class to move from the strategy documentation back to the solver. It includes code to 
restore the display to its previous state and load a selected puzzle into the display.

## Strategy.js
Loads the appropriate strategy document from the server.
The selected strategy then turns blue.
