import React from 'react'

export default function Tab() {
  return (
                {/* Tabs Section */}
            <div className="mt-6">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "custom"
                      ? "border-b-2 border-secondary text-secondary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("custom")}
                >
                  Custom detections
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "standalone"
                      ? "border-b-2 border-secondary text-secondary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("standalone")}
                >
                  Standalone models
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "custom" && (
                <div>
                  <h2 className="text-lg text-secondary font-bold mb-4">Custom Detections</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {customDetections.map((detection) => (
                      <Card key={detection} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{detection}</h3>
                          </div>
                          <ToggleSwitch
                            checked={customDetectionStates[detection]}
                            theme={{
                              toggle: {
                                checked: {
                                  color: {
                                    cyan: "bg-secondary",
                                  },
                                },
                              },
                            }}
                            color="cyan"
                            onChange={() => handleCustomDetectionToggle(detection)}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "standalone" && (
                <div>
                  {/* Models Section */}
                  <div className="flex items-center justify-between mt-3">
                    <h1 className="text-lg text-secondary font-bold my-2">Models</h1>
                    <Tooltip content="Add Model">
                      <CirclePlus
                        strokeWidth={3}
                        className="text-secondary cursor-pointer"
                        onClick={() => handleAddModal()}
                      />
                    </Tooltip>
                  </div>
                  {/* Models Labels */}
                  {models.length > 0 && (
                    <div className="flex items-center justify-between mb-3">
                      <Label className="w-2/3" htmlFor="modal" value="Model" />
                      <Label className="w-1/3" htmlFor="weight" value="Weight" />
                    </div>
                  )}
                  {/* Models Inputs */}
                  <div>
                    {models?.map((modal, index) => (
                      <div key={index} className="flex gap-3 mb-3 items-center">
                        <Select
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          value={modal.name}
                          className="w-2/3"
                        >
                          <option className="hidden">Select Model</option>
                          {modalsOptions?.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </Select>

                        <Select
                          onChange={(e) =>
                            handleChange(index, "weight", e.target.value)
                          }
                          value={modal.weight}
                          className="w-1/3"
                        >
                          <option className="hidden">Select Weight</option>
                          {weightsOptions?.map((weight) => (
                            <option key={weight} value={weight}>
                              {weight}
                            </option>
                          ))}
                        </Select>

                        <div className="flex gap-1 items-center">
                          <Settings className=" cursor-pointer" />
                          <Trash2
                            color="red"
                            className=" cursor-pointer"
                            onClick={() => handleDeleteModal(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/*  Configuration */}
                  <div className="mt-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setConfigurationCollapsed(!configurationCollapsed)}
                    >
                      <h1 className="text-lg text-secondary font-bold my-2">
                        Configuration
                      </h1>
                      <div className={`transform transition-transform ${configurationCollapsed ? 'rotate-0' : 'rotate-180'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {!configurationCollapsed && (
                      <div className="grid grid-cols-2 gap-6 mt-4">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                          {/* Confidence */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="confidence" value="Confidence" className="w-24 text-left" />
                            <TextInput
                              id="confidence"
                              type="number"
                              value={formData.confidence}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  confidence: Number(e.target.value),
                                })
                              }
                              placeholder="confidence"
                              className="flex-1"
                            />
                          </div>

                          {/* Real-time mode */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="realTimeMode" value="Real-time" className="w-24 text-left" />
                            <div className="flex-1">
                              <ToggleSwitch
                                id="realTimeMode"
                                checked={formData.realTimeMode}
                                theme={{
                                  toggle: {
                                    checked: {
                                      color: {
                                        cyan: "bg-secondary",
                                      },
                                    },
                                  },
                                }}
                                color="cyan"
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    realTimeMode: !formData.realTimeMode,
                                  })
                                }
                              />
                            </div>
                          </div>

                          {/* Augmentation mode */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="augment" value="Augmentation" className="w-24 text-left" />
                            <div className="flex-1">
                              <ToggleSwitch
                                id="augment"
                                checked={formData.augment}
                                theme={{
                                  toggle: {
                                    checked: {
                                      color: {
                                        cyan: "bg-secondary",
                                      },
                                    },
                                  },
                                }}
                                color="cyan"
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    augment: !formData.augment,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4">
                          {/* Overlapping */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="overlapping" value="Overlapping" className="w-24 text-left" />
                            <TextInput
                              id="overlapping"
                              type="number"
                              value={formData.overlapping}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  overlapping: Number(e.target.value),
                                })
                              }
                              placeholder="overlapping"
                              className="flex-1"
                            />
                          </div>

                          {/* Tracking */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="tracking" value="Tracking" className="w-24 text-left" />
                            <div className="flex-1">
                              <ToggleSwitch
                                id="tracking"
                                checked={formData.tracking}
                                theme={{
                                  toggle: {
                                    checked: {
                                      color: {
                                        cyan: "bg-secondary",
                                      },
                                    },
                                  },
                                }}
                                color="cyan"
                                onChange={() => {
                                  const newTracking = !formData.tracking;

                                  setFormData({
                                    ...formData,
                                    tracking: newTracking,
                                    withReId: newTracking ? formData.withReId : false,
                                  });
                                }}
                              />
                            </div>
                          </div>

                          {/* ReID */}
                          <div className="flex items-center gap-3">
                            <Label htmlFor="reid" value="with ReID" className="w-24 text-left" />
                            <div className="flex-1">
                              <ToggleSwitch
                                disabled={!formData.tracking}
                                checked={formData.withReId}
                                theme={{
                                  toggle: {
                                    checked: {
                                      color: {
                                        cyan: "bg-secondary",
                                      },
                                    },
                                  },
                                }}
                                color="cyan"
                                onChange={() => {
                                  setFormData({
                                    ...formData,
                                    withReId: !formData.withReId,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
  )
}
