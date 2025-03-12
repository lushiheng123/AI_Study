import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import ollama from "ollama";

export default function Example() {
  const [models, setModels] = useState([]); // 初始为空数组
  const [selected, setSelected] = useState(null); // 初始选定项为 null

  useEffect(() => {
    ollama
      .list()
      .then((response) => {
        if (response && Array.isArray(response.models)) {
          const names = response.models.map((model) => model.name); // 提取 name 数组
          console.log("Model names:", names); // 调试输出
          setModels(names);
          if (names.length > 0) setSelected(names[0]); // 默认选中第一个模型
        } else {
          console.error("Unexpected response format:", response);
          setModels([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching model list:", error);
        setModels([]);
      });
  }, []); // 空依赖数组，仅在组件挂载时运行

  return (
    <div className="fixed top-16 w-72">


      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected || "Select a model"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {models.length > 0 ? (
                models.map((name, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={name} // 使用 name 字符串作为值
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"
                            }`}
                        >
                          {name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <Listbox.Option
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
                  value="No models available"
                  disabled
                >
                  <span className="block truncate">No models available</span>
                </Listbox.Option>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}