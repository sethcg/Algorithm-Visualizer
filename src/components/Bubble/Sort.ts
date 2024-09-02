export interface Box {
  Number: number
  Selected: boolean
  Checking: boolean
  Complete: boolean
}

export function bubbleSort(array: Box[], size: number): Box[][] {
  // RECORD EACH "STEP" OF THE BUBBLESORT ALGORITHM AS A NEW ARRAY OF BOXES
  const steps: Box[][] = []
  const boxes: Box[] = array.map((x) => x)

  // FIRST "STEP" SHUFFLED NUMBERS
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Selected: false,
        Checking: false,
        Complete: false,
      }
    })
  )

  // TRACKS WHICH NUMBERS HAVE "BUBBLED" UP AND ARE SORTED
  let completeIndex: number = -1

  let i: number, j: number, temp: Box
  for (i = 0; i < size - 1; i++) {
    for (j = 0; j < size - i - 1; j++) {
      // SELECT STEP
      boxes[j].Selected = true
      steps.push(
        boxes.map((x: Box, index: number) => {
          return {
            Number: x.Number,
            Selected: x.Selected,
            Checking: x.Checking,
            Complete: index >= size - 1 - completeIndex,
          }
        })
      )

      // CHECKING STEP
      boxes[j + 1].Checking = true
      steps.push(
        boxes.map((x: Box, index: number) => {
          return {
            Number: x.Number,
            Selected: x.Selected,
            Checking: x.Checking,
            Complete: index >= size - 1 - completeIndex,
          }
        })
      )

      if (boxes[j].Number > boxes[j + 1].Number) {
        // SWAP THE NUMBERS
        temp = boxes[j]
        boxes[j] = boxes[j + 1]
        boxes[j + 1] = temp

        //
        boxes[j].Selected = false
        boxes[j + 1].Selected = true
        steps.push(
          boxes.map((x: Box, index: number) => {
            return {
              Number: x.Number,
              Selected: x.Selected,
              Checking: x.Checking,
              Complete: index >= size - 1 - completeIndex,
            }
          })
        )
      }

      // RESET BOXES
      boxes.forEach((box) => {
        box.Selected = false
        box.Checking = false
      })
    }

    completeIndex++
    steps.push(
      boxes.map((x: Box, index: number) => {
        return {
          Number: x.Number,
          Selected: x.Selected,
          Checking: x.Checking,
          Complete: index >= size - 1 - completeIndex,
        }
      })
    )
  }

  // FINAL "STEP" ALL NUMBERS SORTED
  steps.push(
    boxes.map((x) => {
      return {
        Number: x.Number,
        Selected: x.Selected,
        Checking: x.Checking,
        Complete: true,
      }
    })
  )

  console.log(steps)
  return steps
}
