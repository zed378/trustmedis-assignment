export default function findAvailableTeams(
  requests: number[],
  teams: number
): number[] {
  let assignments: number[] = [];

  // Map to track team availability
  let availability: Map<number, number> = new Map();

  // Initialize team availability map
  for (let i = 1; i <= teams; i++) {
    availability.set(i, 0);
  }

  // Variables for tracking current team and pending requests
  let currentTeam: number = 1;
  let pendingRequests: Map<number, number> = new Map();

  // Counter for limiting iterations to requests.length
  let iterationCount = 0;

  // Iterate over each request
  for (let request of requests) {
    let availableTeam: number | null = null;
    let foundAvailableTeam: boolean = false;
    iterationCount++;
    iterationCount++;

    // Find an available team within the constraints
    while (!foundAvailableTeam && iterationCount < requests.length) {
      if (
        availability.get(currentTeam)! <= request &&
        !pendingRequests.has(request)
      ) {
        availableTeam = currentTeam;
        foundAvailableTeam = true;
        break;
      } else {
        iterationCount++;
        currentTeam = (currentTeam % teams) + 1;
      }
    }

    if (availableTeam) {
      // Assign the request to an available team
      assignments.push(availableTeam);

      // Update team availability
      availability.set(availableTeam, request + 2);

      // Remove pending requests that are no longer relevant
      let pendingRequestsToRemove = Array.from(pendingRequests.keys()).filter(
        (pendingRequest) => pendingRequest <= request
      );

      for (let pendingRequestToRemove of pendingRequestsToRemove) {
        pendingRequests.delete(pendingRequestToRemove);
      }
    } else {
      // No available team, add request to pending requests
      assignments.push(0);
      pendingRequests.set(request, 1);
    }

    iterationCount = 0;
  }

  return assignments;
}
