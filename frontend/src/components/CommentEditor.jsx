import React from 'react'

const CommentEditor = ({deal, setDeal, comment, setComment}) => {

    const handleChangeName = (e) => {
        const new_deal = { ...deal, name: e.target.value };
        setDeal(new_deal);
      };

  return (
    <>
    <input
          placeholder="Title"
          value={deal.name}
          onChange={handleChangeName}
        ></input>
        <textarea
          rows="10"
          placeholder="Comment"
          value={comment.body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        ></textarea>
      </>
  )
}

export default CommentEditor
