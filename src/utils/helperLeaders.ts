import { LeaderAPIData, LeaderData } from '../types/Leaders';

export function parseLeadersApi(data: LeaderAPIData): LeaderData[] | [] {
  const parsedData: LeaderData[] = [];

  if (data) {
    const leadersNodes = data?.leaders?.nodes;

    if (leadersNodes && leadersNodes.length > 0) {
      leadersNodes.map(node => {
        parsedData.push({
          fullname: node?.leaderFields?.fullName,
          email: node?.leaderFields?.email,
          position: node?.leaderFields?.position,
          ulad: node?.leaderFields?.ulad,
          sortOrderValue: Number(node?.leaderFields?.sortOrderValue),
          imgUrl: node?.leaderFields?.selfie?.node?.mediaItemUrl,
        });
      });
    }
  }

  return parsedData;
}
