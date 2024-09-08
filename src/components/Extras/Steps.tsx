export interface Box {
  Number: number
  Checking?: boolean
  Swapping?: boolean
  Selected: boolean
  Complete: boolean
}

// HELPERS FOR ADDING STEPS
export interface StepProps {
  Selected: (box: Box, index: number) => boolean
  Checking?: (box: Box, index: number) => boolean
  Swapping?: (box: Box, index: number) => boolean
  Complete: (box: Box, index: number) => boolean
}

export const addStep = (
  steps: Box[][],
  boxes: Box[],
  props: StepProps
): void => {
  steps.push(
    boxes.map((box: Box, index: number) => {
      return {
        Number: box.Number,
        Checking: props.Checking ? props.Checking(box, index) : false,
        Swapping: props.Swapping ? props.Swapping(box, index) : false,
        Selected: props.Selected(box, index),
        Complete: props.Complete(box, index),
      }
    })
  )
}
