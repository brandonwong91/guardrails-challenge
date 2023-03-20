import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateResultForm from "./component/CreateResultForm";

const EditResult = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    repositoryName: "",
    findings: [""],
  });
  useEffect(() => {
    const result = async () => {
      const { data } = await client.query({
        query: gql`
          query GetResultById($id: String!) {
            getResultById(id: $id) {
              id
              repositoryName
              findings
            }
          }
        `,
        variables: {
          id,
        },
      });
      setFormData(data.getResultById);
    };
    if (id) result();
  }, [id]);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { repositoryName, findings } = {
      repositoryName: event.target[0].value,
      findings: event.target[1].value,
    };
    await client.mutate({
      mutation: gql`
        mutation UpdateResult($input: UpdateResultInput) {
          updateResultById(input: $input) {
            id
            repositoryName
            findings
          }
        }
      `,
      variables: {
        input: { id, repositoryName, findings },
      },
    });
    router.push("/dashboard");
  };
  const handleDelete = async () => {
    await client.mutate({
      mutation: gql`
        mutation DeleteById($id: String!) {
          removeResultById(id: $id)
        }
      `,
      variables: {
        id,
      },
    });
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="ui huge breadcrumb p-4">
        <a className="section" href="/dashboard">
          Dashboard
        </a>
        <i className="right chevron icon divider"></i>
        <i className="section">Edit</i>
      </div>
      <CreateResultForm
        handleSubmit={handleSubmit}
        data={formData}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default EditResult;
