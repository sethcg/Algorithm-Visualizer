export interface Box {
  Number: number
  SelectedOutOfOrder: boolean
  SelectedInOrder: boolean
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
        SelectedInOrder: false,
        SelectedOutOfOrder: false,
        Complete: false,
      }
    })
  )

  // TRACKS WHICH NUMBERS HAVE "BUBBLED" UP AND ARE SORTED
  let completeIndex: number = -1

  let i: number, j: number, temp: Box
  for (i = 0; i < size - 1; i++) {
    for (j = 0; j < size - i - 1; j++) {
      if (boxes[j].Number > boxes[j + 1].Number) {
        // 1. HIGHLIGHT NUMBERS OUT OF ORDER
        boxes[j].SelectedOutOfOrder = true
        boxes[j + 1].SelectedOutOfOrder = true
        steps.push(
          boxes.map((x: Box, index: number) => {
            return {
              Number: x.Number,
              SelectedInOrder: x.SelectedInOrder,
              SelectedOutOfOrder: x.SelectedOutOfOrder,
              Complete: index >= size - 1 - completeIndex,
            }
          })
        )

        // SWAP THE NUMBERS
        temp = boxes[j]
        boxes[j] = boxes[j + 1]
        boxes[j + 1] = temp

        // 2. HIGHLIGHT NUMBERS NOW IN ORDER
        boxes[j].SelectedOutOfOrder = false
        boxes[j + 1].SelectedOutOfOrder = false
        boxes[j].SelectedInOrder = true
        boxes[j + 1].SelectedInOrder = true
        steps.push(
          boxes.map((x: Box, index: number) => {
            return {
              Number: x.Number,
              SelectedInOrder: x.SelectedInOrder,
              SelectedOutOfOrder: x.SelectedOutOfOrder,
              Complete: index >= size - 1 - completeIndex,
            }
          })
        )
      } else {
        // Only one step, since both are already in order:
        boxes[j].SelectedInOrder = true
        boxes[j + 1].SelectedInOrder = true
        steps.push(
          boxes.map((x: Box, index: number) => {
            return {
              Number: x.Number,
              SelectedInOrder: x.SelectedInOrder,
              SelectedOutOfOrder: x.SelectedOutOfOrder,
              Complete: index >= size - 1 - completeIndex,
            }
          })
        )
      }

      // RESET BOXES
      boxes.forEach((box) => {
        box.SelectedInOrder = false
        box.SelectedOutOfOrder = false
      })
    }

    completeIndex++
    steps.push(
      boxes.map((x: Box, index: number) => {
        return {
          Number: x.Number,
          SelectedInOrder: x.SelectedInOrder,
          SelectedOutOfOrder: x.SelectedOutOfOrder,
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
        SelectedInOrder: x.SelectedInOrder,
        SelectedOutOfOrder: x.SelectedOutOfOrder,
        Complete: true,
      }
    })
  )

  return steps
}
