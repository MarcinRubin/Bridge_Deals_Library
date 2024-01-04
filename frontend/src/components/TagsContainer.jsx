import { HStack, Text } from "@chakra-ui/react"

const TagsContainer = ({tags}) => {
  return (
   <HStack>
    {tags.map((item, idx) => (
        <span key={idx}>{item}</span>
    ))}
    </HStack>
  )
}

export default TagsContainer
