import { useState } from "react";

import { ITabDataItem } from "../../app/utils/getTabData";

interface ITabsProps {
  tabs: ITabDataItem[];
}

export function Tabs({ tabs }: ITabsProps) {
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  return (
    <div className="w-full">
      <div className="flex justify-start pt-3 lg:pt-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 rounded-t-xl font-semibold py-2 ${
              activeTab === tab.id
                ? "border-blueColor-base/15 border-t-[1px] border-l-[1px] border-r-[1px] bg-grayLight/20 text-blueColor-dark"
                : ""
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="bg-grayLight/20 border-blueColor-base/border-t-blueColor-base/15 border-l-[1px] border-r-[1px] border-b-[1px] px-4 pt-2 pb-10">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
