import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./Tab.css";

export default function MainTabs({ tabItems }) {
  const [key, setKey] = useState(tabItems[0].id);

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {tabItems.map((tabItem, index) => (
        <Tab
          eventKey={tabItem.id}
          title={tabItem.id}
          key={`${tabItem.id}-${index}`}
        >
          {tabItem.children}
        </Tab>
      ))}
    </Tabs>
  );
}
