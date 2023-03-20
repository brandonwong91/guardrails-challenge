import React, { useEffect, useState } from "react";

interface CreateResultFormProps {
  handleSubmit: (event: any) => void;
  handleDelete?: () => void;
  data?: any;
}

const CreateResultForm = ({
  handleSubmit,
  data,
  handleDelete,
}: CreateResultFormProps) => {
  useEffect(() => {
    if (data) {
      const { repositoryName, findings } = data;
      setFormData({
        repositoryName,
        findings,
      });
    }
  }, [data]);
  const [formData, setFormData] = useState({
    repositoryName: "",
    findings: [""],
  });
  const handleChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className="ui form p-4" onSubmit={handleSubmit}>
      <div className="field">
        <label>Repository Name</label>
        <input
          type="text"
          placeholder="e.g. loren"
          defaultValue={formData.repositoryName ?? ""}
          onChange={(e) => handleChange("repositoryName", e)}
        />
      </div>
      <div className="field">
        <label>Findings</label>
        <textarea></textarea>
      </div>
      <button className="ui button" type="submit">
        {data ? `Update` : `Submit`}
      </button>
      {handleDelete ? (
        <button
          className="ui secondary button"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </button>
      ) : null}
    </form>
  );
};

export default CreateResultForm;
