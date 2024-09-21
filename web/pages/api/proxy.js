// pages/api/proxy.js
import axios from "axios";

export default async function handler(req, res) {
  const { projectId } = req.query;
  const headers = {
    Authorization: `Bearer ${process.env.OSO_API_KEY}`,
  };

  console.log("projectId", projectId);

  try {
    const response = await axios.post(
      "https://www.opensource.observer/api/v1/graphql",
      {
        query: `
        query Oso_projectsV1 {
          oso_codeMetricsByProjectV1(where: { displayName: { _eq: "${projectId}" } }) {
              activeDeveloperCount6Months
              closedIssueCount6Months
              commitCount6Months
              contributorCount
              contributorCount6Months
              displayName
              eventSource
              firstCommitDate
              forkCount
              fulltimeDeveloperAverage6Months
              lastCommitDate
              mergedPullRequestCount6Months
              newContributorCount6Months
              openedIssueCount6Months
              openedPullRequestCount6Months
              projectId
              projectName
              projectNamespace
              projectSource
              repositoryCount
              starCount
          }
          oso_onchainMetricsByProjectV1(where: { displayName: { _eq: "${projectId}" } }) {
              activeContractCount90Days
              addressCount
              addressCount90Days
              daysSinceFirstTransaction
              displayName
              eventSource
              gasFeesSum
              gasFeesSum6Months
              highActivityAddressCount90Days
              lowActivityAddressCount90Days
              mediumActivityAddressCount90Days
              multiProjectAddressCount90Days
              newAddressCount90Days
              projectId
              projectName
              projectNamespace
              projectSource
              returningAddressCount90Days
              transactionCount
              transactionCount6Months
          }
      } 
        `,
      },
      headers
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
