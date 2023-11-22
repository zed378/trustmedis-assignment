export default function findAvailableTeams(
  requests: number[],
  teams: number
): number[] {
  let assignments: number[] = [];
  let availability: Map<number, number> = new Map();

  for (let i = 1; i <= teams; i++) {
    availability.set(i, 0);
  }

  let currentTeam: number = 1;
  let pendingRequests: Map<number, number> = new Map();
  let iterationCount = 0;

  for (let request of requests) {
    let availableTeam: number | null = null;
    let foundAvailableTeam: boolean = false;
    iterationCount++;
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
      assignments.push(availableTeam);
      availability.set(availableTeam, request + 2);

      let pendingRequestsToRemove = Array.from(pendingRequests.keys()).filter(
        (pendingRequest) => pendingRequest <= request
      );

      for (let pendingRequestToRemove of pendingRequestsToRemove) {
        pendingRequests.delete(pendingRequestToRemove);
      }
    } else {
      assignments.push(0);
      pendingRequests.set(request, 1);
    }

    iterationCount = 0;
  }

  return assignments;
}
