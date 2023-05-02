export const Claim = ({
  claim,
  role,
  onClick,
  handleChange,
  selectedValue,
}) => {
  return (
    <div className="claim-table">
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Policy Number</th>
            <th>Claim Type</th>
            <th>Date</th>
            <th>Status</th>
            {role === "ROLE_SUPER_ADMIN" && (
              <>
                <th>More</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{claim.id}</td>
            <td>{claim.policyNumber}</td>
            <td>{"Vehicle"}</td>
            <td>{claim.dateOfClaim}</td>
            <td>{claim.status}</td>
            {role === "ROLE_SUPER_ADMIN" && (
              <td onClick={onClick}>
                <select
                  value={selectedValue}
                  onChange={(e) => handleChange(e, claim)}
                >
                  <option>PENDING</option>
                  <option>UNDER_REVIEW</option>
                  <option>PAID</option>
                  <option>COMPLETED</option>
                </select>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
