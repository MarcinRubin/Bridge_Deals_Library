const TrickTable = ({trick_table}) => {


  const suits_map = ["non-trump", "spade", "heart", "diamond", "club"];

  const suit_order = ["Nt", "Spades", "Hearts", "Diamonds", "Clubs"];

  return (
      <table className="trick-table">
        <thead>
          <tr>
            <th></th>
            {suits_map.map((suit, idx) => (
              <th key={idx}>
                <i className={`bi bi-suit-${suit}-fill`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>N</td>
            {suit_order.map((item, idx) => (
                <td key={idx}>{trick_table.NTricks[item]}</td>
            ))}
        </tr>
        <tr>
            <td>S</td>
            {suit_order.map((item, idx) => (
                <td key={idx}>{trick_table.STricks[item]}</td>
            ))}
        </tr>
        <tr>
            <td>W</td>
            {suit_order.map((item, idx) => (
                <td key={idx}>{trick_table.WTricks[item]}</td>
            ))}
        </tr>
        <tr>
            <td>E</td>
            {suit_order.map((item, idx) => (
                <td key={idx}>{trick_table.ETricks[item]}</td>
            ))}
          </tr>
        </tbody>
      </table>
  );
};

export default TrickTable;
