import { useState } from "react";

import { ITabDataItem } from "../../app/utils/getTabData";

interface ITabsProps {
  tabs: ITabDataItem[];
}

export function Tabs({ tabs }: ITabsProps) {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  return (
    <div className="w-full mt-2">
      <div className="flex justify-center p-6 lg:p-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 rounded-t-xl font-semibold py-1 ${
              activeTab === tab.id
                ? "border-b-blueColor-base border-b-[3px] text-blueColor-dark"
                : ""
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
