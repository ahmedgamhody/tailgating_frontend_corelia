import { Button, Modal, Select, Label, Spinner, Tooltip } from "flowbite-react";
import { TextInput, FileInput } from "flowbite-react";
import {
  FieldType,
  // , TModalType
} from "../../types";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  addChannel,
  setSelectedChannel,
} from "../../store/channel/channelSlice";
import { CirclePlus, Trash2 } from "lucide-react";
import { TSources } from "../../interfaces";

const initialFieldType: FieldType = {
  name: "",
};

const apiUrl = import.meta.env.VITE_APP_CREATE_CHANNEL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddChannelModal({ openModal, setOpenModal }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFieldType);
  const [sources, setSources] = useState<TSources[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddSource = () => {
    const lastSource = sources[sources.length - 1];

    if (!lastSource) {
      setSources([{ source_name: "", source: "", type: "url" }]);
      return;
    }

    const isLastSourceFilled =
      lastSource.source_name.trim() !== "" &&
      lastSource.type &&
      (lastSource.type === "url"
        ? typeof lastSource.source === "string" &&
          lastSource.source.trim() !== ""
        : lastSource.source instanceof File);

    if (!isLastSourceFilled) {
      alert("Please complete the previous source before adding a new one.");
      return;
    }

    setSources([...sources, { source_name: "", source: "", type: "url" }]);
  };

  const handleChangeSources = (
    index: number,
    field: keyof TSources,
    value: string | File
  ) => {
    const updatedSources = [...sources];

    // Type guard to ensure value matches the field type
    if (field === "source_name" && typeof value === "string") {
      updatedSources[index][field] = value;
    } else if (
      field === "source" &&
      (typeof value === "string" || value instanceof File)
    ) {
      updatedSources[index][field] = value;
    } else if (field === "type" && (value === "url" || value === "file")) {
      updatedSources[index][field] = value;
    } else {
      console.error("Invalid value type for field:", field);
      return;
    }

    setSources(updatedSources);
  };

  const handleDeleteSource = (index: number) => {
    const updatedSources = sources.filter((_, i) => i !== index);
    setSources(updatedSources);
  };

  const submitHandler = async () => {
    const FinalFormData = new FormData();

    FinalFormData.append("channel_name", formData.name || "");

    FinalFormData.append(
      "sources_names",
      JSON.stringify(sources.map((s) => s.source_name))
    );

    FinalFormData.append(
      "urls_sources",
      JSON.stringify(
        sources.filter((s) => s.type === "url").map((s) => s.source)
      )
    );

    sources
      .filter((s) => s.type === "file")
      .forEach((s) => {
        if (s.source) {
          FinalFormData.append("files_sources", s.source);
        }
      });

    console.log(
      "files_sources",
      sources.filter((s) => s.type === "file")
    );

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}`, FinalFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data);
      if (response.data && formData.name) {
        dispatch(addChannel(formData.name));
        dispatch(setSelectedChannel(formData.name));
      }

      navigate("/");
      setLoading(false);
      setOpenModal(false);
      toast.success(`${response.data.detail}`);
      setFormData(initialFieldType);
      setSources([]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Add Channel Modal */}
      <Modal
        show={openModal}
        size={"2xl"}
        onClose={() => {
          setOpenModal(false);
          setFormData(initialFieldType);
          setSources([]);
        }}
      >
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 ">
            {/* Name */}
            <div className="flex  gap-3 flex-col">
              <Label
                htmlFor="name"
                value="Channel Name"
                className="text-lg text-secondary font-bold"
              />
              <TextInput
                className="w-full"
                id="name"
                type="text"
                placeholder="Channel Name"
                required
                value={formData.name}
                disabled={loading}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Sources */}
            <div className="mt-3">
              <div className="flex items-center justify-between mt-3">
                <h1 className="text-lg text-secondary font-bold my-2">
                  Sources
                </h1>
                <Tooltip content="Add Source">
                  <CirclePlus
                    strokeWidth={3}
                    className="text-secondary cursor-pointer"
                    onClick={handleAddSource}
                  />
                </Tooltip>
              </div>
              <div className="flex flex-col gap-4 mt-3 ">
                {/* Sources Labels */}
                {sources.length > 0 && (
                  <div className="flex  items-center justify-between mb-3">
                    <Label htmlFor="source-name" value="Source Name" />
                    <Label htmlFor="type" value="Type" />
                    <Label htmlFor="source" value="Source" />
                    <Label htmlFor="delete-source" value="Delete" />
                  </div>
                )}

                {sources?.map((source, index) => (
                  <div key={index} className="flex gap-3 mb-3 items-center">
                    {/* Source Name */}
                    <div className="flex-1">
                      <TextInput
                        id={`source-name-${index}`}
                        placeholder="Enter Source Name"
                        value={source.source_name}
                        disabled={loading}
                        onChange={(e) =>
                          handleChangeSources(
                            index,
                            "source_name",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Selector for URL or File */}
                    <div className="w-24">
                      <Select
                        value={source.type}
                        disabled={loading}
                        onChange={(e) =>
                          handleChangeSources(index, "type", e.target.value)
                        }
                        aria-label="Select URL or File type"
                      >
                        <option value="url">URL</option>
                        <option value="file">File</option>
                      </Select>
                    </div>

                    {/* URL Input */}
                    {source.type === "url" && (
                      <div className="flex-1">
                        <TextInput
                          id={`url-${index}`}
                          type="url"
                          placeholder="Enter URL"
                          value={source.source as string}
                          disabled={loading}
                          onChange={(e) =>
                            handleChangeSources(index, "source", e.target.value)
                          }
                        />
                      </div>
                    )}

                    {/* File Input */}
                    {source.type === "file" && (
                      <div className="flex-1">
                        <FileInput
                          id={`file-${index}`}
                          onChange={(e) =>
                            e.target.files &&
                            handleChangeSources(
                              index,
                              "source",
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    )}

                    {/* Delete Button */}
                    <div className="w-8 flex justify-center">
                      <Trash2
                        color="red"
                        className="cursor-pointer"
                        onClick={() => handleDeleteSource(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!formData.name || loading || !sources[0]?.source}
            onClick={submitHandler}
          >
            {loading ? (
              <div className="flex items-center">
                <Spinner />
                <span className="pl-3">Verify...</span>{" "}
              </div>
            ) : (
              "Verify"
            )}
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setFormData(initialFieldType);
              setOpenModal(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
