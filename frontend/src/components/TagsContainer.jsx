const TagsContainer = ({tags}) => {
  return (
    <div className="tags-container">
    {tags.map((item, idx) => (
        <span key={idx}>{item}</span>
    ))}
    </div>
  )
}

export default TagsContainer
