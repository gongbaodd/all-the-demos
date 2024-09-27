import React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react"
import sketch from "../../p5";

export function Stage() {
    return <ReactP5Wrapper sketch={sketch} />;
}