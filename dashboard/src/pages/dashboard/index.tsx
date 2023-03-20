import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { Button, Checkbox, Icon, Table } from "semantic-ui-react";

interface Result {
  id: string;
  status: string;
  repositoryName: string;
  queuedAt: string;
  findings: string[];
}

interface DashboardProps {
  results: Result[];
}

export default function Dashboard({ results }: DashboardProps) {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/dashboard/create");
  };
  const [data, setData] = useState([
    {
      id: "",
      repositoryName: "",
      status: "",
      queuedAt: "",
      findings: [""],
    } as Result,
  ]);
  const handleRowClick = (id: any) => {
    router.push(`/dashboard/${id}`);
  };
  useEffect(() => {
    if (results) setData(results);
  }, [results]);
  return (
    <div>
      <div className="ui huge breadcrumb p-4">
        <a className="section" href="/dashboard">
          Dashboard
        </a>
      </div>
      <Suspense fallback={<>Loading</>}>
        <div className="p-4">
          <table className="ui striped selectable table">
            <thead className="full-width">
              <tr>
                <th className="collapsing">
                  <Checkbox slider />
                </th>
                <th>{"Repository Name"}</th>
                <th>{"Status"}</th>
                <th>{"Updated Time"}</th>
                <th>{"Findings"}</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.length > 0
                ? data?.map(
                    ({ id, repositoryName, status, queuedAt, findings }) => {
                      const date = new Date(
                        parseInt(queuedAt)
                      ).toLocaleDateString();
                      const time = new Date(
                        parseInt(queuedAt)
                      ).toLocaleTimeString();
                      return (
                        <tr key={id}>
                          <td className="collapsing">
                            <Checkbox slider />
                          </td>
                          <td
                            className="cursor-pointer"
                            onClick={() => handleRowClick(id)}
                          >
                            {repositoryName ?? "-"}
                          </td>
                          <td
                            className="cursor-pointer"
                            onClick={() => handleRowClick(id)}
                          >
                            {status ?? "-"}
                          </td>
                          <td
                            className="cursor-pointer"
                            onClick={() => handleRowClick(id)}
                          >{`${date} ${time}`}</td>
                          <td
                            className="cursor-pointer"
                            onClick={() => handleRowClick(id)}
                          >
                            {findings ?? "-"}
                          </td>
                        </tr>
                      );
                    }
                  )
                : null}
            </tbody>
            <tfoot className="full-width">
              <tr>
                <th />
                <th colSpan={4}>
                  <div className="ui right floated small primary labeled icon button">
                    <Icon name="box" /> Add Result
                  </div>
                  <Button size="small">Approve</Button>
                  <Button disabled size="small">
                    Approve All
                  </Button>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Suspense>
    </div>
  );
}

export async function getServerSideProps() {
  const { data, loading } = await client.query({
    query: gql`
      query GetAllResults {
        getAllResults {
          id
          status
          repositoryName
          findings
          status
          queuedAt
          scanningAt
          finishedAt
        }
      }
    `,
  });
  return {
    props: {
      results: data.getAllResults,
      loading,
    },
  };
}
