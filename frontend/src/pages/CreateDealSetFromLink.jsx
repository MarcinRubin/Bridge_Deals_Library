import { useState } from "react"



const CreateDealSetFromLink = () => {

    const [link, setLink] = useState("");

  return (
    <div className='new-deal-container'>
        <div className="new-deal-container-first-row">
        CreateDealSetFromLink
        <input value = {link} onChange={(e) => setLink(e.target.value)}/>
        </div>
        </div>
  )
}

export default CreateDealSetFromLink
