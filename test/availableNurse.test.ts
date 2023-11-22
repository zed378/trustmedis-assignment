import findAvailableTeams from "../src/availableNurse";

describe("findAvailableTeams", () => {
  it("should find available teams for given requests", () => {
    const requests = [9, 10, 13, 10, 11];
    const teams = 3;
    const assignments = findAvailableTeams(requests, teams);

    expect(assignments).toEqual([1, 2, 2, 3, 1]);
  });

  it("should handle cases where no team is available", () => {
    const requests = [9, 10, 10, 10, 11];
    const teams = 3;
    const assignments = findAvailableTeams(requests, teams);

    expect(assignments).toEqual([1, 2, 3, 0, 1]);
  });
});
