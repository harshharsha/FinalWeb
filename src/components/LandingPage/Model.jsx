import React from "react";
import { Stage } from "@react-three/drei";

import { FarmLand } from "../ModelScripts/Farm";

function Model() {
  return (
    <Stage intensity={0.5} environment={null} contactShadow={false}>
      <mesh>
        <FarmLand position-y={-4} />
      </mesh>
    </Stage>
  );
}

export default Model;
