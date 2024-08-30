export interface Box {
  Number: number
  Swapping: boolean,
  Checking: boolean
  Selected: boolean
  Complete: boolean
}

export function insertionSort(array: Box[]): Box[][] {
  // RECORD EACH "STEP" OF THE INSERTION SORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Swapping: false,
        Checking: false,
        Selected: false,
        Complete: false,
      }
    }))

  // TRACKS WHICH NUMBERS ARE COMPLETE AND HAVE BEEN "INSERTED"
  let completeIndex: number = 0;
  let temp: Box, i: number, j: number;
  for(i = 1; i < boxes.length; i++) {
    const currentValue: Box = boxes[i];
    j = i - 1;

    // CURRENT SELECTED BOX
    boxes[i].Selected = true
    steps.push(
      boxes.map((x: Box, index: number) => {
        return {
          Number: x.Number,
          Swapping: false,
          Checking: false,
          Selected: x.Selected,
          Complete: index <= completeIndex,
        }
      }))

    const boxesCopy = [...boxes];
    while ((j > -1) && currentValue.Number < boxes[j].Number) {
      // CHECKING EACH ALREADY SORTED NUMBERS TO INSERT THE SELECTED NUMBER
      boxesCopy[j].Checking = true
      boxesCopy[i].Selected = true
      steps.push(
        boxesCopy.map((x: Box, index: number) => {
          return {
            Number: x.Number,
            Swapping: false,
            Checking: x.Checking,
            Selected: x.Selected,
            Complete: index <= completeIndex,
          }
        }))
        boxesCopy[j].Checking = false;


      // SWAP THE NUMBERS
      temp = boxes[j]
      boxes[j] = boxes[j + 1]
      boxes[j + 1] = temp
      j--;

      // RECORD THE LAST SWAP AS A STEP
      if(!((j > -1) && currentValue.Number < boxes[j].Number)) {
        boxesCopy[i].Swapping = true;
        boxesCopy[j + 1].Swapping = true;
        steps.push(
          boxesCopy.map((x: Box, index: number) => {
            return {
              Number: x.Number,
              Swapping: x.Swapping,
              Checking: false,
              Selected: false,
              Complete: index <= completeIndex,
            }
          }));
        boxesCopy[i].Swapping = false;
        boxesCopy[j + 1].Swapping = false;
      }
    }

    // RESET THE CURRENT SELECTED NUMBER
    boxes.forEach((box) => {
      box.Swapping = false;
      box.Selected = false;
      box.Checking = false;
    });

    boxes[j + 1] = currentValue;
    completeIndex++;
  }

  // FINAL "STEP" ALL NUMBERS SORTED
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Swapping: false,
        Checking: false,
        Selected: false,
        Complete: true,
      }
    })
  )

  return steps
}