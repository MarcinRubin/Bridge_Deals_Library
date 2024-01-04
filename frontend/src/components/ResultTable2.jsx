import React from "react";

const ResultTable2 = ({result_table}) => {
  // const result_table = [
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "X",
  //     height: 6,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 1210,
  //     overtricks: 0,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 6,
  //     lead_suit: "H",
  //     lead_card: "4",
  //     score: 980,
  //     overtricks: 0,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "S",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "D",
  //     lead_card: "Q",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 5,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: 480,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "D",
  //     lead_card: "Q",
  //     score: 480,
  //     overtricks: 2,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "S",
  //     lead_card: "7",
  //     score: 450,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "D",
  //     lead_card: "Q",
  //     score: 450,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 4,
  //     lead_suit: "D",
  //     lead_card: "Q",
  //     score: 450,
  //     overtricks: 1,
  //   },
  //   {
  //     player: "W",
  //     suit: "S",
  //     double: "X",
  //     height: 4,
  //     lead_suit: "H",
  //     lead_card: "A",
  //     score: 100,
  //     overtricks: -1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 6,
  //     lead_suit: "D",
  //     lead_card: "J",
  //     score: -50,
  //     overtricks: -1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 6,
  //     lead_suit: "S",
  //     lead_card: "5",
  //     score: -50,
  //     overtricks: -1,
  //   },
  //   {
  //     player: "N",
  //     suit: "H",
  //     double: "",
  //     height: 6,
  //     lead_suit: "D",
  //     lead_card: "Q",
  //     score: -50,
  //     overtricks: -1,
  //   },
  // ];

  const suits_map = {
    H: "heart",
    S: "spade",
    D: "diamond",
    C: "club",
    NT: "non-trump",
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Player</th>
            <th>Lead</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {result_table.map((row, idx) => (
            <tr key={idx}>
              <td>
                {row.height}
                <i className={`bi bi-suit-${suits_map[row.suit]}-fill`} />
                {row.double}{" "}
              </td>
              <td>{row.player}</td>
              <td>
                <i className={`bi bi-suit-${suits_map[row.lead_suit]}-fill`} />
                {row.lead_card}
              </td>
              <td>{row.overtricks === 0 ? "=" : (row.overtricks > 0) ? ("+" + row.overtricks) : (row.overtricks) }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable2;
