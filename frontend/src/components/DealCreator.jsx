const DealCreator = ({deal}) => {

  return (
    <div className="deal-grid-container">
        <div>{deal.player}</div>
        <div>
            {
                deal.N.split('.').map( (item, idx) => (
                    <span key={idx}>{item}</span>
                ))
            }
        </div>
        <div></div>
        <div>
            {
                deal.W.split('.').map( (item, idx) => (
                    <span key={idx}>{item}</span>
                ))
            }
        </div>
        <div className={`deal-grid-container-center ${deal.vul[0] ? "vul-n" : ""} ${deal.vul[1] ? "vul-e" : ""}`}>
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
                deal.E.split('.').map( (item, idx) => (
                    <span key={idx}>{item}</span>
                ))
            }
        </div>
        <div></div>
        <div>
            {
                deal.S.split('.').map( (item, idx) => (
                    <span key={idx}>{item}</span>
                ))
            }
        </div>
        <div></div>
    </div>

  )
}

export default DealCreator
