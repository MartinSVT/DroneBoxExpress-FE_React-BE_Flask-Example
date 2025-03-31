export function SelectAirportOptions({ state }) {
    return (
      <option key={state.id} value={state.id}>
        {state.airport_name}
      </option>
    );
}

export function getAirportById(id, airportsArray) {
  const selectedAirport = airportsArray.filter(function(airport) {
      return airport.id == id;
  })
  if (selectedAirport[0]) {
      return selectedAirport[0].airport_name;
  } else {
      return " -- Select Airport -- "
  }
}

export function operationsErrorHandler (values) {
  if (values.originAirport === "Select Airport") {
      values.errorString = "Select Origin Airport";
      return values;
  }
  if (values.destinationAirport === "Select Airport") {
      values.errorString = "Select Destination Airport";
      return values;
  }
  if (values.originAirport === values.destinationAirport) {
      values.errorString = "Destination must be different than Origin";
      return values;
  }
  if (Number(values.costPerKg) <= 0) {
      values.errorString = "Cost Must Be Positive Number";
      return values;
  };
};