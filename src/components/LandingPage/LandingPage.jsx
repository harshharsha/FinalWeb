import React, { useMemo, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { Line, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { Drone } from "../ModelScripts/Drone";
import Model from "./Model";

const LINE_NB_POINTS = 2000;

function LandingPage() {
  // To create Curve Path

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-16, 0, 20),
        new THREE.Vector3(-13, 0, -10),
        new THREE.Vector3(0, 0, -25),
        new THREE.Vector3(20, 0, -15),
        new THREE.Vector3(15, 0, 20),
        new THREE.Vector3(0, 0, 30),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  curve.closed = true;

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const scroll = useScroll();

  const drone = useRef();

  //   useFrame((state, delta) => {
  //     drone.current.position.z += -delta * 2;
  //   });

  //Drone movement

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[(Math.min(curPointIndex + 1), linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetDroneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        drone.current.rotation.x,
        drone.current.rotation.y,
        angleRotation
      )
    );

    //   drone.current.quaternion.slerp(targetDroneQuaternion, delta * 2);
    //   _state.camera.lookAt(landRef.current.position);
    //   cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      <directionalLight color={"#ffffff"} intensity={5} position={[0, 1, 1]} />

      <Model />

      <group ref={drone}>
        <Drone position={[0, 5, 25]} rotation={[0, 2.5, 0]} />
      </group>

      <Line
        points={linePoints}
        color={"black"}
        opacity={0.7}
        transparent
        lineWidth={16}
      />
    </>
  );
}

export default LandingPage;
