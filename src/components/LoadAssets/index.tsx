import React from "react";

import "./style.css";

import "../../../assets/case-background.webp";
import "../../../assets/case-front.webp";

export const LoadAssets = () => {
    const assets = [
        "assets/case-background.webp",
        "assets/case-front.webp",
    ];

    return (
        <div className="loadassets">
            { assets.map((asset, index) => <img key={ index } src={ asset } />) }
        </div>
    );
}
