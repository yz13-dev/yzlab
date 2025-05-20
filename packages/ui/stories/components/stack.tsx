import React from "react"
import { Stack } from "../../src/components/widgets/stack"

const StackExample = () => {
  return (
    <Stack.Wrapper>
      <Stack.Header>Stack example</Stack.Header>
      <Stack.Content>
        <p className="">Just stack example</p>
      </Stack.Content>
    </Stack.Wrapper>
  )
}
export { StackExample }
