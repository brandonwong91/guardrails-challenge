import React from "react";
import PropTypes from "prop-types";
import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import CreateResultForm from "./component/CreateResultForm";

export interface CreateResultProps {}

const CreateResult = ({}: CreateResultProps) => {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { repositoryName, findings } = {
      repositoryName: event.target[0].value,
      findings: event.target[1].value,
    };
    await client.mutate({
      mutation: gql`
        mutation AddResult($input: AddResultInput) {
          addResult(input: $input) {
            repositoryName
          }
        }
      `,
      variables: {
        input: { repositoryName },
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
        <i className="section">Create</i>
      </div>
      <CreateResultForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreateResult;
