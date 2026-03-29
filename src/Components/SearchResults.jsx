import "../Styles/SearchResults.css"

export default function SearchResults({ Filters }) {
    if (!Filters) return null;

  if (Filters.length === 0) return <p>No transactions found.</p>;

  return (
    <div className="table_wrapper">
    <table border={1}>
      <thead>
        <tr>
          <th>ID</th><th>From</th><th>To</th><th>Min</th><th>Max</th><th>Start</th><th>End</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {Filters.map(tx => (
          <tr key={tx.id}>
            <td>{tx.id}</td>
            <td>{tx.fromAddress}</td>
            <td>{tx.toAddress}</td>
            <td>{tx.minAmount}</td>
            <td>{tx.maxAmount}</td>
            <td>{tx.startDate}</td>
            <td>{tx.endDate}</td>
           <td className={`status status-${tx.status?.toLowerCase()}`}>
    {tx.status}
</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}