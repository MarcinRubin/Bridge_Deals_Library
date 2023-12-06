const DealCreator = ({deal}) => {

    const suits = ["spade", "heart", "diamond", "club"];
    const color = ["Spades", "Hearts", "Diamonds", "Clubs"]

  return (
    <div className="deal-grid-container">
        <div>{deal.dealer}</div>
        <div>
            {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.N[item]}</span>
                ))
            }
        </div>
        <div></div>
        <div>
            {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.W[item]}</span>
                ))
            }
        </div>
        <div className={`deal-grid-container-center ${deal.vulnerability[0] ? "vul-n" : ""} ${deal.vulnerability[1] ? "vul-e" : ""}`}>
            <div>
                <span>N</span>
            </div>
            <div>
                <span>E</span>
                <span>W</span>
            </div>
            <div>
                <span>S</span>
            </div>
        </div>
        <div>
            {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.E[item]}</span>
                ))
            }
        </div>
        <div></div>
        <div>
            {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.S[item]}</span>
                ))
            }
        </div>
        <div></div>
    </div>

  )
}

export default DealCreator
