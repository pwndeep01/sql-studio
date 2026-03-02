const normalize = (rows) => {
  return rows
    .map(row =>
      Object.keys(row)
        .sort()
        .reduce((acc, key) => {
          acc[key] = row[key];
          return acc;
        }, {})
    )
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
};

const evaluateResult = (studentRows, expectedOutput) => {
  if (expectedOutput.type === "table") {
    return (
      JSON.stringify(normalize(studentRows)) ===
      JSON.stringify(normalize(expectedOutput.value))
    );
  }

  if (expectedOutput.type === "single_value") {
    const value = Object.values(studentRows[0])[0];
    return value === expectedOutput.value;
  }

  return false;
};

module.exports = { evaluateResult };