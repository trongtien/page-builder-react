import React from "react";
import ConfigBuilder from "./pages/configBuilder";
import ModalProvider from "./components/atoms/modals/ModalProvider";
import ShowBuilder from "./pages/showBuilder";

function App() {
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <ConfigBuilder />
        {/* <ShowBuilder /> */}
      </div>
    </ModalProvider>
  );
}

export default App;
